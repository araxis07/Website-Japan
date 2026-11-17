import type { Page } from '@playwright/test'
import { test, expect, openDetails, readStorage } from './fixtures'
import { emptyTrip, tripKey } from '../src/lib/trip'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'
import ko from '../src/i18n/dictionaries/ko.json'
import zh from '../src/i18n/dictionaries/zh-CN.json'
import vi from '../src/i18n/dictionaries/vi.json'
import fr from '../src/i18n/dictionaries/fr.json'
import es from '../src/i18n/dictionaries/es.json'

const backup = {
  ...emptyTrip,
  title: 'Imported plan',
  items: [{ id: 'gion', day: 1, note: 'Keep this note' }],
}
const file = {
  name: 'backup.json',
  mimeType: 'application/json',
  buffer: Buffer.from(JSON.stringify(backup)),
}
const importInput = (page: Page) => page.locator('#trip-import input[type=file]')
const preview = (page: Page) => page.locator('.trip-tools > .import-preview')
const stored = async (page: Page) => JSON.parse((await readStorage(page, tripKey)) ?? JSON.stringify(emptyTrip))

test('import review shows only supplied optional metadata and visit times', async ({ page }) => {
  await page.goto('/en/my-trip')
  for (const [metadata, expected] of [
    [{}, en.tools.mergeHelp],
    [{ base: 'Kyoto Station' }, 'Kyoto Station'],
    [{ startDate: '2026-11-17' }, '2026-11-17'],
    [{ base: 'Kyoto Station', startDate: '2026-11-17' }, 'Kyoto Station · 2026-11-17'],
  ] as const) {
    await importInput(page).setInputFiles({
      ...file,
      buffer: Buffer.from(JSON.stringify({ ...backup, ...metadata, items: [
        { id: 'gion', day: 1 }, { id: 'gion', day: 2, entryId: 'return', time: '10:00' },
      ] })),
    })
    await expect(preview(page).locator(':scope > p').nth(1)).toHaveText(expected)
    await openDetails(preview(page).locator('details'))
    const rows = preview(page).locator('ol > li')
    const labels = await rows.evaluateAll((items) => items.map((item) =>
      [...item.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent).join('').replace(/\s+/g, ' ').trim(),
    ))
    expect(labels).toEqual(['Gion · Day 1', 'Gion · Day 2 · 10:00'])
    await preview(page).getByRole('button', { name: en.tools.cancel, exact: true }).click()
  }
})

test('the server-rendered planner keeps its footer below the initial viewport', async ({ browser, baseURL }) => {
  for (const viewport of [{ width: 320, height: 844 }, { width: 1440, height: 1000 }]) {
    const context = await browser.newContext({ baseURL, viewport, javaScriptEnabled: false })
    try {
      const page = await context.newPage()
      await page.goto('/en/my-trip')
      await expect(page.locator('.trip-loading')).toBeVisible()
      const footer = await page.locator('.site-footer').boundingBox()
      expect(footer!.y).toBeGreaterThanOrEqual(viewport.height)
    } finally {
      await context.close()
    }
  }
})

test('all eight languages hand keyboard focus to the import review and back on cancel', async ({ page }) => {
  test.setTimeout(90_000)
  for (const [lang, copy] of [
    ['en', en], ['ja', ja], ['th', th], ['ko', ko],
    ['zh-CN', zh], ['vi', vi], ['fr', fr], ['es', es],
  ] as const) {
    await page.goto(`/${lang}/my-trip`)
    const input = importInput(page)
    await expect(input).toHaveAccessibleName(copy.tools.import)
    await input.focus()
    await input.setInputFiles(file)
    await expect(preview(page).getByRole('heading', { name: copy.tools.preview, exact: true })).toBeFocused()
    const cancel = preview(page).getByRole('button', { name: copy.tools.cancel, exact: true })
    await cancel.focus()
    await page.keyboard.press('Enter')
    await expect(preview(page)).toHaveCount(0)
    await expect(input).toBeFocused()
    expect((await stored(page)).items).toEqual([])
  }
})

