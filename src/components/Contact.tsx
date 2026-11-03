import React, { useState } from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './Contact.css';

const Contact: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      setStatusMessage('Please fill in your name, email, and project details before sending.');
      return;
    }

    setStatusMessage(
      'This form is not connected yet, so nothing was sent. For now, please reach me on LinkedIn.'
    );
  };

  const linkedinLink = portfolioData.contact.linkedin || '#contact';
  const facebookLink = portfolioData.contact.facebook || '';

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
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer">LinkedIn profile</a>
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
            <div className="work-steps">
              <div className="work-step"><span>01</span><p>Share the goal or workflow.</p></div>
              <div className="work-step"><span>02</span><p>Define the practical solution.</p></div>
              <div className="work-step"><span>03</span><p>Refine and improve after launch.</p></div>
            </div>
          </div>
        </div>

        <div className="panel form-panel">
          <div className="form-heading">
            <span className="form-heading-icon"><Icon name="send" size={27} /></span>
            <div>
              <h3>Send a <span className="accent">message</span></h3>
              <p>Have a project in mind? Let&apos;s talk.</p>
            </div>
          </div>

          <form className="message-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <div className="form-field">
              <Icon name="user" size={20} />
              <input id="name" name="name" type="text" placeholder="Enter your name..." required />
            </div>

            <label htmlFor="email">Email address</label>
            <div className="form-field">
              <Icon name="mail" size={20} />
              <input id="email" name="email" type="email" placeholder="Enter your email..." required />
            </div>

            <label htmlFor="projectType">Project type</label>
            <div className="form-field">
              <Icon name="sheet" size={20} />
              <select id="projectType" name="projectType" defaultValue="">
                <option value="" disabled>Select a type</option>
                {portfolioData.contact.projectTypes.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <label htmlFor="message">What would you like to build?</label>
            <div className="form-field form-field--textarea">
              <Icon name="message" size={20} />
              <textarea
                id="message"
                name="message"
                placeholder="Describe your project, goals, and requirements..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <Icon name="send" size={18} />
              Start a conversation
              <Icon name="arrow-right" size={18} />
            </button>

            {statusMessage ? (
              <p className="form-status" role="status" aria-live="polite">
                {statusMessage}{' '}
                {portfolioData.contact.linkedin ? (
                  <a href={linkedinLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                ) : null}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;