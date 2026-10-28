import type { Page } from '@playwright/test'
import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey, type Trip } from '../src/lib/trip'
import en from '../src/i18n/dictionaries/en.json'

async function seedTrip(page: Page, trip: Trip) {
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    { key: tripKey, trip },
  )
}

async function storedTrip(page: Page): Promise<Trip> {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), tripKey)
}

async function rejectTripWrites(page: Page) {
  await page.evaluate(() => {
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (this === localStorage && key === 'japan-travel-trip-v1')
        throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  })
}

for (const rejection of ['invalid', 'failed write'] as const) {
  test(`${rejection} field drafts survive reload, allow unrelated edits and protect newer values`, async ({
    page,
  }) => {
    page.on('dialog', (dialog) => dialog.accept())
    await page.goto('/en/my-trip')
    await seedTrip(page, { ...emptyTrip, title: 'Original', travelers: 2 })
    const budget = page
      .locator('.budget-panel')
      .filter({
        has: page.locator('summary', { hasText: en.tools.budget }),
      })
      .first()
    const field = page.getByLabel(
      rejection === 'invalid' ? en.tools.travelers : en.tools.title,
      { exact: true },
    )
    const pending = rejection === 'invalid' ? '0' : 'Pending title'
    const corrected = rejection === 'invalid' ? '3' : 'Accepted title'
    const newer = rejection === 'invalid' ? 4 : 'Newer title'
    const key = rejection === 'invalid' ? 'travelers' : 'title'
    if (rejection === 'invalid') await openDetails(budget)
    else await rejectTripWrites(page)
    await field.fill(pending)
    await expect(page.locator('.save-status')).toHaveText(
      rejection === 'invalid' ? en.tools.pendingDrafts : en.trip.error,
    )
    await expect(field).toHaveValue(pending)
    await page.reload()
    await expect(page.locator('.save-status')).toHaveText(
      en.tools.pendingDrafts,
    )
    await seedTrip(page, { ...(await storedTrip(page)), base: 'New city base' })
    await page.reload()
    if (rejection === 'invalid') await openDetails(budget)
    await expect(field).toHaveValue(pending)
    await field.fill(corrected)
    await expect(page.locator('.save-status')).toHaveText(en.tools.savedLocal)
    expect(await storedTrip(page)).toMatchObject({
      [key]: rejection === 'invalid' ? 3 : corrected,
      base: 'New city base',
    })

    if (rejection === 'failed write') await rejectTripWrites(page)
    await field.fill(pending)
    await page.reload()
    await seedTrip(page, { ...(await storedTrip(page)), [key]: newer })
    await page.reload()
    if (rejection === 'invalid') await openDetails(budget)
    await expect(field).toHaveValue(pending)
    await field.fill(rejection === 'invalid' ? '5' : 'Stale correction')
    await expect(field.locator('..').getByRole('alert')).toContainText(
      en.tools.conflict,
    )
    expect((await storedTrip(page))[key]).toBe(newer)
    await field
      .locator('..')
      .getByRole('button', { name: en.tools.discardDraft, exact: true })
      .click()
    await expect(field).toHaveValue(String(newer))
  })
}

