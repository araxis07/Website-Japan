'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FooterProps {
  dict: any
}

const Footer = ({ dict }: FooterProps) => {
  const [email, setEmail] = useState('')

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

  const resources = [
    { name: dict.resources.tripPlanner, href: '/planner' },
    { name: dict.resources.transportation, href: '/transport' },
    { name: dict.resources.accommodations, href: '/hotels' },
    { name: dict.resources.foodGuide, href: '/food' },
    { name: dict.resources.events, href: '/events' }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Site Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cherry-pink-400 to-sakura-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌸</span>
              </div>
              <span className="text-xl font-bold gradient-text">
                {dict.siteName}
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {dict.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <a href={`mailto:${dict.contact.email}`} className="hover:text-cherry-pink-600 transition-colors duration-200">
                  {dict.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <a href={`tel:${dict.contact.phone}`} className="hover:text-cherry-pink-600 transition-colors duration-200">
                  {dict.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>{dict.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {dict.quickLinks.title}
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
          </div>

          {/* Popular Regions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {dict.regions.title}
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

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {dict.resources.title}
            </h3>
            <ul className="space-y-2">
              {resources.map((link) => (
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

        {/* Social Media Section */}
        <div className="border-t border-cherry-pink-100 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {dict.social.title}
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white border border-cherry-pink-200 rounded-full flex items-center justify-center hover:bg-cherry-pink-50 hover:border-cherry-pink-300 transition-all duration-200 text-lg"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {dict.newsletter.title}
              </h3>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder={dict.newsletter.placeholder}
                  className="flex-1 px-4 py-2 border border-cherry-pink-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cherry-pink-300 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="px-6 py-2 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white rounded-r-lg hover:from-cherry-pink-600 hover:to-sakura-600 transition-all duration-200">
                  {dict.newsletter.button}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-cherry-pink-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="mb-4 md:mb-0">
              {dict.copyright}
            </div>
            <div className="flex items-center space-x-1">
              <span>{dict.madeWith}</span>
            </div>
          </div>
        </div>
      </div>      {/* Decorative Cherry Blossoms */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-20">        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`absolute opacity-10 footer-cherry`}
          >
            <div className="w-8 h-8 text-cherry-pink-400">
              🌸
            </div>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer
