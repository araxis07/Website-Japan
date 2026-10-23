import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { i18n, isLocale, ogLocales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { siteUrl } from '@/utils/site'
import TripProvider from '@/components/TripProvider'
import Atmosphere from '@/components/Atmosphere'
import { themeInit } from '@/lib/appearance'
import JourneyEffects from '@/components/JourneyEffects'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import '../globals.css'
import 'leaflet/dist/leaflet.css'

export const dynamicParams = false
export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}
export const viewport: Viewport = {
  themeColor: '#f6f2e9',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: {
      default: `${dict.brand} | ${dict.hero.eyebrow}`,
      template: `%s | ${dict.brand}`,
    },
    description: dict.footer.description,
    icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
    manifest: '/manifest.webmanifest',
    openGraph: {
      type: 'website',
      siteName: dict.brand,
      locale: ogLocales[lang],
      alternateLocale: i18n.locales
        .filter((locale) => locale !== lang)
        .map((locale) => ogLocales[locale]),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      {/* Extensions can add body attributes before hydration; descendants remain checked. */}
      <body id="top" suppressHydrationWarning>
        <a className="skip-link" href="#main-content">
          {dict.a11y.skip}
        </a>
        <Atmosphere copy={dict.atmosphere}>
          <TripProvider copy={dict.trip} lang={lang}>
            <JourneyEffects />
            <Navigation dict={dict} lang={lang} />
            {children}
            <Footer dict={dict} lang={lang} />
          </TripProvider>
        </Atmosphere>
      </body>
    </html>
  )
}
