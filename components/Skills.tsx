'use client';

const skillGroups = [
    {
        label: 'Languages',
        skills: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Solidity']
    },
    {
        label: 'Backend Frameworks',
        skills: ['FastAPI', 'Django', 'Express', 'Node HTTP', 'REST APIs', 'WebSockets', 'Auth']
    },
    {
        label: 'APIs and Integrations',
        skills: [
            'OpenAI API',
            'Gemini',
            'Groq',
            'Anthropic',
            'Google Auth',
            'Cloudinary',
            'Resend',
            'Stripe',
            'Paystack'
        ]
    },
    {
        label: 'Data and Geospatial',
        skills: [
            'Pandas',
            'NumPy',
            'Scikit-Learn',
            'Jupyter',
            'Rasterio',
            'STAC',
            'Element84',
            'TiTiler',
            'MapLibre'
        ]
    },
    {
        label: 'Storage and Infrastructure',
        skills: ['PostgreSQL', 'Supabase', 'Neon DB', 'SQLAlchemy', 'Alembic', 'Docker', 'Render', 'Vercel']
    },
    {
        label: 'Web3 and Domain APIs',
        skills: [
            'Web3.py',
            'Hedera SDK',
            'Polymarket CLOB',
            'CelesTrak',
            'Open-Meteo',
            'OpenStreetMap',
            'Nominatim',
            'Photon'
        ]
    },
    {
        label: 'Frontend and Product',
        skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'React Query', 'Recharts', 'Zod', 'Specs', 'Roadmaps']
    }
];

const marqueeSkills = [
    'Python',
    'FastAPI',
    'PostgreSQL',
    'OpenAI API',
    'Cloudinary',
    'Supabase',
    'Hedera SDK',
    'MapLibre',
    'Element84',
    'Resend',
    'Stripe',
    'Paystack',
    'Web3',
    'CelesTrak',
    'Product Strategy'
];

export default function Skills() {
    return (
        <section id="skills">
            <div className="section-label reveal">06 // Skills</div>
            <div className="skills-layout">
                <div className="reveal">
                    <h2 className="section-title">TECH<br />STACK</h2>
                    <p className="skills-intro">
                        A pragmatic toolkit pulled from recent project work: backend APIs, AI providers,
                        payments, geospatial data, Web3 verification, and product delivery.
                    </p>
                    <div className="skill-marquee" aria-hidden="true">
                        <div className="skill-marquee-track">
                            {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
                                <span key={`${skill}-${index}`}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="skills-groups reveal" style={{ transitionDelay: '0.15s' }}>
                    {skillGroups.map((group) => (
                        <div className="skill-panel" key={group.label}>
                            <div className="skill-group-label">{group.label}</div>
                            <div className="skill-list">
                                {group.skills.map((skill, index) => (
                                    <span
                                        key={skill}
                                        className={`skill-pill ${index < 2 ? 'featured' : ''}`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
