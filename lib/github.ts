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

    // Sort by stars first, then by update date
    return allRepos
        .filter(repo => !repo.fork)
        .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        })
        .slice(0, 6); // Take top 6
}
