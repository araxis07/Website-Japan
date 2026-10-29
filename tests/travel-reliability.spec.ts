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

test('a stale accommodation Remove cannot delete a reordered stay from another tab; Undo restores a current removal', async ({
  page,
  context,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  const initial: Trip = {
    ...emptyTrip,
    stays: [
      {
        id: 'tokyo',
        name: 'Tokyo hotel',
        address: 'Tokyo Station',
        from: 1,
        to: 3,
      },
      {
        id: 'kyoto',
        name: 'Kyoto hotel',
        address: 'Kyoto Station',
        from: 3,
        to: 5,
      },
    ],
  }
  await seedTrip(page, initial)
  const panel = page.locator('.trip-tools > .budget-panel').first()
  await openDetails(panel)
  await expect(
    panel
      .locator('.lodging-row')
      .first()
      .getByLabel(en.tools.hotel, { exact: true }),
  ).toHaveValue('Tokyo hotel')
  const other = await context.newPage()
  await other.goto('/en/about')
  const latest: Trip = { ...initial, stays: [...initial.stays!].reverse() }
  await panel
    .locator('.lodging-row')
    .first()
    .getByRole('button', { name: en.tools.removeStay, exact: true })
    .evaluate(
      (button, { key, latest }) => {
        // Keep the rendered row stale until the handler reads the latest shared storage.
        localStorage.setItem(key, JSON.stringify(latest))
        ;(button as HTMLButtonElement).click()
      },
      { key: tripKey, latest },
    )
  await expect(page.locator('.trip-error-toast')).toContainText(
    en.tools.conflict,
  )
  expect(await storedTrip(page)).toEqual(latest)
  expect(await storedTrip(other)).toEqual(latest)
  await other.close()
  await page.reload()
  await openDetails(panel)
  const kyoto = panel
    .locator('.lodging-row')
    .filter({
      has: page.getByRole('textbox', { name: en.tools.hotel, exact: true }),
    })
    .first()
  await expect(kyoto.getByLabel(en.tools.hotel, { exact: true })).toHaveValue(
    'Kyoto hotel',
  )
  await kyoto
    .getByRole('button', { name: en.tools.removeStay, exact: true })
    .click()
  expect((await storedTrip(page)).stays).toEqual([initial.stays![0]])
  await page.locator('.trip-file-actions button').first().click()
  expect(await storedTrip(page)).toEqual(latest)
})

test('hotel-change day offers checkout and tonight origins, excludes missing addresses and falls back after removal', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  const trip: Trip = {
    ...emptyTrip,
    days: 4,
    items: [
      { id: 'gion', day: 3 },
      { id: 'kiyomizu', day: 4 },
    ],
    stays: [
      {
        id: 'old',
        name: 'Old hotel',
        address: 'Tokyo Station',
        from: 1,
        to: 3,
      },
      {
        id: 'new',
        name: 'New hotel',
        address: 'Kyoto Station',
        from: 3,
        to: 5,
      },
      { id: 'empty', name: 'No address', from: 1, to: 5 },
    ],
  }
  await seedTrip(page, trip)
  const changingDay = page.locator(
    '.trip-day[aria-labelledby="trip-day-3"] .trip-directions',
  )
  await openDetails(changingDay.locator('details'))
  const origin = changingDay.getByRole('combobox')
  await expect(
    origin.getByRole('option', {
      name: `${en.tools.originCheckout}: Old hotel`,
      exact: true,
    }),
  ).toHaveAttribute('value', 'stay:old')
  await expect(
    origin.getByRole('option', {
      name: `${en.tools.originStay}: New hotel`,
      exact: true,
    }),
  ).toHaveAttribute('value', 'stay:new')
  await expect(origin.locator('option[value="stay:empty"]')).toHaveCount(0)
  await origin.selectOption('stay:old')
  let route = new URL(
    (await changingDay.locator(':scope > a').getAttribute('href'))!,
  )
  expect(route.searchParams.get('origin')).toBe('Old hotel Tokyo Station')
  await origin.selectOption('stay:new')
  route = new URL(
    (await changingDay.locator(':scope > a').getAttribute('href'))!,
  )
  expect(route.searchParams.get('origin')).toBe('New hotel Kyoto Station')
  const nextDay = page.locator(
    '.trip-day[aria-labelledby="trip-day-4"] .trip-directions',
  )
  await openDetails(nextDay.locator('details'))
  await expect(nextDay.locator('option[value="stay:old"]')).toHaveCount(0)
  await expect(nextDay.locator('option[value="stay:new"]')).toHaveText(
    `${en.tools.originStay}: New hotel`,
  )
  await seedTrip(page, {
    ...trip,
    stays: trip.stays!.filter((stay) => stay.id !== 'new'),
  })
  await expect(origin).toHaveValue('device')
  route = new URL(
    (await changingDay.locator(':scope > a').getAttribute('href'))!,
  )
  expect(route.searchParams.has('origin')).toBe(false)
})

