import React from 'react';
import { portfolioData } from '../data/portfolio';
import './About.css';

const About: React.FC = () => {
    return (
        <section id="about" className="page-section about-section" aria-labelledby="about-title">
            <header className="section-header">
                <span className="section-kicker">ABOUT</span>
                <h2 id="about-title">About</h2>
                <p>{portfolioData.profile.studioLine}</p>
            </header>
            <div className="about-body">
                <p>{portfolioData.about}</p>
                <div className="about-portrait-row">
                <img className="about-avatar" src="/images/avatar.png" alt={portfolioData.profile.name} />
                <span>{portfolioData.roles.join(' · ')}</span>
                </div>
            </div>
        </section>
    );
};

export default About;