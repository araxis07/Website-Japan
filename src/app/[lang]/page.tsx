import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero.improved'
import RegionsList from '@/components/RegionsList.improved'
import FeaturedDestinations from '@/components/FeaturedDestinations'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import SeasonalHighlights from '@/components/SeasonalHighlights'
import ContactForm from '@/components/ContactForm'
import PageTransition from '@/components/PageTransition'
import { Suspense } from 'react'
import { getDictionary } from '@/i18n/dictionaries'
import { Locale } from '@/i18n/config'

// Define the props interface
interface PageProps {
  params: Promise<{ 
    lang: Locale 
  }>
}

// Create a client-side wrapper for the page content
const LocalePage = async ({ params }: PageProps) => {
  const { lang: currentLang } = await params
  const dict = await getDictionary(currentLang);  return (
    <PageTransition>
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-warm-white via-cherry-pink-50 to-sakura-50 scroll-smooth overflow-x-hidden">
        <Navigation dict={dict} lang={currentLang} />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-cherry-pink-400 to-sakura-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl">🌸</span>
            </div>
          </div>
        }>
          <div className="pt-24 relative z-10">
            <Hero dict={dict} />
            <RegionsList dict={dict} lang={currentLang} />
            <SeasonalHighlights dict={dict} lang={currentLang} />
            <FeaturedDestinations dict={dict} lang={currentLang} />
            <ContactForm dict={dict} lang={currentLang} />
          </div>
        </Suspense>
        <Footer dict={dict} lang={currentLang} />
        <ScrollToTop />
      </main>
    </PageTransition>
  )
}

export default LocalePage
