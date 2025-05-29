'use client'

import { useState, useEffect } from 'react'

interface HeroProps {
  dict: any
}

const Hero = ({ dict }: HeroProps) => {
  const [mounted, setMounted] = useState(false)
  
  // Only render language-dependent elements after mounting on the client
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const stats = mounted ? [
    { number: '47', label: dict.hero.title.includes('Japan') ? 'Prefectures' : '都道府県' },
    { number: '1000+', label: dict.hero.title.includes('Japan') ? 'Destinations' : '観光地' },
    { number: '4', label: dict.hero.title.includes('Japan') ? 'Beautiful Seasons' : '美しい季節' },
  ] : []

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-white via-cherry-pink-50 to-sakura-100"></div>
      
    {/* Floating Cherry Blossoms */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && Array.from({ length: 15 }).map((_, i) => {
          // Calculate positions and delays in JS but use CSS classes
          const leftPos = Math.random() * 100;
          const topPos = Math.random() * 100;
          const delay = Math.random() * 3;
          
          return (
            <div
              key={i}
              className={`absolute opacity-20 cherry-decoration left-[${leftPos}%] top-[${topPos}%] animate-delay-${Math.round(delay)}`}
            >
              <div className="w-16 h-16 text-cherry-pink-300 animate-pulse">
                🌸
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="gradient-text">{dict.hero.title}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto font-light">
            {dict.hero.subtitle}
          </p>
          
          {/* CTA Button */}
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white font-semibold text-lg rounded-full hover:from-cherry-pink-600 hover:to-sakura-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-12">
            {dict.hero.cta}
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-cherry-pink-100 card-hover">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-cherry-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
