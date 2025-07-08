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
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-warm-white via-cherry-pink-50 to-sakura-100 overflow-hidden px-4 md:px-0">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="gradient-orb gradient-orb-1 transform-gpu" />
        <div className="gradient-orb gradient-orb-2 transform-gpu" />
        <div className="cherry-blossoms-container">{cherryBlossoms}</div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center py-16 md:py-28">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-cherry-pink-400 to-sakura-500 rounded-full shadow-2xl ring-4 ring-white/30 backdrop-blur-sm">
            <span className="text-4xl md:text-5xl">🌸</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight font-japanese tracking-tight gradient-text drop-shadow-lg">
          {dict.hero.title}
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium font-japanese">
          {dict.hero.subtitle}
        </p>
        <button 
          onClick={handleExploreClick}
          className="group relative inline-flex items-center px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white font-bold rounded-full text-lg md:text-2xl shadow-2xl hover:shadow-cherry-pink-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry-pink-500 focus-visible:ring-offset-4"
          aria-label={dict.hero.cta}
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{dict.hero.cta}</span>
          <span className="relative z-10 ml-3 transform transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">→</span>
        </button>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-cherry-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
