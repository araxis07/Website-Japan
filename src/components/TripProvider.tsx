'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import { emptyTrip, parseTrip, tripKey, type Trip } from '@/lib/trip'

const emptyRaw = JSON.stringify(emptyTrip)
function snapshot() {
  try {
    return localStorage.getItem(tripKey) ?? emptyRaw
  } catch {
    return 'unavailable'
  }
}
function subscribe(callback: () => void) {
  const storage = (event: StorageEvent) => {
    if (!event.key || event.key === tripKey) callback()
  }
  window.addEventListener('storage', storage)
  window.addEventListener('trip-change', callback)
  return () => {
    window.removeEventListener('storage', storage)
    window.removeEventListener('trip-change', callback)
  }
}
const serverSnapshot = () => null
type Context = {
  trip: Trip | null
  canReset: boolean
  ready: boolean
  error: string
  lang: Locale
  copy: Dictionary['trip']
  change: (update: (trip: Trip) => Trip, message: string) => void
  reset: () => void
}
const TripContext = createContext<Context | null>(null)
export function useTrip() {
  const context = useContext(TripContext)
  if (!context) throw new Error('TripProvider is missing')
  return context
}
export default function TripProvider({
  children,
  copy,
  lang,
}: {
  children: React.ReactNode
  copy: Dictionary['trip']
  lang: Locale
}) {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  const trip = useMemo(() => (raw === null ? null : parseTrip(raw)), [raw])
  const [feedback, setFeedback] = useState({ error: '', message: '', sequence: 0 })
  const showFeedback = (error: string, message: string) =>
    setFeedback((previous) => ({ error, message, sequence: previous.sequence + 1 }))
  useEffect(() => {
    if (!feedback.message) return
    const timer = window.setTimeout(
      () => setFeedback((previous) => ({ ...previous, message: '' })),
      5000,
    )
    return () => window.clearTimeout(timer)
  }, [feedback.message, feedback.sequence])
  const persist = (next: Trip, message: string) => {
    const serialized = JSON.stringify(next)
    if (!parseTrip(serialized)) {
      showFeedback(copy.limit, '')
      return
    }
    try {
      localStorage.setItem(tripKey, serialized)
      window.dispatchEvent(new Event('trip-change'))
      showFeedback('', message)
    } catch {
      showFeedback(copy.error, '')
    }
  }
  const error =
    raw === 'unavailable' ? copy.error : raw !== null && !trip ? copy.invalid : feedback.error
  return (
    <TripContext.Provider
      value={{
        trip,
        ready: raw !== null,
        canReset: raw !== null && raw !== 'unavailable' && !trip,
        error,
        copy,
        lang,
        change: (update, message) => {
          const current = parseTrip(snapshot())
          if (current) persist(update(current), message)
          else showFeedback(copy.invalid, '')
        },
        reset: () => {
          if (window.confirm(copy.confirm)) persist(emptyTrip, copy.updated)
        },
      }}
    >
      {children}
      <div className="trip-feedback" role="status" key={feedback.sequence}>
        {feedback.message}
      </div>
      {feedback.error && (
        <div className="trip-error-toast" role="alert">
          {feedback.error}
          <button type="button" aria-label={copy.dismiss} onClick={() => showFeedback('', '')}>
            ×
          </button>
        </div>
      )}
    </TripContext.Provider>
  )
}
