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
      setIsScrolled(window.scrollY > 10)
    }
    
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen])

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

  // Calculate text values once to prevent hydration mismatch
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
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="flex items-center">
              <span className="text-3xl mr-2">🌸</span>
              <span className={`font-bold text-lg ${isScrolled ? 'text-cherry-pink-600' : 'text-cherry-pink-500'}`}>
                {siteTitle}
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isScrolled ? 'text-gray-800' : 'text-gray-800'
                } hover:text-cherry-pink-600 px-3 py-2 text-sm font-medium transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1 bg-cherry-pink-50 border border-cherry-pink-200 text-cherry-pink-700 rounded-full font-medium text-sm hover:bg-cherry-pink-100 transition-colors duration-200"
            >
              {langToggleText}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              } hover:text-cherry-pink-600 focus:outline-none`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-cherry-pink-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-cherry-pink-600 hover:bg-cherry-pink-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle - Mobile */}
            <button
              onClick={() => {
                toggleLanguage()
                setIsMenuOpen(false)
              }}
              className="mt-3 w-full text-center px-4 py-2 bg-cherry-pink-50 border border-cherry-pink-200 text-cherry-pink-700 rounded-md font-medium hover:bg-cherry-pink-100 transition-colors duration-200"
            >
              {lang === 'ja' ? 'English' : '日本語'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
