import { getPinnedRepos, Repo } from '@/lib/github';

const manualProjects = [
    {
        num: "001",
        name: "Craveseat",
        desc: "A full-stack food platform backend with dual-role architecture supporting both customers and vendors. Features authentication, cravings, location mapping, notifications, and image uploads via Cloudinary. Live on Vercel.",
        tags: ["Python", "FastAPI", "PostgreSQL", "Alembic", "Cloudinary"],
        link: "https://github.com/OlaYK/craveseat"
    },
    {
        num: "002",
        name: "Polymarket Copy Bot",
        desc: "Production-grade automated copy trading service for Polymarket prediction markets. FastAPI backend with background workers (watcher + executor), slippage protection, position sizing, and P&L reporting. Deployed on Render with PostgreSQL.",
        tags: ["Python", "FastAPI", "Web3", "PostgreSQL", "Polygon"],
        link: "https://github.com/OlaYK/polymarket_copy_bot"
    },
    {
        num: "003",
        name: "Advanced ML Methods",
        desc: "Comprehensive Jupyter notebook series covering advanced statistical methods and machine learning — regression, classification, clustering, and model evaluation using scikit-learn. Applied across 40+ structured lessons.",
        tags: ["Python", "Scikit-Learn", "Jupyter", "Regression", "ML"],
        link: "https://github.com/OlaYK/Part_5_Advanced_Statistical_Methods_-Machine_Learning-"
    },
    {
        num: "004",
        name: "Token Release Schedule",
        desc: "A Python tool for calculating cryptocurrency token release schedules. Computes airdrop distributions by amount, percentage, and vesting duration — a practical utility for Web3 project tokenomics planning.",
        tags: ["Python", "Jupyter", "Web3", "Tokenomics"],
        link: "https://github.com/OlaYK/Token-Release-Schedule"
    },
    {
        num: "005",
        name: "BizHandle",
        desc: "A Python backend service for business operations management. Built with a modular backend structure (ibos-backend) focused on handling core business logic and data flows for SME use cases.",
        tags: ["Python", "Backend", "REST API"],
        link: "https://github.com/OlaYK/bizhandle"
    },
    {
        num: "006",
        name: "Base Testnet Contracts",
        desc: "Smart contract deployment and testing on Coinbase's Base L2 testnet. Explores Ethereum-compatible contract patterns using Solidity — part of an ongoing exploration into on-chain development.",
        tags: ["Solidity", "Base L2", "Ethereum", "Smart Contracts"],
        link: "https://github.com/OlaYK/Base-test"
    }
];

export default async function Projects() {
    let dynamicRepos: Repo[] = [];
    try {
        dynamicRepos = await getPinnedRepos('OlaYK');
    } catch (err) {
        console.error('Error fetching dynamic repos:', err);
    }

    // Combine manual descriptions for specific projects if found, otherwise use GitHub data
    const processedProjects = dynamicRepos.length > 0
        ? dynamicRepos.map((repo, index) => {
            const manual = manualProjects.find(p => p.link.toLowerCase().includes(repo.name.toLowerCase()));
            return {
                num: (index + 1).toString().padStart(3, '0'),
                name: manual?.name || repo.name,
                desc: manual?.desc || repo.description || "No description available.",
                tags: manual?.tags || [repo.language, ...repo.topics].filter(Boolean).slice(0, 5),
                link: repo.html_url
            };
        })
        : manualProjects;

    return (
        <section id="projects">
            <div className="section-label">02 — Projects</div>
            <h2 className="section-title reveal">SELECTED<br />WORK</h2>
            <div className="projects-grid">
                {processedProjects.map((project, index) => (
                    <div
                        key={project.link}
                        className="project-card reveal"
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        <div className="project-num">{project.num}</div>
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
