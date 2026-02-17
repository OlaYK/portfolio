export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    topics: string[];
    fork: boolean;
    updated_at: string;
}

export async function getPinnedRepos(username: string): Promise<Repo[]> {
    const headers: HeadersInit = {};
    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers,
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
        if (response.status === 403) {
            console.warn('GitHub API rate limit exceeded. Using fallback projects.');
            return [];
        }
        throw new Error('Failed to fetch repos');
    }

    const allRepos: Repo[] = await response.json();

    // Filter for quality:
    // 1. Not a fork
    // 2. Not a "meta" repo (like .github or the username repo)
    // 3. Must have a description (to avoid low-quality cards)
    return allRepos
        .filter(repo => {
            const isMeta = repo.name.startsWith('.') || repo.name.toLowerCase() === username.toLowerCase();
            return !repo.fork && !isMeta && repo.description;
        })
        .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        })
        .slice(0, 12); // Fetch a few extra for processing in Projects.tsx
}
