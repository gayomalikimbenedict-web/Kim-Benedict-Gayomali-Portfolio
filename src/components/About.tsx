import React from 'react';
import { UserRound } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './About.css';

const About: React.FC = () => {
    return (
        <section id="about" className="bento-card about-section">
            <div className="card-heading">
                <span className="card-icon"><UserRound size={18} /></span>
                <div>
                    <h2>About</h2>
                    <p>{portfolioData.profile.studioLine}</p>
                </div>
            </div>
            <div className="about-portrait-row">
                <img className="about-avatar" src="/images/avatar.png" alt={portfolioData.profile.name} />
                <span>{portfolioData.roles.join(' · ')}</span>
            </div>
            <p>{portfolioData.about}</p>
        </section>
    );
};

export default About;