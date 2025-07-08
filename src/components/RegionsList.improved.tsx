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
      ref={sectionRef}
      id="regions"
      className="py-20 bg-gradient-to-b from-cherry-pink-50 to-warm-white relative"
      aria-label="Japan Regions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-3xl md:text-4xl font-bold mb-10 text-center font-japanese">
          {dict.regions.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`rounded-2xl shadow-lg bg-gradient-to-br ${region.color} p-6 flex flex-col items-center card-hover transition-all duration-300 min-h-[260px]`}
            >
              <div className="text-4xl mb-2">{region.icon}</div>
              <h3 className="font-bold text-xl md:text-2xl mb-2 text-white font-japanese drop-shadow-lg">{region.name}</h3>
              <p className="text-white/90 text-sm md:text-base text-center mb-3 font-japanese">
                {region.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-auto">
                {region.highlights.map((hl) => (
                  <span key={hl} className="bg-white/80 text-cherry-pink-600 rounded-full px-3 py-1 text-xs font-medium font-japanese shadow-sm">
                    {hl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegionsList
