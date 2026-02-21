import { getPinnedRepos, RankedRepo } from '@/lib/github';
import ProjectsRail from '@/components/ProjectsRail';

type FocusTone = 'backend' | 'data' | 'backend-data' | 'fullstack' | 'general';

type ProjectCard = {
    name: string;
    desc: string;
    tags: string[];
    link: string;
    focusLabel: string;
    focusTone: FocusTone;
};

type LockedProject = {
    url: string;
    repoName: string;
    aliases?: string[];
    displayName: string;
    badge: FocusTone;
    description: string;
    stack: string[];
};

const LOCKED_PROJECTS: LockedProject[] = [
    {
        url: 'https://github.com/OlaYK/craveseat',
        repoName: 'craveseat',
        displayName: 'Craveseat',
        badge: 'backend',
        description:
            'Backend-forward food platform with role-based APIs for customers and vendors, including auth, location, notifications, and media pipelines.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'Alembic', 'Cloudinary']
    },
    {
        url: 'https://github.com/OlaYK/sholly',
        repoName: 'sholly',
        displayName: 'Sholly',
        badge: 'fullstack',
        description:
            'Full-stack application with backend services and UI workflows, built for production-style feature delivery and iteration.',
        stack: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL']
    },
    {
        url: 'https://github.com/OlaYK/Part_5_Advanced_Statistical_Methods_-Machine_Learning-',
        repoName: 'Part_5_Advanced_Statistical_Methods_-Machine_Learning-',
        aliases: ['part5advancedstatisticalmethodsmachinelearning'],
        displayName: 'Advanced Statistical Methods - ML',
        badge: 'data',
        description:
            'Data science and machine learning notebook series covering regression, classification, clustering, and model evaluation.',
        stack: ['Python', 'Jupyter', 'Scikit-Learn', 'Pandas', 'NumPy']
    },
    {
        url: 'https://github.com/OlaYK/polymarket_copy_bot',
        repoName: 'polymarket_copy_bot',
        aliases: ['polymarketcopybot'],
        displayName: 'Polymarket Copy Bot',
        badge: 'backend',
        description:
            'Automated copy-trading backend with watcher/executor workers, execution safeguards, and PostgreSQL-backed tracking.',
        stack: ['Python', 'FastAPI', 'Web3', 'PostgreSQL', 'WebSockets']
    },
    {
        url: 'https://github.com/OlaYK/portfolio',
        repoName: 'portfolio',
        displayName: 'Portfolio',
        badge: 'general',
        description:
            'Next.js portfolio app with server-side GitHub project ingestion, backend-oriented ranking logic, and contact API integration.',
        stack: ['Next.js', 'TypeScript', 'React', 'Resend', 'CSS']
    },
    {
        url: 'https://github.com/OlaYK/bizhandle',
        repoName: 'bizhandle',
        aliases: ['monidesk'],
        displayName: 'MoniDesk (BizHandle)',
        badge: 'backend',
        description:
            'Business operations backend with modular API design, persistence, and workflow orchestration for operational tooling.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'REST API', 'Backend']
    },
    {
        url: 'https://github.com/OlaYK/Token-Release-Schedule',
        repoName: 'Token-Release-Schedule',
        aliases: ['tokenreleaseschedule'],
        displayName: 'Token Release Schedule',
        badge: 'data',
        description:
            'Data-focused token release modeling and schedule analytics for scenario analysis, charting, and planning.',
        stack: ['Python', 'Pandas', 'NumPy', 'Jupyter', 'Data Analysis']
    },
    {
        url: 'https://github.com/OlaYK/PMCT_V1',
        repoName: 'PMCT_V1',
        aliases: ['pmctv1'],
        displayName: 'PMCT v1',
        badge: 'backend',
        description:
            'Trading automation backend prototype centered on signal ingestion, execution rules, and transaction state management.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'Web3', 'Automation']
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

function mapToCard(project: LockedProject, dynamicRepo?: RankedRepo): ProjectCard {
    return {
        name: project.displayName,
        desc: dynamicRepo?.description?.trim() || project.description,
        tags: normalizeTags(dynamicRepo?.language || null, dynamicRepo?.topics || [], project.stack),
        link: dynamicRepo?.html_url || project.url,
        focusLabel: getFocusLabel(project.badge),
        focusTone: project.badge
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
    });

    return (
        <section id="projects">
            <div className="section-label">02 - Projects</div>
            <h2 className="section-title reveal">
                SELECTED
                <br />
                WORK
            </h2>

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
                    <span style={{ fontSize: '18px' }}>-&gt;</span>
                </a>
            </div>
        </section>
    );
}
