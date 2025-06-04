import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Japan Travel Guide',
    short_name: 'Japan Travel',
    description: 'Comprehensive guide to travel across Japan',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdf9f9',
    theme_color: '#eb5757',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    lang: 'ja',
    dir: 'ltr',
    prefer_related_applications: false,
    related_applications: [],
    categories: ['travel', 'tourism', 'japan'],
    screenshots: [
      {
        src: '/screenshots/homepage.jpg',
        sizes: '1080x1920',
        type: 'image/jpeg',
        form_factor: 'narrow',
        label: 'Homepage of Japan Travel Guide'
      },
      {
        src: '/screenshots/regions.jpg',
        sizes: '1080x1920',
        type: 'image/jpeg',
        form_factor: 'narrow',
        label: 'Regions of Japan'
      }
    ]
  }
}
