import React from 'react';
import {
    CalendarDays,
    Code2,
    MessageCircle,
    Sparkles,
    Table2,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';
import {
    SiGoogleappsscript,
    SiGooglecalendar,
    SiGooglegemini,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import {
    portfolioData,
    type BrandToolIconName,
    type GenericToolIconName,
    type PortfolioToolIcon,
} from '../data/portfolio';
import './ToolsMarquee.css';

const brandIcons: Record<BrandToolIconName, IconType> = {
    'google-calendar': SiGooglecalendar,
    'apps-script': SiGoogleappsscript,
    gemini: SiGooglegemini,
    'microsoft-teams': BiLogoMicrosoftTeams,
};

const genericIcons: Record<GenericToolIconName, LucideIcon> = {
    calendar: CalendarDays,
    code: Code2,
    message: MessageCircle,
    sparkles: Sparkles,
    table: Table2,
    workflow: Workflow,
};

const ToolLogo: React.FC<{ icon: PortfolioToolIcon }> = ({ icon }) => {
    const [imageFailed, setImageFailed] = React.useState(false);

    if (icon.type === 'asset' && !imageFailed) {
        return (
            <img
                className="tool-logo"
                src={icon.src}
                alt=""
                onError={() => setImageFailed(true)}
            />
        );
    }

    if (icon.type === 'brand') {
        const BrandIcon = brandIcons[icon.name];
        return <BrandIcon className="tool-brand-icon" aria-hidden="true" style={{ color: icon.color }} />;
    }

    const fallbackName = icon.type === 'asset' ? icon.fallback : icon.name;
    const GenericIcon = genericIcons[fallbackName];
    return <GenericIcon className="tool-generic-icon" aria-hidden="true" />;
};

const ToolsMarquee: React.FC = () => {
    return (
        <div className="tools-marquee" aria-label="Daily tools">
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
                                    <div className="tool" key={tool.name}>
                                        <span className="tool-logo-box" aria-hidden="true">
                                            <ToolLogo icon={tool.icon} />
                                        </span>
                                        <span>{tool.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ToolsMarquee;