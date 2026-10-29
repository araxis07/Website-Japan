import { test, expect, openDetails } from './fixtures'
import axe from 'axe-core'
import { emptyTrip, tripKey } from '../src/lib/trip'
for (const theme of ['light', 'dark']) {
  test(`WCAG checks for beginner tasks in ${theme}`, async ({ page }, info) => {
    // Budget covers browser startup and five complete axe audits.
    test.setTimeout(60_000)
    await page.emulateMedia({
      reducedMotion: 'reduce',
      colorScheme: theme as 'light' | 'dark',
    })
    await page.addInitScript(
      (theme) => localStorage.setItem('japan-travel-appearance', theme),
      theme,
    )
    for (const path of [
      '/th/my-trip',
      '/en/explore?view=list&scope=places',
      '/ja/first-visit',
      '/en/destinations/kyoto',
      '/th/about',
    ]) {
      await page.goto(path)
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await openDetails(page.locator('.appearance-panel'))
      if (path.includes('explore'))
        await openDetails(page.locator('.search-options'))
      if (path.includes('first-visit'))
        await page.locator('.readiness-checklist > summary').click()
      if (path.includes('my-trip')) {
        await page.evaluate(
          ({ key, trip }) => {
            localStorage.setItem(key, JSON.stringify(trip))
            dispatchEvent(new Event('trip-change'))
          },
          {
            key: tripKey,
            trip: {
              ...emptyTrip,
              items: [
                { id: 'gion', day: 1 },
                {
                  id: `custom-${'c'.repeat(32)}`,
                  day: 1,
                  custom: {
                    name: 'Hotel',
                    address: 'Kyoto Station',
                    coordinates: [34.9858, 135.7588],
                  },
                },
              ],
              stays: [
                {
                  id: 'stay-a11y',
                  name: 'Hotel',
                  address: 'Kyoto Station',
                  placeId: `custom-${'c'.repeat(32)}`,
                  from: 1,
                  to: 2,
                },
              ],
            },
          },
        )
        await page.locator('.trip-overview > summary').click()
        await page.locator('.trip-on-the-go > summary').click()
        await page.locator('.trip-extras > summary').click()
        await page.locator('.trip-library > summary').click()
        await page.locator('.trip-library > button').first().click()
        for (const panel of await page
          .locator('.personal-stop, .personal-coordinates, .trip-visit-editor')
          .all())
          await openDetails(panel)
        await openDetails(page.locator('.trip-tools .budget-panel').first())
        await page.locator('.trip-tools > .export-preview > summary').click()
        await page
          .locator('.trip-on-the-go .trip-directions summary')
          .first()
          .click()
      }
      if (path.includes('destinations'))
        for (const summary of await page
          .locator('.map-place-list .visit-details > summary')
          .all())
          await summary.click()
      await page.evaluate(axe.source)
      const result = await page.evaluate(async () => {
        const engine = (window as typeof window & { axe: typeof axe }).axe
        const report = await engine.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
        })
        return report.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        }))
      })
      await info.attach(`${theme}-${path.split('/')[1]}`, {
        body: JSON.stringify(result, null, 2),
        contentType: 'application/json',
      })
      expect.soft(result, path).toEqual([])
    }
  })
}
