'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface FeaturedDestinationsProps {
  dict: any
  lang?: string
}

const FeaturedDestinations = ({ dict, lang = 'ja' }: FeaturedDestinationsProps) => {
  const [mounted, setMounted] = useState(false)
  
  // Only render language-dependent elements after mounting on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  const destinations = [
    {
      id: 'mount_fuji',
      name: dict.destinations.mount_fuji.name,
      description: dict.destinations.mount_fuji.description,
      image: '🗻',
      tags: ['自然', '登山', '写真', '絶景'],
      bestTime: '春・夏',
      duration: '1-2日',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'kyoto_temples',
      name: dict.destinations.kyoto_temples.name,
      description: dict.destinations.kyoto_temples.description,
      image: '⛩️',
      tags: ['歴史', '寺院', '庭園', '文化'],
      bestTime: '春・秋',
      duration: '2-4日',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: 'tokyo_skyline',
      name: dict.destinations.tokyo_skyline.name,
      description: dict.destinations.tokyo_skyline.description,
      image: '🏙️',
      tags: ['都市', '現代', '夜景', 'グルメ'],
      bestTime: '年中',
      duration: '3-5日',
      gradient: 'from-purple-500 to-blue-600'
    },
    {
      id: 'osaka_castle',
      name: dict.destinations.osaka_castle.name,
      description: dict.destinations.osaka_castle.description,
      image: '🏯',
      tags: ['歴史', '城', '文化', 'グルメ'],
      bestTime: '春・秋',
      duration: '1-2日',
      gradient: 'from-yellow-500 to-orange-600'
    }
  ]

  return (
    <section id="destinations" className="py-24 bg-gradient-to-b from-warm-white to-cherry-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-5 w-24 h-24 bg-sakura-200 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 right-5 w-20 h-20 bg-cherry-pink-200 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-sakura-300 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="section-title mb-8 animate-fade-in">
            {dict.destinations.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {dict.destinations.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-cherry-pink-100 card-hover group stagger-animation hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Enhanced Image Section */}
              <div className={`relative h-64 bg-gradient-to-br ${destination.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-40 group-hover:scale-110 transition-transform duration-500">
                  {destination.image}
                </div>
                
                {/* Floating badges */}
                <div className="absolute top-6 right-6 z-20">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full shadow-lg">
                    {destination.tags[0]}
                  </span>
                </div>
                
                {/* Best time indicator */}
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center space-x-2 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{destination.bestTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-cherry-pink-600 transition-colors duration-300">
                  {destination.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  {destination.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-cherry-pink-100 to-sakura-100 text-cherry-pink-700 text-sm font-medium rounded-full hover:from-cherry-pink-200 hover:to-sakura-200 transition-all duration-200"
                      style={{ animationDelay: `${index * 0.2 + tagIndex * 0.1}s` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Details Row */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-6 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-cherry-pink-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                      {mounted ? (lang === 'en' ? 'Best Time' : '最適時期') : ''}:
                    </span>
                    <span className="text-gray-700">{destination.bestTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-cherry-pink-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                      {mounted ? (lang === 'en' ? 'Duration' : '所要時間') : ''}:
                    </span>
                    <span className="text-gray-700">{destination.duration}</span>
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <button className="w-full bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-cherry-pink-600 hover:to-sakura-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <span className="flex items-center justify-center">
                    {mounted ? (lang === 'en' ? 'Explore Destination' : '詳細を見る') : ''}
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced View All Button */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center px-10 py-4 bg-white border-2 border-cherry-pink-300 text-cherry-pink-600 font-semibold rounded-full hover:bg-gradient-to-r hover:from-cherry-pink-50 hover:to-sakura-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            {mounted ? (lang === 'en' ? 'View All Destinations' : 'すべての観光地を見る') : ''}
            <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations
