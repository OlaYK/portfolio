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
        name: "Token Release Schedule",
        desc: "A Python tool for calculating cryptocurrency token release schedules. Computes airdrop distributions by amount, percentage, and vesting duration — a practical utility for Web3 project tokenomics planning.",
        tags: ["Python", "Jupyter", "Web3", "Tokenomics"],
        link: "https://github.com/OlaYK/Token-Release-Schedule"
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

    // Logic: 
    // 1. Start with the curated manual projects to ensure the order is exactly as requested
    // 2. Supplement with any additional high-star repos from GitHub that aren't in manual list
    // 3. Ensure "portfolio" repo stays at the absolute end

    const manualLinks = manualProjects.map(p => p.link.toLowerCase());

    const additionalRepos = dynamicRepos
        .filter(repo => !manualLinks.includes(repo.html_url.toLowerCase()))
        .map(repo => ({
            name: repo.name,
            desc: repo.description || "No description available.",
            tags: [repo.language, ...repo.topics].filter(Boolean).slice(0, 5),
            link: repo.html_url
        }));

    const allProjects = [...manualProjects, ...additionalRepos];

    // Pull "portfolio" out of the list and put it back at the end
    const portfolioProject = allProjects.find(p => p.link.toLowerCase().includes('portfolio'));
    const otherProjects = allProjects.filter(p => !p.link.toLowerCase().includes('portfolio'));

    const finalSequence = portfolioProject ? [...otherProjects, portfolioProject] : otherProjects;

    return (
        <section id="projects">
            <div className="section-label">02 — Projects</div>
            <h2 className="section-title reveal">SELECTED<br />WORK</h2>
            <div className="projects-grid">
                {finalSequence.map((project, index) => (
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
