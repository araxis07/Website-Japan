'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'
import { appearanceKey } from '@/lib/appearance'

let memoryTheme: string | null = null
function subscribe(callback: () => void) {
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  const color = matchMedia('(prefers-color-scheme: dark)')
  const storage = (event: StorageEvent) => {
    if (!event.key || event.key === appearanceKey) {
      memoryTheme = null
      callback()
    }
  }
  media.addEventListener('change', callback)
  color.addEventListener('change', callback)
  window.addEventListener('appearance-change', callback)
  window.addEventListener('storage', storage)
  return () => {
    media.removeEventListener('change', callback)
    color.removeEventListener('change', callback)
    window.removeEventListener('appearance-change', callback)
    window.removeEventListener('storage', storage)
  }
}
const reducedSnapshot = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const themeSnapshot = () => {
  if (memoryTheme) return memoryTheme
  try {
    const saved = localStorage.getItem(appearanceKey)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {}
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })
export const useAtmosphere = () => useContext(ThemeContext)

export default function Atmosphere({
  children,
  copy,
}: {
  children: React.ReactNode
  copy: Dictionary['atmosphere']
}) {
  const theme = useSyncExternalStore(subscribe, themeSnapshot, () => 'light')
  const reduced = useSyncExternalStore(subscribe, reducedSnapshot, () => true)
  const [paused, setPaused] = useState(false)
  const moving = !reduced && !paused
  const toggleTheme = () => {
    const value = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    memoryTheme = value
    try {
      localStorage.setItem(appearanceKey, value)
    } catch {
      /* Appearance still works when storage is blocked. */
    }
    window.dispatchEvent(new Event('appearance-change'))
  }
  useEffect(() => {
    document.documentElement.dataset.theme = themeSnapshot()
  }, [theme])
  useEffect(() => {
    document.documentElement.dataset.motion = moving ? 'moving' : 'still'
  }, [moving])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className="sakura-atmosphere"
        data-moving={moving}
        data-reduced={reduced}
        aria-hidden="true"
      >
        {Array.from({ length: 28 }, (_, index) => (
          <span
            className="sakura-petal"
            key={index}
            style={
              {
                left: `${(index * 37) % 100}%`,
                width: `${9 + (index % 3) * 3}px`,
                height: `${12 + (index % 3) * 3}px`,
                animationDuration: `${21 + (index % 6) * 3}s`,
                animationDelay: `${-index * 1.7}s`,
                '--depth': `${-(index % 5) * 110}px`,
              } as CSSProperties
            }
          />
        ))}
        <span className="still-blossom">✿</span>
      </div>
      {children}
      <div className="atmosphere-controls" role="group" aria-label={copy.label}>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? copy.light : copy.dark}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          <span>{theme === 'dark' ? copy.light : copy.dark}</span>
        </button>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          disabled={reduced}
          aria-pressed={!moving}
          aria-label={reduced ? copy.reduced : moving ? copy.pause : copy.play}
        >
          <Icon name={moving ? 'pause' : 'play'} />
          <span>{reduced ? copy.reduced : moving ? copy.pause : copy.play}</span>
        </button>
      </div>
    </ThemeContext.Provider>
  )
}
