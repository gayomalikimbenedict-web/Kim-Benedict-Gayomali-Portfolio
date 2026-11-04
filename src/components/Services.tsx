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
          <div className="approach-row">
            <article className="approach-step">
              <div className="step-header">
                <span className="step-number">01</span>
                <span className="step-icon"><Icon name={portfolioData.approach[0].icon} size={28} /></span>
              </div>
              <div className="step-copy">
                <strong>{portfolioData.approach[0].title}</strong>
                <p>{portfolioData.approach[0].description}</p>
              </div>
            </article>
            <span className="approach-arrow approach-arrow--right" aria-hidden="true">→</span>
            <article className="approach-step">
              <div className="step-header">
                <span className="step-number">02</span>
                <span className="step-icon"><Icon name={portfolioData.approach[1].icon} size={28} /></span>
              </div>
              <div className="step-copy">
                <strong>{portfolioData.approach[1].title}</strong>
                <p>{portfolioData.approach[1].description}</p>
              </div>
            </article>
          </div>

          <span className="approach-arrow approach-arrow--vertical" aria-hidden="true">↓</span>

          <div className="approach-row approach-row--bottom">
            <article className="approach-step">
              <div className="step-header">
                <span className="step-number">04</span>
                <span className="step-icon"><Icon name={portfolioData.approach[3].icon} size={28} /></span>
              </div>
              <div className="step-copy">
                <strong>{portfolioData.approach[3].title}</strong>
                <p>{portfolioData.approach[3].description}</p>
              </div>
            </article>
            <span className="approach-arrow approach-arrow--left" aria-hidden="true">←</span>
            <article className="approach-step">
              <div className="step-header">
                <span className="step-number">03</span>
                <span className="step-icon"><Icon name={portfolioData.approach[2].icon} size={28} /></span>
              </div>
              <div className="step-copy">
                <strong>{portfolioData.approach[2].title}</strong>
                <p>{portfolioData.approach[2].description}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;