'use client'
import { useState } from 'react'
import { useTrip } from './TripProvider'
import { tripCalendar } from '@/lib/trip-calendar'
import { tripFilename } from '@/lib/trip'
import { downloadTrip } from '@/lib/download'

export default function TripCalendarTools({
  onError,
}: {
  onError: (message: string) => void
}) {
  const { trip, lang, tools, drafts } = useTrip()
  const [includeNotes, setIncludeNotes] = useState(false)
  if (!trip) return null
  const scheduled = trip.items.filter((item) => item.day > 0)
  const timed = scheduled.filter((item) => item.time).length
  return (
    <details className="budget-panel" id="trip-calendar">
      <summary>{tools.calendar}</summary>
      <p>{tools.calendarHelp}</p>
      <p>
        {tools.calendarPreview}: {scheduled.length}
      </p>
      <dl className="calendar-counts">
        <div>
          <dt>{tools.calendarTimed}</dt>
          <dd>{timed}</dd>
        </div>
        <div>
          <dt>{tools.calendarAllDay}</dt>
          <dd>{scheduled.length - timed}</dd>
        </div>
        <div>
          <dt>{tools.calendarExcluded}</dt>
          <dd>{trip.items.length - scheduled.length}</dd>
        </div>
      </dl>
      <label>
        <input
          type="checkbox"
          checked={includeNotes}
          onChange={(event) => setIncludeNotes(event.target.checked)}
        />{' '}
        {tools.calendarNotes}
      </label>
      <p>{tools.calendarPrivacy}</p>
      <button
        type="button"
        disabled={
          !trip.startDate ||
          !trip.items.some((item) => item.day > 0) ||
          Object.keys(drafts).length > 0
        }
        onClick={async () => {
          try {
            const text = await tripCalendar(
              trip,
              lang,
              new Date(),
              includeNotes,
            )
            if (text) {
              downloadTrip(text, tripFilename('ics'), 'text/calendar')
              onError('')
            } else onError(tools.calendarError)
          } catch {
            onError(tools.calendarError)
          }
        }}
      >
        {tools.calendar}
      </button>
    </details>
  )
}
