import React from 'react';
import { UserRound } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
    return (
        <section id="about" className="bento-card about-section">
            <div className="card-heading">
                <span className="card-icon"><UserRound size={18} /></span>
                <div>
                    <h2>About</h2>
                    <p>A little about how I work.</p>
                </div>
            </div>
            <div className="about-portrait-row">
                <img className="about-avatar" src="/images/avatar.png" alt="Kim Benedict Gayomali" />
                <span>AI Automation Specialist<br />GHL CRM Builder · Web Developer</span>
            </div>
            <p>
                I’m Kim Benedict Gayomali, an AI Automation Specialist, GHL CRM Builder, and Web Developer. I create efficient, thoughtful systems that help teams spend less time on repetitive work.
            </p>
            <p>
                My approach is collaborative and detail-oriented, with clear communication from the first idea through delivery.
            </p>
        </section>
    );
};

export default About;