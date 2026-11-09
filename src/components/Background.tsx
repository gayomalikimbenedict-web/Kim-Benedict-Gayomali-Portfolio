import { NetworkBackground } from './NetworkBackground'
import './Background.css'

/** The fixed layers behind everything: drifting colour, the dot network, and the scroll progress bar. */
export function Background() {
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <NetworkBackground />
      <div className="progress" aria-hidden="true">
        <i />
      </div>
    </>
  )
}
