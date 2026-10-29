import type { Locale } from '@/i18n/config'
import { places, placePath } from '@/data/places'
import { prefecturePlaces } from '@/data/prefecture-places'

// Reports may include public guide context, never trip/query parameters.
export function reportContext(value: string, lang: Locale) {
  const path = value.split('?')[0].split('#')[0]
  const publicPages = [
    '',
    '/explore',
    '/first-visit',
    '/my-trip',
    '/about',
    '/credits',
  ].map((part) => `/${lang}${part}`)
  const valid =
    publicPages.includes(path) ||
    prefecturePlaces.some(
      (p) => p.prefecture && path === `/${lang}/prefectures/${p.prefecture}`,
    ) ||
    places.some((place) => placePath(place, lang).split('#')[0] === path)
  if (!valid) return `/${lang}/about`
  const hash = value.includes('#') ? value.slice(value.indexOf('#')) : ''
  return (
    path +
    (places.some((place) => placePath(place, lang) === path + hash) ? hash : '')
  )
}
