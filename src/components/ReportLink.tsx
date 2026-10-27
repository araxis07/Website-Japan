'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { reportContext } from '@/lib/report-context'
import { usePageLocation } from './usePageLocation'
import { useTrip } from './TripProvider'

export default function ReportLink({ path }: { path?: string }) {
  const { lang, tools } = useTrip()
  const pathname = usePathname()
  const suffix = usePageLocation()
  const from = reportContext(path || pathname + suffix, lang)
  return (
    <Link href={`/${lang}/about?from=${encodeURIComponent(from)}#report-issue`}>
      {tools.report} ↗
    </Link>
  )
}
