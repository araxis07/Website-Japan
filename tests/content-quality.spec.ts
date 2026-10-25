import fs from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { test, expect } from './fixtures'
import { places, canonicalPlaceId } from '../src/data/places'
import { prefectures } from '../src/data/prefectures'
import plans from '../src/data/prefecture-plans.json'
import { visitFor, visitSource } from '../src/data/visit-details'
import photos from '../src/data/entrance-photos.json'
import { normalizeSearch, placeSearchText } from '../src/data/place-search'

test('content schema covers every place, local plan, language, credit and review gap', async ({}, info) => {
  const fields = [
    'access',
    'entrance',
    'hours',
    'admission',
    'booking',
    'accessibility',
  ] as const
  const report = []
  for (const place of places.filter((p) => !p.id.startsWith('destination:'))) {
    expect(['museum', 'nature', 'culture', 'city']).toContain(place.category)
    expect(new URL(place.source!).protocol).toBe('https:')
    for (const lang of ['en', 'ja', 'th'] as const)
      expect(place.names[lang].trim()).not.toBe('')
    const visit = visitFor(place)
    expect(
      visit?.access,
      `${place.id}: reviewed last-mile access`,
    ).toBeDefined()
    const fieldReviews = Object.fromEntries(
      fields.map((field) => {
        const checked = visit?.[field] && visitSource(visit, field)
        return [
          field,
          checked
            ? {
                ...checked,
                nextReviewBy: new Date(
                  Date.parse(checked.reviewedAt) + 90 * 86400000,
                )
                  .toISOString()
                  .slice(0, 10),
              }
            : { status: 'needs primary-source review' },
        ]
      }),
    )
    const missing = fields.filter((field) => !visit?.[field])
    if (visit)
      for (const field of fields)
        if (visit[field]) {
          const provenance = visitSource(visit, field)
          expect(new URL(provenance.source).protocol).toBe('https:')
          expect(provenance.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
          for (const lang of ['en', 'ja', 'th'] as const)
            expect(visit[field]![lang].length).toBeGreaterThan(5)
        }
    report.push({
      id: place.id,
      name: place.names.en,
      reviewedAt: visit?.reviewedAt || null,
      overdue: visit
        ? Date.now() - Date.parse(visit.reviewedAt) > 90 * 86400000
        : true,
      missing,
      suggestedOwner: 'repository maintainer',
      fieldReviews,
      source: visit?.source || place.source,
    })
  }
  for (const p of prefectures) {
    const plan = plans[p.slug as keyof typeof plans]
    const expected = places
      .filter(
        (place) =>
          !place.id.startsWith('destination:') &&
          (place.prefecture ||
            (place.destination === 'mount-fuji'
              ? 'yamanashi'
              : place.destination)) === p.slug,
      )
      .map((place) => place.id)
    expect(plan.groups.flat().sort(), p.slug).toEqual(expected.sort())
    expect(new Set(plan.groups.flat()).size).toBe(expected.length)
    for (const lang of ['en', 'ja', 'th'] as const)
      expect(plan.note[lang].length).toBeGreaterThan(10)
  }
  for (const [id, photo] of Object.entries(photos)) {
    expect(places.some((place) => canonicalPlaceId(place.id) === id)).toBe(true)
    await expect(fs.stat('public' + photo.src)).resolves.toBeDefined()
    expect(photo.artist).toBeTruthy()
    expect(new URL(photo.licenseUrl).protocol).toBe('https:')
  }
  expect(
    normalizeSearch(placeSearchText(places.find((p) => p.id === 'gion')!)),
  ).toContain(normalizeSearch('ぎおん'))
  expect(normalizeSearch('Dōtonbori')).toBe(normalizeSearch('Dotonbori'))
  // Thai vowel/tone marks must stay searchable, not be stripped as Latin accents.
  expect(normalizeSearch('เกียวโต')).toBe('เกียวโต')
  const path = info.outputPath('content-review.json')
  await fs.writeFile(
    path,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        reviewedPlaces: report.filter((row) => row.reviewedAt).length,
        places: report,
      },
      null,
      2,
    ),
  )
  await info.attach('content-review', { path, contentType: 'application/json' })
})

test('custom tile providers require secure templates and their own attribution', () => {
  const inspect = (config: Record<string, string>) =>
    execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        "import { mapProvider } from './map-provider.mjs'; console.log(JSON.stringify(mapProvider))",
      ],
      {
        encoding: 'utf8',
        stdio: 'pipe',
        env: {
          ...process.env,
          NEXT_PUBLIC_MAP_TILE_URL: '',
          NEXT_PUBLIC_MAP_CREDIT_NAME: '',
          NEXT_PUBLIC_MAP_CREDIT_URL: '',
          ...config,
        },
      },
    )
  const valid = {
    NEXT_PUBLIC_MAP_TILE_URL: 'https://tiles.example.test/{z}/{x}/{y}.png',
    NEXT_PUBLIC_MAP_CREDIT_NAME: 'Provider & contributors',
    NEXT_PUBLIC_MAP_CREDIT_URL: 'https://example.test/license',
  }
  expect(JSON.parse(inspect(valid)).origin).toBe('https://tiles.example.test')
  for (const invalid of [
    { ...valid, NEXT_PUBLIC_MAP_CREDIT_NAME: '' },
    {
      ...valid,
      NEXT_PUBLIC_MAP_TILE_URL: 'http://tiles.example.test/{z}/{x}/{y}.png',
    },
    {
      ...valid,
      NEXT_PUBLIC_MAP_TILE_URL:
        'https://user:pass@tiles.example.test/{z}/{x}/{y}.png',
    },
    {
      ...valid,
      NEXT_PUBLIC_MAP_TILE_URL: 'https://tiles.example.test/static.png',
    },
    { ...valid, NEXT_PUBLIC_MAP_CREDIT_URL: 'javascript:alert(1)' },
  ])
    expect(() => inspect(invalid)).toThrow()
})
