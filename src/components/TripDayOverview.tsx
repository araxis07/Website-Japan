'use client'
import { useMemo, useState } from 'react'
import { entryKey, tripPlace, timeMinutes, type TripEntry } from '@/lib/trip'
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
  const [selected, setSelected] = useState('')
  const points = useMemo(
    () =>
      entries.flatMap((entry, index) => {
        const place = tripPlace(entry)
        return place.coordinates
          ? [
              {
                id: entryKey(entry),
                ordinal: index + 1,
                names: place.names,
                coordinates: place.coordinates,
                time: entry.time,
              },
            ]
          : []
      }),
    [entries],
  )
  const coincident = open ? points.filter((point) => points.some((other) =>
    other.id !== point.id &&
    other.coordinates[0] === point.coordinates[0] &&
    other.coordinates[1] === point.coordinates[1],
  )) : []
  const selectVisit = (id: string) => {
    const card = document.getElementById(`trip-visit-${id}`)
    if (!card) return
    setSelected(id)
    card.focus({ preventScroll: true })
    card.scrollIntoView({ block: 'start' })
  }
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
        {points.length < entries.length && <p>{tools.unmappedPersonal}</p>}
        {entries.some((entry) => entry.custom?.coordinates) && (
          <p>{tools.personalPinNotice}</p>
        )}
        {coincident.length > 0 && (
          <div className="map-toolbar day-map-choices" role="group" aria-label={tools.place}>
            {coincident.map((point) => (
              <button
                key={point.id}
                type="button"
                aria-pressed={selected === point.id}
                onClick={() => selectVisit(point.id)}
              >
                {point.ordinal}. {point.names[lang]}{point.time && ` · ${point.time}`}
              </button>
            ))}
          </div>
        )}
        {open && points.length > 0 && (
          <StreetMap
            points={points}
            selected={points.find((point) => point.id === selected)?.id}
            onSelect={selectVisit}
            lang={lang}
            copy={mapCopy}
            tools={tools}
          />
        )}
      </details>
      {timed.length > 0 && (
        <details>
          <summary>{tools.timeline}</summary>
          <p className="source-note">{tools.timelineOrder}</p>
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
                    {entries.indexOf(entry) + 1}. {entry.time} · {tripPlace(entry).names[lang]}
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
