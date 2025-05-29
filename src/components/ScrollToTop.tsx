'use client'

import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white shadow-lg border border-cherry-pink-200 transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none group"
          aria-label="Scroll to top"
        >
          <div className="w-5 h-5 flex items-center justify-center relative">
            <span className="absolute inset-0 bg-gradient-to-br from-cherry-pink-400 to-sakura-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <svg 
              className="w-5 h-5 text-cherry-pink-600 group-hover:text-white relative z-10 transition-colors duration-300"
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M5 15l7-7 7 7"></path>
            </svg>
          </div>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Top
          </span>

          {/* Cherry blossom animation effect */}
          <span className="absolute -top-1 -left-1 w-2 h-2 bg-cherry-pink-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-sakura-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></span>
        </button>
      )}
    </>
  )
}

export default ScrollToTop
