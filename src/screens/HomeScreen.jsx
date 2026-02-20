import { AMMI_PROFILE, QUOTE_CARDS } from '../config/ammi-data';

function LanguageToggle({ language, setLanguage }) {
    return (
        <div className="lang-toggle">
            <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
            <button className={`lang-btn ${language === 'ur' ? 'active' : ''}`} onClick={() => setLanguage('ur')}>اردو</button>
        </div>
    );
}

// Placeholder Avatar — glowing initials when no photo available
// REAL_PHOTO: Replace this component with <img src={photoUrl} />
function AvatarCircle() {
    return (
        <div
            className="avatar-glow"
            style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: '3px solid var(--gold)',
                background: 'radial-gradient(circle at 40% 35%, #3d2a10, #1a1008)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4.5rem',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
            }}
        >
            {/* REAL_PHOTO: Replace inner content with actual image */}
            <span style={{ filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.5))' }}>👵🏽</span>
            {/* Subtle inner glow ring */}
            <div style={{
                position: 'absolute', inset: '6px', borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.2)', pointerEvents: 'none',
            }} />
        </div>
    );
}

export default function HomeScreen({ language, setLanguage, onTalk }) {
    const isUrdu = language === 'ur';

    return (
        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* ── TOP NAV ── */}
            <nav style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.2rem 1.25rem', position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(26,16,8,0.85)', backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}>
                <h1 className="heading gold-shimmer" style={{ fontSize: '1.4rem', letterSpacing: '0.02em' }}>
                    Forever ✦
                </h1>
                <LanguageToggle language={language} setLanguage={setLanguage} />
            </nav>

            {/* ── HERO ── */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '2rem 1.5rem 1rem', gap: '1.25rem', textAlign: 'center',
            }}>

                {/* Avatar */}
                <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <AvatarCircle />
                </div>

                {/* Name + details */}
                <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className={`heading ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '2.6rem', marginBottom: '0.3rem' }}>
                        {isUrdu ? 'امّی' : AMMI_PROFILE.name}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                        {isUrdu ? 'لاہور، ١٩٥٢' : `Born: ${AMMI_PROFILE.birthCity}, ${AMMI_PROFILE.birthYear}`}
                    </p>
                    <p className={isUrdu ? 'urdu' : 'heading'} style={{
                        color: 'var(--gold)', fontStyle: isUrdu ? 'normal' : 'italic',
                        marginTop: '0.6rem', fontSize: '1rem',
                    }}>
                        {isUrdu ? AMMI_PROFILE.taglineUrdu : AMMI_PROFILE.tagline}
                    </p>
                </div>

                {/* Quote Cards — horizontal scroll */}
                <div
                    className="fade-in-up"
                    style={{
                        animationDelay: '0.35s', width: '100%', overflowX: 'auto',
                        display: 'flex', gap: '0.85rem', paddingBottom: '0.5rem',
                        scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {QUOTE_CARDS.map((card, i) => (
                        <div
                            key={card.id}
                            className="card"
                            style={{
                                minWidth: '220px', padding: '1rem 1.15rem',
                                borderLeft: '2px solid var(--gold)',
                                flexShrink: 0, textAlign: 'left',
                                animationDelay: `${0.35 + i * 0.1}s`,
                            }}
                        >
                            <p className={`heading ${isUrdu ? 'urdu' : ''}`} style={{
                                fontSize: isUrdu ? '0.9rem' : '0.85rem', fontStyle: isUrdu ? 'normal' : 'italic',
                                color: 'var(--text-soft)', lineHeight: '1.6', marginBottom: '0.5rem',
                            }}>
                                "{isUrdu ? card.textUrdu : card.text}"
                            </p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>— {card.attr}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="fade-in-up" style={{ animationDelay: '0.5s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <button className="btn-gold" onClick={onTalk} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                        {isUrdu ? 'امّی سے بات کریں ✦' : 'Talk to Ammi ✦'}
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                        {isUrdu ? 'آپ کی یادیں آپ کے خاندان کی ہیں۔ ہمیشہ کے لیے۔' : 'Your memories belong to your family. Forever.'}
                    </p>
                </div>
            </div>

            {/* ── CONSENT BAR ── */}
            <div style={{
                padding: '0.85rem 1.25rem',
                background: 'rgba(201,168,76,0.04)',
                borderTop: '1px solid rgba(201,168,76,0.08)',
                textAlign: 'center', marginBottom: '4.5rem',
            }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                    {isUrdu
                        ? 'آگے بڑھ کر آپ تصدیق کرتے ہیں کہ یہ میموری پروفائل مکمل رضامندی سے بنائی گئی ہے۔ '
                        : 'By continuing, you confirm this memory profile was created with full consent. '}
                    <a href="#" style={{ color: 'var(--gold-dim)', textDecoration: 'underline' }}>
                        {isUrdu ? 'مزید جانیں' : 'Learn more.'}
                    </a>
                </p>
            </div>
        </div>
    );
}