for (const view of ['all', 'filtered'] as const) {
  test(`day assignment follows the visit in ${view} view and a failed write keeps focus and metadata`, async ({
    page,
  }) => {
    await page.goto('/en/my-trip')
    const trip: Trip = {
      ...emptyTrip,
      days: 3,
      items: [
        {
          id: 'gion',
          day: 1,
          entryId: 'first',
          note: 'Leave this visit alone',
        },
        {
          id: 'gion',
          day: 1,
          entryId: 'second',
          time: '14:30',
          note: 'Keep reservation',
          duration: 90,
          buffer: 20,
        },
      ],
    }
    await seedTrip(page, trip)
    const filter = page.locator('.planner-view select')
    if (view === 'filtered') await filter.selectOption('1')
    const row = page
      .locator(
        '.trip-day[aria-labelledby="trip-day-1"] li[data-place-id="gion"]',
      )
      .nth(1)
    await openDetails(row.locator('.trip-visit-editor'))
    await row
      .getByRole('combobox', { name: `${en.trip.assign}: Gion`, exact: true })
      .focus()
    await row
      .getByRole('combobox', { name: `${en.trip.assign}: Gion`, exact: true })
      .selectOption('3')
    await expect(page.locator('#trip-day-3')).toBeFocused()
    await expect(page.locator('#trip-day-3')).toBeVisible()
    await expect(filter).toHaveValue(view === 'all' ? 'all' : '3')
    await expect(page.locator('.trip-feedback')).toContainText('Gion')
    await expect(page.locator('.trip-feedback')).toContainText(
      `${en.trip.day} 3`,
    )
    const moved: Trip = {
      ...trip,
      items: [trip.items[0], { ...trip.items[1], day: 3 }],
    }
    expect(await storedTrip(page)).toEqual(moved)

    const movedRow = page.locator(
      '.trip-day[aria-labelledby="trip-day-3"] li[data-place-id="gion"]',
    )
    await openDetails(movedRow.locator('.trip-visit-editor'))
    const assign = movedRow.getByRole('combobox', {
      name: `${en.trip.assign}: Gion`,
      exact: true,
    })
    await page.evaluate(() => {
      const write = Storage.prototype.setItem
      Storage.prototype.setItem = function (key, value) {
        if (this === localStorage && key === 'japan-travel-trip-v1')
          throw new DOMException('Full', 'QuotaExceededError')
        return write.call(this, key, value)
      }
    })
    await assign.focus()
    await assign.selectOption('0')
    await expect(page.locator('.trip-error-toast')).toContainText(en.trip.error)
    await expect(assign).toBeFocused()
    await expect(assign).toHaveValue('3')
    await expect(filter).toHaveValue(view === 'all' ? 'all' : '3')
    expect(await storedTrip(page)).toEqual(moved)
    await page.reload()
    if (view === 'filtered') await filter.selectOption('3')
    await openDetails(movedRow.locator('.trip-visit-editor'))
    await assign.focus()
    await assign.selectOption('0')
    await expect(page.locator('#trip-day-0')).toBeFocused()
    await expect(filter).toHaveValue(view === 'all' ? 'all' : '0')
    expect((await storedTrip(page)).items).toEqual([
      trip.items[0],
      { ...trip.items[1], day: 0 },
    ])
    await page.locator('.trip-file-actions button').first().click()
    expect(await storedTrip(page)).toEqual(moved)
  })
}

test('mobile map details expose entrance evidence before directions and keep unknown access distinct from overdue evidence', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.clock.setFixedTime(new Date('2026-10-29T03:00:00Z'))
  await page.goto('/en/destinations/osaka')
  await page.locator('.street-map').scrollIntoViewIfNeeded()
  await page
    .locator('.street-map')
    .getByRole('button', { name: /^\d+\. Dotonbori$/ })
    .click()
  const sheet = page.locator('.map-sheet')
  await expect(sheet).toBeVisible()
  const details = sheet.locator(':scope > .visit-details')
  await expect(details).toContainText(
    `${en.tools.entrance} / ${en.tools.accessibility}`,
  )
  expect(
    await details.evaluate((element) =>
      Boolean(
        element.compareDocumentPosition(
          element.parentElement!.querySelector('a.button')!,
        ) & Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ),
  ).toBe(true)
  await expect(sheet.locator(':scope > p').nth(1)).not.toBeEmpty()
  await openDetails(details)
  const entrance = details
    .locator('.visit-facts > div')
    .filter({ has: page.getByText(en.tools.entrance, { exact: true }) })
  const accessibility = details
    .locator('.visit-facts > div')
    .filter({ has: page.getByText(en.tools.accessibility, { exact: true }) })
  await expect(entrance).toHaveAttribute('data-review-status', 'reviewed')
  await expect(entrance).toContainText('Ebisubashi')
  await expect(entrance.locator('.field-source a')).toHaveAttribute(
    'href',
    'https://tonbori.jp/osanpo/',
  )
  const reviewed = await entrance.locator('time').getAttribute('dateTime')
  await expect(accessibility).toHaveAttribute(
    'data-review-status',
    'unverified',
  )
  await expect(accessibility).toContainText(en.tools.verify)
  await expect(accessibility.locator('.field-source')).toHaveCount(0)
  await page.clock.setFixedTime(new Date('2027-05-01T03:00:00Z'))
  await page.reload()
  await page.locator('.street-map').scrollIntoViewIfNeeded()
  await page
    .locator('.street-map')
    .getByRole('button', { name: /^\d+\. Dotonbori$/ })
    .click()
  await openDetails(details)
  await expect(entrance).toHaveAttribute('data-review-status', 'overdue')
  await expect(entrance).toContainText(en.tools.reviewDue)
  await expect(entrance.locator('time')).toHaveAttribute('dateTime', reviewed!)
  await expect(accessibility).toHaveAttribute(
    'data-review-status',
    'unverified',
  )
})
