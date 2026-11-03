import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icons';
import { portfolioData, type PortfolioProject } from '../data/portfolio';
import './Projects.css';

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 800;

type DemoPreviewProps = {
  title: string;
  demoUrl: string;
  onOpen: (button: HTMLButtonElement) => void;
};

const DemoPreview: React.FC<DemoPreviewProps> = ({ title, demoUrl, onOpen }) => {
  const previewRef = useRef<HTMLDivElement>(null);
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

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined' && previewRef.current) {
      resizeObserver = new ResizeObserver(() => updateScale());
      resizeObserver.observe(previewRef.current);
    }

    window.addEventListener('resize', updateScale);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div ref={previewRef} className="project-preview-frame" aria-label={`${title} preview`}>
      <iframe
        src={demoUrl}
        title={`${title} preview`}
        sandbox="allow-scripts"
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        style={{ transform: `scale(${scale})` }}
      />
      <button
        type="button"
        className="preview-open-button"
        aria-label={`Open ${title} full screen`}
        onClick={(event) => onOpen(event.currentTarget)}
      >
        <Icon name="play" size={16} />
      </button>
    </div>
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
    <section id="projects" className="page-section projects-section" aria-labelledby="projects-title">
      <header className="section-head">
        <span className="section-kicker">PROJECTS</span>
        <h2 id="projects-title">
          Selected Work
        </h2>
        <p className="section-lede">Systems, workflows, and tools built around real operational needs.</p>
      </header>

      <div className="projects-list">
        {portfolioData.projects.map((project) => (
          <article key={project.id} className="project-card">
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
              <div className="project-preview-frame placeholder-preview" aria-hidden="true" />
            )}

            <div className="project-details">
              <span className="chip">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <ul className="check-list project-checks">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="project-actions">
                {project.demoUrl ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      triggerButtonRef.current = null;
                      setActiveDemo(project);
                    }}
                  >
                    View demo
                    <Icon name="play" size={16} />
                  </button>
                ) : null}

                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    {project.linkLabel || 'Open link'}
                    <Icon name="arrow-up-right" size={16} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="more-work-row" aria-label="More work in progress">
        <span className="more-work-label">More work in progress</span>
        <div className="more-work-list">
          {portfolioData.moreWork.map((item) => (
            <span key={item} className="chip">{item}</span>
          ))}
        </div>
      </div>

      {activeDemo?.demoUrl && (
        <div className="project-demo-overlay" role="dialog" aria-modal="true" aria-label={activeDemo.title}>
          <button
            ref={closeButtonRef}
            type="button"
            className="project-demo-close"
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