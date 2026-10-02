import React from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './Contact.css';

const Contact: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <section className="contact-container" id="contact">
            <div className="contact-intro">
                <span className="section-kicker">HAVE A PROJECT IN MIND?</span>
                <h2>Let’s make it work better.</h2>
                <p>Tell me what you’re building, what’s slowing you down, or where you’d like to go next.</p>
                <a className="contact-direct-link" href="#contact-form">
                    Jump to the project form <ArrowUpRight size={16} />
                </a>
                <div className="contact-details" aria-label="Contact placeholders">
                    <p>Email: {portfolioData.contact.email}</p>
                    <p>LinkedIn: {portfolioData.contact.linkedin}</p>
                    <p>Facebook: {portfolioData.contact.facebook}</p>
                </div>
            </div>
            <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">A little about your project</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Start a conversation <Send size={16} /></button>
            </form>
        </section>
    );
};

export default Contact;