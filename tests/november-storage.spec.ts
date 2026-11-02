import type { Page } from '@playwright/test'
import { readStorage, test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey } from '../src/lib/trip'
import en from '../src/i18n/dictionaries/en.json'

const lockKey = `japan-travel:storage:${tripKey}`
async function stored(page: Page) {
  // Deliberately inspect the pre-commit value while another tab holds the lock.
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), tripKey)
}
async function hold(page: Page) {
  await page.evaluate((key) => new Promise<void>((acquired) => {
    void navigator.locks.request(key, () => new Promise<void>((release) => {
      Object.assign(window, { releaseStorageLock: release })
      acquired()
    }))
  }), lockKey)
}
async function release(page: Page) {
  await page.evaluate(() => (window as unknown as { releaseStorageLock: () => void }).releaseStorageLock())
  await page.evaluate((key) => navigator.locks.request(key, () => true), lockKey)
}

test('simultaneous native saves from two tabs keep both places and stale Undo cannot overwrite a later commit', async ({ page, context }) => {
  const other = await context.newPage()
  await Promise.all([page.goto('/en/destinations/kyoto'), other.goto('/en/destinations/tokyo')])
  const trigger = (tab: Page, name: string, deadline: number) => tab.evaluate(({ name, deadline }) => new Promise<boolean>((resolve) => {
    setTimeout(() => {
      const button = Array.from(document.querySelectorAll('button')).find((element) => element.getAttribute('aria-label') === name)
      if (!button || button.disabled) { resolve(false); return }
      button.click()
      resolve(true)
    }, Math.max(0, deadline - Date.now()))
  }), { name, deadline })
  for (let round = 0; round < 5; round++) {
    await page.evaluate(async ({ key, trip }) => {
      await window.seedTestStorage(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    }, { key: tripKey, trip: emptyTrip })
    await Promise.all([
      expect(page.getByRole('button', { name: `${en.trip.save}: Gion`, exact: true })).toBeVisible(),
      expect(other.getByRole('button', { name: `${en.trip.save}: Sensoji`, exact: true })).toBeVisible(),
    ])
    const deadline = Date.now() + 80
    expect(await Promise.all([
      trigger(page, `${en.trip.save}: Gion`, deadline),
      trigger(other, `${en.trip.save}: Sensoji`, deadline),
    ])).toEqual([true, true])
    await readStorage(page, tripKey)
    await readStorage(other, tripKey)
    const current = JSON.parse((await readStorage(page, tripKey))!)
    if (current.items.length !== 2) {
      // A stale browser cache must produce a visible conflict, never silent loss.
      expect(current.items).toHaveLength(1)
      const missingGion = !current.items.some((item: { id: string }) => item.id === 'gion')
      const rejected = missingGion ? page : other
      await expect(rejected.locator('.trip-error-toast')).toContainText(en.tools.conflict)
      await rejected.reload()
      await rejected.getByRole('button', { name: `${en.trip.save}: ${missingGion ? 'Gion' : 'Sensoji'}`, exact: true }).click()
    }
    await expect.poll(async () => JSON.parse((await readStorage(page, tripKey))!).items.map((item: { id: string }) => item.id).sort()).toEqual(['gion', 'sensoji'])
  }
  await page.evaluate(async ({ key, trip }) => {
    await window.seedTestStorage(key, JSON.stringify(trip))
    dispatchEvent(new Event('trip-change'))
  }, { key: tripKey, trip: emptyTrip })
  await page.getByRole('button', { name: `${en.trip.save}: Gion`, exact: true }).click()
  await expect.poll(async () => (await stored(page)).items.length).toBe(1)
  await other.getByRole('button', { name: `${en.trip.save}: Sensoji`, exact: true }).click()
  await expect.poll(async () => (await stored(page)).items.length).toBe(2)
  await page.locator('.trip-feedback').getByRole('button', { name: en.tools.undo, exact: true }).click()
  await expect(page.locator('.trip-error-toast')).toContainText(en.tools.conflict)
  expect((await stored(page)).items.map((item: { id: string }) => item.id).sort()).toEqual(['gion', 'sensoji'])
  await other.close()
})

test('queued field edits remain drafts, discard cancels the write, and rapid typing saves only the current value', async ({ page, context }) => {
  await page.goto('/en/my-trip')
  await page.evaluate(async ({ key, trip }) => {
    await window.seedTestStorage(key, JSON.stringify({ ...trip, title: 'Original' }))
    dispatchEvent(new Event('trip-change'))
  }, { key: tripKey, trip: emptyTrip })
  const other = await context.newPage()
  await other.goto('/en/about')
  await hold(other)
  const title = page.locator('[data-trip-field="title"]')
  await title.fill('Discard this pending edit')
  await expect(page.locator('.trip-drafts')).toContainText(en.tools.title)
  expect((await stored(page)).title).toBe('Original')
  await openDetails(page.locator('.trip-drafts'))
  await page.locator('.trip-drafts').getByRole('button', { name: en.tools.discardDraft, exact: true }).click()
  await release(other)
  expect((await stored(page)).title).toBe('Original')
  await hold(other)
  await title.fill('')
  await title.pressSequentially('Rapid pending text')
  await expect(title).toHaveValue('Rapid pending text')
  expect((await stored(page)).title).toBe('Original')
  await release(other)
  await expect.poll(async () => (await stored(page)).title).toBe('Rapid pending text')
  await expect(page.locator('.trip-drafts')).toHaveCount(0)
  await title.blur()
  await page.locator('.trip-file-actions button').first().click()
  await expect.poll(async () => (await stored(page)).title).toBe('Original')
  await other.close()
})

test('a queued day assignment preserves a new focus target chosen while saving', async ({ page, context }) => {
  await page.goto('/en/my-trip')
  await page.evaluate(async ({ key, trip }) => {
    await window.seedTestStorage(key, JSON.stringify({ ...trip, items: [{ id: 'gion', day: 0 }] }))
    dispatchEvent(new Event('trip-change'))
  }, { key: tripKey, trip: emptyTrip })
  const other = await context.newPage()
  await other.goto('/en/about')
  await hold(other)
  await page.getByRole('combobox', { name: `${en.trip.assign}: Gion`, exact: true }).selectOption('2')
  const next = page.locator('.trip-task-links a[href="#trip-tools"]')
  await next.focus()
  await release(other)
  await expect(page.locator('.trip-day[aria-labelledby="trip-day-2"] li[data-place-id="gion"]')).toHaveCount(1)
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  await expect(next).toBeFocused()
  expect(JSON.parse((await readStorage(page, tripKey))!).items).toEqual([{ id: 'gion', day: 2 }])
  await other.close()
})

test('missing Web Locks fails safely while the existing trip can still be downloaded', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'locks', { configurable: true, value: undefined }))
  await page.goto('/en/destinations/kyoto')
  await page.getByRole('button', { name: `${en.trip.save}: Gion`, exact: true }).click()
  await expect(page.locator('.trip-error-toast')).toContainText(en.tools.storageLockUnavailable)
  expect(await readStorage(page, tripKey)).toBeNull()
  await page.goto('/en/my-trip')
  await page.locator('.trip-task-links a[href="#trip-tools"]').click()
  const download = page.waitForEvent('download')
  await page.getByRole('button', { name: en.tools.backup, exact: true }).click()
  expect((await download).suggestedFilename()).toMatch(/\.json$/)
})

