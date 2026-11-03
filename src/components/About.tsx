import React from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './About.css';

const About: React.FC = () => {
  const howIWork = portfolioData.about.howIWork;
  const learningItems = portfolioData.about.learning;

  return (
    <section id="about" className="page-section about-section" aria-labelledby="about-title">
      <header className="section-head">
        <span className="section-kicker">ABOUT ME</span>
        <h2 id="about-title">
          {portfolioData.about.heading} <span className="accent">{portfolioData.about.headingAccent}</span>
        </h2>
      </header>

      <div className="about-grid">
        <div className="about-copy">
          <p>{portfolioData.about.text}</p>
        </div>

        <div className="photo-frame">
          <img src={portfolioData.about.photo} alt={portfolioData.profile.name} />
        </div>
      </div>

      <div className="how-i-work">
        <h3>How I work</h3>
        <div className="how-grid">
          {howIWork.map((item, index) => (
            <div key={item.title} className="how-step">
              <span className="step-number">0{index + 1}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="learning-panel panel">
        <h3>Currently learning</h3>
        <div className="learning-list">
          {learningItems.map((item, index) => {
            const icons = ['code', 'gear', 'globe'] as const;
            return (
              <span key={item} className="chip learning-item">
                <Icon name={icons[index % icons.length]} size={16} />
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;