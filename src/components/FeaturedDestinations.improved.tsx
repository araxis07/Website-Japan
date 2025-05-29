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
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            <span className="section-title">{dict.destinations.title}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dict.destinations.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-cherry-pink-100 card-hover group animation-fade-in"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`
              }}
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-cherry-pink-200 to-sakura-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition-transform duration-700">
                  {destination.image}
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-2 py-1 bg-white/80 backdrop-blur-sm text-cherry-pink-700 text-xs font-medium rounded-full">
                    {destination.tags[0]}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-cherry-pink-600 transition-colors duration-200">
                  {destination.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>
                
                {/* Details */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div>
                    <span className="font-medium">
                      {mounted ? (lang === 'en' ? 'Best Time' : '最適時期') : ''}:
                    </span>
                    {` ${destination.bestTime}`}
                  </div>
                  <div>
                    <span className="font-medium">
                      {mounted ? (lang === 'en' ? 'Duration' : '期間') : ''}:
                    </span>
                    {` ${destination.duration}`}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.tags.slice(1).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center px-2 py-1 bg-cherry-pink-50 text-cherry-pink-700 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* CTA */}
                <button className="w-full py-2 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 text-sm">
                  {lang === 'ja' ? '詳細を見る' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-white border border-cherry-pink-200 text-cherry-pink-600 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 group">
            <span className="font-medium">
              {lang === 'ja' ? 'すべての観光地を見る' : 'View All Destinations'}
            </span>
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations
