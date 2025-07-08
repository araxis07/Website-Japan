'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface RegionsListProps {
  dict: any
  lang?: string
}

const RegionsList = ({ dict, lang = 'ja' }: RegionsListProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
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

  const regions = [
    {
      id: 'hokkaido',
      name: dict.regions.hokkaido.name,
      description: dict.regions.hokkaido.description,
      highlights: ['札幌', '函館', '小樽', '富良野'],
      color: 'from-blue-400 to-blue-600',
      icon: '❄️'
    },
    {
      id: 'tohoku',
      name: dict.regions.tohoku.name,
      description: dict.regions.tohoku.description,
      highlights: ['仙台', '青森', '秋田', '山形'],
      color: 'from-green-400 to-green-600',
      icon: '🏔️'
    },
    {
      id: 'kanto',
      name: dict.regions.kanto.name,
      description: dict.regions.kanto.description,
      highlights: ['東京', '横浜', '鎌倉', '日光'],
      color: 'from-purple-400 to-purple-600',
      icon: '🏙️'
    },
    {
      id: 'chubu',
      name: dict.regions.chubu.name,
      description: dict.regions.chubu.description,
      highlights: ['名古屋', '金沢', '富山', '長野'],
      color: 'from-orange-400 to-orange-600',
      icon: '🗻'
    },
    {
      id: 'kansai',
      name: dict.regions.kansai.name,
      description: dict.regions.kansai.description,
      highlights: ['大阪', '京都', '奈良', '神戸'],
      color: 'from-red-400 to-red-600',
      icon: '🏯'
    },
    {
      id: 'chugoku',
      name: dict.regions.chugoku.name,
      description: dict.regions.chugoku.description,
      highlights: ['広島', '岡山', '山口', '鳥取'],
      color: 'from-teal-400 to-teal-600',
      icon: '🌊'
    },
    {
      id: 'shikoku',
      name: dict.regions.shikoku.name,
      description: dict.regions.shikoku.description,
      highlights: ['高松', '松山', '高知', '徳島'],
      color: 'from-yellow-400 to-yellow-600',
      icon: '⛩️'
    },
    {
      id: 'kyushu',
      name: dict.regions.kyushu.name,
      description: dict.regions.kyushu.description,
      highlights: ['福岡', '熊本', '長崎', '鹿児島'],
      color: 'from-pink-400 to-pink-600',
      icon: '🌋'
    },
    {
      id: 'okinawa',
      name: dict.regions.okinawa.name,
      description: dict.regions.okinawa.description,
      highlights: ['那覇', '石垣', '宮古', '久米島'],
      color: 'from-cyan-400 to-cyan-600',
      icon: '🏖️'
    }
  ]
  
  return (
    <section 
      id="regions" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-sakura-50 to-warm-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-cherry-pink-200 rounded-full animate-pulse transform-gpu"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-sakura-200 rounded-full animate-bounce transform-gpu"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="section-title">{dict.regions.title}</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {dict.regions.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region, index) => (
            <div
              key={region.id}
              className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-cherry-pink-100 card-hover group shadow-lg hover:shadow-2xl transform transition-all duration-300 animation-fade-in ${isVisible ? '' : 'opacity-0'}`}
              style={{
                transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
              }}
            >
              {/* Region Icon and Name */}
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${region.color} rounded-full flex items-center justify-center text-white text-2xl mr-4`}>
                  {region.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-cherry-pink-600 transition-colors duration-200">
                  {region.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {region.description}
              </p>
              
              {/* Popular highlights */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
                  {lang === 'ja' ? '主な都市' : 'Major Cities'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {region.highlights.map((highlight, i) => (
                    <span 
                      key={i} 
                      className="inline-block px-3 py-1 bg-cherry-pink-50 text-cherry-pink-700 rounded-full text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* View details link */}
              <div className="mt-6">
                <Link 
                  href={`/${lang}/regions/${region.id}`}
                  className="inline-flex items-center font-medium text-cherry-pink-600 hover:text-cherry-pink-800 transition-colors duration-200 group"
                >
                  <span>
                    {lang === 'ja' ? 'もっと見る' : 'Learn more'}
                  </span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegionsList
