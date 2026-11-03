import React, { useMemo, useState } from 'react';
import Icon from './Icons';
import { portfolioData } from '../data/portfolio';
import './Experience.css';

const chartColors = {
  adherence: '#3987e5',
  shrinkage: '#d95926',
};

const Experience: React.FC = () => {
  const data = portfolioData.experience;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartWidth = 640;
  const chartHeight = 250;
  const padding = { top: 18, right: 16, bottom: 32, left: 36 };
  const maxValue = 100;

  const chartPoints = useMemo(() => {
    const series = [
      { key: 'adherence', values: data.performance.adherence },
      { key: 'shrinkage', values: data.performance.shrinkage },
    ];

    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    return series.map((seriesItem) => ({
      key: seriesItem.key,
      points: seriesItem.values.map((value, index) => {
        const x = padding.left + (index / (seriesItem.values.length - 1)) * innerWidth;
        const y = padding.top + (1 - value / maxValue) * innerHeight;
        return { x, y, value, day: data.performance.days[index] };
      }),
    }));
  }, [data.performance]);

  const linePath = (points: Array<{ x: number; y: number }>) =>
    points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <section id="experience" className="page-section experience-section" aria-labelledby="experience-title">
      <header className="section-head">
        <span className="section-kicker">EXPERIENCE</span>
        <h2 id="experience-title">
          Operations experience. <span className="accent">Practical automation.</span>
        </h2>
        <p className="section-lede">{data.intro}</p>
      </header>

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

          <article className="panel chart-panel">
            <h3 className="panel-title">Workforce Performance (Example View)</h3>
            <div className="chart-legend" aria-hidden="true">
              <span><i style={{ background: chartColors.adherence }} /> Adherence</span>
              <span><i style={{ background: chartColors.shrinkage }} /> Shrinkage</span>
            </div>

            <div className="chart-shell">
              <svg
                role="img"
                aria-label="Workforce performance chart comparing adherence and shrinkage for seven days"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="performance-chart"
              >
                {[0, 25, 50, 75, 100].map((tick) => {
                  const y = padding.top + ((maxValue - tick) / maxValue) * (chartHeight - padding.top - padding.bottom);
                  return (
                    <g key={tick}>
                      <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                      <text x={8} y={y + 4} fill="rgba(217,227,244,0.7)" fontSize="10">{tick}%</text>
                    </g>
                  );
                })}

                {data.performance.days.map((day, index) => {
                  const x = padding.left + (index / (data.performance.days.length - 1)) * (chartWidth - padding.left - padding.right);
                  return (
                    <g key={day}>
                      <line x1={x} y1={padding.top} x2={x} y2={chartHeight - padding.bottom} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <text x={x} y={chartHeight - 8} fill="rgba(217,227,244,0.7)" textAnchor="middle" fontSize="10">{day}</text>
                    </g>
                  );
                })}

                {chartPoints.map((series) => (
                  <path
                    key={series.key}
                    d={linePath(series.points.map(({ x, y }) => ({ x, y })))}
                    fill="none"
                    stroke={series.key === 'adherence' ? chartColors.adherence : chartColors.shrinkage}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {chartPoints.flatMap((series) =>
                  series.points.map((point) => (
                    <g key={`${series.key}-${point.day}`}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="4.5"
                        fill={series.key === 'adherence' ? chartColors.adherence : chartColors.shrinkage}
                        stroke="#101a35"
                        strokeWidth="2"
                      />
                    </g>
                  ))
                )}

                {chartPoints.map((series) => {
                  const lastPoint = series.points[series.points.length - 1];
                  const x = lastPoint.x + 14;
                  const y = lastPoint.y - 6;

                  return (
                    <text
                      key={`${series.key}-label`}
                      x={x}
                      y={y}
                      fill={series.key === 'adherence' ? chartColors.adherence : chartColors.shrinkage}
                      fontSize="10"
                      fontWeight="700"
                    >
                      {series.key === 'adherence' ? 'Adherence' : 'Shrinkage'}
                    </text>
                  );
                })}
              </svg>
            </div>

            <p className="chart-note">Example view. Illustrative data, not real results.</p>

            <details className="chart-table-details">
              <summary>View as table</summary>
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Adherence</th>
                    <th>Shrinkage</th>
                  </tr>
                </thead>
                <tbody>
                  {data.performance.days.map((day, index) => (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>{data.performance.adherence[index]}%</td>
                      <td>{data.performance.shrinkage[index]}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
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
            <h3 className="panel-title">Key Focus Areas</h3>
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