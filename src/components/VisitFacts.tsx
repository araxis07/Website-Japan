'use client'
import { useSyncExternalStore } from 'react'
import {
  fieldApplicability,
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
export function ApproachLink({ visit }: { visit: Visit | undefined }) {
  const { lang } = useTripCopy()
  if (!visit?.approach) return null
  return (
    <p className="trip-approach">
      <a href={visit.approach.source}>{visit.approach.label[lang]} ↗</a>
      <small>{visit.approach.note[lang]}</small>
    </p>
  )
}
export default function VisitFacts({
  visit,
  fields,
  visitDate,
}: {
  visit: Visit | undefined
  fields?: readonly VisitField[]
  visitDate?: string
}) {
  const { lang, tools } = useTripCopy()
  const date = useSyncExternalStore(subscribe, japanDate, () => '')
  return (
    <dl className="visit-facts">
      {(fields ?? visitFields).map((field) => {
        const review = fieldReview(visit, field, date)
        const applicability = fieldApplicability(visit, field, visitDate)
        const note =
          visit?.[field]?.[lang] || visit?.notApplicable?.[field]?.reason[lang]
        return (
          <div key={field} data-review-status={review.status}>
            <dt>{tools[field]}</dt>
            <dd>
              {note || tools.verify}
              {applicability && visit && (
                <p className="source-note" data-applicability={applicability}>
                  {visitDate && applicability !== 'dateNeeded' && (
                    <>
                      <time dateTime={visitDate}>{visitDate}</time> ·{' '}
                    </>
                  )}
                  {applicability === 'dateNeeded'
                    ? tools.visitDateNeeded
                    : applicability === 'inPeriod'
                      ? tools.visitDateInPeriod
                      : tools.visitDateOutsidePeriod}
                  <br />
                  {tools.eventPeriods}:{' '}
                  {visitSource(visit, field).applicablePeriods!.map(
                    ({ from, through }, index) => (
                      <span key={from}>
                        {index > 0 && '; '}
                        <time dateTime={from}>{from}</time>–
                        <time dateTime={through}>{through}</time>
                      </span>
                    ),
                  )}
                </p>
              )}
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
