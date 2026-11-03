import React, { useEffect, useState } from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './Navigation.css';

const mainNavItems = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'Projects', href: '#projects', icon: 'folder' },
  { label: 'Services', href: '#services', icon: 'briefcase' },
  { label: 'Experience', href: '#experience', icon: 'trending' },
  { label: 'Testimonials', href: '#testimonials', icon: 'message' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
] as const;

const navItems = mainNavItems;

const Navigation: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const profilePhoto = '/images/Designer (8).png';
  const facebookUrl = portfolioData.contact.facebook || '';

  useEffect(() => {
    let ticking = false;
    const updateActive = () => {
      const sections = navItems
        .map((item) => document.getElementById(item.href.replace('#', '')))
        .filter((item): item is HTMLElement => Boolean(item));

      const viewportThreshold = window.innerHeight * 0.3;
      let match = 'Home';
      let lastTop = Number.NEGATIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportThreshold) {
          if (rect.top > lastTop) {
            lastTop = rect.top;
            const item = navItems.find((navItem) => navItem.href === `#${section.id}`);
            if (item) {
              match = item.label;
            }
          }
        }
      });

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (isAtBottom) {
        match = 'Contact';
      }

      setActiveItem(match);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActive();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <aside className="navigation" aria-label="Portfolio sidebar">
      <div className="sidebar-profile">
        <div className="profile-avatar" role="img" aria-label="Portrait of Kim Benedict Gayomali">
          <img src={profilePhoto} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />
          <span className="avatar-fallback" aria-hidden="true">KB</span>
        </div>
        <div className="profile-name-row">
          <span className="profile-name">{portfolioData.profile.name}</span>
        </div>
        <span className="profile-handle">{portfolioData.profile.studioLine}</span>

        {facebookUrl ? (
          <div className="social-links" aria-label="Social links">
            <a className="social-link" href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook profile">
              <span className="social-letter" aria-hidden="true">f</span>
            </a>
          </div>
        ) : null}
      </div>

      <div className="sidebar-nav-wrap">
        <nav className="sidebar-nav" aria-label="Main navigation">
          {mainNavItems.map((item) => (
            <a
              className={`navigation-link${activeItem === item.label ? ' active' : ''}`}
              href={item.href}
              key={item.label}
              aria-current={activeItem === item.label ? 'page' : undefined}
              onClick={() => setActiveItem(item.label)}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <footer className="sidebar-copyright">
          © {new Date().getFullYear()} {portfolioData.profile.name}
        </footer>
      </div>
    </aside>
  );
};

export default Navigation;