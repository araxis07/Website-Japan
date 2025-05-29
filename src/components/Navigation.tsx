import ClientNavigationWrapper from './ClientNavigationWrapper';
import { Locale } from '@/i18n/config'

interface NavigationProps {
  dict: any
  lang: Locale
}

const Navigation = ({ dict, lang }: NavigationProps) => {
  // Ensure we're passing the correct props to ClientNavigationWrapper
  return <ClientNavigationWrapper dict={dict} lang={lang} />;
}

export default Navigation