import { profile, sections } from '../data/content'
import './Sidebar.css'

type SidebarProps = { active: string }

export function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="side">
      <a className="brand" href="#home">
        <img src="/images/mark.webp" alt="" width={46} height={46} />
        <span>
          <b>{profile.name}</b>
          <small>{profile.role}</small>
        </span>
      </a>

      <nav aria-label="Primary">
        <ul className="nav">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className={active === section.id ? 'on' : undefined} aria-current={active === section.id ? 'true' : undefined}>
                {section.label}
                <small>{String(index + 1).padStart(2, '0')}</small>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="avail">
        <b>Open to projects</b>
        Selected freelance, part-time and project-based work.
        <div className="links">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </div>
      <p className="copy">&copy; 2026 {profile.name}</p>
    </aside>
  )
}
