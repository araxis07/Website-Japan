import { test, expect } from './fixtures'
import { copyFile, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { journeys, destinationNotes } from '../src/data/journeys'
import { destinations, regions } from '../src/data/travel'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'
import { i18n } from '../src/i18n/config'
import { guides } from '../src/data/guides'
import { places, spots } from '../src/data/places'
import { emptyTrip, parseTrip, tripKey } from '../src/lib/trip'

test('production config loads without development dependencies', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'japan-config-'))
  try {
    const configPath = join(directory, 'next.config.mjs')
    await copyFile('next.config.mjs', configPath)
    const { default: config } = await import(pathToFileURL(configPath).href)
    expect(config.images.formats).toEqual(['image/avif', 'image/webp'])
    expect(await config.redirects()).toEqual([
      { source: '/', destination: '/ja', permanent: false },
    ])
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

for (const lang of i18n.locales) {
  test(`${lang} renders without runtime errors, broken images or overflow`, async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    const response = await page.goto(`/${lang}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('.destination-card')).toHaveCount(6)
    await expect(page.locator('.region-row')).toHaveCount(9)
    await expect(page.locator('.diorama')).not.toHaveAttribute(
      'data-scene-status',
      'loading',
    )
    for (const image of await page.locator('img:visible').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveJSProperty('complete', true)
      await expect
        .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
        .toBeGreaterThan(0)
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
    const missingAnchors = await page.locator('a[href*="#"]').evaluateAll((links) =>
      links.flatMap((link) => {
        const href = new URL((link as HTMLAnchorElement).href)
        return href.pathname === location.pathname &&
          href.hash &&
          !document.getElementById(decodeURIComponent(href.hash.slice(1)))
          ? [href.hash]
          : []
      }),
    )
    expect(missingAnchors).toEqual([])
    expect(errors).toEqual([])
  })
}

test('browser extension body attributes do not interrupt hydration', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error' && /hydrat/i.test(message.text()))
      errors.push(message.text())
  })
  await page.addInitScript(() => {
    localStorage.setItem('japan-travel-appearance', 'dark')
    // Simulate Grammarly changing the body as soon as the browser parses it.
    const observer = new MutationObserver(() => {
      if (!document.body) return
      document.body.setAttribute('data-new-gr-c-s-check-loaded', '14.1338.0')
      document.body.setAttribute('data-gr-ext-installed', '')
      observer.disconnect()
    })
    observer.observe(document, { childList: true, subtree: true })
  })
  for (const lang of i18n.locales) {
    await page.goto(`/${lang}`)
    await expect(page.locator('body')).toHaveAttribute(
      'data-new-gr-c-s-check-loaded',
      '14.1338.0',
    )
    await expect(page.locator('body')).toHaveAttribute('data-gr-ext-installed', '')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(page.locator('.save-button').first()).toBeEnabled()
    await page.getByRole('searchbox').fill('Kyoto')
    await expect(page.locator('.destination-card')).toHaveCount(1)
    expect(errors).toEqual([])
  }
  await page.goto('/missing/path')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.getByRole('link', { name: 'Explore in English', exact: true }).click()
  await expect(page).toHaveURL('/en')
  await expect(page.locator('.save-button').first()).toBeEnabled()
  await page.getByRole('searchbox').fill('Tokyo')
  await expect(page.locator('.destination-card')).toHaveCount(1)
  expect(errors).toEqual([])
})

test('search and category filters combine, clear and handle no results', async ({
  page,
}) => {
  await page.goto('/en')
  await page.getByRole('button', { name: 'Nature & outdoors', exact: true }).click()
  await expect(page.locator('.destination-card')).toHaveCount(2)
  await page.getByRole('searchbox').fill('  HOKKAIDO  ')
  await expect(page.locator('.destination-card')).toHaveCount(1)
  await expect(page.locator('.destination-card')).toContainText('Hokkaido')
  await page.getByRole('searchbox').fill('no-such-place')
  await expect(page.locator('.empty-state')).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click()
  await expect(page.locator('.destination-card')).toHaveCount(6)
  await page.getByRole('searchbox').fill('京都')
  await expect(page.locator('.destination-card')).toHaveCount(1)
  await page.locator('.destination-card').click()
  await expect(page).toHaveURL(/\/en\/destinations\/kyoto$/)
})

test('season tabs support clicks and keyboard navigation', async ({ page }) => {
  await page.goto('/en')
  const winter = page.getByRole('tab', { name: /Winter/ })
  await winter.click()
  await expect(winter).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel')).toContainText('Find warmth in the quiet.')
  await winter.press('ArrowRight')
  await expect(page.getByRole('tab', { name: /Spring/ })).toBeFocused()
  await expect(page.getByRole('tabpanel')).toContainText('A country coming into bloom.')
  await page.getByRole('tab', { name: /Spring/ }).press('End')
  await expect(winter).toBeFocused()
  await winter.press('Home')
  await expect(page.getByRole('tab', { name: /Spring/ })).toBeFocused()
  await page.getByRole('tab', { name: /Summer/ }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Long days. Island escapes.')
})

test('navigation, language switching and FAQ disclosure work', async ({
  page,
  isMobile,
}) => {
  await page.goto('/en')
  if (isMobile) {
    const toggle = page.locator('.menu-toggle')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page
      .locator('#mobile-navigation')
      .getByRole('link', { name: 'Journeys' })
      .click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await toggle.press('Escape')
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  } else {
    await page
      .locator('.desktop-navigation')
      .getByRole('link', { name: 'Journeys' })
      .click()
  }
  await expect(page).toHaveURL(/#journeys$/)
  await page.locator('summary').filter({ hasText: 'When should I visit Japan?' }).click()
  await expect(page.getByText(/Choose by region and the experience/)).toBeVisible()
  await page.getByRole('link', { name: 'Back to top', exact: true }).click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)
  await page.goto('/en/destinations/kyoto')
  await page.locator('.language-picker summary').click()
  await page
    .locator('.language-picker')
    .getByRole('link', { name: '日本語', exact: true })
    .click()
  await expect(page).toHaveURL('/ja/destinations/kyoto')
  await expect(
    page.getByRole('heading', { name: '京都', exact: true, level: 1 }),
  ).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
})

test('every destination route, locale and metadata asset is valid', async ({
  request,
}) => {
  for (const lang of i18n.locales) {
    for (const destination of destinations) {
      const response = await request.get(`/${lang}/destinations/${destination.slug}`)
      expect(response.status()).toBe(200)
      expect(await response.text()).toContain(destination[lang].name)
    }
    expect((await request.get(`/${lang}/credits`)).status()).toBe(200)
    const trip = await request.get(`/${lang}/my-trip`)
    expect(trip.status()).toBe(200)
    expect(await trip.text()).toContain('noindex')
  }
  expect((await request.get('/')).url()).toMatch(/\/ja$/)
  for (const route of [
    '/fr',
    '/ja/not-real',
    '/en/destinations/not-real',
    '/missing/path',
  ]) {
    const response = await request.get(route)
    expect(response.status()).toBe(404)
    expect(await response.text()).toContain('noindex')
  }
  for (const asset of [
    '/icon.svg',
    '/favicon.ico',
    '/manifest.webmanifest',
    '/robots.txt',
    '/sitemap.xml',
  ]) {
    expect((await request.get(asset)).status()).toBe(200)
  }
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).not.toContain('/resources/')
  expect(sitemap).not.toContain('japantravel-guide.com')
})

test('content and navigation stay readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/en')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.destination-card')).toHaveCount(6)
  await page.locator('.destination-card').first().click()
  await expect(
    page.getByRole('heading', { level: 1, name: 'Kyoto', exact: true }),
  ).toBeVisible()
  await page.goto('/en/explore')
  await expect(page.locator('.prefecture-card')).toHaveCount(47)
  const prefecture = await page.goto('/en/prefectures/nara')
  await expect(page.locator('.map-place-list li')).toHaveCount(2)
  expect(await prefecture!.text()).toContain(
    '<noscript><p>Enable JavaScript for the map, or use the place links below.</p></noscript>',
  )
  await context.close()
})

test('translations have matching keys and content identifiers stay unique', () => {
  function keys(value: unknown, prefix = ''): string[] {
    if (!value || typeof value !== 'object') return [prefix]
    return Object.entries(value)
      .flatMap(([key, item]) => keys(item, `${prefix}.${key}`))
      .sort()
  }
  expect(keys(en)).toEqual(keys(ja))
  expect(keys(en)).toEqual(keys(th))
  for (const place of destinations)
    for (const lang of i18n.locales) {
      expect(place[lang].name).toBeTruthy()
      expect(guides[place.slug][lang].arrival.length).toBeGreaterThan(30)
    }
  expect(new Set(places.map((p) => p.id)).size).toBe(places.length)
  expect(spots).toHaveLength(18)
  expect(new Set(destinations.map((item) => item.slug)).size).toBe(destinations.length)
  expect(new Set(regions.map((item) => item.id)).size).toBe(9)
})

test('interactive miniature responds to lighting, seasons, rotation and motion controls', async ({
  page,
}) => {
  await page.goto('/en')
  // Ambient petals would otherwise move over the miniature's screenshot.
  await page.getByRole('button', { name: 'Pause petals', exact: true }).click()
  const scene = page.locator('.diorama')
  await expect(scene).toHaveAttribute('data-scene-status', 'preview')
  await expect(scene.locator('canvas')).toHaveCount(0)
  await page.getByRole('button', { name: 'Explore the 3D scene', exact: true }).click()
  await expect(scene).toHaveAttribute('data-scene-status', 'ready')
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click()
  await expect(scene).toHaveAttribute('data-moving', 'false')
  const canvas = scene.locator('canvas')
  const day = await canvas.screenshot({ animations: 'disabled' })
  await page.getByRole('button', { name: 'Light the lanterns', exact: true }).click()
  await expect(scene).toHaveAttribute('data-night', 'true')
  await scene.evaluate((element) =>
    Promise.allSettled(
      element.getAnimations({ subtree: true }).map((animation) => animation.finished),
    ),
  )
  expect((await canvas.screenshot({ animations: 'disabled' })).equals(day)).toBe(false)
  await page
    .getByRole('group', { name: 'Change the miniature season' })
    .getByRole('button', { name: 'Winter', exact: true })
    .click()
  await expect(scene).toHaveAttribute('data-season', '3')
  const winter = await canvas.screenshot({ animations: 'disabled' })
  await page.getByRole('button', { name: 'Rotate scene right', exact: true }).click()
  expect((await canvas.screenshot({ animations: 'disabled' })).equals(winter)).toBe(false)
  await page.getByRole('button', { name: 'Reset scene view', exact: true }).click()
  expect((await canvas.screenshot({ animations: 'disabled' })).equals(winter)).toBe(true)
  await page.getByRole('button', { name: 'Play animation', exact: true }).click()
  await expect(scene).toHaveAttribute('data-moving', 'true')
})

test('reduced motion and unavailable WebGL retain readable, usable content', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/en')
  await expect(page.locator('.diorama')).toHaveAttribute('data-moving', 'false')
  await expect(
    page.getByRole('button', {
      name: 'Still scene · reduced motion is enabled',
      exact: true,
    }),
  ).toBeDisabled()
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (args[0] === 'webgl2') return null
      return original.apply(this, args)
    } as typeof original
  })
  await page.reload()
  await page.getByRole('button', { name: 'Explore the 3D scene', exact: true }).click()
  await expect(page.locator('.diorama')).toHaveAttribute('data-scene-status', 'fallback')
  await expect(page.locator('.scene-fallback img')).toBeVisible()
  await page.getByRole('searchbox').fill('Kyoto')
  await expect(page.locator('.destination-card')).toHaveCount(1)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('.sakura-petal').first()).toBeVisible()
  await expect(page.locator('.sakura-petal').first()).toHaveCSS(
    'animation-play-state',
    'running',
  )
})

test('itineraries switch routes and every detailed guide has a day plan', async ({
  page,
  request,
}) => {
  await page.goto('/en')
  const selector = page.getByRole('group', {
    name: 'Choose a sample itinerary',
  })
  await selector.getByRole('button', { name: '10 days' }).click()
  await expect(page.locator('.journey-route')).toContainText(
    'Sapporo & a seasonal escape',
  )
  await expect(page.locator('.journey-route li')).toHaveCount(2)
  await selector.getByRole('button', { name: '14 days' }).click()
  await expect(page.locator('.journey-route li')).toHaveCount(4)
  await expect(page.locator('.journey-route')).toContainText('Day 12–14')
  await page
    .locator('.journey-route')
    .getByRole('link', { name: 'Fuji Five Lakes' })
    .click()
  await expect(page).toHaveURL('/en/destinations/mount-fuji')
  await expect(page.locator('.day-timeline li')).toHaveCount(3)
  for (const place of destinations) {
    for (const lang of i18n.locales) {
      const response = await request.get(`/${lang}/destinations/${place.slug}`)
      expect(await response.text()).toContain(destinationNotes[place.slug][lang].food)
    }
  }
  for (const journey of journeys) {
    expect(journey.stops.reduce((sum, stop) => sum + stop.days, 0)).toBe(journey.days)
    for (const stop of journey.stops)
      expect(destinations.some((place) => place.slug === stop.slug)).toBe(true)
  }
})

test('maps connect destinations, local places and usable external directions', async ({
  page,
}) => {
  await page.goto('/th#map')
  await page
    .locator('.map-destination-buttons')
    .getByRole('button', { name: 'โตเกียว', exact: true })
    .click()
  await expect(page.locator('.atlas-selection h3')).toHaveText('โตเกียว')
  await page
    .locator('.atlas-selection')
    .getByRole('link', { name: 'อ่านคู่มือ', exact: false })
    .click()
  await expect(page).toHaveURL('/th/destinations/tokyo#places')
  await page
    .locator('.street-map')
    .getByRole('button', { name: '2. สวนสุมิดะ', exact: true })
    .click()
  await expect(page.locator('.map-place-list li[data-selected="true"]')).toContainText(
    'สวนสุมิดะ',
  )
  const directions = await page
    .locator('.map-place-list li')
    .first()
    .getByRole('link', { name: th.streetMap.route, exact: false })
    .getAttribute('href')
  const url = new URL(directions!)
  expect(url.hostname).toBe('www.google.com')
  expect(url.searchParams.get('api')).toBe('1')
  expect(url.searchParams.get('destination')).toBe('浅草寺 東京都 日本')
  await expect(page.locator('.practical-grid article')).toHaveCount(4)
})

test('trip saves, schedules, reorders, survives reload and language changes, and prints', async ({
  page,
}) => {
  await page.goto('/en/destinations/kyoto')
  await page
    .getByRole('button', { name: 'Save to my trip: Kiyomizu-dera', exact: true })
    .click()
  await page.getByRole('button', { name: 'Save to my trip: Gion', exact: true }).click()
  await page.locator('.header-trip').click()
  await expect(page.locator('.trip-day li')).toHaveCount(2)
  await page
    .getByRole('combobox', { name: 'Schedule for: Kiyomizu-dera', exact: true })
    .selectOption('2')
  await page
    .getByRole('combobox', { name: 'Schedule for: Gion', exact: true })
    .selectOption('2')
  await page.getByRole('button', { name: 'Move earlier: Gion', exact: true }).click()
  await expect(page.locator('.trip-day li').first()).toHaveAttribute(
    'data-place-id',
    'gion',
  )
  await page.reload()
  await expect(
    page.getByRole('combobox', { name: 'Schedule for: Gion', exact: true }),
  ).toHaveValue('2')
  await page.locator('.language-picker summary').click()
  await page
    .locator('.language-picker')
    .getByRole('link', { name: 'ไทย', exact: true })
    .click()
  await expect(page).toHaveURL('/th/my-trip')
  await expect(page.locator('.trip-day li').first()).toContainText('กิออน')
  await page
    .getByRole('combobox', { name: 'จำนวนวันเดินทาง', exact: true })
    .selectOption('1')
  await expect(
    page.getByRole('combobox', { name: 'จัดลงวัน: กิออน', exact: true }),
  ).toHaveValue('0')
  await page
    .getByRole('combobox', { name: 'จัดลงวัน: กิออน', exact: true })
    .selectOption('1')
  await page.getByRole('button', { name: 'นำออก: วัดคิโยมิซุเดระ', exact: true }).click()
  await expect(page.locator('.trip-day li')).toHaveCount(1)
  await page.evaluate(() => {
    window.print = () =>
      document.documentElement.setAttribute('data-print-called', 'true')
  })
  await page.getByRole('button', { name: 'พิมพ์ / บันทึก PDF', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-print-called', 'true')
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.site-header')).toBeHidden()
  await expect(page.locator('.trip-item-controls')).toBeHidden()
  await expect(page.locator('.trip-place-copy h3')).toHaveText('กิออน')
})

test('saved trip syncs across tabs and failed writes keep the previous plan', async ({
  page,
  context,
}) => {
  await page.goto('/en/destinations/tokyo')
  await page
    .getByRole('button', { name: 'Save to my trip: Sensoji', exact: true })
    .click()
  const other = await context.newPage()
  await other.goto('/en/my-trip')
  await expect(other.locator('.trip-day li')).toHaveCount(1)
  await page
    .getByRole('button', { name: 'Save to my trip: Sumida Park', exact: true })
    .click()
  await expect(other.locator('.trip-day li')).toHaveCount(2)
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Full', 'QuotaExceededError')
    }
  })
  await page
    .getByRole('button', { name: 'Save to my trip: Tokyo National Museum', exact: true })
    .click()
  await expect(page.locator('.trip-error-toast')).toContainText('could not save')
  await expect(other.locator('.trip-day li')).toHaveCount(2)
  expect(
    JSON.parse((await page.evaluate((key) => localStorage.getItem(key), tripKey)) || '{}')
      .items,
  ).toHaveLength(2)
  await other.close()
})

test('invalid saved data is not overwritten and can be explicitly reset', async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, '{broken'), tripKey)
  await page.goto('/en/my-trip')
  await expect(page.locator('.trip-storage-error')).toContainText(
    'has not been overwritten',
  )
  expect(await page.evaluate((key) => localStorage.getItem(key), tripKey)).toBe('{broken')
  page.once('dialog', (dialog) => dialog.accept())
  await page
    .getByRole('button', { name: 'Reset unreadable saved data', exact: true })
    .click()
  await expect(
    page.getByRole('heading', { name: 'Your journey starts with one place.' }),
  ).toBeVisible()
  expect(
    JSON.parse(
      (await page.evaluate((key) => localStorage.getItem(key), tripKey)) || '{}',
    ),
  ).toEqual(emptyTrip)
})

test('trip storage validates unknown, duplicate and out-of-range data', () => {
  expect(parseTrip(JSON.stringify(emptyTrip))).toEqual(emptyTrip)
  expect(parseTrip(' '.repeat(64_001))).toBeNull()
  for (const value of [
    null,
    { ...emptyTrip, version: 2 },
    { ...emptyTrip, days: 0 },
    { ...emptyTrip, days: 31 },
    { ...emptyTrip, items: [{ id: 'missing', day: 1 }] },
    { ...emptyTrip, items: [{ id: 'gion', day: 8 }] },
    { ...emptyTrip, items: [{ id: 'gion', day: 1.5 }] },
    {
      ...emptyTrip,
      items: [
        { id: 'gion', day: 1 },
        { id: 'gion', day: 2 },
      ],
    },
  ]) {
    expect(parseTrip(JSON.stringify(value))).toBeNull()
  }
})

test('empty saved data stays intact and blocked storage gives an actionable error', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await page.evaluate((key) => {
    localStorage.setItem(key, '')
    window.dispatchEvent(new Event('trip-change'))
  }, tripKey)
  await expect(page.locator('.trip-storage-error')).toContainText(
    'has not been overwritten',
  )
  expect(await page.evaluate((key) => localStorage.getItem(key), tripKey)).toBe('')
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException('Blocked', 'SecurityError')
    }
  })
  await page.reload()
  await expect(page.locator('.trip-storage-error')).toContainText('could not save')
  await expect(
    page.getByRole('button', { name: 'Reset unreadable saved data', exact: true }),
  ).toHaveCount(0)
})

test('gallery supports keyboard navigation, escape and focus restoration', async ({
  page,
}) => {
  await page.goto('/th/destinations/tokyo')
  const first = page.locator('.photo-gallery a').first()
  await first.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('.photo-dialog-controls')).toContainText('1 / 2')
  await page.keyboard.press('ArrowRight')
  await expect(dialog.locator('.photo-dialog-controls')).toContainText('2 / 2')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(first).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
})
