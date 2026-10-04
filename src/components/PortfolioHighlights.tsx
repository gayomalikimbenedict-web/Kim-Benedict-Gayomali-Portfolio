import React from 'react';
import { portfolioData } from '../data/portfolio';
import './PortfolioHighlights.css';

export const Credentials: React.FC = () => (
    <section className="page-section credentials-card" id="credentials" aria-labelledby="credentials-title">
        <header className="section-header">
            <span className="section-kicker">CREDENTIALS</span>
            <h2 id="credentials-title">Credentials</h2>
            <p>Courses and training.</p>
        </header>
        <div className="credential-list">
            {portfolioData.credentials.map((credential) => (
                <article className="credential-item" key={credential.title}>
                    <h3>{credential.title}</h3>
                    <p>{credential.issuer}</p>
                    <time>{credential.date}</time>
                </article>
            ))}
        </div>
    </section>
);

export const Results: React.FC = () => (
    <section className="page-section results-card" id="results" aria-labelledby="results-title">
        <header className="section-header">
            <span className="section-kicker">RESULTS</span>
            <h2 id="results-title">Results</h2>
            <p>Outcomes I work toward.</p>
        </header>
        <ul className="results-list">
            {portfolioData.results.map((result) => <li key={result}>{result}</li>)}
        </ul>
    </section>
);

export const Testimonials: React.FC = () => (
    <section className="page-section testimonials-card" id="testimonials" aria-labelledby="testimonials-title">
        <header className="section-header">
            <span className="section-kicker">TESTIMONIALS</span>
            <h2 id="testimonials-title">Testimonials</h2>
            <p>Feedback from the work.</p>
        </header>
        <div className="testimonial-list">
            {portfolioData.testimonials.map((testimonial) => (
                <blockquote className="testimonial-placeholder" key={testimonial.quote}>
                    <span className="quote-mark" aria-hidden="true">“</span>
                    <p>{testimonial.quote}</p>
                    <footer>
                        <span className="placeholder-caption">{testimonial.attribution}</span>
                        <span className="testimonial-tag">{testimonial.tag}</span>
                    </footer>
                </blockquote>
            ))}
        </div>
    </section>
);

export const Roles: React.FC = () => (
    <section className="page-section roles-card" id="roles" aria-labelledby="roles-title">
        <header className="section-header">
            <span className="section-kicker">ROLES</span>
            <h2 id="roles-title">Roles</h2>
            <p>Where I focus.</p>
        </header>
        <ul className="role-list">
            {portfolioData.roles.map((role) => <li key={role}>{role}</li>)}
        </ul>
    </section>
);
