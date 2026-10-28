'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { i18n, localeNames, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'
import { usePageLocation } from './usePageLocation'

export default function Navigation({
  dict,
  lang,
}: {
  dict: Pick<Dictionary, 'brand' | 'brandSub'> & {
    navigation: Pick<
      Dictionary['navigation'],
      'explore' | 'journeys' | 'label' | 'language' | 'close' | 'menu'
    >
    beginner: Pick<Dictionary['beginner'], 'nav' | 'heading'>
    trip: Pick<Dictionary['trip'], 'title'>
    tools: Pick<Dictionary['tools'], 'emergency' | 'place'>
  }
  lang: Locale
}) {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const suffix = usePageLocation()
  const links = [
    { href: `/${lang}/first-visit`, label: dict.beginner.nav },
    { href: `/${lang}/explore`, label: dict.navigation.explore },
    { href: `/${lang}#journeys`, label: dict.navigation.journeys },
  ]

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
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href ||
                (href.endsWith('/explore') &&
                  pathname.includes('/prefectures/')) ||
                (href.endsWith('#journeys') && suffix.endsWith('#journeys'))
                  ? 'page'
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
          <Link href={`/${lang}/first-visit#help`}>{dict.tools.emergency}</Link>
        </nav>
        <div className="header-actions">
          <Link className="header-trip" href={`/${lang}/my-trip`}>
            {dict.trip.title}
          </Link>
          <details className="language-picker">
            <summary
              aria-label={`${dict.navigation.language}: ${localeNames[lang]}`}
            >
              <Icon name="globe" />
              <span>{localeNames[lang]}</span>
            </summary>
            <div>
              {i18n.locales.map((locale) => (
                <Link
                  key={locale}
                  href={
                    pathname.replace(/^\/(ja|en|th)(?=\/|$)/, `/${locale}`) +
                    suffix
                  }
                  hrefLang={locale}
                  lang={locale}
                  aria-current={locale === lang ? 'page' : undefined}
                  onClick={(event) =>
                    event.currentTarget
                      .closest('details')
                      ?.removeAttribute('open')
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
      <nav className="mobile-task-nav" aria-label={dict.beginner.heading}>
        <Link href={`/${lang}/explore?scope=places&view=list`}>
          <Icon name="search" />
          {dict.tools.place}
        </Link>
        <Link href={`/${lang}/my-trip`}>{dict.trip.title}</Link>
        <Link href={`/${lang}/first-visit#help`}>{dict.tools.emergency}</Link>
      </nav>
      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        hidden={!open}
        aria-label={dict.navigation.label}
      >
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <Icon name="arrow" />
          </Link>
        ))}
        <Link href={`/${lang}/first-visit#help`} onClick={() => setOpen(false)}>
          {dict.tools.emergency}
        </Link>
      </nav>
    </header>
  )
}
