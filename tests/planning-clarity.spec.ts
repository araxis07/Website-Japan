import fs from 'node:fs/promises'
import type { Download, Page } from '@playwright/test'
import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey, type Trip } from '../src/lib/trip'
import { fieldReview, visitDetails, visitSource } from '../src/data/visit-details'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

const languages = [
  ['en', en],
  ['ja', ja],
  ['th', th],
] as const
const libraryKey = 'japan-travel-library-v1'
const fixture: Trip = {
  ...emptyTrip,
  days: 3,
  title: 'Example / 旅 / ทริป',
  startDate: '2026-11-01',
  base: 'Example base address',
  travelers: 2,
  notes: { 1: 'Private day note / 予約 / บันทึก' },
  budget: { stay: 30000, food: 5000 },
  fx: { currency: 'THB', rate: 0.25, date: '2026-10-31' },
  preparation: ['documents'],
  stays: [
    { id: 'old', name: 'Old hotel', address: 'Tokyo Station', from: 1, to: 2 },
    { id: 'new', name: 'New hotel', address: 'Kyoto Station', from: 2, to: 4 },
  ],
  items: [
    { id: 'gion', day: 2, time: '10:00', note: 'Private visit note' },
    { id: 'kiyomizu', day: 2 },
    { id: 'sensoji', day: 0 },
    {
      id: `custom-${'b'.repeat(32)}`,
      day: 1,
      custom: {
        name: 'Example personal hotel',
        address: 'Example personal address',
        coordinates: [34.9858, 135.7588],
      },
    },
  ],
}

const storedTrip = (page: Page) =>
  page.evaluate((key) => JSON.parse(localStorage.getItem(key)!) as Trip, tripKey)

async function seed(page: Page, trip: Trip) {
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    { key: tripKey, trip },
  )
}

async function downloadText(download: Download) {
  return fs.readFile((await download.path())!, 'utf8')
}

test('event validity is inclusive and distinct from review age without changing sibling provenance or unknown fields', () => {
  const museum = visitDetails['kyoto-museum']
  const temple = visitDetails.kiyomizu
  expect(visitSource(museum, 'booking')).toEqual({
    source: 'https://www.kyohaku.go.jp/eng/',
    reviewedAt: '2026-10-30',
    validThrough: '2026-11-29',
  })
  expect(fieldReview(museum, 'booking', '2026-11-29')).toMatchObject({
    status: 'reviewed',
    reviewedAt: '2026-10-30',
    validThrough: '2026-11-29',
    nextReviewBy: '2026-11-29',
  })
  expect(fieldReview(museum, 'booking', '2026-11-30')).toMatchObject({
    status: 'expired',
    reviewedAt: '2026-10-30',
    validThrough: '2026-11-29',
  })
  expect(fieldReview(temple, 'booking', '2026-11-30').status).toBe('overdue')
  expect(fieldReview(temple, 'booking', '2026-12-01').status).toBe('expired')
  expect(visitSource(museum, 'hours').reviewedAt).toBe('2026-10-26')
  expect(visitSource(temple, 'entrance').reviewedAt).toBe('2026-10-26')
  expect(fieldReview(museum, 'accessibility', '2026-11-30').status).toBe(
    'reviewed',
  )
  for (const field of ['hours', 'admission', 'booking', 'accessibility'] as const)
    expect(
      fieldReview(
        visitDetails['pref:kyoto:fushimi-inari-taisha'],
        field,
        '2027-01-01',
      ),
    ).toEqual({ status: 'unverified' })
  expect(
    fieldReview({ ...museum, booking: undefined }, 'booking', '2027-01-01'),
  ).toEqual({ status: 'unverified' })
})

test('resolved direction origins remain visible with the controls closed in every language', async ({
  page,
}) => {
  test.setTimeout(60_000)
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/my-trip`)
    await seed(page, fixture)
    const directions = page.locator(
      '.trip-day[aria-labelledby="trip-day-2"] li[data-place-id="kiyomizu"] .trip-directions',
    )
    const summary = directions.locator('.trip-origin-summary')
    const controls = directions.locator('details')
    const select = controls.getByRole('combobox')
    const link = directions.locator(':scope > a')
    await expect(summary).toBeVisible()
    const previousName = await page.locator(
      '.trip-day[aria-labelledby="trip-day-2"] li[data-place-id="gion"] h3',
    ).innerText()
    await expect(summary).toHaveText(
      `${copy.tools.origin}: ${copy.tools.originPrevious}: ${previousName}`,
    )
    await expect(controls).not.toHaveAttribute('open')
    let route = new URL((await link.getAttribute('href'))!)
    expect(route.searchParams.get('origin')).toBe('祇園 京都府 日本')
    for (const choice of [
      { value: 'device', label: copy.tools.originDevice, origin: null },
      {
        value: 'base',
        label: `${copy.tools.originBase}: ${fixture.base}`,
        origin: fixture.base!,
      },
      {
        value: 'stay:old',
        label: `${copy.tools.originCheckout}: Old hotel`,
        origin: 'Old hotel Tokyo Station',
      },
      {
        value: 'stay:new',
        label: `${copy.tools.originStay}: New hotel`,
        origin: 'New hotel Kyoto Station',
      },
      { value: 'manual', label: copy.tools.originManualEmpty, origin: null },
    ]) {
      await openDetails(controls)
      await select.selectOption(choice.value)
      await controls.locator(':scope > summary').click()
      await expect(summary).toBeVisible()
      await expect(summary).toHaveText(`${copy.tools.origin}: ${choice.label}`)
      route = new URL((await link.getAttribute('href'))!)
      expect(route.origin).toBe('https://www.google.com')
      expect(route.searchParams.get('origin')).toBe(choice.origin)
      expect(route.searchParams.get('travelmode')).toBe('transit')
    }
    await openDetails(controls)
    await controls
      .getByLabel(copy.tools.originAddress, { exact: true })
      .fill('   ')
    await expect(summary).toContainText(copy.tools.originManualEmpty)
    expect(
      new URL((await link.getAttribute('href'))!).searchParams.has('origin'),
    ).toBe(false)
    await controls
      .getByLabel(copy.tools.originAddress, { exact: true })
      .fill('  Example other address  ')
    await controls.locator(':scope > summary').click()
    await expect(summary).toHaveText(
      `${copy.tools.origin}: ${copy.tools.originManual}: Example other address`,
    )
    expect(
      new URL((await link.getAttribute('href'))!).searchParams.get('origin'),
    ).toBe('Example other address')
    await openDetails(controls)
    await select.selectOption('stay:new')
    await controls.locator(':scope > summary').click()
    await seed(page, {
      ...fixture,
      stays: fixture.stays!.filter((stay) => stay.id !== 'new'),
    })
    await expect(summary).toHaveText(
      `${copy.tools.origin}: ${copy.tools.originDevice}`,
    )
    expect(
      new URL((await link.getAttribute('href'))!).searchParams.has('origin'),
    ).toBe(false)
  }
})

test('calendar scope and export purposes stay clear and controls fit narrow layouts in every language', async ({
  page,
}) => {
  test.setTimeout(90_000)
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/my-trip`)
    await seed(page, fixture)
    const preview = page.locator('.trip-tools > .export-preview')
    await openDetails(preview)
    await expect(preview.locator('.export-purpose > div')).toHaveCount(4)
    await expect(preview.locator('.export-purpose')).toContainText(
      copy.tools.backupHelp,
    )
    await expect(preview.locator('.export-purpose')).toContainText(
      copy.tools.offlineHelp,
    )
    await expect(preview.locator('.export-purpose')).toContainText(
      copy.tools.shareExportHelp,
    )
    await page.getByLabel(copy.tools.sanitized, { exact: true }).check()
    await expect(preview).toContainText(copy.tools.publicExports)
    await preview
      .getByRole('link', { name: copy.tools.calendar, exact: true })
      .click()
    const extras = page.locator('#trip-more-tools')
    const calendar = page.locator('#trip-calendar')
    await expect(extras).toHaveAttribute('open', '')
    await expect(calendar).toHaveAttribute('open', '')
    for (const [label, count] of [
      [copy.tools.calendarTimed, 1],
      [copy.tools.calendarAllDay, 2],
      [copy.tools.calendarExcluded, 1],
    ] as const)
      await expect(
        calendar
          .locator('.calendar-counts > div')
          .filter({ has: page.getByText(label, { exact: true }) })
          .locator('dd'),
      ).toHaveText(String(count))
    await expect(
      calendar.getByLabel(copy.tools.calendarNotes, { exact: true }),
    ).not.toBeChecked()
    const received = page.waitForEvent('download')
    await calendar
      .getByRole('button', { name: copy.tools.calendar, exact: true })
      .click()
    const contents = await downloadText(await received)
    expect(contents.match(/BEGIN:VEVENT/g)).toHaveLength(3)
    expect(contents.match(/DTSTART;VALUE=DATE:/g)).toHaveLength(2)
    expect(contents).toContain('DTSTART:20261102T010000Z')
    expect(contents).toContain('Example personal hotel')
    expect(contents).not.toContain('Private visit note')
    expect(contents).not.toContain('SUMMARY:Sensoji')
    expect(await storedTrip(page)).toEqual(fixture)

    for (const panel of await extras.locator(':scope > .budget-panel').all())
      await openDetails(panel)
    for (const [width, theme] of [[320, 'light'], [390, 'dark']] as const) {
      await page.setViewportSize({ width, height: 844 })
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' })
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      const targets = extras.locator(
        'button, select, .budget-panel > summary, label:has(> input[type="checkbox"])',
      )
      for (const target of await targets.all()) {
        if (!(await target.isVisible())) continue
        const box = await target.boundingBox()
        expect(
          box!.height,
          `${lang}/${width}/${theme} target height`,
        ).toBeGreaterThanOrEqual(43.99)
        expect(
          box!.width,
          `${lang}/${width}/${theme} target width`,
        ).toBeGreaterThanOrEqual(43.99)
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${lang}/${width}/${theme} horizontal overflow`,
      ).toBe(true)
    }
  }
})

test('only a pristine editor starts collapsed while metadata, notes, drafts and import paths remain available', async ({
  page,
}) => {
  test.setTimeout(90_000)
  page.on('dialog', (dialog) => dialog.accept())
  const advanced = page.locator('.trip-advanced')
  const advancedContent = advanced.locator('#trip-advanced-content')
  const advancedToggle = advanced.locator('.trip-advanced-toggle')
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/my-trip`)
    await expect(advanced).toHaveAttribute('data-pristine', 'true')
    await expect(advancedContent).toBeHidden()
    await expect(advancedToggle).toHaveAccessibleName(copy.tools.advancedPlan)
    await expect(advancedToggle).toHaveAttribute('aria-expanded', 'false')
    await expect(advancedToggle).toHaveAttribute('aria-controls', 'trip-advanced-content')
    await expect(page.locator('.planner-toolbar')).toBeHidden()
    await expect(page.getByLabel(copy.tools.title, { exact: true })).toBeVisible()
    await expect(page.locator('.personal-stop > summary')).toBeVisible()
    await expect(
      page.getByRole('button', { name: copy.tools.backup, exact: true }),
    ).toBeVisible()
  }
  await page.goto('/en/my-trip')
  await advancedToggle.focus()
  await page.keyboard.press('Enter')
  await expect(advancedToggle).toHaveAttribute('aria-expanded', 'true')
  const note = advanced
    .locator('.trip-day[aria-labelledby="trip-day-1"]')
    .getByLabel(en.tools.notes, { exact: true })
  await note.fill('Notes without visits')
  await expect(note).toBeFocused()
  await expect(advanced).toHaveAttribute('data-pristine', 'false')
  await expect(advancedContent).toBeVisible()
  await expect(advancedToggle).toBeHidden()
  await page.reload()
  await expect(note).toHaveValue('Notes without visits')

  for (const patch of [
    { stays: [{ id: 'stay', name: 'Example hotel', from: 1, to: 2 }] },
    { budget: { food: 0 } },
    { fx: fixture.fx },
    { preparation: ['documents'] },
    { title: '' },
    { stays: [] },
    { days: 3 },
  ] satisfies Partial<Trip>[]) {
    const trip = { ...emptyTrip, ...patch }
    await seed(page, trip)
    await page.reload()
    await expect(advanced).toHaveAttribute('data-pristine', 'false')
    await expect(advancedContent).toBeVisible()
    await expect(page.locator('.planner-toolbar')).toBeVisible()
    expect(await storedTrip(page)).toEqual(trip)
  }
  await seed(page, emptyTrip)
  for (const hash of ['trip-tools', 'trip-import']) {
    await page.goto(`/en/my-trip#${hash}`)
    await page.reload()
    await expect(page.locator(`#${hash}`)).toBeInViewport()
    await expect(advancedContent).toBeHidden()
  }
  await page.locator('#trip-import input').setInputFiles({
    name: 'incoming.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({ ...emptyTrip, title: 'Incoming example' }),
    ),
  })
  const incoming = page.locator('.trip-tools > .import-preview')
  await expect(incoming).toBeVisible()
  await expect(incoming).toContainText('Incoming example')
  expect(await storedTrip(page)).toEqual(emptyTrip)
  await incoming.getByRole('button', { name: en.tools.cancel, exact: true }).click()
  const budget = page.locator('.trip-tools > .budget-panel').filter({
    has: page.getByLabel(en.tools.travelers, { exact: true }),
  })
  await openDetails(budget)
  await budget.getByLabel(en.tools.travelers, { exact: true }).fill('0')
  await expect(advanced).toHaveAttribute('data-pristine', 'false')
  await expect(advancedContent).toBeVisible()
  await expect(page.locator('.save-status')).toHaveText(en.tools.pendingDrafts)
  await expect(
    page.getByRole('button', { name: en.tools.backup, exact: true }),
  ).toBeDisabled()
  await page.reload()
  await expect(advancedContent).toBeVisible()
  await openDetails(budget)
  await expect(
    budget.getByLabel(en.tools.travelers, { exact: true }),
  ).toHaveValue('0')
  expect(await storedTrip(page)).toEqual(emptyTrip)
})

