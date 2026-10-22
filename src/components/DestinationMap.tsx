'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { destinations } from '@/data/travel'
import { places, mapUrl } from '@/data/places'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import SavePlace from './SavePlace'

const offsets: Record<string, [number, number]> = {
  kyoto: [-15, -4],
  osaka: [-16, 7],
  'mount-fuji': [8, 9],
  tokyo: [12, 0],
  hokkaido: [-7, 0],
  okinawa: [5, -2],
}
export default function DestinationMap({
  lang,
  copy,
}: {
  lang: Locale
  copy: Dictionary['map']
}) {
  const [selected, setSelected] = useState('kyoto')
  const destination = destinations.find((d) => d.slug === selected)!
  const place = places.find((p) => p.id === `destination:${selected}`)!
  return (
    <section className="atlas-section section container" id="map" aria-labelledby="map-title">
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
        <div className="atlas-map" role="group" aria-label={copy.label}>
          <Image
            src="/images/japan-map.svg"
            alt=""
            fill
            sizes="(max-width: 750px) 100vw, 45vw"
          />
          <svg viewBox="0 0 600 700" aria-hidden="true" className="atlas-lines">
            {destinations.map((d) => {
              const p = places.find((p) => p.id === `destination:${d.slug}`)!,
                x = ((p.coordinates[1] - 122) / 25) * 600,
                y = ((46 - p.coordinates[0]) / 23) * 700,
                offset = offsets[d.slug]
              return (
                <g key={d.slug}>
                  <line x1={x} y1={y} x2={x + offset[0] * 6} y2={y + offset[1] * 7} />
                  <circle cx={x} cy={y} r="4" />
                </g>
              )
            })}
          </svg>
          {destinations.map((d) => {
            const p = places.find((p) => p.id === `destination:${d.slug}`)!,
              offset = offsets[d.slug]
            return (
              <button
                key={d.slug}
                type="button"
                className="atlas-pin"
                aria-pressed={selected === d.slug}
                onClick={() => setSelected(d.slug)}
                style={{
                  left: `${((p.coordinates[1] - 122) / 25) * 100 + offset[0]}%`,
                  top: `${((46 - p.coordinates[0]) / 23) * 100 + offset[1]}%`,
                }}
              >
                {d[lang].name}
              </button>
            )
          })}
          <span className="map-north" aria-hidden="true">
            N ↑
          </span>
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
        {copy.note}{' '}
        <a href="https://www.naturalearthdata.com/about/terms-of-use/">{copy.credit}</a>
      </p>
    </section>
  )
}