test('FX drafts persist and block exports until explicitly saved', async ({
  page,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  await seedTrip(page, {
    ...emptyTrip,
    startDate: '2026-11-01',
    items: [{ id: 'gion', day: 1 }],
    fx: { currency: 'THB', rate: 0.25, date: '2026-10-28' },
  })
  const extras = page.locator('.trip-extras')
  const fx = extras.locator('.budget-panel').filter({
    has: page.getByLabel(en.tools.fxRate, { exact: true }),
  })
  await openDetails(extras)
  await openDetails(fx)
  await fx
    .getByRole('combobox', { name: en.tools.fx, exact: true })
    .selectOption('EUR')
  await fx.getByLabel(en.tools.fxRate, { exact: true }).fill('0.006')
  await fx.getByLabel(en.tools.fxDate, { exact: true }).fill('2026-10-29')
  await expect(page.locator('.save-status')).toHaveText(en.tools.pendingDrafts)
  await expect(
    page.getByRole('button', { name: en.tools.backup, exact: true }),
  ).toBeDisabled()
  await expect(
    page.getByRole('button', { name: en.tools.offline, exact: true }),
  ).toBeDisabled()
  await openDetails(page.locator('.trip-library'))
  await expect(
    page.getByRole('button', { name: en.tools.saveCopy, exact: true }),
  ).toBeDisabled()
  const calendar = extras.locator('.budget-panel').filter({
    has: page.locator('summary', { hasText: en.tools.calendar }),
  })
  await openDetails(calendar)
  await expect(
    calendar.getByRole('button', { name: en.tools.calendar, exact: true }),
  ).toBeDisabled()
  expect((await storedTrip(page)).fx).toEqual({
    currency: 'THB',
    rate: 0.25,
    date: '2026-10-28',
  })
  await page.reload()
  await openDetails(extras)
  await openDetails(fx)
  await expect(
    fx.getByRole('combobox', { name: en.tools.fx, exact: true }),
  ).toHaveValue('EUR')
  await expect(fx.getByLabel(en.tools.fxRate, { exact: true })).toHaveValue(
    '0.006',
  )
  await expect(fx.getByLabel(en.tools.fxDate, { exact: true })).toHaveValue(
    '2026-10-29',
  )
  await fx.getByRole('button', { name: en.tools.fxSave, exact: true }).click()
  await expect(page.locator('.save-status')).toHaveText(en.tools.savedLocal)
  expect((await storedTrip(page)).fx).toEqual({
    currency: 'EUR',
    rate: 0.006,
    date: '2026-10-29',
  })
  await expect(
    page.getByRole('button', { name: en.tools.backup, exact: true }),
  ).toBeEnabled()
  await expect(
    page.getByRole('button', { name: en.tools.offline, exact: true }),
  ).toBeEnabled()
  await page.reload()
  await expect(page.locator('.save-status')).toHaveText(en.tools.savedLocal)
})

test('saved FX inputs follow replacement and Undo instead of showing an earlier edit', async ({
  page,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  await seedTrip(page, {
    ...emptyTrip,
    fx: { currency: 'THB', rate: 0.25, date: '2026-10-28' },
  })
  const extras = page.locator('.trip-extras')
  const fx = extras.locator('.budget-panel').filter({
    has: page.getByLabel(en.tools.fxRate, { exact: true }),
  })
  await openDetails(extras)
  await openDetails(fx)
  await fx.getByLabel(en.tools.fxRate, { exact: true }).fill('0.3')
  await fx.getByRole('button', { name: en.tools.fxSave, exact: true }).click()
  await page.locator('#trip-import input').setInputFiles({
    name: 'replacement.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        ...emptyTrip,
        fx: { currency: 'USD', rate: 0.007, date: '2026-10-29' },
      }),
    ),
  })
  await page
    .locator('.trip-tools > .import-preview')
    .getByRole('button', { name: en.tools.replace, exact: true })
    .click()
  await expect(
    fx.getByRole('combobox', { name: en.tools.fx, exact: true }),
  ).toHaveValue('USD')
  await expect(fx.getByLabel(en.tools.fxRate, { exact: true })).toHaveValue(
    '0.007',
  )
  await expect(fx.getByLabel(en.tools.fxDate, { exact: true })).toHaveValue(
    '2026-10-29',
  )
  await page.locator('.trip-file-actions button').first().click()
  await expect(
    fx.getByRole('combobox', { name: en.tools.fx, exact: true }),
  ).toHaveValue('THB')
  await expect(fx.getByLabel(en.tools.fxRate, { exact: true })).toHaveValue(
    '0.3',
  )
  await expect(fx.getByLabel(en.tools.fxDate, { exact: true })).toHaveValue(
    '2026-10-28',
  )
})

test('a pending FX quote cannot overwrite a newer currency and Cancel restores the current quote', async ({
  page,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  await seedTrip(page, {
    ...emptyTrip,
    fx: { currency: 'THB', rate: 0.25, date: '2026-10-28' },
  })
  const extras = page.locator('.trip-extras')
  const fx = extras.locator('.budget-panel').filter({
    has: page.getByLabel(en.tools.fxRate, { exact: true }),
  })
  await openDetails(extras)
  await openDetails(fx)
  await fx.getByLabel(en.tools.fxRate, { exact: true }).fill('0.3')
  await seedTrip(page, {
    ...(await storedTrip(page)),
    fx: { currency: 'USD', rate: 0.007, date: '2026-10-29' },
  })
  await page.reload()
  await openDetails(extras)
  await openDetails(fx)
  await expect(fx.getByRole('alert')).toHaveText(en.tools.conflict)
  await expect(fx.getByLabel(en.tools.fxRate, { exact: true })).toHaveValue(
    '0.3',
  )
  await expect(
    fx.getByRole('button', { name: en.tools.fxSave, exact: true }),
  ).toBeDisabled()
  expect((await storedTrip(page)).fx).toEqual({
    currency: 'USD',
    rate: 0.007,
    date: '2026-10-29',
  })
  await fx.getByRole('button', { name: en.tools.cancel, exact: true }).click()
  await expect(
    fx.getByRole('combobox', { name: en.tools.fx, exact: true }),
  ).toHaveValue('USD')
  await expect(fx.getByLabel(en.tools.fxRate, { exact: true })).toHaveValue(
    '0.007',
  )
  await expect(fx.getByLabel(en.tools.fxDate, { exact: true })).toHaveValue(
    '2026-10-29',
  )
  await expect(page.locator('.save-status')).toHaveText(en.tools.savedLocal)
})

test('a place search with an incompatible category offers a reset without an empty map', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/en/explore?scope=places&view=map&q=Sensoji&type=museum')
  const empty = page.locator('.empty-state')
  await expect(empty).toBeVisible()
  await expect(empty).toContainText(en.destinations.empty)
  await expect(empty).not.toContainText(en.explorer.empty)
  await expect(page.locator('#explore-map')).toHaveCount(0)
  await empty
    .getByRole('button', { name: en.explorer.reset, exact: true })
    .click()
  await expect(empty).toHaveCount(0)
  await expect(page.locator('#explore-map')).toBeVisible()
  await expect(
    page.getByRole('combobox', { name: en.tools.browse, exact: true }),
  ).toHaveValue('places')
  await expect(
    page.getByLabel(en.explorer.search, { exact: true }),
  ).toHaveValue('')
  await openDetails(page.locator('.search-options'))
  await expect(
    page.getByRole('combobox', { name: en.tools.category, exact: true }),
  ).toHaveValue('all')
  expect(errors).toEqual([])
})
