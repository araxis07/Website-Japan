'use client'
import Link from 'next/link'
import { useState, useSyncExternalStore } from 'react'
import { japanDate, tripDate, entryKey, dayLabel, tripPlace } from '@/lib/trip'
import { placePath } from '@/data/places'
import TripDirections from './TripDirections'
import { usePageLocation } from './usePageLocation'
import { useTrip } from './TripProvider'
const subscribe = (changed: () => void) => {
  const timer = setInterval(changed, 60000)
  return () => clearInterval(timer)
}
export default function TripOverview({
  selectDay,
}: {
  selectDay: (day: number) => void
}) {
  const { trip, tools, copy, lang } = useTrip()
  const location = usePageLocation()
  const today = useSyncExternalStore(subscribe, japanDate, () => '')
  const [chosen, setChosen] = useState<number | null>(null)
  if (!trip) return null
  const days = Array.from({ length: trip.days }, (_, i) => i + 1)
  const todayDay = days.find((day) => tripDate(trip.startDate, day) === today)
  const day = Math.min(chosen ?? todayDay ?? 1, trip.days)
  const entries = trip.items.filter((item) => item.day === day)
  const stays =
    trip.stays?.filter((stay) => stay.from <= day && stay.to > day) || []
  return (
    <div className="trip-overviews">
      <details className="trip-overview">
        <summary>{tools.daySummary}</summary>
        <ol>
          {days.map((day) => {
            const entries = trip.items.filter((item) => item.day === day)
            return (
              <li key={day}>
                <button type="button" onClick={() => selectDay(day)}>
                  {dayLabel(day, lang, copy.day)} ·{' '}
                  {tripDate(trip.startDate, day)}
                </button>
                <span>
                  {entries.length} {copy.count} · {tools.unscheduledTimes}:{' '}
                  {entries.filter((item) => !item.time).length}
                </span>
                <span>
                  {trip.stays
                    ?.filter((stay) => stay.from <= day && stay.to > day)
                    .map((stay) => stay.name)
                    .join(' · ') || tools.noStay}
                </span>
              </li>
            )
          })}
        </ol>
      </details>
      <details
        className="trip-on-the-go"
        id="travel-day"
        open={location.endsWith('#travel-day')}
      >
        <summary>{tools.onTheGo}</summary>
        <p>{tools.onTheGoHelp}</p>
        <label>
          {tools.travelDay}
          <select
            value={day}
            onChange={(event) => setChosen(Number(event.target.value))}
          >
            {days.map((day) => (
              <option value={day} key={day}>
                {dayLabel(day, lang, copy.day)} ·{' '}
                {tripDate(trip.startDate, day)}
              </option>
            ))}
          </select>
        </label>
        {todayDay !== undefined && (
          <button type="button" onClick={() => setChosen(todayDay)}>
            {tools.todayJapan}: {today}
          </button>
        )}
        {trip.base && (
          <p>
            {tools.base}: {trip.base}
          </p>
        )}
        <h3>{tools.stays}</h3>
        {stays.length ? (
          stays.map((stay) => (
            <p key={stay.id}>
              {stay.name}
              <br />
              {stay.address}
            </p>
          ))
        ) : (
          <p>{tools.noStay}</p>
        )}
        {trip.notes?.[day] && (
          <p className="preserve-lines">{trip.notes[day]}</p>
        )}
        <ol>
          {entries.map((entry, index) => {
            const place = tripPlace(entry)
            return (
              <li key={entryKey(entry)}>
                <strong>
                  {entry.time || '—'} ·{' '}
                  {entry.custom ? (
                    place.names[lang]
                  ) : (
                    <Link href={placePath(place, lang)}>
                      {place.names[lang]}
                    </Link>
                  )}
                </strong>
                <p lang={entry.custom ? undefined : 'ja'}>
                  {place.address || place.names.ja}
                </p>
                {entry.note && <p className="preserve-lines">{entry.note}</p>}
                <TripDirections
                  place={place}
                  day={day}
                  previous={index ? tripPlace(entries[index - 1]) : undefined}
                />
              </li>
            )
          })}
        </ol>
        {!entries.length && <p>{copy.emptyDay}</p>}
        <a href={`/${lang}/first-visit#help`}>{tools.emergency} ↗</a>
      </details>
    </div>
  )
}
