import axe from 'axe-core'
import { test, expect } from './fixtures'
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

for (const lang of i18n.locales) {
  test(`${lang} navigation remains reachable in narrow and zoom-equivalent layouts`, async ({ page }) => {
    test.setTimeout(60_000)
    const dict = dictionaries[lang]
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(`/${lang}/my-trip`)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)

    // 720×450 CSS pixels reproduces reflow of a 1440×900 viewport at 200% zoom.
    // This does not emulate physical browser magnification or OS text scaling.
    for (const viewport of [
      { width: 320, height: 568 },
      { width: 720, height: 450 },
      { width: 568, height: 320 },
    ]) {
      await test.step(`${viewport.width}×${viewport.height}`, async () => {
        await page.setViewportSize(viewport)
        await page.evaluate(() => scrollTo(0, 0))
        const toggle = page.locator('.menu-toggle')
        const menu = page.locator('#mobile-navigation')
        const language = page.locator('.language-picker > summary')
        await expect(toggle).toHaveAccessibleName(dict.navigation.menu)
        await expect(language).toHaveAccessibleName(`${dict.navigation.language}: ${localeNames[lang]}`)

        for (const control of [toggle, language]) {
          const bounds = await control.boundingBox()
          expect(bounds).not.toBeNull()
          expect(Number(bounds!.width.toFixed(3))).toBeGreaterThanOrEqual(44)
          expect(Number(bounds!.height.toFixed(3))).toBeGreaterThanOrEqual(44)
        }
        await toggle.focus()
        await page.keyboard.press('Enter')
        await expect(toggle).toHaveAttribute('aria-expanded', 'true')
        await expect(menu).toBeVisible()
        const help = menu.getByRole('link', { name: dict.tools.emergency, exact: true })
        await help.focus()
        await expect(help).toBeFocused()
        const helpBounds = await help.boundingBox()
        expect(helpBounds!.y, 'focused menu item must remain within the viewport').toBeGreaterThanOrEqual(0)
        expect(helpBounds!.y + helpBounds!.height).toBeLessThanOrEqual(viewport.height + 1)
        await page.keyboard.press('Escape')
        await expect(menu).toBeHidden()
        await expect(toggle).toBeFocused()
        const focus = await toggle.evaluate((element) => {
          const style = getComputedStyle(element)
          return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) }
        })
        expect(focus.style).not.toBe('none')
        expect(focus.width).toBeGreaterThan(0)

        await language.focus()
        await page.keyboard.press('Enter')
        await expect(page.locator('.language-picker')).toHaveAttribute('open', '')
        const options = page.locator('.language-picker a')
        await expect(options).toHaveCount(i18n.locales.length)
        for (const option of await options.all()) {
          const bounds = await option.boundingBox()
          expect(Number(bounds!.height.toFixed(3)), 'each language needs a 44px touch target').toBeGreaterThanOrEqual(44)
          await expect(option).toHaveAccessibleName(/\S/)
        }
        const lastLanguage = options.last()
        await lastLanguage.focus()
        await expect(lastLanguage).toBeFocused()
        const optionBounds = await lastLanguage.boundingBox()
        expect(optionBounds!.y).toBeGreaterThanOrEqual(0)
        expect(optionBounds!.y + optionBounds!.height).toBeLessThanOrEqual(viewport.height + 1)
        // Close with the same keyboard-operated disclosure, without changing locale.
        await language.focus()
        await page.keyboard.press('Enter')
        await expect(page.locator('.language-picker')).not.toHaveAttribute('open', '')
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      })
    }

    await page.setViewportSize({ width: 390, height: 844 })
    await page.locator('.menu-toggle').click()
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
