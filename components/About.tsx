'use client';

export default function About() {
    return (
        <section id="about" className="reveal">
            <div className="section-label">01 // About Me</div>
            <h2 className="section-title">ENGINEERING WITH <br />PRECISION</h2>

            <div className="about-grid">
                <div className="about-text">
                    <p>
                        I am a results-oriented Backend Developer and Data Analyst with a passion for building robust
                        systems and deriving actionable insights from complex datasets. My background as a
                        Technical Product Manager allows me to bridge the gap between complex engineering
                        solutions and business requirements.
                    </p>
                    <p>
                        With years of experience in the tech industry, I've developed a keen eye for
                        performance optimization and scalable architecture. I believe in writing clean,
                        maintainable code that solves real-world problems.
                    </p>

                    <div className="about-meta">
                        <div className="meta-row">
                            <span className="meta-key">Location</span>
                            <span className="meta-val">Lagos, Nigeria</span>
                        </div>
                        <div className="meta-row">
                            <span className="meta-key">Experience</span>
                            <span className="meta-val">5+ Years</span>
                        </div>
                        <div className="meta-row">
                            <span className="meta-key">Availability</span>
                            <span className="meta-val">Freelance / Full-time</span>
                        </div>
                    </div>
                </div>

                <div className="about-stats">
                    <div className="stat-box">
                        <div className="stat-num">20+</div>
                        <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">12</div>
                        <div className="stat-label">Happy Clients</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">500k+</div>
                        <div className="stat-label">Lines of Code</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">15+</div>
                        <div className="stat-label">Tech Stack Tools</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
