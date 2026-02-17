'use client';

export default function Skills() {
    return (
        <section id="skills">
            <div className="section-label">03 — Skills</div>
            <div className="skills-layout">
                <div className="reveal">
                    <h2 className="section-title">TECH<br />STACK</h2>
                    <p className="skills-intro">
                        A pragmatic toolkit built around Python and data — with growing expertise in blockchain development and product thinking.
                    </p>
                </div>
                <div className="skills-groups reveal" style={{ transitionDelay: '0.15s' }}>
                    <div>
                        <div className="skill-group-label">Languages</div>
                        <div className="skill-list">
                            <span className="skill-pill featured">Python</span>
                            <span className="skill-pill featured">SQL</span>
                            <span className="skill-pill">Solidity</span>
                        </div>
                    </div>

                    <div>
                        <div className="skill-group-label">Frameworks & Tools</div>
                        <div className="skill-list">
                            <span className="skill-pill featured">FastAPI</span>
                            <span className="skill-pill featured">Django</span>
                            <span className="skill-pill">PostgreSQL</span>
                            <span className="skill-pill">Alembic</span>
                            <span className="skill-pill">Git</span>
                        </div>
                    </div>

                    <div>
                        <div className="skill-group-label">Data & ML</div>
                        <div className="skill-list">
                            <span className="skill-pill">Scikit-Learn</span>
                            <span className="skill-pill">Pandas</span>
                            <span className="skill-pill">Jupyter</span>
                            <span className="skill-pill">Data Science</span>
                            <span className="skill-pill">Machine Learning</span>
                        </div>
                    </div>

                    <div>
                        <div className="skill-group-label">Web3 & Product</div>
                        <div className="skill-list">
                            <span className="skill-pill">Smart Contracts</span>
                            <span className="skill-pill">Polygon / Base L2</span>
                            <span className="skill-pill">Tokenomics</span>
                            <span className="skill-pill">Technical PM</span>
                            <span className="skill-pill">Product Strategy</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
