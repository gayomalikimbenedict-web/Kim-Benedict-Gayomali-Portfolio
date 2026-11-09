import { approachIntro, philosophy, phases } from '../data/content'
import { SectionHead } from './SectionHead'
import './Approach.css'

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title">
      <SectionHead id="approach-title" eyebrow="How I work" title={approachIntro.title} lede={approachIntro.lede} />
      <div className="grid g4">
        {phases.map((phase, index) => (
          <article key={phase.title} className="card phase" data-reveal>
            <span className="num">{String(index + 1).padStart(2, '0')}</span>
            <h3>{phase.title}</h3>
            <p>{phase.body}</p>
            <ul className="steps">
              {phase.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <blockquote className="card philo" data-reveal>
        <small>Working philosophy</small>
        {philosophy.map((part) => (part.key ? <b key={part.text}>{part.text}</b> : <span key={part.text}>{part.text}</span>))}
      </blockquote>
    </section>
  )
}
