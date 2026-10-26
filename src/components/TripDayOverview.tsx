'use client'
import { useMemo, useState } from 'react'
import { places } from '@/data/places'
import { entryKey, timeMinutes, type TripEntry } from '@/lib/trip'
import type { Dictionary } from '@/i18n/dictionaries'
import StreetMap from './StreetMap'
import { useTrip } from './TripProvider'
export default function TripDayOverview({
  entries,
  mapCopy,
}: {
  entries: TripEntry[]
  mapCopy: Dictionary['streetMap']
}) {
  const { lang, tools } = useTrip()
  const [open, setOpen] = useState(false)
  const points = useMemo(
    () =>
      entries.map((entry) => ({
        ...places.find((p) => p.id === entry.id)!,
        id: entryKey(entry),
      })),
    [entries],
  )
  const timed = entries
    .filter((entry) => entry.time)
    .sort((a, b) => a.time!.localeCompare(b.time!))
  return (
    <>
      <details
        className="day-map"
        onToggle={(event) => setOpen(event.currentTarget.open)}
      >
        <summary>{tools.dayMap}</summary>
        <p>{tools.routeOrder}</p>
        {open && (
          <StreetMap points={points} lang={lang} copy={mapCopy} tools={tools} />
        )}
      </details>
      {timed.length > 0 && (
        <details>
          <summary>{tools.timeline}</summary>
          <ol className="trip-timeline">
            {timed.map((entry, index) => {
              const next = timed[index + 1]
              const gap =
                next && entry.duration !== undefined
                  ? timeMinutes(next.time!) -
                    timeMinutes(entry.time!) -
                    entry.duration -
                    (entry.buffer || 0)
                  : null
              return (
                <li key={entryKey(entry)}>
                  <strong>
                    {entry.time} ·{' '}
                    {places.find((p) => p.id === entry.id)!.names[lang]}
                  </strong>
                  <p>
                    {tools.duration}: {entry.duration ?? '—'} {tools.minuteUnit}{' '}
                    · {tools.buffer}: {entry.buffer ?? '—'} {tools.minuteUnit}
                  </p>
                  {gap !== null && (
                    <p>
                      {gap < 0 ? tools.overlapMinutes : tools.freeTime}:{' '}
                      {Math.abs(gap)} {tools.minuteUnit}
                    </p>
                  )}
                  {next && entry.buffer === undefined && (
                    <p className="source-note">{tools.uncheckedTransfer}</p>
                  )}
                  {entry.duration === undefined && (
                    <p className="source-note">{tools.unknownDuration}</p>
                  )}
                </li>
              )
            })}
          </ol>
        </details>
      )}
    </>
  )
}
