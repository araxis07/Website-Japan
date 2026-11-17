import { test, expect } from './fixtures'
import { dayLabel, tripPlace, parseTrip, publicTrip } from '../src/lib/trip'
import { tripCalendar } from '../src/lib/trip-calendar'
import { offlineTrip } from '../src/lib/trip-export'
import portable from './fixtures/portable-trip.json'
import { i18n, localeNames } from '../src/i18n/config'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'
import ko from '../src/i18n/dictionaries/ko.json'
import zhCN from '../src/i18n/dictionaries/zh-CN.json'
import vi from '../src/i18n/dictionaries/vi.json'
import fr from '../src/i18n/dictionaries/fr.json'
import es from '../src/i18n/dictionaries/es.json'
const dictionaries = { en, ja, th, ko, 'zh-CN': zhCN, vi, fr, es }
const getDictionary = (locale: keyof typeof dictionaries) => dictionaries[locale]
import * as travel from '../src/data/travel'
import * as journeys from '../src/data/journeys'
import * as arrivals from '../src/data/arrival-guides'
import { prefectures } from '../src/data/prefectures'
import { places } from '../src/data/places'
import { guides } from '../src/data/guides'
import { visitDetails } from '../src/data/visit-details'
import { firstVisitSteps } from '../src/data/first-visit'
import { firstVisitHelp } from '../src/data/first-visit-help'
import { regionalPlanning } from '../src/data/regional-planning'
import { seasonPlanning } from '../src/data/season-planning'
import { editorial } from '../src/data/editorial'
import { travelNotices } from '../src/data/travel-notices'
import plans from '../src/data/prefecture-plans.json'
import photos from '../src/data/prefecture-photos.json'
import entrances from '../src/data/entrance-photos.json'
import { detailPhotos } from '../src/data/photos'

function shape(value: unknown): unknown {
  if (typeof value === 'string') return 'string'
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]))
  return typeof value
}

test('eight-language exports retain Japan dates, repeated visits and their distinct privacy scopes', async () => {
  const trip = parseTrip(JSON.stringify({ ...portable, startDate: '2026-11-17' }))!
  const now = new Date('2026-11-01T00:00:00Z')
  for (const locale of i18n.locales) {
    const copy = getDictionary(locale)
    const calendar = (await tripCalendar(trip, locale, now))!
    const unfolded = calendar.replace(/\r\n /g, '')
    expect(unfolded.match(/\r\nBEGIN:VEVENT/g)).toHaveLength(3)
    expect(unfolded).toContain('DTSTART:20261117T000000Z')
    expect(unfolded).toContain('DTSTART:20261117T030000Z')
    expect(unfolded).toContain('DTSTART;VALUE=DATE:20261118')
    const uids = unfolded.match(/^UID:.+$/gm)!
    expect(new Set(uids).size).toBe(3)
    expect(unfolded).not.toContain('custom-aaaaaaaa')
    expect(unfolded).not.toContain('Private booking')
    expect(unfolded).toContain('My hotel')
    expect(calendar.split('\r\n').every((line) => Buffer.byteLength(line) <= 75)).toBe(true)
    expect((await tripCalendar(trip, locale, now, true))!.replace(/\r\n /g, '')).toContain('Private booking')

    const full = offlineTrip(trip, locale, copy.trip, copy.tools)
    const shared = offlineTrip(publicTrip(trip), locale, copy.trip, copy.tools)
    expect(full).toContain(`<html lang="${locale}">`)
    expect(full).toContain('My hotel')
    expect(shared).not.toContain('My hotel')
    expect(shared).not.toContain('Private booking')
    expect(shared).not.toContain('Kyoto Station')
    expect(shared).toContain(tripPlace(trip.items[0]).names[locale])
    expect(shared).not.toMatch(/<script\b|<iframe\b|<img\b/i)
  }
})

test('KIX operator guidance exposes its own source and review date in all eight languages', async ({ page }) => {
  test.setTimeout(60_000)
  const checks = arrivals.arrivalChecks.filter((check) => [
    'https://www.nankaibus.jp/airport/kanku_02/',
    'https://www.westjr.co.jp/travel-information/en/train-usage-guide/howto/guide/',
  ].includes(check.source))
  expect(checks).toHaveLength(2)
  for (const check of arrivals.arrivalChecks)
    if ('airport' in check)
      expect(arrivals.arrivalGuides.map((airport) => airport.code)).toContain(check.airport)
  for (const locale of i18n.locales) {
    await page.goto(`/${locale}/first-visit`)
    for (const check of checks) {
      const link = page.locator(`.arrival-guides a[href="${check.source}"]`)
      const panel = link.locator('..')
      const airport = panel.locator('..')
      await expect(airport.locator(':scope > summary')).toHaveText('KIX · Kansai')
      if (await airport.getAttribute('open') === null)
        await airport.locator(':scope > summary').click()
      await panel.locator(':scope > summary').click()
      await expect(panel.locator(':scope > p').first()).toHaveText(check[locale].text)
      await expect(link).toBeVisible()
      await expect(panel.locator('time')).toHaveAttribute('datetime', '2026-11-17')
    }
  }
})

