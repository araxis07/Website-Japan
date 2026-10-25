'use client'
import { useState } from 'react'
import { places } from '@/data/places'
import { useTrip } from './TripProvider'
import TripField from './TripField'
import {
  entryKey,
  maxTripBytes,
  mergeTrips,
  parseTrip,
  publicTrip,
  tripDate,
  tripFilename,
  type Trip,
} from '@/lib/trip'
import { downloadTrip, offlineTrip } from '@/lib/trip-export'

export default function TripTools() {
  const {
    trip,
    change,
    copy,
    tools,
    lang,
    undo,
    canUndo,
    error: storageError,
  } = useTrip()
  const [incoming, setIncoming] = useState<{
    trip: Trip
    before: string
  } | null>(null)
  const [error, setError] = useState('')
  const [sanitized, setSanitized] = useState(false)
  const [lastBackup, setLastBackup] = useState('')
  if (!trip) return null
  const save = (update: (current: Trip) => Trip) =>
    change(update, '', JSON.stringify(trip))
  const total = Object.values(trip.budget || {}).reduce((a, b) => a + b, 0)
  const money = (amount: number) =>
    new Intl.NumberFormat(lang, { style: 'currency', currency: 'JPY' }).format(
      amount,
    )
  const exportTrip = sanitized ? publicTrip(trip) : trip
  const lodgingConflict = trip.stays?.some(
    (stay, index) =>
      stay.to > trip.days + 1 ||
      trip
        .stays!.slice(index + 1)
        .some((other) => stay.from < other.to && other.from < stay.to),
  )
  return (
    <div className="trip-tools">
      <p className="save-status" role="status">
        {storageError || tools.savedLocal}
      </p>
      <div className="trip-meta">
        {(['title', 'startDate', 'base'] as const).map((key) => (
          <TripField
            key={key}
            label={key === 'startDate' ? tools.start : tools[key]}
            type={key === 'startDate' ? 'date' : 'text'}
            value={trip[key] || ''}
            save={(value) => save((current) => ({ ...current, [key]: value }))}
          />
        ))}
      </div>
      <details className="budget-panel">
        <summary>{tools.stays}</summary>
        {lodgingConflict && <p role="alert">{tools.stayConflict}</p>}
        {(trip.stays || []).map((stay, index) => (
          <div className="trip-meta lodging-row" key={stay.id}>
            <TripField
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
            {(['from', 'to'] as const).map((key) => (
              <TripField
                key={key}
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
              {tripDate(trip.startDate, stay.from)} →{' '}
              {tripDate(trip.startDate, stay.to)}
            </p>
            <button
              type="button"
              onClick={() =>
                change(
                  (current) => ({
                    ...current,
                    stays: current.stays!.filter((_, i) => i !== index),
                  }),
                  copy.updated,
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
                  { id: crypto.randomUUID(), name: '', from: 1, to: 2 },
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
        <p>
          <strong>
            {tools.total}: {money(total)}
          </strong>{' '}
          · {tools.perPerson}: {money(total / (trip.travelers || 1))} ·{' '}
          {tools.perDay}: {money(total / trip.days)}
        </p>
      </details>
      <label className="export-privacy">
        <input
          type="checkbox"
          checked={sanitized}
          onChange={(e) => setSanitized(e.target.checked)}
        />{' '}
        {tools.sanitized}
      </label>
      <div className="trip-file-actions">
        <button type="button" onClick={undo} disabled={!canUndo}>
          {tools.undo}
        </button>
        <button
          type="button"
          onClick={() => {
            downloadTrip(
              JSON.stringify(exportTrip, null, 2),
              tripFilename('json'),
              'application/json',
            )
            setLastBackup(new Date().toLocaleString(lang))
          }}
        >
          {tools.backup}
        </button>
        <label className="file-import">
          {tools.import}
          <input
            type="file"
            accept=".json,application/json"
            onChange={async (event) => {
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
                const parsed = parseTrip(await file.text())
                if (!parsed) {
                  setError(tools.invalid)
                  return
                }
                setIncoming({ trip: parsed, before: JSON.stringify(trip) })
              } catch {
                setError(tools.invalid)
              }
            }}
          />
        </label>
        <button
          type="button"
          onClick={() =>
            downloadTrip(
              offlineTrip(exportTrip, lang, copy, tools),
              tripFilename('html'),
              'text/html',
            )
          }
        >
          {tools.offline}
        </button>
      </div>
      {lastBackup && (
        <p>
          {tools.lastBackup}: {lastBackup}
        </p>
      )}
      <p className="source-note">{tools.privacy}</p>
      <p className="source-note">
        {tools.backupHelp} {tools.offlineHelp}
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
          <p>{tools.mergeHelp}</p>
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
                  {places.find((p) => p.id === item.id)!.names[lang]} ·{' '}
                  {item.day || copy.unplanned} · {item.time}
                  <p>{item.note}</p>
                  <p>
                    {tools.duration}: {item.duration ?? '—'} · {tools.buffer}:{' '}
                    {item.buffer ?? '—'}
                  </p>
                </li>
              ))}
            </ol>
            {Object.entries(incoming.trip.notes || {}).map(([day, note]) => (
              <p key={day}>
                {copy.day} {day}: {note}
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
                {stay.to}
              </p>
            ))}
          </details>
          <button
            type="button"
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
          <button type="button" onClick={() => setIncoming(null)}>
            {tools.cancel}
          </button>
        </section>
      )}
    </div>
  )
}
