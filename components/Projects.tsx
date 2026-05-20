import { getPinnedRepos, RankedRepo } from '@/lib/github';
import ProjectsRail from '@/components/ProjectsRail';

type FocusTone = 'backend' | 'data' | 'backend-data' | 'fullstack' | 'general';

type ProjectCard = {
    name: string;
    desc: string;
    tags: string[];
    link: string;
    liveUrl?: string;
    focusLabel: string;
    focusTone: FocusTone;
    role: string;
    outcome: string;
    proofPoints: string[];
    lastUpdated: string;
    lastUpdatedIso: string;
};

type LockedProject = {
    url: string;
    repoName: string;
    aliases?: string[];
    liveUrl?: string;
    displayName: string;
    badge: FocusTone;
    description: string;
    stack: string[];
    role: string;
    outcome: string;
    proofPoints: string[];
    fallbackUpdated: string;
};

const LOCKED_PROJECTS: LockedProject[] = [
    {
        url: 'https://github.com/OlaYK/metavault',
        repoName: 'metavault',
        liveUrl: 'https://metavault.onrender.com/',
        displayName: 'MetaVault',
        badge: 'backend',
        description:
            'File metadata intelligence platform for security and forensic workflows, with a separated browser client and backend API.',
        stack: ['JavaScript', 'Node HTTP', 'Metadata', 'Security', 'Docker'],
        role: 'Backend API and metadata analysis system',
        outcome: 'A dependency-light MVP that can inspect file metadata and support audit-oriented workflows.',
        proofPoints: ['Client/API separation', 'Metadata analyzer service', 'Audit and auth service structure'],
        fallbackUpdated: '2026-05-18'
    },
    {
        url: 'https://github.com/OlaYK/terrapulse',
        repoName: 'terrapulse',
        liveUrl: 'https://terrapulse-web.onrender.com/',
        displayName: 'TerraPulse',
        badge: 'data',
        description:
            'Earth change observatory for Nigeria and Africa using Sentinel-2 scenes, split maps, and spectral change analysis.',
        stack: ['React', 'MapLibre', 'Sentinel-2', 'Element84', 'TiTiler', 'Rasterio'],
        role: 'Geospatial data product and analysis workflow',
        outcome: 'Browser-based before/after satellite comparison with NDVI, MNDWI, NBR, RGB, and report exports.',
        proofPoints: ['Sentinel scene search', 'Change overlays', 'Print-ready reports'],
        fallbackUpdated: '2026-05-18'
    },
    {
        url: 'https://github.com/OlaYK/orbitalaf',
        repoName: 'orbitalaf',
        liveUrl: 'https://orbitalaf.vercel.app/',
        displayName: 'OrbitalAF',
        badge: 'backend-data',
        description:
            'Africa-focused satellite tracking platform with real-time orbital predictions, community sightings, maps, and alert workflows.',
        stack: ['Python', 'FastAPI', 'CelesTrak', 'Open-Meteo', 'Supabase', 'Resend'],
        role: 'Full-stack orbital data and alerting system',
        outcome: 'A free-tier MVP architecture for satellite pass prediction, weather context, map views, and email alerts.',
        proofPoints: ['CelesTrak and sgp4 data', 'FastAPI backend', 'Supabase persistence'],
        fallbackUpdated: '2026-05-10'
    },
    {
        url: 'https://github.com/OlaYK/NASA-OSDR-Space-Biology',
        repoName: 'NASA-OSDR-Space-Biology',
        aliases: ['nasaosdrspacebiology'],
        displayName: 'NASA OSDR Space Biology',
        badge: 'data',
        description:
            'Explainable AI notebooks for NASA OSDR gene expression data, comparing spaceflight and ground control biological samples.',
        stack: ['Python', 'Jupyter', 'Scikit-Learn', 'Explainable AI', 'Gene Expression'],
        role: 'ML analysis and explainability notebooks',
        outcome: 'Modeling workflow for classification, regression, feature importance, and biological interpretation.',
        proofPoints: ['Gene expression modeling', 'Feature importance analysis', 'Spaceflight vs ground comparison'],
        fallbackUpdated: '2026-03-23'
    },
    {
        url: 'https://github.com/OlaYK/craveseat',
        repoName: 'craveseat',
        liveUrl: 'https://craveseat.vercel.app/home',
        displayName: 'Craveseat',
        badge: 'backend',
        description:
            'Backend-forward food platform with role-based APIs for customers and vendors, including auth, location, notifications, and media pipelines.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'Cloudinary', 'Google Auth', 'Alembic'],
        role: 'Backend architecture and API implementation',
        outcome: 'Clear customer/vendor workflows with production-style service boundaries.',
        proofPoints: ['Role-based authentication', 'Vendor and customer APIs', 'Media and location flows'],
        fallbackUpdated: '2026-02-24'
    },
    {
        url: 'https://github.com/OlaYK/sholly',
        repoName: 'sholly',
        liveUrl: 'https://sholly-live-store.onrender.com/',
        displayName: 'Sholly',
        badge: 'fullstack',
        description:
            'Full-stack application with backend services and UI workflows, built for production-style feature delivery and iteration.',
        stack: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL'],
        role: 'Full-stack feature delivery',
        outcome: 'A practical app surface that connects interface decisions to backend behavior.',
        proofPoints: ['Next.js application structure', 'Reusable UI flows', 'Database-backed workflows'],
        fallbackUpdated: '2026-02-26'
    },
    {
        url: 'https://github.com/OlaYK/KidDoc',
        repoName: 'KidDoc',
        aliases: ['medikids'],
        liveUrl: 'https://kiddoc.onrender.com/',
        displayName: 'KidDoc',
        badge: 'fullstack',
        description:
            'Kid-friendly symptom explainer app with a protected backend provider chain, red-flag triage metadata, and printable summaries.',
        stack: ['React', 'Express', 'Gemini', 'Groq', 'Anthropic', 'Zod'],
        role: 'AI app hardening and backend protection',
        outcome: 'A safer app architecture that keeps provider keys server-side and adds validation, rate limits, and fallback models.',
        proofPoints: ['Gemini/Groq/Anthropic fallback', 'Red-flag triage metadata', 'Doctor handoff summaries'],
        fallbackUpdated: '2026-02-27'
    },
    {
        url: 'https://github.com/OlaYK/Part_5_Advanced_Statistical_Methods_-Machine_Learning-',
        repoName: 'Part_5_Advanced_Statistical_Methods_-Machine_Learning-',
        aliases: ['part5advancedstatisticalmethodsmachinelearning'],
        displayName: 'Advanced Statistical Methods - ML',
        badge: 'data',
        description:
            'Data science and machine learning notebook series covering regression, classification, clustering, and model evaluation.',
        stack: ['Python', 'Jupyter', 'Scikit-Learn', 'Pandas', 'NumPy'],
        role: 'Data analysis and machine learning exploration',
        outcome: 'Reusable statistical learning reference across classic supervised and unsupervised methods.',
        proofPoints: ['Regression and classification', 'Clustering workflows', 'Evaluation and interpretation'],
        fallbackUpdated: '2026-02-17'
    },
    {
        url: 'https://github.com/OlaYK/polymarket_copy_bot',
        repoName: 'polymarket_copy_bot',
        aliases: ['polymarketcopybot'],
        displayName: 'Polymarket Copy Bot',
        badge: 'backend',
        description:
            'Automated copy-trading backend with watcher/executor workers, execution safeguards, and PostgreSQL-backed tracking.',
        stack: ['Python', 'FastAPI', 'Polymarket CLOB', 'Web3.py', 'Stripe', 'Paystack'],
        role: 'Automation backend and execution safeguards',
        outcome: 'Event-driven trading workflow with persistence and guardrails around execution state.',
        proofPoints: ['Watcher and executor workers', 'Web3 transaction flow', 'PostgreSQL tracking'],
        fallbackUpdated: '2026-03-13'
    },
    {
        url: 'https://github.com/OlaYK/portfolio',
        repoName: 'portfolio',
        liveUrl: 'https://ola-portfolio.onrender.com/',
        displayName: 'Portfolio',
        badge: 'general',
        description:
            'Next.js portfolio app with server-side GitHub project ingestion, backend-oriented ranking logic, and contact API integration.',
        stack: ['Next.js', 'TypeScript', 'React', 'Resend', 'GitHub API', 'CSS'],
        role: 'Personal brand and project presentation',
        outcome: 'A faster portfolio surface that turns repository work into a clearer professional narrative.',
        proofPoints: ['GitHub repo ingestion', 'Contact API integration', 'Responsive interaction design'],
        fallbackUpdated: '2026-03-09'
    },
    {
        url: 'https://github.com/OlaYK/bizhandle',
        repoName: 'bizhandle',
        aliases: ['monidesk'],
        liveUrl: 'https://monidesk-frontend.onrender.com/',
        displayName: 'MoniDesk (BizHandle)',
        badge: 'backend',
        description:
            'Business operations backend with modular API design, persistence, and workflow orchestration for operational tooling.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'OpenAI API', 'Google Auth', 'SQLAlchemy'],
        role: 'Operations backend design',
        outcome: 'Modular service structure for business workflows that need reliable persistence.',
        proofPoints: ['REST API modules', 'PostgreSQL persistence', 'Operational workflow modeling'],
        fallbackUpdated: '2026-04-01'
    },
    {
        url: 'https://github.com/OlaYK/Skilllink',
        repoName: 'Skilllink',
        aliases: ['skilllink'],
        displayName: 'SkillLink',
        badge: 'backend-data',
        description:
            'Decentralized credential verification system built for the Hedera Africa Hackathon using Hedera and PostgreSQL.',
        stack: ['Python', 'FastAPI', 'Hedera SDK', 'PostgreSQL', 'Neon DB', 'Web3'],
        role: 'Credential verification and blockchain proof system',
        outcome: 'A tamper-aware credential platform for wallet-linked profiles, cloud records, and on-chain verification.',
        proofPoints: ['Hedera Testnet proofs', 'Credential hash storage', 'PostgreSQL profile data'],
        fallbackUpdated: '2025-10-30'
    },
    {
        url: 'https://github.com/OlaYK/Token-Release-Schedule',
        repoName: 'Token-Release-Schedule',
        aliases: ['tokenreleaseschedule'],
        displayName: 'Token Release Schedule',
        badge: 'data',
        description:
            'Data-focused token release modeling and schedule analytics for scenario analysis, charting, and planning.',
        stack: ['Python', 'Pandas', 'NumPy', 'Jupyter', 'Data Analysis'],
        role: 'Token analytics and scenario modeling',
        outcome: 'A planning-oriented data model for understanding token release timing and supply movement.',
        proofPoints: ['Schedule modeling', 'Scenario analysis', 'Notebook-based reporting'],
        fallbackUpdated: '2025-07-10'
    },
    {
        url: 'https://github.com/OlaYK/PMCT_V1',
        repoName: 'PMCT_V1',
        aliases: ['pmctv1'],
        displayName: 'PMCT v1',
        badge: 'backend',
        description:
            'Trading automation backend prototype centered on signal ingestion, execution rules, and transaction state management.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'Web3', 'Automation'],
        role: 'Trading automation prototype',
        outcome: 'A backend foundation for signal processing, execution rules, and transaction awareness.',
        proofPoints: ['Signal ingestion', 'Execution state logic', 'Automation-oriented API design'],
        fallbackUpdated: '2025-03-23'
    }
];

