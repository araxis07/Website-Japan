'use client'
import { useTrip } from './TripProvider'
import { useState } from 'react'
import { tripId, type TripEntry } from '@/lib/trip'

export default function PersonalStop({ entry }: { entry?: TripEntry }) {
  const { trip, tools, copy, change, drafts, setDraft } = useTrip()
  const [error, setError] = useState('')
  if (!trip) return null
  const fields = ['name', 'address', 'url', 'latitude', 'longitude'] as const
  const prefix = entry ? `personal:${entry.id}` : 'personal'
  const labels = {
    name: tools.personalName,
    address: tools.personalAddress,
    url: tools.personalLink,
    latitude: tools.latitude,
    longitude: tools.longitude,
  }
  const savedValue = (field: (typeof fields)[number]) =>
    (field === 'latitude'
      ? entry?.custom?.coordinates?.[0]?.toString()
      : field === 'longitude'
        ? entry?.custom?.coordinates?.[1]?.toString()
        : entry?.custom?.[field]) ?? ''
  const value = (field: (typeof fields)[number]) =>
    drafts[`${prefix}:${field}`]?.value ?? savedValue(field)
  const clearDrafts = () => {
    fields.forEach((field) => setDraft(`${prefix}:${field}`, null))
    setError('')
  }
  const input = (field: (typeof fields)[number]) => {
    const coordinate = field === 'latitude' || field === 'longitude'
    return (
      <label key={field}>
        {labels[field]}
        <input
          type={coordinate ? 'number' : field === 'url' ? 'url' : 'text'}
          required={
            coordinate
              ? Boolean(value('latitude') || value('longitude'))
              : field !== 'url'
          }
          maxLength={field === 'name' ? 160 : field === 'address' ? 300 : 1000}
          min={coordinate ? (field === 'latitude' ? -90 : -180) : undefined}
          max={coordinate ? (field === 'latitude' ? 90 : 180) : undefined}
          step={coordinate ? 'any' : undefined}
          pattern={field === 'url' ? 'https://.*' : undefined}
          value={value(field)}
          onInvalid={(event) => {
            const panel = event.currentTarget.closest('details')
            if (panel) panel.open = true
          }}
          onChange={(event) => {
            setError('')
            setDraft(`${prefix}:${field}`, {
              value: event.target.value,
              label: labels[field],
              ...(entry
                ? {
                    original:
                      drafts[`${prefix}:${field}`]?.original ??
                      savedValue(field),
                  }
                : {}),
            })
          }}
        />
      </label>
    )
  }
  return (
    <details className="personal-stop visit-details">
      <summary>{entry ? tools.editPersonal : tools.addPersonal}</summary>
      <p>{entry ? tools.editPersonalHelp : tools.personalHelp}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (
            entry &&
            fields.some((field) => {
              const original = drafts[`${prefix}:${field}`]?.original
              return original !== undefined && original !== savedValue(field)
            })
          ) {
            setError(tools.conflict)
            return
          }
          const custom = {
            name: value('name').trim(),
            address: value('address').trim(),
            ...(value('url').trim() ? { url: value('url').trim() } : {}),
            ...(value('latitude') && value('longitude')
              ? {
                  coordinates: [
                    Number(value('latitude')),
                    Number(value('longitude')),
                  ] as [number, number],
                }
              : {}),
          }
          if (
            change(
              (current) => ({
                ...current,
                ...(entry
                  ? {
                      stays: current.stays?.map((stay) =>
                        stay.placeId === entry.id
                          ? {
                              ...stay,
                              name: custom.name,
                              address: custom.address,
                            }
                          : stay,
                      ),
                    }
                  : {}),
                items: entry
                  ? current.items.map((item) =>
                      item.id === entry.id ? { ...item, custom } : item,
                    )
                  : [
                      ...current.items,
                      {
                        id: `custom-${tripId()}`,
                        day: 0,
                        custom,
                      },
                    ],
              }),
              entry ? copy.updated : copy.added,
              JSON.stringify(trip),
            )
          )
            clearDrafts()
        }}
      >
        {error && <p role="alert">{error}</p>}
        <div className="trip-meta">
          {(['name', 'address', 'url'] as const).map(input)}
        </div>
        <details className="personal-coordinates">
          <summary>{tools.personalCoordinates}</summary>
          <p>{tools.personalPinHelp}</p>
          <div className="trip-meta">
            {input('latitude')}
            {input('longitude')}
          </div>
        </details>
        <button type="submit" disabled={!entry && trip.items.length >= 60}>
          {entry ? tools.savePersonal : tools.addPersonal}
        </button>
        <button type="button" onClick={clearDrafts}>
          {tools.cancel}
        </button>
      </form>
    </details>
  )
}
