'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { journeys } from '@/data/journeys'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import Icon from './Icon'

export default function Journeys({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [selected, setSelected] = useState(0)
  const journey = journeys[selected]
  return (
    <section
      id="journeys"
      className="journeys-section section"
      aria-labelledby="journeys-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-japanese" lang="ja" aria-hidden="true">
              旅のしおり
            </p>
            <h2 id="journeys-title">{dict.journeys.title}</h2>
            <p>{dict.journeys.subtitle}</p>
          </div>
          <div className="journey-tabs" role="group" aria-label={dict.journeys.label}>
            {journeys.map((item, index) => (
              <button
                type="button"
                key={item.days}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                {item.days}
                <span>{dict.journeys.days}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="journey-paper" key={journey.days}>
          <div className="journey-overview">
            <div className="journey-image">
              <Image src={journey.image} alt="" fill sizes="(max-width: 750px) 100vw, 40vw" />
              <span className="journey-ticket">
                {journey.days}
                <small>{dict.journeys.days}</small>
              </span>
            </div>
            <div className="journey-description">
              <h3>{journey[lang].title}</h3>
              <p>{journey[lang].text}</p>
              <div className="journey-transport">
                <Icon name="train" />
                <p>
                  <strong>{dict.journeys.transport}</strong>
                  {journey[lang].transport}
                </p>
              </div>
            </div>
          </div>
          <ol className="journey-route" aria-label={journey[lang].title}>
            {journey.stops.map((stop, index) => {
              const start =
                1 + journey.stops.slice(0, index).reduce((total, item) => total + item.days, 0)
              const range = `${start}${stop.days > 1 ? `–${start + stop.days - 1}` : ''}`
              return (
                <li key={stop.slug}>
                  <span className="route-dot" aria-hidden="true" />
                  <span className="route-days">
                    {lang !== 'ja'
                      ? `${dict.journeys.day} ${range}`
                      : `${range}${dict.journeys.day}`}
                  </span>
                  <Link href={`/${lang}/destinations/${stop.slug}`}>
                    <h4>{stop[lang].title}</h4>
                    <Icon name="arrow" />
                  </Link>
                  <p>{stop[lang].text}</p>
                </li>
              )
            })}
          </ol>
        </div>
        <p className="source-note journey-note">{dict.journeys.note}</p>
      </div>
    </section>
  )
}
