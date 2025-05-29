'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Locale } from '@/i18n/config'

interface SeasonalHighlightsProps {
  dict: any
  lang: Locale
}

const SeasonalHighlights = ({ dict, lang }: SeasonalHighlightsProps) => {
  const [currentSeason, setCurrentSeason] = useState(0)
  const [mounted, setMounted] = useState(false)
  
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
    setCurrentSeason((prev) => (prev + 1) % seasons.length)
  }
  
  const prevSeason = () => {
    setCurrentSeason((prev) => (prev - 1 + seasons.length) % seasons.length)
  }
  
  if (!mounted) return null
  
  const season = seasons[currentSeason]

  return (
    <section id="seasonal" className="py-24 relative overflow-hidden">
      <div className={`absolute inset-0 ${season.bgClass} transition-all duration-700`}>
        <div className="absolute inset-0 opacity-20">
          {/* Decorative elements that change based on season */}
          {season.id === 'spring' && (
            Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={`spring-${i}`} 
                className="cherry-blossom absolute" 
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))
          )}
          
          {season.id === 'autumn' && (
            Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={`autumn-${i}`} 
                className="absolute w-6 h-6 pointer-events-none" 
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                <span className="text-xl animate-fall" style={{ animationDuration: `${8 + Math.random() * 5}s` }}>
                  {Math.random() > 0.5 ? '🍁' : '🍂'}
                </span>
              </div>
            ))
          )}
          
          {season.id === 'winter' && (
            Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={`winter-${i}`} 
                className="absolute opacity-75 pointer-events-none" 
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                <span className="text-sm animate-fall" style={{ animationDuration: `${10 + Math.random() * 8}s` }}>
                  ❄️
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mb-8">
            {lang === 'ja' ? '季節の見どころ' : 'Seasonal Highlights'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {lang === 'ja' 
              ? '日本は四季折々の美しさがあります。あなたの旅行に最適な季節を見つけましょう。' 
              : 'Japan is beautiful in every season. Find the perfect time for your journey.'}
          </p>
        </div>
        
        <div className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden transition-all duration-700`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px]">
            {/* Season Image Column */}
            <div className={`bg-gradient-to-br ${season.color} text-white p-8 flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${20 + Math.random() * 40}px`,
                      height: `${20 + Math.random() * 40}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0.1 + Math.random() * 0.2,
                    }}
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
              
              <div className="flex space-x-2">
                {seasons.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSeason(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSeason ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
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
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextSeason}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cherry-pink-500"
                    aria-label={lang === 'ja' ? '次の季節' : 'Next season'}
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {season.highlights.map((highlight) => (
                  <div 
                    key={highlight.name} 
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
                  >
                    <h4 className="text-xl font-bold mb-2 text-gray-800">{highlight.name}</h4>
                    <p className="text-gray-500 mb-4 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {highlight.location}
                    </p>
                    <Link 
                      href={`/${lang}/destination/${encodeURIComponent(highlight.name)}`}
                      className={`inline-flex items-center text-sm font-medium text-${season.id === 'spring' ? 'cherry-pink' : season.id === 'summer' ? 'blue' : season.id === 'autumn' ? 'orange' : 'indigo'}-600 hover:underline`}
                    >
                      {lang === 'ja' ? '詳細を見る' : 'View details'}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Link
                  href={`/${lang}/seasonal-guide`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-cherry-pink-500 to-sakura-500 hover:from-cherry-pink-600 hover:to-sakura-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cherry-pink-500"
                >
                  {lang === 'ja' ? '季節の旅行ガイドを見る' : 'View Seasonal Travel Guide'}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeasonalHighlights
