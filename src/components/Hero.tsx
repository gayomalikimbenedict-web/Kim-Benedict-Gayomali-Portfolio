import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <span className="section-kicker">HOME</span>
                <h1 id="home-title">{portfolioData.profile.headline}</h1>
                <p>{portfolioData.profile.subtext}</p>
            </div>
            <a href="#contact" className="cta-button">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
    );
};

export default Hero;