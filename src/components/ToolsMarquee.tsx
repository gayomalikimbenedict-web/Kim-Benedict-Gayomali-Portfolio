import React from 'react';
import { portfolioData } from '../data/portfolio';
import './ToolsMarquee.css';

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
                            {portfolioData.tools.map((tool) => {
                                return (
                                    <div className="tool" key={tool}>{tool}</div>
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