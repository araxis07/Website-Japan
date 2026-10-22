'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'

export default function Navigation({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const alternate = lang === 'ja' ? 'en' : 'ja'
  const links = ['destinations', 'regions', 'seasons', 'plan'] as const

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
        <Link href={`/${lang}`} className="brand" aria-label={dict.brand}>
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
          <Link
            className="language-link"
            href={pathname.replace(/^\/(ja|en)(?=\/|$)/, `/${alternate}`)}
            hrefLang={alternate}
            lang={alternate}
            aria-label={lang === 'ja' ? 'Switch to English' : '日本語に切り替え'}
          >
            <Icon name="globe" />
            <span>{alternate === 'en' ? 'EN' : '日本語'}</span>
          </Link>
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
