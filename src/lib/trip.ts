import { places } from '@/data/places'

export const tripKey = 'japan-travel-trip-v1'
export type Trip = { version: 1; days: number; items: { id: string; day: number }[] }
export const emptyTrip: Trip = { version: 1, days: 7, items: [] }
const knownPlaces = new Set(places.map((place) => place.id))

export function parseTrip(raw: string): Trip | null {
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
    const ids = new Set<string>()
    for (const item of value.items) {
      if (
        !item ||
        !knownPlaces.has(item.id) ||
        ids.has(item.id) ||
        !Number.isInteger(item.day) ||
        item.day < 0 ||
        item.day > value.days
      )
        return null
      ids.add(item.id)
    }
    return {
      version: 1,
      days: value.days,
      items: value.items.map(({ id, day }: { id: string; day: number }) => ({ id, day })),
    }
  } catch {
    return null
  }
}
