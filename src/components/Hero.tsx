import React from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-copy">
        <h1 id="home-title">{portfolioData.profile.name}</h1>
        <p className="hero-headline">
          {portfolioData.profile.headline}{' '}
          <span className="accent">{portfolioData.profile.headlineAccent}</span>
        </p>
        <p className="hero-subtext">{portfolioData.profile.subtext}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View My Projects
            <Icon name="arrow-right" size={18} />
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in Touch
            <Icon name="mail" size={18} />
          </a>
        </div>
      </div>

      <div className="hero-portrait-wrap" aria-label="Portrait of Kim Benedict Gayomali">
        <img src={portfolioData.profile.portrait} alt="Kim Benedict Gayomali" className="hero-portrait" />
      </div>
    </div>
  );
};

export default Hero;