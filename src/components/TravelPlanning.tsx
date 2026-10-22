import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'

export default function TravelPlanning({ dict }: { dict: Dictionary }) {
  const icons = ['train', 'ticket', 'bed', 'leaf', 'globe', 'pin'] as const
  return (
    <section id="plan" className="planning-section" aria-labelledby="plan-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2 id="plan-title">{dict.plan.title}</h2>
            <p>{dict.plan.subtitle}</p>
          </div>
          <span className="section-stamp" aria-hidden="true">
            備
          </span>
        </div>
        <div className="planning-grid">
          {dict.plan.cards.map((card, index) => (
            <article className="planning-card" key={card.title}>
              <span className="planning-icon">
                <Icon name={icons[index]} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <a href={card.url} className="text-link">
                {card.link}
                <Icon name="external" />
              </a>
            </article>
          ))}
        </div>
        <div className="planning-bottom">
          <div className="faq">
            <h3>{dict.plan.faqTitle}</h3>
            {dict.plan.faqs.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <aside className="travel-help" id="contact">
            <Icon name="globe" />
            <h3>{dict.plan.help}</h3>
            <p>{dict.plan.helpText}</p>
            <a href="https://www.japan.travel/en/plan/" className="text-link">
              {dict.plan.helpLink}
              <Icon name="external" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
