import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData, PortfolioProject } from '../data/portfolio';
import './Projects.css';

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 720;

type DemoPreviewProps = {
    title: string;
    demoUrl: string;
    onOpen: (button: HTMLButtonElement) => void;
};

const DemoPreview: React.FC<DemoPreviewProps> = ({ title, demoUrl, onOpen }) => {
    const previewRef = useRef<HTMLButtonElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const preview = previewRef.current;
            if (!preview) return;

            const { width, height } = preview.getBoundingClientRect();
            if (width > 0 && height > 0) {
                setScale(Math.min(width / PREVIEW_WIDTH, height / PREVIEW_HEIGHT));
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <button
            ref={previewRef}
            type="button"
            className="project-preview project-preview-button"
            aria-label={`Open ${title} full screen`}
            onClick={(event) => onOpen(event.currentTarget)}
        >
            <iframe
                src={demoUrl}
                title={`${title} preview`}
                sandbox="allow-scripts"
                loading="lazy"
                tabIndex={-1}
                aria-hidden="true"
                style={{ transform: `scale(${scale})` }}
            />
        </button>
    );
};

const Projects: React.FC = () => {
    const [activeDemo, setActiveDemo] = useState<PortfolioProject | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
    const wasOpenRef = useRef(false);
    const isOpen = activeDemo !== null;

    useEffect(() => {
        if (!isOpen) {
            if (wasOpenRef.current) {
                triggerButtonRef.current?.focus();
                wasOpenRef.current = false;
            }
            return;
        }

        wasOpenRef.current = true;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setActiveDemo(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        closeButtonRef.current?.focus();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

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
                        {project.demoUrl ? (
                            <DemoPreview
                                title={project.title}
                                demoUrl={project.demoUrl}
                                onOpen={(button) => {
                                    triggerButtonRef.current = button;
                                    setActiveDemo(project);
                                }}
                            />
                        ) : (
                            <div className="project-preview" aria-hidden="true">
                                <span className="preview-window"><i /><i /><i /></span>
                                <span className="preview-line preview-line-long" />
                                <span className="preview-line" />
                                <span className="preview-chip" />
                            </div>
                        )}
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
            {activeDemo?.demoUrl && (
                <div
                    className="project-demo-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label={activeDemo.title}
                >
                    <button
                        ref={closeButtonRef}
                        className="project-demo-close"
                        type="button"
                        onClick={() => setActiveDemo(null)}
                    >
                        Close
                    </button>
                    <iframe
                        src={activeDemo.demoUrl}
                        title={`${activeDemo.title} full screen walkthrough`}
                        sandbox="allow-scripts"
                    />
                </div>
            )}
        </section>
    );
};

export default Projects;