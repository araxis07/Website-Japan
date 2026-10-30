'use client'
import Link from 'next/link'
import { useTrip } from './TripProvider'
import { canonicalPlaceId } from '@/data/places'

export default function SavePlace({
  id: sourceId,
  name,
}: {
  id: string
  name: string
}) {
  const id = canonicalPlaceId(sourceId)
  const { trip, ready, copy, change, lang } = useTrip()
  const entries = trip?.items.filter((item) => item.id === id) || []
  const saved = entries.length > 0
  if (
    entries.length > 1 ||
    entries.some(
      (entry) =>
        entry.day > 0 ||
        entry.time ||
        entry.note ||
        entry.duration !== undefined ||
        entry.buffer !== undefined,
    )
  )
    return (
      <div className="save-place">
        <Link className="save-button" href={`/${lang}/my-trip`}>
          {copy.saved}: {name} · {copy.plan} ↗
        </Link>
      </div>
    )
  return (
    <div className="save-place">
      <button
        className="save-button"
        type="button"
        disabled={!ready || !trip}
        aria-pressed={saved}
        aria-label={`${saved ? copy.remove : copy.save}: ${name}`}
        onClick={() =>
          change(
            (current) => ({
              ...current,
              items: saved
                ? current.items.filter((item) => item.id !== id)
                : [...current.items, { id, day: 0 }],
            }),
            saved ? copy.removed : copy.added,
            saved ? JSON.stringify(trip) : undefined,
          )
        }
      >
        <span aria-hidden="true">{saved ? '−' : '+'}</span>{' '}
        {saved ? copy.remove : copy.save}
      </button>
      {saved && (
        <Link
          className="save-next-step"
          href={`/${lang}/my-trip#trip-day-0`}
          aria-label={`${copy.schedule}: ${name}`}
        >
          {copy.schedule} ↗
        </Link>
      )}
      {ready && !trip && <Link href={`/${lang}/my-trip`}>{copy.plan}</Link>}
    </div>
  )
}
