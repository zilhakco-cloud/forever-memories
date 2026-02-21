import { motion } from 'framer-motion';
import { AMMI_PROFILE, QUOTE_CARDS } from '../config/ammi-data';
import { Sparkles } from 'lucide-react';

function LanguageToggle({ language, setLanguage }) {
    return (
        <div className="lang-toggle">
            <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
            <button className={`lang-btn ${language === 'ur' ? 'active' : ''}`} onClick={() => setLanguage('ur')}>اردو</button>
        </div>
    );
}

function AvatarCircle() {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 1, bounce: 0.4 }}
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
                cursor: 'pointer',
            }}
            whileHover={{ scale: 1.05, borderColor: 'var(--gold-light)' }}
            whileTap={{ scale: 0.95 }}
        >
            <span style={{ filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.5))' }}>👵🏽</span>
            <motion.div
                style={{
                    position: 'absolute', inset: '6px', borderRadius: '50%',
                    border: '1px solid rgba(212,175,55,0.2)', pointerEvents: 'none',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    );
}

const containerVars = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
};

export default function HomeScreen({ language, setLanguage, onTalk }) {
    const isUrdu = language === 'ur';

    return (
        <motion.div
            className="page-content"
            initial="hidden"
            animate="visible"
            variants={containerVars}
        >
            {/* ── TOP NAV ── */}
            <nav className="glass" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.25rem', position: 'sticky', top: 0, zIndex: 50,
            }}>
                <h1 className="heading gold-shimmer" style={{ fontSize: '1.4rem', letterSpacing: '0.05em' }}>
                    Forever <Sparkles size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '2px' }} />
                </h1>
                <LanguageToggle language={language} setLanguage={setLanguage} />
            </nav>

            {/* ── HERO ── */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '2rem 1.5rem 1rem', gap: '1.5rem', textAlign: 'center',
            }}>

                <motion.div variants={itemVars}>
                    <AvatarCircle />
                </motion.div>

                <motion.div variants={itemVars}>
                    <h2 className={`heading ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '2.8rem', marginBottom: '0.2rem', lineHeight: 1.1 }}>
                        {isUrdu ? 'امّی' : AMMI_PROFILE.name}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.1em', fontWeight: 500 }}>
                        {isUrdu ? 'لاہور، ١٩٥٢' : `BORN: ${AMMI_PROFILE.birthCity}, ${AMMI_PROFILE.birthYear}`}
                    </p>
                    <p className={isUrdu ? 'urdu' : 'heading'} style={{
                        color: 'var(--gold)', fontStyle: isUrdu ? 'normal' : 'italic',
                        marginTop: '0.6rem', fontSize: '1.1rem',
                    }}>
                        {isUrdu ? AMMI_PROFILE.taglineUrdu : AMMI_PROFILE.tagline}
                    </p>
                </motion.div>

                {/* Quote Cards — horizontal scroll / drag */}
                <motion.div
                    variants={itemVars}
                    style={{ width: '100%', overflowX: 'hidden', paddingBottom: '0.5rem' }}
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -600 }}
                        style={{
                            display: 'flex', gap: '1rem', cursor: 'grab',
                        }}
                    >
                        {QUOTE_CARDS.map((card) => (
                            <motion.div
                                key={card.id}
                                className="card-premium"
                                style={{
                                    minWidth: '240px', padding: '1.25rem',
                                    borderLeft: '3px solid var(--gold)',
                                    flexShrink: 0, textAlign: 'left',
                                }}
                                whileHover={{ y: -5, borderColor: 'var(--gold-light)' }}
                            >
                                <p className={`heading ${isUrdu ? 'urdu' : ''}`} style={{
                                    fontSize: isUrdu ? '0.95rem' : '0.9rem', fontStyle: isUrdu ? 'normal' : 'italic',
                                    color: 'var(--text-soft)', lineHeight: '1.6', marginBottom: '0.75rem',
                                }}>
                                    "{isUrdu ? card.textUrdu : card.text}"
                                </p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>— {card.attr}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* CTA Button */}
                <motion.div variants={itemVars} style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn-gold" onClick={onTalk}>
                        {isUrdu ? 'امّی سے بات کریں ✦' : 'Talk to Ammi ✦'}
                    </button>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic', maxWidth: '280px', lineHeight: 1.5 }}>
                        {isUrdu ? 'آپ کی یادیں آپ کے خاندان کی ہیں۔ ہمیشہ کے لیے۔' : 'Your memories belong to your family. Forever.'}
                    </p>
                </motion.div>
            </div>

            {/* ── CONSENT BAR ── */}
            <motion.div variants={itemVars} style={{
                padding: '1rem 1.25rem',
                background: 'rgba(212,175,55,0.03)',
                borderTop: '1px solid var(--glass-border)',
                textAlign: 'center', marginBottom: 'var(--nav-height)',
            }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                    {isUrdu
                        ? 'آگے بڑھ کر آپ تصدیق کرتے ہیں کہ یہ میموری پروفائل مکمل رضامندی سے بنائی گئی ہے۔ '
                        : 'By continuing, you confirm this memory profile was created with full consent. '}
                    <a href="#" style={{ color: 'var(--gold-dim)', textDecoration: 'underline', fontWeight: 600 }}>
                        {isUrdu ? 'مزید جانیں' : 'Learn more.'}
                    </a>
                </p>
            </motion.div>
        </motion.div>
    );
}
