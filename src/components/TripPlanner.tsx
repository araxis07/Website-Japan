'use client'
import Link from 'next/link'
import { useState } from 'react'
import TripTools from './TripTools'
import { tripDate } from '@/lib/trip'
import { places, mapUrl, placePath, distanceKm } from '@/data/places'
import { useTrip } from './TripProvider'

export default function TripPlanner() {
  const { trip, ready, error, copy, lang, change, reset, canReset, tools } =
    useTrip()
  const [viewDay, setViewDay] = useState('all')
  const [showEmpty, setShowEmpty] = useState(false)
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
  const dayLabel = (n: number) =>
    lang === 'ja' ? `${n}${copy.day}` : `${copy.day} ${n}`
  return (
    <>
      <div className="trip-print-summary">
        {trip.title && <h2>{trip.title}</h2>}
        {trip.base && (
          <p>
            {tools.base}: {trip.base}
          </p>
        )}
        {trip.startDate && (
          <p>
            {tools.start}: {trip.startDate}
          </p>
        )}
        {trip.budget && (
          <p>
            {tools.total}: ¥
            {Object.values(trip.budget)
              .reduce((sum, amount) => sum + amount, 0)
              .toLocaleString(lang)}
          </p>
        )}
      </div>
      <TripTools />
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
      <div className="planner-view">
        <label>
          {tools.viewDay}
          <select value={viewDay} onChange={(e) => setViewDay(e.target.value)}>
            <option value="all">{tools.allDays}</option>
            <option value="0">{copy.unplanned}</option>
            {Array.from({ length: trip.days }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {dayLabel(i + 1)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showEmpty}
            onChange={(e) => setShowEmpty(e.target.checked)}
          />{' '}
          {tools.showEmpty}
        </label>
      </div>
      {!trip.items.length ? (
        <div className="empty-state">
          <h2>{copy.empty}</h2>
          <Link className="text-link" href={`/${lang}/explore`}>
            {copy.explore} ↗
          </Link>
        </div>
      ) : (
        <div className="trip-days">
          {[0, ...Array.from({ length: trip.days }, (_, i) => i + 1)].map(
            (day) => {
              const entries = trip.items.filter((item) => item.day === day)
              if (!day && !entries.length) return null
              return (
                <section
                  className="trip-day"
                  hidden={
                    (viewDay !== 'all' &&
                      Number(viewDay) <= trip.days &&
                      Number(viewDay) !== day) ||
                    (viewDay === 'all' &&
                      !showEmpty &&
                      !entries.length &&
                      !trip.notes?.[day])
                  }
                  key={day}
                  aria-labelledby={`trip-day-${day}`}
                >
                  <h2 id={`trip-day-${day}`}>
                    {day ? dayLabel(day) : copy.unplanned}{' '}
                    <small>{tripDate(trip.startDate, day)}</small>
                  </h2>
                  {trip.notes?.[day] && (
                    <p className="print-address">{trip.notes[day]}</p>
                  )}
                  <label className="day-notes">
                    {tools.notes}
                    <textarea
                      key={trip.notes?.[day] || day}
                      maxLength={1000}
                      defaultValue={trip.notes?.[day] || ''}
                      onBlur={(e) => {
                        const note = e.target.value
                        if (note !== trip.notes?.[day])
                          change(
                            (current) => ({
                              ...current,
                              notes: { ...current.notes, [day]: note },
                            }),
                            copy.updated,
                          )
                      }}
                    />
                  </label>
                  {day > 0 &&
                    entries.some((entry, index) =>
                      entries
                        .slice(index + 1)
                        .some(
                          (other) =>
                            distanceKm(
                              places.find((p) => p.id === entry.id)!
                                .coordinates,
                              places.find((p) => p.id === other.id)!
                                .coordinates,
                            ) > 30,
                        ),
                    ) && <p className="trip-travel-note">{tools.distance}</p>}
                  {day > 0 &&
                    entries.some(
                      (entry, index) =>
                        entry.time &&
                        entries
                          .slice(index + 1)
                          .some((other) => other.time === entry.time),
                    ) && (
                      <p className="trip-travel-note">{tools.timeConflict}</p>
                    )}
                  {day > 0 &&
                    new Set(
                      entries.map(
                        (entry) =>
                          places.find((p) => p.id === entry.id)?.destination,
                      ),
                    ).size > 1 && (
                      <p className="trip-travel-note">{copy.crossCity}</p>
                    )}
                  {!entries.length && (
                    <p className="empty-day">{copy.emptyDay}</p>
                  )}
                  <ol>
                    {entries.map((entry, index) => {
                      const place = places.find((p) => p.id === entry.id)!
                      const move = (offset: number) =>
                        change((current) => {
                          const items = [...current.items],
                            a = items.findIndex((x) => x.id === entry.id),
                            b = items.findIndex(
                              (x) => x.id === entries[index + offset].id,
                            )
                          ;[items[a], items[b]] = [items[b], items[a]]
                          return { ...current, items }
                        }, copy.updated)
                      return (
                        <li key={entry.id} data-place-id={entry.id}>
                          <div className="trip-place-copy">
                            <span className="place-kind">
                              {place.id.startsWith('destination:')
                                ? tools.destination
                                : tools.place}
                            </span>
                            <h3>
                              <Link href={placePath(place, lang)}>
                                {place.names[lang]}
                              </Link>
                            </h3>
                            <a className="text-link" href={mapUrl(place, true)}>
                              {copy.directions} ↗
                            </a>
                          </div>
                          <p className="print-address" lang="ja">
                            {place.address || place.names.ja}
                          </p>
                          <p className="print-address">
                            {entry.time} {entry.note}
                          </p>
                          <div className="trip-reservation">
                            <label>
                              {tools.time}
                              <input
                                type="time"
                                aria-label={`${tools.time}: ${place.names[lang]}`}
                                key={entry.time || 'time'}
                                defaultValue={entry.time || ''}
                                onBlur={(e) => {
                                  const time = e.target.value
                                  if (time !== entry.time)
                                    change(
                                      (current) => ({
                                        ...current,
                                        items: current.items.map((item) =>
                                          item.id === entry.id
                                            ? { ...item, time }
                                            : item,
                                        ),
                                      }),
                                      copy.updated,
                                    )
                                }}
                              />
                            </label>
                            <label>
                              {tools.notes}
                              <input
                                maxLength={500}
                                aria-label={`${tools.notes}: ${place.names[lang]}`}
                                key={entry.note || 'note'}
                                defaultValue={entry.note || ''}
                                onBlur={(e) => {
                                  const note = e.target.value
                                  if (note !== entry.note)
                                    change(
                                      (current) => ({
                                        ...current,
                                        items: current.items.map((item) =>
                                          item.id === entry.id
                                            ? { ...item, note }
                                            : item,
                                        ),
                                      }),
                                      copy.updated,
                                    )
                                }}
                              />
                            </label>
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
                                        item.id === entry.id
                                          ? { ...item, day: nextDay }
                                          : item,
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
                                    items: current.items.filter(
                                      (item) => item.id !== entry.id,
                                    ),
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
            },
          )}
        </div>
      )}
      <p className="planner-note">{copy.note}</p>
      <Link className="text-link planner-explore" href={`/${lang}/explore`}>
        {copy.explore} ↗
      </Link>
    </>
  )
}
