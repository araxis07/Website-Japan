'use client'
import Link from 'next/link'
import { useTrip } from './TripProvider'

export default function SavePlace({ id, name }: { id: string; name: string }) {
  const { trip, ready, copy, change, lang } = useTrip()
  const saved = trip?.items.some((item) => item.id === id) ?? false
  return (
    <div className="save-place">
      <button
        className="save-button"
        type="button"
        disabled={!ready || !trip}
        aria-pressed={saved}
        aria-label={`${saved ? copy.saved : copy.save}: ${name}`}
        onClick={() =>
          change(
            (current) => ({
              ...current,
              items: saved
                ? current.items.filter((item) => item.id !== id)
                : [...current.items, { id, day: 0 }],
            }),
            saved ? copy.removed : copy.added,
          )
        }
      >
        <span aria-hidden="true">{saved ? '✓' : '+'}</span> {saved ? copy.saved : copy.save}
      </button>
      {ready && !trip && <Link href={`/${lang}/my-trip`}>{copy.plan}</Link>}
    </div>
  )
}
