import { hero, profile } from '../data/content'
import './Hero.css'

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div>
        <span className="pill" data-reveal>
          {profile.role}
        </span>
        <h1 id="hero-title" data-reveal>
          {hero.headlineStart}
          <em>{hero.headlineEmphasis}</em>
        </h1>
        <p className="sub" data-reveal>
          {hero.sub}
        </p>
        <div className="cta" data-reveal>
          <a className="btn primary" href="#work">
            View my projects &rarr;
          </a>
          <a className="btn ghost" href="#contact">
            Get in touch
          </a>
        </div>
        <ul className="facts" data-reveal>
          {hero.facts.map((fact) => (
            <li key={fact.title}>
              <b>{fact.title}</b>
              {fact.note}
            </li>
          ))}
        </ul>
      </div>

      <div className="stage" data-reveal>
        <div className="ring" />
        <div className="frame">
          <img src="/images/portrait.webp" alt={`Portrait of ${profile.name}`} width={880} height={880} />
        </div>
        {hero.chips.map((chip) => (
          <div key={chip.id} className={`chip ${chip.id}`}>
            {chip.title}
            <small>{chip.note}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
