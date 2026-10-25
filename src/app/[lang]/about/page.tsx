import ReportIssue from '@/components/ReportIssue'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { editorial } from '@/data/editorial'
import { pageMetadata } from '@/utils/site'
type Props = { params: Promise<{ lang: string }> }
export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return pageMetadata(
    lang,
    '/about',
    editorial[lang].title,
    editorial[lang].description,
  )
}
export default async function About({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const copy = editorial[lang],
    dict = await getDictionary(lang)
  const configured = process.env.NEXT_PUBLIC_CONTACT_URL
  const contact =
    configured && /^https:\/\//.test(configured) ? configured : undefined
  return (
    <main id="main-content" className="container about-page">
      <Link href={`/${lang}`}>{dict.detail.home}</Link>
      <h1>{copy.title}</h1>
      <p>{copy.description}</p>
      {copy.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
      <p>{dict.tools.reportHelp}</p>
      <ReportIssue contact={contact} />
      <p>
        <Link href={`/${lang}/credits`}>{dict.footer.credits}</Link> ·{' '}
        <a href="https://osmfoundation.org/wiki/Privacy_Policy">
          OpenStreetMap · Privacy
        </a>
      </p>
    </main>
  )
}
