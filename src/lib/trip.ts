import { places, canonicalPlaceId } from '@/data/places'

// Keep the storage key and accept old version-1 plans without additional fields.
export const tripKey = 'japan-travel-trip-v1'
export type Trip = {
  version: 1
  days: number
  items: { id: string; day: number; time?: string; note?: string }[]
  title?: string
  startDate?: string
  base?: string
  notes?: Record<string, string>
  budget?: Partial<Record<'stay' | 'transport' | 'food' | 'activities', number>>
}
export const emptyTrip: Trip = { version: 1, days: 7, items: [] }
const knownPlaces = new Set(places.map((place) => place.id))
const text = (v: unknown, max: number) =>
  typeof v === 'string' &&
  v.length <= max &&
  !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v)

export function parseTrip(raw: string): Trip | null {
  if (raw.length > 64_000) return null
  try {
    const value = JSON.parse(raw)
    if (
      !value ||
      value.version !== 1 ||
      !Number.isInteger(value.days) ||
      value.days < 1 ||
      value.days > 30 ||
      !Array.isArray(value.items) ||
      value.items.length > 60
    )
      return null
    const result: Trip = { version: 1, days: value.days, items: [] }
    const originalIds = new Set<string>()
    for (const item of value.items) {
      if (
        !item ||
        typeof item.id !== 'string' ||
        !knownPlaces.has(canonicalPlaceId(item.id)) ||
        originalIds.has(item.id) ||
        !Number.isInteger(item.day) ||
        item.day < 0 ||
        item.day > value.days
      )
        return null
      if (
        item.time !== undefined &&
        (typeof item.time !== 'string' ||
          !/^$|^([01]\d|2[0-3]):[0-5]\d$/.test(item.time))
      )
        return null
      if (item.note !== undefined && !text(item.note, 500)) return null
      originalIds.add(item.id)
      const id = canonicalPlaceId(item.id)
      const existing = result.items.find((entry) => entry.id === id)
      // Legacy aliases describe the same place: keep the first scheduled visit.
      if (existing) {
        for (const key of ['time', 'note'] as const) {
          if (existing[key] && item[key] && existing[key] !== item[key])
            return null
          if (!existing[key] && item[key]) existing[key] = item[key]
        }
        if (!existing.day) existing.day = item.day
        continue
      }
      result.items.push({
        id,
        day: item.day,
        ...(item.time !== undefined ? { time: item.time } : {}),
        ...(item.note !== undefined ? { note: item.note } : {}),
      })
    }
    for (const key of ['title', 'base'] as const) {
      if (value[key] !== undefined) {
        if (!text(value[key], 160)) return null
        result[key] = value[key]
      }
    }
    if (value.startDate !== undefined) {
      if (
        typeof value.startDate !== 'string' ||
        (value.startDate !== '' &&
          (!/^\d{4}-\d{2}-\d{2}$/.test(value.startDate) ||
            !Number.isFinite(Date.parse(`${value.startDate}T12:00:00Z`)) ||
            new Date(`${value.startDate}T12:00:00Z`)
              .toISOString()
              .slice(0, 10) !== value.startDate))
      )
        return null
      result.startDate = value.startDate
    }
    if (value.notes !== undefined) {
      if (
        !value.notes ||
        typeof value.notes !== 'object' ||
        Array.isArray(value.notes)
      )
        return null
      result.notes = {}
      for (const [day, note] of Object.entries(value.notes)) {
        if (!/^(0|[1-9]|[12]\d|30)$/.test(day) || !text(note, 1000)) return null
        result.notes[day] = note as string
      }
    }
    if (value.budget !== undefined) {
      if (
        !value.budget ||
        typeof value.budget !== 'object' ||
        Array.isArray(value.budget)
      )
        return null
      result.budget = {}
      for (const [key, amount] of Object.entries(value.budget)) {
        if (
          !['stay', 'transport', 'food', 'activities'].includes(key) ||
          typeof amount !== 'number' ||
          !Number.isFinite(amount) ||
          amount < 0 ||
          amount > 100_000_000
        )
          return null
        result.budget[key as keyof NonNullable<Trip['budget']>] = amount
      }
    }
    return result
  } catch {
    return null
  }
}

export function mergeTrips(current: Trip, incoming: Trip): Trip | null {
  return parseTrip(
    JSON.stringify({
      ...current,
      days: Math.max(current.days, incoming.days),
      items: [
        ...current.items,
        ...incoming.items.filter(
          (item) => !current.items.some((old) => old.id === item.id),
        ),
      ],
    }),
  )
}

export function tripDate(start: string | undefined, day: number) {
  if (!start || !day) return ''
  const date = new Date(`${start}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + day - 1)
  return date.toISOString().slice(0, 10)
}
