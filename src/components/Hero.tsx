import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <h1>Build it once. Run it forever.</h1>
                <p>AI automation, thoughtful CRM systems, and web experiences that give good ideas room to grow.</p>
            </div>
            <a href="#contact" className="cta-button">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
        </section>
    );
};

export default Hero;