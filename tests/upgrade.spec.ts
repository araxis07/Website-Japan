import fs from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { test, expect, openDetails } from './fixtures'
import { chromium, webkit } from '@playwright/test'
import {
  emptyTrip,
  parseTrip,
  publicTrip,
  tripPlace,
  tripId,
  dayLabel,
  mergeTrips,
  tripKey,
  type Trip,
} from '../src/lib/trip'
import { offlineTrip } from '../src/lib/trip-export'
import { tripCalendar } from '../src/lib/trip-calendar'
import { reportContext } from '../src/lib/report-context'
import { fieldReview } from '../src/data/visit-details'
import { tripNotices } from '../src/data/travel-notices'
import { searchSuggestions } from '../src/data/place-search'
import { places } from '../src/data/places'
import fixture from './fixtures/portable-trip.json'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'

const portable = parseTrip(JSON.stringify(fixture))!

test('personal places validate, preserve repeat visits, and leave no private content in public copies', () => {
  expect(portable).toEqual(fixture)
  const entry = portable.items[1]
  expect(tripPlace(entry).coordinates).toBeUndefined()
  expect(mergeTrips(emptyTrip, portable)?.items).toEqual(portable.items)
  expect(publicTrip(portable).items).toEqual([{ id: 'gion', day: 1 }])
  const raw = JSON.stringify(publicTrip(portable))
  expect(raw).not.toMatch(/custom-|My hotel|Private booking|Kyoto Station/)
  for (const custom of [
    undefined,
    { name: '', address: 'Kyoto' },
    { name: 'x', address: '' },
    { name: 'x', address: 'Kyoto', url: 'javascript:alert(1)' },
    { name: 'x', address: 'Kyoto', url: 'https://user:pass@example.com' },
  ])
    expect(
      parseTrip(
        JSON.stringify({ ...emptyTrip, items: [{ ...entry, custom }] }),
      ),
    ).toBeNull()
  expect(
    parseTrip(
      JSON.stringify({ ...portable, items: [{ ...entry, id: 'gion' }] }),
    ),
  ).toBeNull()
  expect(
    parseTrip(
      JSON.stringify({
        ...portable,
        items: [
          entry,
          {
            ...portable.items[2],
            custom: { ...entry.custom, name: 'Conflicting hotel' },
          },
        ],
      }),
    ),
  ).toBeNull()
  expect(tripId()).toMatch(/^[a-f0-9]{32}$/)
  expect(new Set(Array.from({ length: 100 }, tripId)).size).toBe(100)
})

test('offline and calendar exports preserve language, missing budgets and escaped personal details', async () => {
  const html = offlineTrip(portable, 'ja', ja.trip, ja.tools)
  expect(html).toContain('1日目')
  expect(html).not.toContain('日目 1')
  expect(html).toContain(ja.tools.budgetMissing)
  expect(html).toContain(ja.tools.transport)
  expect(offlineTrip(emptyTrip, 'en', en.trip, en.tools)).not.toContain('¥0')
  expect(dayLabel(2, 'th', 'วันที่')).toBe('วันที่ 2')
  const hostile: Trip = {
    ...emptyTrip,
    startDate: '2026-11-01',
    items: [
      {
        ...portable.items[1],
        custom: {
          name: '</h3><script>alert(1)</script>',
          address: 'Line 1\nBEGIN:VEVENT',
        },
      },
    ],
  }
  const output = offlineTrip(hostile, 'en', en.trip, en.tools)
  expect(output).not.toContain('<script>')
  expect(output).toContain('&lt;script&gt;')
  const calendar = (await tripCalendar(hostile, 'en'))!
  expect(calendar.match(/\r\nBEGIN:VEVENT/g)).toHaveLength(1)
  expect(calendar).toContain('Line 1\\nBEGIN:VEVENT')
})

test('review cadence, trip notice relevance, Thai suggestions and report paths have bounded behavior', () => {
  const detail = {
    source: 'https://example.org',
    reviewedAt: '2026-01-01',
    access: { en: 'Access', ja: '案内', th: 'ทางเข้า' },
    hours: { en: 'Hours', ja: '時間', th: 'เวลา' },
  }
  expect(fieldReview(detail, 'hours', '2026-02-15').status).toBe('overdue')
  expect(fieldReview(detail, 'access', '2026-02-15').status).toBe('reviewed')
  expect(tripNotices(portable, '2026-10-27').map((n) => n.id)).toEqual([
    'kyoto-genji-2026',
  ])
  expect(
    tripNotices({ ...portable, startDate: '2026-12-01' }, '2026-10-27'),
  ).toEqual([])
  expect(searchSuggestions('กิออ', places).some((p) => p.id === 'gion')).toBe(
    true,
  )
  expect(
    reportContext('/en/destinations/kyoto?note=private#place-gion', 'en'),
  ).toBe('/en/destinations/kyoto#place-gion')
  for (const path of [
    'https://evil.test/en',
    '//evil.test',
    '/en/my-trip/private',
    '/ja/my-trip',
  ])
    expect(reportContext(path, 'en')).toBe('/en/about')
  expect(reportContext('/en/my-trip?hotel=private#secret', 'en')).toBe(
    '/en/my-trip',
  )
})

