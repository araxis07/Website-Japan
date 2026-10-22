import type { Locale } from '@/i18n/config'
import { reviewedAt } from '@/data/travel'
import { siteUrl } from './site'

export function generateTravelGuideSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name:
      lang === 'ja'
        ? '日本旅行ガイド'
        : lang === 'th'
          ? 'คู่มือเที่ยวญี่ปุ่น'
          : 'Japan Travel Guide',
    inLanguage: lang,
    dateModified: reviewedAt,
    ...(siteUrl ? { url: `${siteUrl}/${lang}` } : {}),
    about: {
      '@type': 'Country',
      name: lang === 'ja' ? '日本' : lang === 'th' ? 'ญี่ปุ่น' : 'Japan',
    },
  }
}

export function generateTouristDestinationSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: lang === 'ja' ? '日本' : lang === 'th' ? 'ญี่ปุ่น' : 'Japan',
    geo: { '@type': 'GeoCoordinates', latitude: 36.204824, longitude: 138.252924 },
  }
}

export function generateBreadcrumbSchema(
  lang: Locale,
  destination?: { name: string; slug: string },
) {
  if (!siteUrl) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'ja' ? 'ホーム' : lang === 'th' ? 'หน้าแรก' : 'Home',
        item: `${siteUrl}/${lang}`,
      },
      ...(destination
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: destination.name,
              item: `${siteUrl}/${lang}/destinations/${destination.slug}`,
            },
          ]
        : []),
    ],
  }
}
