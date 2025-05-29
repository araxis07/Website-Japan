'use client'

import { useState, useEffect } from 'react'
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
    { name: dict.resources?.tripPlanner || '旅行プランナー', href: `/${lang}/planner` },
    { name: dict.resources?.transportation || '交通', href: `/${lang}/transport` },
    { name: dict.resources?.accommodations || '宿泊', href: `/${lang}/hotels` },
    { name: dict.resources?.foodGuide || 'グルメガイド', href: `/${lang}/food` },
    { name: dict.resources?.events || 'イベント', href: `/${lang}/events` }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' },
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white to-cherry-pink-50 border-t border-cherry-pink-100">
      {/* Cherry blossom decorations */}      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cherry-blossom-footer-1 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-2 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-3 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-4 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-5 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-6 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-7 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-8 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-9 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-10 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-11 cherry-blossom absolute opacity-40"></div>
        <div className="cherry-blossom-footer-12 cherry-blossom absolute opacity-40"></div>
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
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Links columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Quick links */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {lang === 'ja' ? 'クイックリンク' : 'Quick Links'}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-cherry-pink-600 transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2">→</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Popular regions */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {lang === 'ja' ? '人気の地域' : 'Popular Regions'}
              </h3>
              <ul className="space-y-3">
                {popularRegions.map(region => (
                  <li key={region.name}>
                    <Link
                      href={region.href}
                      className="text-gray-600 hover:text-cherry-pink-600 transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2">🗾</span>
                      {region.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {lang === 'ja' ? 'リソース' : 'Resources'}
              </h3>
              <ul className="space-y-3">
                {resources.map(resource => (
                  <li key={resource.name}>
                    <Link
                      href={resource.href}
                      className="text-gray-600 hover:text-cherry-pink-600 transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2">ℹ️</span>
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-cherry-pink-100 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {dict.footer?.newsletter?.title || (lang === 'ja' ? 'ニュースレターを購読する' : 'Subscribe to Our Newsletter')}
            </h3>
            <p className="text-gray-600 mb-6">
              {dict.footer?.newsletter?.description || 
                (lang === 'ja' ? '最新の旅行情報、特別オファー、旅行のヒントを受け取りましょう。' : 
                'Get the latest travel updates, special offers, and travel tips.')}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.footer?.newsletter?.placeholder || (lang === 'ja' ? 'メールアドレス' : 'Your email')}
                className="flex-1 px-5 py-3 rounded-lg border border-cherry-pink-200 focus:outline-none focus:ring-2 focus:ring-cherry-pink-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white rounded-lg font-medium hover:from-cherry-pink-600 hover:to-sakura-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {dict.footer?.newsletter?.button || (lang === 'ja' ? '登録する' : 'Subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {lang === 'ja' ? '日本旅行ガイド' : 'Japan Travel Guide'}. 
            {lang === 'ja' ? ' All rights reserved.' : ' 無断複写・転載を禁じます。'}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
