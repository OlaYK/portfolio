'use client';

import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

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
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [stepSize, setStepSize] = useState(0);
    const [maxOffset, setMaxOffset] = useState(0);

    useEffect(() => {
        function measure() {
            if (!viewportRef.current || !trackRef.current) {
                return;
            }

            const viewportWidth = viewportRef.current.clientWidth;
            const trackWidth = trackRef.current.scrollWidth;
            const firstCard = trackRef.current.querySelector<HTMLElement>('.project-card');
            const computedStyle = window.getComputedStyle(trackRef.current);
            const gap = parseFloat(computedStyle.gap || '0') || 0;
            const cardWidth = firstCard?.offsetWidth || 0;
            const step = cardWidth + gap;
            const nextMaxOffset = Math.max(trackWidth - viewportWidth, 0);

            setStepSize(step);
            setMaxOffset(nextMaxOffset);
            setOffset((current) => Math.min(current, nextMaxOffset));
        }

        measure();

        const resizeObserver = new ResizeObserver(measure);
        if (viewportRef.current) {
            resizeObserver.observe(viewportRef.current);
        }
        if (trackRef.current) {
            resizeObserver.observe(trackRef.current);
            const firstCard = trackRef.current.querySelector<HTMLElement>('.project-card');
            if (firstCard) {
                resizeObserver.observe(firstCard);
            }
        }

        window.addEventListener('resize', measure);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [projects.length]);

    const activeIndex =
        projects.length > 0 && stepSize > 0 ? Math.min(projects.length - 1, Math.round(offset / stepSize)) : 0;

    const trackStyle = useMemo<CSSProperties>(() => {
        return {
            transform: `translate3d(-${offset}px, 0, 0)`
        };
    }, [offset]);

    function move(direction: 1 | -1) {
        if (stepSize <= 0) {
            return;
        }

        setOffset((current) => {
            const next = current + direction * stepSize;
            if (next < 0) {
                return 0;
            }
            if (next > maxOffset) {
                return maxOffset;
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
                disabled={offset <= 0}
            >
                &larr;
            </button>

            <div ref={viewportRef} className="projects-viewport">
                <div ref={trackRef} className="projects-grid" style={trackStyle}>
                    {projects.map((project, index) => (
                        <div
                            key={project.link}
                            className={`project-card ${index === activeIndex ? 'active' : ''}`}
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
                disabled={offset >= maxOffset - 1}
            >
                &rarr;
            </button>

            <div className="projects-position" aria-live="polite">
                {activeIndex + 1} / {projects.length}
            </div>
        </div>
    );
}
