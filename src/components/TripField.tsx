'use client'
import { useId, useEffect, useRef, useState } from 'react'
import { useTrip } from './TripProvider'

// Keep pending and rejected input visible until persistence has succeeded.
export default function TripField({
  fieldKey,
  label,
  draftLabel = label,
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
  draftLabel?: string
  value: string | number
  save: (value: string, signal?: AbortSignal) => boolean | Promise<boolean>
  type?: 'text' | 'number' | 'date' | 'time'
  maxLength?: number
  min?: number
  max?: number
  multiline?: boolean
}) {
  const { tools, drafts, setDraft: storeDraft, beginEdit, endEdit } = useTrip()
  const [saving, setSaving] = useState(false)
  const pending = useRef<AbortController | null>(null)
  const sequence = useRef(0)
  useEffect(() => () => {
    pending.current?.abort()
    endEdit(fieldKey)
  }, [endEdit, fieldKey])
  const id = useId()
  const editLabel = draftLabel.slice(0, 200)
  const rejected = drafts[fieldKey]
  useEffect(() => {
    if (!rejected && pending.current) {
      pending.current.abort()
      pending.current = null
      sequence.current++
    }
  }, [rejected])
  const conflict =
    !saving && rejected?.original !== undefined && rejected.original !== String(value)
  const issue = conflict
    ? tools.conflict
    : rejected && !saving
      ? rejected.reason === 'invalid'
        ? tools.fieldInvalid
        : tools.unsaved
      : ''
  const props = {
    id,
    'data-trip-field': fieldKey,
    value: rejected?.value ?? String(value),
    onFocus: () => beginEdit(fieldKey, editLabel),
    onBlur: () => endEdit(fieldKey),
    maxLength,
    'aria-invalid': Boolean(issue),
    'aria-busy': saving,
    'aria-describedby': issue ? `${id}-error` : undefined,
    onChange: async (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      pending.current?.abort()
      pending.current = null
      setSaving(false)
      const current = ++sequence.current
      const next = event.target.value
      const draft = {
        value: next,
        label: editLabel,
        original: rejected?.original ?? String(value),
      }
      if (!event.target.validity.valid) {
        storeDraft(fieldKey, { ...draft, reason: 'invalid' })
        return
      }
      if (conflict) {
        storeDraft(fieldKey, draft)
        return
      }
      const controller = new AbortController()
      pending.current = controller
      setSaving(true)
      beginEdit(fieldKey, editLabel, controller.signal)
      storeDraft(fieldKey, draft)
      const saved = await save(next, controller.signal)
      if (sequence.current !== current || controller.signal.aborted) return
      pending.current = null
      setSaving(false)
      storeDraft(fieldKey, saved ? null : draft)
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
              pending.current?.abort()
              pending.current = null
              setSaving(false)
              sequence.current++
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
