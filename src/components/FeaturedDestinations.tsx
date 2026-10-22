'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { categories, destinations, type Category } from '@/data/travel'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import SavePlace from './SavePlace'
import Icon from './Icon'

export default function FeaturedDestinations({
  dict,
  lang,
}: {
  dict: Dictionary
  lang: Locale
}) {
  const [category, setCategory] = useState<Category>('all')
  const [query, setQuery] = useState('')
  const search = query.trim().toLocaleLowerCase(lang)
  const places = destinations.filter((place) => {
    const copy = place[lang]
    return (
      (category === 'all' || place.category === category) &&
      `${copy.name} ${copy.region} ${copy.description} ${dict.destinations[place.category]} ${place.en.name} ${place.th.name} ${place.japanese}`
        .toLocaleLowerCase(lang)
        .includes(search)
    )
  })

  return (
    <section
      id="destinations"
      className="section container"
      aria-labelledby="destinations-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-japanese" lang="ja" aria-hidden="true">
            旅先を見つける
          </p>
          <h2 id="destinations-title">{dict.destinations.title}</h2>
          <p>{dict.destinations.subtitle}</p>
        </div>
        <span className="section-stamp" aria-hidden="true">
          旅
        </span>
      </div>
      <div className="discovery-toolbar">
        <div className="filters" role="group" aria-label={dict.destinations.title}>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {dict.destinations[item]}
            </button>
          ))}
        </div>
        <div className="search-field">
          <Icon name="search" />
          <label className="sr-only" htmlFor="destination-search">
            {dict.destinations.search}
          </label>
          <input
            id="destination-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.destinations.placeholder}
          />
        </div>
      </div>
      <p className="results-count" role="status">
        {places.length} {dict.destinations.results}
      </p>
      <div className="destination-grid">
        {places.map((place) => {
          const copy = place[lang]
          return (
            <article className="destination-result" key={place.slug}>
              <Link href={`/${lang}/destinations/${place.slug}`} className="destination-card">
                <div className="destination-photo">
                  <Image
                    src={place.image}
                    alt={copy.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                  />
                  <span className="photo-tag">{dict.destinations[place.category]}</span>
                  <span className="photo-japanese" lang="ja" aria-hidden="true">
                    {place.japanese}
                  </span>
                </div>
                <div className="destination-content">
                  <div className="destination-meta">
                    <span>{copy.region}</span>
                    <span>{copy.duration}</span>
                  </div>
                  <div className="destination-title">
                    <h3>{copy.name}</h3>
                    <span className="circle-arrow">
                      <Icon name="arrow" />
                    </span>
                  </div>
                  <p>{copy.tagline}</p>
                </div>
              </Link>
              <SavePlace id={`destination:${place.slug}`} name={copy.name} />
            </article>
          )
        })}
      </div>
      {places.length === 0 && (
        <div className="empty-state">
          <p>{dict.destinations.empty}</p>
          <button
            className="button"
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('all')
            }}
          >
            {dict.destinations.reset}
          </button>
        </div>
      )}
    </section>
  )
}
