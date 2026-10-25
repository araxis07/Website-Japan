'use client'
import { useId } from 'react'
import { useTrip } from './TripProvider'

// Keep rejected input visible so a failed write or invalid value cannot look saved.
export default function TripField({
  fieldKey,
  label,
  value,
  save,
  type = 'text',
  maxLength = 160,
  min,
  max,
  multiline = false,
}: {
  fieldKey: string
  label: string
  value: string | number
  save: (value: string) => boolean
  type?: 'text' | 'number' | 'date' | 'time'
  maxLength?: number
  min?: number
  max?: number
  multiline?: boolean
}) {
  const { tools, drafts, setDraft: storeDraft, beginEdit, endEdit } = useTrip()
  const id = useId()
  const rejected = drafts[fieldKey]
  const issue = rejected
    ? rejected.reason === 'invalid'
      ? tools.fieldInvalid
      : tools.unsaved
    : ''
  const props = {
    id,
    value: rejected?.value ?? String(value),
    onFocus: () => beginEdit(fieldKey, label),
    onBlur: endEdit,
    maxLength,
    'aria-invalid': Boolean(issue),
    'aria-describedby': issue ? `${id}-error` : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const next = event.target.value
      if (!event.target.validity.valid) {
        storeDraft(fieldKey, { value: next, label, reason: 'invalid' })
        return
      }
      const saved = save(next)
      storeDraft(fieldKey, saved ? null : { value: next, label })
    },
  }
  return (
    <div className="trip-field">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea {...props} />
      ) : (
        <input
          {...props}
          type={type}
          min={min}
          max={max}
          step={type === 'number' ? 1 : undefined}
        />
      )}
      {issue && (
        <span id={`${id}-error`} role="alert">
          {issue}
          <button
            type="button"
            onClick={() => {
              storeDraft(fieldKey, null)
            }}
          >
            {tools.discardDraft}
          </button>
        </span>
      )}
    </div>
  )
}
