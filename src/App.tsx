import { About } from './components/About'
import { Approach } from './components/Approach'
import { Background } from './components/Background'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Sidebar } from './components/Sidebar'
import { Work } from './components/Work'
import { profile, sectionIds } from './data/content'
import { useActiveSection } from './hooks/useActiveSection'
import { useReveal } from './hooks/useReveal'
import { useScrollProgress } from './hooks/useScrollProgress'
import './App.css'

export default function App() {
  const active = useActiveSection(sectionIds)
  useScrollProgress()
  useReveal()

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Background />
      <div className="shell">
        <Sidebar active={active} />
        <main id="main">
          <Hero />
          <Services />
          <Work />
          <Approach />
          <About />
          <Contact />
          <footer>
            <span>&copy; 2026 {profile.name}</span>
            <span>{profile.location}</span>
          </footer>
        </main>
      </div>
    </>
  )
}
