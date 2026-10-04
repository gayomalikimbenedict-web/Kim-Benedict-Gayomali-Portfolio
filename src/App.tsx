import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import ToolsMarquee from './components/ToolsMarquee';
import { Credentials, Results, Roles, Testimonials } from './components/PortfolioHighlights';
import { portfolioData } from './data/portfolio';
import './styles/global.css';
import './App.css';

const App: React.FC = () => {
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
            <ToolsMarquee />
          </section>
          <Projects />
          <Services />
          <section className="page-section tools-section" id="tools" aria-labelledby="tools-title">
            <header className="section-header">
              <span className="section-kicker">TOOLS</span>
              <h2 id="tools-title">Tools I work with</h2>
              <p>Everyday tools for reporting, automation, and connected workflows.</p>
            </header>
            <ul className="tools-list">
              {portfolioData.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </section>
          <Credentials />
          <Results />
          <Testimonials />
          <About />
          <Roles />
          <Contact />
          <footer className="site-footer">© {new Date().getFullYear()} {portfolioData.profile.name}</footer>
        </main>
      </div>
    </Router>
  );
};

export default App;