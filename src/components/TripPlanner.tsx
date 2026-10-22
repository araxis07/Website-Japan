'use client'
import Link from 'next/link'
import { places, mapUrl } from '@/data/places'
import { useTrip } from './TripProvider'

export default function TripPlanner() {
  const { trip, ready, error, copy, lang, change, reset, canReset } = useTrip()
  if (!ready) return <p className="trip-loading">{copy.loading}</p>
  if (!trip)
    return (
      <div role="alert" className="trip-storage-error">
        <p>{error}</p>
        {canReset && (
          <button className="button" type="button" onClick={reset}>
            {copy.reset}
          </button>
        )}
      </div>
    )
  const dayLabel = (n: number) => (lang === 'ja' ? `${n}${copy.day}` : `${copy.day} ${n}`)
  return (
    <>
      <div className="planner-toolbar">
        <label>
          {copy.days}
          <select
            value={trip.days}
            onChange={(event) => {
              const days = Number(event.target.value)
              change(
                (current) => ({
                  ...current,
                  days,
                  items: current.items.map((item) => ({
                    ...item,
                    day: item.day > days ? 0 : item.day,
                  })),
                }),
                copy.updated,
              )
            }}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <span>
          {trip.items.length} {copy.count}
        </span>
        <button
          className="button"
          type="button"
          disabled={!trip.items.length}
          onClick={() => window.print()}
        >
          {copy.print}
        </button>
      </div>
      <p className="source-note print-help">{copy.printNote}</p>
      {!trip.items.length ? (
        <div className="empty-state">
          <h2>{copy.empty}</h2>
          <Link className="text-link" href={`/${lang}#destinations`}>
            {copy.explore} ↗
          </Link>
        </div>
      ) : (
        <div className="trip-days">
          {[0, ...Array.from({ length: trip.days }, (_, i) => i + 1)].map((day) => {
            const entries = trip.items.filter((item) => item.day === day)
            if (!day && !entries.length) return null
            return (
              <section className="trip-day" key={day} aria-labelledby={`trip-day-${day}`}>
                <h2 id={`trip-day-${day}`}>{day ? dayLabel(day) : copy.unplanned}</h2>
                {day > 0 &&
                  new Set(
                    entries.map((entry) => places.find((p) => p.id === entry.id)?.destination),
                  ).size > 1 && <p className="trip-travel-note">{copy.crossCity}</p>}
                {!entries.length && <p className="empty-day">{copy.emptyDay}</p>}
                <ol>
                  {entries.map((entry, index) => {
                    const place = places.find((p) => p.id === entry.id)!
                    const move = (offset: number) =>
                      change((current) => {
                        const items = [...current.items],
                          a = items.findIndex((x) => x.id === entry.id),
                          b = items.findIndex((x) => x.id === entries[index + offset].id)
                        ;[items[a], items[b]] = [items[b], items[a]]
                        return { ...current, items }
                      }, copy.updated)
                    return (
                      <li key={entry.id} data-place-id={entry.id}>
                        <div className="trip-place-copy">
                          <h3>
                            <Link href={`/${lang}/destinations/${place.destination}#places`}>
                              {place.names[lang]}
                            </Link>
                          </h3>
                          <a className="text-link" href={mapUrl(place, true)}>
                            {place.names.ja} ↗
                          </a>
                        </div>
                        <div className="trip-item-controls">
                          <label>
                            <span className="sr-only">
                              {copy.assign}: {place.names[lang]}
                            </span>
                            <select
                              value={entry.day}
                              onChange={(event) => {
                                const nextDay = Number(event.target.value)
                                change(
                                  (current) => ({
                                    ...current,
                                    items: current.items.map((item) =>
                                      item.id === entry.id ? { ...item, day: nextDay } : item,
                                    ),
                                  }),
                                  copy.updated,
                                )
                              }}
                            >
                              <option value={0}>{copy.unplanned}</option>
                              {Array.from({ length: trip.days }, (_, i) => (
                                <option key={i} value={i + 1}>
                                  {dayLabel(i + 1)}
                                </option>
                              ))}
                            </select>
                          </label>
                          <button
                            type="button"
                            aria-label={`${copy.up}: ${place.names[lang]}`}
                            disabled={index === 0}
                            onClick={() => move(-1)}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            aria-label={`${copy.down}: ${place.names[lang]}`}
                            disabled={index === entries.length - 1}
                            onClick={() => move(1)}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            aria-label={`${copy.remove}: ${place.names[lang]}`}
                            onClick={() =>
                              change(
                                (current) => ({
                                  ...current,
                                  items: current.items.filter((item) => item.id !== entry.id),
                                }),
                                copy.removed,
                              )
                            }
                          >
                            {copy.remove}
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </section>
            )
          })}
        </div>
      )}
      <p className="planner-note">{copy.note}</p>
      <Link className="text-link planner-explore" href={`/${lang}#map`}>
        {copy.explore} ↗
      </Link>
    </>
  )
}
