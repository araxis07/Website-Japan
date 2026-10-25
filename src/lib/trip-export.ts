import { firstVisitSteps } from '@/data/first-visit'
import { mapUrl, places } from '@/data/places'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { tripDate, tripDays, type Trip } from './trip'

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
  const dayLabel = (day: number) =>
    day ? `${copy.day} ${day} ${tripDate(trip.startDate, day)}` : copy.unplanned
  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>${escape(trip.title || copy.title)}</title><style>body{max-width:48rem;margin:2rem auto;padding:1rem;font:18px/1.65 system-ui;background:#f6f2e9;color:#23333d}section{border-top:1px solid #ccc;padding-block:1rem}a{color:#96392c}p{white-space:pre-wrap;overflow-wrap:anywhere}li{margin-block:1.5rem}@media print{section{break-inside:avoid}}</style><h1>${escape(trip.title || copy.title)}</h1><p>${escape(trip.base || '')}</p><p>${escape(tools.offlineHelp)}</p>${tripDays(
    trip,
  )
    .map((day) => {
      const entries = trip.items.filter((item) => item.day === day)
      if (!entries.length && !trip.notes?.[day]) return ''
      return `<section><h2>${escape(dayLabel(day))}</h2><p>${escape(trip.notes?.[day] || '')}</p>${day > trip.days ? `<p>${escape(tools.outOfRange)}</p>` : ''}<ol>${entries
        .map((item) => {
          const place = places.find((p) => p.id === item.id)!
          return `<li><h3>${escape(place.names[lang])}</h3><p lang="ja">${escape(place.address || place.names.ja)}</p><p>${escape(item.time || '')} ${escape(item.note || '')}</p><p>${escape(tools.duration)}: ${item.duration ?? '—'} · ${escape(tools.buffer)}: ${item.buffer ?? '—'}</p><a href="${escape(mapUrl(place, true))}">${escape(copy.directions)}</a></li>`
        })
        .join('')}</ol></section>`
    })
    .join(
      '',
    )}${(trip.stays || []).map((stay) => `<p>${escape(stay.name)}: ${stay.from} (${tripDate(trip.startDate, stay.from)}) → ${stay.to} (${tripDate(trip.startDate, stay.to)})</p>`).join('')}<p>${escape(tools.travelers)}: ${trip.travelers || 1}</p><p>${escape(tools.budget)}: ¥${Object.values(trip.budget || {}).reduce((a, b) => a + b, 0)}</p><section><h2>${escape(tools.emergency)}</h2>${firstVisitSteps
    .find((step) => step.id === 'help')!
    .copy[lang].items.map((text) => `<p>${escape(text)}</p>`)
    .join(
      '',
    )}<a href="https://www.japan.travel/en/plan/emergencies/">JNTO</a></section></html>`
}

export function downloadTrip(contents: string, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }))
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
