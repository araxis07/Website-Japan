import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey, conflictPairs } from '../src/lib/trip'
import { tripCalendar } from '../src/lib/trip-calendar'
import { parseLibrary } from '../src/components/TripExtras'
import { readDrafts } from '../src/lib/trip-drafts'

test('overview stays zoomed out after selecting a prefecture', async ({
  page,
}) => {
  await page.goto('/en/explore?place=kyoto')
  const map = page.locator('.street-map')
  await map.scrollIntoViewIfNeeded()
  await expect(map).toHaveAttribute('data-overview', 'false')
  await page
    .getByRole('button', { name: 'Show all results', exact: true })
    .click()
  await expect(map).toHaveAttribute('data-overview', 'true')
  await expect(page.locator('.prefecture-preview h2')).toHaveText('Kyoto')
  await page.getByRole('button', { name: 'Zoom out', exact: true }).click()
  await expect(map).toHaveAttribute('data-overview', 'true')
})
test('invalid drafts keep a stable accessible name and survive navigation and reload', async ({
  page,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  await page
    .locator('.budget-panel')
    .filter({ hasText: 'Your estimated budget (JPY)' })
    .locator('summary')
    .click()
  const field = page.getByRole('spinbutton', { name: 'Travelers', exact: true })
  await field.fill('0')
  await expect(field).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('.save-status')).toContainText(
    'Some fields are not saved',
  )
  await page.locator('.site-header .brand').click()
  await page.goto('/en/my-trip')
  await page
    .locator('.budget-panel')
    .filter({ hasText: 'Your estimated budget (JPY)' })
    .locator('summary')
    .click()
  await expect(field).toHaveValue('0')
  await page.reload()
  await page
    .locator('.budget-panel')
    .filter({ hasText: 'Your estimated budget (JPY)' })
    .locator('summary')
    .click()
  await expect(field).toHaveValue('0')
  await field.fill('2')
  await expect(page.locator('.save-status')).toHaveText('Saved on this device')
  expect(
    JSON.parse(
      (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
    ).travelers,
  ).toBe(2)
})
test('undo reverts an entire focused edit and corrupt data can be downloaded before reset', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  const title = page.getByRole('textbox', { name: 'Trip name', exact: true })
  await title.pressSequentially('Kyoto autumn')
  await page
    .locator('.trip-file-actions')
    .getByRole('button', { name: 'Undo: Trip name', exact: true })
    .click()
  await expect(title).toHaveValue('')
  await page.evaluate((key) => {
    localStorage.setItem(key, '{"broken":')
    dispatchEvent(new Event('trip-change'))
  }, tripKey)
  const download = page.waitForEvent('download')
  await page
    .getByRole('button', { name: 'Download original stored data' })
    .click()
  const stream = await (await download).createReadStream()
  const chunks: Buffer[] = []
  for await (const chunk of stream!) chunks.push(chunk)
  expect(Buffer.concat(chunks).toString()).toBe('{"broken":')
  expect(await page.evaluate((key) => localStorage.getItem(key), tripKey)).toBe(
    '{"broken":',
  )
})
test('calendar uses Japan time, escapes injection and folds multilingual lines; archives validate all copies', async () => {
  const trip = {
    ...emptyTrip,
    startDate: '2026-11-02',
    items: [
      {
        id: 'gion',
        day: 1,
        time: '09:00',
        duration: 90,
        note: '京都'.repeat(50) + '\rEND:VEVENT',
      },
      { id: 'kiyomizu', day: 0 },
    ],
  }
  const calendar = (await tripCalendar(
    trip,
    'ja',
    new Date('2026-10-25T00:00:00Z'),
    true,
  ))!
  expect(calendar).toContain('DTSTART:20261102T000000Z')
  expect(calendar).toContain('DTEND:20261102T013000Z')
  expect(calendar.match(/\r\nBEGIN:VEVENT/g)).toHaveLength(1)
  expect(calendar.replace(/\r\n /g, '')).toContain('\\nEND:VEVENT')
  expect(
    calendar.split('\r\n').every((line) => Buffer.byteLength(line) <= 75),
  ).toBe(true)
  expect(await tripCalendar(emptyTrip, 'en')).toBeNull()
  expect(
    await tripCalendar(
      {
        ...trip,
        startDate: '9999-12-31',
        items: [{ id: 'gion', day: 2, time: '09:00' }],
      },
      'en',
    ),
  ).toBeNull()
  expect(
    await tripCalendar(
      {
        ...trip,
        startDate: '0000-01-01',
        items: [{ id: 'gion', day: 1, time: '01:00' }],
      },
      'en',
    ),
  ).toBeNull()
  expect(parseLibrary(JSON.stringify([{ id: 'a', trip }]))).toHaveLength(1)
  expect(
    parseLibrary(
      JSON.stringify([
        { id: 'a', trip },
        { id: 'a', trip },
      ]),
    ),
  ).toBeNull()
  expect(
    parseLibrary(JSON.stringify([{ id: 'a', trip: { ...trip, days: 0 } }])),
  ).toBeNull()
  expect(readDrafts('{"__proto__":{"value":"bad","label":"bad"}}')).toEqual({})
  expect(
    conflictPairs([
      { id: 'gion', day: 1, time: '09:00', duration: 60, buffer: 30 },
      { id: 'kiyomizu', day: 1, time: '10:15' },
    ]),
  ).toHaveLength(1)
})
test('shrinking a plan previews affected visits and keeps orphaned notes', async ({
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
        items: [{ id: 'gion', day: 5 }],
        notes: { 5: 'Return details' },
      },
    },
  )
  await page.locator('.planner-toolbar select').selectOption('2')
  await expect(page.locator('.import-preview')).toContainText('Gion')
  expect(
    JSON.parse(
      (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
    ).days,
  ).toBe(7)
  await page
    .getByRole('button', { name: 'Apply day count: 2', exact: true })
    .click()
  await expect(page.locator('#trip-day-0').locator('..')).toContainText('Gion')
  await expect(page.locator('#trip-day-5').locator('..')).toContainText(
    'Return details',
  )
})

