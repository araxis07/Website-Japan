/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ],
      },
    ]
  },
}

export default process.env.ANALYZE === 'true'
  ? (await import('@next/bundle-analyzer')).default({ enabled: true })(nextConfig)
  : nextConfig
