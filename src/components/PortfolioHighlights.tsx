import React from 'react';
import { Award, ChartNoAxesCombined, Quote, UserRound } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './PortfolioHighlights.css';

const PortfolioHighlights: React.FC = () => (
    <>
        <section className="bento-card roles-card" aria-labelledby="roles-title">
            <div className="card-heading">
                <span className="card-icon"><UserRound size={18} /></span>
                <div>
                    <h2 id="roles-title">Roles</h2>
                    <p>Where I focus.</p>
                </div>
            </div>
            <ul className="role-list">
                {portfolioData.roles.map((role) => <li key={role}>{role}</li>)}
            </ul>
        </section>

        <section className="bento-card credentials-card" aria-labelledby="credentials-title">
            <div className="card-heading">
                <span className="card-icon"><Award size={18} /></span>
                <div>
                    <h2 id="credentials-title">Credentials</h2>
                    <p>Courses and training.</p>
                </div>
            </div>
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

        <section className="bento-card results-card" id="results" aria-labelledby="results-title">
            <div className="card-heading">
                <span className="card-icon"><ChartNoAxesCombined size={18} /></span>
                <div>
                    <h2 id="results-title">Results</h2>
                    <p>Outcomes I work toward.</p>
                </div>
            </div>
            <ul className="results-list">
                {portfolioData.results.map((result) => <li key={result}>{result}</li>)}
            </ul>
        </section>

        <section className="bento-card testimonials-card" id="testimonials" aria-labelledby="testimonials-title">
            <div className="testimonial-intro">
                <div className="card-heading">
                    <span className="card-icon"><Quote size={18} /></span>
                    <div>
                        <h2 id="testimonials-title">Testimonials</h2>
                        <p>Feedback from the work.</p>
                    </div>
                </div>
            </div>
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
    </>
);

export default PortfolioHighlights;
