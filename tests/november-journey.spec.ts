import type { Page } from '@playwright/test'
import { readStorage, test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey, type Trip } from '../src/lib/trip'
import { fieldApplicability, visitDetails } from '../src/data/visit-details'
import { places, placePath } from '../src/data/places'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

const libraryKey = 'japan-travel-library-v1'
const draftKey = 'japan-travel-drafts-v1'
const longTrip: Trip = {
  ...emptyTrip,
  days: 7,
  title: 'Long plan',
  items: [{ id: 'gion', day: 7 }],
}
const shortTrip: Trip = {
  ...emptyTrip,
  days: 1,
  title: 'Short plan',
  items: [{ id: 'sensoji', day: 1 }],
}

async function seed(page: Page, trip: Trip) {
  await page.evaluate(async ({ key, trip }) => {
    await window.seedTestStorage(key, JSON.stringify(trip))
    dispatchEvent(new Event('trip-change'))
  }, { key: tripKey, trip })
}

async function selectDaySeven(page: Page) {
  await page.getByRole('combobox', { name: en.tools.editDay, exact: true }).selectOption('7')
  await expect(page.locator('#trip-day-7')).toBeVisible()
}

async function expectShortTripVisible(page: Page) {
  await expect(page.getByRole('combobox', { name: en.tools.editDay, exact: true })).toHaveValue('all')
  await expect(page.locator('#trip-day-1')).toBeVisible()
  await expect(page.locator('.trip-day li[data-place-id="sensoji"]')).toBeVisible()
}

test('replacing the plan after viewing day seven restores a valid editor filter and preserves imported data', async ({ page }) => {
  await page.goto('/en/my-trip')
  await seed(page, longTrip)
  await selectDaySeven(page)
  await page.locator('.trip-file-actions input[type=file]').setInputFiles({
    name: 'short.json', mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(shortTrip)),
  })
  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: en.tools.replace, exact: true }).click()
  await expectShortTripVisible(page)
  expect((JSON.parse((await readStorage(page, tripKey))!))).toEqual(shortTrip)
  await page.reload()
  await expectShortTripVisible(page)
})

test('library load, undo and another tab keep the day filter valid', async ({ page, context }) => {
  await page.goto('/en/my-trip')
  await seed(page, longTrip)
  await page.evaluate(async ({ key, trip }) => {
    await window.seedTestStorage(key, JSON.stringify([{ id: 'short-copy', trip }]))
    dispatchEvent(new Event('trip-library-change'))
  }, { key: libraryKey, trip: shortTrip })
  await selectDaySeven(page)
  await openDetails(page.locator('.trip-extras'))
  await openDetails(page.locator('.trip-library'))
  page.once('dialog', (dialog) => dialog.accept())
  await page.locator('.trip-library').getByRole('button', { name: en.tools.loadCopy, exact: true }).click()
  await expectShortTripVisible(page)

  await page.locator('.trip-file-actions').getByRole('button', { name: new RegExp(`^${en.tools.undo}`) }).click()
  await expect(page.getByLabel(en.tools.title, { exact: true })).toHaveValue('Long plan')
  await expect(page.getByRole('combobox', { name: en.tools.editDay, exact: true })).toHaveValue('7')
  await expect(page.locator('#trip-day-7')).toBeVisible()
  const other = await context.newPage()
  await other.goto('/en/my-trip')
  await seed(other, shortTrip)
  await expectShortTripVisible(page)
  expect((JSON.parse((await readStorage(page, tripKey))!))).toEqual(shortTrip)
  await other.close()
})

test('reverting one personal field clears only its draft and preserves a conflicting edit', async ({ page }) => {
  const id = `custom-${'b'.repeat(32)}`
  const personalTrip: Trip = {
    ...emptyTrip,
    items: [{ id, day: 1, custom: { name: 'Hotel', address: 'Old address' } }],
  }
  await page.goto('/en/my-trip')
  await seed(page, personalTrip)
  const editor = page.locator(`li[data-place-id="${id}"] .personal-stop`)
  await openDetails(editor)
  const name = editor.getByLabel(en.tools.personalName, { exact: true })
  const address = editor.getByLabel(en.tools.personalAddress, { exact: true })
  await name.fill('Changed hotel')
  await address.fill('My draft address')
  await name.fill('Hotel')
  const drafts = await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)!), draftKey)
  expect(drafts[`personal:${id}:name`]).toBeUndefined()
  expect(drafts[`personal:${id}:address`].value).toBe('My draft address')
  await page.evaluate(async ({ key, trip }) => {
    trip.items[0].custom!.address = 'Changed elsewhere'
    await window.seedTestStorage(key, JSON.stringify(trip))
    dispatchEvent(new Event('trip-change'))
  }, { key: tripKey, trip: personalTrip })
  await editor.getByRole('button', { name: en.tools.savePersonal, exact: true }).click()
  await expect(editor.getByRole('alert')).toHaveText(en.tools.conflict)
  await expect(address).toHaveValue('My draft address')
  expect((JSON.parse((await readStorage(page, tripKey))!).items[0].custom.address)).toBe('Changed elsewhere')
})

test('clearing new personal-place fields removes only their drafts and re-enables backup', async ({ page }) => {
  await page.goto('/en/my-trip')
  await seed(page, shortTrip)
  const editor = page.locator('.personal-stop').last()
  await openDetails(editor)
  const name = editor.getByLabel(en.tools.personalName, { exact: true })
  const address = editor.getByLabel(en.tools.personalAddress, { exact: true })
  const backup = page.getByRole('button', { name: en.tools.backup, exact: true })
  await expect(backup).toBeEnabled()
  await name.fill('Temporary place')
  await name.clear()
  await expect(page.locator('#trip-drafts')).toHaveCount(0)
  await expect(backup).toBeEnabled()
  await name.fill('Temporary place')
  await address.fill('Other pending field')
  await name.clear()
  let drafts = await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)!), draftKey)
  expect(drafts['personal:name']).toBeUndefined()
  expect(drafts['personal:address'].value).toBe('Other pending field')
  await expect(backup).toBeDisabled()
  await address.clear()
  drafts = await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)!), draftKey)
  expect(Object.keys(drafts)).toHaveLength(0)
  await expect(page.locator('#trip-drafts')).toHaveCount(0)
  await expect(backup).toBeEnabled()
})

test('a 160-character personal place keeps its contextual draft label and value', async ({ page }) => {
  const id = `custom-${'c'.repeat(32)}`
  const name = 'N'.repeat(160)
  await page.goto('/en/my-trip')
  await seed(page, { ...emptyTrip, items: [{ id, day: 1, custom: { name, address: 'Original address' } }] })
  const editor = page.locator(`li[data-place-id="${id}"] .personal-stop`)
  await openDetails(editor)
  await editor.getByLabel(en.tools.personalAddress, { exact: true }).fill('Pending address')
  const draft = await page.evaluate(({ key, field }) => JSON.parse(sessionStorage.getItem(key)!)[field], { key: draftKey, field: `personal:${id}:address` })
  expect(draft.value).toBe('Pending address')
  expect(draft.label.length).toBeLessThanOrEqual(200)
  expect(draft.label).toContain(en.tools.personalAddress)
  await page.reload()
  await openDetails(editor)
  await expect(editor.getByLabel(en.tools.personalAddress, { exact: true })).toHaveValue('Pending address')
})

test('a valid asynchronous edit retains a pending draft until the transaction saves and clears it', async ({ page }) => {
  await page.goto('/en/my-trip')
  await seed(page, shortTrip)
  await page.evaluate((draftKey) => {
    const counts = { writes: 0, events: 0 }
    Object.assign(window, { draftCounts: counts })
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (this === sessionStorage && key === draftKey) counts.writes++
      return write.call(this, key, value)
    }
    window.addEventListener('trip-draft-change', () => counts.events++)
  }, draftKey)
  await page.getByLabel(en.tools.title, { exact: true }).fill('Valid edit')
  await expect(page.getByLabel(en.tools.title, { exact: true })).toHaveValue('Valid edit')
  await readStorage(page, tripKey)
  await expect(page.locator('#trip-drafts')).toHaveCount(0)
  expect(await page.evaluate(() => (window as unknown as { draftCounts: { writes: number; events: number } }).draftCounts)).toEqual({ writes: 2, events: 2 })
  expect((JSON.parse((await readStorage(page, tripKey))!).title)).toBe('Valid edit')
})

test('a no-op draft clear retries pending session persistence after storage recovers', async ({ page }) => {
  await page.goto('/en/my-trip')
  await seed(page, shortTrip)
  await page.evaluate(({ tripKey, draftKey }) => {
    const state = { blocked: true }
    Object.assign(window, { draftStorageState: state })
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (state.blocked && ((this === localStorage && key === tripKey) || (this === sessionStorage && key === draftKey)))
        throw new DOMException('Blocked', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  }, { tripKey, draftKey })
  const title = page.getByLabel(en.tools.title, { exact: true })
  await title.fill('Pending title')
  await expect(title).toHaveValue('Pending title')
  expect(await page.evaluate((key) => sessionStorage.getItem(key), draftKey)).toBeNull()
  await page.evaluate(() => { (window as unknown as { draftStorageState: { blocked: boolean } }).draftStorageState.blocked = false })
  await page.getByLabel(en.tools.base, { exact: true }).fill('Saved base')
  await expect.poll(() => page.evaluate((key) => JSON.parse(sessionStorage.getItem(key) || '{}').title?.value, draftKey)).toBe('Pending title')
  expect((JSON.parse((await readStorage(page, tripKey))!))).toMatchObject({ title: 'Short plan', base: 'Saved base' })
  page.once('dialog', (dialog) => dialog.accept())
  await page.reload()
  await expect(title).toHaveValue('Pending title')
  expect((JSON.parse((await readStorage(page, tripKey))!).title)).toBe('Short plan')
})

test('returning to a day-two draft selects and focuses its field without exposing draft data in the URL', async ({ page }) => {
  await page.goto('/en/my-trip')
  await seed(page, { ...longTrip, items: [{ id: 'gion', day: 1 }, { id: 'sensoji', day: 2 }] })
  await page.evaluate(() => {
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (this === localStorage && key === 'japan-travel-trip-v1') throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  })
  const first = page.locator('textarea[data-trip-field="day:1:notes"]')
  const second = page.locator('textarea[data-trip-field="day:2:notes"]')
  await first.fill('First private draft')
  await second.fill('Second private draft')
  await page.locator('.trip-error-toast').getByRole('button', { name: en.trip.dismiss }).click()
  await page.getByRole('combobox', { name: en.tools.editDay, exact: true }).selectOption('1')
  await page.locator('a[href="/en/first-visit"]:visible').first().click()
  const drafts = page.locator('#trip-drafts')
  await openDetails(drafts)
  const row = drafts.locator('li').filter({ hasText: 'Day 2' })
  await expect(row).toContainText('Day 2')
  await row.getByRole('button', { name: en.tools.returnToField, exact: true }).click()
  await expect(page).toHaveURL(/\/en\/my-trip$/)
  await expect(page.getByRole('combobox', { name: en.tools.editDay, exact: true })).toHaveValue('2')
  await expect(second).toBeVisible()
  await expect(second).toBeFocused()
  await expect(second).toHaveValue('Second private draft')
  const savedDrafts = await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)!), draftKey)
  expect(savedDrafts['day:1:notes'].value).toBe('First private draft')
  expect(savedDrafts['day:2:notes'].value).toBe('Second private draft')
})

for (const [field, label, value] of [
  ['currency', en.tools.fx, 'USD'],
  ['rate', en.tools.fxRate, '0.25'],
  ['date', en.tools.fxDate, '2026-11-01'],
] as const) {
  test(`return to FX ${field} opens its nested panels and focuses the draft`, async ({ page }) => {
    await page.goto('/en/my-trip')
    await seed(page, shortTrip)
    const extras = page.locator('.trip-extras')
    await openDetails(extras)
    const fx = extras.locator('details.budget-panel').filter({ has: page.locator('summary', { hasText: en.tools.fx }) })
    await openDetails(fx)
    const input = page.locator(`[data-trip-field="fx:${field}"]`)
    if (field === 'currency') await input.selectOption(value)
    else await input.fill(value)
    await page.locator('a[href="/en/first-visit"]:visible').first().click()
    const drafts = page.locator('#trip-drafts')
    await openDetails(drafts)
    await drafts.locator('li').filter({ hasText: label }).getByRole('button', { name: en.tools.returnToField, exact: true }).click()
    await expect(page).toHaveURL(/\/en\/my-trip$/)
    await expect(extras).toHaveAttribute('open', '')
    await expect(fx).toHaveAttribute('open', '')
    await expect(input).toBeFocused()
    await expect(input).toHaveValue(value)
  })
}

