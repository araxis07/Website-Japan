import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'section-title',
    'gradient-text',
    {
      pattern: /^from-.*$/,
      variants: ['hover', 'focus', 'group-hover'],
    },
    {
      pattern: /^to-.*$/,
      variants: ['hover', 'focus', 'group-hover'],
    },
    {
      pattern: /^bg-.*$/,
      variants: ['hover', 'focus', 'group-hover'],
    },
  ],
  theme: {
    extend: {
      colors: {
        'cherry-pink': {
          50: '#fef7f7',
          100: '#feecec',
          200: '#fdd4d4',
          300: '#fab5b5',
          400: '#f48b8b',
          500: '#eb5757',
          600: '#d73939',
          700: '#b52d2d',
          800: '#962929',
          900: '#7d2727',
        },
        'sakura': {
          50: '#fef9f9',
          100: '#fef2f2',
          200: '#fde8e8',
          300: '#fbd5d5',
          400: '#f8b4b4',
          500: '#f87171',
          600: '#ef4444',
          700: '#dc2626',
          800: '#b91c1c',
          900: '#991b1b',
        },
        'soft-white': '#fefefe',
        'warm-white': '#fdf9f9',
      },      fontFamily: {
        'japanese': ['var(--font-noto-sans-jp)', 'Noto Sans JP', 'sans-serif'],
        'english': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'noto-sans-jp': ['var(--font-noto-sans-jp)', 'Noto Sans JP', 'sans-serif'],
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
      },backgroundColor: {
        'warm-white': '#fdf9f9',
      },
      backgroundImage: {
        'cherry-gradient': 'linear-gradient(135deg, #fef9f9 0%, #fde8e8 100%)',
        'sakura-gradient': 'linear-gradient(135deg, #fef2f2 0%, #fbd5d5 100%)',
      },
      animation: {
        'cherry-fall': 'cherryFall 8s infinite linear',
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        cherryFall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
