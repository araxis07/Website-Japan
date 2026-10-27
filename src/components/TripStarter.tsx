'use client'
import { useState } from 'react'
import { places } from '@/data/places'
import plans from '@/data/prefecture-plans.json'
import { useTrip } from './TripProvider'
import ApplyPlan from './ApplyPlan'
export default function TripStarter() {
  const { tools, copy, lang } = useTrip()
  const [base, setBase] = useState<keyof typeof plans>('tokyo')
  const [requestedDays, setDays] = useState(2)
  const days = Math.min(requestedDays, plans[base].groups.length)
  const [interest, setInterest] = useState('all')
  const entries = plans[base].groups
    .slice(0, days)
    .flatMap((group, i) =>
      group
        .filter(
          (id) =>
            interest === 'all' ||
            places.find((p) => p.id === id)?.category === interest,
        )
        .map((id) => ({ id, day: i + 1 })),
    )
  const plannedDays = new Set(entries.map((entry) => entry.day)).size
  return (
    <details className="trip-starter" id="trip-starter">
      <summary>{tools.starter}</summary>
      <p>{tools.starterHelp}</p>
      <div className="trip-meta">
        <label>
          {tools.arrivalBase}
          <select
            value={base}
            onChange={(e) => setBase(e.target.value as keyof typeof plans)}
          >
            {(['tokyo', 'osaka', 'hokkaido', 'okinawa'] as const).map((id) => (
              <option key={id} value={id}>
                {places.find((p) => p.id === `destination:${id}`)!.names[lang]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {tools.planLength}
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {Array.from(
              { length: plans[base].groups.length },
              (_, index) => index + 1,
            ).map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </label>
        <label>
          {tools.category}
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="all">{tools.allCategories}</option>
            {(['culture', 'museum', 'city', 'nature'] as const).map((key) => (
              <option key={key} value={key}>
                {tools[key]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p>{plans[base].note[lang]}</p>
      <p className="starter-coverage" role="status">
        {tools.plannedDays}: {plannedDays} / {days} · {tools.blankDays}:{' '}
        {days - plannedDays}
      </p>
      <p className="source-note">{tools.starterScope}</p>
      {entries.length ? (
        <ApplyPlan
          key={`${base}:${days}:${interest}`}
          entries={entries}
          days={days}
        />
      ) : (
        <p>{copy.empty}</p>
      )}
    </details>
  )
}
