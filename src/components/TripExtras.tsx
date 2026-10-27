'use client'
import { useState, useSyncExternalStore } from 'react'
import { parseTrip, tripFilename, tripId, type Trip } from '@/lib/trip'
import { downloadTrip } from '@/lib/trip-export'
import { tripCalendar } from '@/lib/trip-calendar'
import { useTrip } from './TripProvider'
import TripField from './TripField'
const key = 'japan-travel-library-v1'
function snapshot() {
  try {
    return localStorage.getItem(key) || '[]'
  } catch {
    return 'unavailable'
  }
}
function subscribe(callback: () => void) {
  const changed = (event: StorageEvent) => {
    if (!event.key || event.key === key) callback()
  }
  window.addEventListener('storage', changed)
  window.addEventListener('trip-library-change', callback)
  return () => {
    window.removeEventListener('storage', changed)
    window.removeEventListener('trip-library-change', callback)
  }
}
export function parseLibrary(
  raw: string,
): { id: string; trip: Trip; savedAt?: string }[] | null {
  try {
    if (new TextEncoder().encode(raw).byteLength > 5_120_000) return null
    const value = JSON.parse(raw)
    if (!Array.isArray(value) || value.length > 10) return null
    const ids = new Set<string>()
    const result = []
    for (const row of value) {
      if (
        !row ||
        typeof row.id !== 'string' ||
        !/^[a-zA-Z0-9_-]{1,80}$/.test(row.id) ||
        ids.has(row.id)
      )
        return null
      const trip = parseTrip(JSON.stringify(row.trip))
      if (!trip) return null
      if (
        row.savedAt !== undefined &&
        (typeof row.savedAt !== 'string' ||
          !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(row.savedAt) ||
          !Number.isFinite(Date.parse(row.savedAt)) ||
          new Date(row.savedAt).toISOString() !== row.savedAt)
      )
        return null
      ids.add(row.id)
      result.push({
        id: row.id,
        trip,
        ...(row.savedAt ? { savedAt: row.savedAt } : {}),
      })
    }
    return result
  } catch {
    return null
  }
}
export default function TripExtras() {
  const { trip, change, tools, copy, lang, drafts } = useTrip()
  const raw = useSyncExternalStore(subscribe, snapshot, () => '[]')
  const library = parseLibrary(raw)
  const [error, setError] = useState('')
  const [rateDraft, setRate] = useState<string | null>(null)
  const [currencyDraft, setCurrency] = useState<string | null>(null)
  const [dateDraft, setDate] = useState<string | null>(null)
  const [includeNotes, setIncludeNotes] = useState(false)
  const [incoming, setIncoming] = useState<{
    rows: NonNullable<ReturnType<typeof parseLibrary>>
    before: string
  } | null>(null)
  if (!trip) return null
  const write = (rows: NonNullable<typeof library>, expected = raw) => {
    try {
      if (snapshot() !== expected || !parseLibrary(JSON.stringify(rows))) {
        setError(tools.conflict)
        return false
      }
      localStorage.setItem(key, JSON.stringify(rows))
      window.dispatchEvent(new Event('trip-library-change'))
      setError('')
      return true
    } catch {
      setError(copy.error)
      return false
    }
  }
  const rate = rateDraft ?? String(trip.fx?.rate ?? '')
  const date = dateDraft ?? trip.fx?.date ?? ''
  const currency = currencyDraft ?? trip.fx?.currency ?? 'THB'
  const total = Object.values(trip.budget || {}).reduce((a, b) => a + b, 0)
  const validRate =
    Number.isFinite(Number(rate)) && Number(rate) > 0 && Number(rate) <= 1000000
  return (
    <>
      <details className="budget-panel trip-library">
        <summary>{tools.library}</summary>
        <p>{tools.libraryHelp}</p>
        {!library ? (
          <div role="alert">
            <p>{copy.invalid}</p>
            {raw !== 'unavailable' && (
              <button
                type="button"
                onClick={() =>
                  downloadTrip(
                    raw,
                    'japan-trip-library-original.json',
                    'application/json',
                  )
                }
              >
                {tools.rawBackup}
              </button>
            )}
            {raw !== 'unavailable' && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(copy.confirm)) write([])
                }}
              >
                {tools.resetCopies}
              </button>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              disabled={library.length >= 10 || Object.keys(drafts).length > 0}
              onClick={() =>
                write([
                  ...library,
                  {
                    id: tripId(),
                    trip,
                    savedAt: new Date().toISOString(),
                  },
                ])
              }
            >
              {tools.saveCopy}
            </button>
            <ul>
              {library.map((row) => (
                <li key={row.id}>
                  <TripField
                    fieldKey={`library:${row.id}:title`}
                    label={tools.copyName}
                    value={row.trip.title || ''}
                    maxLength={160}
                    save={(title) =>
                      write(
                        library.map((copy) =>
                          copy.id === row.id
                            ? { ...copy, trip: { ...copy.trip, title } }
                            : copy,
                        ),
                      )
                    }
                  />
                  <p>
                    {tools.copySavedAt}:{' '}
                    {row.savedAt ? (
                      <time dateTime={row.savedAt}>
                        {new Intl.DateTimeFormat(lang, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                          timeZone: 'Asia/Tokyo',
                        }).format(new Date(row.savedAt))}{' '}
                        JST
                      </time>
                    ) : (
                      tools.dateUnknown
                    )}
                  </p>
                  <strong>{row.trip.title || copy.title}</strong> ·{' '}
                  {row.trip.startDate} · {row.trip.items.length} {copy.count}
                  <button
                    type="button"
                    disabled={Object.keys(drafts).length > 0}
                    onClick={() => {
                      if (
                        window.confirm(tools.replaceConfirm) &&
                        change(
                          () => row.trip,
                          copy.updated,
                          JSON.stringify(trip),
                        )
                      ) {
                        setRate(null)
                        setDate(null)
                        setCurrency(null)
                        setIncoming(null)
                      }
                    }}
                  >
                    {tools.loadCopy}
                  </button>
                  <button
                    type="button"
                    disabled={Boolean(drafts[`library:${row.id}:title`])}
                    onClick={() => {
                      if (window.confirm(copy.confirm))
                        write(library.filter((item) => item.id !== row.id))
                    }}
                  >
                    {tools.deleteCopy}
                  </button>
                </li>
              ))}
            </ul>
            <p>{tools.libraryBackupHelp}</p>
            <button
              type="button"
              disabled={!library.length || Object.keys(drafts).length > 0}
              onClick={() =>
                downloadTrip(
                  JSON.stringify(library, null, 2),
                  'japan-saved-copies.json',
                  'application/json',
                )
              }
            >
              {tools.libraryExport}
            </button>
          </>
        )}
        <label>
          {tools.libraryImport}
          <input
            type="file"
            accept=".json,application/json"
            disabled={!library || Object.keys(drafts).length > 0}
            onChange={async (event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              setIncoming(null)
              if (!file) return
              try {
                if (file.size > 5_120_000) throw new Error('size')
                const rows = parseLibrary(await file.text())
                if (!rows) throw new Error('schema')
                setIncoming({ rows, before: raw })
                setError('')
              } catch {
                setError(tools.invalid)
              }
            }}
          />
        </label>
        {incoming && (
          <section className="import-preview" aria-label={tools.preview}>
            <h3>{tools.preview}</h3>
            <p>
              {tools.currentCopies}: {library?.length ?? 0} ·{' '}
              {tools.incomingCopies}: {incoming.rows.length}
            </p>
            <ul>
              {incoming.rows.map((row) => (
                <li key={row.id}>
                  {row.trip.title || copy.title} · {row.trip.startDate} ·{' '}
                  {row.trip.items.length} {copy.count}
                </li>
              ))}
            </ul>
            <p>{tools.libraryRestoreConfirm}</p>
            <button
              type="button"
              disabled={Object.keys(drafts).length > 0}
              onClick={() => {
                if (
                  window.confirm(tools.libraryRestoreConfirm) &&
                  write(incoming.rows, incoming.before)
                )
                  setIncoming(null)
              }}
            >
              {tools.libraryRestore}
            </button>
            <button type="button" onClick={() => setIncoming(null)}>
              {tools.cancel}
            </button>
          </section>
        )}
      </details>
      <details className="budget-panel">
        <summary>{tools.fx}</summary>
        <p>{tools.fxHelp}</p>
        {trip.fx && (
          <p>
            {tools.fxSaved}: 1 JPY = {trip.fx.rate} {trip.fx.currency} ·{' '}
            <time>{trip.fx.date}</time>
          </p>
        )}
        <div className="trip-meta">
          <label>
            {tools.fx}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {['THB', 'USD', 'EUR'].map((code) => (
                <option key={code}>{code}</option>
              ))}
            </select>
          </label>
          <label>
            {tools.fxRate}
            <input
              type="number"
              min="0.000001"
              max="1000000"
              step="any"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              aria-invalid={Boolean(rate && !validRate)}
            />
          </label>
          <label>
            {tools.fxDate}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        {validRate && date && (
          <p role="status">
            {tools.total}:{' '}
            {new Intl.NumberFormat(lang, {
              style: 'currency',
              currency,
            }).format(total * Number(rate))}{' '}
            · {date}
          </p>
        )}
        <button
          type="button"
          disabled={!validRate || !date || Object.keys(drafts).length > 0}
          onClick={() =>
            change(
              (current) => ({
                ...current,
                fx: {
                  currency: currency as 'THB' | 'USD' | 'EUR',
                  rate: Number(rate),
                  date,
                },
              }),
              copy.updated,
              JSON.stringify(trip),
            )
          }
        >
          {tools.fxSave}
        </button>
      </details>
      <details className="budget-panel">
        <summary>{tools.calendar}</summary>
        <p>{tools.calendarHelp}</p>
        <p>
          {tools.calendarPreview}:{' '}
          {trip.items.filter((item) => item.day > 0).length}
        </p>
        <label>
          <input
            type="checkbox"
            checked={includeNotes}
            onChange={(event) => setIncludeNotes(event.target.checked)}
          />{' '}
          {tools.calendarNotes}
        </label>
        <p>{tools.calendarPrivacy}</p>
        <button
          type="button"
          disabled={
            !trip.startDate ||
            !trip.items.some((item) => item.day > 0) ||
            Object.keys(drafts).length > 0
          }
          onClick={() => {
            const text = tripCalendar(trip, lang, new Date(), includeNotes)
            if (text) {
              downloadTrip(text, tripFilename('ics'), 'text/calendar')
              setError('')
            } else setError(tools.calendarError)
          }}
        >
          {tools.calendar}
        </button>
      </details>
      {error && <p role="alert">{error}</p>}
    </>
  )
}
