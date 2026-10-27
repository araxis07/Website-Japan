import { test, expect } from './fixtures'
import {
  emptyTrip,
  parseTrip,
  publicTrip,
  japanDate,
  tripKey,
} from '../src/lib/trip'
import { parseLibrary } from '../src/components/TripExtras'
import { tripCalendar } from '../src/lib/trip-calendar'
import { fieldReview, type Visit } from '../src/data/visit-details'
import { currentNotices, travelNotices } from '../src/data/travel-notices'
import { mapUrl, places } from '../src/data/places'

const libraryKey = 'japan-travel-library-v1'
test('new optional data validates without breaking old backups or leaking into public copies', () => {
  expect(parseTrip(JSON.stringify(emptyTrip))).toEqual(emptyTrip)
  const trip = {
    ...emptyTrip,
    preparation: ['documents', 'essentials'],
    fx: { currency: 'THB', rate: 0.25, date: '2026-10-26' },
  }
  expect(parseTrip(JSON.stringify(trip))).toEqual(trip)
  for (const patch of [
    { preparation: ['unknown'] },
    { preparation: ['help', 'help'] },
    { fx: { ...trip.fx, date: '2026-02-30' } },
    { fx: { ...trip.fx, rate: 0 } },
    { fx: { ...trip.fx, currency: 'JPY' } },
  ])
    expect(parseTrip(JSON.stringify({ ...trip, ...patch }))).toBeNull()
  const clean = publicTrip(parseTrip(JSON.stringify(trip))!)
  expect(clean.preparation).toBeUndefined()
  expect(clean.fx).toBeUndefined()
  expect(japanDate(new Date('2026-10-25T15:01:00Z'))).toBe('2026-10-26')
  expect(japanDate(new Date('2026-10-25T14:59:00Z'))).toBe('2026-10-25')
  const calendar = tripCalendar(
    {
      ...emptyTrip,
      startDate: '2026-11-01',
      items: [{ id: 'gion', day: 1, note: 'PRIVATE BOOKING' }],
    },
    'en',
  )!
  expect(calendar).toContain('DTSTART;VALUE=DATE:20261101')
  expect(calendar).not.toContain('PRIVATE BOOKING')
})
test('review freshness follows each field, notices expire, and map queries include the address', () => {
  const text = {
    en: 'Reviewed detail',
    ja: '確認済みの情報',
    th: 'ข้อมูลที่ตรวจแล้ว',
  }
  const visit: Visit = {
    source: 'https://example.org',
    reviewedAt: '2026-10-26',
    access: text,
    hours: text,
    fieldSources: {
      hours: { source: 'https://example.org/hours', reviewedAt: '2025-01-01' },
    },
    notApplicable: {
      booking: {
        reason: text,
        source: 'https://example.org/area',
        reviewedAt: '2026-10-26',
      },
    },
  }
  expect(fieldReview(visit, 'access', '2026-10-26').status).toBe('reviewed')
  expect(fieldReview(visit, 'hours', '2026-10-26').status).toBe('overdue')
  expect(fieldReview(visit, 'booking', '2026-10-26').status).toBe(
    'notApplicable',
  )
  expect(fieldReview(visit, 'admission', '2026-10-26').status).toBe(
    'unverified',
  )
  expect(currentNotices('2026-11-08').some((n) => n.id === 'nex-2026-11')).toBe(
    true,
  )
  expect(currentNotices('2026-11-09').some((n) => n.id === 'nex-2026-11')).toBe(
    false,
  )
  expect(currentNotices('')).toEqual([])
  for (const notice of travelNotices)
    expect(notice.through >= notice.from).toBe(true)
  const place = {
    ...places[0],
    query: undefined,
    address: '東京都台東区上野公園13-9',
  }
  const url = new URL(mapUrl(place, true, 'transit'))
  expect(url.searchParams.get('destination')).toContain(place.address)
  expect(url.searchParams.get('travelmode')).toBe('transit')
})
test('archive validation accepts legacy copies but rejects invalid dates and UTF-8 oversize files', () => {
  expect(
    parseLibrary(JSON.stringify([{ id: 'a', trip: emptyTrip }])),
  ).toHaveLength(1)
  expect(
    parseLibrary(
      JSON.stringify([
        { id: 'a', trip: emptyTrip, savedAt: '2026-10-26T00:00:00.000Z' },
      ]),
    ),
  ).toHaveLength(1)
  expect(
    parseLibrary(
      JSON.stringify([
        { id: 'a', trip: emptyTrip, savedAt: '2026-02-30T00:00:00.000Z' },
      ]),
    ),
  ).toBeNull()
  // An ignored property must not bypass the archive's byte limit.
  expect(
    parseLibrary(
      JSON.stringify([
        { id: 'a', trip: emptyTrip, padding: '旅'.repeat(1_800_000) },
      ]),
    ),
  ).toBeNull()
})
test('starter preview offers only published days and readiness belongs to the saved trip', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await page.locator('.trip-starter > summary').click()
  await expect(
    page.locator('.trip-starter select').nth(1).locator('option'),
  ).toHaveText(['1', '2'])
  await page.locator('.trip-starter select').nth(1).selectOption('2')
  await expect(page.locator('.starter-coverage')).toContainText('2 / 2')
  await page.locator('.trip-starter .apply-plan > button').click()
  await expect(page.locator('.apply-plan .import-preview')).toContainText('2')
  await page.goto('/en/first-visit')
  await page.locator('.readiness-checklist > summary').click()
  await page.locator('.readiness-checklist input').first().check()
  await page.reload()
  await page.locator('.readiness-checklist > summary').click()
  await expect(page.locator('.readiness-checklist input').first()).toBeChecked()
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    { key: tripKey, trip: emptyTrip },
  )
  await expect(
    page.locator('.readiness-checklist input').first(),
  ).not.toBeChecked()
})
test('copy names, timestamps and archive restore are explicit and reject stale previews', async ({
  page,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  await page.locator('.trip-extras > summary').click()
  await page.locator('.trip-library > summary').click()
  await page.locator('.trip-library > button').first().click()
  const name = page.locator('.trip-library input[type=text]')
  await name.fill('Autumn backup')
  await expect(page.locator('.trip-library time')).toHaveCount(1)
  const rows = JSON.parse(
    (await page.evaluate((key) => localStorage.getItem(key), libraryKey))!,
  )
  expect(rows[0].trip.title).toBe('Autumn backup')
  const file = page.locator('.trip-library input[type=file]')
  const incoming = [
    { id: 'restored', trip: { ...emptyTrip, title: 'Incoming copy' } },
  ]
  await file.setInputFiles({
    name: 'copies.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(incoming)),
  })
  await expect(page.locator('.trip-library .import-preview')).toContainText(
    'Incoming copy',
  )
  await page.evaluate((key) => {
    localStorage.setItem(key, '[]')
    dispatchEvent(new Event('trip-library-change'))
  }, libraryKey)
  await page.locator('.trip-library .import-preview button').first().click()
  expect(
    await page.evaluate((key) => localStorage.getItem(key), libraryKey),
  ).toBe('[]')
  await expect(page.locator('.trip-extras p[role=alert]')).toBeVisible()
  await file.setInputFiles({
    name: 'copies.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(incoming)),
  })
  await page.locator('.trip-library .import-preview button').first().click()
  await expect(page.locator('.trip-library input[type=text]')).toHaveValue(
    'Incoming copy',
  )
  expect(
    JSON.parse(
      (await page.evaluate((key) => localStorage.getItem(key), tripKey)) ||
        '{}',
    ).title,
  ).not.toBe('Incoming copy')
})
test('daily overview moves focus and travel-day view keeps Japanese address and private notes local', async ({
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
        items: [{ id: 'gion', day: 2, note: 'Meet at the corner' }],
      },
    },
  )
  await page.locator('.trip-overview > summary').click()
  await page.locator('.trip-overview li button').nth(1).click()
  await expect(page.locator('#trip-day-2')).toBeFocused()
  await page.locator('.trip-on-the-go > summary').click()
  await page.locator('.trip-on-the-go > label select').selectOption('2')
  await expect(page.locator('.trip-on-the-go')).toContainText(
    'Meet at the corner',
  )
  await expect(page.locator('.trip-on-the-go li a')).toHaveAttribute(
    'href',
    /travelmode=transit/,
  )
  await expect(page.locator('.trip-on-the-go p[lang=ja]')).not.toBeEmpty()
})
