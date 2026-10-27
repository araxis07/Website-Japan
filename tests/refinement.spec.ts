import { test, expect, openDetails } from './fixtures'
import {
  emptyTrip,
  mergeTrips,
  parseTrip,
  publicTrip,
  tripKey,
  tripPlace,
  type Trip,
} from '../src/lib/trip'
import { offlineTrip } from '../src/lib/trip-export'
import en from '../src/i18n/dictionaries/en.json'
import { readDrafts } from '../src/lib/trip-drafts'

const personalId = `custom-${'b'.repeat(32)}`
const personal = {
  name: 'Kyoto hotel',
  address: 'Kyoto Station, Japan',
  coordinates: [34.9858, 135.7588] as [number, number],
}
const trip: Trip = {
  ...emptyTrip,
  days: 3,
  items: [
    {
      id: personalId,
      custom: personal,
      day: 1,
      time: '15:00',
      note: 'Keep my booking',
    },
    { id: personalId, custom: personal, day: 2, entryId: 'return-visit' },
    { id: 'gion', day: 1 },
  ],
  stays: [
    {
      id: 'stay-1',
      name: personal.name,
      address: personal.address,
      placeId: personalId,
      from: 1,
      to: 3,
    },
  ],
}

test('personal pins and linked accommodation validate and stay private in exports', () => {
  expect(
    readDrafts(
      JSON.stringify({
        field: { value: 'draft', label: 'Name', original: 42 },
      }),
    ),
  ).toEqual({})
  expect(parseTrip(JSON.stringify(trip))).toEqual(trip)
  const edited = {
    ...personal,
    name: 'Updated hotel',
    coordinates: [35, 135] as [number, number],
  }
  const current: Trip = {
    ...trip,
    items: [{ ...trip.items[0], custom: edited }],
    stays: [{ ...trip.stays![0], name: edited.name }],
  }
  expect(mergeTrips(current, trip)).toEqual({
    ...current,
    items: [
      current.items[0],
      { ...trip.items[1], custom: edited },
      trip.items[2],
    ],
  })
  expect(tripPlace(trip.items[0]).coordinates).toEqual(personal.coordinates)
  for (const coordinates of [
    [91, 0],
    [0, 181],
    [0],
    ['35', 135],
    [null, 135],
    [35, 135, 0],
  ]) {
    expect(
      parseTrip(
        JSON.stringify({
          ...emptyTrip,
          items: [{ ...trip.items[0], custom: { ...personal, coordinates } }],
        }),
      ),
    ).toBeNull()
  }
  expect(
    parseTrip(JSON.stringify({ ...trip, items: [trip.items[2]] })),
  ).toBeNull()
  expect(
    parseTrip(
      JSON.stringify({
        ...trip,
        stays: [{ ...trip.stays![0], address: 'Wrong address' }],
      }),
    ),
  ).toBeNull()
  expect(
    parseTrip(
      JSON.stringify({
        ...trip,
        items: [
          trip.items[0],
          { ...trip.items[1], custom: { ...personal, coordinates: [0, 0] } },
        ],
      }),
    ),
  ).toBeNull()
  expect(JSON.stringify(publicTrip(trip))).not.toMatch(
    /custom-|Kyoto hotel|coordinates|stays|booking/,
  )
  const html = offlineTrip(
    {
      ...emptyTrip,
      stays: [
        {
          name: 'Hotel',
          address: '<script>private address</script>',
          from: 1,
          to: 2,
        },
      ],
    },
    'en',
    en.trip,
    en.tools,
  )
  expect(html).toContain('&lt;script&gt;private address&lt;/script&gt;')
  expect(html).not.toContain('<script>')
})

