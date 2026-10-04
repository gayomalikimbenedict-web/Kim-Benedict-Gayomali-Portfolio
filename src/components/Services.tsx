import React from 'react';
import { portfolioData } from '../data/portfolio';
import './Services.css';

const Services: React.FC = () => {
    return (
        <section id="services" className="page-section services-section" aria-labelledby="services-title">
            <header className="section-header">
                <span className="section-kicker">SERVICES</span>
                <h2 id="services-title">Services</h2>
                <p>What I can help you build.</p>
            </header>
            <ul>
                {portfolioData.services.map((service) => (
                    <li key={service}>
                        <h3>{service}</h3>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Services;