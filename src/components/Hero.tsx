import Image from 'next/image'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image src="/images/fuji.jpg" alt="" fill preload sizes="100vw" className="hero-image" />
      <div className="hero-shade" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span />
            {dict.hero.eyebrow}
          </p>
          <h1 id="hero-title">{dict.hero.title}</h1>
          <p className="hero-description">{dict.hero.subtitle}</p>
          <div className="hero-actions">
            <a href="#destinations" className="button button-white">
              {dict.hero.cta}
              <Icon name="arrow" />
            </a>
            <a href="#plan" className="hero-secondary">
              {dict.hero.secondary}
            </a>
          </div>
        </div>
        <p className="hero-japanese" lang="ja" aria-hidden="true">
          日本を、旅する。
        </p>
        <div className="hero-bottom">
          <span>
            <Icon name="pin" />
            {dict.hero.location}
          </span>
          <span>{dict.hero.caption}</span>
          <a href="#destinations" aria-label={dict.hero.cta} className="scroll-cue">
            ↓
          </a>
        </div>
      </div>
    </section>
  )
}
