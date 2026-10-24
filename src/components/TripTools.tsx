'use client'
import { useState } from 'react'
import { places } from '@/data/places'
import { useTrip } from './TripProvider'
import { mergeTrips, parseTrip, type Trip } from '@/lib/trip'
import { downloadTrip, offlineTrip } from '@/lib/trip-export'

export default function TripTools() {
  const { trip, change, copy, tools, lang, undo, canUndo } = useTrip()
  const [incoming, setIncoming] = useState<{
    trip: Trip
    before: string
  } | null>(null)
  const [error, setError] = useState('')
  if (!trip) return null
  return (
    <div className="trip-tools">
      <div className="trip-meta">
        {(['title', 'startDate', 'base'] as const).map((key) => (
          <label key={key}>
            {key === 'startDate' ? tools.start : tools[key]}
            <input
              key={trip[key] || key}
              type={key === 'startDate' ? 'date' : 'text'}
              maxLength={160}
              defaultValue={trip[key] || ''}
              onBlur={(event) => {
                const value = event.target.value
                if (value !== trip[key])
                  change(
                    (current) => ({ ...current, [key]: value }),
                    copy.updated,
                  )
              }}
            />
          </label>
        ))}
      </div>
      <details className="budget-panel">
        <summary>{tools.budget}</summary>
        <p>{tools.budgetHelp}</p>
        <div className="trip-meta">
          {(['stay', 'transport', 'food', 'activities'] as const).map((key) => (
            <label key={key}>
              {tools[key]}
              <input
                type="number"
                min="0"
                max="100000000"
                step="1"
                key={trip.budget?.[key] ?? key}
                defaultValue={trip.budget?.[key] ?? ''}
                onBlur={(event) => {
                  if (!event.target.validity.valid) return
                  const amount = Number(event.target.value)
                  change(
                    (current) => ({
                      ...current,
                      budget: { ...current.budget, [key]: amount },
                    }),
                    copy.updated,
                  )
                }}
              />
            </label>
          ))}
        </div>
        <p>
          <strong>
            {tools.total}: ¥
            {new Intl.NumberFormat(lang).format(
              Object.values(trip.budget || {}).reduce((a, b) => a + b, 0),
            )}
          </strong>
        </p>
      </details>
      <div className="trip-file-actions">
        <button type="button" onClick={undo} disabled={!canUndo}>
          {tools.undo}
        </button>
        <button
          type="button"
          onClick={() =>
            downloadTrip(
              JSON.stringify(trip, null, 2),
              'japan-trip.json',
              'application/json',
            )
          }
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
              if (file.size > 64_000) {
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
              offlineTrip(trip, lang, copy, tools),
              'japan-trip.html',
              'text/html',
            )
          }
        >
          {tools.offline}
        </button>
      </div>
      <p className="source-note">{tools.privacy}</p>
      <p className="source-note">{tools.offlineHelp}</p>
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
          <details>
            <summary>{tools.preview}</summary>
            <ol>
              {incoming.trip.items.map((item) => (
                <li key={item.id}>
                  {places.find((p) => p.id === item.id)!.names[lang]} ·{' '}
                  {item.day || copy.unplanned} · {item.time}
                  <p>{item.note}</p>
                </li>
              ))}
            </ol>
            {Object.entries(incoming.trip.notes || {}).map(([day, note]) => (
              <p key={day}>
                {copy.day} {day}: {note}
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
                  (current) => mergeTrips(current, incoming.trip)!,
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
