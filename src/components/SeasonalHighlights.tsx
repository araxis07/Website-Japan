'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { seasons } from '@/data/travel'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'

export default function SeasonalHighlights({
  dict,
  lang,
}: {
  dict: Dictionary
  lang: Locale
}) {
  const [selected, setSelected] = useState(2)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  return (
    <section
      id="seasons"
      className="section container"
      aria-labelledby="seasons-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-japanese" lang="ja" aria-hidden="true">
            四季を旅する
          </p>
          <h2 id="seasons-title">{dict.seasons.title}</h2>
          <p>{dict.seasons.subtitle}</p>
        </div>
      </div>
      <div
        className="season-tabs"
        role="tablist"
        aria-label={dict.seasons.label}
      >
        {seasons.map((season, index) => (
          <button
            key={season.id}
            id={`tab-${season.id}`}
            ref={(element) => {
              tabs.current[index] = element
            }}
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls={`panel-${season.id}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index
              if (event.key === 'ArrowRight')
                next = (index + 1) % seasons.length
              else if (event.key === 'ArrowLeft')
                next = (index + seasons.length - 1) % seasons.length
              else if (event.key === 'Home') next = 0
              else if (event.key === 'End') next = seasons.length - 1
              else return
              event.preventDefault()
              setSelected(next)
              tabs.current[next]?.focus()
            }}
          >
            <span className="season-kanji" lang="ja" aria-hidden="true">
              {season.kanji}
            </span>
            <span>
              <strong>{season[lang].name}</strong>
              <small>{season[lang].months}</small>
            </span>
          </button>
        ))}
      </div>
      {seasons.map((season, index) => (
        <div
          key={season.id}
          id={`panel-${season.id}`}
          className={`season-panel season-${season.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${season.id}`}
          hidden={selected !== index}
          tabIndex={0}
        >
          <div className="season-image">
            <Image
              src={season.image}
              alt={season[lang].alt}
              fill
              sizes="(max-width: 700px) 100vw, 55vw"
            />
          </div>
          <div className="season-copy">
            <span className="season-months">{season[lang].months}</span>
            <h3>{season[lang].title}</h3>
            <p>{season[lang].description}</p>
            <p className="season-tip">
              <Icon name="leaf" />
              {season[lang].note}
            </p>
            <Link
              className="text-link"
              href={`/${lang}/destinations/${season.slug}`}
            >
              {dict.seasons.explore} {season[lang].destination}
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      ))}
      <div className="season-footnote">
        <p>
          {dict.seasons.note} {dict.tools.typicalSeason}
        </p>
        <a href="https://www.japan.travel/en/plan/weather/">
          {dict.seasons.source}
          <Icon name="external" />
        </a>
      </div>
    </section>
  )
}
