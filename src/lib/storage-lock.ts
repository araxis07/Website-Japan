let pending = 0
export const hasPendingStorageWrite = () => pending > 0
export function subscribeStorageWrites(changed: () => void) {
  window.addEventListener('trip-write-state', changed)
  return () => window.removeEventListener('trip-write-state', changed)
}
export const checkpointDatabase = 'japan-travel-write-checkpoints-v1'
const storeName = 'snapshots'
let database: Promise<IDBDatabase> | undefined
function openDatabase() {
  database ??= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(checkpointDatabase, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(storeName)
    request.onerror = () => { database = undefined; reject(request.error) }
    request.onblocked = () => { database = undefined; reject(new DOMException('Storage is blocked', 'InvalidStateError')) }
    request.onsuccess = () => {
      request.result.onversionchange = () => { request.result.close(); database = undefined }
      resolve(request.result)
    }
  })
  return database
}
async function checkpoint(key: string, value?: { raw: string | null }, signal?: AbortSignal) {
  const db = await openDatabase()
  signal?.throwIfAborted()
  return new Promise<{ raw: string | null } | undefined>((resolve, reject) => {
    const transaction = db.transaction(storeName, value ? 'readwrite' : 'readonly')
    const store = transaction.objectStore(storeName)
    const request = value ? store.put(value, key) : store.get(key)
    const abort = () => {
      try { transaction.abort() } catch { /* It may already have committed. */ }
    }
    signal?.addEventListener('abort', abort, { once: true })
    const cleanup = () => signal?.removeEventListener('abort', abort)
    transaction.oncomplete = () => {
      cleanup()
      const record = value ?? request.result
      if (record !== undefined && (!record || typeof record !== 'object' || !(record.raw === null || typeof record.raw === 'string'))) {
        reject(new DOMException('Invalid storage checkpoint', 'InvalidStateError'))
        return
      }
      resolve(record)
    }
    transaction.onerror = () => { cleanup(); reject(transaction.error) }
    transaction.onabort = () => { cleanup(); reject(transaction.error ?? new DOMException('Storage transaction aborted', 'AbortError')) }
  })
}

// Web Locks serialize writers; an IDB checkpoint detects stale Web Storage caches.
export async function withStorageLock<T>(
  key: string,
  action: (committed: (effect: () => void) => void) => T | Promise<T>,
  signal?: AbortSignal,
  overwrite = false,
): Promise<T> {
  if (!navigator.locks)
    throw new DOMException('Storage locking requires a secure supported browser', 'NotSupportedError')
  pending++
  window.dispatchEvent(new Event('trip-write-state'))
  try {
    return await navigator.locks.request(`japan-travel:storage:${key}`, { signal }, async () => {
      const known = await checkpoint(key)
      signal?.throwIfAborted()
      const before = localStorage.getItem(key)
      if (!overwrite && known && known.raw !== before)
        throw new DOMException('Storage snapshot changed; reload before retrying', 'InvalidStateError')
      const effects: (() => void)[] = []
      let result: T
      try {
        result = await action((effect) => effects.push(effect))
        const after = localStorage.getItem(key)
        if (!known || after !== known.raw) await checkpoint(key, { raw: after }, signal)
      } catch (error) {
        if (localStorage.getItem(key) !== before) {
          if (before === null) localStorage.removeItem(key)
          else localStorage.setItem(key, before)
          window.dispatchEvent(new Event('trip-change'))
          window.dispatchEvent(new Event('trip-library-change'))
        }
        throw error
      }
      effects.forEach((effect) => effect())
      return result
    })
  } finally {
    pending--
    window.dispatchEvent(new Event('trip-write-state'))
  }
}
