'use client'
import { useSyncExternalStore } from 'react'
import {
  fieldReview,
  visitFields,
  visitSource,
  type Visit,
} from '@/data/visit-details'
import { japanDate } from '@/lib/trip'
import { useTrip } from './TripProvider'
const subscribe = (changed: () => void) => {
  const timer = setInterval(changed, 60000)
  return () => clearInterval(timer)
}
export default function VisitFacts({ visit }: { visit: Visit | undefined }) {
  const { lang, tools } = useTrip()
  const date = useSyncExternalStore(subscribe, japanDate, () => '')
  return (
    <dl className="visit-facts">
      {visitFields.map((field) => {
        const review = fieldReview(visit, field, date)
        const note =
          visit?.[field]?.[lang] || visit?.notApplicable?.[field]?.reason[lang]
        return (
          <div key={field} data-review-status={review.status}>
            <dt>{tools[field]}</dt>
            <dd>
              {note || tools.verify}
              {note && visit && (
                <small className="field-source">
                  <span>
                    {review.status === 'overdue'
                      ? tools.reviewDue
                      : review.status === 'notApplicable'
                        ? tools.notApplicable
                        : tools.reviewCurrent}
                  </span>
                  {' · '}
                  <a href={visitSource(visit, field).source}>
                    {tools.official} ↗
                  </a>
                  {' · '}
                  <time dateTime={review.reviewedAt}>{review.reviewedAt}</time>
                </small>
              )}
            </dd>
          </div>
        )
      })}
      {visit?.minutes !== undefined && (
        <div>
          <dt>{tools.duration}</dt>
          <dd>
            {visit.minutes} {tools.minuteUnit} · {tools.estimated}
          </dd>
        </div>
      )}
    </dl>
  )
}
