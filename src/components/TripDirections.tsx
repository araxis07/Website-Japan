'use client'
import { useState } from 'react'
import { mapUrl, type Place } from '@/data/places'
import { useTrip } from './TripProvider'

type Destination = Pick<Place, 'names' | 'address' | 'query' | 'destination'>
export default function TripDirections({
  place,
  previous,
  day,
}: {
  place: Destination
  previous?: Destination
  day?: number
}) {
  const { trip, tools, copy, lang } = useTrip()
  const [selectedOrigin, setOrigin] = useState(previous ? 'previous' : 'device')
  const [address, setAddress] = useState('')
  const stays =
    trip?.stays?.filter(
      (stay) => day && stay.from <= day && stay.to >= day && stay.address,
    ) || []
  const stay = stays.find((stay) => `stay:${stay.id}` === selectedOrigin)
  const origin =
    (selectedOrigin.startsWith('stay:') && !stay) ||
    (selectedOrigin === 'previous' && !previous) ||
    (selectedOrigin === 'base' && !trip?.base)
      ? 'device'
      : selectedOrigin
  const url = new URL(mapUrl(place, true, 'transit'))
  const start =
    origin === 'previous' && previous
      ? previous.query || `${previous.names.ja} ${previous.address || '日本'}`
      : stay
        ? `${stay.name} ${stay.address}`
        : origin === 'base'
          ? trip?.base
          : origin === 'manual'
            ? address.trim()
            : ''
  if (start) url.searchParams.set('origin', start)
  const originSummary =
    origin === 'previous' && previous
      ? `${tools.originPrevious}: ${previous.names[lang]}`
      : stay
        ? `${stay.to === day ? tools.originCheckout : tools.originStay}: ${stay.name}`
        : origin === 'base'
          ? `${tools.originBase}: ${trip?.base}`
          : origin === 'manual'
            ? start
              ? `${tools.originManual}: ${start}`
              : tools.originManualEmpty
            : tools.originDevice
  return (
    <div className="trip-directions">
      <p className="trip-origin-summary">
        {tools.origin}: {originSummary}
      </p>
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
            {stays.map((stay) => (
              <option key={stay.id} value={`stay:${stay.id}`}>
                {stay.to === day ? tools.originCheckout : tools.originStay}:{' '}
                {stay.name}
              </option>
            ))}
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
