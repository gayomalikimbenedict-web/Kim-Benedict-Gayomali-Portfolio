import React from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './Services.css';

const Services: React.FC = () => {
  const { services, approach } = portfolioData;

  return (
    <section id="services" className="page-section services-section" aria-labelledby="services-title">
      <header className="services-header">
        <span className="chip">Services</span>
        <h2 id="services-title">
          What I can build for <span className="accent">your operations</span>
        </h2>
        <p>Automation, reporting, and web tools shaped by real operations experience.</p>
      </header>

      <div className="service-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card panel">
            <div className="service-card-top">
              <span className="icon-tile"><Icon name={service.icon} size={22} /></span>
              <span className="service-number" aria-hidden="true">{service.number}</span>
            </div>

            <h3>{service.title}</h3>
            <p className="service-description">{service.description}</p>

            <ul className="service-tags" aria-label={`${service.title} includes`}>
              {service.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <a href="#contact" className="text-link service-link">
              Discuss this service
              <Icon name="arrow-right" size={16} />
            </a>
          </article>
        ))}
      </div>

      <div className="approach-panel panel">
        <h3>How I approach a project</h3>
        <ol className="approach-steps">
          {approach.map((step, index) => (
            <li key={step.title} className="approach-step">
              <div className="approach-marker">
                <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Services;
