import React from 'react';
import { useState } from 'react';
import {
    BadgeCheck,
    Bot,
    BriefcaseBusiness,
    FolderKanban,
    Home,
    Mail,
    Quote,
    UserRound,
    Wrench,
} from 'lucide-react';
import './Navigation.css';

const navigationItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'Projects', href: '#projects', icon: FolderKanban },
    { label: 'Services', href: '#services', icon: BriefcaseBusiness },
    { label: 'Tools', href: '#tools', icon: Wrench },
    { label: 'Testimonials', href: '#testimonials', icon: Quote },
    { label: 'About', href: '#about', icon: UserRound },
    { label: 'Contact', href: '#contact', icon: Bot },
];

const Navigation: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Home');

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
                    <span className="profile-name">Kim Benedict Gayomali</span>
                    <BadgeCheck className="verified-badge" size={18} fill="currentColor" aria-label="Verified" />
                </div>
                <span className="profile-handle">Sechurplets Studio</span>
                <div className="social-links" aria-label="Social links">
                    <a href="#projects" aria-label="Facebook profile"><span className="social-letter" aria-hidden="true">f</span></a>
                    <a href="#about" aria-label="LinkedIn profile"><span className="social-letter social-letter--in" aria-hidden="true">in</span></a>
                    <a href="#contact" aria-label="Contact Kim"><Mail size={18} /></a>
                </div>
            </div>
            <nav className="sidebar-nav" aria-label="Main navigation">
                {navigationItems.map((item, index) => {
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
            <div className="sidebar-role">
                <span className="role-dot" />
                Available for select projects
            </div>
        </aside>
    );
};

export default Navigation;