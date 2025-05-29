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
    <section id="destinations" className="py-20 bg-gradient-to-b from-warm-white to-cherry-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        <div className="text-center mb-16">
          <h2 className="section-title mb-6">
            {dict.destinations.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dict.destinations.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-cherry-pink-100 card-hover group stagger-animation"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-cherry-pink-200 to-sakura-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                  {destination.image}
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-2 py-1 bg-white/80 backdrop-blur-sm text-cherry-pink-700 text-xs font-medium rounded-full">
                    {destination.tags.join(' ')}
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
                </p>                {/* Details */}                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">                  <div>
                    <span className="font-medium">
                      {mounted ? (lang === 'en' ? 'Best Time' : '最適時期') : ''}:
                    </span>
                    {` ${destination.bestTime}`}
                  </div>
                  <div>
                    <span className="font-medium">
                      {mounted ? (lang === 'en' ? 'Duration' : '所要時間') : ''}:
                    </span>
                    {` ${destination.duration}`}
                  </div>
                </div>                {/* Learn More Button */}                <button className="w-full bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white py-2 px-4 rounded-lg font-medium hover:from-cherry-pink-600 hover:to-sakura-600 transform hover:scale-105 transition-all duration-200">
                  {mounted ? (lang === 'en' ? 'Explore Destination' : '詳細を見る') : ''}
                </button>
              </div>
            </div>
          ))}
        </div>        {/* View All Button */}        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3 bg-white border-2 border-cherry-pink-300 text-cherry-pink-600 font-semibold rounded-full hover:bg-cherry-pink-50 transition-all duration-200">
            {mounted ? (lang === 'en' ? 'View All Destinations' : 'すべての観光地を見る') : ''}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations
