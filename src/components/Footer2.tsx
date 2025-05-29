'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface FooterProps {
  dict: any
  lang?: string
}

const Footer = ({ dict, lang = 'ja' }: FooterProps) => {
  const [email, setEmail] = useState('')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  // Only render language-dependent elements after mounting on the client
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }
  
  const toggleLanguage = () => {
    const newLang = lang === 'ja' ? 'en' : 'ja'
    router.push(`/${newLang}`)
  }

  const quickLinks = [
    { name: dict.navigation.home, href: '/' },
    { name: dict.navigation.regions, href: '#regions' },
    { name: dict.navigation.destinations, href: '#destinations' },
    { name: dict.navigation.about, href: '#about' },
    { name: dict.navigation.contact, href: '#contact' }
  ]

  const popularRegions = [
    { name: '東京', href: '/regions/tokyo' },
    { name: '京都', href: '/regions/kyoto' },
    { name: '大阪', href: '/regions/osaka' },
    { name: '北海道', href: '/regions/hokkaido' },
    { name: '沖縄', href: '/regions/okinawa' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' },
  ]

  return (
    <footer className="bg-gradient-to-b from-cherry-pink-50 to-white border-t border-cherry-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Site Info */}
          <div className="lg:col-span-2">            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cherry-pink-400 to-sakura-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌸</span>
              </div>              <span className="text-xl font-bold gradient-text">
                {mounted ? (lang === 'en' ? 'Japan Travel Guide' : '日本旅行ガイド') : ''}
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {dict.footer.description}
            </p>
          </div>          {/* Quick Links */}
          <div>            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {mounted ? (lang === 'en' ? 'Quick Links' : 'クイックリンク') : ''}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-cherry-pink-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>          {/* Popular Regions */}
          <div>            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {mounted ? (lang === 'en' ? 'Popular Regions' : '人気の地域') : ''}
            </h3>
            <ul className="space-y-2">
              {popularRegions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-cherry-pink-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-cherry-pink-100 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {dict.footer.newsletter.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              {dict.footer.newsletter.description}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.footer.newsletter.placeholder}
                className="flex-1 px-4 py-2 border border-cherry-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-pink-400 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white rounded-lg font-medium hover:from-cherry-pink-600 hover:to-sakura-600 transition-all duration-200"
              >
                {dict.footer.newsletter.button}
              </button>
            </form>
          </div>
        </div>        {/* Social Links & Copyright */}
        <div className="border-t border-cherry-pink-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <span className="text-gray-600 font-medium">{dict.footer.follow}:</span>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-2xl hover:scale-110 transition-transform duration-200"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-cherry-pink-100 text-cherry-pink-700 rounded-full text-sm font-medium hover:bg-cherry-pink-200 transition-colors duration-200"
            >
              {mounted ? (lang === 'ja' ? 'EN' : '日本語') : ''}
            </button>
            <p className="text-gray-600 text-sm">
              {dict.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
