export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    topics: string[];
    fork: boolean;
    archived: boolean;
    updated_at: string;
}

export interface RankedRepo extends Repo {
    backendScore: number;
    focus: 'backend' | 'data' | 'backend-data' | 'fullstack' | 'general';
    backendSignal: number;
    dataSignal: number;
}

const BACKEND_LANGUAGES = new Set([
    'python',
    'typescript',
    'javascript',
    'go',
    'rust',
    'java',
    'c#',
    'php',
    'kotlin'
]);

const DATA_SCIENCE_LANGUAGES = new Set([
    'python',
    'r',
    'jupyter notebook',
    'matlab'
]);

const BACKEND_KEYWORDS = [
    'api',
    'backend',
    'server',
    'service',
    'microservice',
    'worker',
    'pipeline',
    'queue',
    'database',
    'postgres',
    'postgresql',
    'mysql',
    'mongodb',
    'redis',
    'kafka',
    'rabbitmq',
    'docker',
    'kubernetes',
    'auth',
    'oauth',
    'jwt',
    'fastapi',
    'django',
    'flask',
    'express',
    'nestjs',
    'node',
    'golang',
    'websocket',
    'web3',
    'graphql',
    'etl'
];

const DATA_SCIENCE_KEYWORDS = [
    'data',
    'data-science',
    'datascience',
    'machine-learning',
    'machine learning',
    'ml',
    'ai',
    'analytics',
    'prediction',
    'forecast',
    'model',
    'regression',
    'classification',
    'clustering',
    'nlp',
    'computer-vision',
    'pandas',
    'numpy',
    'scikit',
    'sklearn',
    'tensorflow',
    'pytorch',
    'xgboost',
    'notebook',
    'jupyter',
    'spark',
    'airflow',
    'dbt',
    'warehouse',
    'timeseries',
    'statistics'
];

const FRONTEND_ONLY_KEYWORDS = [
    'ui',
    'frontend',
    'landing',
    'portfolio',
    'template',
    'css',
    'tailwind',
    'design'
];

function countKeywordMatches(haystack: string, keywords: string[]): number {
    let matches = 0;
    for (const keyword of keywords) {
        if (haystack.includes(keyword)) {
            matches += 1;
        }
    }
    return matches;
}

function getSignals(repo: Repo): { backendSignal: number; dataSignal: number } {
    const language = (repo.language || '').toLowerCase();
    const nameBlob = repo.name.toLowerCase();
    const descriptionBlob = (repo.description || '').toLowerCase();
    const topicsBlob = (repo.topics || []).join(' ').toLowerCase();
    const backendSignal =
        countKeywordMatches(descriptionBlob, BACKEND_KEYWORDS) * 3 +
        countKeywordMatches(topicsBlob, BACKEND_KEYWORDS) * 2 +
        countKeywordMatches(nameBlob, BACKEND_KEYWORDS) +
        (BACKEND_LANGUAGES.has(language) ? 4 : 0);

    const dataSignal =
        countKeywordMatches(descriptionBlob, DATA_SCIENCE_KEYWORDS) * 3 +
        countKeywordMatches(topicsBlob, DATA_SCIENCE_KEYWORDS) * 2 +
        countKeywordMatches(nameBlob, DATA_SCIENCE_KEYWORDS) +
        (DATA_SCIENCE_LANGUAGES.has(language) ? 4 : 0);

    return { backendSignal, dataSignal };
}

function getBackendScore(repo: Repo, backendSignal: number, dataSignal: number): number {
    const language = (repo.language || '').toLowerCase();
    const nameBlob = repo.name.toLowerCase();
    const descriptionBlob = (repo.description || '').toLowerCase();
    const topicsBlob = (repo.topics || []).join(' ').toLowerCase();
    const searchBlob = [nameBlob, descriptionBlob, topicsBlob].join(' ');

    let score = 0;

    if (repo.description && repo.description.trim().length > 0) {
        score += 6;
        if (repo.description.trim().length >= 48) {
            score += 1;
        }
    } else {
        score -= 6;
    }

    if (BACKEND_LANGUAGES.has(language)) {
        score += 4;
    }

    if (DATA_SCIENCE_LANGUAGES.has(language)) {
        score += 4;
    }

    score += backendSignal * 1.2;
    score += dataSignal * 1.2;

    if (backendSignal > 0 && dataSignal > 0) {
        score += 4;
    }

    const frontendOnlySignal = countKeywordMatches(searchBlob, FRONTEND_ONLY_KEYWORDS);
    if (frontendOnlySignal > 0 && frontendOnlySignal > backendSignal + dataSignal) {
        score -= 4;
    }

    if (repo.stargazers_count > 0) {
        score += Math.min(repo.stargazers_count, 20) / 10;
    }

    const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate <= 120) {
        score += 2;
    } else if (daysSinceUpdate <= 240) {
        score += 1;
    }

    return score;
}

function getFocus(
    language: string | null,
    backendSignal: number,
    dataSignal: number
): RankedRepo['focus'] {
    const normalizedLanguage = (language || '').toLowerCase();
    const isDataLanguage = DATA_SCIENCE_LANGUAGES.has(normalizedLanguage);
    const backendStrong = backendSignal >= 6;
    const dataStrong = dataSignal >= 6;

    if (backendStrong && dataStrong) {
        if (isDataLanguage && dataSignal >= backendSignal) {
            return 'data';
        }
        return 'backend-data';
    }

    if (isDataLanguage && dataSignal >= backendSignal) {
        return 'data';
    }

    if (dataStrong || dataSignal >= backendSignal + 2) {
        return 'data';
    }

    if (backendStrong) {
        return 'backend';
    }

    if (backendSignal >= 4 && dataSignal >= 3) {
        return 'fullstack';
    }

    return 'general';
}

export async function getPinnedRepos(username: string, limit = 10): Promise<RankedRepo[]> {
    const headers: HeadersInit = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    };

    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`,
        {
            headers,
            next: { revalidate: 3600 }
        }
    );

    if (!response.ok) {
        if (response.status === 403) {
            console.warn('GitHub API rate limit exceeded. Using fallback projects.');
            return [];
        }
        throw new Error(`Failed to fetch repos (${response.status})`);
    }

    const allRepos = (await response.json()) as Repo[];

    return allRepos
        .filter((repo) => {
            const isMeta = repo.name.startsWith('.') || repo.name.toLowerCase() === username.toLowerCase();
            return !repo.fork && !repo.archived && !isMeta;
        })
        .map((repo) => {
            const normalizedRepo: Repo = {
                ...repo,
                topics: Array.isArray(repo.topics) ? repo.topics : []
            };
            const { backendSignal, dataSignal } = getSignals(normalizedRepo);
            const backendScore = getBackendScore(normalizedRepo, backendSignal, dataSignal);
            return {
                ...normalizedRepo,
                backendScore,
                focus: getFocus(normalizedRepo.language, backendSignal, dataSignal),
                backendSignal,
                dataSignal
            };
        })
        .sort((a, b) => {
            if (b.backendScore !== a.backendScore) {
                return b.backendScore - a.backendScore;
            }
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        })
        .slice(0, limit);
}
