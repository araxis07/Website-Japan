'use client'
import { useRef, useState } from 'react'
import {
  canonicalPlaceId,
  mapUrl,
  placePath,
  pinKind,
  type Place,
} from '@/data/places'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import SavePlace from './SavePlace'
import ReportLink from './ReportLink'
import VisitFacts from './VisitFacts'
import StreetMap from './StreetMap'
import { visitFor, placeCategory } from '@/data/visit-details'
import { useTrip } from './TripProvider'
import { usePageLocation } from './usePageLocation'

export default function PlacesMap({
  points,
  lang,
  mapCopy,
  fallbackSource,
}: {
  points: Place[]
  lang: Locale
  mapCopy: Dictionary['streetMap']
  fallbackSource?: string
}) {
  const { tools } = useTrip()
  const [copied, setCopied] = useState('')
  const [selected, setSelected] = useState('')
  const location = usePageLocation()
  const anchor = location.split('#place-')[1]
  const active =
    points.find((p) => p.id === selected)?.id ||
    points.find((p) => canonicalPlaceId(p.id) === anchor)?.id ||
    points[0].id
  const sheet = useRef<HTMLDialogElement>(null)
  const choose = (id: string) => {
    setSelected(id)
    if (matchMedia('(max-width: 700px)').matches) sheet.current?.showModal()
    else
      document
        .getElementById(`place-${canonicalPlaceId(id)}`)
        ?.scrollIntoView({ block: 'nearest' })
  }
  const selectedPlace = points.find((p) => p.id === active)!
  const selectedVisit = visitFor(selectedPlace)

  return (
    <div className="local-map-layout">
      <StreetMap
        points={points}
        selected={active}
        onSelect={choose}
        lang={lang}
        copy={mapCopy}
        tools={tools}
      />
      <dialog ref={sheet} className="map-sheet" aria-label={tools.mapDetails}>
        <button type="button" onClick={() => sheet.current?.close()}>
          {tools.closeMap}
        </button>
        <h2>{selectedPlace.names[lang]}</h2>
        <p lang="ja">{selectedPlace.address}</p>
        <p>{selectedVisit?.access?.[lang] || tools.verify}</p>
        {selectedVisit?.hours && (
          <p>
            {tools.hours}: {selectedVisit.hours[lang]}
          </p>
        )}
        <p className="source-note">
          {tools[pinKind(selectedPlace)]}. {tools.pinReference}
        </p>
        <details className="visit-details">
          <summary>
            {tools.entrance} / {tools.accessibility}
          </summary>
          <VisitFacts
            visit={selectedVisit}
            fields={['entrance', 'accessibility']}
          />
        </details>
        <a className="button" href={mapUrl(selectedPlace, true)}>
          {mapCopy.route} ↗
        </a>
        <button
          type="button"
          onClick={() => {
            sheet.current?.close()
            document
              .getElementById(`place-${canonicalPlaceId(active)}`)
              ?.focus()
            document
              .getElementById(`place-${canonicalPlaceId(active)}`)
              ?.scrollIntoView({ block: 'start' })
          }}
        >
          {tools.visitInfo}
        </button>
      </dialog>
      <ol className="map-place-list">
        {points.map((point, index) => {
          const visit = visitFor(point)
          const source = visit?.source || fallbackSource
          return (
            <li
              key={point.id}
              id={`place-${canonicalPlaceId(point.id)}`}
              tabIndex={-1}
              data-selected={active === point.id}
            >
              <h3>
                <span aria-hidden="true">{index + 1}</span>
                <button
                  type="button"
                  aria-pressed={active === point.id}
                  onClick={() => setSelected(point.id)}
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
              <p className="source-note">
                {tools[pinKind(point)]}. {tools.pinReference}
              </p>
              {visit?.access && <p>{visit.access[lang]}</p>}
              {visit?.hours && (
                <p>
                  <strong>{tools.hours}:</strong> {visit.hours[lang]}
                </p>
              )}
              <details className="visit-details">
                <summary>{tools.visitInfo}</summary>
                <VisitFacts visit={visit} />
                <ReportLink path={placePath(point, lang)} />
                <p>{tools.locationNote}</p>
                {source && <a href={source}>{tools.official} ↗</a>}
                {visit?.infoSource && (
                  <a className="text-link" href={visit.infoSource}>
                    {tools.hours} / {tools.admission} ↗
                  </a>
                )}
              </details>
              <div className="map-links">
                <a href={mapUrl(point, true)}>{mapCopy.route} ↗</a>
                <details className="place-extra-actions">
                  <summary>{tools.moreMaps}</summary>
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

                  <a href={mapUrl(point)}>{mapCopy.search} ↗</a>
                  <a href={mapUrl(point, true, 'walking')}>{tools.walk} ↗</a>
                  <a href={mapUrl(point, true, 'transit')}>{tools.transit} ↗</a>
                  {point.source && (
                    <a href={point.source}>{mapCopy.source} ↗</a>
                  )}
                </details>
              </div>
              <SavePlace id={point.id} name={point.names[lang]} />
            </li>
          )
        })}
      </ol>
    </div>
  )
}
