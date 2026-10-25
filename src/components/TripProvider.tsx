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
  tools: Dictionary['tools']
  change: (
    update: (trip: Trip) => Trip | null,
    message: string,
    expected?: string,
  ) => boolean
  reset: () => void
  undo: () => void
  canUndo: boolean
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
  tools,
}: {
  children: React.ReactNode
  copy: Dictionary['trip']
  lang: Locale
  tools: Dictionary['tools']
}) {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  const trip = useMemo(() => (raw === null ? null : parseTrip(raw)), [raw])
  const [feedback, setFeedback] = useState({
    error: '',
    message: '',
    sequence: 0,
  })
  const [history, setHistory] = useState<{
    before: Trip
    after: string
  } | null>(null)
  const showFeedback = (error: string, message: string) =>
    setFeedback((previous) => ({
      error,
      message,
      sequence: previous.sequence + 1,
    }))
  useEffect(() => {
    if (!feedback.message) return
    const timer = window.setTimeout(
      () => setFeedback((previous) => ({ ...previous, message: '' })),
      5000,
    )
    return () => window.clearTimeout(timer)
  }, [feedback.message, feedback.sequence])
  const persist = (next: Trip, message: string) => {
    const validated = parseTrip(JSON.stringify(next))
    if (!validated) {
      showFeedback(next.items.length > 60 ? copy.limit : tools.fieldInvalid, '')
      return false
    }
    const serialized = JSON.stringify(validated)
    try {
      const before = parseTrip(snapshot())
      localStorage.setItem(tripKey, serialized)
      setHistory(before ? { before, after: serialized } : null)
      window.dispatchEvent(new Event('trip-change'))
      showFeedback('', message)
      return true
    } catch {
      showFeedback(copy.error, '')
      return false
    }
  }
  const undo = () => {
    if (!history) return
    if (snapshot() !== history.after) {
      showFeedback(tools.conflict, '')
      return
    }
    if (persist(history.before, copy.updated)) setHistory(null)
  }
  const error =
    raw === 'unavailable'
      ? copy.error
      : raw !== null && !trip
        ? copy.invalid
        : feedback.error
  return (
    <TripContext.Provider
      value={{
        trip,
        ready: raw !== null,
        canReset: raw !== null && raw !== 'unavailable' && !trip,
        error,
        copy,
        lang,
        tools,
        undo,
        canUndo: Boolean(history),
        change: (update, message, expected) => {
          const current = parseTrip(snapshot())
          if (expected && JSON.stringify(current) !== expected) {
            showFeedback(tools.conflict, '')
            return false
          }
          if (current) {
            const next = update(current)
            if (!next) {
              showFeedback(copy.limit, '')
              return false
            }
            return persist(next, message)
          }
          showFeedback(copy.invalid, '')
          return false
        },
        reset: () => {
          if (window.confirm(copy.confirm)) persist(emptyTrip, copy.updated)
        },
      }}
    >
      {children}
      <div className="trip-feedback" role="status" key={feedback.sequence}>
        {feedback.message}
        {feedback.message && history && (
          <button type="button" onClick={undo}>
            {tools.undo}
          </button>
        )}
      </div>
      {feedback.error && (
        <div className="trip-error-toast" role="alert">
          {feedback.error}
          <button
            type="button"
            aria-label={copy.dismiss}
            onClick={() => showFeedback('', '')}
          >
            ×
          </button>
        </div>
      )}
    </TripContext.Provider>
  )
}