test('personal edit drafts survive failed writes and cannot overwrite a changed place after reload', async ({
  page,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    { key: tripKey, trip },
  )
  const editor = page
    .locator(`.trip-day li[data-place-id="${personalId}"] .personal-stop`)
    .first()
  await openDetails(editor)
  await editor
    .getByLabel(en.tools.personalName, { exact: true })
    .fill('My pending edit')
  await page.evaluate(() => {
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (this === localStorage && key === 'japan-travel-trip-v1')
        throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  })
  await editor
    .getByRole('button', { name: en.tools.savePersonal, exact: true })
    .click()
  await expect(
    editor.getByLabel(en.tools.personalName, { exact: true }),
  ).toHaveValue('My pending edit')
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).items[0].custom.name,
      tripKey,
    ),
  ).toBe(personal.name)
  await page.reload()
  await page.evaluate((key) => {
    const latest = JSON.parse(localStorage.getItem(key)!)
    for (const item of latest.items)
      if (item.custom) item.custom.name = 'Edited in another tab'
    latest.stays[0].name = 'Edited in another tab'
    localStorage.setItem(key, JSON.stringify(latest))
    dispatchEvent(new Event('trip-change'))
  }, tripKey)
  await page.reload()
  await openDetails(editor)
  await editor
    .getByRole('button', { name: en.tools.savePersonal, exact: true })
    .click()
  await expect(editor.getByRole('alert')).toHaveText(en.tools.conflict)
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).items[0].custom.name,
      tripKey,
    ),
  ).toBe('Edited in another tab')
  await editor
    .getByRole('button', { name: en.tools.cancel, exact: true })
    .click()
  await editor
    .getByLabel(en.tools.personalName, { exact: true })
    .fill('Accepted correction')
  await editor
    .getByRole('button', { name: en.tools.savePersonal, exact: true })
    .click()
  await expect(page.locator('.save-status')).toHaveText(en.tools.savedLocal)
})

test('personal coordinates can be removed and accommodation links can be changed without losing an address', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    { key: tripKey, trip },
  )
  const editor = page
    .locator(`.trip-day li[data-place-id="${personalId}"] .personal-stop`)
    .first()
  await openDetails(editor)
  await openDetails(editor.locator('.personal-coordinates'))
  await editor.getByLabel(en.tools.latitude, { exact: true }).fill('')
  await editor.getByLabel(en.tools.longitude, { exact: true }).fill('')
  await editor
    .getByRole('button', { name: en.tools.savePersonal, exact: true })
    .click()
  await openDetails(page.locator('.trip-tools .budget-panel').first())
  const row = page.locator('.lodging-row').first()
  await row.getByLabel(en.tools.linkStay).selectOption('')
  await expect(row.getByLabel(en.tools.stayAddress)).toHaveValue(
    personal.address,
  )
  await row.getByLabel(en.tools.stayAddress).fill('Independent hotel address')
  await page.reload()
  const saved = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    tripKey,
  )
  expect(saved.items[0].custom.coordinates).toBeUndefined()
  expect(saved.items[1].custom.coordinates).toBeUndefined()
  expect(saved.stays[0].placeId).toBeUndefined()
  expect(saved.stays[0].address).toBe('Independent hotel address')
  await openDetails(page.locator('.trip-tools .budget-panel').first())
  await row.getByLabel(en.tools.linkStay).selectOption(personalId)
  await expect(row).toContainText(personal.address)
  const gion = page.locator('.trip-day li[data-place-id=gion]')
  await openDetails(gion.locator('.place-extra-actions'))
  await gion.locator('.trip-directions select').selectOption('stay:stay-1')
  await row
    .getByRole('button', { name: en.tools.removeStay, exact: true })
    .click()
  await expect(gion.locator('.trip-directions select')).toHaveValue('device')
  expect(
    new URL(
      (await gion.locator('.trip-directions > a').getAttribute('href'))!,
    ).searchParams.has('origin'),
  ).toBe(false)
})

