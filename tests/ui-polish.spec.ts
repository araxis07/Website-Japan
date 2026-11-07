import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey } from '../src/lib/trip'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

for (const [lang, dict] of [
  ['en', en],
  ['ja', ja],
  ['th', th],
] as const) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${lang} utility layouts preserve action spacing and mobile help in ${theme}`, async ({
      page,
    }) => {
      // Cover three pages at four widths, including browser startup.
      test.setTimeout(60_000)
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: theme })
      await page.addInitScript(
        (theme) => localStorage.setItem('japan-travel-appearance', theme),
        theme,
      )
      await page.setViewportSize({ width: 320, height: 1000 })
      await page.goto(`/${lang}/my-trip`)
      await page.evaluate(
        async ({ key, trip }) => {
          await window.seedTestStorage(key, JSON.stringify(trip))
          dispatchEvent(new Event('trip-change'))
        },
        {
          key: tripKey,
          trip: {
            ...emptyTrip,
            title: dict.trip.title.repeat(4).slice(0, 160),
            items: [
              { id: 'gion', day: 1, note: dict.tools.privacy },
              { id: 'kiyomizu', day: 1 },
            ],
          },
        },
      )
      await expect(page.locator('.trip-day li[data-place-id]')).toHaveCount(2)
      for (const editor of await page.locator('.trip-visit-editor').all())
        await openDetails(editor)
      await expect(page.locator('.trip-text-action')).toHaveText([
        dict.tools.repeat,
        dict.trip.remove,
        dict.tools.repeat,
        dict.trip.remove,
      ])
      await expect(page.locator('.trip-reorder-action')).toHaveCount(4)
      await expect(page.locator('.trip-reorder-action').first()).toBeDisabled()
      await expect(page.locator('.trip-reorder-action').last()).toBeDisabled()

      for (const path of [
        'my-trip',
        'explore?scope=places&view=list',
        'destinations/kyoto',
      ]) {
        if (path !== 'my-trip') await page.goto(`/${lang}/${path}`)
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
        for (const width of [320, 390, 768, 1440]) {
          await test.step(`${path} at ${width}px`, async () => {
            await page.setViewportSize({ width, height: 1000 })
            const sample = `${lang}/${theme}/${path}/${width}`
            if (path === 'my-trip') {
              const action = page.locator('.trip-text-action').first()
              await action.focus()
              await expect(action).toBeFocused()
              const metrics = await page
                .locator('.planner-page')
                .evaluate((planner, privacy) => {
                  const textActions = [
                    ...planner.querySelectorAll<HTMLButtonElement>(
                      '.trip-text-action',
                    ),
                  ].map((button) => {
                    const style = getComputedStyle(button)
                    return {
                      left: parseFloat(style.paddingLeft),
                      right: parseFloat(style.paddingRight),
                      height: button.getBoundingClientRect().height,
                      clipped: button.scrollWidth > button.clientWidth,
                    }
                  })
                  const arrows = [
                    ...planner.querySelectorAll('.trip-reorder-action'),
                  ].map((button) => {
                    const bounds = button.getBoundingClientRect()
                    return { width: bounds.width, height: bounds.height }
                  })
                  const fileActions =
                    planner.querySelector('.trip-file-actions')!
                  const note = [
                    ...planner.querySelectorAll('.trip-tools > .source-note'),
                  ].find((note) => note.textContent?.trim() === privacy)!
                  return {
                    textActions,
                    arrows,
                    privacyGap:
                      note.getBoundingClientRect().top -
                      fileActions.getBoundingClientRect().bottom,
                  }
                }, dict.tools.privacy)
              for (const target of metrics.textActions) {
                expect(
                  target.left,
                  `${sample} text action left padding`,
                ).toBeGreaterThanOrEqual(12)
                expect(
                  target.right,
                  `${sample} text action right padding`,
                ).toBeGreaterThanOrEqual(12)
                expect(
                  Number(target.height.toFixed(3)),
                  `${sample} text action target`,
                ).toBeGreaterThanOrEqual(44)
                expect(target.clipped, `${sample} text action clipping`).toBe(
                  false,
                )
              }
              for (const target of metrics.arrows) {
                expect(
                  Number(target.width.toFixed(3)),
                  `${sample} arrow width`,
                ).toBeGreaterThanOrEqual(44)
                expect(
                  Number(target.height.toFixed(3)),
                  `${sample} arrow height`,
                ).toBeGreaterThanOrEqual(44)
              }
              expect(
                Number(metrics.privacyGap.toFixed(3)),
                `${sample} privacy gap`,
              ).toBeGreaterThanOrEqual(8)
            }
            if (width <= 768) {
              const help = page.locator(
                `.mobile-task-nav a[href="/${lang}/first-visit#help"]`,
              )
              await expect(help).toBeVisible()
              await expect(help).toHaveAccessibleName(dict.tools.emergency)
            }
            expect(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
              ),
              `${sample} horizontal overflow`,
            ).toBe(true)
          })
        }
      }
    })
  }
}
