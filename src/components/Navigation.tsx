import React, { useEffect, useState } from 'react';
import {
    Award,
    Bot,
    BriefcaseBusiness,
    ChartNoAxesCombined,
    FolderKanban,
    Home,
    Mail,
    Quote,
    UserRound,
    Wrench,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import './Navigation.css';

const navigationItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'Projects', href: '#projects', icon: FolderKanban },
    { label: 'Services', href: '#services', icon: BriefcaseBusiness },
    { label: 'Tools', href: '#tools', icon: Wrench },
    { label: 'Credentials', href: '#credentials', icon: Award },
    { label: 'Results', href: '#results', icon: ChartNoAxesCombined },
    { label: 'Testimonials', href: '#testimonials', icon: Quote },
    { label: 'About', href: '#about', icon: UserRound },
    { label: 'Roles', href: '#roles', icon: BriefcaseBusiness },
    { label: 'Contact', href: '#contact', icon: Bot },
];

const Navigation: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Home');

    useEffect(() => {
        const visibleSections = new Map<string, number>();
        const isAtPageBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        const updateBottomSection = () => {
            if (isAtPageBottom()) setActiveItem('Contact');
        };
        const observer = new IntersectionObserver((entries) => {
            if (isAtPageBottom()) {
                setActiveItem('Contact');
                return;
            }

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleSections.set(entry.target.id, entry.intersectionRatio);
                } else {
                    visibleSections.delete(entry.target.id);
                }
            });

            const currentSection = [...visibleSections.entries()].sort((first, second) => second[1] - first[1])[0];
            if (currentSection) {
                const currentItem = navigationItems.find((item) => item.href === `#${currentSection[0]}`);
                if (currentItem) setActiveItem(currentItem.label);
            }
        }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.25, 0.5] });

        navigationItems.forEach((item) => {
            const section = document.getElementById(item.href.slice(1));
            if (section) observer.observe(section);
        });

        window.addEventListener('scroll', updateBottomSection, { passive: true });
        window.addEventListener('resize', updateBottomSection);
        updateBottomSection();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', updateBottomSection);
            window.removeEventListener('resize', updateBottomSection);
        };
    }, []);

    return (
        <aside className="navigation" aria-label="Portfolio sidebar">
            <div className="sidebar-profile">
                <div className="profile-avatar" role="img" aria-label="Portrait of Kim Benedict Gayomali">
                    <img
                        src="/images/avatar.png"
                        alt=""
                        onError={(event) => { event.currentTarget.hidden = true; }}
                    />
                    <span className="avatar-fallback" aria-hidden="true">KB</span>
                </div>
                <div className="profile-name-row">
                    <span className="profile-name">{portfolioData.profile.name}</span>
                </div>
                <span className="profile-handle">{portfolioData.profile.studioLine}</span>
                <div className="social-links" aria-label="Social links">
                    <a href="#projects" aria-label="Facebook profile"><span className="social-letter" aria-hidden="true">f</span></a>
                    <a href="#about" aria-label="LinkedIn profile"><span className="social-letter social-letter--in" aria-hidden="true">in</span></a>
                    <a href="#contact" aria-label="Contact Kim"><Mail size={18} /></a>
                </div>
            </div>
            <div className="sidebar-nav-wrap">
                <nav className="sidebar-nav" aria-label="Main navigation">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <a
                                className={`navigation-link${activeItem === item.label ? ' active' : ''}`}
                                href={item.href}
                                key={item.label}
                                aria-current={activeItem === item.label ? 'page' : undefined}
                                onClick={() => setActiveItem(item.label)}
                            >
                                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                                <span>{item.label}</span>
                            </a>
                        );
                    })}
                </nav>
            </div>
            <div className="sidebar-role">
                <span className="role-dot" />
                Available for select projects
            </div>
        </aside>
    );
};

export default Navigation;