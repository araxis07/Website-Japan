'use client'
import { useState } from 'react'
import { mapUrl, type Place } from '@/data/places'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import SavePlace from './SavePlace'
import StreetMap from './StreetMap'
import { visitFor, placeCategory } from '@/data/visit-details'
import { prefectures } from '@/data/prefectures'
import { useTrip } from './TripProvider'

export default function PlacesMap({
  points,
  lang,
  mapCopy,
}: {
  points: Place[]
  lang: Locale
  mapCopy: Dictionary['streetMap']
}) {
  const { tools } = useTrip()
  const [copied, setCopied] = useState('')
  const [active, setActive] = useState(points[0].id)
  return (
    <div className="local-map-layout">
      <StreetMap
        points={points}
        selected={active}
        onSelect={setActive}
        lang={lang}
        copy={mapCopy}
        tools={tools}
      />
      <ol className="map-place-list">
        {points.map((point, index) => {
          const visit = visitFor(point)
          const source =
            visit?.source ||
            prefectures.find(
              (p) =>
                p.slug ===
                (point.prefecture ||
                  (point.destination === 'mount-fuji'
                    ? 'yamanashi'
                    : point.destination)),
            )?.source
          return (
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
              <span className="place-kind">{tools[placeCategory(point)]}</span>
              <button
                className="copy-address"
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      point.address || point.names.ja,
                    )
                    setCopied(point.id)
                  } catch {
                    setCopied('error:' + point.id)
                  }
                }}
              >
                {tools.copy}
              </button>
              {copied === point.id && <p role="status">{tools.copied}</p>}
              {copied === 'error:' + point.id && (
                <p role="status">{tools.copyFail}</p>
              )}
              <details className="visit-details">
                <summary>{tools.visitInfo}</summary>
                <dl>
                  {(
                    ['access', 'hours', 'admission', 'accessibility'] as const
                  ).map((key) => (
                    <div key={key}>
                      <dt>{tools[key]}</dt>
                      <dd>{visit?.[key]?.[lang] || tools.verify}</dd>
                    </div>
                  ))}
                  {visit && (
                    <div>
                      <dt>{tools.duration}</dt>
                      <dd>
                        {visit.minutes} min · {tools.estimated}
                      </dd>
                    </div>
                  )}
                </dl>
                <p>{tools.locationNote}</p>
                {source && <a href={source}>{tools.official} ↗</a>}
                {visit?.infoSource && (
                  <a className="text-link" href={visit.infoSource}>
                    {tools.hours} / {tools.admission} ↗
                  </a>
                )}
                {visit && (
                  <p className="source-note">
                    {tools.reviewed}: <time>{visit.reviewedAt}</time>
                  </p>
                )}
              </details>
              <div className="map-links">
                <a href={mapUrl(point)}>{mapCopy.search} ↗</a>
                <a href={mapUrl(point, true)}>{mapCopy.route} ↗</a>
                <a href={mapUrl(point, true, 'walking')}>{tools.walk} ↗</a>
                <a href={mapUrl(point, true, 'transit')}>{tools.transit} ↗</a>
                {point.source && <a href={point.source}>{mapCopy.source} ↗</a>}
              </div>
              <SavePlace id={point.id} name={point.names[lang]} />
            </li>
          )
        })}
      </ol>
    </div>
  )
}
