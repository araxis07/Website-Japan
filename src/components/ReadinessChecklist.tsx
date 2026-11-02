'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useTrip } from './TripProvider'
export default function ReadinessChecklist({
  steps,
}: {
  steps: { id: string; title: string }[]
}) {
  const [pending, setPending] = useState<{ id: string; checked: boolean } | null>(null)
  const { writing, trip, ready, error, tools, copy, lang, change, drafts } = useTrip()
  return (
    <details className="readiness-checklist">
      <summary>{tools.checklist}</summary>
      {ready && !trip && (
        <p role="alert">
          {error}{' '}
          <Link href={`/${lang}/my-trip`}>{copy.plan} ↗</Link>
        </p>
      )}
      {Object.keys(drafts).length > 0 && (
        <p>
          {tools.checklistPendingHelp}{' '}
          <a href="#trip-drafts">{tools.pendingDrafts} ↗</a>
        </p>
      )}
      <fieldset disabled={writing || (!trip || !ready || Boolean(pending) || Object.keys(drafts).length > 0)}>
        <legend>
          {tools.checklistTrip}: {trip?.title || copy.title}
        </legend>
        <p>{tools.checklistHelp}</p>
        {trip && <Link href={`/${lang}/my-trip`}>{copy.title} ↗</Link>}
        {steps.map((step) => (
          <div key={step.id}>
            <label>
              <input
                type="checkbox"
                checked={pending?.id === step.id ? pending.checked : trip?.preparation?.includes(step.id) || false}
                onChange={async (event) => {
                  const checked = event.target.checked
                  setPending({ id: step.id, checked })
                  await change(
                    (current) => ({
                      ...current,
                      preparation: checked
                        ? [...(current.preparation || []), step.id]
                        : current.preparation?.filter((id) => id !== step.id),
                    }),
                    copy.updated,
                    JSON.stringify(trip),
                  )
                  setPending(null)
                }}
              />
              {step.title}
            </label>
            <Link href={`/${lang}/first-visit#${step.id}`}>
              {tools.readTopic}: {step.title} ↗
            </Link>
          </div>
        ))}
        <button
          type="button"
          disabled={writing || (!trip?.preparation?.length)}
          onClick={async () => {
            if (window.confirm(tools.checklistClearConfirm))
              await change(
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
