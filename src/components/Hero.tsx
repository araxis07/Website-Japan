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
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white via-cherry-pink-50 to-sakura-100 overflow-hidden">
      {/* Enhanced Cherry Blossom Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Cherry Blossoms */}
        <div className="cherry-blossom-1 cherry-blossom"></div>
        <div className="cherry-blossom-2 cherry-blossom"></div>
        <div className="cherry-blossom-3 cherry-blossom"></div>
        <div className="cherry-blossom-4 cherry-blossom"></div>
        <div className="cherry-blossom-5 cherry-blossom"></div>
        <div className="cherry-blossom-6 cherry-blossom"></div>
        <div className="cherry-blossom-7 cherry-blossom"></div>
        <div className="cherry-blossom-8 cherry-blossom"></div>
        <div className="cherry-blossom-9 cherry-blossom"></div>
        <div className="cherry-blossom-10 cherry-blossom"></div>
        <div className="cherry-blossom-11 cherry-blossom"></div>
        <div className="cherry-blossom-12 cherry-blossom"></div>
        <div className="cherry-blossom-13 cherry-blossom"></div>
        <div className="cherry-blossom-14 cherry-blossom"></div>
        <div className="cherry-blossom-15 cherry-blossom"></div>
        <div className="cherry-blossom-16 cherry-blossom"></div>
        <div className="cherry-blossom-17 cherry-blossom"></div>
        <div className="cherry-blossom-18 cherry-blossom"></div>
        <div className="cherry-blossom-19 cherry-blossom"></div>
        <div className="cherry-blossom-20 cherry-blossom"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cherry-pink-200 rounded-full opacity-20 animate-pulse blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-sakura-300 rounded-full opacity-30 animate-bounce blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cherry-pink-100 rounded-full opacity-25 animate-pulse blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-sakura-200 rounded-full opacity-35 animate-bounce blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Cherry Blossom Icon with improved animation */}
        <div className="mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cherry-pink-400 to-sakura-500 rounded-full shadow-2xl ring-4 ring-white/30 backdrop-blur-sm">
            <span className="text-4xl animate-pulse">🌸</span>
          </div>
        </div>
        
        {/* Title with improved typography */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black gradient-text mb-8 leading-tight animate-fade-in font-japanese tracking-tight">
          {dict.hero.title}
        </h1>

        {/* Subtitle with better spacing */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
          {dict.hero.subtitle}
        </p>
          {/* Improved CTA Button */}
        <div className="mb-20">
          <button 
            className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white font-bold rounded-full text-2xl shadow-2xl hover:shadow-cherry-pink-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            aria-label={dict.hero.cta}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">{dict.hero.cta}</span>
            <span className="relative z-10 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true">→</span>
          </button>
        </div>
        
        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '47', label: '都道府県', icon: '🏞️' },
            { value: '9', label: '地域', icon: '🗾' },
            { value: '100+', label: '観光地', icon: '🎌' },
            { value: '24/7', label: 'サポート', icon: '💬' },
          ].map((stat, index) => (
            <div key={index} className="text-center group stagger-animation bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:bg-white/40 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-cherry-pink-400/70 to-sakura-400/70 flex items-center justify-center rounded-full mx-auto mb-3 text-2xl group-hover:scale-110 transition-all duration-300 shadow-md">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-gray-500 hover:text-cherry-pink-600 transition-colors duration-300 cursor-pointer">
          <span className="text-sm mb-3 font-medium">スクロール</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center bg-white/30 backdrop-blur-sm">
            <div className="w-1 h-3 bg-gradient-to-b from-cherry-pink-400 to-sakura-400 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 left-5 w-2 h-2 bg-cherry-pink-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute top-3/4 right-5 w-3 h-3 bg-sakura-400 rounded-full opacity-40 animate-ping animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cherry-pink-300 rounded-full opacity-80 animate-ping animation-delay-500"></div>
    </section>
  )
}

export default Hero
