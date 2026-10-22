const paths = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  external: 'M7 17 17 7M7 7h10v10',
  search: 'm21 21-5-5M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18',
  train:
    'M7 3h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM5 11h14M9 3v8m6-8v8M8 15h1m6 0h1M8 19l-2 3m10-3 2 3',
  ticket: 'M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4V5Zm12 0v3m0 3v2m0 3v3',
  bed: 'M3 19V8m0 8h18m0 3V8M3 8h18M5 8V4h14v4M7 12h3m4 0h3',
  leaf: 'M20 3C9 2 3 7 4 14c1 6 9 7 13 2 3-4 3-9 3-13ZM3 22 15 10',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'm6 6 12 12M6 18 18 6',
} as const

export default function Icon({
  name,
  className = '',
}: {
  name: keyof typeof paths
  className?: string
}) {
  return (
    <svg
      className={`icon ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
