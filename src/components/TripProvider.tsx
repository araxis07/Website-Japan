'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
  useSyncExternalStore,
} from 'react'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import {
  emptyTrip,
  tripId,
  parseTrip,
  tripKey,
  tripFilename,
  type Trip,
} from '@/lib/trip'
import { downloadTrip } from '@/lib/trip-export'
import {
  readDrafts,
  writeDraft,
  draftSnapshot,
  subscribeDrafts,
  type Drafts,
} from '@/lib/trip-drafts'

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
  undoLabel: string
  drafts: Drafts
  setDraft: typeof writeDraft
  beginEdit: (key: string, label: string) => void
  endEdit: () => void
  downloadRaw: () => void
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
  const draftRaw = useSyncExternalStore(
    subscribeDrafts,
    draftSnapshot,
    () => '{}',
  )
  const drafts = useMemo(() => readDrafts(draftRaw), [draftRaw])
  const edit = useRef<{ key: string; label: string } | null>(null)
  const beginEdit = useCallback((key: string, label: string) => {
    edit.current = { key: `${key}:${tripId()}`, label }
  }, [])
  const endEdit = useCallback(() => {
    edit.current = null
  }, [])
  useEffect(() => {
    if (!Object.keys(drafts).length) return
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [drafts])
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
    group?: string
    label: string
  } | null>(null)
  useEffect(() => {
    const removed = (event: StorageEvent) => {
      if (
        (event.key === tripKey || event.key === null) &&
        event.newValue === null
      ) {
        setHistory(null)
        Object.keys(readDrafts(draftSnapshot())).forEach((key) =>
          writeDraft(key, null),
        )
      }
    }
    window.addEventListener('storage', removed)
    return () => window.removeEventListener('storage', removed)
  }, [])
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
      const group = edit.current
      setHistory((previous) =>
        before
          ? {
              before:
                group &&
                previous?.group === group.key &&
                previous.after === JSON.stringify(before)
                  ? previous.before
                  : before,
              after: serialized,
              group: group?.key,
              label: group?.label || message || copy.updated,
            }
          : null,
      )
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
        undoLabel: history?.label || '',
        drafts,
        setDraft: writeDraft,
        beginEdit,
        endEdit,
        downloadRaw: () => {
          if (raw !== null && raw !== 'unavailable')
            downloadTrip(raw, tripFilename('json'), 'application/json')
        },
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
          if (window.confirm(copy.confirm) && persist(emptyTrip, copy.updated))
            Object.keys(drafts).forEach((key) => writeDraft(key, null))
        },
      }}
    >
      {children}
      {Object.keys(drafts).length > 0 && (
        <details className="trip-drafts">
          <summary>{tools.pendingDrafts}</summary>
          <ul>
            {Object.entries(drafts).map(([key, draft]) => (
              <li key={key}>
                {draft.label}
                <button type="button" onClick={() => writeDraft(key, null)}>
                  {tools.discardDraft}
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
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
