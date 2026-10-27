'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import StreetMap from './StreetMap'
import { placePath, pinKind, type Place } from '@/data/places'
import {
  normalizeSearch,
  placeSearchText,
  searchSuggestions,
} from '@/data/place-search'
import SavePlace from './SavePlace'
import { visitFor } from '@/data/visit-details'
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
  const revealMap = useRef(false)
  const returnTarget = useRef<HTMLButtonElement | null>(null)
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
  const information = (['hours', 'booking', 'accessibility'] as const).find(
    (field) => field === params.get('info'),
  )
  const scope =
    params.get('scope') === 'places' ||
    (!params.has('scope') && (query || category !== 'all' || information))
      ? 'places'
      : 'prefectures'
  const view = params.get('view') === 'list' ? 'list' : 'map'
  const filtered = useMemo(
    () =>
      entries.filter(
        (p) =>
          (region === 'all' || p.region === region) &&
          (category === 'all' || p.categories.includes(category)) &&
          (!information ||
            p.places.some(
              (place) =>
                (category === 'all' || place.category === category) &&
                (visitFor(place)?.[information] ||
                  visitFor(place)?.notApplicable?.[information]),
            )) &&
          normalizeSearch(
            `${Object.values(p.names).join(' ')} ${p.summary} ${p.keywords} ${p.places.map(placeSearchText).join(' ')}`,
          ).includes(normalizeSearch(query.trim())),
      ),
    [entries, region, query, category, information],
  )
  const foundPlaces = useMemo(
    () =>
      filtered
        .flatMap((p) => p.places)
        .filter(
          (place) =>
            (category === 'all' || place.category === category) &&
            (!information ||
              Boolean(
                visitFor(place)?.[information] ||
                visitFor(place)?.notApplicable?.[information],
              )) &&
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
    [filtered, category, query, information],
  )
  const pageCount = Math.max(
    1,
    Math.ceil((scope === 'places' ? foundPlaces.length : filtered.length) / 12),
  )
  const page = Math.max(
    1,
    Math.min(
      pageCount,
      /^\d{1,4}$/.test(params.get('page') || '')
        ? Number(params.get('page'))
        : 1,
    ),
  )
  const start = (page - 1) * 12
  const changePage = (page: number) => {
    updateFilters({ page: String(page) }, true)
    requestAnimationFrame(() => {
      const heading = document.getElementById('search-results-heading')
      heading?.focus({ preventScroll: true })
      heading?.scrollIntoView({ block: 'start' })
    })
  }
  const suggestions = !foundPlaces.length
    ? searchSuggestions(
        query,
        entries.flatMap((entry) => entry.places),
      )
    : []
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
  useEffect(() => {
    if (!revealMap.current || view !== 'map') return
    revealMap.current = false
    const panel = document.getElementById('explore-map')
    panel?.scrollIntoView({ block: 'start' })
    panel?.focus({ preventScroll: true })
  }, [view, selected, scope])
  const showPlace = (
    button: HTMLButtonElement,
    place: string,
    scope: string,
  ) => {
    returnTarget.current = button
    revealMap.current = true
    updateFilters({ place, scope, view: 'map' }, true)
  }
  const choose = (id: string) => {
    updateFilters({ place: id }, true)
    if (matchMedia('(max-width: 700px)').matches) sheet.current?.showModal()
  }
  return (
    <>
      <noscript>
        <style>
          {
            '.explorer-filters,.explorer-toolbar,.explore-map-panel,.prefecture-grid,.prefecture-list-title,.results-pagination{display:none}'
          }
        </style>
        <p>{mapCopy.nojs}</p>
        <ul className="prefecture-static">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link href={`/${lang}/prefectures/${entry.slug}`}>
                {entry.names[lang]}
              </Link>
            </li>
          ))}
        </ul>
      </noscript>
      <div className="explorer-filters">
        <label>
          {copy.search}
          <input
            type="search"
            value={query}
            placeholder={copy.placeholder}
            onChange={(e) => {
              updateFilters({ q: e.target.value, scope, place: '', page: '' })
            }}
          />
        </label>
        <details className="search-options">
          <summary>
            {tools.filters} ·{' '}
            {
              [
                region !== 'all',
                category !== 'all',
                Boolean(information),
              ].filter(Boolean).length
            }
          </summary>
          <div className="search-filter-fields">
            <label>
              {copy.region}
              <select
                value={region}
                onChange={(e) => {
                  updateFilters(
                    { region: e.target.value, place: '', page: '' },
                    true,
                  )
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
                  updateFilters(
                    { type: e.target.value, place: '', page: '' },
                    true,
                  )
                }
              >
                <option value="all">{tools.allCategories}</option>
                {(['culture', 'nature', 'city', 'museum'] as const).map(
                  (type) => (
                    <option key={type} value={type}>
                      {tools[type]}
                    </option>
                  ),
                )}
              </select>
            </label>
            <label>
              {tools.informationFilter}
              <select
                value={information || 'all'}
                onChange={(event) =>
                  updateFilters(
                    {
                      info: event.target.value,
                      scope: 'places',
                      place: '',
                      page: '',
                    },
                    true,
                  )
                }
              >
                <option value="all">{tools.allInformation}</option>
                {(['hours', 'booking', 'accessibility'] as const).map(
                  (field) => (
                    <option key={field} value={field}>
                      {tools[field]}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>
        </details>
        <p role="status">
          {filtered.length} / 47 {copy.results} · {foundPlaces.length}{' '}
          {tools.placeResults}
        </p>
      </div>
      {(query || region !== 'all' || category !== 'all' || information) && (
        <div
          className="active-filters"
          role="group"
          aria-label={tools.filterActive}
        >
          <span>{tools.filterActive}</span>
          {[
            ['q', query],
            [
              'region',
              region !== 'all'
                ? regions.find((r) => r.id === region)?.name
                : '',
            ],
            [
              'type',
              category !== 'all'
                ? tools[category as 'culture' | 'nature' | 'city' | 'museum']
                : '',
            ],
            ['info', information ? tools[information] : ''],
          ]
            .filter(([, label]) => label)
            .map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-label={`${tools.clear}: ${label}`}
                onClick={() =>
                  updateFilters(
                    { [key!]: '', scope, place: '', page: '' },
                    true,
                  )
                }
              >
                {label} <span aria-hidden="true">×</span>
              </button>
            ))}
        </div>
      )}
      {information && <p className="source-note">{tools.informationHelp}</p>}
      <div className="explorer-toolbar" role="group" aria-label={tools.view}>
        <label>
          {tools.browse}
          <select
            value={scope}
            onChange={(e) =>
              updateFilters(
                { scope: e.target.value, place: '', page: '' },
                true,
              )
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
        {active &&
          (query || region !== 'all' || category !== 'all' || information) && (
            <button
              type="button"
              onClick={() =>
                updateFilters({
                  q: '',
                  region: '',
                  type: '',
                  info: '',
                  scope,
                  place: '',
                  page: '',
                })
              }
            >
              {tools.clear}
            </button>
          )}
      </div>
      {!active ? (
        <div className="empty-state">
          <p>{copy.empty}</p>
          {suggestions.length > 0 && (
            <div>
              <p>{tools.suggestions}</p>
              {suggestions.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  onClick={() =>
                    updateFilters(
                      {
                        q: place.names[lang],
                        region: '',
                        type: '',
                        info: '',
                        scope: 'places',
                        place: place.id,
                        page: '',
                      },
                      true,
                    )
                  }
                >
                  {place.names[lang]}
                </button>
              ))}
            </div>
          )}
          <button
            className="button"
            onClick={() => {
              updateFilters({
                q: '',
                region: '',
                place: '',
                page: '',
                type: '',
                info: '',
                scope,
              })
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
            tabIndex={-1}
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
              {scope === 'places' && selectedPlace ? (
                <>
                  <p lang="ja">
                    {selectedPlace.address || selectedPlace.names.ja}
                  </p>
                  <p>
                    {visitFor(selectedPlace)?.access?.[lang] || tools.verify}
                  </p>
                  <p className="source-note">
                    {tools[pinKind(selectedPlace)]}. {tools.pinReference}
                  </p>
                  <SavePlace
                    id={selectedPlace.id}
                    name={selectedPlace.names[lang]}
                  />
                </>
              ) : (
                <>
                  <p>{active.summary}</p>
                  <dl>
                    <dt>{copy.base}</dt>
                    <dd>{active.base}</dd>
                  </dl>
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  updateFilters({ view: 'list' })
                  requestAnimationFrame(() => {
                    returnTarget.current?.scrollIntoView({ block: 'center' })
                    returnTarget.current?.focus({ preventScroll: true })
                  })
                }}
              >
                {tools.returnResults}
              </button>
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
          {scope === 'places' && (
            <section
              className="place-search-results"
              aria-label={tools.placeResults}
            >
              <h2 id="search-results-heading" tabIndex={-1}>
                {tools.placeResults} ({foundPlaces.length})
              </h2>
              <ul>
                {foundPlaces.slice(start, start + 12).map((place) => (
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
                    <span>
                      {tools[place.category]} /{' '}
                      {
                        entries.find((p) =>
                          p.places.some((item) => item.id === place.id),
                        )?.names[lang]
                      }
                    </span>
                    <button
                      type="button"
                      onClick={(event) =>
                        showPlace(event.currentTarget, place.id, 'places')
                      }
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
          {scope === 'prefectures' && (
            <>
              <h2
                className="prefecture-list-title"
                id="search-results-heading"
                tabIndex={-1}
              >
                {copy.list}
              </h2>
              <ul
                className="prefecture-grid"
                aria-labelledby="search-results-heading"
              >
                {filtered.slice(start, start + 12).map((p) => (
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
                        onClick={(event) =>
                          showPlace(event.currentTarget, p.slug, 'prefectures')
                        }
                      >
                        {copy.show}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <nav className="results-pagination" aria-label={tools.page}>
            <button
              type="button"
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
            >
              {tools.previousPage}
            </button>
            <span role="status">
              {tools.page} {page} / {pageCount}
            </span>
            <button
              type="button"
              disabled={page === pageCount}
              onClick={() => changePage(page + 1)}
            >
              {tools.nextPage}
            </button>
          </nav>
        </>
      )}
    </>
  )
}
