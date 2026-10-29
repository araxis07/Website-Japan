import fs from 'node:fs/promises'
import { test, expect } from './fixtures'
import {
  emptyTrip,
  mergeTrips,
  parseTrip,
  publicTrip,
  tripKey,
  type Trip,
} from '../src/lib/trip'
import { reportContext } from '../src/lib/report-context'
import { prefectures } from '../src/data/prefectures'
import { prefecturePlaces } from '../src/data/prefecture-places'
import { places, placePath } from '../src/data/places'
import { travelNotices } from '../src/data/travel-notices'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

const privateTrip: Trip = {
  ...emptyTrip,
  days: 2,
  items: [
    { id: 'gion', day: 1, entryId: 'PrivateBooking_123', note: 'Private note' },
    { id: 'gion', day: 2, entryId: 'PrivateHotel_ABC' },
    { id: 'kiyomizu', day: 0 },
  ],
}

test('public copies replace imported visit identifiers while preserving repeated visits and private backups', () => {
  const original = JSON.stringify(privateTrip)
  const trip = parseTrip(original)!
  const clean = publicTrip(trip)
  expect(JSON.stringify(clean)).not.toMatch(
    /PrivateBooking|PrivateHotel|Private note/,
  )
  expect(clean.items.map(({ id, day }) => ({ id, day }))).toEqual(
    privateTrip.items.map(({ id, day }) => ({ id, day })),
  )
  expect(clean.items[0].entryId).toBeTruthy()
  expect(clean.items[1].entryId).toBeTruthy()
  expect(clean.items[0].entryId).not.toBe(clean.items[1].entryId)
  expect(clean.items[2]).not.toHaveProperty('entryId')
  expect(parseTrip(JSON.stringify(clean))).toEqual(clean)
  const other = publicTrip({
    ...emptyTrip,
    items: [{ id: 'kiyomizu', day: 0, entryId: 'PrivateBooking_123' }],
  })
  expect(mergeTrips(clean, other)?.items).toHaveLength(4)
  expect(JSON.stringify(trip)).toBe(original)
})

test('report URLs retain all public prefectures and place anchors without carrying private URL content', () => {
  expect(new Set(prefecturePlaces.map((place) => place.prefecture))).toEqual(
    new Set(prefectures.map((prefecture) => prefecture.slug)),
  )
  for (const lang of ['en', 'ja', 'th'] as const) {
    for (const prefecture of prefectures) {
      const path = `/${lang}/prefectures/${prefecture.slug}`
      expect(reportContext(`${path}?hotel=PRIVATE#private-booking`, lang)).toBe(
        path,
      )
    }
    for (const place of places) {
      const path = placePath(place, lang)
      const [page, hash] = path.split('#')
      expect(reportContext(`${page}?hotel=PRIVATE#${hash}`, lang)).toBe(path)
    }
    for (const path of [
      `/${lang}/prefectures/undefined`,
      `/${lang}/prefectures/not-a-prefecture`,
      `/${lang}/destinations/not-a-guide`,
      `/${lang}/my-trip/private`,
      `https://evil.test/${lang}/prefectures/kyoto`,
    ])
      expect(reportContext(path, lang)).toBe(`/${lang}/about`)
  }
})

test('returning from a direct map or a removed result restores focus to visible search results', async ({
  page,
}) => {
  for (const path of [
    '/en/explore',
    '/en/explore?scope=places&view=map',
    '/en/explore?scope=prefectures&view=map',
  ]) {
    await page.goto(path)
    await page
      .locator('.prefecture-preview')
      .getByRole('button', { name: en.tools.returnResults, exact: true })
      .click()
    await expect(page.locator('#search-results-heading')).toBeFocused()
    await expect(page.locator('#search-results-heading')).toBeInViewport()
    await expect(page.locator('#explore-map')).toBeHidden()
  }
  await page.goto('/en/explore?scope=places&view=list')
  const show = page
    .locator('.place-search-results li')
    .first()
    .getByRole('button', { name: en.explorer.show, exact: true })
  await show.click()
  await page
    .locator('.prefecture-preview')
    .getByRole('button', { name: en.tools.returnResults, exact: true })
    .click()
  await expect(show).toBeFocused()
  await show.click()
  await page.getByRole('searchbox').fill('Gion')
  await expect(page.locator('.place-search-results li')).toHaveCount(1)
  await page
    .locator('.prefecture-preview')
    .getByRole('button', { name: en.tools.returnResults, exact: true })
    .click()
  await expect(page.locator('#search-results-heading')).toBeFocused()
  await expect(page.locator('#search-results-heading')).toBeInViewport()
})

test('mobile place sheets save the selected canonical place and Undo restores the prior plan in every language', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const [lang, copy] of [
    ['en', en],
    ['ja', ja],
    ['th', th],
  ] as const) {
    await page.goto(`/${lang}/explore?scope=places&view=map&q=Gion`)
    await page.locator('.street-map').scrollIntoViewIfNeeded()
    const marker = page.locator('.street-marker')
    await expect(marker).toHaveCount(1)
    await marker.click()
    const sheet = page.locator('.map-sheet')
    await expect(sheet).toBeVisible()
    await expect(sheet.locator('p')).toHaveAttribute('lang', 'ja')
    const save = sheet.getByRole('button', {
      name: `${copy.trip.save}: ${places.find((p) => p.id === 'gion')!.names[lang]}`,
      exact: true,
    })
    const saveBox = await save.boundingBox()
    const guideBox = await sheet
      .getByRole('link', { name: `${copy.explorer.read} ↗`, exact: true })
      .boundingBox()
    expect(guideBox!.y - saveBox!.y - saveBox!.height).toBeGreaterThanOrEqual(
      12,
    )
    await save.click()
    await expect
      .poll(() =>
        page.evaluate(
          (key) => JSON.parse(localStorage.getItem(key)!).items,
          tripKey,
        ),
      )
      .toEqual([{ id: 'gion', day: 0 }])
    await sheet
      .getByRole('button', { name: copy.tools.closeMap, exact: true })
      .click()
    await expect(marker).toBeFocused()
    await page
      .locator('.trip-feedback')
      .getByRole('button', { name: copy.tools.undo, exact: true })
      .click()
    await expect
      .poll(() =>
        page.evaluate(
          (key) => JSON.parse(localStorage.getItem(key)!).items,
          tripKey,
        ),
      )
      .toEqual([])
  }
})

test('downloaded public JSON removes imported private visit identifiers and leaves the full backup unchanged', async ({
  page,
}) => {
  await page.addInitScript(
    ({ key, trip }) => localStorage.setItem(key, JSON.stringify(trip)),
    { key: tripKey, trip: privateTrip },
  )
  await page.goto('/en/my-trip')
  const backup = page.getByRole('button', {
    name: en.tools.backup,
    exact: true,
  })
  const fullDownload = page.waitForEvent('download')
  await backup.click()
  expect(
    JSON.parse(await fs.readFile((await (await fullDownload).path())!, 'utf8')),
  ).toEqual(privateTrip)
  await page.getByLabel(en.tools.sanitized, { exact: true }).check()
  const publicDownload = page.waitForEvent('download')
  await page.getByRole('button', { name: en.tools.shareDownload, exact: true }).click()
  const raw = await fs.readFile((await (await publicDownload).path())!, 'utf8')
  expect(raw).not.toMatch(/PrivateBooking|PrivateHotel|Private note/)
  expect(
    parseTrip(raw)?.items.filter((item) => item.id === 'gion'),
  ).toHaveLength(2)
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!),
      tripKey,
    ),
  ).toEqual(privateTrip)
})

test('server-supplied travel notice areas retain every localized province name', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date('2026-10-29T03:00:00Z'))
  for (const lang of ['en', 'ja', 'th'] as const) {
    await page.goto(`/${lang}/first-visit`)
    const notices = page.locator('.travel-notices')
    await notices.locator(':scope > summary').click()
    for (const area of new Set(
      travelNotices.flatMap((notice) => notice.areas),
    )) {
      const prefecture = prefectures.find((p) => p.slug === area)
      expect(prefecture).toBeDefined()
      await expect(notices).toContainText(prefecture!.names[lang])
    }
  }
})
