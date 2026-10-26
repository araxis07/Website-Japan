'use client'
import { useState, useSyncExternalStore } from 'react'
import { japanDate, tripDate, entryKey } from '@/lib/trip'
import { places, mapUrl } from '@/data/places'
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
  const today = useSyncExternalStore(subscribe, japanDate, () => '')
  const [chosen, setChosen] = useState(1)
  if (!trip) return null
  const days = Array.from({ length: trip.days }, (_, i) => i + 1)
  const day = Math.min(chosen, trip.days)
  const todayDay = days.find((day) => tripDate(trip.startDate, day) === today)
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
                  {copy.day} {day} · {tripDate(trip.startDate, day)}
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
      <details className="trip-on-the-go">
        <summary>{tools.onTheGo}</summary>
        <p>{tools.onTheGoHelp}</p>
        <label>
          {tools.viewDay}
          <select
            value={day}
            onChange={(event) => setChosen(Number(event.target.value))}
          >
            {days.map((day) => (
              <option value={day} key={day}>
                {copy.day} {day} · {tripDate(trip.startDate, day)}
              </option>
            ))}
          </select>
        </label>
        {todayDay !== undefined && (
          <button type="button" onClick={() => setChosen(todayDay)}>
            {tools.todayJapan}: {today}
          </button>
        )}
        <h3>{tools.stays}</h3>
        <p>{stays.map((stay) => stay.name).join(' · ') || tools.noStay}</p>
        {trip.notes?.[day] && (
          <p className="preserve-lines">{trip.notes[day]}</p>
        )}
        <ol>
          {entries.map((entry) => {
            const place = places.find((place) => place.id === entry.id)!
            return (
              <li key={entryKey(entry)}>
                <strong>
                  {entry.time || '—'} · {place.names[lang]}
                </strong>
                <p lang="ja">{place.address || place.names.ja}</p>
                {entry.note && <p className="preserve-lines">{entry.note}</p>}
                <a className="button" href={mapUrl(place, true, 'transit')}>
                  {copy.directions} ↗
                </a>
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
