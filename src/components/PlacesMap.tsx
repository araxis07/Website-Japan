'use client'
import { useState } from 'react'
import { mapUrl, type Place } from '@/data/places'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import SavePlace from './SavePlace'

export default function PlacesMap({
  points,
  lang,
  copy,
}: {
  points: Place[]
  lang: Locale
  copy: Dictionary['guide']
}) {
  const [active, setActive] = useState(points[0].id)
  const latitudes = points.map((p) => p.coordinates[0]),
    longitudes = points.map((p) => p.coordinates[1])
  const minLat = Math.min(...latitudes),
    maxLat = Math.max(...latitudes),
    minLng = Math.min(...longitudes),
    maxLng = Math.max(...longitudes)
  const centerLat = (minLat + maxLat) / 2
  const centerLng = (minLng + maxLng) / 2
  const longitudeKm = 111.32 * Math.cos((centerLat * Math.PI) / 180)
  // shortcut: local equirectangular scale, use a map projection library for wider regions.
  const extent = Math.max((maxLng - minLng) * longitudeKm, (maxLat - minLat) * 111.32, 1)
  return (
    <div className="local-map-layout">
      <div className="local-map" role="group" aria-label={copy.spots}>
        <span className="map-north" aria-hidden="true">
          N ↑
        </span>
        {points.map((point, index) => (
          <button
            key={point.id}
            type="button"
            aria-label={`${index + 1}. ${point.names[lang]}`}
            aria-pressed={active === point.id}
            onClick={() => setActive(point.id)}
            className="local-pin"
            style={{
              left: `${50 + (((point.coordinates[1] - centerLng) * longitudeKm) / extent) * 64}%`,
              top: `${50 - (((point.coordinates[0] - centerLat) * 111.32) / extent) * 64}%`,
            }}
          >
            {index + 1}
          </button>
        ))}
        <span className="map-scale" style={{ width: `${64 / extent}%` }}>
          1 km
        </span>
        <p>{copy.mapNote}</p>
      </div>
      <ol className="map-place-list">
        {points.map((point, index) => (
          <li key={point.id} data-selected={active === point.id}>
            <h3>
              <span aria-hidden="true">{index + 1}</span>
              <button
                type="button"
                aria-pressed={active === point.id}
                onClick={() => setActive(point.id)}
              >
                {point.names[lang]}
              </button>
            </h3>
            <div className="map-links">
              <a href={mapUrl(point)}>{copy.open} ↗</a>
              <a href={mapUrl(point, true)}>{copy.route} ↗</a>
            </div>
            <SavePlace id={point.id} name={point.names[lang]} />
          </li>
        ))}
      </ol>
    </div>
  )
}
