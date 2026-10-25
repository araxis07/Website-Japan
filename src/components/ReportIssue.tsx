'use client'
import { useState } from 'react'
import { useTrip } from './TripProvider'
export default function ReportIssue({ contact }: { contact?: string }) {
  const { tools } = useTrip()
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
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text)
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
