import type { Locale } from '@/i18n/config'
import { destinations } from './travel'
import { prefecturePlaces } from './prefecture-places'

export type Place = {
  id: string
  category: 'museum' | 'nature' | 'culture' | 'city'
  destination: string
  coordinates: [number, number]
  names: Record<Locale, string>
  prefecture?: string
  query?: string
  address?: string
  source?: string
}
export { guidePlaces as spots } from './guide-places'
import { guidePlaces as spots } from './guide-places'
const bases: Record<string, [number, number]> = {
  kyoto: [35.0116, 135.7681],
  tokyo: [35.6762, 139.6503],
  'mount-fuji': [35.497, 138.755],
  osaka: [34.6937, 135.5023],
  hokkaido: [43.0618, 141.3545],
  okinawa: [26.2124, 127.6809],
}
export const placeAliases: Record<string, string> = {
  'pref:hokkaido:odori-park': 'odori',
  'pref:okinawa:okinawa-prefectural-museum-and-art-museum': 'okinawa-museum',
  'pref:kyoto:kiyomizu-dera': 'kiyomizu',
  'pref:tokyo:sensoji': 'sensoji',
  'pref:tokyo:tokyo-national-museum': 'tokyo-museum',
  'pref:yamanashi:oishi-park': 'oishi',
  'pref:osaka:dotonbori': 'dotonbori',
  'pref:okinawa:makishi-public-market': 'makishi',
}
export const canonicalPlaceId = (id: string) =>
  Object.prototype.hasOwnProperty.call(placeAliases, id) ? placeAliases[id] : id
export const places: Place[] = [
  ...destinations.map((d) => ({
    id: `destination:${d.slug}`,
    destination: d.slug,
    category: 'city' as const,
    coordinates: bases[d.slug],
    names: { en: d.en.name, ja: d.ja.name, th: d.th.name },
  })),
  ...spots,
  ...prefecturePlaces.filter(
    (p) => !Object.prototype.hasOwnProperty.call(placeAliases, p.id),
  ),
]
export function mapUrl(
  place: Pick<Place, 'names' | 'address' | 'query' | 'destination'>,
  directions = false,
  mode?: 'walking' | 'transit',
) {
  const target =
    place.query ??
    `${place.names.ja} ${place.address || destinations.find((d) => d.slug === place.destination)?.ja.name || ''} 日本`
  return directions
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target)}${mode ? `&travelmode=${mode}` : ''}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(target)}`
}

export function distanceKm(a: Place['coordinates'], b: Place['coordinates']) {
  const radians = (n: number) => (n * Math.PI) / 180
  const d =
    Math.sin(radians(b[0] - a[0]) / 2) ** 2 +
    Math.cos(radians(a[0])) *
      Math.cos(radians(b[0])) *
      Math.sin(radians(b[1] - a[1]) / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, d)))
}

export function placePath(
  place: Pick<Place, 'id' | 'prefecture' | 'destination'>,
  lang: Locale,
) {
  return `/${lang}/${place.prefecture ? 'prefectures' : 'destinations'}/${place.prefecture ?? place.destination}#place-${canonicalPlaceId(place.id)}`
}

export const pinKind = (place: Pick<Place, 'category'>) =>
  place.category === 'city' ? 'pinArea' : 'pinVenue'
