import React from 'react';
import './ToolsMarquee.css';

const tools: { name: string; logo?: string }[] = [
    { name: 'Sechurplets', logo: '/logos/sechurplets.png' },
    { name: 'Google Sheets', logo: '/logos/sheets.svg' },
    { name: 'MS Excel', logo: '/logos/excel.svg' },
    { name: 'Claude', logo: '/logos/claude.svg' },
    { name: 'GHL', logo: '/logos/ghl.svg' },
    { name: 'AHA Innovation', logo: '/logos/aha.png' },
];

const ToolsMarquee: React.FC = () => {
    return (
        <section className="tools-marquee" id="tools" aria-label="Daily tools">
            <div className="tools-heading">
                <span>DAILY DRIVERS</span>
                <strong>Tools I work with</strong>
            </div>
            <div className="marquee-window">
                <div className="marquee-track">
                    {[0, 1].map((group) => (
                        <div className="marquee-group" key={group} aria-hidden={group === 1}>
                            {tools.map((tool) => {
                                return (
                                    <div className="tool" key={tool.name}>
                                        {tool.logo && (
                                            <span className="tool-logo-box">
                                                <img
                                                    className="tool-logo"
                                                    src={tool.logo}
                                                    alt={`${tool.name} logo`}
                                                    onError={(event) => { event.currentTarget.parentElement?.setAttribute('hidden', 'true'); }}
                                                />
                                            </span>
                                        )}
                                        <span>{tool.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolsMarquee;