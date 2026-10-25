'use client'
import { useState } from 'react'
import { canonicalPlaceId, places } from '@/data/places'
import { mergeTrips } from '@/lib/trip'
import { useTrip } from './TripProvider'
export default function ApplyPlan({
  entries,
  days,
}: {
  entries: { id: string; day: number }[]
  days: number
}) {
  const { trip, change, copy, tools, lang } = useTrip()
  const [before, setBefore] = useState<string | null>(null)
  const [start, setStart] = useState(1)
  const incoming = {
    version: 1 as const,
    days: start + days - 1,
    items: entries.map((item) => ({
      id: canonicalPlaceId(item.id),
      day: item.day + start - 1,
    })),
  }
  return (
    <div className="apply-plan">
      <button
        className="button"
        type="button"
        disabled={!trip}
        onClick={() => setBefore(JSON.stringify(trip))}
      >
        {tools.apply}
      </button>
      <p className="source-note">{tools.applyHelp}</p>
      {before && (
        <section className="import-preview" aria-label={tools.preview}>
          <h3>{tools.preview}</h3>
          <p>{tools.applyImpact}</p>
          <label>
            {tools.startDay}
            <select
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
            >
              {Array.from({ length: 31 - days }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <ol>
            {incoming.items.map((item) => (
              <li key={item.id}>
                {places.find((p) => p.id === item.id)?.names[lang]} · {copy.day}{' '}
                {trip?.items.find((old) => old.id === item.id && !old.entryId)
                  ?.day === 0
                  ? copy.unplanned
                  : (trip?.items.find(
                      (old) => old.id === item.id && !old.entryId,
                    )?.day ?? item.day)}
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => {
              if (
                change(
                  (current) => mergeTrips(current, incoming),
                  copy.updated,
                  before,
                )
              )
                setBefore(null)
            }}
          >
            {tools.applyConfirm}
          </button>
          <button type="button" onClick={() => setBefore(null)}>
            {tools.cancel}
          </button>
        </section>
      )}
    </div>
  )
}