test('reviewed-information filters, spelling suggestions and map return retain context', async ({
  page,
}) => {
  await page.goto('/en/explore?view=list')
  await openDetails(page.locator('.search-options'))
  for (const select of await page.locator('.explorer-filters select').all())
    expect((await select.boundingBox())!.height).toBeGreaterThanOrEqual(44)
  await page
    .getByRole('combobox', { name: 'Published visitor information' })
    .selectOption('accessibility')
  await expect(page).toHaveURL(/info=accessibility/)
  await page.getByRole('button', { name: 'Next page', exact: true }).click()
  await expect(page.locator('.place-search-results')).toContainText('Makishi')
  await expect(page.locator('.place-search-results')).not.toContainText('Gion')
  await page.getByRole('searchbox').fill('Gionn')
  await expect(page.locator('.empty-state')).toContainText('Gion')
  await page
    .locator('.empty-state')
    .getByRole('button', { name: 'Gion', exact: true })
    .click()
  const show = page
    .locator('.place-search-results')
    .getByRole('button', { name: 'Show on map' })
  await show.click()
  await expect(page.locator('#explore-map')).toBeFocused()
  await expect(page.locator('.prefecture-preview')).toContainText(
    'Keihan Gion-Shijo',
  )
  await page.getByRole('button', { name: 'Return to results' }).click()
  await expect(show).toBeFocused()
})

test('backup fingerprints persist, local copies restore with undo, and FX is explicit', async ({
  page,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  const title = page.getByRole('textbox', { name: 'Trip name', exact: true })
  await title.fill('First trip')
  const download = page.waitForEvent('download')
  await page
    .getByRole('button', { name: 'Download backup', exact: true })
    .click()
  await download
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('japan-trip-backup')))
    .not.toBeNull()
  await page.reload()
  await expect(
    page.getByText('Changed since the last full backup request.', {
      exact: false,
    }),
  ).toHaveCount(0)
  await page.locator('.trip-extras > summary').click()
  await page.locator('.trip-library summary').click()
  await page
    .getByRole('button', { name: 'Save a trip copy', exact: true })
    .click()
  await title.fill('Second trip')
  await expect(
    page.getByText('Changed since the last full backup request.', {
      exact: false,
    }),
  ).toBeVisible()
  await page.locator('.trip-library li').getByRole('button').first().click()
  await expect(title).toHaveValue('First trip')
  await page.locator('.trip-file-actions button').first().click()
  await expect(title).toHaveValue('Second trip')
  await page
    .locator('.budget-panel')
    .filter({ hasText: 'Your estimated budget (JPY)' })
    .locator('summary')
    .click()
  await page.getByRole('spinbutton', { name: 'Food', exact: true }).fill('1000')
  await page
    .locator('.budget-panel')
    .filter({ hasText: 'Your rate per 1 JPY' })
    .last()
    .locator('summary')
    .click()
  await page
    .getByRole('spinbutton', { name: 'Your rate per 1 JPY' })
    .fill('0.25')
  await page
    .locator('.budget-panel')
    .filter({ hasText: 'Your rate per 1 JPY' })
    .last()
    .locator('input[type=date]')
    .fill('2026-10-25')
  await expect(
    page
      .locator('.budget-panel')
      .filter({ hasText: 'Your rate per 1 JPY' })
      .last()
      .getByRole('status'),
  ).toContainText('250.00')
})

test('saved FX settings survive reload without treating an empty budget category as zero', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await page.locator('.trip-extras > summary').click()
  const panel = page
    .locator('.budget-panel')
    .filter({ hasText: 'Your rate per 1 JPY' })
    .last()
  await panel.locator('summary').click()
  await panel.getByRole('spinbutton').fill('0.25')
  await panel.locator('input[type=date]').fill('2026-10-26')
  await panel
    .getByRole('button', { name: 'Save this rate with the trip', exact: true })
    .click()
  await page.reload()
  await page.locator('.trip-extras > summary').click()
  await panel.locator('summary').click()
  await expect(panel.getByRole('spinbutton')).toHaveValue('0.25')
  await expect(panel.locator('input[type=date]')).toHaveValue('2026-10-26')
  await page
    .locator('.budget-panel')
    .filter({ hasText: 'Your estimated budget (JPY)' })
    .locator('summary')
    .click()
  await page.getByRole('spinbutton', { name: 'Food', exact: true }).fill('0')
  await expect(page.locator('.budget-incomplete')).not.toContainText('Food')
  await expect(page.locator('.budget-incomplete')).toContainText('Transport')
})
