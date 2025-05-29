import ClientNavigationWrapper from './ClientNavigationWrapper';
import { Locale } from '@/i18n/config'

interface NavigationProps {
  dict: any
  lang: Locale
}

const Navigation = ({ dict, lang }: NavigationProps) => {
  return <ClientNavigationWrapper dict={dict} lang={lang} />;
}

export default Navigation