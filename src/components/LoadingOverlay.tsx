'use client'

import { useEffect, useState } from 'react'

const LoadingOverlay = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-warm-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* Cherry blossom icon with gradient */}
          <div className="w-24 h-24 bg-gradient-to-br from-cherry-pink-400 to-sakura-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
            <span className="text-white text-4xl">🌸</span>
          </div>
          
          {/* Animated ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-cherry-pink-500/70 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-r-2 border-sakura-400/70 animate-ping opacity-30"></div>
        </div>
        
        {/* Text */}
        <h2 className="mt-6 text-2xl font-bold gradient-text">Japan Travel</h2>
        <p className="mt-3 text-gray-600">Loading the beauty of Japan...</p>
        
        {/* Cherry blossoms falling animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="cherry-blossom-1 cherry-blossom"></div>
          <div className="cherry-blossom-5 cherry-blossom"></div>
          <div className="cherry-blossom-9 cherry-blossom"></div>
          <div className="cherry-blossom-13 cherry-blossom"></div>
          <div className="cherry-blossom-17 cherry-blossom"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
