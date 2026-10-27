'use client'
import { useTrip } from './TripProvider'
import { tripId } from '@/lib/trip'

export default function PersonalStop() {
  const { trip, tools, copy, change, drafts, setDraft } = useTrip()
  if (!trip) return null
  const fields = ['name', 'address', 'url'] as const
  const labels = {
    name: tools.personalName,
    address: tools.personalAddress,
    url: tools.personalLink,
  }
  const value = (field: (typeof fields)[number]) =>
    drafts[`personal:${field}`]?.value || ''
  return (
    <details className="personal-stop visit-details">
      <summary>{tools.addPersonal}</summary>
      <p>{tools.personalHelp}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (
            change(
              (current) => ({
                ...current,
                items: [
                  ...current.items,
                  {
                    id: `custom-${tripId()}`,
                    day: 0,
                    custom: {
                      name: value('name').trim(),
                      address: value('address').trim(),
                      ...(value('url').trim()
                        ? { url: value('url').trim() }
                        : {}),
                    },
                  },
                ],
              }),
              copy.added,
              JSON.stringify(trip),
            )
          )
            fields.forEach((field) => setDraft(`personal:${field}`, null))
        }}
      >
        <div className="trip-meta">
          {fields.map((field) => (
            <label key={field}>
              {labels[field]}
              <input
                type={field === 'url' ? 'url' : 'text'}
                required={field !== 'url'}
                maxLength={
                  field === 'name' ? 160 : field === 'address' ? 300 : 1000
                }
                pattern={field === 'url' ? 'https://.*' : undefined}
                value={value(field)}
                onChange={(event) =>
                  setDraft(
                    `personal:${field}`,
                    event.target.value
                      ? { value: event.target.value, label: labels[field] }
                      : null,
                  )
                }
              />
            </label>
          ))}
        </div>
        <button type="submit" disabled={trip.items.length >= 60}>
          {tools.addPersonal}
        </button>
      </form>
    </details>
  )
}
