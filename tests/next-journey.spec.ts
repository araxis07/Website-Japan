import fs from 'node:fs/promises'
import type { Download, Page } from '@playwright/test'
import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey, type Trip } from '../src/lib/trip'
import { places } from '../src/data/places'
import { firstVisitSteps } from '../src/data/first-visit'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

const languages = [['en', en], ['ja', ja], ['th', th]] as const
const gion = places.find((place) => place.id === 'gion')!
const kiyomizu = places.find((place) => place.id === 'kiyomizu')!
const stepIds = ['documents', 'airport', 'transport', 'essentials', 'etiquette', 'help']

async function seed(page: Page, trip: Trip) {
  await page.evaluate(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    { key: tripKey, trip },
  )
}

const storedTrip = (page: Page): Promise<Trip> =>
  page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), tripKey)

async function downloadText(download: Download) {
  return fs.readFile((await download.path())!, 'utf8')
}

test('mobile task links and the brand close an open menu after navigation, while Escape returns focus', async ({
  page,
}) => {
  test.setTimeout(60_000)
  await page.setViewportSize({ width: 390, height: 844 })
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/first-visit`)
    const toggle = page.locator('.menu-toggle')
    const menu = page.locator('#mobile-navigation')
    for (const [selector, href] of [
      [`.mobile-task-nav a[href="/${lang}/explore?scope=places&view=list"]`, `/${lang}/explore?scope=places&view=list`],
      ['.site-header .brand', `/${lang}`],
      [`.mobile-task-nav a[href="/${lang}/my-trip"]`, `/${lang}/my-trip`],
      [`.mobile-task-nav a[href="/${lang}/first-visit#help"]`, `/${lang}/first-visit#help`],
    ]) {
      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')
      await expect(menu).toBeVisible()
      await page.locator(selector).click()
      await expect(page).toHaveURL(href)
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await expect(menu).toBeHidden()
    }
    await toggle.click()
    await menu.getByRole('link', { name: copy.beginner.nav, exact: true }).focus()
    await page.keyboard.press('Escape')
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toHaveAccessibleName(copy.navigation.menu)
    await expect(menu).toBeHidden()
  }
})

