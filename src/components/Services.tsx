import { services, servicesIntro } from '../data/content'
import { SectionHead } from './SectionHead'
import './Services.css'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <SectionHead id="services-title" eyebrow="Services" title={servicesIntro.title} lede={servicesIntro.lede} />
      <div className="grid g2">
        {services.map((service, index) => (
          <article key={service.id} className="card svc" data-reveal>
            <span className="num">{String(index + 1).padStart(2, '0')}</span>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            <div className="tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
