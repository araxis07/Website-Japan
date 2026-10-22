import { test, expect } from '@playwright/test'
import { copyFile, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { destinations, regions } from '../src/data/travel'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'

test('production config loads without development dependencies', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'japan-config-'))
  try {
    const configPath = join(directory, 'next.config.mjs')
    await copyFile('next.config.mjs', configPath)
    const { default: config } = await import(pathToFileURL(configPath).href)
    expect(config.images.formats).toEqual(['image/avif', 'image/webp'])
    expect(await config.redirects()).toEqual([
      { source: '/', destination: '/ja', permanent: false },
    ])
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test('both languages render without runtime errors, broken images or overflow', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  for (const lang of ['en', 'ja']) {
    const response = await page.goto(`/${lang}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('.destination-card')).toHaveCount(6)
    await expect(page.locator('.region-row')).toHaveCount(9)
    for (const image of await page.locator('img:visible').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveJSProperty('complete', true)
      await expect
        .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
        .toBeGreaterThan(0)
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
    const missingAnchors = await page.locator('a[href*="#"]').evaluateAll((links) =>
      links.flatMap((link) => {
        const href = new URL((link as HTMLAnchorElement).href)
        return href.pathname === location.pathname &&
          href.hash &&
          !document.getElementById(decodeURIComponent(href.hash.slice(1)))
          ? [href.hash]
          : []
      }),
    )
    expect(missingAnchors).toEqual([])
  }
  expect(errors).toEqual([])
})

test('search and category filters combine, clear and handle no results', async ({ page }) => {
  await page.goto('/en')
  await page.getByRole('button', { name: 'Nature & outdoors', exact: true }).click()
  await expect(page.locator('.destination-card')).toHaveCount(2)
  await page.getByRole('searchbox').fill('  HOKKAIDO  ')
  await expect(page.locator('.destination-card')).toHaveCount(1)
  await expect(page.locator('.destination-card')).toContainText('Hokkaido')
  await page.getByRole('searchbox').fill('no-such-place')
  await expect(page.locator('.empty-state')).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click()
  await expect(page.locator('.destination-card')).toHaveCount(6)
  await page.getByRole('searchbox').fill('京都')
  await expect(page.locator('.destination-card')).toHaveCount(1)
  await page.locator('.destination-card').click()
  await expect(page).toHaveURL(/\/en\/destinations\/kyoto$/)
})

test('season tabs support clicks and keyboard navigation', async ({ page }) => {
  await page.goto('/en')
  const winter = page.getByRole('tab', { name: /Winter/ })
  await winter.click()
  await expect(winter).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel')).toContainText('Find warmth in the quiet.')
  await winter.press('ArrowRight')
  await expect(page.getByRole('tab', { name: /Spring/ })).toBeFocused()
  await expect(page.getByRole('tabpanel')).toContainText('A country coming into bloom.')
  await page.getByRole('tab', { name: /Spring/ }).press('End')
  await expect(winter).toBeFocused()
  await winter.press('Home')
  await expect(page.getByRole('tab', { name: /Spring/ })).toBeFocused()
  await page.getByRole('tab', { name: /Summer/ }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Long days. Island escapes.')
})

test('navigation, language switching and FAQ disclosure work', async ({ page, isMobile }) => {
  await page.goto('/en')
  if (isMobile) {
    const toggle = page.locator('.menu-toggle')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.locator('#mobile-navigation').getByRole('link', { name: 'Explore regions' }).click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await toggle.press('Escape')
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  } else {
    await page.locator('.desktop-navigation').getByRole('link', { name: 'Explore regions' }).click()
  }
  await expect(page).toHaveURL(/#regions$/)
  await page.locator('summary').filter({ hasText: 'When should I visit Japan?' }).click()
  await expect(page.getByText(/Choose by region and the experience/)).toBeVisible()
  await page.getByRole('link', { name: 'Back to top', exact: true }).click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)
  await page.goto('/en/destinations/kyoto')
  await page.getByRole('link', { name: '日本語に切り替え', exact: true }).click()
  await expect(page).toHaveURL('/ja/destinations/kyoto')
  await expect(page.getByRole('heading', { name: '京都', exact: true, level: 1 })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
})

test('every destination route, locale and metadata asset is valid', async ({ request }) => {
  for (const lang of ['en', 'ja'] as const) {
    for (const destination of destinations) {
      const response = await request.get(`/${lang}/destinations/${destination.slug}`)
      expect(response.status()).toBe(200)
      expect(await response.text()).toContain(destination[lang].name)
    }
    expect((await request.get(`/${lang}/credits`)).status()).toBe(200)
  }
  expect((await request.get('/')).url()).toMatch(/\/ja$/)
  for (const route of ['/fr', '/ja/not-real', '/en/destinations/not-real', '/missing/path']) {
    const response = await request.get(route)
    expect(response.status()).toBe(404)
    expect(await response.text()).toContain('noindex')
  }
  for (const asset of [
    '/icon.svg',
    '/favicon.ico',
    '/manifest.webmanifest',
    '/robots.txt',
    '/sitemap.xml',
  ]) {
    expect((await request.get(asset)).status()).toBe(200)
  }
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).not.toContain('/resources/')
  expect(sitemap).not.toContain('japantravel-guide.com')
})

test('content and navigation stay readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/en')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.destination-card')).toHaveCount(6)
  await page.locator('.destination-card').first().click()
  await expect(page.getByRole('heading', { level: 1, name: 'Kyoto', exact: true })).toBeVisible()
  await context.close()
})

test('translations have matching keys and content identifiers stay unique', () => {
  function keys(value: unknown, prefix = ''): string[] {
    if (!value || typeof value !== 'object') return [prefix]
    return Object.entries(value)
      .flatMap(([key, item]) => keys(item, `${prefix}.${key}`))
      .sort()
  }
  expect(keys(en)).toEqual(keys(ja))
  expect(new Set(destinations.map((item) => item.slug)).size).toBe(destinations.length)
  expect(new Set(regions.map((item) => item.id)).size).toBe(9)
})
