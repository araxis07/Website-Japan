'use client'

import { useMemo, useRef } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import StreetMap from './StreetMap'
import { placePath, type Place } from '@/data/places'
import { normalizeSearch, placeSearchText } from '@/data/place-search'
import SavePlace from './SavePlace'
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
  places: Place[]
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
  const sheet = useRef<HTMLDialogElement>(null)
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
  const scope = params.get('scope') === 'places' ? 'places' : 'prefectures'
  const view = params.get('view') === 'list' ? 'list' : 'map'
  const filtered = useMemo(
    () =>
      entries.filter(
        (p) =>
          (region === 'all' || p.region === region) &&
          (category === 'all' || p.categories.includes(category)) &&
          normalizeSearch(
            `${Object.values(p.names).join(' ')} ${p.summary} ${p.keywords} ${p.places.map(placeSearchText).join(' ')}`,
          ).includes(normalizeSearch(query.trim())),
      ),
    [entries, region, query, category],
  )
  const foundPlaces = useMemo(
    () =>
      filtered
        .flatMap((p) => p.places)
        .filter(
          (place) =>
            (category === 'all' || place.category === category) &&
            (!query.trim() ||
              normalizeSearch(placeSearchText(place)).includes(
                normalizeSearch(query.trim()),
              ) ||
              filtered.some(
                (p) =>
                  p.places.includes(place) &&
                  normalizeSearch(
                    Object.values(p.names).join(' ') + p.keywords,
                  ).includes(normalizeSearch(query.trim())),
              )),
        ),
    [filtered, category, query],
  )
  const points = useMemo(
    () =>
      scope === 'places'
        ? foundPlaces
        : filtered.map((p) => ({
            id: p.slug,
            names: p.names,
            coordinates: p.coordinates,
          })),
    [scope, foundPlaces, filtered],
  )
  const selectedPlace =
    foundPlaces.find((p) => p.id === selected) || foundPlaces[0]
  const active =
    filtered.find((p) =>
      scope === 'places'
        ? p.places.some((place) => place.id === selectedPlace?.id)
        : p.slug === selected,
    ) ??
    filtered.find((p) => p.slug === 'tokyo') ??
    filtered[0]
  const choose = (id: string) => {
    updateFilters({ place: id }, true)
    if (matchMedia('(max-width: 700px)').matches) sheet.current?.showModal()
  }
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
            <option value="all">{tools.allCategories}</option>
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
        <label>
          {tools.browse}
          <select
            value={scope}
            onChange={(e) =>
              updateFilters({ scope: e.target.value, place: '' }, true)
            }
          >
            <option value="prefectures">{copy.results}</option>
            <option value="places">{tools.place}</option>
          </select>
        </label>
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
              selected={scope === 'places' ? selectedPlace?.id : active?.slug}
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
              <h2>
                {scope === 'places'
                  ? selectedPlace?.names[lang]
                  : active.names[lang]}
              </h2>
              <p>{active.summary}</p>
              <dl>
                <dt>{copy.base}</dt>
                <dd>{active.base}</dd>
              </dl>
              <Link
                className="button"
                href={
                  scope === 'places' && selectedPlace
                    ? placePath(selectedPlace, lang)
                    : `/${lang}/prefectures/${active.slug}`
                }
              >
                {copy.read} ↗
              </Link>
            </div>
          </div>
          <dialog
            ref={sheet}
            className="map-sheet"
            aria-label={tools.mapDetails}
          >
            <button type="button" onClick={() => sheet.current?.close()}>
              {tools.closeMap}
            </button>
            <h2>
              {scope === 'places'
                ? selectedPlace?.names[lang]
                : active.names[lang]}
            </h2>
            <p>
              {scope === 'places' ? selectedPlace?.address : active.summary}
            </p>
            <Link
              className="button"
              href={
                scope === 'places' && selectedPlace
                  ? placePath(selectedPlace, lang)
                  : `/${lang}/prefectures/${active.slug}`
              }
            >
              {copy.read} ↗
            </Link>
          </dialog>
          {(query || category !== 'all' || scope === 'places') && (
            <section
              className="place-search-results"
              aria-label={tools.placeResults}
            >
              <h2>
                {tools.placeResults} ({foundPlaces.length})
              </h2>
              <ul>
                {foundPlaces.map((place) => (
                  <li
                    key={place.id}
                    data-selected={
                      scope === 'places' && selectedPlace?.id === place.id
                    }
                  >
                    <Link href={placePath(place, lang)}>
                      {place.names[lang]}
                    </Link>
                    <span lang="ja">{place.names.ja}</span>
                    <button
                      type="button"
                      onClick={() => {
                        updateFilters(
                          { scope: 'places', place: place.id, view: 'map' },
                          true,
                        )
                        document
                          .getElementById('explore-map')
                          ?.scrollIntoView({ block: 'start' })
                      }}
                    >
                      {copy.show}
                    </button>
                    <SavePlace id={place.id} name={place.names[lang]} />
                  </li>
                ))}
              </ul>
            </section>
          )}
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
                data-selected={p.slug === active.slug}
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
                    aria-pressed={p.slug === active.slug}
                    onClick={() => {
                      updateFilters(
                        { place: p.slug, view: 'map', scope: 'prefectures' },
                        true,
                      )
                      requestAnimationFrame(() =>
                        document.getElementById('explore-map')?.scrollIntoView({
                          behavior:
                            document.documentElement.dataset.motion ===
                              'still' ||
                            matchMedia('(prefers-reduced-motion: reduce)')
                              .matches
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
