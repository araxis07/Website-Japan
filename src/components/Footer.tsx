import Link from 'next/link'
import { reviewedAt } from '@/data/travel'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'

export default function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href={`/${lang}`} className="brand">
              <span className="brand-mark" aria-hidden="true">
                日
              </span>
              <strong>{dict.brand}</strong>
            </Link>
            <h2>{dict.footer.title}</h2>
            <p>{dict.footer.description}</p>
          </div>
          <div>
            <h3>{dict.footer.explore}</h3>
            <nav aria-label={dict.footer.explore}>
              <Link href={`/${lang}/first-visit`}>{dict.beginner.nav}</Link>
              <Link href={`/${lang}/explore`}>{dict.navigation.explore}</Link>
              {(
                [
                  'destinations',
                  'map',
                  'experiences',
                  'regions',
                  'seasons',
                  'journeys',
                  'plan',
                ] as const
              ).map((key) => (
                <Link key={key} href={`/${lang}#${key}`}>
                  {dict.navigation[key]}
                </Link>
              ))}
              <Link href={`/${lang}/my-trip`}>{dict.trip.title}</Link>
            </nav>
          </div>
          <div className="footer-about" id="about">
            <h3>{dict.footer.about}</h3>
            <p>{dict.footer.aboutText}</p>
            <p className="review-date">
              {dict.footer.reviewed} <time dateTime={reviewedAt}>{reviewedAt}</time>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {reviewedAt.slice(0, 4)} {dict.footer.copyright}
          </p>
          <p>{dict.footer.disclaimer}</p>
          <Link href={`/${lang}/credits`}>{dict.footer.credits}</Link>
          <a href="#top">
            {dict.footer.top}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="footer-languages" aria-label={dict.navigation.language}>
          <Link href="/ja" hrefLang="ja" lang="ja">
            日本語
          </Link>
          <Link href="/en" hrefLang="en" lang="en">
            English
          </Link>
          <Link href="/th" hrefLang="th" lang="th">
            ไทย
          </Link>
          <a href="https://www.japan.travel/en/">
            JNTO <Icon name="external" />
          </a>
        </div>
      </div>
    </footer>
  )
}
