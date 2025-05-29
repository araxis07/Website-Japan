'use client'

import { useState } from 'react'
import { Locale } from '@/i18n/config'

interface ContactFormProps {
  dict: any
  lang: Locale
}

const ContactForm = ({ dict, lang }: ContactFormProps) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulating form submission
    try {
      // In a real application, you'd submit the form data to an API
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formState) })
      
      // For demo purposes, we'll just wait 1 second and then show success
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('success')
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    }
  }
  
  const subjectOptions = [
    { value: '', label: lang === 'ja' ? '-- 件名を選択 --' : '-- Select Subject --' },
    { value: 'general', label: lang === 'ja' ? '一般的なお問い合わせ' : 'General Inquiry' },
    { value: 'booking', label: lang === 'ja' ? '予約について' : 'Booking Inquiry' },
    { value: 'feedback', label: lang === 'ja' ? 'フィードバック' : 'Feedback' },
    { value: 'partnership', label: lang === 'ja' ? 'パートナーシップ' : 'Partnership Opportunities' },
    { value: 'other', label: lang === 'ja' ? 'その他' : 'Other' }
  ]
  
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-warm-white to-cherry-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Decorative cherry blossoms */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={`blossom-${i}`} 
            className="absolute cherry-blossom opacity-50"
            style={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mb-6">
            {lang === 'ja' ? 'お問い合わせ' : 'Contact Us'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'ja' 
              ? '日本旅行に関するご質問やお問い合わせはこちらからどうぞ。' 
              : 'Have questions about traveling in Japan? Get in touch with us.'}
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-cherry-pink-500 to-sakura-500 p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">
                {lang === 'ja' ? '連絡先情報' : 'Contact Information'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-3 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium mb-1">{lang === 'ja' ? '電話番号' : 'Phone'}</p>
                    <a href="tel:+81-3-1234-5678" className="text-white/80 hover:text-white transition-colors">+81-3-1234-5678</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-3 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium mb-1">{lang === 'ja' ? 'メールアドレス' : 'Email'}</p>
                    <a href="mailto:info@japantravel-guide.com" className="text-white/80 hover:text-white transition-colors">info@japantravel-guide.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/20 p-3 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium mb-1">{lang === 'ja' ? '住所' : 'Address'}</p>
                    <p className="text-white/80">
                      {lang === 'ja' 
                        ? '〒100-0005 東京都千代田区丸の内1-1-1 丸の内センタービル8F' 
                        : '1-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005, Japan'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-xl font-bold mb-4">
                  {lang === 'ja' ? 'フォローする' : 'Follow Us'}
                </h4>
                <div className="flex space-x-4">
                  {['twitter', 'facebook', 'instagram', 'youtube'].map((platform) => (
                    <a 
                      key={platform}
                      href={`https://${platform}.com/japantravelguide`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-cherry-pink-500 transition-all duration-300"
                      aria-label={platform}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {platform === 'twitter' && <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />}
                        {platform === 'facebook' && <path d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9c0-2.57 1.57-3.97 3.87-3.97.78 0 1.53.05 2.31.15v2.68H17.5c-1.25 0-1.5.6-1.5 1.47v1.93h3l-.39 3h-2.61V22h4.9a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2z" />}
                        {platform === 'instagram' && <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.053-.059 1.37-.059 4.04 0 2.672.01 2.988.059 4.042.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.059 4.04.059 2.672 0 2.988-.01 4.042-.059.976-.045 1.504-.207 1.857-.344.466-.182.8-.399 1.15-.748.35-.35.566-.684.748-1.15.137-.352.3-.882.344-1.857.048-1.054.059-1.37.059-4.041 0-2.67-.01-2.987-.059-4.04-.045-.976-.207-1.505-.344-1.858-.182-.466-.399-.8-.748-1.15-.35-.35-.684-.566-1.15-.748-.353-.137-.881-.3-1.857-.344-1.054-.048-1.37-.059-4.041-.059zm0 3.064a5.133 5.133 0 1 1 0 10.267 5.133 5.133 0 0 1 0-10.267zm0 8.468a3.334 3.334 0 1 0 0-6.668 3.334 3.334 0 0 0 0 6.668zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />}
                        {platform === 'youtube' && <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.208 5.94.21 12c-.002 6.06.278 8.55 4.175 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.177-2.756 4.175-8.816-.002-6.06-.277-8.55-4.175-8.816zM8 15.33v-6.66l6 3.33-6 3.33z" />}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {lang === 'ja' ? 'メッセージを送る' : 'Send us a message'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'ja' ? 'お名前' : 'Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cherry-pink-500 focus:border-cherry-pink-500 transition-colors"
                    placeholder={lang === 'ja' ? '山田 花子' : 'John Doe'}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'ja' ? 'メールアドレス' : 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cherry-pink-500 focus:border-cherry-pink-500 transition-colors"
                    placeholder={lang === 'ja' ? 'yamada@example.com' : 'john@example.com'}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'ja' ? '件名' : 'Subject'}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cherry-pink-500 focus:border-cherry-pink-500 transition-colors"
                  >
                    {subjectOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'ja' ? 'メッセージ' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cherry-pink-500 focus:border-cherry-pink-500 transition-colors"
                    placeholder={lang === 'ja' ? 'お問い合わせ内容をご記入ください...' : 'Write your message here...'}
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 ${
                      status === 'loading' 
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cherry-pink-500 to-sakura-500 hover:from-cherry-pink-600 hover:to-sakura-600 shadow-lg hover:shadow-cherry-pink-500/50'
                    }`}
                  >
                    {status === 'loading' 
                      ? (lang === 'ja' ? '送信中...' : 'Sending...')
                      : (lang === 'ja' ? '送信する' : 'Send Message')}
                  </button>
                </div>
                
                {/* Form submission status */}
                {status === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    {lang === 'ja' 
                      ? 'メッセージが送信されました。ありがとうございます！' 
                      : 'Your message has been sent. Thank you!'}
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {lang === 'ja' 
                      ? 'エラーが発生しました。もう一度お試しください。' 
                      : 'An error occurred. Please try again.'}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
