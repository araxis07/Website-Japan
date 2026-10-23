import type { Metadata } from 'next'
import Link from 'next/link'
import Atmosphere from '@/components/Atmosphere'
import { themeInit } from '@/lib/appearance'
import ja from '@/i18n/dictionaries/ja.json'
import './globals.css'

export const metadata: Metadata = {
  title: '404 | Japan Travel',
  robots: { index: false, follow: false },
}
export default function GlobalNotFound() {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      {/* Extensions can add body attributes before hydration; descendants remain checked. */}
      <body suppressHydrationWarning>
        <Atmosphere copy={ja.atmosphere}>
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
              <Link className="button" href="/ja">
                日本語のホームへ
              </Link>
              <Link className="button" href="/en" lang="en">
                Explore in English
              </Link>
              <Link className="button" href="/th" lang="th">
                กลับหน้าแรกภาษาไทย
              </Link>
            </div>
          </main>
        </Atmosphere>
      </body>
    </html>
  )
}
