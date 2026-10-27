import type { Locale } from '@/i18n/config'
import { places, placePath } from '@/data/places'
import { prefectures } from '@/data/prefectures'

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
    prefectures.some((p) => path === `/${lang}/prefectures/${p.slug}`) ||
    places.some((place) => placePath(place, lang).split('#')[0] === path)
  if (!valid) return `/${lang}/about`
  const hash = value.includes('#') ? value.slice(value.indexOf('#')) : ''
  return (
    path +
    (places.some((place) => placePath(place, lang) === path + hash) ? hash : '')
  )
}
