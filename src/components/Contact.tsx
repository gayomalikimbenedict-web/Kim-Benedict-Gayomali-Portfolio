import { contactIntro, profile, workTogether } from '../data/content'
import { useContactForm } from '../hooks/useContactForm'
import { SectionHead } from './SectionHead'
import './Contact.css'

export function Contact() {
  const { status, handleSubmit } = useContactForm(profile.email)

  return (
    <section id="contact" aria-labelledby="contact-title">
      <SectionHead id="contact-title" eyebrow="Contact" title={contactIntro.title} lede={contactIntro.lede} />

      <div className="contact">
        <div className="card" data-reveal>
          <h3>How we can work together</h3>
          <ul className="steps-list">
            {workTogether.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <div className="direct">
            <a href={`mailto:${profile.email}`}>
              {profile.email} <span aria-hidden="true">&rarr;</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">{'\u2197'}</span>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">{'\u2197'}</span>
            </a>
          </div>
        </div>

        <form className="card form" onSubmit={handleSubmit} noValidate data-reveal>
          <h3>Send a message</h3>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Enter your name" required />
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Enter your email" required />
          <label htmlFor="contact-message">What would you like to build?</label>
          <textarea id="contact-message" name="message" placeholder="Describe your project, goals, and requirements" required />
          <input className="trap" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn primary" type="submit" disabled={status.kind === 'sending'}>
            Start a conversation &rarr;
          </button>
          <p className={`status ${status.kind}`} role="status" aria-live="polite">
            {status.message}
          </p>
        </form>
      </div>
    </section>
  )
}
