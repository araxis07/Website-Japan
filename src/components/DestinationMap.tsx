'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { destinations } from '@/data/travel'
import { places, mapUrl } from '@/data/places'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import SavePlace from './SavePlace'
import StreetMap from './StreetMap'

const overviewPoints = places.filter((p) => p.id.startsWith('destination:'))

export default function DestinationMap({
  lang,
  copy,
  mapCopy,
  exploreLabel,
}: {
  lang: Locale
  copy: Dictionary['map']
  mapCopy: Dictionary['streetMap']
  exploreLabel: string
}) {
  const [selected, setSelected] = useState('kyoto')
  const destination = destinations.find((d) => d.slug === selected)!
  const place = places.find((p) => p.id === `destination:${selected}`)!
  return (
    <section
      className="atlas-section section container"
      id="map"
      aria-labelledby="map-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-japanese" lang="ja" aria-hidden="true">
            旅の地図
          </p>
          <h2 id="map-title">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
      </div>
      <div className="atlas-layout">
        <div className="atlas-map-panel">
          <StreetMap
            points={overviewPoints}
            selected={`destination:${selected}`}
            onSelect={(id) => setSelected(id.replace('destination:', ''))}
            lang={lang}
            copy={mapCopy}
          />
          <div className="map-destination-buttons" role="group" aria-label={copy.label}>
            {destinations.map((d) => (
              <button
                key={d.slug}
                type="button"
                aria-pressed={selected === d.slug}
                onClick={() => setSelected(d.slug)}
              >
                {d[lang].name}
              </button>
            ))}
          </div>
          <Link className="button" href={`/${lang}/explore`}>
            {exploreLabel} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="atlas-selection" aria-live="polite">
          <div className="atlas-photo">
            <Image
              src={destination.image}
              alt={destination[lang].imageAlt}
              fill
              sizes="(max-width: 750px) 100vw, 40vw"
            />
          </div>
          <p className="section-japanese">{destination.japanese}</p>
          <h3>{destination[lang].name}</h3>
          <p>{destination[lang].tagline}</p>
          <div className="atlas-actions">
            <Link className="text-link" href={`/${lang}/destinations/${selected}#places`}>
              {copy.guide} ↗
            </Link>
            <a href={mapUrl(place)} className="text-link">
              Google Maps ↗
            </a>
          </div>
          <SavePlace id={place.id} name={place.names[lang]} />
        </div>
      </div>
      <p className="source-note">
        {copy.note} <a href="https://www.openstreetmap.org/copyright">{copy.credit}</a>
      </p>
    </section>
  )
}
