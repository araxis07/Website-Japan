'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTrip } from './TripProvider'
import TripField from './TripField'
import TripExtras from './TripExtras'
import {
  entryKey,
  tripPlace,
  tripId,
  tripKey,
  dayLabel,
  maxTripBytes,
  mergeTrips,
  parseTrip,
  publicTrip,
  tripDate,
  tripFilename,
  type Trip,
} from '@/lib/trip'
import { offlineTrip } from '@/lib/trip-export'
import { downloadTrip } from '@/lib/download'

export default function TripTools() {
  const { trip, change, copy, tools, lang, undo, canUndo, undoLabel, drafts } =
    useTrip()
  const [incoming, setIncoming] = useState<{
    trip: Trip
    before: string
  } | null>(null)
  const importSelection = useRef(0)
  useEffect(() => {
    const invalidate = () => importSelection.current++
    const clear = (event: StorageEvent) => {
      if (
        (event.key === null || event.key === tripKey) &&
        event.newValue === null
      ) {
        invalidate()
        setIncoming(null)
      }
    }
    window.addEventListener('storage', clear)
    return () => {
      invalidate()
      window.removeEventListener('storage', clear)
    }
  }, [])
  const [error, setError] = useState('')
  const [sanitized, setSanitized] = useState(false)
  const exportTrip = useMemo(
    () => trip && (sanitized ? publicTrip(trip) : trip),
    [trip, sanitized],
  )
  const [lastBackup, setLastBackup] = useState<{
    time: string
    hash: string
  } | null>(null)
  const [hash, setHash] = useState('')
  useEffect(() => {
    let cancelled = false
    if (trip && crypto.subtle)
      crypto.subtle
        .digest('SHA-256', new TextEncoder().encode(JSON.stringify(trip)))
        .then((buffer) => {
          if (cancelled) return
          setHash(
            Array.from(new Uint8Array(buffer), (n) =>
              n.toString(16).padStart(2, '0'),
            ).join(''),
          )
          try {
            const meta = JSON.parse(
              localStorage.getItem('japan-trip-backup') || 'null',
            )
            setLastBackup(
              meta &&
                typeof meta.time === 'string' &&
                Number.isFinite(Date.parse(meta.time)) &&
                /^[a-f0-9]{64}$/.test(meta.hash)
                ? meta
                : null,
            )
          } catch {
            /* Backup metadata is optional; trip writes report their own failures. */
          }
        })
        .catch(() => {
          if (!cancelled) setHash('')
        })
    return () => {
      cancelled = true
    }
  }, [trip])
  if (!trip || !exportTrip) return null
  const save = (update: (current: Trip) => Trip) =>
    change(update, '', JSON.stringify(trip))
  const total = Object.values(trip.budget || {}).reduce((a, b) => a + b, 0)
  const money = (amount: number) =>
    new Intl.NumberFormat(lang, { style: 'currency', currency: 'JPY' }).format(
      amount,
    )
  const lodgingConflict = trip.stays?.some(
    (stay, index) =>
      stay.to > trip.days + 1 ||
      trip
        .stays!.slice(index + 1)
        .some((other) => stay.from < other.to && other.from < stay.to),
  )
  return (
    <div className="trip-tools" id="trip-tools">
      <div className="trip-meta">
        {(['title', 'startDate', 'base'] as const).map((key) => (
          <TripField
            key={key}
            fieldKey={key}
            label={key === 'startDate' ? tools.start : tools[key]}
            type={key === 'startDate' ? 'date' : 'text'}
            value={trip[key] || ''}
            save={(value) => save((current) => ({ ...current, [key]: value }))}
          />
        ))}
      </div>
      <details className="budget-panel">
        <summary>{tools.stays}</summary>
        {lodgingConflict && (
          <div role="alert">
            <p>{tools.stayConflict}</p>
            <ul>
              {trip.stays?.flatMap((stay, index) => [
                ...(stay.to > trip.days + 1
                  ? [
                      <li key={`${stay.id}:range`}>
                        {stay.name || tools.hotel}: {stay.from} → {stay.to} ·{' '}
                        {tools.outOfRange}
                      </li>,
                    ]
                  : []),
                ...trip
                  .stays!.slice(index + 1)
                  .filter(
                    (other) => stay.from < other.to && other.from < stay.to,
                  )
                  .map((other) => (
                    <li key={`${stay.id}:${other.id}`}>
                      {stay.name || tools.hotel} ({stay.from}–{stay.to}) ↔{' '}
                      {other.name || tools.hotel} ({other.from}–{other.to})
                    </li>
                  )),
              ])}
            </ul>
          </div>
        )}
        {(trip.stays || []).map((stay, index) => (
          <div className="trip-meta lodging-row" key={stay.id}>
            <label>
              {tools.linkStay}
              <select
                value={stay.placeId || ''}
                onChange={(event) => {
                  const placeId = event.target.value
                  const custom = trip.items.find(
                    (item) => item.id === placeId,
                  )?.custom
                  save((current) => ({
                    ...current,
                    stays: current.stays!.map((s, i) =>
                      i === index
                        ? {
                            ...s,
                            placeId: placeId || undefined,
                            ...(custom
                              ? { name: custom.name, address: custom.address }
                              : {}),
                          }
                        : s,
                    ),
                  }))
                }}
              >
                <option value="">{tools.unlinkedStay}</option>
                {trip.items
                  .filter(
                    (item, i, items) =>
                      item.custom &&
                      items.findIndex((other) => other.id === item.id) === i,
                  )
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.custom!.name}
                    </option>
                  ))}
              </select>
            </label>
            {stay.placeId ? (
              <p>
                {stay.name}
                <br />
                {stay.address}
              </p>
            ) : (
              <>
                <TripField
                  fieldKey={`stay:${stay.id}:name`}
                  label={tools.hotel}
                  value={stay.name}
                  save={(name) =>
                    save((current) => ({
                      ...current,
                      stays: current.stays!.map((s, i) =>
                        i === index ? { ...s, name } : s,
                      ),
                    }))
                  }
                />
                <TripField
                  fieldKey={`stay:${stay.id}:address`}
                  label={tools.stayAddress}
                  value={stay.address || ''}
                  maxLength={300}
                  save={(address) =>
                    save((current) => ({
                      ...current,
                      stays: current.stays!.map((s, i) =>
                        i === index ? { ...s, address } : s,
                      ),
                    }))
                  }
                />
              </>
            )}
            {(['from', 'to'] as const).map((key) => (
              <TripField
                key={key}
                fieldKey={`stay:${stay.id}:${key}`}
                label={key === 'from' ? tools.checkIn : tools.checkOut}
                type="number"
                min={key === 'from' ? 1 : stay.from + 1}
                max={key === 'from' ? stay.to - 1 : 31}
                value={stay[key]}
                save={(value) =>
                  save((current) => ({
                    ...current,
                    stays: current.stays!.map((s, i) =>
                      i === index ? { ...s, [key]: Number(value) } : s,
                    ),
                  }))
                }
              />
            ))}
            <p>
              {stay.to - stay.from} {tools.nights} ·{' '}
              {tripDate(trip.startDate, stay.from)} →{' '}
              {tripDate(trip.startDate, stay.to)}
            </p>
            <button
              type="button"
              onClick={() =>
                change(
                  (current) => ({
                    ...current,
                    stays: current.stays!.filter((item) => item.id !== stay.id),
                  }),
                  copy.updated,
                  JSON.stringify(trip),
                )
              }
            >
              {tools.removeStay}
            </button>
          </div>
        ))}
        <button
          type="button"
          disabled={(trip.stays?.length || 0) >= 30}
          onClick={() =>
            change(
              (current) => ({
                ...current,
                stays: [
                  ...(current.stays || []),
                  { id: tripId(), name: '', from: 1, to: 2 },
                ],
              }),
              copy.updated,
            )
          }
        >
          {tools.addStay}
        </button>
      </details>
      <details className="budget-panel">
        <summary>{tools.budget}</summary>
        <p>{tools.budgetHelp}</p>
        <div className="trip-meta">
          <TripField
            fieldKey="travelers"
            label={tools.travelers}
            type="number"
            min={1}
            max={30}
            value={trip.travelers || 1}
            save={(value) =>
              save((current) => ({ ...current, travelers: Number(value) }))
            }
          />
          {(['stay', 'transport', 'food', 'activities'] as const).map((key) => (
            <TripField
              key={key}
              fieldKey={`budget:${key}`}
              label={tools[key]}
              type="number"
              min={0}
              max={100000000}
              value={trip.budget?.[key] ?? ''}
              save={(value) =>
                save((current) => {
                  const budget = { ...current.budget }
                  if (value === '') delete budget[key]
                  else budget[key] = Number(value)
                  return { ...current, budget }
                })
              }
            />
          ))}
        </div>
        {(['stay', 'transport', 'food', 'activities'] as const).some(
          (key) => trip.budget?.[key] === undefined,
        ) && (
          <p className="budget-incomplete">
            {tools.budgetMissing}:{' '}
            {(['stay', 'transport', 'food', 'activities'] as const)
              .filter((key) => trip.budget?.[key] === undefined)
              .map((key) => tools[key])
              .join(' · ')}
            . {tools.budgetIncomplete}
          </p>
        )}
        <p>
          <strong>
            {tools.total}: {money(total)}
          </strong>{' '}
          · {tools.perPerson}: {money(total / (trip.travelers || 1))} ·{' '}
          {tools.perDay}: {money(total / trip.days)}
        </p>
      </details>
      <details className="budget-panel trip-extras">
        <summary>{tools.moreTools}</summary>
        <TripExtras />
      </details>
      <label className="export-privacy">
        <input
          type="checkbox"
          checked={sanitized}
          onChange={(e) => setSanitized(e.target.checked)}
        />{' '}
        {tools.sanitized}
      </label>
      <details className="export-preview">
        <summary>{tools.exportPreview}</summary>
        <p>{sanitized ? tools.publicExports : tools.privateExports}</p>
        <p>
          {tools.exportPlaces}: {exportTrip.items.length} / {trip.items.length}
        </p>
        <ul>
          {exportTrip.items.map((item) => (
            <li key={entryKey(item)}>
              {tripPlace(item).names[lang]} ·{' '}
              {item.day ? dayLabel(item.day, lang, copy.day) : copy.unplanned}
            </li>
          ))}
        </ul>
      </details>
      <div className="trip-file-actions">
        <button type="button" onClick={undo} disabled={!canUndo}>
          {tools.undo}
          {undoLabel ? `: ${undoLabel}` : ''}
        </button>
        <button
          type="button"
          disabled={Object.keys(drafts).length > 0}
          onClick={async () => {
            downloadTrip(
              JSON.stringify(exportTrip, null, 2),
              sanitized
                ? tripFilename('json').replace(
                    'japan-trip-',
                    'japan-trip-share-',
                  )
                : tripFilename('json'),
              'application/json',
            )
            if (!sanitized) {
              let backupHash = ''
              try {
                const buffer = await crypto.subtle.digest(
                  'SHA-256',
                  new TextEncoder().encode(JSON.stringify(trip)),
                )
                backupHash = Array.from(new Uint8Array(buffer), (n) =>
                  n.toString(16).padStart(2, '0'),
                ).join('')
              } catch {
                return
              }
              const meta = { time: new Date().toISOString(), hash: backupHash }
              setLastBackup(meta)
              try {
                localStorage.setItem('japan-trip-backup', JSON.stringify(meta))
              } catch {
                setError(copy.error)
              }
            }
          }}
        >
          {sanitized ? tools.shareDownload : tools.backup}
        </button>
        <label className="file-import" id="trip-import">
          {tools.import}
          <input
            type="file"
            accept=".json,application/json"
            onChange={async (event) => {
              const selection = ++importSelection.current
              const file = event.target.files?.[0]
              event.target.value = ''
              setIncoming(null)
              setError('')
              if (!file) return
              if (file.size > maxTripBytes) {
                setError(tools.invalid)
                return
              }
              try {
                const text = await file.text()
                if (selection !== importSelection.current) return
                const parsed = parseTrip(text)
                if (!parsed) {
                  setError(tools.invalid)
                  return
                }
                setIncoming({ trip: parsed, before: JSON.stringify(trip) })
              } catch {
                if (selection === importSelection.current)
                  setError(tools.invalid)
              }
            }}
          />
        </label>
        <button
          type="button"
          disabled={Object.keys(drafts).length > 0}
          onClick={() =>
            downloadTrip(
              offlineTrip(exportTrip, lang, copy, tools),
              sanitized
                ? tripFilename('html').replace(
                    'japan-trip-',
                    'japan-trip-share-',
                  )
                : tripFilename('html'),
              'text/html',
            )
          }
        >
          {sanitized ? tools.shareHtml : tools.offline}
        </button>
      </div>
      {lastBackup && (
        <p>
          {tools.backupRequested}:{' '}
          {new Date(lastBackup.time).toLocaleString(lang)}
          {hash && lastBackup.hash !== hash && (
            <strong> · {tools.backupChanged}</strong>
          )}
        </p>
      )}
      <p className="source-note">{tools.privacy}</p>
      <p className="source-note">
        {sanitized
          ? tools.shareExportHelp
          : `${tools.backupHelp} ${tools.offlineHelp}`}
      </p>
      {error && <p role="alert">{error}</p>}
      {incoming && (
        <section className="import-preview" aria-label={tools.preview}>
          <h2>{tools.preview}</h2>
          <p>
            {incoming.trip.title || copy.title} · {incoming.trip.days}{' '}
            {copy.days} · {incoming.trip.items.length} {copy.count}
          </p>
          <p>
            {incoming.trip.base} · {incoming.trip.startDate}
          </p>
          {Object.keys(drafts).length > 0 && (
            <p role="alert">{tools.pendingDrafts}</p>
          )}
          <p>{tools.mergeHelp}</p>
          <p>{tools.replaceHelp}</p>
          <p>
            {tools.existingItems}:{' '}
            {
              incoming.trip.items.filter((item) =>
                trip.items.some((old) => entryKey(old) === entryKey(item)),
              ).length
            }
          </p>
          <p>
            {tools.countNew}:{' '}
            {
              incoming.trip.items.filter(
                (item) =>
                  !trip.items.some((old) => entryKey(old) === entryKey(item)),
              ).length
            }
          </p>
          <details>
            <summary>{tools.preview}</summary>
            <ol>
              {incoming.trip.items.map((item) => (
                <li key={entryKey(item)}>
                  {tripPlace(item).names[lang]} ·{' '}
                  {item.day
                    ? dayLabel(item.day, lang, copy.day)
                    : copy.unplanned}{' '}
                  · {item.time}
                  {item.custom && (
                    <p>
                      {item.custom.address}
                      {item.custom.url && (
                        <>
                          {' '}
                          · <a href={item.custom.url}>{tools.personalLink} ↗</a>
                        </>
                      )}
                    </p>
                  )}
                  <p>{item.note}</p>
                  <p>
                    {tools.duration}: {item.duration ?? '—'} {tools.minuteUnit}{' '}
                    · {tools.buffer}: {item.buffer ?? '—'} {tools.minuteUnit}
                  </p>
                </li>
              ))}
            </ol>
            {Object.entries(incoming.trip.notes || {}).map(([day, note]) => (
              <p key={day}>
                {Number(day)
                  ? dayLabel(Number(day), lang, copy.day)
                  : copy.unplanned}
                : {note}
              </p>
            ))}
            <p>
              {tools.travelers}: {incoming.trip.travelers || 1}
            </p>
            <dl>
              {Object.entries(incoming.trip.budget || {}).map(
                ([key, amount]) => (
                  <div key={key}>
                    <dt>{tools[key as keyof NonNullable<Trip['budget']>]}</dt>
                    <dd>{money(amount)}</dd>
                  </div>
                ),
              )}
            </dl>
            {incoming.trip.stays?.map((stay, i) => (
              <p key={i}>
                {stay.name} · {tools.checkIn}: {stay.from} → {tools.checkOut}:{' '}
                {stay.to} · {stay.address}
              </p>
            ))}
          </details>
          <button
            type="button"
            disabled={Object.keys(drafts).length > 0}
            onClick={() => {
              if (!mergeTrips(trip, incoming.trip)) {
                setError(copy.limit)
                return
              }
              if (
                change(
                  (current) => mergeTrips(current, incoming.trip),
                  copy.updated,
                  incoming.before,
                )
              )
                setIncoming(null)
            }}
          >
            {tools.merge}
          </button>
          <button
            type="button"
            disabled={Object.keys(drafts).length > 0}
            onClick={() => {
              if (
                window.confirm(tools.replaceConfirm) &&
                change(() => incoming.trip, copy.updated, incoming.before)
              )
                setIncoming(null)
            }}
          >
            {tools.replace}
          </button>
          <button
            type="button"
            onClick={() => {
              importSelection.current++
              setIncoming(null)
            }}
          >
            {tools.cancel}
          </button>
        </section>
      )}
    </div>
  )
}
