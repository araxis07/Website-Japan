'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import StreetMap from './StreetMap'
import { usePageLocation, updateFilters } from './usePageLocation'

type Entry = {
  slug: string
  names: Record<Locale, string>
  region: string
  summary: string
  base: string
  keywords: string
  categories: string[]
  coordinates: [number, number]
}
export default function PrefectureExplorer({
  entries,
  regions,
  lang,
  copy,
  mapCopy,
  tools,
}: {
  entries: Entry[]
  regions: { id: string; name: string }[]
  lang: Locale
  copy: Dictionary['explorer']
  mapCopy: Dictionary['streetMap']
  tools: Dictionary['tools']
}) {
  const suffix = usePageLocation()
  const params = new URLSearchParams(suffix.split('#')[0])
  const query = (params.get('q') || '').slice(0, 120)
  const region = regions.some((r) => r.id === params.get('region'))
    ? params.get('region')!
    : 'all'
  const selected = params.get('place') || undefined
  const category = ['culture', 'nature', 'city', 'museum'].includes(
    params.get('type') || '',
  )
    ? params.get('type')!
    : 'all'
  const view = params.get('view') === 'list' ? 'list' : 'map'
  const filtered = useMemo(
    () =>
      entries.filter(
        (p) =>
          (region === 'all' || p.region === region) &&
          (category === 'all' || p.categories.includes(category)) &&
          `${Object.values(p.names).join(' ')} ${p.summary} ${p.keywords}`
            .normalize('NFKC')
            .toLocaleLowerCase(lang)
            .includes(query.trim().normalize('NFKC').toLocaleLowerCase(lang)),
      ),
    [entries, region, query, lang, category],
  )
  const points = useMemo(
    () =>
      filtered.map((p) => ({
        id: p.slug,
        names: p.names,
        coordinates: p.coordinates,
      })),
    [filtered],
  )
  const active =
    filtered.find((p) => p.slug === selected) ??
    filtered.find((p) => p.slug === 'tokyo') ??
    filtered[0]
  const choose = (id: string) => updateFilters({ place: id }, true)
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
              updateFilters({ q: e.target.value, place: '' })
            }}
          />
        </label>
        <label>
          {copy.region}
          <select
            value={region}
            onChange={(e) => {
              updateFilters({ region: e.target.value, place: '' }, true)
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
        <label>
          {tools.category}
          <select
            value={category}
            onChange={(e) =>
              updateFilters({ type: e.target.value, place: '' }, true)
            }
          >
            <option value="all">{copy.all}</option>
            {(['culture', 'nature', 'city', 'museum'] as const).map((type) => (
              <option key={type} value={type}>
                {tools[type]}
              </option>
            ))}
          </select>
        </label>
        <p role="status">
          {filtered.length} / 47 {copy.results}
        </p>
      </div>
      <div className="explorer-toolbar" role="group" aria-label={tools.view}>
        <button
          type="button"
          aria-pressed={view === 'map'}
          onClick={() => updateFilters({ view: 'map' })}
        >
          {tools.map}
        </button>
        <button
          type="button"
          aria-pressed={view === 'list'}
          onClick={() => updateFilters({ view: 'list' })}
        >
          {tools.list}
        </button>
        {active && (query || region !== 'all' || category !== 'all') && (
          <button
            type="button"
            onClick={() =>
              updateFilters({ q: '', region: '', type: '', place: '' })
            }
          >
            {tools.clear}
          </button>
        )}
      </div>
      {!active ? (
        <div className="empty-state">
          <p>{copy.empty}</p>
          <button
            className="button"
            onClick={() => {
              updateFilters({ q: '', region: '', place: '', type: '' })
            }}
          >
            {copy.reset}
          </button>
        </div>
      ) : (
        <>
          <div
            className="explore-map-panel"
            id="explore-map"
            hidden={view === 'list'}
          >
            <StreetMap
              points={points}
              selected={active?.slug}
              onSelect={choose}
              lang={lang}
              copy={mapCopy}
              focusZoom={selected ? 10 : undefined}
              tools={tools}
            />
            <div
              className="prefecture-preview depth-surface"
              aria-live="polite"
            >
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
              <Link
                className="button"
                href={`/${lang}/prefectures/${active.slug}`}
              >
                {copy.read} ↗
              </Link>
            </div>
          </div>
          <p className="source-note">
            {tools.mapNote} {copy.mapNote}
          </p>
          <h2 className="prefecture-list-title" id="prefecture-list-title">
            {copy.list}
          </h2>
          <ul
            className="prefecture-grid"
            aria-labelledby="prefecture-list-title"
          >
            {filtered.map((p) => (
              <li
                className="prefecture-card depth-surface"
                key={p.slug}
                data-selected={p.slug === selected}
              >
                <p>{regions.find((r) => r.id === p.region)?.name}</p>
                <h3>
                  <Link href={`/${lang}/prefectures/${p.slug}`}>
                    {p.names[lang]}
                  </Link>
                </h3>
                <p>{p.summary}</p>
                <div>
                  <Link href={`/${lang}/prefectures/${p.slug}`}>
                    {copy.read} ↗
                  </Link>
                  <button
                    type="button"
                    aria-pressed={p.slug === selected}
                    onClick={() => {
                      updateFilters({ place: p.slug, view: 'map' }, true)
                      requestAnimationFrame(() =>
                        document.getElementById('explore-map')?.scrollIntoView({
                          behavior: matchMedia(
                            '(prefers-reduced-motion: reduce)',
                          ).matches
                            ? 'instant'
                            : 'smooth',
                          block: 'start',
                        }),
                      )
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
