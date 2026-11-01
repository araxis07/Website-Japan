'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import Icon from './Icon'
import ApplyPlan from './ApplyPlan'

type Journey = {
  days: number
  image: string
  title: string
  text: string
  transport: string
  stops: {
    slug: string
    days: number
    startDay: number
    title: string
    text: string
  }[]
}

export default function Journeys({
  copy,
  lang,
  journeys,
}: {
  copy: Dictionary['journeys']
  lang: Locale
  journeys: Journey[]
}) {
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
            <h2 id="journeys-title">{copy.title}</h2>
            <p>{copy.subtitle}</p>
          </div>
          <div
            className="journey-tabs"
            role="group"
            aria-label={copy.label}
          >
            {journeys.map((item, index) => (
              <button
                type="button"
                key={item.days}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                {item.days}
                <span>{copy.days}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="journey-paper" key={journey.days}>
          <div className="journey-overview">
            <div className="journey-image">
              <Image
                src={journey.image}
                alt=""
                fill
                sizes="(max-width: 750px) 100vw, 40vw"
              />
              <span className="journey-ticket">
                {journey.days}
                <small>{copy.days}</small>
              </span>
            </div>
            <div className="journey-description">
              <h3>{journey.title}</h3>
              <p>{journey.text}</p>
              <div className="journey-transport">
                <Icon name="train" />
                <p>
                  <strong>{copy.transport}</strong>
                  {journey.transport}
                </p>
              </div>
            </div>
          </div>
          <ol className="journey-route" aria-label={journey.title}>
            {journey.stops.map((stop) => {
              const start = stop.startDay
              const range = `${start}${stop.days > 1 ? `–${start + stop.days - 1}` : ''}`
              return (
                <li key={stop.slug}>
                  <span className="route-dot" aria-hidden="true" />
                  <span className="route-days">
                    {lang !== 'ja'
                      ? `${copy.day} ${range}`
                      : `${range}${copy.day}`}
                  </span>
                  <Link href={`/${lang}/destinations/${stop.slug}`}>
                    <h4>{stop.title}</h4>
                    <Icon name="arrow" />
                  </Link>
                  <p>{stop.text}</p>
                </li>
              )
            })}
          </ol>
        </div>
        <ApplyPlan
          days={journey.days}
          entries={journey.stops.map((stop) => ({
            id: `destination:${stop.slug}`,
            day: stop.startDay,
          }))}
        />
        <p className="source-note journey-note">{copy.note}</p>
      </div>
    </section>
  )
}
