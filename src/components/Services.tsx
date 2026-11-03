import React from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './Services.css';

const Services: React.FC = () => {
  return (
    <section id="services" className="page-section services-section" aria-label="Services">
      <div className="service-rows">
        {portfolioData.services.map((service) => (
          <article key={service.title} className="service-row panel">
            <div className="service-number">{service.number}</div>
            <span className="icon-tile"><Icon name={service.icon} size={20} /></span>
            <div className="service-copy">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <a href="#projects" className="text-link service-link">
              Explore work
              <Icon name="arrow-right" size={16} />
            </a>
          </article>
        ))}
      </div>

      <div className="approach-panel panel">
        <h3>How I approach a project</h3>
        <div className="approach-flow">
          {portfolioData.approach.map((step, index) => (
            <React.Fragment key={step.title}>
              <div className="approach-step">
                <span className="step-number">0{index + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </div>
              {index < portfolioData.approach.length - 1 ? <span className="approach-arrow" aria-hidden="true">→</span> : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;