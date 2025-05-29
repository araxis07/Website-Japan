'use client'

import { useState, useEffect, useMemo } from 'react'

interface HeroProps {
  dict: any
}

const Hero = ({ dict }: HeroProps) => {
  const [mounted, setMounted] = useState(false)
  
  // Only run animations after component has mounted
  useEffect(() => {
    setMounted(true)
  }, [])
    // Use memo to cache cherry blossom elements to improve performance
  const cherryBlossoms = useMemo(() => {
    const positions = [
      { top: 0, left: "10%" },
      { top: 5, left: "25%" },
      { top: 12, left: "40%" },
      { top: 8, left: "55%" },
      { top: 16, left: "70%" },
      { top: 10, left: "85%" },
      { top: 20, left: "15%" },
      { top: 24, left: "30%" },
      { top: 16, left: "45%" },
      { top: 28, left: "60%" },
      { top: 20, left: "75%" },
      { top: 32, left: "90%" },
      { top: 6, left: "5%" },
      { top: 14, left: "20%" },
      { top: 22, left: "35%" },
      { top: 18, left: "50%" },
      { top: 26, left: "65%" },
      { top: 10, left: "80%" },
      { top: 16, left: "95%" },
      { top: 30, left: "10%" }
    ];
    
    return positions.map((pos, index) => (
      <div 
        key={index}
        className="cherry-blossom" 
        style={{ 
          top: typeof pos.top === 'number' ? `${pos.top}px` : pos.top, 
          left: pos.left,
          animationDelay: `${(index * 0.5) % 10}s`,
          animationDuration: `${8 + (index % 5)}s`
        }}
      />
    ));
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white via-cherry-pink-50 to-sakura-100 overflow-hidden">
      {/* Enhanced Cherry Blossom Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs with hardware acceleration */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cherry-pink-200 rounded-full opacity-20 animate-pulse blur-xl transform-gpu"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-sakura-300 rounded-full opacity-30 animate-bounce blur-lg transform-gpu"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cherry-pink-100 rounded-full opacity-25 animate-pulse blur-2xl transform-gpu"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-sakura-200 rounded-full opacity-35 animate-bounce blur-xl transform-gpu"></div>
        
        {/* Animated Cherry Blossoms with optimized rendering */}
        <div className="cherry-blossom absolute top-0 left-[10%]">
          <img src="/cherry-blossom.svg" alt="" className="w-full h-full opacity-0" />
        </div>
        
        {cherryBlossoms}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Cherry Blossom Icon with improved animation */}
        <div className="mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cherry-pink-400 to-sakura-500 rounded-full shadow-2xl ring-4 ring-white/30 backdrop-blur-sm">
            <span className="text-4xl">🌸</span>
          </div>
        </div>
        
        {/* Title with improved typography and consistent text rendering */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 leading-tight font-japanese tracking-tight animation-fade-in">
          <span className="gradient-text inline-block">{dict.hero.title}</span>
        </h1>

        {/* Subtitle with better spacing */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed font-medium animation-fade-in stagger-delay-1">
          {dict.hero.subtitle}
        </p>
        
        {/* Improved CTA Button with better accessibility */}
        <div className="mb-20 animation-fade-in stagger-delay-2">
          <button 
            className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white font-bold rounded-full text-2xl shadow-2xl hover:shadow-cherry-pink-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            aria-label={dict.hero.cta}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">{dict.hero.cta}</span>
            <span className="relative z-10 ml-3 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>
        
        {/* Enhanced Stats Section with performance optimizations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '47', label: '都道府県', icon: '🏞️', delay: 'stagger-delay-3' },
            { value: '9', label: '地域', icon: '🗾', delay: 'stagger-delay-4' },
            { value: '100+', label: '観光地', icon: '🎌', delay: 'stagger-delay-5' },
            { value: '24/7', label: 'サポート', icon: '💬', delay: 'stagger-delay-6' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`text-center group bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:bg-white/40 transition-all duration-300 shadow-lg hover:shadow-xl transform-gpu animation-fade-in ${stat.delay}`}
            >
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
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <svg 
          className="w-full h-auto fill-warm-white block"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero
