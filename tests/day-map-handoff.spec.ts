import type { Page } from '@playwright/test'
import { test, expect, openDetails, readStorage } from './fixtures'
import { tripKey, type Trip } from '../src/lib/trip'
import { places } from '../src/data/places'
import en from '../src/i18n/dictionaries/en.json'

const pinnedId = `custom-${'a'.repeat(32)}`
const unpinnedId = `custom-${'b'.repeat(32)}`
const fixture: Trip = {
  version: 1,
  days: 2,
  title: 'Example map plan',
  items: [
    { id: 'gion', day: 1, time: '15:00', note: 'First visit' },
    { id: unpinnedId, day: 1, time: '12:00', custom: { name: 'Example unpinned stop', address: 'Another example address' } },
    { id: 'gion', entryId: 'repeat-gion', day: 1, time: '09:00', note: 'Repeated visit' },
    { id: pinnedId, day: 1, custom: { name: 'Example pinned stop', address: 'Example address', coordinates: [34.9858, 135.7588] } },
    { id: 'kiyomizu', day: 2 },
  ],
}

async function openDayMap(page: Page, trip: Trip = fixture) {
  await page.goto('/en/my-trip')
  await page.evaluate(async ({ key, trip }) => {
    await window.seedTestStorage(key, JSON.stringify(trip))
    dispatchEvent(new Event('trip-change'))
  }, { key: tripKey, trip })
  await expect(page.locator('#trip-visit-repeat-gion')).toBeVisible()
  await page.getByRole('combobox', { name: en.tools.editDay, exact: true }).selectOption('1')
  const map = page.locator('.trip-day[aria-labelledby="trip-day-1"] .day-map')
  await openDetails(map)
  await map.locator('.street-map').scrollIntoViewIfNeeded()
  await expect(map.locator('.street-marker')).toHaveCount(3)
  return map
}

test('day-map mouse and native keys target repeated and personal visits without changing drafts or the plan', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 390, height: 844 })
  const map = await openDayMap(page)
  const first = page.locator('#trip-visit-gion')
  const repeated = page.locator('#trip-visit-repeat-gion')
  const personal = page.locator(`#trip-visit-${pinnedId}`)
  await openDetails(repeated.locator('.trip-visit-editor'))
  const duration = repeated.getByLabel(`${en.tools.duration}: Gion`, { exact: true })
  await duration.fill('1441')
  await expect(duration).toHaveAttribute('aria-invalid', 'true')
  const raw = await readStorage(page, tripKey)
  const draft = await page.evaluate(() => sessionStorage.getItem('japan-travel-drafts-v1'))
  const url = page.url()
  expect(raw && JSON.parse(raw)).toEqual(fixture)
  expect(draft).not.toBeNull()

  // Coincident pins share a location, but the top pin still owns its distinct visit key.
  const repeatedMarker = map.locator('.street-map').getByRole('button', { name: '3. Gion', exact: true })
  await repeatedMarker.click()
  await expect(repeated).toBeFocused()
  await expect(repeated.locator('h3')).toBeInViewport()
  await expect.poll(() => repeated.evaluate((card) =>
    card.getBoundingClientRect().top - document.querySelector('.site-header')!.getBoundingClientRect().bottom,
  )).toBeGreaterThanOrEqual(0)
  await expect(repeatedMarker).toHaveAttribute('aria-pressed', 'true')

  const firstMarker = map.locator('.street-map').getByRole('button', { name: '1. Gion', exact: true })
  await firstMarker.focus()
  await page.keyboard.press('Enter')
  await expect(first).toBeFocused()
  await expect(firstMarker).toHaveAttribute('aria-pressed', 'true')
  await expect(repeatedMarker).toHaveAttribute('aria-pressed', 'false')
  await map.locator('.street-map').getByRole('button', { name: '4. Example pinned stop', exact: true }).focus()
  await page.keyboard.press('Space')
  await expect(personal).toBeFocused()
  const choices = map.getByRole('group', { name: en.tools.place, exact: true })
  await choices.getByRole('button', { name: '1. Gion · 15:00', exact: true }).click()
  await expect(first).toBeFocused()
  const repeatedChoice = choices.getByRole('button', { name: '3. Gion · 09:00', exact: true })
  await repeatedChoice.focus()
  await page.keyboard.press('Enter')
  await expect(repeated).toBeFocused()
  await expect(repeatedChoice).toHaveAttribute('aria-pressed', 'true')
  await expect(repeatedMarker).toHaveAttribute('aria-pressed', 'true')
  await expect(duration).toHaveValue('1441')
  await expect(page.getByRole('combobox', { name: en.tools.editDay, exact: true })).toHaveValue('1')
  expect(page.url()).toBe(url)
  expect(await readStorage(page, tripKey)).toBe(raw)
  expect(await page.evaluate(() => sessionStorage.getItem('japan-travel-drafts-v1'))).toBe(draft)

  await page.reload()
  await expect(page.locator('#trip-visit-repeat-gion')).toBeVisible()
  await openDetails(repeated.locator('.trip-visit-editor'))
  await expect(duration).toHaveValue('1441')
  expect(await readStorage(page, tripKey)).toBe(raw)
  expect(errors).toEqual([])
})