test('a stale Web Storage cache is rejected against the committed checkpoint and a reload can retry safely', async ({ page }) => {
  await page.goto('/en/destinations/kyoto')
  await page.getByRole('button', { name: `${en.trip.save}: Gion`, exact: true }).click()
  await expect.poll(async () => JSON.parse((await readStorage(page, tripKey))!).items).toEqual([{ id: 'gion', day: 0 }])
  await page.goto('/en/destinations/tokyo')
  await page.evaluate(({ key, trip }) => {
    const read = Storage.prototype.getItem
    Object.assign(window, { realStorageRead: read })
    Storage.prototype.getItem = function (name) {
      return this === localStorage && name === key ? JSON.stringify(trip) : read.call(this, name)
    }
    dispatchEvent(new Event('trip-change'))
  }, { key: tripKey, trip: emptyTrip })
  await page.getByRole('button', { name: `${en.trip.save}: Sensoji`, exact: true }).click()
  await expect(page.locator('.trip-error-toast')).toContainText(en.tools.conflict)
  expect(JSON.parse((await readStorage(page, tripKey))!).items).toEqual([{ id: 'gion', day: 0 }])
  await page.reload()
  expect((await stored(page)).items).toEqual([{ id: 'gion', day: 0 }])
  await page.getByRole('button', { name: `${en.trip.save}: Sensoji`, exact: true }).click()
  await expect.poll(async () => JSON.parse((await readStorage(page, tripKey))!).items.map((item: { id: string }) => item.id).sort()).toEqual(['gion', 'sensoji'])
})

test('a checkpoint failure rolls back the mirror, keeps the draft and preserves the earlier Undo', async ({ page }) => {
  await page.goto('/en/my-trip')
  await page.evaluate(async ({ key, trip }) => {
    await window.seedTestStorage(key, JSON.stringify(trip))
    dispatchEvent(new Event('trip-change'))
  }, { key: tripKey, trip: { ...emptyTrip, title: 'Original' } })
  const title = page.locator('[data-trip-field="title"]')
  await title.fill('Saved title')
  await readStorage(page, tripKey)
  await expect(page.locator('#trip-drafts')).toHaveCount(0)
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put
    Object.assign(window, { realCheckpointPut: put })
    IDBObjectStore.prototype.put = function () { throw new DOMException('Full', 'QuotaExceededError') }
  })
  await title.fill('Keep this draft')
  await expect(page.locator('.trip-error-toast')).toContainText(en.trip.error)
  expect((await stored(page)).title).toBe('Saved title')
  await expect(title).toHaveValue('Keep this draft')
  await page.evaluate(() => {
    IDBObjectStore.prototype.put = (window as unknown as { realCheckpointPut: typeof IDBObjectStore.prototype.put }).realCheckpointPut
  })
  await openDetails(page.locator('#trip-drafts'))
  await page.locator('#trip-drafts').getByRole('button', { name: en.tools.discardDraft, exact: true }).click()
  await page.locator('.trip-file-actions button').first().click()
  await expect.poll(async () => JSON.parse((await readStorage(page, tripKey))!).title).toBe('Original')
})