test('first offline use can export full JSON, readable HTML and a saved-copy library without another network request', async ({
  page,
  context,
}) => {
  test.setTimeout(60_000)
  await page.goto('/en/my-trip')
  await expect(page.locator('.save-status')).toHaveText(en.tools.savedLocal)
  await expect(page.locator('.trip-extras')).not.toHaveAttribute('open')
  await context.setOffline(true)
  await seed(page, fixture)
  const jsonDownload = page.waitForEvent('download')
  await page.getByRole('button', { name: en.tools.backup, exact: true }).click()
  expect(JSON.parse(await downloadText(await jsonDownload))).toEqual(fixture)
  const htmlDownload = page.waitForEvent('download')
  await page.getByRole('button', { name: en.tools.offline, exact: true }).click()
  const html = await downloadText(await htmlDownload)
  expect(html).not.toMatch(/<script\b/i)
  const offline = await context.newPage()
  await offline.setContent(html)
  await expect(offline.locator('body')).toContainText(fixture.title!)
  await expect(offline.locator('body')).toContainText('Example personal hotel')
  await expect(offline.locator('body')).toContainText(
    'Private day note / 予約 / บันทึก',
  )
  await offline.close()
  await openDetails(page.locator('.trip-extras'))
  const library = page.locator('.trip-library')
  await openDetails(library)
  await library
    .getByRole('button', { name: en.tools.saveCopy, exact: true })
    .click()
  await expect(library.locator('li')).toHaveCount(1)
  const libraryDownload = page.waitForEvent('download')
  await library
    .getByRole('button', { name: en.tools.libraryExport, exact: true })
    .click()
  const rows = JSON.parse(await downloadText(await libraryDownload))
  expect(rows).toHaveLength(1)
  expect(rows[0].trip).toEqual(fixture)
  expect(
    JSON.parse(
      (await page.evaluate((key) => localStorage.getItem(key), libraryKey))!,
    ),
  ).toEqual(rows)
  expect(await storedTrip(page)).toEqual(fixture)
  await context.setOffline(false)
})

