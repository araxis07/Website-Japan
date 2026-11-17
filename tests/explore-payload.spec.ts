import { test, expect } from './fixtures'
import { normalizeSearch, placeSearchText } from '../src/data/place-search'
import { places } from '../src/data/places'
import { prefectures } from '../src/data/prefectures'
import { visitFor } from '../src/data/visit-details'
import en from '../src/i18n/dictionaries/en.json'

for (const lang of ['en', 'zh-CN'] as const)
  test(`${lang} catalog loads guides on selection without speculative prefecture downloads`, async ({ page }) => {
    const prefetches: string[] = []
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('request', (request) => {
      const url = new URL(request.url())
      if (url.pathname.startsWith(`/${lang}/prefectures/`) && request.headers()['next-router-prefetch'] === '1')
        prefetches.push(url.pathname)
    })
    await page.goto(`/${lang}/explore?scope=places&view=list`)
    await expect(page.locator('.place-search-results li').first()).toBeVisible()
    await page.waitForLoadState('networkidle')
    expect(prefetches).toEqual([])

    await page.locator('.explorer-filters input[type=search]').fill('Kyoto')
    await page.locator('.explorer-toolbar select').selectOption('prefectures')
    await expect.poll(() => new URL(page.url()).searchParams.get('scope')).toBe('prefectures')
    await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('Kyoto')
    const link = page.locator('.prefecture-card a').first()
    await expect(link).toHaveAttribute('href', `/${lang}/prefectures/kyoto`)
    await page.waitForLoadState('networkidle')
    expect(prefetches).toEqual([])
    const response = page.waitForResponse((response) =>
      new URL(response.url()).pathname === `/${lang}/prefectures/kyoto` && response.status() === 200,
    )
    await link.click()
    await response
    await expect(page).toHaveURL(new RegExp(`/${lang}/prefectures/kyoto$`))
    await expect(page.locator('main h1')).toHaveText(prefectures.find((prefecture) => prefecture.slug === 'kyoto')!.names[lang])
    expect(errors).toEqual([])
  })

for (const field of ['hours', 'booking', 'accessibility'] as const) {
  test(`Explore preserves ${field} filtering with server-projected topic availability`, async ({ page }) => {
    const matches = places.filter((place) => {
      if (place.id.startsWith('destination:')) return false
      const visit = visitFor(place)
      return visit?.[field] || visit?.notApplicable?.[field]
    })
    await page.goto(`/en/explore?scope=places&view=list&info=${field}`)
    await expect(page.locator('.explorer-result-status strong')).toHaveText(
      `${matches.length} ${en.tools.placeResults}`,
    )
    await expect(page.locator('.place-search-results li')).toHaveCount(
      Math.min(12, matches.length),
    )
  })
}

test('Explore keeps district-specific not-applicable notes in topic results', async ({ page }) => {
  expect(visitFor({ id: 'gion' })?.notApplicable?.hours).toBeTruthy()
  await page.goto('/en/explore?scope=places&view=list&info=hours&q=Gion')
  await expect(page.locator('.place-search-results a[href$="#place-gion"]')).toBeVisible()
})

test('multilingual search does not join Tokyo names into Kyoto', async ({ page }) => {
  const tokyo = places.find((place) => place.id === 'tokyo-museum')!
  expect(normalizeSearch(placeSearchText(tokyo))).not.toContain('kyoto')
  await page.goto('/en/explore?scope=prefectures&view=list&q=Kyoto')
  await expect(page.locator('.prefecture-card h3')).toHaveText(['Kyoto'])
  await page.goto('/en/explore?scope=places&view=list&q=Tokyo')
  await expect(page.locator('.place-search-results a[href$="#place-tokyo-museum"]')).toBeVisible()
})

for (const lang of ['fr', 'es'])
  test(`${lang} result counts wrap with wider system fonts`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(`/${lang}/explore?scope=places&view=list`)
    await page.addStyleTag({ content: 'body { font-family: Verdana, monospace !important; }' })
    await expect(page.locator('.explorer-result-status')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })

test('operator approach cautions remain available in every language', () => {
  const museum = visitFor({ id: 'tokyo-museum' })!.approach!
  expect(museum.source).toBe('https://www.tnm.jp/modules/r_free_page/index.php?id=128')
  for (const note of Object.values(museum.note)) {
    expect(note).toContain('500')
    expect(note).toContain('600')
  }
  const gravel = { en: 'gravel', ja: '砂利', th: 'กรวด', ko: '자갈', 'zh-CN': '砂石', vi: 'sỏi', fr: 'gravier', es: 'grava' }
  const temple = visitFor({ id: 'kiyomizu' })!.approach!
  for (const [lang, word] of Object.entries(gravel))
    expect(temple.note[lang as keyof typeof gravel]).toContain(word)
})