test('trip editing, personal stops and backups work without secure-context crypto APIs', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(crypto, 'subtle', { value: undefined })
    Object.defineProperty(crypto, 'randomUUID', { value: undefined })
  })
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/en/my-trip')
  await page
    .getByRole('textbox', { name: 'Trip name', exact: true })
    .fill('HTTP trip')
  await page.locator('.personal-stop > summary').last().click()
  await page
    .locator('.personal-stop')
    .last()
    .getByLabel('Place name', { exact: true })
    .fill('Private restaurant')
  await page
    .locator('.personal-stop')
    .last()
    .getByLabel('Full address', { exact: true })
    .fill('Kyoto, Japan')
  await page.locator('.personal-stop button[type=submit]').last().click()
  const stop = page.locator('.trip-day li[data-place-id^=custom-]')
  await expect(stop).toHaveCount(1)
  await openDetails(stop.locator('.trip-visit-editor'))
  await stop.getByRole('combobox').selectOption('1')
  await openDetails(stop.locator('.trip-visit-editor'))
  await stop.getByRole('button', { name: /Add another visit/ }).click()
  await expect(
    page.locator('.trip-day li[data-place-id^=custom-]'),
  ).toHaveCount(2)
  await page
    .locator('.trip-tools .budget-panel')
    .first()
    .locator('summary')
    .click()
  await page
    .getByRole('button', { name: en.tools.addStay, exact: true })
    .click()
  await expect(page.locator('.lodging-row')).toHaveCount(1)
  const download = page.waitForEvent('download')
  await page.getByRole('button', { name: en.tools.backup, exact: true }).click()
  expect(
    parseTrip(await fs.readFile((await (await download).path())!, 'utf8'))
      ?.items,
  ).toHaveLength(2)
  await page.reload()
  await expect(
    page.locator('.trip-day li[data-place-id^=custom-]'),
  ).toHaveCount(2)
  expect(errors).toEqual([])
})

test('pagination preserves filters and Back history without rendering the other scope', async ({
  page,
}) => {
  await page.goto('/en/explore?scope=places&view=list')
  await expect(page.locator('.place-search-results li')).toHaveCount(12)
  await expect(page.locator('.prefecture-card')).toHaveCount(0)
  const first = await page
    .locator('.place-search-results a')
    .first()
    .textContent()
  await page.getByRole('button', { name: 'Next page', exact: true }).click()
  await expect(page).toHaveURL(/page=2/)
  await expect(page.locator('#search-results-heading')).toBeFocused()
  expect(
    await page.locator('.place-search-results a').first().textContent(),
  ).not.toBe(first)
  await page.goBack()
  await expect(page.locator('.place-search-results a').first()).toHaveText(
    first!,
  )
  await page.getByRole('button', { name: 'Next page', exact: true }).click()
  await page.getByRole('searchbox').fill('Gion')
  await expect(page).not.toHaveURL(/page=2/)
  await expect(page.locator('.place-search-results li')).toHaveCount(1)
  await page
    .locator('.active-filters')
    .getByRole('button', { name: `${en.tools.clear}: Gion`, exact: true })
    .click()
  await expect(page.locator('.place-search-results li')).toHaveCount(12)
  await expect(page).toHaveURL(/scope=places/)
})

test('device theme can be restored and paused motion also disables document scrolling', async ({
  page,
}) => {
  await page.emulateMedia({
    colorScheme: 'dark',
    reducedMotion: 'no-preference',
  })
  await page.goto('/en/my-trip')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await openDetails(page.locator('.appearance-panel'))
  await page
    .getByRole('button', { name: en.atmosphere.light, exact: true })
    .click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await openDetails(page.locator('.appearance-panel'))
  await page
    .getByRole('button', { name: en.atmosphere.system, exact: true })
    .click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await openDetails(page.locator('.appearance-panel'))
  await page
    .getByRole('button', { name: en.atmosphere.pause, exact: true })
    .click()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'still')
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto')
})

test('travel-day defaults to Japan today, keeps manual selection, and directions use explicit origins', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-11-01T16:00:00Z') })
  await page.addInitScript(
    ({ key, trip }) => localStorage.setItem(key, JSON.stringify(trip)),
    { key: tripKey, trip: portable },
  )
  await page.goto('/ja/my-trip#travel-day')
  await expect(page.locator('.trip-on-the-go')).toHaveAttribute('open', '')
  const day = page.locator('.trip-on-the-go > label select')
  await expect(day).toHaveValue('2')
  await day.selectOption('1')
  await page.clock.runFor(60001)
  await expect(day).toHaveValue('1')
  await expect(page.locator('.trip-overview')).not.toContainText('日目 1')
  const directions = page.locator('.trip-on-the-go .trip-directions').first()
  await directions.locator('summary').click()
  await directions.locator('select').selectOption('base')
  expect(
    new URL(
      (await directions.locator('a').getAttribute('href'))!,
    ).searchParams.get('origin'),
  ).toBe('Kyoto Station')
  await directions.locator('select').selectOption('manual')
  await directions.locator('input').fill('Kyoto Station Hachijo Exit')
  expect(
    new URL(
      (await directions.locator('a').getAttribute('href'))!,
    ).searchParams.get('origin'),
  ).toBe('Kyoto Station Hachijo Exit')
})

test('issue reporting retains the selected place and offers manual clipboard fallback', async ({
  page,
}) => {
  await page.goto('/en/destinations/kyoto#place-gion')
  const details = page.locator('#place-gion .visit-details')
  await details.locator('summary').click()
  await details
    .getByRole('link', { name: en.tools.report, exact: false })
    .click()
  await expect(page.locator('.report-issue > p a')).toHaveAttribute(
    'href',
    '/en/destinations/kyoto#place-gion',
  )
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    }),
  )
  await page.locator('.report-issue textarea').fill('Entrance needs checking')
  await page
    .getByRole('button', { name: en.tools.copyReport, exact: true })
    .click()
  await expect(page.locator('.report-issue textarea[readonly]')).toHaveValue(
    /place-gion.*\nLanguage: en\n\nEntrance needs checking/,
  )
})

test('deleting local site data requires confirmation and preserves unrelated storage', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await page
    .getByRole('textbox', { name: 'Trip name', exact: true })
    .fill('Private')
  await page.evaluate(() => {
    localStorage.setItem('unrelated-app', 'keep')
    localStorage.setItem('japan-travel-library-v1', '[]')
  })
  await page.goto('/en/about')
  page.once('dialog', (dialog) => dialog.dismiss())
  await page
    .getByRole('button', { name: en.tools.eraseData, exact: true })
    .click()
  expect(
    await page.evaluate((key) => localStorage.getItem(key), tripKey),
  ).toContain('Private')
  page.once('dialog', (dialog) => dialog.accept())
  await page
    .getByRole('button', { name: en.tools.eraseData, exact: true })
    .click()
  await expect(page.getByText(en.tools.erasedData)).toBeVisible()
  expect(
    await page.evaluate((key) => localStorage.getItem(key), tripKey),
  ).toBeNull()
  expect(await page.evaluate(() => localStorage.getItem('unrelated-app'))).toBe(
    'keep',
  )
  await page.goto('/en/my-trip')
  await expect(
    page.getByRole('textbox', { name: 'Trip name', exact: true }),
  ).toHaveValue('')
  await expect(page.locator('.trip-file-actions button').first()).toBeDisabled()
})

test('exported HTML opens as a local file without network access', async ({
  page,
  context,
}, info) => {
  const filename = info.outputPath('offline-trip.html')
  await fs.writeFile(filename, offlineTrip(portable, 'ja', ja.trip, ja.tools))
  await context.setOffline(true)
  await page.goto(pathToFileURL(filename).href)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    portable.title!,
  )
  await expect(page.locator('body')).toContainText('京都の宿 / My hotel')
  await expect(page.locator('body')).toContainText(ja.tools.budgetMissing)
  await expect(page.locator('script,iframe,img')).toHaveCount(0)
})

