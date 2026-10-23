'use client'
import { useState } from 'react'
import { mapUrl, type Place } from '@/data/places'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import SavePlace from './SavePlace'
import StreetMap from './StreetMap'

export default function PlacesMap({
  points,
  lang,
  mapCopy,
}: {
  points: Place[]
  lang: Locale
  mapCopy: Dictionary['streetMap']
}) {
  const [active, setActive] = useState(points[0].id)
  return (
    <div className="local-map-layout">
      <StreetMap
        points={points}
        selected={active}
        onSelect={setActive}
        lang={lang}
        copy={mapCopy}
      />
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
            {point.address && (
              <p className="map-location">
                <span>{mapCopy.location}</span>
                <span lang="ja">{point.address}</span>
              </p>
            )}
            <div className="map-links">
              <a href={mapUrl(point)}>{mapCopy.search} ↗</a>
              <a href={mapUrl(point, true)}>{mapCopy.route} ↗</a>
              {point.source && <a href={point.source}>{mapCopy.source} ↗</a>}
            </div>
            <SavePlace id={point.id} name={point.names[lang]} />
          </li>
        ))}
      </ol>
    </div>
  )
}
