const services = [
    {
        number: '01',
        title: 'Backend API Layers',
        description:
            'Designing reliable API layers with clean domain boundaries, auth, persistence, background work, integrations, and deployment-ready structure.',
        tags: ['FastAPI', 'Express', 'REST', 'WebSockets', 'Auth', 'PostgreSQL']
    },
    {
        number: '02',
        title: 'Data and Geo Workflows',
        description:
            'Turning messy datasets and satellite scenes into decisions through notebooks, model experiments, maps, dashboards, and repeatable pipelines.',
        tags: ['Pandas', 'Scikit-Learn', 'Rasterio', 'STAC', 'MapLibre', 'TiTiler']
    },
    {
        number: '03',
        title: 'Integration Systems',
        description:
            'Building workers, scripts, and provider integrations that reduce manual effort, monitor activity, and keep business processes moving.',
        tags: ['OpenAI', 'Cloudinary', 'Resend', 'Stripe', 'Paystack', 'Workers']
    },
    {
        number: '04',
        title: 'Technical Product',
        description:
            'Bridging engineering and business goals with clear requirements, tradeoff analysis, delivery planning, and stakeholder-ready documentation.',
        tags: ['Roadmaps', 'Specs', 'QA', 'Delivery']
    }
];

export default function Services() {
    return (
        <section id="services">
            <div className="section-label reveal">02 // What I Solve</div>
            <div className="services-layout">
                <div className="services-copy">
                    <h2 className="section-title reveal">SYSTEMS THAT<br />MOVE WORK</h2>
                    <p className="services-intro reveal">
                        I sit at the intersection of backend engineering, data analysis, and product execution:
                        useful when a project needs both technical depth and practical judgment.
                    </p>
                </div>

                <div className="services-grid reveal">
                    {services.map((service, index) => (
                        <article
                            key={service.title}
                            className="service-card"
                            style={{ transitionDelay: `${index * 0.08}s` }}
                        >
                            <div className="service-number">{service.number}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-tags">
                                {service.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
