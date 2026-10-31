'use client'
import { useSyncExternalStore } from 'react'
import {
  fieldReview,
  visitFields,
  visitSource,
  type Visit,
  type VisitField,
} from '@/data/visit-details'
import { japanDate } from '@/lib/trip'
import { useTripCopy } from './TripProvider'
const subscribe = (changed: () => void) => {
  const timer = setInterval(changed, 60000)
  return () => clearInterval(timer)
}
export default function VisitFacts({
  visit,
  fields,
}: {
  visit: Visit | undefined
  fields?: readonly VisitField[]
}) {
  const { lang, tools } = useTripCopy()
  const date = useSyncExternalStore(subscribe, japanDate, () => '')
  return (
    <dl className="visit-facts">
      {(fields ?? visitFields).map((field) => {
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
                    {review.status === 'expired'
                      ? tools.claimExpired
                      : review.status === 'overdue'
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
                  {review.validThrough && (
                    <>
                      {' · '}
                      {tools.validThrough}:{' '}
                      <time dateTime={review.validThrough}>
                        {review.validThrough}
                      </time>
                    </>
                  )}
                </small>
              )}
            </dd>
          </div>
        )
      })}
      {!fields && visit?.minutes !== undefined && (
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
