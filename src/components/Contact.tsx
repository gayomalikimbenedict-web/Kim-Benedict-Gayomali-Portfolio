import React from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import { useContactForm } from '../hooks/useContactForm';
import './Contact.css';

const Contact: React.FC = () => {
  const { status, handleSubmit } = useContactForm(portfolioData.contact.email);

  const linkedinLink = portfolioData.contact.linkedin || '#contact';
  const facebookLink = portfolioData.contact.facebook || '';
  const githubLink = portfolioData.contact.github;

  return (
    <section className="page-section contact-section" id="contact" aria-label="Contact">
      <div className="contact-grid">
        <div className="panel contact-panel">
          <h3 className="panel-title">Get in touch</h3>

          <div className="contact-list">
            <div className="contact-item">
              <span className="icon-tile"><Icon name="mail" size={17} /></span>
              <div>
                <strong>Email</strong>
                {portfolioData.contact.email ? (
                  <a href={`mailto:${portfolioData.contact.email}`}>{portfolioData.contact.email}</a>
                ) : (
                  <span className="muted-copy">Coming soon</span>
                )}
              </div>
            </div>

            <div className="contact-item">
              <span className="icon-tile"><Icon name="user" size={17} /></span>
              <div>
                <strong>LinkedIn</strong>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer">{linkedinLink}</a>
              </div>
            </div>

            <div className="contact-item">
              <span className="icon-tile"><Icon name="github" size={17} /></span>
              <div>
                <strong>GitHub</strong>
                <a href={githubLink} target="_blank" rel="noopener noreferrer">{githubLink}</a>
              </div>
            </div>

            {facebookLink ? (
              <div className="contact-item">
                <span className="icon-tile"><Icon name="globe" size={17} /></span>
                <div>
                  <strong>Facebook</strong>
                  <a href={facebookLink} target="_blank" rel="noopener noreferrer">Facebook profile</a>
                </div>
              </div>
            ) : null}
          </div>

          <div className="work-together">
            <h4>How we can work together</h4>
            <ul className="work-bullets">
              <li>Share your goals, workflow, and challenges.</li>
              <li>Define clear requirements and project priorities.</li>
              <li>Develop practical solutions tailored to your needs.</li>
              <li>Maintain clear communication throughout the project.</li>
              <li>Review progress, gather feedback, and make improvements.</li>
              <li>Test and refine the final solution before delivery.</li>
            </ul>
          </div>
        </div>

        <div className="panel form-panel">
          <div className="form-heading">
            <div>
              <h3>Send a <span className="accent">message</span></h3>
              <p>Have a project in mind? Let&apos;s talk.</p>
            </div>
          </div>

          <form className="message-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <div className="form-field">
              <input id="name" name="name" type="text" placeholder="Enter your name..." maxLength={100} autoComplete="name" required />
            </div>

            <label htmlFor="email">Email address</label>
            <div className="form-field">
              <input id="email" name="email" type="email" placeholder="Enter your email..." maxLength={254} autoComplete="email" required />
            </div>

            <label htmlFor="message">What would you like to build?</label>
            <div className="form-field form-field--textarea">
              <textarea
                id="message"
                name="message"
                placeholder="Describe your project, goals, and requirements..."
                maxLength={2000}
                required
              />
            </div>

            <input className="form-honeypot" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <button type="submit" className="btn btn-primary" disabled={status.kind === 'sending'}>
              <Icon name="send" size={18} />
              {status.kind === 'sending' ? 'Sending…' : 'Start a conversation'}
              <Icon name="arrow-right" size={18} />
            </button>

            {status.message ? (
              <p className={`form-status form-status--${status.kind}`} role="status" aria-live="polite">
                {status.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;