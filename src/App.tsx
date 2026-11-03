import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import { Testimonials } from './components/PortfolioHighlights';
import './styles/global.css';
import './App.css';

const App: React.FC = () => {
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

  return (
    <Router>
      <div className="page-background" aria-hidden="true">
        <div className="page-glow" />
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

      <div className="portfolio-shell">
        <Navigation />
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
        </main>
      </div>
    </Router>
  );
};

export default App;