test('Explore guide actions and the primary result count match the selected scope in every language', async ({
  page,
}) => {
  test.setTimeout(60_000)
  await page.setViewportSize({ width: 390, height: 844 })
  for (const [lang, copy] of languages) {
    for (const scope of ['places', 'prefectures'] as const) {
      const place = scope === 'places'
      await page.goto(
        `/${lang}/explore?scope=${scope}&view=map&q=${place ? 'Gion' : 'Kyoto'}&place=${place ? 'gion' : 'kyoto'}`,
      )
      const label = `${place ? copy.tools.readTopic : copy.explorer.read} ↗`
      const href = place
        ? `/${lang}/destinations/kyoto#place-gion`
        : `/${lang}/prefectures/kyoto`
      const preview = page.locator('.prefecture-preview')
      await expect(preview.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
      const status = page.locator('.explorer-result-status')
      await expect(status).toHaveAttribute('role', 'status')
      await expect(status.locator('strong')).toHaveText(
        place ? `1 ${copy.tools.placeResults}` : `1 / 47 ${copy.explorer.results}`,
      )
      await expect(status.locator('span')).toContainText(
        place ? copy.explorer.results : copy.tools.placeResults,
      )
      await page.locator('.street-map').scrollIntoViewIfNeeded()
      const marker = page.locator('.street-marker')
      await expect(marker).toHaveCount(1)
      await marker.click()
      const sheet = page.locator('.map-sheet')
      await expect(sheet).toBeVisible()
      const guide = sheet.getByRole('link', { name: label, exact: true })
      await expect(guide).toHaveAttribute('href', href)
      await guide.click()
      await expect(page).toHaveURL(href)
      await expect(page.locator('main h1')).toBeVisible()
      if (place) await expect(page.locator('#place-gion')).toBeVisible()
    }
  }
})

test('an unscheduled visit has one visible day selector while scheduled visits retain their editor in every language', async ({
  page,
}) => {
  test.setTimeout(60_000)
  await page.setViewportSize({ width: 320, height: 844 })
  const trip: Trip = {
    ...emptyTrip,
    days: 3,
    items: [
      { id: 'gion', day: 0, time: '10:00', note: 'Keep this note', duration: 60, buffer: 15 },
      { id: 'kiyomizu', day: 1, note: 'Leave this scheduled visit alone' },
    ],
  }
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/my-trip`)
    await seed(page, trip)
    const row = page.locator('.trip-day[aria-labelledby="trip-day-0"] li[data-place-id="gion"]')
    const editor = row.locator('.trip-visit-editor')
    const assign = row.locator('.trip-unplanned-assignment select')
    await row.scrollIntoViewIfNeeded()
    await expect(assign).toBeVisible()
    await expect(assign).toHaveAccessibleName(`${copy.trip.assign}: ${gion.names[lang]}`)
    await expect(editor).not.toHaveAttribute('open')
    const target = await assign.boundingBox()
    expect(target!.height).toBeGreaterThanOrEqual(43.99)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `${lang} unplanned assignment at 320px`,
    ).toBe(true)
    await expect(row.locator('.trip-unplanned-assignment select')).toHaveCount(1)
    await expect(editor.locator('.trip-item-controls select')).toHaveCount(0)
    await openDetails(editor)
    await expect(assign).toHaveCount(1)
    await expect(assign).toBeVisible()
    await editor.locator(':scope > summary').click()

    const scheduled = page.locator('.trip-day[aria-labelledby="trip-day-1"] li[data-place-id="kiyomizu"]')
    const scheduledEditor = scheduled.locator('.trip-visit-editor')
    await expect(scheduled.locator('.trip-unplanned-assignment')).toHaveCount(0)
    await expect(scheduledEditor.locator('.trip-item-controls select')).toHaveCount(1)
    await expect(scheduledEditor.locator('.trip-item-controls select')).toBeHidden()
    await openDetails(scheduledEditor)
    const scheduledAssign = scheduledEditor.locator('.trip-item-controls select')
    await expect(scheduledAssign).toHaveAccessibleName(`${copy.trip.assign}: ${kiyomizu.names[lang]}`)
    await expect(scheduledAssign).toBeVisible()
    await scheduledEditor.locator(':scope > summary').click()

    await assign.focus()
    await assign.selectOption('2')
    await expect(page.locator('#trip-day-2')).toBeFocused()
    await expect.poll(async () => (await storedTrip(page)).items).toEqual([
      { ...trip.items[0], day: 2 }, trip.items[1],
    ])
    await page.locator('.trip-feedback')
      .getByRole('button', { name: copy.tools.undo, exact: true }).click()
    await expect(assign).toBeVisible()
    await expect(assign).toHaveValue('0')
    expect(await storedTrip(page)).toEqual(trip)
  }
})

test('visible assignment preserves the selected repeated visit, rejected drafts and failed-write focus', async ({
  page,
}) => {
  test.setTimeout(60_000)
  page.on('dialog', (dialog) => dialog.accept())
  const trip: Trip = {
    ...emptyTrip,
    days: 3,
    items: [
      { id: 'gion', day: 0, entryId: 'first', note: 'First visit', buffer: 0 },
      { id: 'gion', day: 0, entryId: 'second', time: '14:30', note: 'Second visit', duration: 90, buffer: 20 },
    ],
  }
  await page.goto('/en/my-trip')
  await seed(page, trip)
  const repeats = page.locator('.trip-day[aria-labelledby="trip-day-0"] li[data-place-id="gion"]')
  const second = repeats.nth(1)
  const assign = second.locator('.trip-unplanned-assignment select')
  await second.scrollIntoViewIfNeeded()
  await expect(assign).toBeVisible()
  await expect(assign).toHaveAccessibleName(`${en.trip.assign}: Gion`)
  await page.evaluate(() => {
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (this === localStorage && key === 'japan-travel-trip-v1')
        throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  })
  await assign.focus()
  await assign.selectOption('3')
  await expect(page.locator('.trip-error-toast')).toContainText(en.trip.error)
  await expect(assign).toBeFocused()
  await expect(assign).toHaveValue('0')
  expect(await storedTrip(page)).toEqual(trip)
  await page.reload()
  const editor = second.locator('.trip-visit-editor')
  await openDetails(editor)
  await editor.getByLabel(`${en.tools.buffer}: Gion`, { exact: true }).fill('-1')
  await expect(page.locator('.save-status')).toHaveText(en.tools.pendingDrafts)
  await assign.selectOption('2')
  await expect(page.locator('#trip-day-2')).toBeFocused()
  const moved = page.locator('.trip-day[aria-labelledby="trip-day-2"] li[data-place-id="gion"]')
  await openDetails(moved.locator('.trip-visit-editor'))
  await expect(moved.getByLabel(`${en.tools.buffer}: Gion`, { exact: true })).toHaveValue('-1')
  await expect(moved.getByLabel(`${en.tools.buffer}: Gion`, { exact: true })).toHaveAttribute('aria-invalid', 'true')
  expect((await storedTrip(page)).items).toEqual([trip.items[0], { ...trip.items[1], day: 2 }])
  await page.locator('.trip-file-actions > button').first().click()
  await expect(repeats).toHaveCount(2)
  await openDetails(editor)
  await expect(editor.getByLabel(`${en.tools.buffer}: Gion`, { exact: true })).toHaveValue('-1')
  expect(await storedTrip(page)).toEqual(trip)
  await editor.getByRole('button', { name: en.tools.discardDraft, exact: true }).click()
  await expect(page.locator('.save-status')).toHaveText(en.tools.savedLocal)
  await expect(editor.getByLabel(`${en.tools.buffer}: Gion`, { exact: true })).toHaveValue('20')
  await openDetails(repeats.first().locator('.trip-visit-editor'))
  await expect(repeats.first().getByLabel(`${en.tools.buffer}: Gion`, { exact: true })).toHaveValue('0')
})

test('all six checklist IDs, localized titles and official guide sources retain their meaning', async ({
  page,
}) => {
  test.setTimeout(60_000)
  expect(firstVisitSteps.map((step) => step.id)).toEqual(stepIds)
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/first-visit`)
    await seed(page, emptyTrip)
    const checklist = page.locator('.readiness-checklist')
    await openDetails(checklist)
    await expect(checklist.getByRole('checkbox')).toHaveCount(6)
    await expect(page.locator('.first-visit-steps > .first-step')).toHaveCount(6)
    for (const step of firstVisitSteps) {
      const title = step.copy[lang].title
      await expect(checklist.getByRole('checkbox', { name: title, exact: true })).not.toBeChecked()
      await expect(checklist.getByRole('link', {
        name: `${copy.tools.readTopic}: ${title} ↗`, exact: true,
      })).toHaveAttribute('href', `/${lang}/first-visit#${step.id}`)
      const section = page.locator(`.first-visit-steps > #${step.id}`)
      await expect(section.locator(`:scope > div > #${step.id}-title`)).toHaveText(title)
      await expect(section.getByRole('link', {
        name: `${copy.beginner.source} ↗`, exact: true,
      })).toHaveAttribute('href', step.source)
    }
    const help = firstVisitSteps.find((step) => step.id === 'help')!
    await checklist.getByRole('checkbox', { name: help.copy[lang].title, exact: true }).check()
    await expect.poll(async () => (await storedTrip(page)).preparation).toEqual(['help'])
    await page.reload()
    await openDetails(checklist)
    await expect(checklist.getByRole('checkbox', { name: help.copy[lang].title, exact: true })).toBeChecked()
  }
})

test('the first help download works offline and matches the visible guide in every language', async ({
  page,
  context,
}) => {
  test.setTimeout(60_000)
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/first-visit#help`)
    const section = page.locator('.first-visit-steps > #help')
    const heading = await section.locator('#help-title').innerText()
    const items = await section.locator(':scope > div > ul > li').allTextContents()
    const source = await section.getByRole('link', {
      name: `${copy.beginner.source} ↗`, exact: true,
    }).getAttribute('href')
    await expect(section.locator('.emergency-card button')).toBeVisible()
    await context.setOffline(true)
    const received = page.waitForEvent('download')
    await section.getByRole('button', { name: copy.tools.saveHelp, exact: true }).click()
    const download = await received
    expect(download.suggestedFilename()).toBe(`japan-help-${lang}.txt`)
    expect(await downloadText(download)).toBe(
      `${heading}\n\n${items.join('\n\n')}\n\n${source}\n2026-10-25`,
    )
    await expect(section.locator('a[href="tel:110"]')).toBeVisible()
    await expect(section.locator('a[href="tel:119"]')).toBeVisible()
    await context.setOffline(false)
  }
})
