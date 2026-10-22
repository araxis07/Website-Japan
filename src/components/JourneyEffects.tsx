'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function JourneyEffects() {
  const pathname = usePathname()
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const progress = document.querySelector<HTMLElement>('.reading-progress')
    const scroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const length = document.documentElement.scrollHeight - window.innerHeight
        progress?.style.setProperty(
          'transform',
          `scaleX(${length > 0 ? window.scrollY / length : 0})`,
        )
        frame = 0
      })
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!media.matches) entry.target.classList.add('entered')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12 },
    )
    document
      .querySelectorAll(
        '.section-heading, .region-photo, .detail-hero, .experience-card, .journey-paper',
      )
      .forEach((el) => observer.observe(el))
    const tilt = (event: PointerEvent) => {
      if (media.matches || event.pointerType !== 'mouse') return
      const card = (event.target as HTMLElement).closest<HTMLElement>('.destination-card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty(
        '--tilt-x',
        `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`,
      )
      card.style.setProperty(
        '--tilt-y',
        `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`,
      )
    }
    const reset = (event: PointerEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>('.destination-card')
      if (card && !card.contains(event.relatedTarget as Node)) {
        card.style.removeProperty('--tilt-x')
        card.style.removeProperty('--tilt-y')
      }
    }
    window.addEventListener('scroll', scroll, { passive: true })
    document.addEventListener('pointermove', tilt, { passive: true })
    document.addEventListener('pointerout', reset)
    scroll()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scroll)
      document.removeEventListener('pointermove', tilt)
      document.removeEventListener('pointerout', reset)
    }
  }, [pathname])
  return <div className="reading-progress" aria-hidden="true" />
}
