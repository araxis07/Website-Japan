'use client'
import Link from 'next/link'
import { useState } from 'react'
import { appearanceKey } from '@/lib/appearance'
import { tripKey } from '@/lib/trip'
import { useTrip } from './TripProvider'

export default function DataPrivacy() {
  const { tools, copy, lang, drafts, setDraft } = useTrip()
  const [error, setError] = useState('')
  const [deleted, setDeleted] = useState(false)
  return (
    <section className="data-privacy">
      <h2>{tools.eraseData}</h2>
      <p>{tools.eraseHelp}</p>
      <Link href={`/${lang}/my-trip#trip-tools`}>{tools.backup}</Link>
      <button
        type="button"
        onClick={() => {
          if (!window.confirm(tools.eraseConfirm)) return
          setDeleted(false)
          try {
            for (const key of [
              tripKey,
              'japan-travel-library-v1',
              'japan-trip-backup',
              appearanceKey,
              'japan-travel-motion',
            ])
              localStorage.removeItem(key)
            Object.keys(drafts).forEach((key) => setDraft(key, null))
            sessionStorage.removeItem('japan-travel-drafts-v1')
            window.dispatchEvent(new StorageEvent('storage', { key: null }))
            setError('')
            setDeleted(true)
          } catch {
            setError(tools.eraseFailed)
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
