import { useState } from 'react';

export default function SettingsScreen({ language, setLanguage }) {
    const isUrdu = language === 'ur';
    const [notifications, setNotifications] = useState(true);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const Row = ({ label, labelUr, children, onClick }) => (
        <div
            onClick={onClick}
            style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 1.25rem', borderBottom: '1px solid rgba(201,168,76,0.08)',
                cursor: onClick ? 'pointer' : 'default', transition: 'background 0.2s',
                background: 'transparent',
            }}
            onMouseEnter={e => { if (onClick) e.currentTarget.style.background = 'rgba(201,168,76,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
            <span className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '0.95rem' : '0.9rem', color: 'var(--text-soft)' }}>
                {isUrdu ? labelUr : label}
            </span>
            {children}
        </div>
    );

    const Toggle = ({ on, onToggle }) => (
        <div
            onClick={onToggle}
            style={{
                width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
                background: on ? 'var(--gold)' : 'rgba(201,168,76,0.2)',
                position: 'relative', transition: 'background 0.3s',
            }}
        >
            <div style={{
                position: 'absolute', top: '3px',
                left: on ? '22px' : '3px', width: '18px', height: '18px',
                borderRadius: '50%', background: on ? '#1a1008' : 'var(--text-dim)',
                transition: 'left 0.3s',
            }} />
        </div>
    );

    return (
        <div className="page-content">
            {/* Header */}
            <div style={{
                padding: '1.5rem 1.25rem 1rem',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}>
                <h2 className={`heading ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '1.4rem', color: 'var(--gold)' }}>
                    {isUrdu ? '⚙️ ترتیبات' : '⚙️ Settings'}
                </h2>
            </div>

            {/* Settings Sections */}
            <div style={{ marginTop: '1rem' }}>

                {/* Language */}
                <div style={{ margin: '0 1.25rem 1rem', background: 'var(--bg-card)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)' }}>
                    <p style={{ padding: '0.6rem 1.25rem', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.12em', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                        {isUrdu ? 'زبان' : 'LANGUAGE'}
                    </p>
                    <Row label="Language Preference" labelUr="زبان کی ترجیح">
                        <div className="lang-toggle">
                            <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
                            <button className={`lang-btn ${language === 'ur' ? 'active' : ''}`} onClick={() => setLanguage('ur')}>اردو</button>
                        </div>
                    </Row>
                </div>

                {/* Notifications */}
                <div style={{ margin: '0 1.25rem 1rem', background: 'var(--bg-card)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)' }}>
                    <p style={{ padding: '0.6rem 1.25rem', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.12em', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                        {isUrdu ? 'اطلاعات' : 'NOTIFICATIONS'}
                    </p>
                    <Row label="Notifications" labelUr="اطلاعات">
                        <Toggle on={notifications} onToggle={() => setNotifications(p => !p)} />
                    </Row>
                </div>

                {/* About & Privacy */}
                <div style={{ margin: '0 1.25rem 1rem', background: 'var(--bg-card)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)' }}>
                    <p style={{ padding: '0.6rem 1.25rem', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.12em', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                        {isUrdu ? 'معلومات' : 'INFO'}
                    </p>

                    <Row label="About Forever" labelUr="Forever کے بارے میں" onClick={() => setAboutOpen(p => !p)}>
                        <span style={{ color: 'var(--gold-dim)', fontSize: '0.9rem' }}>{aboutOpen ? '▲' : '▼'}</span>
                    </Row>
                    {aboutOpen && (
                        <div style={{ padding: '0.75rem 1.25rem 1rem', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                            <p className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '0.9rem' : '0.82rem', color: 'var(--text-muted)', lineHeight: isUrdu ? 2 : 1.7 }}>
                                {isUrdu
                                    ? 'Forever ایک ڈیجیٹل میموری پریزرویشن ایپ ہے جو خاندانوں کو اپنے بزرگوں کی یادیں ہمیشہ کے لیے محفوظ رکھنے میں مدد کرتی ہے۔'
                                    : 'Forever is a digital memory preservation platform that helps families capture and preserve their loved ones\' voices, stories, and wisdom — forever. Languages: Urdu & English. Arabic & Hindi coming soon.'
                                }
                            </p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                                "Their voice. Their wisdom. Forever."
                            </p>
                        </div>
                    )}

                    <Row label="Data & Privacy" labelUr="ڈیٹا اور پرائیویسی" onClick={() => setPrivacyOpen(p => !p)}>
                        <span style={{ color: 'var(--gold-dim)', fontSize: '0.9rem' }}>{privacyOpen ? '▲' : '▼'}</span>
                    </Row>
                    {privacyOpen && (
                        <div style={{ padding: '0.75rem 1.25rem 1rem' }}>
                            <p className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '0.9rem' : '0.82rem', color: 'var(--text-muted)', lineHeight: isUrdu ? 2 : 1.7 }}>
                                {isUrdu
                                    ? 'آپ کی یادیں آپ کی ہیں۔ ہم آپ کا ڈیٹا کبھی فروخت نہیں کرتے۔ آپ کسی بھی وقت سب کچھ برآمد یا حذف کر سکتے ہیں۔'
                                    : 'Your memories are yours. We never sell your data. You can export or delete everything at any time. All conversations are private to your family profile only.'
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* Version tag */}
                <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-dim)', padding: '0.5rem', fontStyle: 'italic' }}>
                    Forever v1.0 · Prototype — Built with love ✦
                </p>
            </div>
        </div>
    );
}
