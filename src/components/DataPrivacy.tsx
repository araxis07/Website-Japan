'use client'
import Link from 'next/link'
import { withStorageLock } from '@/lib/storage-lock'
import { useState } from 'react'
import { appearanceKey } from '@/lib/appearance'
import { tripKey } from '@/lib/trip'
import { useTrip } from './TripProvider'

export default function DataPrivacy() {
  const { tools, copy, lang, drafts, setDraft, writing } = useTrip()
  const [error, setError] = useState('')
  const [deleted, setDeleted] = useState(false)
  return (
    <section className="data-privacy">
      <h2>{tools.eraseData}</h2>
      <p>{tools.eraseHelp}</p>
      <Link href={`/${lang}/my-trip#trip-tools`}>{tools.backup}</Link>
      <button
        type="button"
        disabled={writing}
        onClick={async () => {
          if (!window.confirm(tools.eraseConfirm)) return
          setDeleted(false)
          try {
            await withStorageLock(tripKey, (committed) =>
              withStorageLock('japan-travel-library-v1', () => {
                for (const key of [tripKey, 'japan-travel-library-v1', 'japan-trip-backup', appearanceKey, 'japan-travel-motion'])
                  localStorage.removeItem(key)
                committed(() => {
                  Object.keys(drafts).forEach((key) => setDraft(key, null))
                  sessionStorage.removeItem('japan-travel-drafts-v1')
                  window.dispatchEvent(new StorageEvent('storage', { key: null }))
                  setError('')
                  setDeleted(true)
                })
              }, undefined, true),
              undefined,
              true,
            )
          } catch (error) {
            setError(error instanceof DOMException && error.name === 'NotSupportedError' ? tools.storageLockUnavailable : tools.eraseFailed)
          }
        }}
      >
        {tools.eraseData}
      </button>
      {error && <p role="alert">{error}</p>}
      {deleted && <p role="status">{tools.erasedData}</p>}
      <p className="source-note">{copy.local}</p>
    </section>
  )
}
