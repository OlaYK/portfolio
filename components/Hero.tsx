'use client';

import Image from 'next/image';

const heroSignals = [
    { label: 'Backend', value: 'APIs, auth, data models' },
    { label: 'Data', value: 'Analysis, ML, reporting' },
    { label: 'Product', value: 'Specs, tradeoffs, delivery' }
];

const techPills = ['FastAPI', 'PostgreSQL', 'Python', 'SQL', 'Next.js', 'Web3'];

export default function Hero() {
    return (
        <section id="hero">
            <div className="hero-backdrop" aria-hidden="true">
                {techPills.map((pill, index) => (
                    <span key={pill} className={`hero-tech-pill pill-${index + 1}`}>
                        {pill}
                    </span>
                ))}
            </div>

            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-tag">
                        <span className="status-dot"></span>
                        Available for opportunities
                    </div>
                    <h1 className="hero-name">
                        OLAYINKA<br />
                        <span className="line2">DANIEL</span>
                    </h1>
                    <p className="hero-bio">
                        <strong>Backend Developer / Data Analyst / Technical PM</strong><br />
                        I build dependable backend systems, make data easier to act on, and turn unclear product
                        problems into scoped, shippable work.
                    </p>

                    <div className="hero-signal-grid" aria-label="Core strengths">
                        {heroSignals.map((signal) => (
                            <div className="hero-signal" key={signal.label}>
                                <span>{signal.label}</span>
                                <strong>{signal.value}</strong>
                            </div>
                        ))}
                    </div>

                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="/resume/olayinka-od-backend-resume.pdf" target="_blank" rel="noopener" className="btn btn-ghost">
                            Download Resume
                        </a>
                        <a href="#contact" className="btn btn-ghost">Get in Touch</a>
                    </div>
                </div>

                <div className="hero-visual" aria-label="Portrait and profile highlights">
                    <div className="hero-image-frame">
                        <Image
                            src="/caricature.png"
                            alt="Olayinka Daniel"
                            width={440}
                            height={440}
                            className="hero-image"
                            priority
                        />
                    </div>
                    <div className="hero-floating-card hero-floating-card-top">
                        <span>Focus</span>
                        <strong>Backend systems with product context</strong>
                    </div>
                    <div className="hero-floating-card hero-floating-card-bottom">
                        <span>Current stack</span>
                        <strong>Python, SQL, FastAPI, Next.js</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}
