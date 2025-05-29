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
  
  return (    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white via-cherry-pink-50 to-sakura-100 overflow-hidden">
      {/* Enhanced Cherry Blossom Background Elements */}
      <div className="absolute inset-0">
        {/* Floating cherry blossoms */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-cherry-pink-300 rounded-full opacity-30 animate-bounce`}
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 11}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cherry-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-sakura-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cherry-pink-100 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-sakura-200 rounded-full opacity-35 animate-bounce"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Cherry Blossom Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cherry-pink-400 to-sakura-500 rounded-full shadow-lg">
            <span className="text-3xl">🌸</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6 leading-tight">
          {dict.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          {dict.hero.subtitle}
        </p>

        {/* CTA Button */}
        <div className="mb-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            {dict.hero.cta}
            <span className="ml-2">→</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">47</div>
            <div className="text-sm text-gray-600">都道府県</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">9</div>
            <div className="text-sm text-gray-600">地域</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">100+</div>
            <div className="text-sm text-gray-600">観光地</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-sm text-gray-600">サポート</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-gray-500">
          <span className="text-sm mb-2">スクロール</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero