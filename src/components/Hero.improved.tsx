'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface HeroProps {
  dict: any
}

const Hero = ({ dict }: HeroProps) => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Optimized cherry blossom positions with better distribution
  const cherryBlossoms = useMemo(() => {
    return Array.from({ length: 20 }, (_, index) => {
      const pos = {
        '--top': `${Math.floor(Math.random() * 40)}%`,
        '--left': `${(index * 5) + Math.floor(Math.random() * 5)}%`,
        '--scale': `${0.5 + Math.random() * 0.5}`,
        '--rotation': `${Math.random() * 360}deg`,
        '--float-delay': `${(index * 0.3) % 10}s`,
        '--float-duration': `${6 + (index % 4)}s`
      } as React.CSSProperties

      return (
        <div 
          key={index}
          className="cherry-blossom" 
          style={pos}
        />
      )
    })
  }, [])
  
  const handleExploreClick = () => {
    const regionsElement = document.getElementById('regions')
    if (regionsElement) {
      regionsElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white via-cherry-pink-50 to-sakura-100 overflow-hidden">
      {/* Optimized background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs with reduced motion */}
        <div className="gradient-orb gradient-orb-1 transform-gpu" />
        <div className="gradient-orb gradient-orb-2 transform-gpu" />
        
        {/* Optimized cherry blossoms with reduced DOM elements */}
        <div className="cherry-blossoms-container">
          {cherryBlossoms}
        </div>
      </div>

      {/* Main content with improved animations */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Optimized hero icon */}
        <div className="mb-8 transform-gpu">
          <div 
            className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cherry-pink-400 to-sakura-500 rounded-full shadow-2xl ring-4 ring-white/30 backdrop-blur-sm transition-transform duration-700 ${
              mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            <span className="text-4xl transform hover:scale-110 transition-transform duration-300">🌸</span>
          </div>
        </div>
        
        {/* Title with optimized animations */}
        <h1 className={`text-5xl md:text-7xl lg:text-9xl font-black mb-8 leading-tight font-japanese tracking-tight transition-all duration-1000 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <span className="gradient-text inline-block">{dict.hero.title}</span>
        </h1>

        {/* Subtitle with staggered animation */}
        <p className={`text-xl md:text-2xl lg:text-3xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-1000 delay-300 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {dict.hero.subtitle}
        </p>
        
        {/* Enhanced CTA Button */}
        <div className={`mb-20 transition-all duration-1000 delay-500 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <button 
            onClick={handleExploreClick}
            className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white font-bold rounded-full text-2xl shadow-2xl hover:shadow-cherry-pink-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500 focus-visible:ring-offset-4"
            aria-label={dict.hero.cta}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{dict.hero.cta}</span>
            <span className="relative z-10 ml-3 transform transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">→</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 text-cherry-pink-500"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
