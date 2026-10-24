/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  devIndicators: { position: 'bottom-right' }, // Keep the theme controls clickable in development.
  experimental: { globalNotFound: true },
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [{ source: '/', destination: '/ja', permanent: false }]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "frame-src 'none'",
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://tile.openstreetmap.org",
              `connect-src 'self' https://tile.openstreetmap.org${process.env.NODE_ENV === 'development' ? ' ws: wss:' : ''}`,
              "font-src 'self' data:",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default process.env.ANALYZE === 'true'
  ? (await import('@next/bundle-analyzer')).default({ enabled: true })(
      nextConfig,
    )
  : nextConfig
