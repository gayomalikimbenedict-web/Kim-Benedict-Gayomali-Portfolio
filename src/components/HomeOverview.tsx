import React from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './HomeOverview.css';

const HomeOverview: React.FC = () => {
  const featuredProjects = portfolioData.projects.slice(0, 2);

  return (
    <div className="home-overview" aria-label="Portfolio overview">
      <article className="overview-card overview-featured">
        <div className="panel-header">
          <span className="section-kicker section-kicker--small">Featured</span>
          <h3>Featured Projects</h3>
        </div>

        <div className="featured-projects">
          {featuredProjects.map((project) => (
            <div key={project.id} className="featured-project-item">
              <span className="chip">{project.tag}</span>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <a href="#projects" className="text-link">
                See the walkthrough
                <Icon name="arrow-right" size={16} />
              </a>
            </div>
          ))}
        </div>
      </article>

      <article className="overview-card overview-what-i-do">
        <div className="panel-header">
          <span className="section-kicker section-kicker--small">What I do</span>
          <h3>What I Do</h3>
        </div>

        <div className="overview-list">
          {portfolioData.whatIDo.map((item) => (
            <div key={item.title} className="overview-row">
              <span className="icon-tile"><Icon name={item.icon} size={18} /></span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="overview-card overview-about">
        <div className="panel-header">
          <span className="section-kicker section-kicker--small">About</span>
          <h3>About Me</h3>
        </div>

        <p>{portfolioData.about.text}</p>
        <a href="#about" className="text-link">
          Learn more about me
          <Icon name="arrow-right" size={16} />
        </a>
      </article>

      <article className="overview-card overview-services">
        <div className="panel-header">
          <span className="section-kicker section-kicker--small">Services</span>
          <h3>My Services</h3>
        </div>

        <div className="overview-list small-gap">
          {portfolioData.services.map((service) => (
            <div key={service.title} className="overview-row">
              <span className="icon-tile"><Icon name={service.icon} size={18} /></span>
              <div>
                <h4>{service.title}</h4>
                <p>{service.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default HomeOverview;