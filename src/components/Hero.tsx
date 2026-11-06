import React, { useMemo, useRef } from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import { useLayerParallax } from '../hooks/useLayerParallax';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const vectorLayerRef = useRef<HTMLDivElement>(null);
  const contentLayerRef = useRef<HTMLDivElement>(null);

  const layers = useMemo(
    () => [
      { ref: backgroundLayerRef, speed: 0.06 },
      { ref: vectorLayerRef, speed: 0.14 },
      { ref: contentLayerRef, speed: 0.22 },
    ],
    []
  );
  useLayerParallax(heroRef, layers);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="home-title">
      <div className="parallax-layer hero-background-layer" ref={backgroundLayerRef} aria-hidden="true">
        <div className="hero-background-glow" />
        <div className="hero-background-grid" />
        <div className="hero-background-ribbon" />
      </div>

      <div className="parallax-layer hero-vector-layer" ref={vectorLayerRef} aria-hidden="true">
        <svg className="hero-vectors" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <circle className="hero-vector-orbit" cx="860" cy="370" r="270" />
          <circle className="hero-vector-orbit hero-vector-orbit--inner" cx="860" cy="370" r="215" />
          <path className="hero-vector-line" d="M650 160h120v75h190v-75h130" />
          <path className="hero-vector-line" d="M650 625h105v-80h190v65h130" />
          <circle className="hero-vector-node" cx="770" cy="160" r="4" />
          <circle className="hero-vector-node" cx="960" cy="235" r="4" />
          <circle className="hero-vector-node" cx="945" cy="545" r="4" />
          <circle className="hero-vector-node" cx="755" cy="545" r="4" />
        </svg>
      </div>

      <div className="parallax-layer hero-content-layer" ref={contentLayerRef}>
        <div className="hero-main">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              {portfolioData.profile.studioLine}
            </span>
            <h1 id="home-title" className="hero-headline">
              {portfolioData.profile.headline}{' '}
              <span className="accent">{portfolioData.profile.headlineAccent}</span>
            </h1>
            <p className="hero-subtext">{portfolioData.profile.subtext}</p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <Icon name="folder" size={18} />
                View My Projects
                <Icon name="arrow-right" size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                <Icon name="mail" size={18} />
                Get in Touch
              </a>
              <a href="/Kim_Benedict_Gayomali_Resume.pdf" className="btn btn-secondary" download>
                <Icon name="download" size={18} />
                Download CV
              </a>
            </div>
          </div>

          <div className="hero-portrait-wrap" aria-label="Portrait of Kim Benedict Gayomali">
            <img src={portfolioData.profile.portrait} alt="Kim Benedict Gayomali" className="hero-portrait" />
          </div>
        </div>

        <div className="hero-expertise" aria-label="Core expertise">
          <div className="hero-expertise-heading">
            <span>What I do</span>
            <strong>My Core Expertise</strong>
          </div>
          {portfolioData.whatIDo.map((item) => (
            <div className="hero-expertise-item" key={item.title}>
              <Icon name={item.icon} size={24} />
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;