import { getPinnedRepos, Repo } from '@/lib/github';

const manualProjects = [
    {
        name: "Polymarket Copy Bot",
        desc: "Production-grade automated copy trading service for Polymarket prediction markets. FastAPI backend with background workers (watcher + executor), slippage protection, position sizing, and P&L reporting. Deployed on Render with PostgreSQL.",
        tags: ["Python", "FastAPI", "Web3", "PostgreSQL", "Polygon", "WebSockets"],
        link: "https://github.com/OlaYK/polymarket_copy_bot"
    },
    {
        name: "Craveseat",
        desc: "A full-stack food platform backend with dual-role architecture supporting both customers and vendors. Features authentication, cravings, location mapping, notifications, and image uploads via Cloudinary. Live on Vercel.",
        tags: ["Python", "FastAPI", "PostgreSQL", "Alembic", "Cloudinary", "Next.js"],
        link: "https://github.com/OlaYK/craveseat"
    },
    {
        name: "Logistics Optimization Engine",
        desc: "A data-driven engine using linear programming and historical traffic data to optimize supply chain routes. Developed as a Backend/Data project to solve real-world efficiency bottlenecks.",
        tags: ["Python", "Pandas", "NumPy", "Optimization", "Data Science"],
        link: "https://github.com/OlaYK/logistics-opt"
    },
    {
        name: "Real-time Analytics Pipeline",
        desc: "A distributed system for processing millions of events per second. Integrated Kafka and Spark to provide real-time dashboards for user engagement metrics.",
        tags: ["Python", "Kafka", "Spark", "PostgreSQL", "Redis"],
        link: "https://github.com/OlaYK/analytics-pipeline"
    },
    {
        name: "Advanced ML Methods",
        desc: "Comprehensive Jupyter notebook series covering advanced statistical methods and machine learning — regression, classification, clustering, and model evaluation using scikit-learn. Applied across 40+ structured lessons.",
        tags: ["Python", "Scikit-Learn", "Jupyter", "Regression", "ML", "Statistics"],
        link: "https://github.com/OlaYK/Part_5_Advanced_Statistical_Methods_-Machine_Learning-"
    },
    {
        name: "Base Testnet Contracts",
        desc: "Smart contract deployment and testing on Coinbase's Base L2 testnet. Explores Ethereum-compatible contract patterns using Solidity — part of an ongoing exploration into on-chain development.",
        tags: ["Solidity", "Base L2", "Ethereum", "Smart Contracts", "Foundry"],
        link: "https://github.com/OlaYK/Base-test"
    },
    {
        name: "BizHandle",
        desc: "A Python backend service for business operations management. Built with a modular backend structure (ibos-backend) focused on handling core business logic and data flows for SME use cases.",
        tags: ["Python", "Backend", "REST API", "PostgreSQL"],
        link: "https://github.com/OlaYK/bizhandle"
    },
    {
        name: "Portfolio Upgrade",
        desc: "The very site you are viewing. Migrated from static HTML to a high-performance Next.js 15 application with dynamic GitHub integration and Resend email services.",
        tags: ["Next.js", "TypeScript", "React", "Render", "Resend", "CSS3"],
        link: "https://github.com/OlaYK/portfolio"
    }
];

export default async function Projects() {
    let dynamicRepos: Repo[] = [];
    try {
        dynamicRepos = await getPinnedRepos('OlaYK');
    } catch (err) {
        console.error('Error fetching dynamic repos:', err);
    }

    // Combine logic:
    // We want EXACTLY 8 high-quality projects.

    const manualLinks = manualProjects.map(p => p.link.toLowerCase());

    // 1. Process dynamic repos, but only those that HAVE descriptions and aren't meta-repos (already filtered in lib/github.ts)
    const dynamicMapped = dynamicRepos
        .filter(repo => !manualLinks.includes(repo.html_url.toLowerCase()))
        .map(repo => ({
            name: repo.name,
            desc: repo.description, // Guaranteed to exist by lib/github.ts filter
            tags: [repo.language, ...repo.topics].filter(Boolean).slice(0, 5),
            link: repo.html_url
        }));

    // 2. Merge them, keeping manual ones at the top/front for curated order
    const mergedProjects = [...manualProjects];

    // 3. Fill up to 8 if we have fewer manual ones (though we have 8 manual ones already)
    // Actually, let's just use the 8 manual ones + any high-star dynamic ones, then limit to 8.
    // The user specifically wants these multi-stack ones.

    // Final Sequence: take the best 8
    const finalists = mergedProjects.slice(0, 8);

    // Ensure portfolio is last if it exists in the list
    const portfolioIdx = finalists.findIndex(p => p.link.toLowerCase().includes('portfolio'));
    if (portfolioIdx > -1 && portfolioIdx !== finalists.length - 1) {
        const [portfolio] = finalists.splice(portfolioIdx, 1);
        finalists.push(portfolio);
    }

    return (
        <section id="projects">
            <div className="section-label">02 — Projects</div>
            <h2 className="section-title reveal">SELECTED<br />WORK</h2>
            <div className="projects-grid">
                {finalists.map((project, index) => (
                    <div
                        key={project.link}
                        className="project-card reveal"
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        <div className="project-num">{(index + 1).toString().padStart(3, '0')}</div>
                        <div className="project-name" style={{ textTransform: 'capitalize' }}>{project.name.replace(/-/g, ' ')}</div>
                        <p className="project-desc">{project.desc}</p>
                        <div className="project-tags">
                            {project.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener"
                            className="project-link"
                        >
                            View on GitHub
                        </a>
                    </div>
                ))}
            </div>

            <div className="reveal" style={{ marginTop: '60px', textAlign: 'center' }}>
                <a
                    href="https://github.com/OlaYK"
                    target="_blank"
                    rel="noopener"
                    className="btn btn-ghost"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
                >
                    View More on GitHub
                    <span style={{ fontSize: '18px' }}>→</span>
                </a>
            </div>
        </section>
    );
}
