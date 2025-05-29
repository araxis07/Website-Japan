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
  title: "日本旅行ガイド | Japan Travel Guide",
  description: "日本の美しい地域と観光地を発見しよう | Discover Japan's beautiful regions and destinations",
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
    <html lang={lang || 'ja'} className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className={fontClass} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
