import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './Projects.css';

const Projects: React.FC = () => {
    return (
        <section id="projects" className="page-section projects-card" aria-labelledby="projects-title">
            <header className="section-header">
                <span className="section-kicker">PROJECTS</span>
                <h2 id="projects-title">Projects</h2>
                <p>Workflows, systems, and web experiences.</p>
            </header>
            <div className="projects-list">
                {portfolioData.projects.map((project) => (
                    <div key={project.id} className="project-item">
                        <div className="project-preview" aria-hidden="true">
                            <span className="preview-window"><i /><i /><i /></span>
                            <span className="preview-line preview-line-long" />
                            <span className="preview-line" />
                            <span className="preview-chip" />
                        </div>
                        <div className="project-copy">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            {project.link && project.link !== 'GUMROAD_URL_TODO' && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={project.linkLabel}>
                                    {project.linkLabel} <ArrowUpRight size={15} />
                                </a>
                            )}
                            {project.link === 'GUMROAD_URL_TODO' && (
                                <span className="project-link-placeholder">Gumroad URL to be added</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;