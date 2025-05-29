'use client'

import { useEffect } from 'react'

/**
 * Smoothly scrolls to the element with the specified ID
 * @param elementId The ID of the element to scroll to (without the # symbol)
 * @param offset Optional vertical offset in pixels (default: 80px to account for fixed header)
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId)
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Handles anchor link clicks with smooth scrolling
 * @param e Click event
 * @param id The ID of the element to scroll to (without the # symbol)
 */
export function handleAnchorClick(e: React.MouseEvent, id: string): void {
  e.preventDefault()
  scrollToElement(id)
  
  // Optionally update URL without causing a page refresh
  if (window.history.pushState) {
    const newUrl = window.location.href.split('#')[0] + '#' + id
    window.history.pushState({ path: newUrl }, '', newUrl)
  }
}

/**
 * Hook to handle automatic scrolling to hash on page load
 */
export function useHashScroll(): void {
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to it
    const hash = window.location.hash
    if (hash) {
      // Remove the # symbol
      const id = hash.substring(1)
      
      // Add a small delay to ensure the elements are fully rendered
      setTimeout(() => {
        scrollToElement(id)
      }, 500)
    }
  }, [])
}
