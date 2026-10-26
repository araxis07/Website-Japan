'use client'
import { useSyncExternalStore } from 'react'
import { japanDate } from '@/lib/trip'
import { currentNotices } from '@/data/travel-notices'
import { useTrip } from './TripProvider'
const subscribe = (changed: () => void) => {
  const timer = setInterval(changed, 60000)
  return () => clearInterval(timer)
}
export default function TravelNotices() {
  const { lang, tools } = useTrip()
  const today = useSyncExternalStore(subscribe, japanDate, () => '')
  const notices = currentNotices(today)
  if (!notices.length) return null
  return (
    <details className="visit-details travel-notices">
      <summary>{tools.eventNotice}</summary>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            <p>
              <time dateTime={notice.from}>{notice.from}</time> –{' '}
              <time dateTime={notice.through}>{notice.through}</time>
            </p>
            <p>{notice.text[lang]}</p>
            <p className="source-note">
              <a href={notice.source}>{tools.official} ↗</a> · {tools.reviewed}:{' '}
              <time dateTime={notice.reviewedAt}>{notice.reviewedAt}</time>
            </p>
          </li>
        ))}
      </ul>
    </details>
  )
}
