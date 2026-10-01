import React from 'react';
import { BriefcaseBusiness } from 'lucide-react';
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
                <li>
                    <h3>AI Automation Specialist</h3>
                    <p>Expertise in implementing AI-driven automation solutions to enhance business efficiency.</p>
                </li>
                <li>
                    <h3>GHL CRM Builder</h3>
                    <p>Specialized in building and customizing GHL CRM systems tailored to client needs.</p>
                </li>
                <li>
                    <h3>Web Development</h3>
                    <p>Proficient in creating responsive and user-friendly websites that drive engagement.</p>
                </li>
            </ul>
        </section>
    );
};

export default Services;