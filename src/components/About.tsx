import React from 'react';
import { portfolioData } from '../data/portfolio';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="page-section about-section" aria-label="About me">
      <div className="about-grid">
        <div className="about-copy">
          <span className="about-kicker">About</span>
          <h2>{portfolioData.about.intro}</h2>
          <div className="about-description">
            <p>{portfolioData.about.paragraphs[0]}</p>
            <div className="about-philosophy">
              <span>Working philosophy</span>
              <p>{portfolioData.about.workingPhilosophy}</p>
            </div>
            <p>{portfolioData.about.paragraphs[1]}</p>
          </div>
          <div className="about-skills" aria-label="Areas of expertise">
            {portfolioData.about.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="photo-frame">
          <img src={portfolioData.about.photo} alt={portfolioData.profile.name} />
        </div>
      </div>
    </section>
  );
};

export default About;