function normalizeRepoKey(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getFocusLabel(focusTone: FocusTone): string {
    if (focusTone === 'backend') {
        return 'Backend Focus';
    }
    if (focusTone === 'data') {
        return 'Data Science';
    }
    if (focusTone === 'backend-data') {
        return 'Backend + Data';
    }
    if (focusTone === 'fullstack') {
        return 'Backend + Full-Stack';
    }
    return 'General Engineering';
}

function normalizeTags(language: string | null, topics: string[], curatedTags: string[]): string[] {
    const rawTags = [...curatedTags, language, ...topics].filter(Boolean) as string[];
    const deduped = rawTags.filter((tag, index) => {
        const normalizedTag = tag.toLowerCase();
        return rawTags.findIndex((candidate) => candidate.toLowerCase() === normalizedTag) === index;
    });
    return deduped.slice(0, 6);
}

function findDynamicRepo(dynamicRepos: RankedRepo[], project: LockedProject): RankedRepo | undefined {
    const nameCandidates = new Set([
        normalizeRepoKey(project.repoName),
        ...((project.aliases || []).map((alias) => normalizeRepoKey(alias)))
    ]);
    return dynamicRepos.find((repo) => nameCandidates.has(normalizeRepoKey(repo.name)));
}

function formatUpdatedDate(dateValue: string): string {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        year: 'numeric'
    }).format(date);
}

