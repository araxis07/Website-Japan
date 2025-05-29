// This file is deprecated, use Navigation.improved.tsx instead
import Navigation from './Navigation.improved';
import { Locale } from '@/i18n/config'

interface NavigationProps {
  dict: any
  lang: Locale
}

const NavigationWrapper = ({ dict, lang }: NavigationProps) => {
  // Use the improved Navigation component directly
  return <Navigation dict={dict} lang={lang} />;
}

export default NavigationWrapper