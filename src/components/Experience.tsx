import React from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './Experience.css';

const Experience: React.FC = () => {
  const data = portfolioData.experience;

  return (
    <section id="experience" className="page-section experience-section" aria-label="Experience">
      <div className="experience-grid">
        <div className="experience-stack">
          <article className="panel timeline-panel">
            <h3 className="panel-title">Career Timeline</h3>
            <div className="timeline">
              {data.timeline.map((item) => (
                <div key={`${item.title}-${item.period}`} className="timeline-item">
                  <span className="timeline-icon"><Icon name={item.icon} size={16} /></span>
                  <div className="timeline-body">
                    {item.period ? <span className="timeline-period">{item.period}</span> : null}
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel chart-panel" aria-label="Break Schedule Tracker project">
            <img
              className="experience-project-image"
              src="/images/break-schedule-tracker.png"
              alt="Break Schedule Tracker dashboard for workforce management, showing live clock, team schedule, breaks, lunches, and adherence."
            />
          </article>
        </div>

        <div className="experience-stack">
          <article className="panel bring-panel">
            <h3 className="panel-title">What I bring to a team</h3>
            <div className="bring-list">
              {data.bring.map((item) => (
                <div key={item.title} className="bring-row">
                  <span className="icon-tile"><Icon name={item.icon} size={18} /></span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel focus-panel">
            <h3 className="panel-title">Top Skills</h3>
            <div className="focus-list">
              {data.focusAreas.map((area) => (
                <span key={area} className="chip">{area}</span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Experience;