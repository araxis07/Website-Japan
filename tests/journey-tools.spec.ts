import fs from 'node:fs'
import sharp from 'sharp'
import photos from '../src/data/prefecture-photos.json'
import { prefectures } from '../src/data/prefectures'
import { destinations } from '../src/data/travel'
import { regionalPlanning } from '../src/data/regional-planning'
import { test, expect, openDetails } from './fixtures'
import {
  emptyTrip,
  mergeTrips,
  parseTrip,
  tripDate,
  tripKey,
} from '../src/lib/trip'
import { offlineTrip } from '../src/lib/trip-export'
import { canonicalPlaceId, places, distanceKm } from '../src/data/places'
import en from '../src/i18n/dictionaries/en.json'

test('legacy aliases migrate without duplicate saves and imports validate all user fields', () => {
  const plan = parseTrip(
    JSON.stringify({
      ...emptyTrip,
      items: [
        { id: 'pref:kyoto:kiyomizu-dera', day: 0 },
        { id: 'kiyomizu', day: 2 },
      ],
    }),
  )!
  expect(plan.items).toEqual([{ id: 'kiyomizu', day: 2 }])
  expect(new Set(places.map((p) => p.id)).size).toBe(places.length)
  expect(canonicalPlaceId('__proto__')).toBe('__proto__')
  for (const extra of [
    { title: 9 },
    { base: 'x'.repeat(161) },
    { startDate: '2026-02-30' },
    { startDate: '2026-13-01' },
    { notes: { __proto__: 9 } },
    { notes: { 31: 'bad' } },
    { budget: { food: -1 } },
    { budget: { food: '20' } },
    { budget: { wrong: 20 } },
  ]) {
    // An object literal __proto__ property is not an own key; test its JSON form below.
    if ('notes' in extra && !Object.keys(extra.notes || {}).length) continue
    expect(parseTrip(JSON.stringify({ ...emptyTrip, ...extra }))).toBeNull()
  }
  expect(
    parseTrip('{"version":1,"days":7,"items":[],"notes":{"__proto__":"x"}}'),
  ).toBeNull()
  expect(
    parseTrip(
      JSON.stringify({
        ...emptyTrip,
        items: [{ id: 'gion', day: 1, time: '25:00' }],
      }),
    ),
  ).toBeNull()
  const enriched = {
    ...emptyTrip,
    title: 'Japan',
    startDate: '2028-02-28',
    base: 'Kyoto',
    notes: { 1: 'Rest' },
    budget: { food: 5000 },
    items: [{ id: 'gion', day: 1, time: '09:30', note: '予約' }],
  }
  expect(parseTrip(JSON.stringify(enriched))).toEqual(enriched)
  expect(tripDate(enriched.startDate, 3)).toBe('2028-03-01')
  expect(
    mergeTrips(enriched, {
      ...emptyTrip,
      items: [
        { id: 'gion', day: 3 },
        { id: 'sensoji', day: 2 },
      ],
    }),
  ).toEqual({
    ...enriched,
    items: [enriched.items[0], { id: 'sensoji', day: 2 }],
  })
  expect(distanceKm([35, 135], [35, 135])).toBe(0)
  expect(distanceKm([35, 135], [36, 135])).toBeGreaterThan(110)
})

test('offline file escapes private content and contains no executable scripts or remote assets', () => {
  const html = offlineTrip(
    {
      ...emptyTrip,
      title: '<script>alert(1)</script>',
      base: '<img src=x onerror=alert(1)>',
      items: [{ id: 'gion', day: 1, note: '<svg onload=alert(1)>' }],
    },
    'en',
    en.trip,
    en.tools,
  )
  expect(html).not.toContain('<script>')
  expect(html).not.toContain('<img')
  expect(html).not.toContain('<svg')
  expect(html).toContain('&lt;script&gt;')
  expect(html).toContain('default-src')
  expect(html).toContain('https://www.google.com/maps/dir/')
})

test('explorer state survives refresh, language changes and history without rebuilding the map', async ({
  page,
}) => {
  await page.goto('/en/explore')
  await page.locator('.street-map').scrollIntoViewIfNeeded()
  await expect(page.locator('.street-map')).toHaveAttribute(
    'data-point-count',
    '47',
  )
  await expect(page.locator('.map-cluster').first()).toBeVisible()
  const mapId = await page
    .locator('.street-map')
    .evaluate((el) => (el as HTMLElement & { _leaflet_id: number })._leaflet_id)
  await page.getByRole('searchbox').fill('Kyoto')
  await expect(page).toHaveURL(/q=Kyoto/)
  await expect(page.locator('.leaflet-marker-icon')).toHaveCount(1)
  expect(
    await page
      .locator('.street-map')
      .evaluate(
        (el) => (el as HTMLElement & { _leaflet_id: number })._leaflet_id,
      ),
  ).toBe(mapId)
  await page.reload()
  await expect(page.getByRole('searchbox')).toHaveValue('Kyoto')
  await page.locator('.language-picker summary').click()
  await page.locator('.language-picker a[lang=th]').click()
  await expect(page).toHaveURL(/\/th\/explore\?q=Kyoto/)
  await expect(page.getByRole('searchbox')).toHaveValue('Kyoto')
  await page.getByRole('button', { name: 'รายการ', exact: true }).click()
  await expect(page.locator('.explore-map-panel')).toBeHidden()
  await page.getByRole('button', { name: 'แผนที่', exact: true }).click()
  await expect(page.locator('.explore-map-panel')).toBeVisible()
  await page.goto('/en/first-visit#help')
  await page.locator('.language-picker summary').click()
  await expect(page.locator('.language-picker a[lang=ja]')).toHaveAttribute(
    'href',
    '/ja/first-visit#help',
  )
})

test('one place stays saved across guide and prefecture pages; undo restores removal', async ({
  page,
}) => {
  await page.goto('/en/destinations/kyoto')
  await page
    .getByRole('button', {
      name: 'Save to my trip: Kiyomizu-dera',
      exact: true,
    })
    .click()
  await page.goto('/en/prefectures/kyoto')
  await expect(
    page.getByRole('button', {
      name: 'Saved to my trip: Kiyomizu-dera',
      exact: true,
    }),
  ).toHaveCount(1)
  await page.goto('/en/my-trip')
  await openDetails(page.locator('.trip-visit-editor').first())
  await page
    .getByRole('button', { name: 'Remove: Kiyomizu-dera', exact: true })
    .click()
  await page
    .locator('.trip-feedback')
    .getByRole('button', { name: 'Undo', exact: true })
    .click()
  await expect(page.locator('.trip-day li')).toHaveCount(1)
})

test('backup import previews changes, merges safely and never overwrites on invalid files', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  const upload = page.locator('.trip-file-actions input[type=file]')
  await upload.setInputFiles({
    name: 'bad.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{bad'),
  })
  await expect(page.locator('.trip-tools [role=alert]')).toContainText(
    'not a supported',
  )
  const incoming = {
    ...emptyTrip,
    title: 'Autumn',
    startDate: '2026-11-01',
    base: '京都',
    items: [{ id: 'gion', day: 2, note: 'Tea at 10', time: '10:00' }],
  }
  await upload.setInputFiles({
    name: 'trip.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(incoming)),
  })
  await expect(page.locator('.import-preview')).toContainText('Autumn')
  page.once('dialog', (dialog) => dialog.accept())
  await page
    .getByRole('button', { name: 'Replace my trip', exact: true })
    .click()
  await expect(
    page.getByRole('textbox', { name: 'Trip name', exact: true }),
  ).toHaveValue('Autumn')
  await page.reload()
  await expect(
    page.getByRole('textbox', { name: 'Trip name', exact: true }),
  ).toHaveValue('Autumn')
  const backup = page.waitForEvent('download')
  await page
    .getByRole('button', { name: 'Download backup', exact: true })
    .click()
  expect((await backup).suggestedFilename()).toMatch(/^japan-trip-.*\.json$/)
  const second = {
    ...emptyTrip,
    items: [
      { id: 'gion', day: 1 },
      { id: 'sensoji', day: 3 },
    ],
  }
  await upload.setInputFiles({
    name: 'second.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(second)),
  })
  await page
    .getByRole('button', { name: 'Add new places to my trip', exact: true })
    .click()
  const saved = JSON.parse(
    (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
  )
  expect(saved.title).toBe('Autumn')
  expect(saved.items).toEqual([...incoming.items, second.items[1]])
  const offline = page.waitForEvent('download')
  await page
    .getByRole('button', { name: 'Save readable offline guide', exact: true })
    .click()
  expect((await offline).suggestedFilename()).toMatch(/^japan-trip-.*\.html$/)
})

test('import refuses stale previews after another tab changes the plan', async ({
  page,
  context,
}) => {
  await page.goto('/en/my-trip')
  await page.locator('.trip-file-actions input[type=file]').setInputFiles({
    name: 'trip.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({ ...emptyTrip, items: [{ id: 'gion', day: 1 }] }),
    ),
  })
  const other = await context.newPage()
  await other.goto('/en/destinations/tokyo')
  await other
    .getByRole('button', { name: 'Save to my trip: Sensoji', exact: true })
    .click()
  await expect(page.locator('.trip-day li')).toHaveCount(1)
  await page
    .getByRole('button', { name: 'Add new places to my trip', exact: true })
    .click()
  await expect(page.locator('.trip-error-toast')).toContainText('another tab')
  await expect(page.locator('.trip-day li')).toHaveCount(1)
})

test('shared motion pause survives reload and appearance controls do not cover map buttons', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/en')
  await openDetails(page.locator('.appearance-panel'))
  await page.getByRole('button', { name: 'Pause effects', exact: true }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'still')
  await page
    .getByRole('button', { name: 'Explore the 3D scene', exact: true })
    .click()
  await expect(page.locator('.diorama')).toHaveAttribute('data-moving', 'false')
  await page.goto('/en/explore')
  await page.locator('.street-map').scrollIntoViewIfNeeded()
  const zoom = page.locator('.leaflet-control-zoom-in')
  await expect(zoom).toBeVisible()
  await zoom.click()
  const covered = await zoom.evaluate((el) => {
    const r = el.getBoundingClientRect()
    return !el.contains(
      document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2),
    )
  })
  expect(covered).toBe(false)
})

test('every prefecture has a real local cover, localized planning and reusable place identities', async () => {
  const sources = places.filter((p) => p.source).map((p) => p.source)
  expect(new Set(sources).size).toBe(sources.length)
  for (const p of prefectures) {
    const photo = photos[p.slug as keyof typeof photos]
    const guide = destinations.find(
      (d) =>
        d.slug === p.slug ||
        (p.slug === 'yamanashi' && d.slug === 'mount-fuji'),
    )
    const src = photo?.src || guide?.image
    expect(src, p.slug).toBeTruthy()
    expect(fs.existsSync('public' + src), p.slug).toBe(true)
    const metadata = await sharp('public' + src).metadata()
    expect(metadata.width).toBeGreaterThanOrEqual(640)
    for (const lang of ['en', 'ja', 'th'] as const) {
      expect(regionalPlanning[p.region][lang].length).toBeGreaterThan(50)
      expect(
        (photo?.alt[lang] || guide?.[lang].imageAlt)!.length,
      ).toBeGreaterThan(0)
    }
    if (photo) {
      expect(photo.source).toMatch(
        /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
      )
      expect(photo.artist.length).toBeGreaterThan(1)
      expect(photo.license).toMatch(/CC BY|Public domain/)
      if (photo.license !== 'Public domain')
        expect(photo.licenseUrl).toMatch(/^https:\/\//)
    }
  }
  const migrated = parseTrip(
    JSON.stringify({
      ...emptyTrip,
      items: [
        { id: 'pref:hokkaido:odori-park', day: 0 },
        { id: 'odori', day: 2, note: 'Picnic' },
      ],
    }),
  )!
  expect(migrated.items).toEqual([{ id: 'odori', day: 2, note: 'Picnic' }])
  expect(
    parseTrip(
      JSON.stringify({
        ...emptyTrip,
        items: [
          { id: 'pref:hokkaido:odori-park', day: 1, note: 'Keep this' },
          { id: 'odori', day: 2, note: 'Conflicting note' },
        ],
      }),
    ),
  ).toBeNull()
})

test('regional guide, spelling aliases and print notes remain useful on small screens', async ({
  page,
}) => {
  await page.goto(
    '/th/explore?scope=prefectures&q=' + encodeURIComponent('โอซากา'),
  )
  await expect(page.locator('.prefecture-grid > *')).toHaveCount(1)
  await page.goto('/en/prefectures/nara')
  await expect(
    page.getByRole('heading', { name: 'Plan this region' }),
  ).toBeVisible()
  await expect(page.locator('.prefecture-photo img')).toHaveAttribute(
    'src',
    /nara/,
  )
  await page.goto('/en/my-trip')
  await page.evaluate(
    ({ tripKey, emptyTrip }) => {
      localStorage.setItem(
        tripKey,
        JSON.stringify({
          ...emptyTrip,
          title: 'November Kyoto',
          base: 'Kyoto Station',
          startDate: '2026-11-02',
          notes: { 2: 'Rest day with no places' },
          items: [
            { id: 'gion', day: 1, time: '10:00', note: 'Meet by the bridge' },
          ],
        }),
      )
    },
    { tripKey, emptyTrip },
  )
  await page.reload()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.trip-print-summary')).toContainText(
    'November Kyoto',
  )
  await expect(
    page
      .locator('.print-address')
      .filter({ hasText: 'Rest day with no places' }),
  ).toBeVisible()
  await expect(
    page.locator('.print-address').filter({ hasText: 'Meet by the bridge' }),
  ).toBeVisible()
  await expect(page.locator('.trip-tools')).toBeHidden()
})
