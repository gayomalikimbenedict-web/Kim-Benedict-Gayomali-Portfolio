import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import PageBackground from './components/PageBackground';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import './styles/global.css';
import './App.css';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <PageBackground />
      <div className={`portfolio-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <Navigation collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />
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
