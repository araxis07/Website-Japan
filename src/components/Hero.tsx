import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/i18n/config'
import { destinations } from '@/data/travel'
// Keep the eager cover distinct from lazy thumbnails in Next's image registry.
import kyotoPhoto from '../../public/images/kyoto.jpg'

export default function Hero({
  dict,
  lang,
}: {
  dict: Dictionary
  lang: Locale
}) {
  const kyoto = destinations.find((place) => place.slug === 'kyoto')!
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span />
            {dict.hero.eyebrow}
          </p>
          <h1 id="hero-title">{dict.hero.title}</h1>
          <p className="hero-description">{dict.hero.subtitle}</p>
          <div className="hero-actions">
            <Link href={`/${lang}/first-visit`} className="button">
              {dict.beginner.step1}
              <Icon name="arrow" />
            </Link>
            <Link href={`/${lang}/explore`} className="hero-secondary">
              {dict.navigation.explore}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-chapters">
            <a href="#culture">
              <span aria-hidden="true">01</span>{dict.identity.culture}
            </a>
            <a href="#miniature">
              <span aria-hidden="true">02</span>{dict.identity.miniature}
            </a>
            <a href="#destinations">
              <span aria-hidden="true">03</span>{dict.navigation.destinations}
            </a>
          </div>
        </div>
        <figure className="hero-photograph">
          <div className="hero-image">
            <Image
              src={kyotoPhoto}
              alt={kyoto[lang].imageAlt}
              fill
              loading="eager"
              sizes="(max-width: 750px) calc(100vw - 40px), (max-width: 1376px) 50vw, 680px"
            />
            <span className="hero-calligraphy" lang="ja" aria-hidden="true">
              日本の旅
            </span>
          </div>
          <figcaption>
            <span>
              <span className="hero-photo-number" aria-hidden="true">01 /</span>{' '}
              {kyoto[lang].name}
              {lang !== 'ja' && <span lang="ja" aria-hidden="true">京都</span>}
            </span>
            <Link href={`/${lang}/destinations/kyoto`}>
              {dict.destinations.guide} <Icon name="arrow" />
            </Link>
          </figcaption>
        </figure>
      </div>
      <div className="hero-bottom container">
        <span>{dict.hero.location}</span>
        <span lang="ja" aria-hidden="true">
          見つける・感じる・旅する
        </span>
        <a href="#destinations" className="scroll-cue">
          {dict.hero.scroll}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
