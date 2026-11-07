'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { i18n, localeNames, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'
import BrandMark from './BrandMark'
import { usePageLocation } from './usePageLocation'
import { AppearanceControls } from './Atmosphere'

export default function Navigation({
  dict,
  lang,
  appearance,
}: {
  dict: Pick<Dictionary, 'brand' | 'brandSub'> & {
    navigation: Pick<
      Dictionary['navigation'],
      'explore' | 'journeys' | 'label' | 'language' | 'close' | 'menu' | 'helpShort'
    >
    beginner: Pick<Dictionary['beginner'], 'nav' | 'heading'>
    trip: Pick<Dictionary['trip'], 'title'>
    tools: Pick<Dictionary['tools'], 'emergency' | 'place'>
  }
  lang: Locale
  appearance: Dictionary['atmosphere']
}) {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const suffix = usePageLocation()
  const closeMenu = () => setOpen(false)
  useEffect(() => {
    const element = header.current
    if (!element) return
    const root = document.documentElement
    const measure = () =>
      root.style.setProperty(
        '--site-header-height',
        `${element.getBoundingClientRect().height}px`,
      )
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    const frame = requestAnimationFrame(() => {
      if (document.activeElement !== document.body || !window.location.hash) return
      let id = window.location.hash.slice(1)
      try {
        id = decodeURIComponent(id)
      } catch {
        return
      }
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      root.style.removeProperty('--site-header-height')
    }
  }, [])
  const links = [
    { href: `/${lang}/first-visit`, label: dict.beginner.nav },
    { href: `/${lang}/explore`, label: dict.navigation.explore },
    { href: `/${lang}#journeys`, label: dict.navigation.journeys },
  ]

  return (
    <header
      ref={header}
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          toggle.current?.focus()
        }
      }}
    >
      <noscript>
        <style>{'.site-header{position:static}'}</style>
      </noscript>
      <div className="container header-inner">
        <Link href={`/${lang}`} className="brand" onNavigate={closeMenu}>
          <BrandMark />
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
              onNavigate={closeMenu}
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
          <Link href={`/${lang}/first-visit#help`} onNavigate={closeMenu}>
            {dict.tools.emergency}
          </Link>
        </nav>
        <div className="header-actions">
          <AppearanceControls copy={appearance} />
          <Link
            className="header-trip"
            href={`/${lang}/my-trip`}
            aria-current={pathname === `/${lang}/my-trip` ? 'page' : undefined}
            onNavigate={closeMenu}
          >
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
                  onNavigate={closeMenu}
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
        <Link
          href={`/${lang}/explore?scope=places&view=list`}
          aria-current={pathname === `/${lang}/explore` ? 'page' : undefined}
          onNavigate={closeMenu}
        >
          <Icon name="search" />
          {dict.tools.place}
        </Link>
        <Link
          href={`/${lang}/my-trip`}
          aria-current={pathname === `/${lang}/my-trip` ? 'page' : undefined}
          onNavigate={closeMenu}
        >
          {dict.trip.title}
        </Link>
        <Link
          href={`/${lang}/first-visit#help`}
          aria-label={dict.tools.emergency}
          onNavigate={closeMenu}
        >
          {dict.navigation.helpShort}
        </Link>
      </nav>
      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        hidden={!open}
        aria-label={dict.navigation.label}
      >
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onNavigate={closeMenu}>
            {label}
            <Icon name="arrow" />
          </Link>
        ))}
        <Link href={`/${lang}/first-visit#help`} onNavigate={closeMenu}>
          {dict.tools.emergency}
        </Link>
      </nav>
    </header>
  )
}