test('expired event claims, overdue checks and unknown facts remain distinct in every language', async ({
  page,
}) => {
  test.setTimeout(60_000)
  // November 30 begins in Japan while the UTC date is still November 29.
  await page.clock.setFixedTime(new Date('2026-11-29T15:00:00Z'))
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/prefectures/kyoto#place-kyoto-museum`)
    const museum = page.locator('#place-kyoto-museum > .visit-details')
    await openDetails(museum)
    const booking = museum.locator('.visit-facts > div').filter({
      has: page.getByText(copy.tools.booking, { exact: true }),
    })
    await expect(booking).toHaveAttribute('data-review-status', 'expired')
    await expect(booking).toContainText(copy.tools.claimExpired)
    await expect(booking).toContainText(copy.tools.validThrough)
    await expect(booking.locator('time[datetime="2026-10-30"]')).toBeVisible()
    await expect(booking.locator('time[datetime="2026-11-29"]')).toBeVisible()
    await expect(booking.locator('.field-source a')).toHaveAttribute(
      'href',
      'https://www.kyohaku.go.jp/eng/',
    )
    const hours = museum.locator('.visit-facts > div').filter({
      has: page.getByText(copy.tools.hours, { exact: true }),
    })
    await expect(hours).toHaveAttribute('data-review-status', 'overdue')
    await expect(hours).toContainText(copy.tools.reviewDue)
    await expect(hours).not.toContainText(copy.tools.claimExpired)
    await expect(hours.locator('time')).toHaveAttribute('datetime', '2026-10-26')
    const inari = page.locator(
      '[id="place-pref:kyoto:fushimi-inari-taisha"] > .visit-details',
    )
    await openDetails(inari)
    const unknown = inari.locator('.visit-facts > div').filter({
      has: page.getByText(copy.tools.booking, { exact: true }),
    })
    await expect(unknown).toHaveAttribute('data-review-status', 'unverified')
    await expect(unknown).toContainText(copy.tools.verify)
    await expect(unknown.locator('.field-source')).toHaveCount(0)
  }
})
