'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
    };

    if (!mounted) {
        return (
            <nav>
                <a className="nav-logo" href="#hero">OD<span>.</span></a>
                <div className="nav-right">
                    <ul className="nav-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <div className="theme-toggle" style={{ opacity: 0 }}></div>
                </div>
            </nav>
        );
    }

    return (
        <nav>
            <a className="nav-logo" href="#hero" onClick={closeMenu}>OD<span>.</span></a>
            <div className="nav-right">
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><a href="#about" onClick={closeMenu}>About</a></li>
                    <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                    <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
                    <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
                </ul>

                <button
                    className="theme-toggle"
                    aria-label="Toggle theme"
                    onClick={toggleTheme}
                >
                    <span className="theme-icon">{theme === 'dark' ? '☀' : '🌙'}</span>
                </button>

                <button
                    className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    aria-label="Toggle menu"
                    onClick={toggleMenu}
                >
                    <div className="hamburger"></div>
                </button>
            </div>
        </nav>
    );
}
