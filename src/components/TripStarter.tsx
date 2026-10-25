'use client'
import { useState } from 'react'
import { places } from '@/data/places'
import plans from '@/data/prefecture-plans.json'
import { useTrip } from './TripProvider'
import ApplyPlan from './ApplyPlan'
export default function TripStarter() {
  const { tools, copy, lang } = useTrip()
  const [base, setBase] = useState<keyof typeof plans>('tokyo')
  const [days, setDays] = useState(3)
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
  return (
    <details className="trip-starter">
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
          {copy.days}
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {[1, 2, 3, 5, 7, 10, 14].map((day) => (
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
