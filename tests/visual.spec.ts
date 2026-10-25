import { test, expect } from './fixtures'
import { emptyTrip, tripKey } from '../src/lib/trip'

for (const theme of ['light', 'dark'])
  test(`trip tools visual layout in ${theme}`, async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: 'reduce',
      colorScheme: theme as 'light' | 'dark',
    })
    await page.addInitScript(
      ({ key, trip, theme }) => {
        localStorage.setItem(key, JSON.stringify(trip))
        localStorage.setItem('japan-travel-appearance', theme)
      },
      {
        key: tripKey,
        theme,
        trip: {
          ...emptyTrip,
          title: 'Kyoto in autumn',
          base: 'Kyoto Station',
          startDate: '2026-11-02',
          travelers: 2,
          budget: { stay: 60000, food: 18000 },
          items: [{ id: 'gion', day: 1 }],
        },
      },
    )
    await page.goto('/en/my-trip')
    await expect(
      page.getByRole('textbox', { name: 'Trip name', exact: true }),
    ).toHaveValue('Kyoto in autumn')
    await page
      .locator('.budget-panel')
      .filter({ hasText: 'Your estimated budget (JPY)' })
      .locator('summary')
      .click()
    await page.addStyleTag({
      content: '.site-header, .skip-link { visibility: hidden !important; }',
    })
    await expect(page.locator('.trip-tools')).toHaveScreenshot(
      `trip-tools-${theme}.png`,
      {
        animations: 'disabled',
        maxDiffPixelRatio: 0.005,
      },
    )
  })

test('all-place search, mobile sheet and suggested-plan preview work', async ({
  page,
  isMobile,
}) => {
  await page.goto('/en/explore?q=Gion')
  await expect(page.locator('.place-search-results li')).toHaveCount(1)
  await expect(page.locator('.place-search-results a').first()).toHaveAttribute(
    'href',
    '/en/destinations/kyoto#place-gion',
  )
  await page
    .getByRole('combobox', { name: 'Browse', exact: true })
    .selectOption('places')
  await page.locator('.street-map').scrollIntoViewIfNeeded()
  await page
    .locator('.street-map')
    .getByRole('button', { name: '1. Gion', exact: true })
    .click()
  if (isMobile) {
    await expect(page.locator('.map-sheet')).toBeVisible()
    await page.locator('.map-sheet').getByRole('button').click()
    await expect(page.locator('.map-sheet')).not.toBeVisible()
    await expect(
      page
        .locator('.street-map')
        .getByRole('button', { name: '1. Gion', exact: true }),
    ).toBeFocused()
  }
  await page.goto('/en/prefectures/kyoto')
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await page.locator('.apply-plan > button').click()
  await page
    .getByRole('combobox', { name: 'Start on day', exact: true })
    .selectOption('3')
  await expect(page.locator('.apply-plan .import-preview')).toContainText('3')
  await page
    .locator('.apply-plan')
    .getByRole('button', { name: 'Add this plan', exact: true })
    .click()
  const saved = JSON.parse(
    (await page.evaluate((key) => localStorage.getItem(key), tripKey))!,
  )
  expect(
    saved.items.find((item: { id: string }) => item.id === 'kiyomizu').day,
  ).toBe(3)
  expect(
    saved.items.find((item: { id: string }) => item.id === 'kyoto-museum').day,
  ).toBe(4)
})

test('navigation and prefecture covers reflow at 320px in every language', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 })
  for (const lang of ['en', 'ja', 'th']) {
    for (const path of ['my-trip', 'prefectures/kyoto']) {
      await page.goto(`/${lang}/${path}`)
      // Exercise wider fallback fonts and enlarged brand text as well as native metrics.
      await page.locator('.site-header .brand strong').evaluate((element) => {
        element.style.fontSize = '24px'
      })
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${lang}/${path}`,
      ).toBe(true)
      const menu = page.locator('.menu-toggle')
      await menu.focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('#mobile-navigation')).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(menu).toBeFocused()
    }
  }
})
