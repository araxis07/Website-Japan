'use client'
import Link from 'next/link'
import { useTrip } from '@/components/TripProvider'
export default function ErrorPage({
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  const { tools, copy, lang } = useTrip()
  return (
    <main id="main-content" className="container recovery-page">
      <h1>{tools.errorTitle}</h1>
      <p>{tools.errorHelp}</p>
      <div className="hero-actions">
        <button type="button" className="button" onClick={retry}>
          {tools.retry}
        </button>
        <Link href={`/${lang}/my-trip`}>{copy.title} ↗</Link>
        <Link href={`/${lang}/explore`}>{copy.explore} ↗</Link>
      </div>
    </main>
  )
}
