'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section id="contact">
            <div className="section-label">04 — Contact</div>
            <div className="contact-grid">
                <div className="contact-inner">
                    <h2 className="section-title reveal">LET&apos;S<br />TALK</h2>
                    <p className="contact-tagline reveal">
                        Open to backend roles, data projects, Web3 collaborations, and fast-paced environments where good problems get solved.
                    </p>
                    <div className="contact-links reveal">
                        <a href="mailto:oolayinkadaniel@gmail.com" className="contact-row">
                            <div className="contact-row-left">
                                <span className="contact-icon">@</span>
                                <div>
                                    <div className="contact-label">Email</div>
                                    <div className="contact-value">oolayinkadaniel@gmail.com</div>
                                </div>
                            </div>
                            <span className="contact-arrow">→</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/oolayinkadaniel/"
                            target="_blank"
                            rel="noopener"
                            className="contact-row"
                        >
                            <div className="contact-row-left">
                                <span className="contact-icon">in</span>
                                <div>
                                    <div className="contact-label">LinkedIn</div>
                                    <div className="contact-value">oolayinkadaniel</div>
                                </div>
                            </div>
                            <span className="contact-arrow">→</span>
                        </a>
                    </div>
                </div>

                <div className="contact-form-wrapper reveal" style={{ transitionDelay: '0.2s' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === 'loading'}
                            style={{ alignSelf: 'flex-start' }}
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                        {status === 'success' && <p style={{ color: 'var(--green)', fontSize: '14px' }}>Message sent successfully!</p>}
                        {status === 'error' && <p style={{ color: '#ff4d4d', fontSize: '14px' }}>Failed to send message. Please try again.</p>}
                    </form>
                </div>
            </div>
        </section>
    );
}
