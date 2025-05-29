import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '日本旅行ガイド | Japan Travel Guide',
  description: '日本全国の美しい観光地を北から南まで紹介する完全ガイド。桜の美しさと共に日本の魅力を発見しましょう。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
