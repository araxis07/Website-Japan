'use client'
import { useState, useSyncExternalStore } from 'react'
import { parseTrip, tripFilename, type Trip } from '@/lib/trip'
import { downloadTrip } from '@/lib/trip-export'
import { tripCalendar } from '@/lib/trip-calendar'
import { useTrip } from './TripProvider'
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
export function parseLibrary(raw: string): { id: string; trip: Trip }[] | null {
  try {
    if (raw.length > 5_120_000) return null
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
      ids.add(row.id)
      result.push({ id: row.id, trip })
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
  const [rate, setRate] = useState('')
  const [currency, setCurrency] = useState('THB')
  const [date, setDate] = useState('')
  if (!trip) return null
  const write = (rows: NonNullable<typeof library>) => {
    try {
      if (snapshot() !== raw || !parseLibrary(JSON.stringify(rows))) {
        setError(tools.conflict)
        return
      }
      localStorage.setItem(key, JSON.stringify(rows))
      window.dispatchEvent(new Event('trip-library-change'))
      setError('')
    } catch {
      setError(copy.error)
    }
  }
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
                write([...library, { id: crypto.randomUUID(), trip }])
              }
            >
              {tools.saveCopy}
            </button>
            <ul>
              {library.map((row) => (
                <li key={row.id}>
                  <strong>{row.trip.title || copy.title}</strong> ·{' '}
                  {row.trip.startDate} · {row.trip.items.length} {copy.count}
                  <button
                    type="button"
                    disabled={Object.keys(drafts).length > 0}
                    onClick={() => {
                      if (window.confirm(tools.replaceConfirm))
                        change(
                          () => row.trip,
                          copy.updated,
                          JSON.stringify(trip),
                        )
                    }}
                  >
                    {tools.loadCopy}
                  </button>
                  <button
                    type="button"
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
          </>
        )}
      </details>
      <details className="budget-panel">
        <summary>{tools.fx}</summary>
        <p>{tools.fxHelp}</p>
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
      </details>
      <details className="budget-panel">
        <summary>{tools.calendar}</summary>
        <p>{tools.calendarHelp}</p>
        <button
          type="button"
          disabled={!trip.startDate || Object.keys(drafts).length > 0}
          onClick={() => {
            const text = tripCalendar(trip, lang)
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
