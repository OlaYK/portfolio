const experienceItems = [
    {
        period: 'May 2024 - Mar 2025',
        role: 'Project Manager / Technical Lead',
        theme: 'Synthetic Labs, Texas, USA',
        details: [
            'Led technical delivery of Genesis Biolabs, scoping backend systems, coordinating API integrations, and reviewing code contributions from freelance engineers.',
            'Managed development timelines and technical milestones, delivering all major releases on schedule.'
        ]
    },
    {
        period: 'Aug 2022 - Jan 2024',
        role: 'Product Engineer',
        theme: 'Pallete Labs, Ibadan, Nigeria',
        details: [
            'Co-developed smart contract-based NFT and DAO products on Ethereum-compatible chains, covering minting pipelines, wallet integrations, and governance features.',
            'Contributed to backend performance improvements, supporting a 10% reduction in churn through data-backed engineering decisions.'
        ]
    },
    {
        period: 'Apr 2022 - Dec 2022',
        role: 'Backend Engineer (Product Role)',
        theme: 'FlashPay Finance, Ibadan, Nigeria',
        details: [
            'Helped build and ship a production blockchain payment gateway on Algorand, achieving a 95% on-time delivery rate across milestones.',
            'Contributed to API design, payment processing flows, and integration planning for 5 major product features in 6 months.'
        ]
    }
];

export default function Experience() {
    return (
        <section id="experience">
            <div className="section-label reveal">03 // Experience</div>
            <div className="experience-layout">
                <div className="experience-heading reveal">
                    <h2 className="section-title">BACKEND<br />EXPERIENCE</h2>
                    <p>
                        Selected roles focused on backend delivery, API systems, and product execution
                        across Web3 and fintech environments.
                    </p>
                </div>

                <div className="experience-timeline">
                    {experienceItems.map((item, index) => (
                        <article
                            key={item.role}
                            className="experience-item reveal"
                            style={{ transitionDelay: `${index * 0.08}s` }}
                        >
                            <div className="experience-period">{item.period}</div>
                            <div className="experience-card">
                                <span>{item.theme}</span>
                                <h3>{item.role}</h3>
                                <ul>
                                    {item.details.map((detail) => (
                                        <li key={detail}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
