'use client'
import { canonicalPlaceId } from '@/data/places'
import { mergeTrips } from '@/lib/trip'
import { useTrip } from './TripProvider'
export default function ApplyPlan({
  entries,
  days,
}: {
  entries: { id: string; day: number }[]
  days: number
}) {
  const { trip, change, copy, tools } = useTrip()
  return (
    <div className="apply-plan">
      <button
        className="button"
        type="button"
        disabled={!trip}
        onClick={() =>
          change(
            (current) =>
              mergeTrips(current, {
                version: 1,
                days,
                items: entries.map((item) => ({
                  ...item,
                  id: canonicalPlaceId(item.id),
                })),
              }),
            copy.updated,
          )
        }
      >
        {tools.apply}
      </button>
      <p className="source-note">{tools.applyHelp}</p>
    </div>
  )
}
