import type { Locale } from '@/i18n/config'
import { reviewedAt } from '@/data/travel'
import { siteUrl } from './site'

const names = { ja: ['日本旅行ガイド', '日本', 'ホーム'], en: ['Japan Travel Guide', 'Japan', 'Home'], th: ['คู่มือเที่ยวญี่ปุ่น', 'ญี่ปุ่น', 'หน้าแรก'], ko: ['일본 여행 가이드', '일본', '홈'], 'zh-CN': ['日本旅行指南', '日本', '首页'], vi: ['Cẩm nang du lịch Nhật Bản', 'Nhật Bản', 'Trang chủ'], fr: ['Guide de voyage au Japon', 'Japon', 'Accueil'], es: ['Guía de viaje de Japón', 'Japón', 'Inicio'] }

export function generateTravelGuideSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: names[lang][0],
    inLanguage: lang,
    dateModified: reviewedAt,
    ...(siteUrl ? { url: `${siteUrl}/${lang}` } : {}),
    about: {
      '@type': 'Country',
      name: names[lang][1],
    },
  }
}

export function generateTouristDestinationSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: names[lang][1],
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
        name: names[lang][2],
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
