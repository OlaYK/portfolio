'use client';

export default function About() {
    return (
        <section id="about" className="reveal">
            <div className="section-label">01 // About Me</div>
            <h2 className="section-title">ENGINEERING WITH <br />PRECISION</h2>

            <div className="about-grid">
                <div className="about-text">
                    <p>
                        I am a backend developer and data analyst who builds practical systems across APIs,
                        data workflows, automation, and product-led MVPs. My recent work spans file metadata
                        intelligence, satellite and geospatial analysis, orbital tracking, AI-assisted health
                        tooling, Web3 credential verification, and trading automation.
                    </p>
                    <p>
                        I work mostly with Python, FastAPI, SQL, PostgreSQL, JavaScript/TypeScript, and modern
                        API integrations. I enjoy turning ambiguous ideas into structured backend services,
                        data products, and workflows that are easier to deploy, inspect, and improve.
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
                        <div className="stat-num">30+</div>
                        <div className="stat-label">Public Repositories</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">10+</div>
                        <div className="stat-label">Backend / Data Systems</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">AI</div>
                        <div className="stat-label">Geo / Web3 / Automation</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">2026</div>
                        <div className="stat-label">Recent Active Builds</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
