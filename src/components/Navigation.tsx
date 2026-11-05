import React from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import './Navigation.css';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'Projects', href: '#projects', icon: 'folder' },
  { label: 'Services', href: '#services', icon: 'briefcase' },
  { label: 'Experience', href: '#experience', icon: 'trending' },
  { label: 'Testimonials', href: '#testimonials', icon: 'message' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
] as const;

const PROFILE_PHOTO = '/images/profile-photo.webp';

type NavigationProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const Navigation: React.FC<NavigationProps> = ({ collapsed, onToggle }) => {
  const [activeItem, setActiveItem] = useActiveSection(NAV_ITEMS);
  const { profile, contact } = portfolioData;
  const toggleLabel = collapsed ? 'Expand sidebar' : 'Collapse sidebar';

  return (
    <aside className={`navigation${collapsed ? ' is-collapsed' : ''}`} aria-label="Portfolio sidebar">
      <div className="sidebar-profile">
        <div className="profile-avatar" role="img" aria-label={`Portrait of ${profile.name}`}>
          <img src={PROFILE_PHOTO} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />
          <span className="avatar-fallback" aria-hidden="true">KB</span>
        </div>
        <div className="profile-name-row">
          <span className="profile-name">{profile.name}</span>
        </div>
        <span className="profile-handle">{profile.studioLine}</span>

        {contact.facebook && (
          <div className="social-links" aria-label="Social links">
            <a className="social-link" href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook profile">
              <span className="social-letter" aria-hidden="true">f</span>
            </a>
          </div>
        )}
      </div>

      <div className="sidebar-nav-wrap">
        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(({ label, href, icon }) => (
            <a
              className={`navigation-link${activeItem === label ? ' active' : ''}`}
              href={href}
              key={label}
              aria-current={activeItem === label ? 'page' : undefined}
              title={collapsed ? label : undefined}
              onClick={() => setActiveItem(label)}
            >
              <Icon name={icon} size={collapsed ? 22 : 18} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <footer className="sidebar-footer">
          <span className="sidebar-copyright">© {new Date().getFullYear()} {profile.name}</span>
          <button className="sidebar-toggle" type="button" aria-label={toggleLabel} aria-expanded={!collapsed} title={toggleLabel} onClick={onToggle}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={collapsed ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
            </svg>
          </button>
        </footer>
      </div>
    </aside>
  );
};

export default Navigation;
