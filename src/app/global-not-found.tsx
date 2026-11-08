import type { Metadata } from 'next'
import Link from 'next/link'
import Atmosphere, { AppearanceControls } from '@/components/Atmosphere'
import ThemeScript from '@/components/ThemeScript'
import ja from '@/i18n/dictionaries/ja.json'
import { i18n } from '@/i18n/config'
import './globals.css'

export const metadata: Metadata = {
  title: '404 | Japan Travel',
  robots: { index: false, follow: false },
}
export default function GlobalNotFound() {
  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      {/* Extensions can add body attributes before hydration; descendants remain checked. */}
      <body suppressHydrationWarning>
        <Atmosphere>
          <AppearanceControls copy={ja.atmosphere} />
          <main className="error-page">
            <span className="brand-mark" aria-hidden="true">
              日
            </span>
            <p>404</p>
            <h1>道に迷ってしまったようです。</h1>
            <p>お探しのページが見つかりません。</p>
            <p lang="en">
              This page could not be found. Let’s find your next destination.
            </p>
            <div className="error-actions">
              {i18n.locales.map((locale) => (
                <Link key={locale} className="button" href={`/${locale}`} lang={locale}>
                  {{ ja: '日本語のホームへ', en: 'Explore in English', th: 'กลับหน้าแรกภาษาไทย', ko: '한국어 홈으로', 'zh-CN': '返回中文首页', vi: 'Về trang chủ tiếng Việt', fr: 'Accueil en français', es: 'Inicio en español' }[locale]}
                </Link>
              ))}
            </div>
          </main>
        </Atmosphere>
      </body>
    </html>
  )
}
