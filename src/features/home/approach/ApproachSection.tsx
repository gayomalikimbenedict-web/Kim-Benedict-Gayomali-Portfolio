import { method } from '@/content/method'
import './approach.css'

/**
 * How I work: the four phases of a project, with the working steps under each one.
 * Reads src/content/method.ts. Shares the section head (.wk-eyebrow, .wk-title) with the other Home sections.
 */
export function ApproachSection() {
  return (
    <section id="approach" className="wk ap" aria-labelledby="approach-title">
      <header className="ap__head">
        <p className="wk-eyebrow">{method.eyebrow}</p>
        <h2 id="approach-title" className="wk-title">
          <span className="wk-title__thin">{method.titleThin}</span> <span className="wk-title__bold">{method.titleBold}</span>
        </h2>
        <p className="ap__summary">{method.summary}</p>
      </header>
      <ol className="ap__steps">
        {method.steps.map((step, index) => (
          <li key={step.name} className="ap__step">
            <span className="ap__num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{step.name}</h3>
            <p>{step.body}</p>
            <ul className="ap__inputs">
              {step.inputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
