'use client'
import { useSyncExternalStore } from 'react'
function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback)
  window.addEventListener('hashchange', callback)
  window.addEventListener('guide-location', callback)
  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener('hashchange', callback)
    window.removeEventListener('guide-location', callback)
  }
}
export function usePageLocation() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search + window.location.hash,
    () => '',
  )
}
export function updateFilters(values: Record<string, string>, push = false) {
  const url = new URL(window.location.href)
  for (const [key, value] of Object.entries(values)) {
    if (value && value !== 'all') url.searchParams.set(key, value)
    else url.searchParams.delete(key)
  }
  window.history[push ? 'pushState' : 'replaceState'](
    null,
    '',
    url.pathname + url.search + url.hash,
  )
  window.dispatchEvent(new Event('guide-location'))
}
