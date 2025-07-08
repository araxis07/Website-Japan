'use client'

import { useState, useEffect, useRef } from 'react'
import { Locale } from '@/i18n/config'

interface FeaturedDestinationsProps {
  dict: any
  lang: Locale
}

const FeaturedDestinations = ({ dict, lang }: FeaturedDestinationsProps) => {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Only render language-dependent elements after mounting on the client
  useEffect(() => {
    setMounted(true)
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  const destinations = [
    {
      id: 'mount_fuji',
      name: dict.destinations.mount_fuji.name,
      description: dict.destinations.mount_fuji.description,
      image: '🗻',
      tags: ['自然', '登山', '写真', '絶景'],
      bestTime: '春・夏',
      duration: '1-2日'
    },
    {
      id: 'kyoto_temples',
      name: dict.destinations.kyoto_temples.name,
      description: dict.destinations.kyoto_temples.description,
      image: '⛩️',
      tags: ['歴史', '寺院', '庭園', '文化'],
      bestTime: '春・秋',
      duration: '2-4日'
    },
    {
      id: 'tokyo_skyline',
      name: dict.destinations.tokyo_skyline.name,
      description: dict.destinations.tokyo_skyline.description,
      image: '🏙️',
      tags: ['都市', '現代', '夜景', 'グルメ'],
      bestTime: '年中',
      duration: '3-5日'
    },
    {
      id: 'osaka_castle',
      name: dict.destinations.osaka_castle.name,
      description: dict.destinations.osaka_castle.description,
      image: '🏯',
      tags: ['歴史', '城', '文化', 'グルメ'],
      bestTime: '春・秋',
      duration: '1-2日'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="destinations" 
      className="py-20 bg-gradient-to-b from-warm-white to-cherry-pink-50"
      aria-label="Featured Destinations"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-3xl md:text-4xl font-bold mb-10 text-center font-japanese">
          {dict.destinations.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="rounded-2xl shadow-lg bg-white/90 p-6 flex flex-col items-center card-hover transition-all duration-300 min-h-[260px] border border-cherry-pink-100"
            >
              <div className="text-4xl mb-2">{dest.image}</div>
              <h3 className="font-bold text-xl md:text-2xl mb-2 text-cherry-pink-600 font-japanese">{dest.name}</h3>
              <p className="text-gray-700 text-sm md:text-base text-center mb-3 font-japanese">
                {dest.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-auto mb-2">
                {dest.tags.map((tag) => (
                  <span key={tag} className="bg-cherry-pink-50 text-cherry-pink-600 rounded-full px-3 py-1 text-xs font-medium font-japanese shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-xs text-gray-500 font-japanese">
                <span>🕒 {dest.duration}</span>
                <span>🌸 {dest.bestTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations
