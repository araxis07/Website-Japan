'use client'
import { useSyncExternalStore } from 'react'
import { japanDate } from '@/lib/trip'
import { currentNotices, tripNotices } from '@/data/travel-notices'
import { useTrip } from './TripProvider'
const subscribe = (changed: () => void) => {
  const timer = setInterval(changed, 60000)
  return () => clearInterval(timer)
}
export default function TravelNotices({
  area,
  forTrip = false,
}: {
  area?: string
  forTrip?: boolean
}) {
  const { lang, tools, trip, noticeAreaNames } = useTrip()
  const today = useSyncExternalStore(subscribe, japanDate, () => '')
  const notices = (
    forTrip && trip ? tripNotices(trip, today) : currentNotices(today)
  ).filter((notice) => !area || notice.areas.includes(area))
  if (!notices.length) return null
  return (
    <details className="visit-details travel-notices">
      <summary>{tools.eventNotice}</summary>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            <strong>
              {today < notice.from ? tools.noticeUpcoming : tools.noticeActive}
            </strong>
            <p>
              {tools.noticeArea}:{' '}
              {notice.areas.map((area) => noticeAreaNames[area]).join(' · ')}
            </p>
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
