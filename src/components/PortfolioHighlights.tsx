import React from 'react';
import { BadgeCheck, Bot, Quote, Search, Workflow } from 'lucide-react';
import './PortfolioHighlights.css';

const PortfolioHighlights: React.FC = () => (
    <>
        <section className="bento-card ai-builds-card" aria-labelledby="ai-builds-title">
            <div className="card-heading">
                <span className="card-icon"><Bot size={18} /></span>
                <div>
                    <h2 id="ai-builds-title">AI Builds</h2>
                    <p>Practical AI, connected to your workflow.</p>
                </div>
            </div>
            <div className="build-tags">
                <span><Bot size={15} /> AI agents</span>
                <span><Search size={15} /> RAG assistants</span>
                <span><Workflow size={15} /> Workflow automation</span>
                <span><BadgeCheck size={15} /> Human-led, useful AI</span>
            </div>
            <p className="card-footnote">Designed around real business processes, not demos.</p>
        </section>

        <section className="bento-card credentials-card" aria-labelledby="credentials-title">
            <div className="card-heading">
                <span className="card-icon"><BadgeCheck size={18} /></span>
                <div>
                    <h2 id="credentials-title">What I do</h2>
                    <p>Three connected disciplines.</p>
                </div>
            </div>
            <div className="credential-seal" aria-hidden="true">
                <div className="seal-inner"><BadgeCheck size={36} /></div>
            </div>
            <ul className="role-list">
                <li>AI Automation Specialist</li>
                <li>GHL CRM Builder</li>
                <li>Web Developer</li>
            </ul>
        </section>

        <section className="bento-card testimonials-card" id="testimonials" aria-labelledby="testimonials-title">
            <div className="testimonial-intro">
                <div className="card-heading">
                    <span className="card-icon"><Quote size={18} /></span>
                    <div>
                        <h2 id="testimonials-title">Testimonials</h2>
                        <p>Good work should speak for itself.</p>
                    </div>
                </div>
                <p className="testimonial-note">Client feedback will be featured here as projects are published.</p>
            </div>
            <div className="testimonial-placeholder">
                <span className="quote-mark">“</span>
                <p>Thoughtful systems. Clear communication. Work that keeps working.</p>
                <span className="placeholder-caption">The standard I bring to every project</span>
            </div>
        </section>
    </>
);

export default PortfolioHighlights;
