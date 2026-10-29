'use client'
import Link from 'next/link'
import { firstVisitSteps } from '@/data/first-visit'
import { useTrip } from './TripProvider'
export default function ReadinessChecklist() {
  const { trip, ready, tools, copy, lang, change, drafts } = useTrip()
  return (
    <details className="readiness-checklist">
      <summary>{tools.checklist}</summary>
      {Object.keys(drafts).length > 0 && (
        <p>
          {tools.checklistPendingHelp}{' '}
          <a href="#trip-drafts">{tools.pendingDrafts} ↗</a>
        </p>
      )}
      <fieldset disabled={!trip || !ready || Object.keys(drafts).length > 0}>
        <legend>
          {tools.checklistTrip}: {trip?.title || copy.title}
        </legend>
        <p>{tools.checklistHelp}</p>
        <Link href={`/${lang}/my-trip`}>{copy.title} ↗</Link>
        {firstVisitSteps.map((step) => (
          <div key={step.id}>
            <label>
              <input
                type="checkbox"
                checked={trip?.preparation?.includes(step.id) || false}
                onChange={(event) => {
                  const checked = event.target.checked
                  change(
                    (current) => ({
                      ...current,
                      preparation: checked
                        ? [...(current.preparation || []), step.id]
                        : current.preparation?.filter((id) => id !== step.id),
                    }),
                    copy.updated,
                    JSON.stringify(trip),
                  )
                }}
              />
              {step.copy[lang].title}
            </label>
            <Link href={`/${lang}/first-visit#${step.id}`}>
              {tools.readTopic}: {step.copy[lang].title} ↗
            </Link>
          </div>
        ))}
        <button
          type="button"
          disabled={!trip?.preparation?.length}
          onClick={() => {
            if (window.confirm(tools.checklistClearConfirm))
              change(
                (current) => ({ ...current, preparation: [] }),
                copy.updated,
                JSON.stringify(trip),
              )
          }}
        >
          {tools.checklistReset}
        </button>
      </fieldset>
    </details>
  )
}