function mapToCard(project: LockedProject, dynamicRepo?: RankedRepo): ProjectCard {
    const updateDate = dynamicRepo?.pushed_at || dynamicRepo?.updated_at || project.fallbackUpdated;

    return {
        name: project.displayName,
        desc: project.description,
        tags: normalizeTags(dynamicRepo?.language || null, dynamicRepo?.topics || [], project.stack),
        link: dynamicRepo?.html_url || project.url,
        liveUrl: project.liveUrl,
        focusLabel: getFocusLabel(project.badge),
        focusTone: project.badge,
        role: project.role,
        outcome: project.outcome,
        proofPoints: project.proofPoints,
        lastUpdated: formatUpdatedDate(updateDate),
        lastUpdatedIso: updateDate
    };
}

export default async function Projects() {
    const githubUsername = process.env.GITHUB_USERNAME || 'OlaYK';

    let dynamicRepos: RankedRepo[] = [];
    try {
        dynamicRepos = await getPinnedRepos(githubUsername, 100);
    } catch (err) {
        console.error('Error fetching GitHub repos:', err);
    }

    const projectsToRender = LOCKED_PROJECTS.map((project) => {
        const dynamicRepo = findDynamicRepo(dynamicRepos, project);
        return mapToCard(project, dynamicRepo);
    }).sort((a, b) => new Date(b.lastUpdatedIso).getTime() - new Date(a.lastUpdatedIso).getTime());

    return (
        <section id="projects">
            <div className="section-label reveal">05 // Projects</div>
            <div className="projects-heading">
                <h2 className="section-title reveal">
                    SELECTED
                    <br />
                    WORK
                </h2>
            </div>

            <ProjectsRail projects={projectsToRender} />

            <div className="reveal" style={{ marginTop: '60px', textAlign: 'center' }}>
                <a
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-ghost"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
                >
                    View More on GitHub
                    <span className="link-arrow" aria-hidden="true">&#8599;</span>
                </a>
            </div>
        </section>
    );
}
