import type { Metadata } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import "../globals.css"
import { i18n, type Locale } from '@/i18n/config'
import { generateTravelGuideSchema, generateTouristDestinationSchema, generateBreadcrumbSchema } from '@/utils/schema'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: "日本旅行ガイド | Japan Travel Guide - Discover Beautiful Japan",
  description: "日本の美しい地域と観光地を発見しよう。47都道府県、9地域の魅力的な旅行情報をお届けします。| Discover Japan's beautiful regions and destinations with comprehensive travel information.",
  keywords: "Japan, travel, tourism, regions, destinations, sakura, cherry blossom, Tokyo, Kyoto, Osaka, Hokkaido, Okinawa, 日本, 旅行, 観光, 地域, 観光地, 桜, 東京, 京都, 大阪, 北海道, 沖縄",
  authors: [{ name: "Japan Travel Guide" }],
  creator: "Japan Travel Guide Team",
  publisher: "Japan Travel Guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#eb5757',
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    minimumScale: 1
  },
  alternates: {
    canonical: 'https://japantravel-guide.com',
    languages: {
      'ja': 'https://japantravel-guide.com/ja',
      'en': 'https://japantravel-guide.com/en'
    }
  },
  openGraph: {
    title: "Japan Travel Guide - Discover Beautiful Japan",
    description: "Explore Japan's 9 regions and 47 prefectures with our comprehensive travel guide",
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    images: [
      {
        url: 'https://japantravel-guide.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Japan Travel Guide - Cherry blossoms and Mount Fuji'
      }
    ],
    siteName: 'Japan Travel Guide',
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Travel Guide",
    description: "Discover Japan's beautiful regions and destinations",
    images: ['https://japantravel-guide.com/twitter-image.jpg'],
    creator: '@japantravelguide',
    site: '@japantravelguide',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  // Use a safer approach to avoid hydration mismatches  
  const fontClass = lang === 'ja' ? 'font-japanese' : 'font-english'
    return (
    <html lang={lang || 'ja'} className={`${inter.variable} ${notoSansJP.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateTravelGuideSchema(lang),
              generateTouristDestinationSchema(lang),
              generateBreadcrumbSchema(lang)
            ])
          }}
        />
      </head>
      <body className={`${fontClass} antialiased bg-warm-white text-gray-800`} suppressHydrationWarning>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-white text-cherry-pink-600 p-3 m-3 focus:outline-none focus:ring-2 focus:ring-cherry-pink-500 border border-cherry-pink-200 rounded-md shadow-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
