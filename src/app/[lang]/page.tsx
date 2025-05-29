import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import RegionsList from '@/components/RegionsList'
import FeaturedDestinations from '@/components/FeaturedDestinations'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
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
    <main id="main-content" className="min-h-screen bg-gradient-to-b from-warm-white via-cherry-pink-50 to-sakura-50 scroll-smooth">
      <Navigation dict={dict} lang={currentLang} />
      <Hero dict={dict} />
      <RegionsList dict={dict} lang={currentLang} />
      <FeaturedDestinations dict={dict} lang={currentLang} />
      <Footer dict={dict} lang={currentLang} />
      <ScrollToTop />
    </main>
  )
}

export default LocalePage