test('homepage section links reveal content and keyboard appearance controls retain the theme', async ({
  page,
  context,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/en#regions')
  await expect(page.locator('#regions')).toBeVisible()
  await page.locator('a[href="/en/explore"]:visible').first().click()
  await expect(page).toHaveURL('/en/explore')
  const summary = page.locator('.appearance-panel > summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await page
    .getByRole('button', { name: en.atmosphere.dark, exact: true })
    .click()
  const other = await context.newPage()
  await other.goto('/en/explore')
  await expect(other.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.locator('.search-options > summary').click()
  await page
    .getByRole('combobox', { name: 'Region', exact: true })
    .selectOption('kansai')
  await expect(page).toHaveURL(/region=kansai/)
  expect(errors).toEqual([])
  await other.close()
})

test('personal editing updates repeat visits and linked stays without losing visit details', async ({
  page,
}) => {
  await page.addInitScript(
    ({ trip, key }) => {
      if (!localStorage.getItem(key))
        localStorage.setItem(key, JSON.stringify(trip))
    },
    { trip, key: tripKey },
  )
  await page.goto('/en/my-trip')
  const first = page
    .locator(`.trip-day li[data-place-id="${personalId}"]`)
    .first()
  await first.locator('.personal-stop > summary').click()
  await first
    .getByLabel(en.tools.personalName, { exact: true })
    .fill('Corrected hotel')
  await first
    .getByLabel(en.tools.personalAddress, { exact: true })
    .fill('Updated address in Kyoto')
  await first
    .getByRole('button', { name: en.tools.savePersonal, exact: true })
    .click()
  const saved = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    tripKey,
  )
  expect(saved.items[0]).toMatchObject({
    time: '15:00',
    note: 'Keep my booking',
    custom: {
      name: 'Corrected hotel',
      address: 'Updated address in Kyoto',
      coordinates: personal.coordinates,
    },
  })
  expect(saved.items[1].custom).toEqual(saved.items[0].custom)
  expect(saved.stays[0]).toMatchObject({
    name: 'Corrected hotel',
    address: 'Updated address in Kyoto',
    placeId: personalId,
  })
  const gion = page.locator('.trip-day li[data-place-id="gion"]')
  await gion.locator('.place-extra-actions > summary').click()
  await gion.locator('.trip-directions select').selectOption('stay:stay-1')
  const href = await gion.locator('.trip-directions > a').getAttribute('href')
  expect(new URL(href!).searchParams.get('origin')).toBe(
    'Corrected hotel Updated address in Kyoto',
  )
  for (let n = 0; n < 2; n++) {
    const entry = page
      .locator(`.trip-day li[data-place-id="${personalId}"]`)
      .first()
    await entry.locator('.trip-visit-editor > summary').click()
    await entry
      .getByRole('button', {
        name: `${en.trip.remove}: Corrected hotel`,
        exact: true,
      })
      .click()
  }
  const removed = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    tripKey,
  )
  expect(removed.stays[0]).toMatchObject({
    name: 'Corrected hotel',
    address: 'Updated address in Kyoto',
  })
  expect(removed.stays[0].placeId).toBeUndefined()
  await page.reload()
  await expect(page.locator('.trip-day li[data-place-id="gion"]')).toBeVisible()
  await expect(
    page.locator('.trip-day li[data-place-id^=custom-]'),
  ).toHaveCount(0)
})

test('compact search and appearance expose controls on demand and supported starter durations only', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 })
  await page.goto('/th/explore?scope=places&view=list')
  await expect(page.locator('.appearance-panel')).not.toHaveAttribute(
    'open',
    '',
  )
  await expect(page.locator('.search-options')).not.toHaveAttribute('open', '')
  expect(
    await page
      .locator('.place-search-results')
      .evaluate((node) => node.getBoundingClientRect().top),
  ).toBeLessThan(900)
  await page.locator('.search-options > summary').click()
  await expect(page.locator('.search-filter-fields')).toBeVisible()
  await page.locator('.appearance-panel > summary').click()
  await expect(page.locator('.atmosphere-controls')).toBeVisible()
  await page.goto('/en/my-trip')
  await page.locator('.trip-starter > summary').click()
  const days = await page
    .getByRole('combobox', { name: en.tools.planLength, exact: true })
    .locator('option')
    .allTextContents()
  expect(days).toEqual(['1', '2'])
  await expect(
    page.getByRole('link', { name: en.tools.manualStart, exact: false }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: en.tools.importStart, exact: false }),
  ).toHaveAttribute('href', '#trip-import')
})
