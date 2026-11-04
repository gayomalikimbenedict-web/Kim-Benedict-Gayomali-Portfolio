import React from 'react';
import { portfolioData } from '../data/portfolio';
import './Testimonials.css';

const Testimonials: React.FC = () => (
    <section className="page-section testimonials-card" id="testimonials" aria-label="Testimonials">
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

export default Testimonials;