test('all dictionaries and public content cover every supported locale', async () => {
  expect(dayLabel(2, 'ko', ko.trip.day)).toBe('2일차')
  expect(dayLabel(2, 'zh-CN', zhCN.trip.day)).toBe('第2天')
  const custom = tripPlace({ id: 'custom:local', day: 1, custom: { name: 'Private user label', address: 'Private address' } })
  for (const locale of i18n.locales) expect(custom.names[locale]).toBe('Private user label')
  const en = await getDictionary('en')
  for (const locale of i18n.locales) {
    const dictionary = await getDictionary(locale)
    expect(shape(dictionary), `${locale} dictionary structure`).toEqual(shape(en))
    const strings = (value: unknown): void => {
      if (typeof value === 'string') expect(value.trim()).not.toBe('')
      else if (value && typeof value === 'object') Object.values(value).forEach(strings)
    }
    strings(dictionary)
    const preserved = (source: unknown, target: unknown, path: string): void => {
      if (typeof source === 'string' && typeof target === 'string') {
        expect(target.match(/\{[a-zA-Z_]+\}/g) || [], path).toEqual(source.match(/\{[a-zA-Z_]+\}/g) || [])
        if (source.startsWith('https://') && !['ja', 'th'].includes(locale)) expect(target, path).toBe(source)
      } else if (source && target && typeof source === 'object' && typeof target === 'object') {
        for (const [key, child] of Object.entries(source)) preserved(child, (target as Record<string, unknown>)[key], `${path}.${key}`)
      }
    }
    preserved(en, dictionary, locale)
  }
  let records = 0
  const check = (value: unknown, path: string): void => {
    if (!value || typeof value !== 'object') return
    const record = value as Record<string, unknown>
    if ('en' in record && 'ja' in record && 'th' in record) {
      records++
      for (const lang of i18n.locales) {
        expect(record[lang], `${path}/${lang}`).toBeDefined()
        expect(shape(record[lang]), `${path}/${lang} structure`).toEqual(shape(record.en))
      }
    }
    for (const [key, child] of Object.entries(record)) check(child, `${path}.${key}`)
  }
  check({ travel, journeys, arrivals, prefectures, places, guides, visitDetails, firstVisitSteps, firstVisitHelp, regionalPlanning, seasonPlanning, editorial, travelNotices, plans, photos, entrances, detailPhotos }, 'content')
  expect(records).toBeGreaterThan(500)
})

for (const lang of ['ko', 'zh-CN', 'vi', 'fr', 'es'] as const) {
  test(`${lang} routes, language switching and narrow layouts work`, async ({ page }) => {
    test.setTimeout(90_000)
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const dict = await getDictionary(lang)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const path of ['', '/explore?scope=places&view=list', '/first-visit', '/my-trip', '/destinations/kyoto', '/prefectures/kyoto', '/about', '/credits']) {
      const response = await page.goto(`/${lang}${path}`)
      expect(response?.status()).toBe(200)
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      await expect(page.locator('main h1')).toBeVisible()
      for (const theme of ['light', 'dark']) {
        await page.evaluate((theme) => document.documentElement.dataset.theme = theme, theme)
        for (const width of [320, 1440]) {
          await page.setViewportSize({ width, height: 900 })
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${lang}${path}/${theme}/${width} overflow`).toBe(true)
        }
      }
      await page.waitForLoadState('networkidle')
    }
    await page.waitForLoadState('networkidle')
    await page.goto(`/${lang}/explore?q=Kyoto&scope=places&view=list`)
    await page.locator('.language-picker summary').click()
    await expect(page.locator('.language-picker a')).toHaveCount(8)
    await page.locator('.language-picker a[lang="en"]').click()
    await expect(page).toHaveURL(/\/en\/explore\?.*q=Kyoto/)
    await page.locator('.language-picker summary').click()
    await page.locator(`.language-picker a[lang="${lang}"]`).click()
    await expect(page).toHaveURL(new RegExp(`/${lang}/explore\\?.*q=Kyoto`))
    await expect(page.locator('.language-picker summary')).toHaveAccessibleName(`${dict.navigation.language}: ${localeNames[lang]}`)
    expect(errors).toEqual([])
  })
}
