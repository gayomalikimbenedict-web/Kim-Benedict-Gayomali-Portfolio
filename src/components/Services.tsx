import React from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './Services.css';

const Services: React.FC = () => {
    return (
        <section id="services" className="bento-card services-section">
            <div className="card-heading">
                <span className="card-icon"><BriefcaseBusiness size={18} /></span>
                <div>
                    <h2>Services</h2>
                    <p>What I can help you build.</p>
                        </div>
                    </div>
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