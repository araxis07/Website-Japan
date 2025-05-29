import type { Metadata } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import "../globals.css"
import { i18n, type Locale } from '@/i18n/config'

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
  keywords: "Japan, travel, tourism, regions, destinations, 日本, 旅行, 観光, 地域, 観光地",
  authors: [{ name: "Japan Travel Guide" }],  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    minimumScale: 1
  },
  openGraph: {
    title: "Japan Travel Guide - Discover Beautiful Japan",
    description: "Explore Japan's 9 regions and 47 prefectures with our comprehensive travel guide",
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Travel Guide",
    description: "Discover Japan's beautiful regions and destinations",
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
  const fontClass = lang === 'ja' ? 'font-noto-sans-jp' : 'font-inter'
  
  return (
    <html lang={lang || 'ja'} className={`${inter.variable} ${notoSansJP.variable} scroll-smooth`}>
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
