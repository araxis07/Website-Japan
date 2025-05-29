'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Locale } from '@/i18n/config'
import { handleAnchorClick } from '@/utils/scrollTo'

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
    
    // Close mobile menu when resizing to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  // Fix for hydration mismatch: render same content on server and client
  const siteTitle = lang === 'ja' ? '日本旅行' : 'Japan Travel'
  const langToggleText = lang === 'ja' ? 'EN' : '日本語'

  return (
    <nav 
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl z-50 border-b border-cherry-pink-100 transition-all duration-300" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-cherry-pink-400 to-sakura-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-white/30">
              <span className="text-white font-bold text-2xl">🌸</span>
            </div>
            <span className="text-3xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
              {siteTitle}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => {
              // Check if this is an anchor link (contains #)
              const isAnchor = item.href.includes('#')
              const sectionId = isAnchor ? item.href.split('#')[1] : ''
              
              return isAnchor ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, sectionId)}
                  className="relative text-gray-700 hover:text-cherry-pink-600 focus:text-cherry-pink-600 transition-colors duration-200 font-medium text-lg group outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500 focus-visible:ring-offset-2 rounded-md px-2 py-1"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 group-hover:w-full group-focus:w-full transition-all duration-300"></span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 hover:text-cherry-pink-600 focus:text-cherry-pink-600 transition-colors duration-200 font-medium text-lg group outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500 focus-visible:ring-offset-2 rounded-md px-2 py-1"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 group-hover:w-full group-focus:w-full transition-all duration-300"></span>
                </Link>
              )
            })}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-5 py-2.5 bg-gradient-to-r from-cherry-pink-400 to-sakura-400 text-white rounded-full text-sm font-bold hover:from-cherry-pink-500 hover:to-sakura-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-white/30"
              aria-label={lang === 'ja' ? 'Switch to English' : '日本語に切り替える'}
            >
              {langToggleText}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-gradient-to-r from-cherry-pink-400 to-sakura-400 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/30"
              aria-label={lang === 'ja' ? 'Switch to English' : '日本語に切り替える'}
            >
              {langToggleText}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-cherry-pink-600 transition-colors duration-200 p-2 rounded-lg hover:bg-cherry-pink-50"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
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
        </div>
        
        {/* Enhanced Mobile Menu with animation */}
        <div 
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3 bg-white/95 backdrop-blur-lg rounded-2xl mt-2 shadow-2xl border border-cherry-pink-200 mx-auto max-w-sm transform transition-transform duration-300">
            {menuItems.map((item, index) => {
              // Check if this is an anchor link (contains #)
              const isAnchor = item.href.includes('#')
              const sectionId = isAnchor ? item.href.split('#')[1] : ''
              
              const className = `flex items-center px-5 py-3.5 text-gray-700 hover:text-cherry-pink-600 hover:bg-gradient-to-r hover:from-cherry-pink-50 hover:to-sakura-50 rounded-xl transition-all duration-300 font-medium transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-300 delay-${index * 100}`
              
              return isAnchor ? (
                <a
                  key={item.name}
                  href={item.href}
                  className={className}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={(e) => {
                    handleAnchorClick(e, sectionId)
                    setIsMenuOpen(false)
                  }}
                >
                  <span className="mr-2">{index === 0 ? '🏠' : index === 1 ? '🗾' : index === 2 ? '🎌' : index === 3 ? 'ℹ️' : '✉️'}</span>
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={className}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">{index === 0 ? '🏠' : index === 1 ? '🗾' : index === 2 ? '🎌' : index === 3 ? 'ℹ️' : '✉️'}</span>
                  {item.name}
                </Link>
              )
            })}
            <div className="h-1 w-1/3 mx-auto bg-gradient-to-r from-cherry-pink-300 to-sakura-300 rounded-full mt-2 opacity-50"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default ClientNavigationWrapper
