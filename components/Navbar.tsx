'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
];

function isTheme(value: string | null): value is Theme {
    return value === 'dark' || value === 'light';
}

function getThemeSnapshot(): Theme {
    if (typeof window === 'undefined') {
        return 'dark';
    }

    const activeTheme = document.documentElement.getAttribute('data-theme');
    if (isTheme(activeTheme)) {
        return activeTheme;
    }

    const savedTheme = window.localStorage.getItem('theme');
    return isTheme(savedTheme) ? savedTheme : 'dark';
}

function subscribeToTheme(callback: () => void) {
    window.addEventListener('storage', callback);
    window.addEventListener('themechange', callback);

    return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener('themechange', callback);
    };
}

function applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
    window.dispatchEvent(new Event('themechange'));
}

export default function Navbar() {
    const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => 'dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem('theme');
        applyTheme(isTheme(savedTheme) ? savedTheme : 'dark');

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const toggleTheme = () => {
        applyTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const toggleMenu = () => {
        setIsMenuOpen((current) => {
            document.body.style.overflow = current ? '' : 'hidden';
            return !current;
        });
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <nav>
            <a className="nav-logo" href="#hero" onClick={closeMenu}>OD<span>.</span></a>
            <div className="nav-right">
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a href={item.href} onClick={closeMenu}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    className="theme-toggle"
                    aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? (
                        <svg
                            className="theme-icon"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="m4.93 4.93 1.41 1.41" />
                            <path d="m17.66 17.66 1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="m6.34 17.66-1.41 1.41" />
                            <path d="m19.07 4.93-1.41 1.41" />
                        </svg>
                    ) : (
                        <svg
                            className="theme-icon"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20.99 12.75A9 9 0 1 1 11.25 3.01a7 7 0 0 0 9.74 9.74Z" />
                        </svg>
                    )}
                </button>

                <button
                    className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    aria-label="Toggle menu"
                    onClick={toggleMenu}
                >
                    <div className="hamburger" />
                </button>
            </div>
        </nav>
    );
}
