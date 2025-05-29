'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RegionsListProps {
  dict: any
  lang?: string
}

const RegionsList = ({ dict, lang = 'ja' }: RegionsListProps) => {
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
    <section id="regions" className="py-24 bg-gradient-to-b from-sakura-50 to-warm-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-20 h-20 bg-cherry-pink-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-sakura-200 rounded-full animate-bounce"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="section-title mb-8">
            {dict.regions.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {dict.regions.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region, index) => (
            <div
              key={region.id}
              className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-cherry-pink-100 card-hover group stagger-animation shadow-lg hover:shadow-2xl delay-${index * 100}`}
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
              <p className="text-gray-600 mb-4 leading-relaxed">
                {region.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  {lang === 'en' ? 'Key Cities & Attractions' : '主要都市・観光地'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {region.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 bg-cherry-pink-100 text-cherry-pink-700 rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learn More Button */}
              <Link
                href={`/regions/${region.id}`}
                className="inline-flex items-center text-cherry-pink-600 hover:text-cherry-pink-700 font-medium group-hover:translate-x-1 transition-all duration-200"
              >
                {lang === 'en' ? 'Learn More' : 'もっと見る'}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegionsList
