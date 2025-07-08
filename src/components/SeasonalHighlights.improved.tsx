'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/i18n/config'

interface SeasonalHighlightsProps {
  dict: any
  lang: Locale
}

const SeasonalHighlights = ({ dict, lang }: SeasonalHighlightsProps) => {
  const [currentSeason, setCurrentSeason] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Define the seasons
  const seasons = [
    {
      id: 'spring',
      name: lang === 'ja' ? '春 (3月-5月)' : 'Spring (Mar-May)',
      title: lang === 'ja' ? '桜の季節' : 'Cherry Blossom Season',
      description: lang === 'ja' 
        ? '日本で最も美しい季節の一つ、桜が国中を鮮やかなピンク色に染め上げます。'
        : 'One of the most beautiful seasons in Japan as cherry blossoms paint the country in vibrant pink.',
      highlights: [
        { name: lang === 'ja' ? '上野公園' : 'Ueno Park', location: lang === 'ja' ? '東京' : 'Tokyo' },
        { name: lang === 'ja' ? '嵐山' : 'Arashiyama', location: lang === 'ja' ? '京都' : 'Kyoto' },
        { name: lang === 'ja' ? '弘前公園' : 'Hirosaki Park', location: lang === 'ja' ? '青森' : 'Aomori' }
      ],
      color: 'from-cherry-pink-400 to-sakura-400',
      icon: '🌸',
      bgClass: 'bg-gradient-to-br from-warm-white via-sakura-50 to-cherry-pink-100'
    },
    {
      id: 'summer',
      name: lang === 'ja' ? '夏 (6月-8月)' : 'Summer (Jun-Aug)',
      title: lang === 'ja' ? '祭りとビーチ' : 'Festivals & Beaches',
      description: lang === 'ja'
        ? '活気に満ちた祭りや美しいビーチで夏の暑さをお楽しみください。'
        : 'Enjoy the summer heat with vibrant festivals and beautiful beaches across the country.',
      highlights: [
        { name: lang === 'ja' ? '青森ねぶた祭り' : 'Aomori Nebuta Festival', location: lang === 'ja' ? '青森' : 'Aomori' },
        { name: lang === 'ja' ? '沖縄のビーチ' : 'Okinawa Beaches', location: lang === 'ja' ? '沖縄' : 'Okinawa' },
        { name: lang === 'ja' ? '京都五山送り火' : 'Kyoto Gozan Okuribi', location: lang === 'ja' ? '京都' : 'Kyoto' }
      ],
      color: 'from-blue-400 to-cyan-400',
      icon: '🏄',
      bgClass: 'bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100'
    },
    {
      id: 'autumn',
      name: lang === 'ja' ? '秋 (9月-11月)' : 'Autumn (Sep-Nov)',
      title: lang === 'ja' ? '紅葉の絶景' : 'Autumn Leaves Splendor',
      description: lang === 'ja'
        ? '赤、オレンジ、黄色の紅葉が山や公園を彩る、写真撮影に最適な季節です。'
        : 'Red, orange, and yellow foliage decorates mountains and parks - perfect for photography.',
      highlights: [
        { name: lang === 'ja' ? '日光' : 'Nikko', location: lang === 'ja' ? '栃木' : 'Tochigi' },
        { name: lang === 'ja' ? '高野山' : 'Mount Koya', location: lang === 'ja' ? '和歌山' : 'Wakayama' },
        { name: lang === 'ja' ? '香嵐渓' : 'Korankei', location: lang === 'ja' ? '愛知' : 'Aichi' }
      ],
      color: 'from-orange-400 to-red-400',
      icon: '🍁',
      bgClass: 'bg-gradient-to-br from-orange-50 via-amber-50 to-red-100'
    },
    {
      id: 'winter',
      name: lang === 'ja' ? '冬 (12月-2月)' : 'Winter (Dec-Feb)',
      title: lang === 'ja' ? '雪景色と温泉' : 'Snowy Landscapes & Hot Springs',
      description: lang === 'ja'
        ? '雪に覆われた風景と、寒い日に心地よい温泉をお楽しみください。'
        : 'Enjoy snow-covered landscapes and warm yourself in soothing hot springs on cold days.',
      highlights: [
        { name: lang === 'ja' ? '札幌雪まつり' : 'Sapporo Snow Festival', location: lang === 'ja' ? '北海道' : 'Hokkaido' },
        { name: lang === 'ja' ? '白川郷' : 'Shirakawa-go', location: lang === 'ja' ? '岐阜' : 'Gifu' },
        { name: lang === 'ja' ? '銀山温泉' : 'Ginzan Onsen', location: lang === 'ja' ? '山形' : 'Yamagata' }
      ],
      color: 'from-indigo-400 to-blue-400',
      icon: '❄️',
      bgClass: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-white'
    }
  ]

  // Map season ids to the corresponding border color classes used in the grid
  const borderColorClasses: Record<string, string> = {
    spring: 'border-cherry-pink-200',
    summer: 'border-blue-200',
    autumn: 'border-orange-200',
    winter: 'border-indigo-200'
  }

  // Init after mount
  useEffect(() => {
    setMounted(true)
    
    // Set initial season based on current month
    const currentMonth = new Date().getMonth()
    if (currentMonth >= 2 && currentMonth <= 4) { 
      setCurrentSeason(0) // Spring
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      setCurrentSeason(1) // Summer
    } else if (currentMonth >= 8 && currentMonth <= 10) {
      setCurrentSeason(2) // Autumn
    } else {
      setCurrentSeason(3) // Winter
    }
  }, [])
  
  const nextSeason = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentSeason((prev) => (prev + 1) % seasons.length)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }
  
  const prevSeason = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentSeason((prev) => (prev - 1 + seasons.length) % seasons.length)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }
  
  const season = seasons[currentSeason]
  
  // Ensure rendering only happens after mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <section id="seasons" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-cherry-pink-500 border-t-transparent animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section id="seasons" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="section-title">{dict.seasons?.title || (lang === 'ja' ? '季節の見どころ' : 'Seasonal Highlights')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dict.seasons?.subtitle || (lang === 'ja' 
              ? '日本は一年を通して様々な魅力があります。それぞれの季節が持つ特色をお楽しみください。'
              : 'Japan offers unique experiences all year round. Explore what each season has to offer.')}
          </p>
        </div>
        
        {/* Seasons grid */}
        {/**
         * Tailwind can't detect dynamically generated border color classes,
         * so we map the season ID to explicit class names.
         */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-3xl overflow-hidden border ${borderColorClasses[season.id]} shadow-xl ${season.bgClass}`}
        >
          {/* Season Info Column */}
          <div className={`bg-gradient-to-br ${season.color} text-white p-8 flex flex-col justify-between transition-colors duration-300`}>
            {/* Navigation dots for mobile */}
            <div className="lg:hidden flex justify-center space-x-2 mb-4">
              {seasons.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSeason(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSeason ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'} focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500`}
                  aria-label={s.name}
                />
              ))}
            </div>
            
            <div className="relative">
              <div className="text-6xl mb-4">{season.icon}</div>
              <h3 className="text-4xl font-bold mb-4">{season.name}</h3>
              <h4 className="text-2xl font-medium mb-6">{season.title}</h4>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                {season.description}
              </p>
            </div>
            
            <div className="hidden lg:flex space-x-2">
              {seasons.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSeason(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSeason ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'} focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500`}
                  aria-label={s.name}
                />
              ))}
            </div>
          </div>
          
          {/* Season Details Column */}
          <div className="lg:col-span-2 p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">
                {lang === 'ja' ? 'おすすめスポット' : 'Recommended Spots'}
              </h3>
              
              <div className="flex space-x-3">
                <button 
                  onClick={prevSeason}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cherry-pink-500"
                  aria-label={lang === 'ja' ? '前の季節' : 'Previous season'}
                  disabled={isAnimating}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSeason}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cherry-pink-500"
                  aria-label={lang === 'ja' ? '次の季節' : 'Next season'}
                  disabled={isAnimating}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {season.highlights.map((highlight, index) => (
                <div 
                  key={highlight.name} 
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-lg font-bold text-gray-800 mb-2">{highlight.name}</div>
                  <div className="text-sm text-gray-500">{highlight.location}</div>
                  <div className={`mt-4 w-full h-1 rounded-full bg-gradient-to-r ${season.color} opacity-30`}></div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-3 text-gray-700">
                {lang === 'ja' ? 'この季節のお祭り' : 'Festivals this season'}
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {season.id === 'spring' ? [
                  lang === 'ja' ? '花見（全国各地）' : 'Hanami / Cherry Blossom Viewing (Nationwide)',
                  lang === 'ja' ? '葵祭（京都）' : 'Aoi Matsuri (Kyoto)',
                  lang === 'ja' ? '三社祭（東京）' : 'Sanja Matsuri (Tokyo)'
                ] : season.id === 'summer' ? [
                  lang === 'ja' ? '祇園祭（京都）' : 'Gion Matsuri (Kyoto)',
                  lang === 'ja' ? '青森ねぶた祭り（青森）' : 'Aomori Nebuta Matsuri (Aomori)',
                  lang === 'ja' ? '阿波踊り（徳島）' : 'Awa Odori (Tokushima)'
                ] : season.id === 'autumn' ? [
                  lang === 'ja' ? '高山祭（岐阜）' : 'Takayama Matsuri (Gifu)',
                  lang === 'ja' ? '神田祭（東京）' : 'Kanda Matsuri (Tokyo)',
                  lang === 'ja' ? '時代祭（京都）' : 'Jidai Matsuri (Kyoto)'
                ] : [
                  lang === 'ja' ? '札幌雪まつり（北海道）' : 'Sapporo Snow Festival (Hokkaido)',
                  lang === 'ja' ? '十日町雪まつり（新潟）' : 'Tokamachi Snow Festival (Niigata)',
                  lang === 'ja' ? '小樽雪あかりの路（北海道）' : 'Otaru Snow Light Path (Hokkaido)'
                ].map((festival, index) => (
                  <li key={index}>{festival}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeasonalHighlights
