import { test, expect } from './fixtures'
import { prefectures } from '../src/data/prefectures'
import { prefecturePlaces } from '../src/data/prefecture-places'
import { spots, placePath, canonicalPlaceId } from '../src/data/places'
import { firstVisitSteps } from '../src/data/first-visit'
import { regions } from '../src/data/travel'
import { i18n } from '../src/i18n/config'
import { parseTrip, tripKey } from '../src/lib/trip'
import { appearanceKey } from '../src/lib/appearance'

test('47 prefectures have complete translations, source links and real mapped places', () => {
  expect(prefectures).toHaveLength(47)
  expect(new Set(prefectures.map((p) => p.slug)).size).toBe(47)
  expect(prefecturePlaces).toHaveLength(94)
  for (const p of prefectures) {
    expect(regions.some((r) => r.id === p.region)).toBe(true)
    expect(p.source).toMatch(
      /^https:\/\/www\.japan\.travel\/en\/destinations\//,
    )
    expect(p.places).toHaveLength(2)
    for (const lang of i18n.locales) {
      expect(p.names[lang]).toBeTruthy()
      expect(p.base[lang]).toBeTruthy()
      expect(p.summary[lang].length).toBeGreaterThan(30)
      expect(p.access[lang].length).toBeGreaterThan(25)
    }
    for (const id of p.places) {
      const place = prefecturePlaces.find((place) => place.id === id)!
      expect(place.prefecture).toBe(p.slug)
      expect(placePath(place, 'th')).toBe(
        `/th/prefectures/${p.slug}#place-${canonicalPlaceId(place.id)}`,
      )
    }
  }
  for (const place of [...prefecturePlaces, ...spots]) {
    expect(place.coordinates[0]).toBeGreaterThan(24)
    expect(place.coordinates[0]).toBeLessThan(46)
    expect(place.coordinates[1]).toBeGreaterThan(122)
    expect(place.coordinates[1]).toBeLessThan(146)
    expect(place.source).toMatch(
      /^https:\/\/www\.openstreetmap\.org\/(node|way|relation)\/\d+$/,
    )
    expect(place.address).toContain('日本')
    expect(place.query).toContain('日本')
    for (const lang of i18n.locales) expect(place.names[lang]).toBeTruthy()
  }
  for (const step of firstVisitSteps)
    for (const lang of i18n.locales) {
      expect(step.copy[lang].items).toHaveLength(3)
      expect(step.copy[lang].items.every((item) => item.length > 25)).toBe(true)
    }
  // Legacy aliases stay readable and normalize to one shared place identity.
  const plan = {
    version: 1,
    days: 7,
    items: [
      { id: 'gion', day: 1 },
      { id: prefecturePlaces[0].id, day: 2 },
    ],
  }
  expect(parseTrip(JSON.stringify(plan))).toEqual({
    ...plan,
    items: plan.items.map((item) => ({
      ...item,
      id: canonicalPlaceId(item.id),
    })),
  })
})

test('every prefecture and beginner route renders in all three languages', async ({
  request,
}) => {
  test.setTimeout(90_000)
  for (const lang of i18n.locales) {
    for (const p of prefectures) {
      const response = await request.get(`/${lang}/prefectures/${p.slug}`)
      expect(response.status()).toBe(200)
      const html = await response.text()
      expect(html).toContain(`<html lang="${lang}"`)
      expect(html).toContain(p.names[lang])
      expect(html).toContain(p.access[lang])
      expect(html).toContain('openstreetmap.org')
    }
    for (const path of ['/explore', '/first-visit'])
      expect((await request.get(`/${lang}${path}`)).status()).toBe(200)
  }
  expect((await request.get('/en/prefectures/not-a-prefecture')).status()).toBe(
    404,
  )
})

test('prefecture filters combine with multilingual landmark search and map selection', async ({
  page,
}) => {
  await page.goto('/en/explore')
  await expect(page.locator('.prefecture-card')).toHaveCount(47)
  await page
    .getByRole('combobox', { name: 'Region', exact: true })
    .selectOption('kansai')
  await expect(page.locator('.prefecture-card')).toHaveCount(6)
  await page.getByRole('searchbox').fill('東大寺')
  await expect(page.locator('.prefecture-card')).toHaveCount(1)
  await page
    .locator('.prefecture-card')
    .getByRole('button', { name: 'Show on map', exact: true })
    .click()
  await expect(page.locator('.prefecture-preview h2')).toHaveText('Nara')
  await expect(
    page.getByRole('button', { name: '1. Nara', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('searchbox').fill('no-such-prefecture')
  await expect(page.locator('.empty-state')).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click()
  await expect(page.locator('.prefecture-card')).toHaveCount(47)
  await expect(page.locator('.street-map')).toHaveAttribute(
    'data-point-count',
    '47',
  )
})

test('first-time visitor can find, save and revisit a prefecture place across languages', async ({
  page,
}) => {
  await page.goto('/en')
  await page
    .locator('.hero')
    .getByRole('link', { name: 'Prepare for arrival', exact: false })
    .click()
  await expect(page).toHaveURL('/en/first-visit')
  await expect(page.locator('.first-step')).toHaveCount(6)
  await page
    .getByRole('link', { name: 'Explore all 47 prefectures', exact: false })
    .click()
  await page.getByRole('searchbox').fill('Nara')
  await page.locator('.prefecture-card h3 a').click()
  await page
    .getByRole('button', {
      name: 'Save to my trip: Todaiji Temple',
      exact: true,
    })
    .click()
  await page.locator('.header-trip').click()
  await expect(page.locator('.trip-day li')).toHaveCount(1)
  await expect(page.locator('.trip-place-copy h3 a')).toHaveAttribute(
    'href',
    '/en/prefectures/nara#place-pref:nara:todaiji-temple',
  )
  await page.reload()
  expect(
    JSON.parse(
      (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
    ).items,
  ).toHaveLength(1)
  await page.locator('.language-picker summary').click()
  await page
    .locator('.language-picker')
    .getByRole('link', { name: 'ไทย', exact: true })
    .click()
  await expect(page.locator('.trip-day li')).toContainText('วัดโทไดจิ')
  await page.locator('.trip-place-copy h3 a').click()
  await expect(page).toHaveURL(
    '/th/prefectures/nara#place-pref:nara:todaiji-temple',
  )
})

test('map failure leaves places and directions available, and retry restores the map', async ({
  page,
}) => {
  await page.route('https://tile.openstreetmap.org/**', (route) =>
    route.abort(),
  )
  await page.goto('/en/prefectures/nara#places')
  await expect(page.locator('.map-warning')).toContainText('could not load')
  await expect(page.locator('.map-place-list li')).toHaveCount(2)
  await expect(
    page
      .locator('.map-place-list li')
      .first()
      .getByRole('link', { name: 'Directions in Google Maps', exact: false }),
  ).toHaveAttribute('href', /www\.google\.com\/maps\/dir/)
  await page.unroute('https://tile.openstreetmap.org/**')
  await page.getByRole('button', { name: 'Retry map', exact: true }).click()
  await expect(page.locator('.leaflet-tile-loaded').first()).toBeVisible()
  await expect(page.locator('.map-warning')).toHaveCount(0)
  await page
    .getByRole('button', { name: '2. Kasuga Taisha', exact: true })
    .press('Enter')
  await expect(
    page.locator('.map-place-list li[data-selected="true"]'),
  ).toContainText('Kasuga Taisha')
})

test('theme is applied before client bundles load, including the 404 page', async ({
  context,
}) => {
  await context.route('**/_next/**/*.js*', (route) => route.abort())
  for (const preference of ['dark', 'light', 'blocked'] as const) {
    const page = await context.newPage()
    await page.emulateMedia({
      colorScheme: preference === 'dark' ? 'light' : 'dark',
    })
    await page.addInitScript(
      ({ preference, key }) => {
        if (preference === 'blocked') {
          Storage.prototype.getItem = () => {
            throw new DOMException('Blocked', 'SecurityError')
          }
        } else {
          localStorage.setItem(key, preference)
        }
      },
      { preference, key: appearanceKey },
    )
    for (const path of ['/en/first-visit', '/missing/path']) {
      await page.goto(path, { waitUntil: 'domcontentloaded' })
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.locator('html')).toHaveAttribute(
        'data-theme',
        preference === 'light' ? 'light' : 'dark',
      )
    }
    await page.close()
  }
})

test('night mode follows the system, persists and synchronizes across tabs', async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.goto('/en/explore')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Day mode', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  expect(
    await page.evaluate((key) => localStorage.getItem(key), appearanceKey),
  ).toBe('light')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  const other = await context.newPage()
  await other.goto('/en/first-visit')
  await page.getByRole('button', { name: 'Night mode', exact: true }).click()
  await expect(other.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(
    page.getByRole('button', { name: 'Motion reduced', exact: true }),
  ).toBeDisabled()
  await expect(page.locator('.sakura-petal').first()).toBeHidden()
  await other.close()
})

test('appearance still works when browser storage is blocked', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    Storage.prototype.getItem = Storage.prototype.setItem = () => {
      throw new DOMException('Blocked', 'SecurityError')
    }
  })
  await page.goto('/en/first-visit')
  await page.getByRole('button', { name: 'Night mode', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Day mode', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('3D petals can be paused and resumed on guide pages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/en/first-visit')
  const petal = page.locator('.sakura-petal').first()
  await expect(petal).toBeVisible()
  await expect(petal).toHaveCSS('animation-play-state', 'running')
  await expect(petal).toHaveCSS('transform', /matrix3d/)
  await page.getByRole('button', { name: 'Pause effects', exact: true }).click()
  await expect(petal).toHaveCSS('animation-play-state', 'paused')
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'still')
  await page
    .getByRole('button', { name: 'Resume effects', exact: true })
    .click()
  await expect(petal).toHaveCSS('animation-play-state', 'running')
})

test('production responses carry security headers without exposing the framework header', async ({
  request,
}) => {
  const response = await request.get('/en/explore')
  const headers = response.headers()
  expect(headers['x-powered-by']).toBeUndefined()
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['content-security-policy']).toContain("object-src 'none'")
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'")
  expect(headers['permissions-policy']).toContain('geolocation=()')
  expect(headers['content-security-policy']).toContain("default-src 'self'")
  expect(headers['content-security-policy']).toContain("frame-src 'none'")
  if (!process.env.PLAYWRIGHT_DEV)
    expect(headers['content-security-policy']).not.toContain('unsafe-eval')
})