test('returning to a removed day reports the missing field, keeps its draft and does not focus it later', async ({ page, context }) => {
  await page.goto('/en/my-trip')
  const twoDays: Trip = { ...emptyTrip, days: 2, items: [{ id: 'sensoji', day: 2 }] }
  await seed(page, twoDays)
  await page.evaluate(() => {
    const write = Storage.prototype.setItem
    const state = { blocked: true }
    Object.assign(window, { orphanStorageState: state })
    Storage.prototype.setItem = function (key, value) {
      if (state.blocked && this === localStorage && key === 'japan-travel-trip-v1') throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  })
  await page.locator('textarea[data-trip-field="day:2:notes"]').fill('Keep this orphan draft')
  await page.locator('.trip-error-toast').getByRole('button', { name: en.trip.dismiss }).click()
  await page.evaluate(() => { (window as unknown as { orphanStorageState: { blocked: boolean } }).orphanStorageState.blocked = false })
  const other = await context.newPage()
  await other.goto('/en/my-trip')
  await seed(other, { ...emptyTrip, days: 1, items: [] })
  await expect(page.locator('#trip-day-2')).toHaveCount(0)
  await page.locator('a[href="/en/first-visit"]:visible').first().click()
  const drafts = page.locator('#trip-drafts')
  await openDetails(drafts)
  await drafts.locator('li').filter({ hasText: 'Day 2' }).getByRole('button', { name: en.tools.returnToField, exact: true }).click()
  await expect(page.getByRole('alert').filter({ hasText: en.tools.draftFieldMissing })).toBeVisible()
  expect(await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)!)['day:2:notes'].value, draftKey)).toBe('Keep this orphan draft')
  await seed(other, twoDays)
  const restored = page.locator('textarea[data-trip-field="day:2:notes"]')
  await expect(restored).toHaveValue('Keep this orphan draft')
  await expect(restored).not.toBeFocused()
  await other.close()
})

test('event booking applicability respects inclusive dates, gaps and missing dates', () => {
  const temple = visitDetails.kiyomizu
  const museum = visitDetails['kyoto-museum']
  for (const [date, status] of [
    ['2026-03-26', 'outsidePeriod'], ['2026-03-27', 'inPeriod'],
    ['2026-04-05', 'inPeriod'], ['2026-04-06', 'outsidePeriod'],
    ['2026-08-14', 'inPeriod'], ['2026-08-16', 'inPeriod'],
    ['2026-08-17', 'outsidePeriod'], ['2026-11-21', 'inPeriod'],
    ['2026-11-30', 'inPeriod'], ['2026-12-01', 'outsidePeriod'],
  ] as const) expect(fieldApplicability(temple, 'booking', date)).toBe(status)
  for (const [date, status] of [
    ['2026-10-05', 'outsidePeriod'], ['2026-10-06', 'inPeriod'],
    ['2026-11-29', 'inPeriod'], ['2026-11-30', 'outsidePeriod'],
  ] as const) expect(fieldApplicability(museum, 'booking', date)).toBe(status)
  for (const visit of [temple, museum]) {
    expect(fieldApplicability(visit, 'booking')).toBe('dateNeeded')
    expect(fieldApplicability(visit, 'booking', '2026-02-30')).toBe('dateNeeded')
    expect(fieldApplicability(visit, 'access', '2026-11-21')).toBeUndefined()
  }
})

test('event periods are real ordered non-overlapping dates and official approaches have localized HTTPS links', () => {
  const validDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    Number.isFinite(Date.parse(`${date}T12:00:00Z`)) &&
    new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) === date
  for (const visit of Object.values(visitDetails)) {
    if (visit.approach) {
      expect(new URL(visit.approach.source).protocol).toBe('https:')
      for (const lang of ['en', 'ja', 'th'] as const) {
        expect(visit.approach.label[lang].trim()).toBeTruthy()
        expect(visit.approach.note[lang].trim()).toBeTruthy()
      }
    }
    for (const source of Object.values(visit.fieldSources || {})) {
      if (!source?.applicablePeriods) continue
      let previous = ''
      for (const { from, through } of source.applicablePeriods) {
        expect(validDate(from)).toBe(true)
        expect(validDate(through)).toBe(true)
        expect(from <= through).toBe(true)
        expect(!previous || previous < from).toBe(true)
        previous = through
      }
    }
  }
})