for (const action of ['merge', 'replace'] as const) {
  test(`${action} returns keyboard focus after success and preserves the imported visit`, async ({ page }) => {
    await page.goto('/en/my-trip')
    const input = importInput(page)
    await input.focus()
    await input.setInputFiles(file)
    const apply = preview(page).getByRole('button', { name: en.tools[action], exact: true })
    if (action === 'replace') page.once('dialog', (dialog) => dialog.accept())
    await apply.focus()
    await page.keyboard.press('Enter')
    await expect(preview(page)).toHaveCount(0)
    await expect(input).toBeFocused()
    expect((await stored(page)).items).toEqual(backup.items)
    if (action === 'replace') expect((await stored(page)).title).toBe(backup.title)
  })
}

test('declining replacement or a failed write retains the review and keyboard position', async ({ page }) => {
  await page.goto('/en/my-trip')
  await importInput(page).focus()
  await importInput(page).setInputFiles(file)
  const replace = preview(page).getByRole('button', { name: en.tools.replace, exact: true })
  page.once('dialog', (dialog) => dialog.dismiss())
  await replace.focus()
  await page.keyboard.press('Enter')
  await expect(replace).toBeFocused()
  await expect(preview(page)).toBeVisible()
  expect((await stored(page)).items).toEqual([])

  await page.evaluate((key) => {
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (name, value) {
      if (this === localStorage && name === key)
        throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, name, value)
    }
  }, tripKey)
  const merge = preview(page).getByRole('button', { name: en.tools.merge, exact: true })
  await merge.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.trip-error-toast')).toContainText(en.trip.error)
  await expect(preview(page)).toBeVisible()
  await expect(merge).toBeFocused()
  expect((await stored(page)).items).toEqual([])
})

test('finishing an asynchronous file read does not steal focus from another field', async ({ page }) => {
  await page.goto('/en/my-trip')
  await page.evaluate(() => {
    const text = File.prototype.text
    File.prototype.text = function () {
      return new Promise<string>((resolve, reject) => {
        Object.assign(window, {
          finishBackupRead: () => text.call(this).then(resolve, reject),
        })
      })
    }
  })
  const input = importInput(page)
  await input.focus()
  await input.setInputFiles(file)
  const title = page.locator('[data-trip-field="title"]')
  await title.focus()
  await page.evaluate(() => (window as unknown as { finishBackupRead: () => Promise<void> }).finishBackupRead())
  await expect(preview(page)).toBeVisible()
  await expect(title).toBeFocused()
  expect((await stored(page)).items).toEqual([])
})

test('a queued successful import respects a new keyboard focus target', async ({ page, context }) => {
  await page.goto('/en/my-trip')
  await importInput(page).setInputFiles(file)
  const other = await context.newPage()
  await other.goto('/en/about')
  const lock = `japan-travel:storage:${tripKey}`
  await other.evaluate((key) => new Promise<void>((acquired) => {
    void navigator.locks.request(key, () => new Promise<void>((release) => {
      Object.assign(window, { releaseImportLock: release })
      acquired()
    }))
  }), lock)
  try {
    const merge = preview(page).getByRole('button', { name: en.tools.merge, exact: true })
    await merge.focus()
    await page.keyboard.press('Enter')
    await expect(merge).toBeDisabled()
    const title = page.locator('[data-trip-field="title"]')
    await title.focus()
    await other.evaluate(() => (window as unknown as { releaseImportLock: () => void }).releaseImportLock())
    await expect(preview(page)).toHaveCount(0)
    await expect(title).toBeFocused()
    expect((await stored(page)).items).toEqual(backup.items)
  } finally {
    await other.close()
  }
})

test('discarding an invalid field draft returns focus and keeps other drafts and saved values', async ({ page }) => {
  await page.goto('/en/my-trip')
  const travelers = page.locator('[data-trip-field="travelers"]')
  const budget = page.locator('[data-trip-field="budget:food"]')
  await openDetails(page.locator('.trip-tools > .budget-panel').filter({ has: travelers }))
  const saved = await stored(page)
  await budget.fill('-1')
  await travelers.fill('0')
  const field = travelers.locator('..')
  const discard = field.getByRole('button', { name: en.tools.discardDraft, exact: true })
  await discard.focus()
  await page.keyboard.press('Enter')
  await expect(travelers).toBeFocused()
  await expect(travelers).toHaveValue('1')
  await expect(discard).toHaveCount(0)
  await expect(budget).toHaveValue('-1')
  await expect(budget).toHaveAttribute('aria-invalid', 'true')
  expect(await stored(page)).toEqual(saved)
})
