const certifications = [
    {
        name: 'Hashgraph Developer Attendance',
        issuer: 'The Hashgraph Association',
        url: 'https://certs.hashgraphdev.com/050bc06d-e061-4311-a953-35ea0ee33a3a.pdf'
    },
    {
        name: 'Jobberman Soft Skills Training',
        issuer: 'Jobberman',
        url: 'https://jobbermansoftskills.thinkific.com/certificates/6nvlohsit8'
    },
    {
        name: 'Become a Product Manager',
        issuer: 'Udemy',
        url: 'https://www.udemy.com/certificate/UC-aa23fbe3-10d0-49e7-861d-5e794841b787/'
    },
    {
        name: 'Data Science Bootcamp 2025',
        issuer: 'Udemy',
        url: 'https://www.udemy.com/certificate/UC-10683837-3530-4f44-b73a-d4365d76357c/'
    },
    {
        name: 'Become a Project Manager',
        issuer: 'LinkedIn Learning',
        url: 'https://www.linkedin.com/learning/certificates/fbe471c64c93c9473d93ffe6009271ab274fc9c3b1d502b7c0048a173be12f91?trk=backfilled_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BxaevhPSNRsSNdsoCVohROA%3D%3D'
    }
];

export default function Credentials() {
    return (
        <section id="credentials">
            <div className="section-label reveal">04 // Resume and Certifications</div>
            <div className="credentials-layout">
                <div className="credentials-copy reveal">
                    <h2 className="section-title">PROOF OF<br />WORK</h2>
                    <p>
                        Resume and certification references for backend engineering, product execution,
                        and technical upskilling.
                    </p>
                    <a
                        href="https://www.linkedin.com/in/oolayinkadaniel/details/certifications/"
                        target="_blank"
                        rel="noopener"
                        className="btn btn-primary"
                    >
                        View Full Certifications
                    </a>
                </div>

                <div className="credentials-list reveal" style={{ transitionDelay: '0.08s' }}>
                    {certifications.map((cert) => (
                        <article key={cert.name} className="credential-item">
                            <div className="credential-heading">
                                <h3>{cert.name}</h3>
                                <span>{cert.issuer}</span>
                            </div>
                            {cert.url ? (
                                <a href={cert.url} target="_blank" rel="noopener" className="credential-link">
                                    Open Credential
                                </a>
                            ) : null}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
