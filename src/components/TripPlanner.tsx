'use client'
import Link from 'next/link'
import { useState } from 'react'
import TripTools from './TripTools'
import TripField from './TripField'
import TripDayOverview from './TripDayOverview'
import TripStarter from './TripStarter'
import TripOverview from './TripOverview'
import type { Dictionary } from '@/i18n/dictionaries'
import {
  entryKey,
  conflictPairs,
  tripDate,
  tripDays,
  type TripEntry,
} from '@/lib/trip'
import { places, mapUrl, placePath, distanceKm } from '@/data/places'
import { useTrip } from './TripProvider'

export default function TripPlanner({
  mapCopy,
}: {
  mapCopy: Dictionary['streetMap']
}) {
  const {
    trip,
    ready,
    error,
    copy,
    lang,
    change,
    reset,
    canReset,
    tools,
    downloadRaw,
  } = useTrip()
  const [viewDay, setViewDay] = useState('all')
  const [showEmpty, setShowEmpty] = useState(false)
  const [pendingDays, setPendingDays] = useState<number | null>(null)
  if (!ready) return <p className="trip-loading">{copy.loading}</p>
  if (!trip)
    return (
      <div role="alert" className="trip-storage-error">
        <p>{error}</p>
        {canReset && (
          <>
            <button className="button" type="button" onClick={downloadRaw}>
              {tools.rawBackup}
            </button>
            <button className="button" type="button" onClick={reset}>
              {copy.reset}
            </button>
          </>
        )}
      </div>
    )
  const dayLabel = (n: number) =>
    lang === 'ja' ? `${n}${copy.day}` : `${copy.day} ${n}`
  const days = tripDays(trip)
  const updateEntry = (entry: TripEntry, patch: Partial<TripEntry>) =>
    change(
      (current) => ({
        ...current,
        items: current.items.map((item) =>
          entryKey(item) === entryKey(entry) ? { ...item, ...patch } : item,
        ),
      }),
      '',
      JSON.stringify(trip),
    )
  const applyDays = (days: number) => {
    if (
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
        JSON.stringify(trip),
      )
    ) {
      setPendingDays(null)
      setViewDay('all')
    }
  }
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
        {trip.stays?.map((stay, i) => (
          <p key={i}>
            {stay.name}: {dayLabel(stay.from)} (
            {tripDate(trip.startDate, stay.from)}) → {dayLabel(stay.to)} (
            {tripDate(trip.startDate, stay.to)})
          </p>
        ))}
        {trip.budget && (
          <p>
            {tools.total}: ¥
            {Object.values(trip.budget)
              .reduce((sum, amount) => sum + amount, 0)
              .toLocaleString(lang)}
          </p>
        )}
      </div>
      {!trip.items.length && <TripStarter />}
      <TripTools />
      {trip.items.length > 0 && (
        <TripOverview
          selectDay={(day) => {
            setViewDay(String(day))
            requestAnimationFrame(() => {
              const heading = document.getElementById(`trip-day-${day}`)
              heading?.focus()
              heading?.scrollIntoView({ block: 'start' })
            })
          }}
        />
      )}
      <div className="planner-toolbar">
        <label>
          {copy.days}
          <select
            value={trip.days}
            onChange={(event) => {
              const days = Number(event.target.value)
              if (
                days < trip.days &&
                (trip.items.some((item) => item.day > days) ||
                  Object.keys(trip.notes || {}).some(
                    (day) => Number(day) > days,
                  ) ||
                  trip.stays?.some((stay) => stay.to > days + 1))
              ) {
                setPendingDays(days)
                return
              }
              applyDays(days)
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
        <button className="button" type="button" onClick={() => window.print()}>
          {copy.print}
        </button>
      </div>
      {pendingDays !== null && (
        <section className="import-preview" aria-label={tools.preview}>
          <p>{tools.shrinkWarning}</p>
          <ul>
            {trip.items
              .filter((item) => item.day > pendingDays)
              .map((item) => (
                <li key={entryKey(item)}>
                  {places.find((p) => p.id === item.id)!.names[lang]} ·{' '}
                  {dayLabel(item.day)}
                </li>
              ))}
            {Object.keys(trip.notes || {})
              .filter((day) => Number(day) > pendingDays)
              .map((day) => (
                <li key={day}>
                  {tools.notes}: {dayLabel(Number(day))}
                </li>
              ))}
            {trip.stays
              ?.filter((stay) => stay.to > pendingDays + 1)
              .map((stay) => (
                <li key={stay.id}>
                  {stay.name} · {stay.from} → {stay.to}
                </li>
              ))}
          </ul>
          <button type="button" onClick={() => applyDays(pendingDays)}>
            {tools.applyDays}: {pendingDays}
          </button>
          <button type="button" onClick={() => setPendingDays(null)}>
            {tools.cancel}
          </button>
        </section>
      )}
      <p className="source-note print-help">{copy.printNote}</p>
      <div className="planner-view">
        <label>
          {tools.viewDay}
          <select value={viewDay} onChange={(e) => setViewDay(e.target.value)}>
            <option value="all">{tools.allDays}</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day ? dayLabel(day) : copy.unplanned}
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
      {!trip.items.length && (
        <div className="empty-state">
          <h2>{copy.empty}</h2>
          <Link className="text-link" href={`/${lang}/explore`}>
            {copy.explore} ↗
          </Link>
        </div>
      )}
      <div className="trip-days">
        {days.map((day) => {
          const entries = trip.items.filter((item) => item.day === day)
          const hidden =
            viewDay !== 'all'
              ? Number(viewDay) !== day
              : !showEmpty &&
                !entries.length &&
                !trip.notes?.[day] &&
                (trip.items.length > 0 || day !== 1)
          return (
            <section
              className="trip-day"
              hidden={hidden}
              key={day}
              aria-labelledby={`trip-day-${day}`}
            >
              <h2 id={`trip-day-${day}`} tabIndex={-1}>
                {day ? dayLabel(day) : copy.unplanned}{' '}
                <small>{tripDate(trip.startDate, day)}</small>
              </h2>
              {day > trip.days && <p>{tools.outOfRange}</p>}
              {trip.notes?.[day] && (
                <p className="print-address">{trip.notes[day]}</p>
              )}
              <div className="day-notes">
                <TripField
                  fieldKey={`day:${day}:notes`}
                  label={tools.notes}
                  multiline
                  maxLength={1000}
                  value={trip.notes?.[day] || ''}
                  save={(note) =>
                    change(
                      (current) => ({
                        ...current,
                        notes: { ...current.notes, [day]: note },
                      }),
                      '',
                      JSON.stringify(trip),
                    )
                  }
                />
              </div>
              {day > 0 &&
                entries.some((entry, index) =>
                  entries
                    .slice(index + 1)
                    .some(
                      (other) =>
                        distanceKm(
                          places.find((p) => p.id === entry.id)!.coordinates,
                          places.find((p) => p.id === other.id)!.coordinates,
                        ) > 30,
                    ),
                ) && <p className="trip-travel-note">{tools.distance}</p>}
              {day > 0 &&
                conflictPairs(entries).map(([a, b]) => (
                  <p
                    className="trip-travel-note"
                    key={`${entryKey(a)}:${entryKey(b)}`}
                  >
                    {tools.timeConflict}:{' '}
                    {places.find((p) => p.id === a.id)!.names[lang]} ({a.time})
                    ↔ {places.find((p) => p.id === b.id)!.names[lang]} ({b.time}
                    )
                  </p>
                ))}
              {day > 0 && entries.length > 0 && (
                <TripDayOverview entries={entries} mapCopy={mapCopy} />
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
              {!entries.length && <p className="empty-day">{copy.emptyDay}</p>}
              <ol>
                {entries.map((entry, index) => {
                  const place = places.find((p) => p.id === entry.id)!
                  const move = (offset: number) =>
                    change((current) => {
                      const items = [...current.items],
                        a = items.findIndex(
                          (x) => entryKey(x) === entryKey(entry),
                        ),
                        b = items.findIndex(
                          (x) =>
                            entryKey(x) === entryKey(entries[index + offset]),
                        )
                      ;[items[a], items[b]] = [items[b], items[a]]
                      return { ...current, items }
                    }, copy.updated)
                  const previous = index
                    ? places.find((p) => p.id === entries[index - 1].id)!
                    : undefined
                  const directions = new URL(mapUrl(place, true, 'transit'))
                  if (previous)
                    directions.searchParams.set(
                      'origin',
                      previous.query || `${previous.names.ja} 日本`,
                    )
                  return (
                    <li key={entryKey(entry)} data-place-id={entry.id}>
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
                        <a className="text-link" href={directions.toString()}>
                          {previous ? `${previous.names[lang]} → ` : ''}
                          {copy.directions} ↗
                        </a>
                      </div>
                      <p className="print-address" lang="ja">
                        {place.address || place.names.ja}
                      </p>
                      <p className="print-address">
                        {entry.time} {entry.note}{' '}
                        {entry.duration !== undefined &&
                          `${tools.duration}: ${entry.duration} ${tools.minuteUnit}`}{' '}
                        {entry.buffer !== undefined &&
                          `${tools.buffer}: ${entry.buffer} ${tools.minuteUnit}`}
                      </p>
                      <div className="trip-reservation">
                        <TripField
                          fieldKey={`visit:${entryKey(entry)}:time`}
                          label={`${tools.time}: ${place.names[lang]}`}
                          type="time"
                          value={entry.time || ''}
                          save={(time) => updateEntry(entry, { time })}
                        />
                        <TripField
                          fieldKey={`visit:${entryKey(entry)}:note`}
                          label={`${tools.notes}: ${place.names[lang]}`}
                          maxLength={500}
                          value={entry.note || ''}
                          save={(note) => updateEntry(entry, { note })}
                        />
                        {(['duration', 'buffer'] as const).map((key) => (
                          <TripField
                            key={key}
                            fieldKey={`visit:${entryKey(entry)}:${key}`}
                            label={`${tools[key]}: ${place.names[lang]}`}
                            type="number"
                            min={0}
                            max={1440}
                            value={entry[key] ?? ''}
                            save={(value) =>
                              updateEntry(entry, {
                                [key]: value === '' ? undefined : Number(value),
                              })
                            }
                          />
                        ))}
                      </div>
                      <div className="trip-item-controls">
                        <label>
                          <span className="sr-only">
                            {copy.assign}: {place.names[lang]}
                          </span>
                          <select
                            value={entry.day}
                            onChange={(event) =>
                              updateEntry(entry, {
                                day: Number(event.target.value),
                              })
                            }
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
                          aria-label={`${tools.repeat}: ${place.names[lang]}`}
                          onClick={() =>
                            change(
                              (current) => ({
                                ...current,
                                items: [
                                  ...current.items,
                                  {
                                    id: entry.id,
                                    day: 0,
                                    entryId: crypto.randomUUID(),
                                  },
                                ],
                              }),
                              copy.added,
                            )
                          }
                        >
                          {tools.repeat}
                        </button>
                        <button
                          type="button"
                          aria-label={`${copy.remove}: ${place.names[lang]}`}
                          onClick={() =>
                            change(
                              (current) => ({
                                ...current,
                                items: current.items.filter(
                                  (item) => entryKey(item) !== entryKey(entry),
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
        })}
      </div>
      <p className="planner-note">
        {tools.timingHelp} {copy.note}
      </p>
      <Link className="text-link planner-explore" href={`/${lang}/explore`}>
        {copy.explore} ↗
      </Link>
    </>
  )
}
