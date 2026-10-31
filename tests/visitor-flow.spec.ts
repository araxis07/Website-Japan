import type { Page } from '@playwright/test'
import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey, type Trip } from '../src/lib/trip'
import { places } from '../src/data/places'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

const gion = places.find((place) => place.id === 'gion')!
const castle = places.find((place) => place.id === 'pref:aomori:hirosaki-castle')!
const kyoto = places.find((place) => place.id === 'destination:kyoto')!

const storedTrip = (page: Page) =>
  page.evaluate((key) => JSON.parse(localStorage.getItem(key)!) as Trip, tripKey)

for (const [lang, copy] of [
  ['en', en],
  ['ja', ja],
  ['th', th],
] as const) {
  test(`${lang}: a first saved place leads to scheduling, and Undo retains the unscheduled visit`, async ({
    page,
  }) => {
    await page.goto(`/${lang}/destinations/kyoto#place-gion`)
    const schedule = page.getByRole('link', {
      name: `${copy.trip.schedule}: ${gion.names[lang]}`,
      exact: true,
    })
    await expect(schedule).toHaveCount(0)
    await page
      .getByRole('button', {
        name: `${copy.trip.save}: ${gion.names[lang]}`,
        exact: true,
      })
      .click()
    await expect.poll(async () => (await storedTrip(page)).items).toEqual([
      { id: 'gion', day: 0 },
    ])
    await expect(schedule).toHaveAttribute('href', `/${lang}/my-trip#trip-day-0`)
    await expect(
      page.getByRole('button', {
        name: `${copy.trip.remove}: ${gion.names[lang]}`,
        exact: true,
      }),
    ).toHaveAttribute('aria-pressed', 'true')
    await schedule.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(`/${lang}/my-trip#trip-day-0`)
    const unscheduled = page.locator('.trip-day').filter({
      has: page.locator('#trip-day-0'),
    })
    await expect(unscheduled.locator('li[data-place-id="gion"]')).toBeVisible()
    await expect(unscheduled.locator('.trip-visit-editor')).not.toHaveAttribute('open')
    await expect(unscheduled.getByRole('combobox', {
      name: `${copy.trip.assign}: ${gion.names[lang]}`,
      exact: true,
    })).toBeVisible()
    await unscheduled
      .getByRole('combobox', {
        name: `${copy.trip.assign}: ${gion.names[lang]}`,
        exact: true,
      })
      .selectOption('2')
    await expect(page.locator('#trip-day-2')).toBeFocused()
    await expect.poll(async () => (await storedTrip(page)).items).toEqual([
      { id: 'gion', day: 2 },
    ])
    await expect(
      page
        .locator('.trip-day')
        .filter({ has: page.locator('#trip-day-2') })
        .locator('li[data-place-id="gion"]'),
    ).toBeVisible()
    await page
      .locator('.trip-feedback')
      .getByRole('button', { name: copy.tools.undo, exact: true })
      .click()
    await expect.poll(async () => (await storedTrip(page)).items).toEqual([
      { id: 'gion', day: 0 },
    ])
    await expect(unscheduled.locator('li[data-place-id="gion"]')).toBeVisible()
    await page.reload()
    await expect(unscheduled.locator('li[data-place-id="gion"]')).toBeVisible()
  })

  test(`${lang}: travel-day names open canonical guides while a personal stop remains plain text`, async ({
    page,
  }) => {
    const trip: Trip = {
      ...emptyTrip,
      days: 2,
      items: [
        { id: 'gion', day: 1 },
        { id: castle.id, day: 1 },
        { id: 'destination:kyoto', day: 1 },
        {
          id: `custom-${'a'.repeat(32)}`,
          day: 1,
          custom: { name: 'Example private hotel', address: 'Example address' },
        },
      ],
    }
    await page.addInitScript(
      ({ key, trip }) => localStorage.setItem(key, JSON.stringify(trip)),
      { key: tripKey, trip },
    )
    await page.goto(`/${lang}/my-trip#travel-day`)
    const travel = page.locator('.trip-on-the-go')
    await expect(travel).toHaveAttribute('open', '')
    const guide = travel.getByRole('link', {
      name: gion.names[lang],
      exact: true,
    })
    await expect(guide).toHaveAttribute(
      'href',
      `/${lang}/destinations/kyoto#place-gion`,
    )
    await expect(
      travel.getByRole('link', { name: castle.names[lang], exact: true }),
    ).toHaveAttribute(
      'href',
      `/${lang}/prefectures/aomori#place-pref:aomori:hirosaki-castle`,
    )
    const center = travel.getByRole('link', {
      name: kyoto.names[lang],
      exact: true,
    })
    await expect(center).toHaveAttribute(
      'href',
      `/${lang}/destinations/kyoto#place-destination:kyoto`,
    )
    const personal = travel.locator('ol > li').filter({
      has: page.locator('strong', { hasText: 'Example private hotel' }),
    })
    await expect(personal.locator('strong')).toHaveText(
      '— · Example private hotel',
    )
    await expect(personal.locator('strong a')).toHaveCount(0)
    await expect(
      travel.getByRole('link', { name: 'Example private hotel', exact: true }),
    ).toHaveCount(0)
    const directions = personal.locator('.trip-directions > a')
    const destination = new URL((await directions.getAttribute('href'))!)
    expect(destination.origin).toBe('https://www.google.com')
    expect(destination.searchParams.get('destination')).toContain(
      'Example address',
    )
    expect(await storedTrip(page)).toEqual(trip)
    await guide.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(`/${lang}/destinations/kyoto#place-gion`)
    await expect(page.locator('#place-gion')).toBeVisible()
    expect(await storedTrip(page)).toEqual(trip)
    await page.goBack()
    await expect(travel).toHaveAttribute('open', '')
    await center.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(
      `/${lang}/destinations/kyoto#place-destination:kyoto`,
    )
    const centerTarget = page.locator('[id="place-destination:kyoto"]')
    await expect(centerTarget).toBeVisible()
    await expect(centerTarget).toBeInViewport()
    expect(await storedTrip(page)).toEqual(trip)
  })

  test(`${lang}: one empty-trip introduction preserves starter, import, list discovery and personal-stop paths`, async ({
    page,
  }) => {
    await page.goto(`/${lang}/my-trip`)
    const intro = page.locator('.trip-empty-intro')
    await expect(intro).toHaveCount(1)
    await expect(
      page.getByRole('heading', { name: copy.trip.empty, exact: true }),
    ).toHaveCount(1)
    await expect(page.locator('.planner-page .empty-state')).toHaveCount(0)
    const discovery = page
      .locator('.trip-task-links a, .planner-explore')
      .filter({ hasText: copy.trip.explore })
    await expect(discovery).toHaveCount(2)
    for (const link of await discovery.all())
      await expect(link).toHaveAttribute(
        'href',
        `/${lang}/explore?scope=places&view=list`,
      )

    const starter = intro.locator('.trip-starter')
    await openDetails(starter)
    await starter
      .getByRole('button', { name: copy.tools.apply, exact: true })
      .click()
    const preview = starter.locator('.import-preview')
    await expect(preview).toBeVisible()
    await expect(preview.locator('li').first()).toBeVisible()
    await preview
      .getByRole('button', { name: copy.tools.cancel, exact: true })
      .click()
    expect(await page.evaluate((key) => localStorage.getItem(key), tripKey)).toBeNull()

    const choices = intro.locator('.trip-empty-choices')
    await choices
      .getByRole('link', { name: `${copy.tools.manualStart} ↗`, exact: true })
      .click()
    await expect(page).toHaveURL(`/${lang}/explore?scope=places&view=list`)
    await expect(page.locator('.place-search-results li').first()).toBeVisible()
    await page.goBack()
    await expect(intro).toBeVisible()
    const importLink = choices.getByRole('link', {
      name: `${copy.tools.importStart} ↓`,
      exact: true,
    })
    await expect(importLink).toHaveAttribute('href', '#trip-import')
    await importLink.click()
    await expect(page.locator('#trip-import input[type=file]')).toBeInViewport()

    const personal = page.locator('.personal-stop')
    await openDetails(personal)
    await personal
      .getByLabel(copy.tools.personalName, { exact: true })
      .fill('Example hotel')
    await personal
      .getByLabel(copy.tools.personalAddress, { exact: true })
      .fill('Example address')
    await personal
      .getByRole('button', { name: copy.tools.addPersonal, exact: true })
      .click()
    await expect(intro).toHaveCount(0)
    await expect.poll(async () => (await storedTrip(page)).items).toEqual([
      {
        id: expect.stringMatching(/^custom-/),
        day: 0,
        custom: { name: 'Example hotel', address: 'Example address' },
      },
    ])
    await expect(discovery).toHaveCount(2)
    for (const link of await discovery.all())
      await expect(link).toHaveAttribute(
        'href',
        `/${lang}/explore?scope=places&view=list`,
      )
  })
}
