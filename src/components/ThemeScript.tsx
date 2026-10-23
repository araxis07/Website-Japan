'use client'

import { themeInit } from '@/lib/appearance'

export default function ThemeScript() {
  return (
    <script
      // Run during HTML parsing; Atmosphere maintains the theme on client navigation.
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInit }}
    />
  )
}
