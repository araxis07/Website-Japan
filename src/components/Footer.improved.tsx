'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Locale } from '@/i18n/config'

interface FooterProps {
  dict: any
  lang: Locale
}

const Footer = ({ dict, lang }: FooterProps) => {
  const [email, setEmail] = useState('')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add newsletter subscription logic
    console.log('Newsletter subscription:', email)
    setEmail('')
    // Show a success message
  }
  
  const toggleLanguage = () => {
    const newLang = lang === 'ja' ? 'en' : 'ja'
    router.push(`/${newLang}`)
  }

  const quickLinks = [
    { name: dict.navigation.home, href: `/${lang}` },
    { name: dict.navigation.regions, href: `/${lang}#regions` },
    { name: dict.navigation.destinations, href: `/${lang}#destinations` },
    { name: dict.navigation.about, href: `/${lang}#about` },
    { name: dict.navigation.contact, href: `/${lang}#contact` }
  ]

  const popularRegions = [
    { name: '東京', href: `/${lang}/regions/tokyo` },
    { name: '京都', href: `/${lang}/regions/kyoto` },
    { name: '大阪', href: `/${lang}/regions/osaka` },
    { name: '北海道', href: `/${lang}/regions/hokkaido` },
    { name: '沖縄', href: `/${lang}/regions/okinawa` }
  ]

  const resources = [
    { name: dict.resources.tripPlanner, href: `/${lang}/resources/trip-planner` },
    { name: dict.resources.transportation, href: `/${lang}/resources/transportation` },
    { name: dict.resources.accommodations, href: `/${lang}/resources/accommodations` },
    { name: dict.resources.foodGuide, href: `/${lang}/resources/food-guide` },
    { name: dict.resources.events, href: `/${lang}/resources/events` }
  ]

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'YouTube', href: '#', icon: 'youtube' }
  ]
  
  // Pre-generate the cherry blossoms to avoid hydration mismatch
  const cherryBlossoms = useMemo(() => {
    const blossoms = [];
    for (let i = 0; i < 10; i++) {
      blossoms.push({
        bottom: `${Math.floor(Math.random() * 100)}%`,
        left: `${i * 8 + Math.floor(Math.random() * 5)}%`,
        scale: 0.6 + Math.random() * 0.6,
        rotate: Math.floor(Math.random() * 360),
        delay: `${(i * 100) % 1000}`
      });
    }
    return blossoms;
  }, []);
  
  return (
    <footer className="bg-gradient-to-b from-warm-white to-cherry-pink-50 relative overflow-hidden pt-16">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cherry blossoms with pre-computed positions */}
        {cherryBlossoms.map((blossom, i) => (
          <div 
            key={i}
            className="cherry-blossom absolute opacity-40"
            style={{
              bottom: blossom.bottom,
              left: blossom.left,
              transform: `scale(${blossom.scale}) rotate(${blossom.rotate}deg)`,
              animationDelay: `${blossom.delay}ms`
            }}
          />
        ))}
        {/* Gradient orbs */}
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-cherry-pink-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-56 h-56 bg-sakura-200 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          {/* Company info */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cherry-pink-400 to-sakura-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🌸</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">
                {lang === 'ja' ? '日本旅行ガイド' : 'Japan Travel Guide'}
              </h2>
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
              {dict.footer?.description || 
                "日本の美しい景色、豊かな文化、そして忘れられない体験を発見しましょう。日本旅行ガイドは、あなたの日本での完璧な旅行をサポートします。"}
            </p>
            
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md text-cherry-pink-700 font-medium hover:bg-cherry-pink-50 transition-colors duration-200 mb-8 border border-cherry-pink-100"
            >
              <span>{lang === 'ja' ? '🇬🇧 English' : '🇯🇵 日本語'}</span>
            </button>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-cherry-pink-50 transition-colors duration-200 border border-cherry-pink-100"
                  aria-label={social.name}
                >
                  {social.icon === 'twitter' && (
                    <svg className="w-5 h-5 text-cherry-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  )}
                  {social.icon === 'instagram' && (
                    <svg className="w-5 h-5 text-cherry-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg className="w-5 h-5 text-cherry-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                    </svg>
                  )}
                  {social.icon === 'youtube' && (
                    <svg className="w-5 h-5 text-cherry-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links & Popular regions */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick links */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-cherry-pink-100">
                {lang === 'ja' ? 'クイックリンク' : 'Quick Links'}
              </h3>
              <ul className="space-y-4">
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-cherry-pink-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Popular regions */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-cherry-pink-100">
                {lang === 'ja' ? '人気の地域' : 'Popular Regions'}
              </h3>
              <ul className="space-y-4">
                {popularRegions.map(region => (
                  <li key={region.name}>
                    <Link 
                      href={region.href}
                      className="text-gray-600 hover:text-cherry-pink-600 transition-colors duration-200"
                    >
                      {region.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-cherry-pink-100">
                {lang === 'ja' ? 'リソース' : 'Resources'}
              </h3>
              <ul className="space-y-4">
                {resources.map(resource => (
                  <li key={resource.name}>
                    <Link 
                      href={resource.href}
                      className="text-gray-600 hover:text-cherry-pink-600 transition-colors duration-200"
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Newsletter form */}
        <div className="border-t border-cherry-pink-100 pt-10 pb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {dict.footer?.newsletter?.title || (lang === 'ja' ? 'ニュースレター' : 'Newsletter')}
            </h3>
            <p className="text-gray-600 mb-6">
              {dict.footer?.newsletter?.description || 
                (lang === 'ja' ? 
                  '最新の旅行情報やお得な情報をお受け取りください' : 
                  'Receive the latest travel information and special offers')}
            </p>
            
            <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-l-lg border border-cherry-pink-200 focus:outline-none focus:ring-2 focus:ring-cherry-pink-500"
                placeholder={dict.footer?.newsletter?.placeholder || 
                  (lang === 'ja' ? 'メールアドレスを入力' : 'Enter your email')}
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white font-medium rounded-r-lg px-6 py-3 hover:shadow-lg transition-all duration-300"
              >
                {dict.footer?.newsletter?.button || 
                  (lang === 'ja' ? '購読する' : 'Subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <div className="border-t border-cherry-pink-100 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            {dict.footer?.copyright || 
              (lang === 'ja' ? 
                '© 2025 日本旅行ガイド。すべての権利を保有します。' : 
                '© 2025 Japan Travel Guide. All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
