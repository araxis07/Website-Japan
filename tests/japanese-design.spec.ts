import axe from 'axe-core'
import { test, expect, openDetails } from './fixtures'

for (const theme of ['light', 'dark'] as const) {
  for (const lang of ['en', 'ja', 'th']) {
    test(`Japanese identity is accessible in ${lang} ${theme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' })
      await page.goto(`/${lang}`)
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await expect(page.locator('.hero-image img')).toHaveAttribute('loading', 'eager')
      await expect(page.locator('.diorama')).toHaveAttribute('data-scene-status', 'preview')
      await expect(page.locator('.diorama canvas')).toHaveCount(0)
      await expect(page.locator('.scene-fallback img')).toHaveAttribute('loading', 'lazy')
      await expect(page.locator('.site-header .brand')).toHaveAccessibleName(/\S/)
      await expect(page.locator('.site-header .brand-mark')).toHaveAttribute('aria-hidden', 'true')
      await openDetails(page.locator('.appearance-panel'))
      await page.evaluate(axe.source)
      const violations = await page.evaluate(async () => {
        const engine = (window as typeof window & { axe: typeof axe }).axe
        const result = await engine.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
        })
        return result.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
        }))
      })
      expect(violations).toEqual([])
    })
  }
}

test('cultural chapters retain localized destinations and visible anchor targets', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const lang of ['en', 'ja', 'th']) {
    await page.goto(`/${lang}`)
    await page.locator('.hero-chapters a[href="#culture"]').click()
    const heading = await page.locator('#culture-title').boundingBox()
    const header = await page.locator('.site-header').boundingBox()
    expect(heading!.y).toBeGreaterThanOrEqual(header!.height)
    const stories = page.locator('.culture-story')
    await expect(stories).toHaveCount(3)
    const destinations = [
      '/prefectures/nara#places',
      '/prefectures/ishikawa#places',
      '/destinations/okinawa#places',
    ]
    for (const [index, path] of destinations.entries()) {
      await expect(stories.nth(index)).toHaveAttribute('href', `/${lang}${path}`)
      await expect(stories.nth(index)).toHaveAccessibleName(/\S/)
    }
    await stories.first().click()
    await expect(page).toHaveURL(new RegExp(`/${lang}/prefectures/nara#places$`))
    await expect(page.locator('#places')).toBeVisible()
  }
})

test('new photographic surfaces honor motion preferences and retain their links', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/en')
  const photo = page.locator('.hero-photograph')
  if (isMobile) {
    await photo.tap()
    expect(await photo.evaluate((element) => element.style.getPropertyValue('--tilt-y'))).toBe('')
  } else {
    await photo.hover()
    await expect.poll(() => photo.evaluate((element) => element.style.getPropertyValue('--tilt-y'))).not.toBe('')
  }
  await openDetails(page.locator('.appearance-panel'))
  await page.getByRole('button', { name: 'Pause effects', exact: true }).click()
  for (const surface of [photo, page.locator('.culture-story').first()])
    await expect(surface).toHaveCSS('transform', 'none')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(photo).toHaveCSS('transform', 'none')
  await expect(page.locator('.hero-photograph a')).toHaveAttribute('href', '/en/destinations/kyoto')
})
