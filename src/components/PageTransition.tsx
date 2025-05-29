'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Add small delay to ensure the transition is visible
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timeout)
  }, [])

  // Listen for route changes to handle transitions
  useEffect(() => {
    const handleRouteChange = () => {
      setIsVisible(false)
    }

    window.addEventListener('beforeunload', handleRouteChange)
    return () => {
      window.removeEventListener('beforeunload', handleRouteChange)
    }
  }, [router])

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}

export default PageTransition
