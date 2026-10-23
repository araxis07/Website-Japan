'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import StreetMap from './StreetMap'

type Entry = {
  slug: string
  names: Record<Locale, string>
  region: string
  summary: string
  base: string
  keywords: string
  coordinates: [number, number]
}
export default function PrefectureExplorer({
  entries,
  regions,
  lang,
  copy,
  mapCopy,
}: {
  entries: Entry[]
  regions: { id: string; name: string }[]
  lang: Locale
  copy: Dictionary['explorer']
  mapCopy: Dictionary['streetMap']
}) {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('all')
  const [selected, setSelected] = useState<string | undefined>()
  const filtered = useMemo(
    () =>
      entries.filter(
        (p) =>
          (region === 'all' || p.region === region) &&
          `${Object.values(p.names).join(' ')} ${p.summary} ${p.keywords}`
            .toLocaleLowerCase(lang)
            .includes(query.trim().toLocaleLowerCase(lang)),
      ),
    [entries, region, query, lang],
  )
  const points = useMemo(
    () =>
      filtered.map((p) => ({ id: p.slug, names: p.names, coordinates: p.coordinates })),
    [filtered],
  )
  const active =
    filtered.find((p) => p.slug === selected) ??
    filtered.find((p) => p.slug === 'tokyo') ??
    filtered[0]
  const choose = (id: string) => setSelected(id)
  return (
    <>
      <div className="explorer-filters">
        <label>
          {copy.search}
          <input
            type="search"
            value={query}
            placeholder={copy.placeholder}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(undefined)
            }}
          />
        </label>
        <label>
          {copy.region}
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value)
              setSelected(undefined)
            }}
          >
            <option value="all">{copy.all}</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
        <p role="status">
          {filtered.length} / 47 {copy.results}
        </p>
      </div>
      {!active ? (
        <div className="empty-state">
          <p>{copy.empty}</p>
          <button
            className="button"
            onClick={() => {
              setQuery('')
              setRegion('all')
            }}
          >
            {copy.reset}
          </button>
        </div>
      ) : (
        <>
          <div className="explore-map-panel" id="explore-map">
            <StreetMap
              points={points}
              selected={selected}
              onSelect={choose}
              lang={lang}
              copy={mapCopy}
              focusZoom={10}
            />
            <div className="prefecture-preview depth-surface" aria-live="polite">
              <span className="prefecture-seal" lang="ja" aria-hidden="true">
                {active.names.ja}
              </span>
              <p>{regions.find((r) => r.id === active.region)?.name}</p>
              <h2>{active.names[lang]}</h2>
              <p>{active.summary}</p>
              <dl>
                <dt>{copy.base}</dt>
                <dd>{active.base}</dd>
              </dl>
              <Link className="button" href={`/${lang}/prefectures/${active.slug}`}>
                {copy.read} ↗
              </Link>
            </div>
          </div>
          <p className="source-note">{copy.mapNote}</p>
          <h2 className="prefecture-list-title" id="prefecture-list-title">
            {copy.list}
          </h2>
          <ul className="prefecture-grid" aria-labelledby="prefecture-list-title">
            {filtered.map((p) => (
              <li
                className="prefecture-card depth-surface"
                key={p.slug}
                data-selected={p.slug === selected}
              >
                <p>{regions.find((r) => r.id === p.region)?.name}</p>
                <h3>
                  <Link href={`/${lang}/prefectures/${p.slug}`}>{p.names[lang]}</Link>
                </h3>
                <p>{p.summary}</p>
                <div>
                  <Link href={`/${lang}/prefectures/${p.slug}`}>{copy.read} ↗</Link>
                  <button
                    type="button"
                    aria-pressed={p.slug === selected}
                    onClick={() => {
                      choose(p.slug)
                      document.getElementById('explore-map')?.scrollIntoView({
                        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                          ? 'instant'
                          : 'smooth',
                        block: 'start',
                      })
                    }}
                  >
                    {copy.show}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
