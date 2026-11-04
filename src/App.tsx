import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Settings from './components/Settings';
import { Testimonials } from './components/PortfolioHighlights';
import { applyContentOverrides, isContentOverrides } from './contentOverrides';
import type { ContentOverrides } from './contentOverrides';
import './styles/global.css';
import './App.css';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contentOverrides, setContentOverrides] = useState<ContentOverrides>({});
  const [settingsApiError, setSettingsApiError] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/content')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('The local settings server returned an error.');
        }
        return response.json();
      })
      .then((payload: { overrides?: unknown }) => {
        if (!active) return;
        if (!isContentOverrides(payload.overrides)) {
          throw new Error('The local settings server returned invalid saved text.');
        }
        setContentOverrides(payload.overrides);
        setSettingsApiError('');
      })
      .catch(() => {
        if (active) {
          setSettingsApiError(
            'Local settings database unavailable. Start the Python settings server to unlock and save edits.'
          );
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    applyContentOverrides(contentOverrides);
  }, [contentOverrides]);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          '.page-section:not(.home-section) .panel',
          '.page-section:not(.home-section) .project-card',
          '.page-section:not(.home-section) .approach-step',
          '.page-section:not(.home-section) .how-step',
          '.page-section:not(.home-section) .photo-frame',
          '.page-section:not(.home-section) .credential-item',
          '.page-section:not(.home-section) .testimonial-placeholder',
          '.page-section:not(.home-section) .role-list li',
        ].join(', ')
      )
    );
    const staticLayout = window.matchMedia(
      '(max-width: 760px), (pointer: coarse), (prefers-reduced-motion: reduce)'
    );
    let animationFrame = 0;

    const resetCards = () => {
      cards.forEach((card) => card.style.removeProperty('--scroll-parallax-y'));
    };

    const updateCards = () => {
      animationFrame = 0;
      const viewportCenter = window.innerHeight / 2;
      const offsets = cards.map((card, index) => {
        const bounds = card.getBoundingClientRect();
        const cardCenter = bounds.top + bounds.height / 2;
        const depth = 0.025 + (index % 3) * 0.01;
        const offset = Math.max(-18, Math.min(18, (viewportCenter - cardCenter) * depth));
        return { card, offset };
      });

      offsets.forEach(({ card, offset }) => {
        card.style.setProperty('--scroll-parallax-y', `${offset.toFixed(2)}px`);
      });
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateCards);
      }
    };

    const updateMotion = () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;

      if (staticLayout.matches) {
        resetCards();
        return;
      }

      scheduleUpdate();
      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
    };

    updateMotion();
    staticLayout.addEventListener('change', updateMotion);

    return () => {
      staticLayout.removeEventListener('change', updateMotion);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(animationFrame);
      resetCards();
    };
  }, []);

  useEffect(() => {
    const pageBackground = document.querySelector<HTMLElement>('.page-background');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;

    const resetBackground = () => {
      pageBackground?.style.removeProperty('--background-shift-x');
      pageBackground?.style.removeProperty('--background-shift-y');
    };

    const animateBackground = () => {
      animationFrame = 0;
      currentScroll += (targetScroll - currentScroll) * 0.12;

      const phase = currentScroll * 0.0015;
      pageBackground?.style.setProperty('--background-shift-x', `${(Math.sin(phase) * 14).toFixed(2)}px`);
      pageBackground?.style.setProperty('--background-shift-y', `${(Math.cos(phase) * 22).toFixed(2)}px`);

      if (Math.abs(targetScroll - currentScroll) > 0.1) {
        animationFrame = window.requestAnimationFrame(animateBackground);
      }
    };

    const scheduleBackgroundUpdate = () => {
      targetScroll = window.scrollY;
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateBackground);
      }
    };

    const updateMotion = () => {
      window.removeEventListener('scroll', scheduleBackgroundUpdate);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;

      if (reducedMotion.matches) {
        resetBackground();
        return;
      }

      currentScroll = targetScroll = window.scrollY;
      scheduleBackgroundUpdate();
      window.addEventListener('scroll', scheduleBackgroundUpdate, { passive: true });
    };

    updateMotion();
    reducedMotion.addEventListener('change', updateMotion);

    return () => {
      reducedMotion.removeEventListener('change', updateMotion);
      window.removeEventListener('scroll', scheduleBackgroundUpdate);
      window.cancelAnimationFrame(animationFrame);
      resetBackground();
    };
  }, []);

  return (
    <Router>
      <div className="page-background" aria-hidden="true">
        <div className="page-glow" />
        <div className="page-orbit" />
        <span className="page-particle page-particle--one" />
        <span className="page-particle page-particle--two" />
        <span className="page-particle page-particle--three" />
        <svg className="page-grid" viewBox="0 0 1600 1200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g className="grid-lines">
            <path d="M1170 75H1285V170H1385" />
            <path d="M1200 240H1290V325H1380" />
            <path d="M1340 385H1420V500H1500" />
            <path d="M1320 600H1400V705H1485" />
            <path d="M1080 170H1165V240H1245" />
          </g>
          <g className="grid-dots">
            <circle cx="1170" cy="75" r="2.8" />
            <circle cx="1285" cy="75" r="2.8" />
            <circle cx="1285" cy="170" r="2.8" />
            <circle cx="1385" cy="170" r="2.8" />
            <circle cx="1200" cy="240" r="2.8" />
            <circle cx="1290" cy="240" r="2.8" />
            <circle cx="1290" cy="325" r="2.8" />
            <circle cx="1380" cy="325" r="2.8" />
            <circle cx="1340" cy="385" r="2.8" />
            <circle cx="1420" cy="385" r="2.8" />
            <circle cx="1420" cy="500" r="2.8" />
            <circle cx="1500" cy="500" r="2.8" />
            <circle cx="1320" cy="600" r="2.8" />
            <circle cx="1400" cy="600" r="2.8" />
            <circle cx="1400" cy="705" r="2.8" />
            <circle cx="1485" cy="705" r="2.8" />
            <circle cx="1080" cy="170" r="2.8" />
            <circle cx="1165" cy="170" r="2.8" />
            <circle cx="1165" cy="240" r="2.8" />
            <circle cx="1245" cy="240" r="2.8" />
          </g>
          <path className="pulse-line" d="M1170 75H1285V170H1385" />
          <circle className="pulse-dot" cx="1170" cy="75" r="4" />
        </svg>
      </div>

      <div className={`portfolio-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <Navigation
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
        />
        <main className="portfolio-main">
          <section className="page-section home-section" id="home" aria-labelledby="home-title">
            <Hero />
          </section>

          <Projects />
          <Services />
          <Experience />
          <Testimonials />
          <About />

          <Contact />
          <Settings
            apiError={settingsApiError}
            contentOverrides={contentOverrides}
            onSaved={setContentOverrides}
          />
        </main>
      </div>
    </Router>
  );
};

export default App;