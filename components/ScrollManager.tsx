'use client';

import { useEffect } from 'react';

export default function ScrollManager() {
    useEffect(() => {
        // Intersection Observer for scroll reveal
        const observerOptions = {
            threshold: 0.12,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el) => observer.observe(el));

        // Active nav link logic
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');

            let current = '';
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.scrollY >= sectionTop - 120) {
                    current = section.getAttribute('id') || '';
                }
            });

            navLinks.forEach((link) => {
                const href = (link as HTMLAnchorElement).getAttribute('href');
                if (href === `#${current}`) {
                    (link as HTMLElement).style.color = 'var(--accent)';
                } else {
                    (link as HTMLElement).style.color = '';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return null;
}
