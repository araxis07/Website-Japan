'use client'
import { useState } from 'react'
import { mapUrl, type Place } from '@/data/places'
import { useTrip } from './TripProvider'

type Destination = Pick<Place, 'names' | 'address' | 'query' | 'destination'>
export default function TripDirections({
  place,
  previous,
}: {
  place: Destination
  previous?: Destination
}) {
  const { trip, tools, copy, lang } = useTrip()
  const [origin, setOrigin] = useState(previous ? 'previous' : 'device')
  const [address, setAddress] = useState('')
  const url = new URL(mapUrl(place, true, 'transit'))
  const start =
    origin === 'previous' && previous
      ? previous.query || `${previous.names.ja} ${previous.address || '日本'}`
      : origin === 'base'
        ? trip?.base
        : origin === 'manual'
          ? address.trim()
          : ''
  if (start) url.searchParams.set('origin', start)
  return (
    <div className="trip-directions">
      <a className="text-link" href={url.toString()}>
        {origin === 'previous' && previous ? `${previous.names[lang]} → ` : ''}
        {copy.directions} ↗
      </a>
      <details className="place-extra-actions">
        <summary>{tools.origin}</summary>
        <label>
          {tools.origin}: {place.names[lang]}
          <select
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
          >
            <option value="device">{tools.originDevice}</option>
            {previous && (
              <option value="previous">
                {tools.originPrevious}: {previous.names[lang]}
              </option>
            )}
            {trip?.base && (
              <option value="base">
                {tools.originBase}: {trip.base}
              </option>
            )}
            <option value="manual">{tools.originManual}</option>
          </select>
        </label>
        {origin === 'manual' && (
          <label>
            {tools.originAddress}
            <input
              value={address}
              maxLength={300}
              onChange={(event) => setAddress(event.target.value)}
            />
          </label>
        )}
        <p className="source-note">{tools.directionsHelp}</p>
      </details>
    </div>
  )
}
