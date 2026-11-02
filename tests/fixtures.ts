import { checkpointDatabase } from '../src/lib/storage-lock'
import { test as base, expect, type Locator, type Page } from '@playwright/test'

// Test interactions without repeatedly downloading public map tiles. Live tiles are checked separately.
export const test = base.extend({
  context: async ({ context }, run) => {
    await context.route('https://tile.openstreetmap.org/**', (route) =>
      route.fulfill({
        contentType: 'image/png',
        body: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jZ1kAAAAASUVORK5CYII=',
          'base64',
        ),
      }),
    )
    await context.addInitScript((databaseName) => {
      window.seedTestStorage = async (key: string, value: string) => {
        if (!['japan-travel-trip-v1', 'japan-travel-library-v1'].includes(key)) {
          localStorage.setItem(key, value)
          return
        }
        const write = async () => {
          const db = await new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(databaseName, 1)
            request.onupgradeneeded = () => request.result.createObjectStore('snapshots')
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
          })
          try {
            await new Promise<void>((resolve, reject) => {
              const transaction = db.transaction('snapshots', 'readwrite')
              transaction.objectStore('snapshots').put({ raw: value }, key)
              transaction.oncomplete = () => resolve()
              transaction.onerror = () => reject(transaction.error)
            })
            localStorage.setItem(key, value)
          } finally { db.close() }
        }
        if (navigator.locks) await navigator.locks.request(`japan-travel:storage:${key}`, write)
        else await write()
      }
    }, checkpointDatabase)
    await run(context)
  },
})
export { expect }

export async function openDetails(panel: Locator) {
  if ((await panel.getAttribute('open')) === null)
    await panel.locator(':scope > summary').click()
}

// Read the committed checkpoint, avoiding a WebKit page's stale Web Storage cache.
export async function readStorage(page: Page, key: string) {
  return page.evaluate(async ({ key, databaseName }) => {
    const read = async () => {
      if (!['japan-travel-trip-v1', 'japan-travel-library-v1'].includes(key)) return localStorage.getItem(key)
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(databaseName, 1)
        request.onupgradeneeded = () => request.result.createObjectStore('snapshots')
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
      try {
        const record = await new Promise<{ raw: string | null } | undefined>((resolve, reject) => {
          const transaction = db.transaction('snapshots')
          const request = transaction.objectStore('snapshots').get(key)
          transaction.oncomplete = () => resolve(request.result)
          transaction.onerror = () => reject(transaction.error)
        })
        return record ? record.raw : localStorage.getItem(key)
      } finally { db.close() }
    }
    return navigator.locks ? await navigator.locks.request(`japan-travel:storage:${key}`, read) : await read()
  }, { key, databaseName: checkpointDatabase })
}

declare global {
  interface Window {
    seedTestStorage: (key: string, value: string) => Promise<void>
  }
}
