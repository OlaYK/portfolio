'use client';

import { CSSProperties, useMemo, useState } from 'react';

type FocusTone = 'backend' | 'data' | 'backend-data' | 'fullstack' | 'general';

type ProjectCard = {
    name: string;
    desc: string;
    tags: string[];
    link: string;
    focusLabel: string;
    focusTone: FocusTone;
};

interface ProjectsRailProps {
    projects: ProjectCard[];
}

export default function ProjectsRail({ projects }: ProjectsRailProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const maxIndex = Math.max(projects.length - 1, 0);
    const safeActiveIndex = Math.min(activeIndex, maxIndex);

    const trackStyle = useMemo<CSSProperties>(() => {
        return {
            transform: `translate3d(calc(-1 * ${safeActiveIndex} * (var(--project-card-width) + var(--project-card-gap))), 0, 0)`
        };
    }, [safeActiveIndex]);

    function move(direction: 1 | -1) {
        setActiveIndex((current) => {
            const next = current + direction;
            if (next < 0) {
                return 0;
            }
            if (next > maxIndex) {
                return maxIndex;
            }
            return next;
        });
    }

    return (
        <div className="projects-rail">
            <button
                type="button"
                className="projects-side-btn left"
                onClick={() => move(-1)}
                aria-label="Show previous projects"
                disabled={safeActiveIndex === 0}
            >
                &larr;
            </button>

            <div className="projects-viewport">
                <div className="projects-grid" style={trackStyle}>
                    {projects.map((project, index) => (
                        <div
                            key={project.link}
                            className={`project-card ${index === safeActiveIndex ? 'active' : ''}`}
                        >
                            <div className="project-num">{(index + 1).toString().padStart(3, '0')}</div>
                            <div className={`project-focus ${project.focusTone}`}>{project.focusLabel}</div>
                            <div className="project-name">{project.name}</div>
                            <p className="project-desc">{project.desc}</p>
                            <div className="project-tags">
                                {project.tags.map((tag) => (
                                    <span key={`${project.link}-${tag}`} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a href={project.link} target="_blank" rel="noopener" className="project-link">
                                View on GitHub
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className="projects-side-btn right"
                onClick={() => move(1)}
                aria-label="Show next projects"
                disabled={safeActiveIndex === maxIndex}
            >
                &rarr;
            </button>

            <div className="projects-position" aria-live="polite">
                {safeActiveIndex + 1} / {projects.length}
            </div>
        </div>
    );
}
