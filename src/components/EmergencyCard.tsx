'use client'
import { firstVisitSteps } from '@/data/first-visit'
import { downloadTrip } from '@/lib/trip-export'
import { useTrip } from './TripProvider'
export default function EmergencyCard() {
  const { lang, tools } = useTrip()
  const help = firstVisitSteps.find((step) => step.id === 'help')!
  return (
    <aside className="emergency-card">
      <h2>{tools.emergency}</h2>
      <p>
        <a href="tel:110">110 · {tools.police}</a> ·{' '}
        <a href="tel:119">119 · {tools.ambulance}</a>
      </p>
      <p>
        JNTO: <a href="tel:05038162787">050-3816-2787</a>
      </p>
      <button
        type="button"
        onClick={() =>
          downloadTrip(
            `${help.copy[lang].title}\n\n${help.copy[lang].items.join('\n\n')}\n\n${help.source}\n2026-10-25`,
            `japan-help-${lang}.txt`,
            'text/plain;charset=utf-8',
          )
        }
      >
        {tools.saveHelp}
      </button>
      <p>
        <a href={help.source}>{tools.official} ↗</a> · 2026-10-25
      </p>
    </aside>
  )
}
