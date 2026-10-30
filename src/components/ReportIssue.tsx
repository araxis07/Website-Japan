'use client'
import { useState } from 'react'
import { useTripCopy } from './TripProvider'
import { usePageLocation } from './usePageLocation'
import { reportContext } from '@/lib/report-context'
export default function ReportIssue({ contact }: { contact?: string }) {
  const { tools, lang } = useTripCopy()
  const suffix = usePageLocation()
  const path = reportContext(
    new URLSearchParams(suffix.split('#')[0]).get('from') || '',
    lang,
  )
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')
  return (
    <section className="report-issue" id="report-issue">
      <p>
        {tools.reportContext}: <a href={path}>{path}</a>
      </p>
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
              `${location.origin}${path}\nLanguage: ${lang}\n\n${text}`,
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
      {status === tools.copyFail && (
        <label>
          {tools.manualCopy}
          <textarea
            readOnly
            value={`${location.origin}${path}\nLanguage: ${lang}\n\n${text}`}
            onFocus={(event) => event.target.select()}
          />
        </label>
      )}
      <a
        className="button"
        href={
          contact ||
          'https://github.com/araxis07/Website-Japan/issues/new?template=visitor-feedback.yml'
        }
      >
        {tools.report} ↗
      </a>
    </section>
  )
}