test('official approach links and their scope accompany map directions in the trip and place details', async ({ page }) => {
  await page.goto('/en/my-trip')
  await seed(page, { ...emptyTrip, items: [{ id: 'kiyomizu', day: 1 }, { id: 'kyoto-museum', day: 1 }] })
  for (const id of ['kiyomizu', 'kyoto-museum']) {
    const visit = visitDetails[id]
    const approach = visit.approach!
    const tripDirections = page.locator(`li[data-place-id="${id}"] .trip-directions`)
    const official = tripDirections.getByRole('link', { name: `${approach.label.en} ↗`, exact: true })
    await expect(official).toHaveAttribute('href', approach.source)
    await expect(tripDirections).toContainText(approach.note.en)
    await expect(tripDirections.locator('a[href*="google.com/maps"]')).toBeVisible()

    const place = places.find((item) => item.id === id)!
    await page.goto(placePath(place, 'en'))
    const detail = page.locator(`#place-${id}`)
    await expect(detail.getByRole('link', { name: `${approach.label.en} ↗`, exact: true })).toHaveAttribute('href', approach.source)
    await expect(detail).toContainText(approach.note.en)
    await expect(detail.locator('a[href*="google.com/maps"]').first()).toBeVisible()
    await page.goto('/en/my-trip')
  }
})

for (const [lang, dict] of [['en', en], ['ja', ja], ['th', th]] as const) {
  test(`${lang} trip displays event booking applicability for the actual visit date`, async ({ page }) => {
    await page.goto(`/${lang}/my-trip`)
    const trip: Trip = {
      ...emptyTrip, days: 2, startDate: '2026-11-20',
      items: [{ id: 'kiyomizu', day: 2 }, { id: 'kyoto-museum', day: 1 }],
    }
    await seed(page, trip)
    await openDetails(page.locator('li[data-place-id="kiyomizu"] .trip-booking'))
    await openDetails(page.locator('li[data-place-id="kyoto-museum"] .trip-booking'))
    const temple = page.locator('li[data-place-id="kiyomizu"] [data-applicability]')
    const museum = page.locator('li[data-place-id="kyoto-museum"] [data-applicability]')
    await expect(temple).toHaveAttribute('data-applicability', 'inPeriod')
    await expect(temple).toBeVisible()
    await expect(temple).toContainText(dict.tools.visitDateInPeriod)
    await expect(museum).toHaveAttribute('data-applicability', 'inPeriod')
    await expect(museum).toContainText(dict.tools.visitDateInPeriod)
    await seed(page, { ...trip, startDate: '2026-12-01' })
    await expect(temple).toHaveAttribute('data-applicability', 'outsidePeriod')
    await expect(temple).toContainText(dict.tools.visitDateOutsidePeriod)
    await expect(museum).toHaveAttribute('data-applicability', 'outsidePeriod')
    await seed(page, { ...trip, startDate: undefined })
    await expect(temple).toHaveAttribute('data-applicability', 'dateNeeded')
    await expect(temple).toContainText(dict.tools.visitDateNeeded)
    await expect(museum).toHaveAttribute('data-applicability', 'dateNeeded')
  })
}

for (const failure of ['malformed', 'blocked'] as const) {
  test(`checklist explains ${failure} trip storage and leaves controls disabled`, async ({ page }) => {
    await page.addInitScript(({ key, failure }) => {
      if (failure === 'malformed') localStorage.setItem(key, '{malformed')
      else {
        const read = Storage.prototype.getItem
        Storage.prototype.getItem = function (name) {
          if (this === localStorage && name === key) throw new DOMException('Blocked', 'SecurityError')
          return read.call(this, name)
        }
      }
    }, { key: tripKey, failure })
    await page.goto('/en/first-visit')
    const checklist = page.locator('.readiness-checklist')
    await openDetails(checklist)
    await expect(checklist).toContainText(failure === 'blocked' ? en.trip.error : en.trip.invalid)
    for (const checkbox of await checklist.getByRole('checkbox').all()) await expect(checkbox).toBeDisabled()
    if (failure === 'malformed') expect(await readStorage(page, tripKey)).toBe('{malformed')
  })
}

for (const [lang, dict] of [['en', en], ['ja', ja], ['th', th]] as const) {
  test(`${lang} daily editing shortcut reveals and focuses the first saved visit day`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 })
    await page.goto(`/${lang}/my-trip`)
    await expect(page.getByRole('link', { name: dict.tools.editItinerary, exact: true })).toHaveCount(0)
    await seed(page, { ...emptyTrip, items: [{ id: 'gion', day: 0 }] })
    await page.getByRole('link', { name: dict.tools.editItinerary, exact: true }).click()
    await expect(page.locator('#trip-day-0')).toBeVisible()
    await expect(page.locator('#trip-day-0')).toBeFocused()
    await expect(page.getByRole('combobox', { name: dict.tools.editDay, exact: true })).toHaveValue('0')
    await expect(page.locator('.trip-unplanned-assignment select')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}
