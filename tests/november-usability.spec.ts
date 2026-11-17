import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey } from '../src/lib/trip'
import fr from '../src/i18n/dictionaries/fr.json'
import es from '../src/i18n/dictionaries/es.json'
import th from '../src/i18n/dictionaries/th.json'

const trip = {
  ...emptyTrip,
  days: 3,
  travelers: 2,
  budget: { food: 20000, transport: 12000 },
  items: [{ id: 'gion', day: 1 }, { id: 'kiyomizu', day: 2 }],
}

for (const [lang, dict] of [['fr', fr], ['es', es], ['th', th]] as const) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${lang} import actions and map recovery retain spacing and usable targets in ${theme}`, async ({ page }) => {
      test.setTimeout(60_000)
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: theme })
      await page.addInitScript((theme) => localStorage.setItem('japan-travel-appearance', theme), theme)
      await page.goto(`/${lang}/my-trip`)
      await page.evaluate(async ({ key, trip }) => {
        await window.seedTestStorage(key, JSON.stringify(trip))
        dispatchEvent(new Event('trip-change'))
      }, { key: tripKey, trip })

      for (const width of [320, 390, 1440]) {
        await test.step(`${width}px`, async () => {
          if (width !== 320) await page.goto(`/${lang}/my-trip`)
          await page.setViewportSize({ width, height: 1000 })
          await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
          const checkbox = page.locator('.export-privacy input')
          const checkboxBounds = await checkbox.boundingBox()
          expect(checkboxBounds!.width).toBeGreaterThanOrEqual(24)
          await checkbox.check()
          await expect(page.getByRole('button', { name: dict.tools.shareDownload, exact: true })).toBeVisible()
          await checkbox.uncheck()

          const travelers = page.locator('[data-trip-field="travelers"]')
          const budget = page.locator('.trip-tools > .budget-panel').filter({ has: travelers })
          await openDetails(budget)
          await expect(travelers).toHaveValue('2')
          for (const field of await budget.locator('input').all()) {
            const bounds = await field.boundingBox()
            expect(bounds!.height).toBeGreaterThanOrEqual(44)
            expect(bounds!.x).toBeGreaterThanOrEqual(0)
            expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width)
          }

          const input = page.locator('#trip-import input[type=file]')
          await input.focus()
          await input.setInputFiles({
            name: 'trip.json', mimeType: 'application/json',
            buffer: Buffer.from(JSON.stringify({ ...trip, title: dict.trip.title })),
          })
          const preview = page.locator('.trip-tools > .import-preview')
          await expect(preview).toBeVisible()
          const actions = preview.locator(':scope > button')
          await expect(actions).toHaveText([dict.tools.merge, dict.tools.replace, dict.tools.cancel])
          await page.keyboard.press('Tab')
          await actions.first().focus()
          await expect(actions.first()).toBeFocused()
          const metrics = await preview.evaluate((element) => {
            const panel = element.getBoundingClientRect()
            return [...element.querySelectorAll<HTMLButtonElement>(':scope > button')].map((button) => {
              const box = button.getBoundingClientRect()
              const style = getComputedStyle(button)
              const outline = parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset)
              return {
                left: box.left, right: box.right, top: box.top, bottom: box.bottom,
                height: box.height, clipped: button.scrollWidth > button.clientWidth,
                outlineVisible: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0,
                outlineInside: box.left - outline >= panel.left && box.right + outline <= panel.right,
              }
            })
          })
          for (const action of metrics) {
            expect(action.height).toBeGreaterThanOrEqual(44)
            expect(action.clipped).toBe(false)
          }
          expect(metrics[0].outlineVisible).toBe(true)
          expect(metrics[0].outlineInside).toBe(true)
          for (let index = 1; index < metrics.length; index++) {
            const a = metrics[index - 1], b = metrics[index]
            expect(Math.max(b.left - a.right, a.left - b.right, b.top - a.bottom, a.top - b.bottom)).toBeGreaterThanOrEqual(7.9)
          }
          expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1)

          await page.goto(`/${lang}/explore?scope=places&view=map&q=Gion`)
          const mapPreview = page.locator('.prefecture-preview')
          const back = mapPreview.getByRole('button', { name: dict.tools.returnResults, exact: true })
          await expect(back).toBeVisible()
          await back.focus()
          await expect(back).toBeFocused()
          const bounds = await back.boundingBox()
          expect(bounds!.height).toBeGreaterThanOrEqual(44)
          expect(bounds!.x).toBeGreaterThanOrEqual(0)
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width)
          await page.keyboard.press('Enter')
          await expect(page.locator('#search-results-heading')).toBeFocused()
          await expect(mapPreview).toBeHidden()
          expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1)
        })
      }
    })
  }
}
