import { test, expect } from './fixtures'
import {
  emptyTrip,
  entryKey,
  maxTripBytes,
  overlaps,
  parseTrip,
  publicTrip,
  tripKey,
} from '../src/lib/trip'
import { offlineTrip } from '../src/lib/trip-export'
import en from '../src/i18n/dictionaries/en.json'

test('UTF-8 backups round-trip with long notes, repeats and lodging; malformed fields fail closed', () => {
  const trip = {
    ...emptyTrip,
    days: 30,
    notes: Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => [i + 1, 'ก'.repeat(1000)]),
    ),
    items: [
      { id: 'gion', day: 1 },
      { id: 'gion', day: 2, entryId: 'repeat-1', duration: 90, buffer: 30 },
    ],
    stays: [{ id: 'hotel-1', name: '京都', from: 1, to: 4 }],
    travelers: 2,
  }
  const raw = JSON.stringify(trip, null, 2)
  expect(Buffer.byteLength(raw)).toBeGreaterThan(64_000)
  expect(Buffer.byteLength(raw)).toBeLessThan(maxTripBytes)
  expect(parseTrip(raw)).toEqual(trip)
  expect(
    parseTrip(
      JSON.stringify({ ...trip, stays: [{ name: 'Legacy', from: 1, to: 2 }] }),
    )?.stays?.[0].id,
  ).toBe('stay-0')
  expect(new Set(trip.items.map(entryKey)).size).toBe(2)
  for (const extra of [
    { travelers: 0 },
    { stays: [{ name: 'x', from: 3, to: 2 }] },
    { items: [{ id: 'gion', day: 1, duration: -1 }] },
    { items: [trip.items[1], trip.items[1]] },
  ])
    expect(parseTrip(JSON.stringify({ ...trip, ...extra }))).toBeNull()
  expect(
    overlaps([
      { id: 'gion', day: 1, time: '09:00', duration: 60, buffer: 30 },
      { id: 'kiyomizu', day: 1, time: '10:15' },
    ]),
  ).toBe(true)
  expect(
    overlaps([
      { id: 'gion', day: 1, time: '09:00', duration: 60 },
      { id: 'kiyomizu', day: 1, time: '10:15' },
    ]),
  ).toBe(false)
  expect(publicTrip(trip)).not.toHaveProperty('notes')
  expect(publicTrip(trip)).not.toHaveProperty('stays')
})

test('notes survive removing every place and shortening a trip, including offline output', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    {
      key: tripKey,
      trip: {
        ...emptyTrip,
        days: 2,
        notes: { 0: 'Arrival note', 7: 'Return flight note' },
        items: [],
      },
    },
  )
  await expect(
    page.getByText('Return flight note', { exact: true }).first(),
  ).toBeAttached()
  await expect(page.locator('#trip-day-7')).toBeVisible()
  await expect(page.locator('#trip-day-0')).toBeVisible()
  const name = page.getByRole('textbox', { name: 'Trip name', exact: true })
  await name.fill('No blur needed')
  await expect(name).toBeFocused()
  expect(
    JSON.parse(
      (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
    ).title,
  ).toBe('No blur needed')
  await page.reload()
  await expect(name).toHaveValue('No blur needed')
  expect(
    offlineTrip(
      { ...emptyTrip, days: 2, notes: { 7: 'Return flight note' } },
      'en',
      en.trip,
      en.tools,
    ),
  ).toContain('Return flight note')
})

test('same place can be scheduled twice and removing one visit preserves the other', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    { key: tripKey, trip: { ...emptyTrip, items: [{ id: 'gion', day: 1 }] } },
  )
  await page
    .getByRole('button', { name: 'Add another visit: Gion', exact: true })
    .click()
  await expect(page.locator('.trip-day li[data-place-id=gion]')).toHaveCount(2)
  await page
    .locator('.trip-day li[data-place-id=gion]')
    .first()
    .getByRole('button', { name: 'Remove: Gion', exact: true })
    .click()
  await expect(page.locator('.trip-day li[data-place-id=gion]')).toHaveCount(1)
})

test('removing a hotel keeps an invalid draft attached to the correct remaining hotel', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    {
      key: tripKey,
      trip: {
        ...emptyTrip,
        stays: [
          { id: 'first', name: 'Tokyo hotel', from: 1, to: 3 },
          { id: 'second', name: 'Kyoto hotel', from: 3, to: 5 },
        ],
      },
    },
  )
  await page.locator('.budget-panel').first().locator('summary').click()
  const rows = page.locator('.lodging-row')
  await rows.nth(1).getByRole('spinbutton').last().fill('2')
  await expect(rows.nth(1).getByRole('spinbutton').last()).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await rows.first().getByRole('button').click()
  await expect(rows).toHaveCount(1)
  await expect(rows.getByRole('textbox')).toHaveValue('Kyoto hotel')
  await expect(rows.getByRole('spinbutton').last()).toHaveValue('2')
  const saved = JSON.parse(
    (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
  )
  expect(saved.stays).toEqual([
    { id: 'second', name: 'Kyoto hotel', from: 3, to: 5 },
  ])
})
