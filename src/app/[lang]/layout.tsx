import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { i18n, isLocale, ogLocales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { siteUrl } from '@/utils/site'
import TripProvider from '@/components/TripProvider'
import Atmosphere from '@/components/Atmosphere'
import ThemeScript from '@/components/ThemeScript'
import JourneyEffects from '@/components/JourneyEffects'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { prefectures } from '@/data/prefectures'
import { travelNotices } from '@/data/travel-notices'
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
    manifest: `/${lang}.webmanifest`,
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: {
      default: `${dict.brand} | ${dict.hero.eyebrow}`,
      template: `%s | ${dict.brand}`,
    },
    description: dict.footer.description,
    icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
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
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      {/* Extensions can add body attributes before hydration; descendants remain checked. */}
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main-content">
          {dict.a11y.skip}
        </a>
        <Atmosphere>
          <TripProvider
            copy={dict.trip}
            tools={dict.tools}
            lang={lang}
            noticeAreaNames={Object.fromEntries(
              travelNotices.flatMap((notice) =>
                notice.areas.map((area) => [
                  area,
                  prefectures.find((p) => p.slug === area)!.names[lang],
                ]),
              ),
            )}
          >
            <JourneyEffects />
            <Navigation
              dict={{
                brand: dict.brand,
                brandSub: dict.brandSub,
                navigation: {
                  explore: dict.navigation.explore,
                  journeys: dict.navigation.journeys,
                  label: dict.navigation.label,
                  language: dict.navigation.language,
                  close: dict.navigation.close,
                  menu: dict.navigation.menu,
                },
                beginner: {
                  nav: dict.beginner.nav,
                  heading: dict.beginner.heading,
                },
                trip: { title: dict.trip.title },
                tools: {
                  emergency: dict.tools.emergency,
                  place: dict.tools.place,
                },
              }}
              lang={lang}
              appearance={dict.atmosphere}
            />
            {children}
            <Footer dict={dict} lang={lang} />
          </TripProvider>
        </Atmosphere>
      </body>
    </html>
  )
}
