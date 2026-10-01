import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import ToolsMarquee from './components/ToolsMarquee';
import PortfolioHighlights from './components/PortfolioHighlights';
import './styles/global.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="portfolio-shell">
        <Navigation />
        <main className="portfolio-main">
          <Hero />
          <ToolsMarquee />
          <div className="bento-grid">
            <Projects />
            <About />
            <PortfolioHighlights />
            <Services />
          </div>
          <Contact />
          <footer className="site-footer">© {new Date().getFullYear()} Kim Benedict Gayomali</footer>
        </main>
      </div>
    </Router>
  );
};

export default App;