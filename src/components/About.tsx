import { about, credentials, experience, profile, skills } from '../data/content'
import { SectionHead } from './SectionHead'
import './About.css'

export function About() {
  const { photo } = about
  return (
    <section id="about" aria-labelledby="about-title">
      <SectionHead id="about-title" eyebrow="About" title={about.title} />

      <div className="about">
        <figure className="card photo" data-reveal>
          <img src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 900px) 92vw, 410px" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
          <figcaption>{profile.location}</figcaption>
        </figure>
        <div className="card txt" data-reveal>
          <p className="big">{about.lead}</p>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="card exp" data-reveal>
        <span className="when">{experience.period}</span>
        <b>{experience.role}</b>
        <span>{experience.company}</span>
        <p>{experience.summary}</p>
      </div>

      <ul className="skills" aria-label="Skills" data-reveal>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <ul className="creds" aria-label="Credentials" data-reveal>
        {credentials.map((credential) => (
          <li key={credential.title}>
            <b>{credential.title}</b>
            {credential.detail}
          </li>
        ))}
      </ul>
    </section>
  )
}
