'use client'
import { useId, useState } from 'react'
import { useTrip } from './TripProvider'

// Keep rejected input visible so a failed write or invalid value cannot look saved.
export default function TripField({
  label,
  value,
  save,
  type = 'text',
  maxLength = 160,
  min,
  max,
  multiline = false,
}: {
  label: string
  value: string | number
  save: (value: string) => boolean
  type?: 'text' | 'number' | 'date' | 'time'
  maxLength?: number
  min?: number
  max?: number
  multiline?: boolean
}) {
  const { tools } = useTrip()
  const id = useId()
  const [draft, setDraft] = useState(String(value))
  const [previous, setPrevious] = useState(value)
  const [error, setError] = useState('')
  if (previous !== value) {
    setPrevious(value)
    if (!error) setDraft(String(value))
  }
  const props = {
    id,
    value: draft,
    maxLength,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const next = event.target.value
      setDraft(next)
      if (!event.target.validity.valid) {
        setError(tools.fieldInvalid)
        return
      }
      setError(save(next) ? '' : tools.unsaved)
    },
  }
  return (
    <label htmlFor={id}>
      {label}
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
      {error && (
        <span id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </label>
  )
}
