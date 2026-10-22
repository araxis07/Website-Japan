import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { i18n, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { siteUrl } from '@/utils/site'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import '../globals.css'

export const dynamicParams = false
export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}
export const viewport: Viewport = { themeColor: '#263c32', width: 'device-width', initialScale: 1 }

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
    title: { default: `${dict.brand} | ${dict.hero.eyebrow}`, template: `%s | ${dict.brand}` },
    description: dict.footer.description,
    icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
    manifest: '/manifest.webmanifest',
    openGraph: {
      type: 'website',
      siteName: dict.brand,
      locale: lang === 'ja' ? 'ja_JP' : 'en_US',
      alternateLocale: lang === 'ja' ? 'en_US' : 'ja_JP',
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
    <html lang={lang}>
      <body id="top">
        <a className="skip-link" href="#main-content">
          {dict.a11y.skip}
        </a>
        <Navigation dict={dict} lang={lang} />
        {children}
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  )
}
