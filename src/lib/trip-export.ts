import { firstVisitHelp } from '@/data/first-visit-help'
import { mapUrl } from '@/data/places'
import {
  fieldApplicability,
  fieldReview,
  visitFor,
  visitSource,
} from '@/data/visit-details'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import {
  tripDate,
  tripDays,
  dayLabel as formatDay,
  missingBudget,
  japanDate,
  tripPlace,
  type Trip,
} from './trip'

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  )

export function offlineTrip(
  trip: Trip,
  lang: Locale,
  copy: Dictionary['trip'],
  tools: Dictionary['tools'],
) {
  const generatedDate = japanDate()
  const visitGuidance = (
    place: ReturnType<typeof tripPlace>,
    visitDate: string,
  ) => {
    if (place.id !== 'kiyomizu' && place.id !== 'kyoto-museum') return ''
    const visit = visitFor(place)
    if (!visit) return ''
    const approach = visit.approach
    const approachSource = visitSource(
      visit,
      place.id === 'kiyomizu' ? 'access' : 'entrance',
    )
    const source = visitSource(visit, 'booking')
    const review = fieldReview(visit, 'booking', generatedDate)
    const applicability = fieldApplicability(visit, 'booking', visitDate)
    const applicabilityCopy =
      applicability === 'inPeriod'
        ? tools.visitDateInPeriod
        : applicability === 'outsidePeriod'
          ? tools.visitDateOutsidePeriod
          : tools.visitDateNeeded
    const reviewCopy =
      review.status === 'expired'
        ? tools.claimExpired
        : review.status === 'overdue'
          ? tools.reviewDue
          : tools.reviewCurrent
    const booking =
      visit.booking && applicability
        ? `<h4>${escape(tools.booking)}</h4><p>${escape(visit.booking[lang])}</p><p data-applicability="${escape(applicability)}">${visitDate && applicability !== 'dateNeeded' ? `<time datetime="${escape(visitDate)}">${escape(visitDate)}</time> · ` : ''}${escape(applicabilityCopy)}</p><p>${escape(tools.eventPeriods)}: ${source.applicablePeriods!.map(({ from, through }) => `<time datetime="${escape(from)}">${escape(from)}</time>–<time datetime="${escape(through)}">${escape(through)}</time>`).join('; ')}</p><p data-review-status="${escape(review.status)}">${escape(reviewCopy)} · <a href="${escape(source.source)}">${escape(tools.official)}</a> · <time datetime="${escape(source.reviewedAt)}">${escape(source.reviewedAt)}</time>${source.validThrough ? ` · ${escape(tools.validThrough)}: <time datetime="${escape(source.validThrough)}">${escape(source.validThrough)}</time>` : ''}</p>`
        : ''
    return `<div class="offline-visit-guidance" data-place-id="${escape(place.id)}">${approach ? `<p class="offline-approach"><a href="${escape(approach.source)}">${escape(approach.label[lang])}</a><br>${escape(approach.note[lang])}<br>${escape(tools.reviewCurrent)} · <time datetime="${escape(approachSource.reviewedAt)}">${escape(approachSource.reviewedAt)}</time></p>` : ''}${booking}</div>`
  }
  const dayLabel = (day: number) =>
    day
      ? `${formatDay(day, lang, copy.day)} ${tripDate(trip.startDate, day)}`
      : copy.unplanned
  const missing = missingBudget(trip)
  const budgetNote = missing.length
    ? `<p>${escape(tools.budgetMissing)}: ${missing.map((key) => escape(tools[key])).join(' · ')}. ${escape(tools.budgetIncomplete)}</p>`
    : ''
  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>${escape(trip.title || copy.title)}</title><style>body{max-width:48rem;margin:2rem auto;padding:1rem;font:18px/1.65 system-ui;background:#f6f2e9;color:#23333d}section{border-top:1px solid #ccc;padding-block:1rem}a{color:#96392c}p{white-space:pre-wrap;overflow-wrap:anywhere}li{margin-block:1.5rem}@media print{section{break-inside:avoid}}</style><h1>${escape(trip.title || copy.title)}</h1><p>${escape(trip.base || '')}</p><p>${escape(tools.offlineHelp)}</p><p class="offline-snapshot">${escape(tools.offlineSnapshotGenerated)}: <time datetime="${escape(generatedDate)}">${escape(generatedDate)}</time><br>${escape(tools.offlineSnapshotHelp)}</p>${tripDays(
    trip,
  )
    .map((day) => {
      const entries = trip.items.filter((item) => item.day === day)
      if (!entries.length && !trip.notes?.[day]) return ''
      return `<section><h2>${escape(dayLabel(day))}</h2><p>${escape(trip.notes?.[day] || '')}</p>${day > trip.days ? `<p>${escape(tools.outOfRange)}</p>` : ''}<ol>${entries
        .map((item) => {
          const place = tripPlace(item)
          return `<li><h3>${escape(place.names[lang])}</h3><p${item.custom ? '' : ' lang="ja"'}>${escape(place.address || place.names.ja)}</p><p>${escape(item.time || '')} ${escape(item.note || '')}</p><p>${escape(tools.duration)}: ${item.duration ?? '—'} ${escape(tools.minuteUnit)} · ${escape(tools.buffer)}: ${item.buffer ?? '—'} ${escape(tools.minuteUnit)}</p>${item.custom ? '' : visitGuidance(place, tripDate(trip.startDate, item.day))}<a href="${escape(mapUrl(place, true))}">${escape(copy.directions)}</a>${item.custom?.url ? `<p><a href="${escape(item.custom.url)}">${escape(tools.personalLink)}</a></p>` : ''}</li>`
        })
        .join('')}</ol></section>`
    })
    .join(
      '',
    )}${(trip.stays || []).map((stay) => `<p>${escape(stay.name)} · ${escape(stay.address || '')}: ${stay.from} (${tripDate(trip.startDate, stay.from)}) → ${stay.to} (${tripDate(trip.startDate, stay.to)})</p>`).join('')}<p>${escape(tools.travelers)}: ${trip.travelers || 1}</p>${budgetNote}${Object.keys(trip.budget || {}).length ? `<p>${escape(tools.total)}: ${new Intl.NumberFormat(lang, { style: 'currency', currency: 'JPY' }).format(Object.values(trip.budget || {}).reduce((a, b) => a + b, 0))}</p>` : ''}<section><h2>${escape(tools.emergency)}</h2>${firstVisitHelp.copy[lang].items.map((text) => `<p>${escape(text)}</p>`)
    .join(
      '',
    )}<a href="https://www.japan.travel/en/plan/emergencies/">JNTO</a></section></html>`
}