test('removing a selected day-map visit clears its marker selection and map handoffs retain Undo', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  const map = await openDayMap(page)
  const repeated = page.locator('#trip-visit-repeat-gion')
  await map.locator('.street-map').getByRole('button', { name: '3. Gion', exact: true }).click()
  await expect(repeated).toBeFocused()
  await openDetails(repeated.locator('.trip-visit-editor'))
  await repeated.getByRole('button', { name: `${en.trip.remove}: Gion`, exact: true }).click()
  await expect(repeated).toHaveCount(0)
  await expect(map.locator('.street-marker')).toHaveCount(2)
  await expect(map.locator('.street-marker[aria-pressed="true"]')).toHaveCount(0)
  await expect(map.getByRole('group', { name: en.tools.place, exact: true })).toHaveCount(0)
  await map.locator('.street-map').getByRole('button', { name: '1. Gion', exact: true }).click()
  await expect(page.locator('#trip-visit-gion')).toBeFocused()
  await page.locator('.trip-feedback').getByRole('button', { name: en.tools.undo, exact: true }).click()
  await expect(repeated).toBeVisible()
  await expect.poll(async () => JSON.parse((await readStorage(page, tripKey))!)).toEqual(fixture)
  await map.locator('.street-map').getByRole('button', { name: '3. Gion', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(repeated).toBeFocused()
  await expect(page.getByRole('combobox', { name: en.tools.editDay, exact: true })).toHaveValue('1')
  expect(errors).toEqual([])
})

test('visit references retain unmapped list positions and time order while every coincident visit has a touch choice', async ({ page, isMobile }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 320, height: 844 })
  const name = `Long${'x'.repeat(156)}`
  const trip: Trip = {
    ...fixture,
    items: fixture.items.map((entry) => entry.id === pinnedId ? {
      ...entry,
      custom: { ...entry.custom!, name, coordinates: places.find((place) => place.id === 'gion')!.coordinates },
    } : entry),
  }
  const map = await openDayMap(page, trip)
  const day = page.locator('.trip-day[aria-labelledby="trip-day-1"]')
  await expect(day.locator(':scope > ol > li .place-kind')).toHaveText([
    `1. ${en.tools.place}`, `2. ${en.tools.personalStop}`, `3. ${en.tools.place}`, `4. ${en.tools.personalStop}`,
  ])
  await expect(map.locator('.street-marker')).toHaveText(['1', '3', '4'])
  const timeline = day.locator(':scope > details').filter({ has: page.getByText(en.tools.timeline, { exact: true }) })
  await openDetails(timeline)
  await expect(timeline.getByText(en.tools.timelineOrder, { exact: true })).toBeVisible()
  await expect(timeline.locator('.trip-timeline strong')).toHaveText([
    '3. 09:00 · Gion', '2. 12:00 · Example unpinned stop', '1. 15:00 · Gion',
  ])
  const raw = await readStorage(page, tripKey)
  const url = page.url()
  expect(raw && JSON.parse(raw)).toEqual(trip)
  const choices = map.getByRole('group', { name: en.tools.place, exact: true })
  await expect(choices.getByRole('button')).toHaveCount(3)
  for (const [label, id, markerLabel] of [
    ['1. Gion · 15:00', 'gion', '1. Gion'],
    ['3. Gion · 09:00', 'repeat-gion', '3. Gion'],
    [`4. ${name}`, pinnedId, `4. ${name}`],
  ]) {
    const choice = choices.getByRole('button', { name: label, exact: true })
    await choice.scrollIntoViewIfNeeded()
    const box = (await choice.boundingBox())!
    expect(box.width).toBeGreaterThanOrEqual(44)
    expect(box.height).toBeGreaterThanOrEqual(44)
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(320)
    if (isMobile) await choice.tap()
    else await choice.click()
    await expect(page.locator(`#trip-visit-${id}`)).toBeFocused()
    await expect(choice).toHaveAttribute('aria-pressed', 'true')
    await expect(map.locator('.street-map').getByRole('button', { name: markerLabel, exact: true })).toHaveAttribute('aria-pressed', 'true')
  }
  expect(await choices.evaluate((group) => group.scrollWidth <= group.clientWidth)).toBe(true)
  expect(await readStorage(page, tripKey)).toBe(raw)
  expect(page.url()).toBe(url)
  await expect(page.getByRole('combobox', { name: en.tools.editDay, exact: true })).toHaveValue('1')
  expect(errors).toEqual([])
})
