import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <h1>{portfolioData.profile.headline}</h1>
                <p>{portfolioData.profile.subtext}</p>
            </div>
            <a href="#contact" className="cta-button">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
        </section>
    );
};

export default Hero;