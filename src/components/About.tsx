import React from 'react';
import { portfolioData } from '../data/portfolio';
import './About.css';

const About: React.FC = () => {
  const howIWork = portfolioData.about.howIWork;

  return (
    <section id="about" className="page-section about-section" aria-label="About me">
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

    </section>
  );
};

export default About;