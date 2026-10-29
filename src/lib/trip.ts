import { places, canonicalPlaceId } from '@/data/places'
import type { Locale } from '@/i18n/config'

// Keep the storage key and accept old version-1 plans without additional fields.
export const tripKey = 'japan-travel-trip-v1'
export const maxTripBytes = 512_000
// Local record identifiers also work on HTTP previews; they are not credentials.
export const tripId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(16)), (n) =>
    n.toString(16).padStart(2, '0'),
  ).join('')
export const dayLabel = (day: number, lang: Locale, label: string) =>
  lang === 'ja' ? `${day}${label}` : `${label} ${day}`
export const budgetFields = ['stay', 'transport', 'food', 'activities'] as const
export const missingBudget = (trip: Trip) =>
  budgetFields.filter((field) => trip.budget?.[field] === undefined)
export type TripEntry = {
  id: string
  day: number
  entryId?: string
  time?: string
  note?: string
  duration?: number
  buffer?: number
  custom?: {
    name: string
    address: string
    url?: string
    coordinates?: [number, number]
  }
}
export function tripPlace(entry: TripEntry) {
  if (!entry.custom) return places.find((place) => place.id === entry.id)!
  return {
    id: entry.id,
    category: 'city' as const,
    destination: '',
    names: {
      en: entry.custom.name,
      ja: entry.custom.name,
      th: entry.custom.name,
    },
    address: entry.custom.address,
    query: `${entry.custom.name} ${entry.custom.address}`,
    coordinates: entry.custom.coordinates,
    prefecture: undefined,
  }
}
export const entryKey = (item: TripEntry) => item.entryId || item.id
export type Trip = {
  version: 1
  days: number
  items: TripEntry[]
  travelers?: number
  stays?: {
    id?: string
    name: string
    address?: string
    placeId?: string
    from: number
    to: number
  }[]
  title?: string
  startDate?: string
  base?: string
  notes?: Record<string, string>
  budget?: Partial<Record<'stay' | 'transport' | 'food' | 'activities', number>>
  preparation?: string[]
  fx?: { currency: 'THB' | 'USD' | 'EUR'; rate: number; date: string }
}
export const emptyTrip: Trip = { version: 1, days: 7, items: [] }
const knownPlaces = new Set(places.map((place) => place.id))
const text = (v: unknown, max: number) =>
  typeof v === 'string' &&
  v.length <= max &&
  !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v)

export function parseTrip(raw: string): Trip | null {
  if (new TextEncoder().encode(raw).byteLength > maxTripBytes) return null
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
    if (value.preparation !== undefined) {
      if (
        !Array.isArray(value.preparation) ||
        value.preparation.length > 6 ||
        new Set(value.preparation).size !== value.preparation.length ||
        value.preparation.some(
          (id: unknown) =>
            typeof id !== 'string' ||
            ![
              'documents',
              'airport',
              'transport',
              'essentials',
              'etiquette',
              'help',
            ].includes(id),
        )
      )
        return null
      result.preparation = value.preparation
    }
    if (value.fx !== undefined) {
      const fx = value.fx
      if (
        !fx ||
        !['THB', 'USD', 'EUR'].includes(fx.currency) ||
        typeof fx.rate !== 'number' ||
        !Number.isFinite(fx.rate) ||
        fx.rate <= 0 ||
        fx.rate > 1000000 ||
        typeof fx.date !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(fx.date) ||
        !Number.isFinite(Date.parse(`${fx.date}T12:00:00Z`)) ||
        new Date(`${fx.date}T12:00:00Z`).toISOString().slice(0, 10) !== fx.date
      )
        return null
      result.fx = { currency: fx.currency, rate: fx.rate, date: fx.date }
    }
    const originalIds = new Set<string>()
    for (const item of value.items) {
      if (
        !item ||
        typeof item.id !== 'string' ||
        !(
          knownPlaces.has(canonicalPlaceId(item.id)) ||
          /^custom-[a-f0-9]{32}$/.test(item.id)
        ) ||
        originalIds.has(item.entryId || item.id) ||
        !Number.isInteger(item.day) ||
        item.day < 0 ||
        item.day > value.days
      )
        return null
      if (item.id.startsWith('custom-')) {
        if (
          !item.custom ||
          !text(item.custom.name, 160) ||
          !item.custom.name.trim() ||
          !text(item.custom.address, 300) ||
          !item.custom.address.trim()
        )
          return null
        if (item.custom.url !== undefined) {
          if (!text(item.custom.url, 1000)) return null
          const url = new URL(item.custom.url)
          if (url.protocol !== 'https:' || url.username || url.password)
            return null
        }
        const coordinates = item.custom.coordinates
        if (
          coordinates !== undefined &&
          (!Array.isArray(coordinates) ||
            coordinates.length !== 2 ||
            coordinates.some(
              (value: unknown) =>
                typeof value !== 'number' || !Number.isFinite(value),
            ) ||
            Math.abs(coordinates[0]) > 90 ||
            Math.abs(coordinates[1]) > 180)
        )
          return null
        const other = result.items.find((entry) => entry.id === item.id)?.custom
        if (
          other &&
          (other.name !== item.custom.name ||
            other.address !== item.custom.address ||
            other.url !== item.custom.url ||
            JSON.stringify(other.coordinates) !== JSON.stringify(coordinates))
        )
          return null
      } else if (item.custom !== undefined) return null
      if (
        item.time !== undefined &&
        (typeof item.time !== 'string' ||
          !/^$|^([01]\d|2[0-3]):[0-5]\d$/.test(item.time))
      )
        return null
      if (item.note !== undefined && !text(item.note, 500)) return null
      if (
        item.entryId !== undefined &&
        (typeof item.entryId !== 'string' ||
          !/^[a-zA-Z0-9_-]{1,80}$/.test(item.entryId) ||
          knownPlaces.has(item.entryId))
      )
        return null
      for (const key of ['duration', 'buffer'] as const) {
        if (
          item[key] !== undefined &&
          (!Number.isInteger(item[key]) || item[key] < 0 || item[key] > 1440)
        )
          return null
      }
      originalIds.add(item.entryId || item.id)
      const id = canonicalPlaceId(item.id)
      const existing = result.items.find(
        (entry) => !entry.entryId && !item.entryId && entry.id === id,
      )
      // Legacy aliases describe the same place: keep the first scheduled visit.
      if (existing) {
        for (const key of ['time', 'note'] as const) {
          if (existing[key] && item[key] && existing[key] !== item[key])
            return null
          if (!existing[key] && item[key]) existing[key] = item[key]
        }
        for (const key of ['duration', 'buffer'] as const) {
          if (
            existing[key] !== undefined &&
            item[key] !== undefined &&
            existing[key] !== item[key]
          )
            return null
          if (existing[key] === undefined && item[key] !== undefined)
            existing[key] = item[key]
        }
        if (!existing.day) existing.day = item.day
        continue
      }
      result.items.push({
        id,
        day: item.day,
        ...(item.entryId !== undefined ? { entryId: item.entryId } : {}),
        ...(item.duration !== undefined ? { duration: item.duration } : {}),
        ...(item.buffer !== undefined ? { buffer: item.buffer } : {}),
        ...(item.time !== undefined ? { time: item.time } : {}),
        ...(item.note !== undefined ? { note: item.note } : {}),
        ...(item.custom
          ? {
              custom: {
                name: item.custom.name,
                address: item.custom.address,
                ...(item.custom.url !== undefined
                  ? { url: item.custom.url }
                  : {}),
                ...(item.custom.coordinates !== undefined
                  ? {
                      coordinates: [...item.custom.coordinates] as [
                        number,
                        number,
                      ],
                    }
                  : {}),
              },
            }
          : {}),
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
    if (value.travelers !== undefined) {
      if (
        !Number.isInteger(value.travelers) ||
        value.travelers < 1 ||
        value.travelers > 30
      )
        return null
      result.travelers = value.travelers
    }
    if (value.stays !== undefined) {
      if (!Array.isArray(value.stays) || value.stays.length > 30) return null
      result.stays = []
      for (const [index, stay] of value.stays.entries()) {
        if (
          !stay ||
          !text(stay.name, 160) ||
          !Number.isInteger(stay.from) ||
          !Number.isInteger(stay.to) ||
          stay.from < 1 ||
          stay.from > 30 ||
          stay.to <= stay.from ||
          stay.to > 31
        )
          return null
        const id = stay.id ?? `stay-${index}`
        if (
          typeof id !== 'string' ||
          !/^[a-zA-Z0-9_-]{1,80}$/.test(id) ||
          result.stays.some((other) => other.id === id)
        )
          return null
        if (stay.address !== undefined && !text(stay.address, 300)) return null
        if (stay.placeId !== undefined) {
          const place = result.items.find(
            (item) => item.id === stay.placeId,
          )?.custom
          if (
            !place ||
            place.name !== stay.name ||
            place.address !== stay.address
          )
            return null
        }
        result.stays.push({
          id,
          name: stay.name,
          from: stay.from,
          to: stay.to,
          ...(stay.address !== undefined ? { address: stay.address } : {}),
          ...(stay.placeId !== undefined ? { placeId: stay.placeId } : {}),
        })
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
        ...incoming.items
          .filter(
            (item) =>
              !current.items.some((old) => entryKey(old) === entryKey(item)),
          )
          .map((item) => {
            const custom = current.items.find(
              (old) => old.id === item.id,
            )?.custom
            return custom ? { ...item, custom } : item
          }),
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

export function japanDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  return ['year', 'month', 'day']
    .map((type) => parts.find((part) => part.type === type)!.value)
    .join('-')
}

// Preserve notes and accommodation after shortening a trip; never silently discard them.
export function tripDays(trip: Trip) {
  return [
    ...new Set([
      0,
      ...Array.from({ length: trip.days }, (_, i) => i + 1),
      ...Object.keys(trip.notes || {})
        .filter((day) => trip.notes![day])
        .map(Number),
    ]),
  ].sort((a, b) => a - b)
}
export const timeMinutes = (time: string) =>
  Number(time.slice(0, 2)) * 60 + Number(time.slice(3))
export function conflictPairs(entries: TripEntry[]) {
  return entries.flatMap((entry, index) => {
    if (!entry.time) return []
    const start = timeMinutes(entry.time)
    return entries
      .slice(index + 1)
      .filter((other) => {
        if (!other.time) return false
        const next = timeMinutes(other.time)
        return (
          start === next ||
          (start < next
            ? start + (entry.duration || 0) + (entry.buffer || 0) > next
            : next + (other.duration || 0) + (other.buffer || 0) > start)
        )
      })
      .map((other) => [entry, other] as const)
  })
}
export const overlaps = (entries: TripEntry[]) =>
  conflictPairs(entries).length > 0
export function publicTrip(trip: Trip): Trip {
  return {
    version: 1,
    days: trip.days,
    items: trip.items
      .filter((item) => !item.custom)
      // Imported visit identifiers can contain private references.
      .map(({ id, day, entryId }) => ({
        id,
        day,
        ...(entryId ? { entryId: tripId() } : {}),
      })),
  }
}
export function tripFilename(extension: 'json' | 'html' | 'ics') {
  return `japan-trip-${new Date().toISOString().replace(/[:.]/g, '-')}.${extension}`
}
