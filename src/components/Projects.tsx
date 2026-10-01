import React from 'react';
import { ArrowUpRight, FolderOpen } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './Projects.css';

const Projects: React.FC = () => {
    return (
        <section id="projects" className="bento-card projects-card">
            <div className="card-heading">
                <span className="card-icon"><FolderOpen size={18} /></span>
                <div>
                    <h2>Projects</h2>
                    <p>Workflows, systems, and web experiences.</p>
                </div>
            </div>
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
                            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`}>
                                View project <ArrowUpRight size={15} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;