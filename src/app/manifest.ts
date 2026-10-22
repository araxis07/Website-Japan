import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '日本旅行 | Japan Travel Guide',
    short_name: 'Japan Travel',
    description: 'Discover Japan’s destinations, regions and seasons.',
    start_url: '/ja',
    display: 'standalone',
    background_color: '#f8f9f6',
    theme_color: '#263c32',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
