'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)
    
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [router])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white via-cherry-pink-50 to-sakura-100 flex flex-col items-center justify-center px-4 py-16">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-cherry-pink-400/80 to-sakura-500/80 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          🌸
        </div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black mb-6 text-center" style={{
          backgroundImage: 'linear-gradient(135deg, #dc2626, #f87171, #fda4af)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
        404 - ページが見つかりません
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-700 mb-12 text-center max-w-xl">
        お探しのページは存在しないか、移動した可能性があります。
        <br />
        <span className="text-lg text-gray-600">{countdown}秒後にホームページにリダイレクトします...</span>
      </p>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link href="/" className="px-8 py-3 bg-gradient-to-r from-cherry-pink-500 to-sakura-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          ホームに戻る
        </Link>
        
        <button 
          onClick={() => router.back()} 
          className="px-8 py-3 bg-white text-cherry-pink-600 font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-cherry-pink-200"
        >
          前のページに戻る
        </button>
      </div>
      
      {/* Cherry blossoms decoration */}
      <div className="fixed top-10 left-10 text-4xl animate-bounce" style={{animationDuration: '3s'}}>🌸</div>
      <div className="fixed top-20 right-12 text-5xl animate-bounce" style={{animationDuration: '4s'}}>🌸</div>
      <div className="fixed bottom-16 left-16 text-3xl animate-bounce" style={{animationDuration: '3.5s'}}>🌸</div>
      <div className="fixed bottom-20 right-20 text-6xl animate-bounce" style={{animationDuration: '4.5s'}}>🌸</div>
    </div>
  )
}
