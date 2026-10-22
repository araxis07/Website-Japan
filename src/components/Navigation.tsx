'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { i18n, localeNames, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'

export default function Navigation({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const links = ['destinations', 'map', 'seasons', 'journeys', 'plan'] as const

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          toggle.current?.focus()
        }
      }}
    >
      <div className="container header-inner">
        <Link href={`/${lang}`} className="brand">
          <span className="brand-mark" aria-hidden="true">
            日
          </span>
          <span>
            <strong>{dict.brand}</strong>
            <small>{dict.brandSub}</small>
          </span>
        </Link>
        <nav className="desktop-navigation" aria-label={dict.navigation.label}>
          {links.map((id) => (
            <Link key={id} className={id === 'plan' ? 'nav-plan' : ''} href={`/${lang}#${id}`}>
              {dict.navigation[id]}
              {id === 'plan' && <Icon name="arrow" />}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="header-trip" href={`/${lang}/my-trip`}>
            {dict.trip.title}
          </Link>
          <details className="language-picker">
            <summary aria-label={`${dict.navigation.language}: ${localeNames[lang]}`}>
              <Icon name="globe" />
              <span>{localeNames[lang]}</span>
            </summary>
            <div>
              {i18n.locales.map((locale) => (
                <Link
                  key={locale}
                  href={pathname.replace(/^\/(ja|en|th)(?=\/|$)/, `/${locale}`)}
                  hrefLang={locale}
                  lang={locale}
                  aria-current={locale === lang ? 'page' : undefined}
                  onClick={(event) =>
                    event.currentTarget.closest('details')?.removeAttribute('open')
                  }
                >
                  {localeNames[locale]}
                </Link>
              ))}
            </div>
          </details>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? dict.navigation.close : dict.navigation.menu}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        hidden={!open}
        aria-label={dict.navigation.label}
      >
        {links.map((id) => (
          <Link key={id} href={`/${lang}#${id}`} onClick={() => setOpen(false)}>
            {dict.navigation[id]}
            <Icon name="arrow" />
          </Link>
        ))}
      </nav>
    </header>
  )
}