test('personal-stop drafts survive a failed write and sanitized downloads exclude them', async ({
  page,
}) => {
  await page.addInitScript(
    ({ key, trip }) => localStorage.setItem(key, JSON.stringify(trip)),
    { key: tripKey, trip: portable },
  )
  await page.goto('/en/my-trip')
  await page.locator('.personal-stop > summary').last().click()
  await page
    .locator('.personal-stop')
    .last()
    .getByLabel('Place name', { exact: true })
    .fill('A private cafe')
  await page
    .locator('.personal-stop')
    .last()
    .getByLabel('Full address', { exact: true })
    .fill('Kyoto, Japan')
  await page.evaluate(() => {
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (this === localStorage && key === 'japan-travel-trip-v1')
        throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  })
  await page.locator('.personal-stop button[type=submit]').last().click()
  await expect(
    page
      .locator('.personal-stop')
      .last()
      .getByLabel('Place name', { exact: true }),
  ).toHaveValue('A private cafe')
  expect(
    JSON.parse(
      (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
    ),
  ).toEqual(portable)
  await page.reload()
  await page.locator('.personal-stop > summary').last().click()
  await expect(
    page
      .locator('.personal-stop')
      .last()
      .getByLabel('Place name', { exact: true }),
  ).toHaveValue('A private cafe')
  await page.locator('.personal-stop button[type=submit]').last().click()
  await page.getByLabel(en.tools.sanitized, { exact: true }).check()
  await page.locator('.export-preview > summary').click()
  await expect(page.locator('.export-preview')).not.toContainText(
    'A private cafe',
  )
  await expect(page.locator('.export-preview')).toContainText('1 / 4')
  const downloaded = page.waitForEvent('download')
  await page.getByRole('button', { name: en.tools.shareDownload, exact: true }).click()
  const contents = await fs.readFile((await (await downloaded).path())!, 'utf8')
  expect(contents).not.toMatch(/Private|custom-|Kyoto Station|cafe/)
  expect(JSON.parse(contents)).toEqual(publicTrip(portable))
})

test('enlarged text keeps new planner controls usable without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 1000 })
  for (const lang of ['en', 'ja', 'th']) {
    await page.goto(`/${lang}/my-trip`)
    await page.addStyleTag({ content: 'html { font-size:200% !important; }' })
    await page.locator('.personal-stop > summary').last().click()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      lang,
    ).toBe(true)
    await expect(
      page.locator('.personal-stop button[type=submit]').last(),
    ).toBeVisible()
  }
})

test('JSON and library exports move from Chromium to WebKit and back without losing private records', async ({}, info) => {
  test.skip(
    info.project.name !== 'desktop-chromium',
    'One bidirectional cross-engine check per run',
  )
  const browsers = await Promise.all([chromium.launch(), webkit.launch()])
  try {
    let tripData = JSON.stringify(portable),
      libraryData = JSON.stringify([
        { id: 'portable', savedAt: '2026-10-27T00:00:00.000Z', trip: portable },
      ])
    for (const browser of [...browsers, browsers[0]]) {
      const context = await browser.newContext({
        baseURL: 'http://localhost:3100',
      })
      const page = await context.newPage()
      page.on('dialog', (dialog) => dialog.accept())
      await page.goto('/en/my-trip')
      await page.locator('.trip-file-actions input[type=file]').setInputFiles({
        name: 'trip.json',
        mimeType: 'application/json',
        buffer: Buffer.from(tripData),
      })
      await page
        .locator('.trip-tools > .import-preview details > summary')
        .click()
      await expect(
        page.locator('.trip-tools > .import-preview details'),
      ).toContainText(portable.items[1].custom!.address)
      await expect(
        page.locator('.trip-tools > .import-preview details'),
      ).toContainText(en.trip.unplanned)
      await page
        .locator('.trip-tools > .import-preview')
        .getByRole('button', { name: en.tools.replace, exact: true })
        .click()
      expect(
        JSON.parse(
          (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
        ),
      ).toEqual(portable)
      const tripDownload = page.waitForEvent('download')
      await page
        .getByRole('button', { name: en.tools.backup, exact: true })
        .click()
      tripData = await fs.readFile((await (await tripDownload).path())!, 'utf8')
      await page.locator('.trip-extras > summary').click()
      await page.locator('.trip-library > summary').click()
      await page.locator('.trip-library input[type=file]').setInputFiles({
        name: 'library.json',
        mimeType: 'application/json',
        buffer: Buffer.from(libraryData),
      })
      await page.locator('.trip-library .import-preview button').first().click()
      expect(
        JSON.parse(
          (await page.evaluate(() =>
            localStorage.getItem('japan-travel-library-v1'),
          ))!,
        )[0].trip,
      ).toEqual(portable)
      const libraryDownload = page.waitForEvent('download')
      await page
        .getByRole('button', { name: en.tools.libraryExport, exact: true })
        .click()
      libraryData = await fs.readFile(
        (await (await libraryDownload).path())!,
        'utf8',
      )
      await context.close()
    }
  } finally {
    await Promise.all(browsers.map((browser) => browser.close()))
  }
})
