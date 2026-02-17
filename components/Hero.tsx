'use client';

import Image from 'next/image';

export default function Hero() {
    return (
        <section id="hero">
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
                        <strong>Backend Developer · Data Analyst · Technical PM</strong><br />
                        I build web applications, work with data, and enjoy solving problems that matter.
                    </p>
                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#contact" className="btn btn-ghost">Get in Touch</a>
                    </div>
                </div>
                <div className="hero-image-wrapper">
                    <Image
                        src="/caricature.png"
                        alt="Olayinka Daniel"
                        width={380}
                        height={380}
                        className="hero-image"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
