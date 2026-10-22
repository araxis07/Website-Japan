import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '日本旅行 | Japan Travel Guide',
    short_name: 'Japan Travel',
    description: 'Explore Japan through interactive scenery, local experiences and thoughtful travel routes.',
    start_url: '/ja',
    display: 'standalone',
    background_color: '#f6f2e9',
    theme_color: '#23333d',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
