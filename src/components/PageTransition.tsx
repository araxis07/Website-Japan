'use client'

import { useState, useEffect } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Add small delay to ensure the transition is visible
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

export default PageTransition
