'use client'

import { useRouter } from 'next/navigation'
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
import { downloadTrip } from '@/lib/download'
import { hasPendingStorageWrite, subscribeStorageWrites, withStorageLock } from '@/lib/storage-lock'
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
  writing: boolean
  error: string
  lang: Locale
  copy: Dictionary['trip']
  tools: Dictionary['tools']
  noticeAreaNames: Record<string, string>
  change: (
    update: (trip: Trip) => Trip | null,
    message: string,
    expected?: string,
  ) => Promise<boolean>
  reset: () => Promise<void>
  undo: () => Promise<void>
  canUndo: boolean
  undoLabel: string
  drafts: Drafts
  setDraft: typeof writeDraft
  beginEdit: (key: string, label: string, signal?: AbortSignal) => void
  endEdit: (field?: string) => void
  draftTarget: string | null
  clearDraftTarget: (missing?: boolean) => void
  downloadRaw: () => void
}
const TripContext = createContext<Context | null>(null)
const TripCopyContext = createContext<Pick<Context, 'lang' | 'tools'> | null>(null)
export function useTrip() {
  const context = useContext(TripContext)
  if (!context) throw new Error('TripProvider is missing')
  return context
}
export function useTripCopy() {
  const context = useContext(TripCopyContext)
  if (!context) throw new Error('TripProvider is missing')
  return context
}
export default function TripProvider({
  children,
  copy,
  lang,
  tools,
  noticeAreaNames,
}: {
  children: React.ReactNode
  copy: Dictionary['trip']
  lang: Locale
  tools: Dictionary['tools']
  noticeAreaNames: Record<string, string>
}) {
  const router = useRouter()
  const writing = useSyncExternalStore(subscribeStorageWrites, hasPendingStorageWrite, () => false)
  const [draftTarget, setDraftTarget] = useState<string | null>(null)
  const staticCopy = useMemo(() => ({ lang, tools }), [lang, tools])
  const draftRaw = useSyncExternalStore(
    subscribeDrafts,
    draftSnapshot,
    () => '{}',
  )
  const drafts = useMemo(() => readDrafts(draftRaw), [draftRaw])
  const edit = useRef<{
    key: string
    field: string
    label: string
    signal?: AbortSignal
    after?: string
    pending?: { before: string; after: string }
  } | null>(null)
  const beginEdit = useCallback((field: string, label: string, signal?: AbortSignal) => {
    if (signal && edit.current?.field === field) edit.current.signal = signal
    else edit.current = { key: `${field}:${tripId()}`, field, label, signal }
  }, [])
  const endEdit = useCallback((field?: string) => {
    if (!field || edit.current?.field === field) edit.current = null
  }, [])
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!hasPendingStorageWrite() && !Object.keys(readDrafts(draftSnapshot())).length) return
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [])
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  const trip = useMemo(() => (raw === null ? null : parseTrip(raw)), [raw])
  const [feedback, setFeedback] = useState({
    error: '',
    message: '',
    sequence: 0,
  })
  const feedbackPanel = useRef<HTMLDivElement>(null)
  const notices = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = notices.current
    if (!element) return
    const root = document.documentElement
    const measure = () => root.style.setProperty('--trip-notices-height', `${element.getBoundingClientRect().height}px`)
    const observer = new ResizeObserver(measure)
    measure()
    observer.observe(element)
    return () => { observer.disconnect(); root.style.removeProperty('--trip-notices-height') }
  }, [])
  const clearDraftTarget = useCallback((missing = false) => {
    setDraftTarget(null)
    if (missing)
      setFeedback((previous) => ({
        error: tools.draftFieldMissing,
        message: '',
        sequence: previous.sequence + 1,
      }))
  }, [tools.draftFieldMissing])
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
    const panel = feedbackPanel.current
    if (!feedback.message || !panel) return
    let timer: number | undefined
    const restart = () => {
      window.clearTimeout(timer)
      if (panel.matches(':hover, :focus-within')) return
      timer = window.setTimeout(() => {
        if (panel.matches(':hover, :focus-within')) return
        setFeedback((previous) =>
          previous.sequence === feedback.sequence
            ? { ...previous, message: '' }
            : previous,
        )
      }, 5000)
    }
    const events = ['pointerenter', 'pointerleave', 'focusin', 'focusout'] as const
    events.forEach((event) => panel.addEventListener(event, restart))
    restart()
    return () => {
      window.clearTimeout(timer)
      events.forEach((event) => panel.removeEventListener(event, restart))
    }
  }, [feedback.message, feedback.sequence])
  const persist = (next: Trip, message: string, group: typeof edit.current, committed: (effect: () => void) => void) => {
    const validated = parseTrip(JSON.stringify(next))
    if (!validated) {
      showFeedback(next.items.length > 60 ? copy.limit : tools.fieldInvalid, '')
      return false
    }
    const serialized = JSON.stringify(validated)
    try {
      const before = parseTrip(snapshot())
      localStorage.setItem(tripKey, serialized)
      if (group && before) group.pending = { before: JSON.stringify(before), after: serialized }
      committed(() => {
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
        if (group) { group.after = serialized; group.pending = undefined }
        window.dispatchEvent(new Event('trip-change'))
        showFeedback('', message)
      })
      return true
    } catch {
      showFeedback(copy.error, '')
      return false
    }
  }
  const writeError = (error: unknown, cancelled = false) => {
    if (cancelled && error instanceof DOMException && error.name === 'AbortError') return
    const message = error instanceof DOMException && error.name === 'NotSupportedError'
      ? tools.storageLockUnavailable
      : error instanceof DOMException && error.name === 'InvalidStateError'
        ? tools.conflict
        : copy.error
    showFeedback(message, '')
  }
  const undo = async () => {
    const expectedHistory = history
    if (!expectedHistory) return
    try {
      await withStorageLock(tripKey, (committed) => {
        if (snapshot() !== expectedHistory.after) {
          showFeedback(tools.conflict, '')
          return
        }
        if (persist(expectedHistory.before, copy.updated, null, committed)) committed(() => setHistory(null))
      })
    } catch (error) {
      writeError(error)
    }
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
        writing,
        canReset: raw !== null && raw !== 'unavailable' && !trip,
        error,
        copy,
        lang,
        tools,
        noticeAreaNames,
        undo,
        canUndo: Boolean(history),
        undoLabel: history?.label || '',
        drafts,
        setDraft: writeDraft,
        beginEdit,
        endEdit,
        draftTarget,
        clearDraftTarget,
        downloadRaw: () => {
          if (raw !== null && raw !== 'unavailable')
            downloadTrip(raw, tripFilename('json'), 'application/json')
        },
        change: async (update, message, expected) => {
          const group = edit.current
          const signal = group?.signal
          // Queued edits may follow only a snapshot observed before our own commits.
          const observed = group && expected ? snapshot() : ''
          const acceptedAtEntry = Boolean(group && expected && (
            observed === expected ||
            (group.pending?.before === expected && group.pending.after === observed) ||
            JSON.stringify(parseTrip(observed)) === expected
          ))
          try {
            return await withStorageLock(tripKey, (committed) => {
              if (signal && group && !readDrafts(draftSnapshot())[group.field]) return false
              const current = parseTrip(snapshot())
              const serialized = JSON.stringify(current)
              if (
                expected && serialized !== expected &&
                !(acceptedAtEntry && group?.after === serialized)
              ) {
                showFeedback(tools.conflict, '')
                return false
              }
              if (current) {
                const next = update(current)
                if (!next) {
                  showFeedback(copy.limit, '')
                  return false
                }
                return persist(next, message, group, committed)
              }
              showFeedback(copy.invalid, '')
              return false
            }, signal)
          } catch (error) {
            writeError(error, signal?.aborted)
            return false
          }
        },
        reset: async () => {
          const expected = snapshot()
          if (!window.confirm(copy.confirm)) return
          try {
            await withStorageLock(tripKey, (committed) => {
              if (snapshot() !== expected) {
                showFeedback(tools.conflict, '')
                return
              }
              if (persist(emptyTrip, copy.updated, null, committed))
                committed(() => Object.keys(drafts).forEach((key) => writeDraft(key, null)))
            }, undefined, true)
          } catch (error) {
            writeError(error)
          }
        },
      }}
    >
      <TripCopyContext.Provider value={staticCopy}>
        {children}
      </TripCopyContext.Provider>
      <div className="trip-notices" ref={notices}>
        {Object.keys(drafts).length > 0 && (
          <details className="trip-drafts" id="trip-drafts">
            <summary>{tools.pendingDrafts}</summary>
            <ul>
              {Object.entries(drafts).map(([key, draft]) => (
                <li key={key}>
                  {draft.label}
                  <button
                    type="button"
                    onClick={(event) => {
                      const panel = event.currentTarget.closest('details')
                      if (panel) panel.open = false
                      setDraftTarget(key)
                      const path = `/${lang}/my-trip`
                      if (window.location.pathname !== path) router.push(path)
                    }}
                  >
                    {tools.returnToField}
                  </button>
                  <button type="button" onClick={() => writeDraft(key, null)}>
                    {tools.discardDraft}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        )}
        <div className="trip-feedback" role="status" ref={feedbackPanel}>
          {feedback.message && <span key={feedback.sequence}>{feedback.message}</span>}
          {feedback.message && history && (
            <button type="button" onClick={undo} disabled={writing}>
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
      </div>
    </TripContext.Provider>
  )
}
