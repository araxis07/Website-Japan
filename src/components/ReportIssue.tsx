'use client'
import { useState } from 'react'
import { useTrip } from './TripProvider'
export default function ReportIssue({ contact }: { contact?: string }) {
  const { tools, lang } = useTrip()
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')
  return (
    <section className="report-issue">
      <label>
        {tools.reportTemplate}
        <textarea
          maxLength={2000}
          value={text}
          placeholder={tools.reportPlaceholder}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <p>{tools.reportPrivacy}</p>
      <p>{tools.reportSteps}</p>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(
              `${location.origin}${location.pathname}\nLanguage: ${lang}\n\n${text}`,
            )
            setStatus(tools.copied)
          } catch {
            setStatus(tools.copyFail)
          }
        }}
      >
        {tools.copyReport}
      </button>
      <p role="status">{status}</p>
      <a
        className="button"
        href={contact || 'https://github.com/araxis07/Website-Japan/issues/new'}
      >
        {tools.report} ↗
      </a>
    </section>
  )
}
