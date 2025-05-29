'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Locale } from '@/i18n/config'

interface ClientNavigationWrapperProps {
  dict: any
  lang: Locale
}

const ClientNavigationWrapper = ({ dict, lang }: ClientNavigationWrapperProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    setMounted(true)
  }, [])

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

  // For server/client consistency, don't show language-dependent elements until mounted
  const langToggleText = mounted ? (lang === 'ja' ? 'EN' : '日本語') : ''
  const siteTitle = mounted ? (lang === 'ja' ? '日本旅行' : 'Japan Travel') : ''
  return (    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl z-50 border-b border-cherry-pink-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-cherry-pink-400 to-sakura-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-white/30">
              <span className="text-white font-bold text-2xl">🌸</span>
            </div>
            <span className="text-3xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">{siteTitle}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {mounted && menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-cherry-pink-600 transition-colors duration-200 font-medium text-lg group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
              {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-5 py-2.5 bg-gradient-to-r from-cherry-pink-400 to-sakura-400 text-white rounded-full text-sm font-bold hover:from-cherry-pink-500 hover:to-sakura-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-white/30"
            >
              {langToggleText}
            </button>
          </div>          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-gradient-to-r from-cherry-pink-400 to-sakura-400 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/30"
            >
              {langToggleText}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-cherry-pink-600 transition-colors duration-200 p-2 rounded-lg hover:bg-cherry-pink-50"
              aria-label="Toggle mobile menu"
              title="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>        {/* Enhanced Mobile Menu */}
        {isMenuOpen && mounted && (
          <div className="md:hidden absolute left-0 right-0 px-4">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-white/95 backdrop-blur-lg rounded-2xl mt-2 shadow-2xl border border-cherry-pink-200 mx-auto max-w-sm animate-fade-in">
              {menuItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-5 py-3.5 text-gray-700 hover:text-cherry-pink-600 hover:bg-gradient-to-r hover:from-cherry-pink-50 hover:to-sakura-50 rounded-xl transition-all duration-300 font-medium stagger-animation`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">{index === 0 ? '🏠' : index === 1 ? '🗾' : index === 2 ? '🎌' : index === 3 ? 'ℹ️' : '✉️'}</span>
                  {item.name}
                </Link>
              ))}
              <div className="h-1 w-1/3 mx-auto bg-gradient-to-r from-cherry-pink-300 to-sakura-300 rounded-full mt-2 opacity-50"></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default ClientNavigationWrapper
