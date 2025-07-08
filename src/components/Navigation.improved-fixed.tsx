'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n/config'

interface NavigationProps {
  dict: any
  lang: Locale
}

const Navigation = ({ dict, lang }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)
      }
    }
    
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    // Add passive event listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, isScrolled])

  const menuItems = [
    { name: dict.navigation.home, href: `/${lang}` },
    { name: dict.navigation.regions, href: `/${lang}#regions` },
    { name: dict.navigation.destinations, href: `/${lang}#destinations` },
    { name: dict.navigation.about, href: `/${lang}#about` },
    { name: dict.navigation.contact, href: `/${lang}#contact` },
  ]

  const toggleLanguage = () => {
    const newLang = lang === 'ja' ? 'en' : 'ja'
    router.push(`/${newLang}`)
  }

  const siteTitle = lang === 'ja' ? '日本旅行' : 'Japan Travel'
  const langToggleText = lang === 'ja' ? 'EN' : '日本語'

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 shadow-md backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with improved hover effect */}
          <div className="flex-shrink-0">
            <Link 
              href={`/${lang}`} 
              className="flex items-center group transition-transform duration-300 hover:scale-105"
            >
              <span className="text-3xl mr-2 transform group-hover:rotate-12 transition-transform duration-300">🌸</span>
              <span className={`font-bold text-lg ${
                isScrolled ? 'text-cherry-pink-600' : 'text-cherry-pink-500'
              } transition-colors duration-300`}>
                {siteTitle}
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu with improved hover effects */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link text-gray-800 hover:text-cherry-pink-600 px-3 py-2 text-sm font-medium transition-all duration-300"
                aria-label={item.name}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle with improved feedback */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-4 py-2 bg-cherry-pink-50 border border-cherry-pink-200 text-cherry-pink-700 rounded-full font-medium text-sm hover:bg-cherry-pink-100 active:bg-cherry-pink-200 transform hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500 focus-visible:ring-offset-2"
              aria-label={lang === 'ja' ? 'Switch to English' : '日本語に切り替え'}
            >
              {langToggleText}
            </button>
          </div>

          {/* Mobile menu button with improved touch target */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-cherry-pink-600 hover:text-cherry-pink-700 hover:bg-cherry-pink-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-around">
                <span className={`block w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu with improved animations */}
        <div
          className={`md:hidden transform transition-all duration-300 ${
            isMenuOpen
              ? 'translate-y-0 opacity-100 visible'
              : 'translate-y-2 opacity-0 invisible'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg rounded-lg shadow-lg mt-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-cherry-pink-600 hover:bg-cherry-pink-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLanguage()
                setIsMenuOpen(false)
              }}
              className="w-full text-left px-4 py-3 text-base font-medium text-cherry-pink-600 hover:text-cherry-pink-700 hover:bg-cherry-pink-50 rounded-md transition-colors duration-200"
            >
              {langToggleText}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
