import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BookOpen, Lock, ChevronRight, Sparkles } from 'lucide-react';
import { MEMORY_CHAPTERS } from '../config/ammi-data';
import { useState } from 'react';

function MemoryCard({ chapter, index, language }) {
    const [expanded, setExpanded] = useState(false);
    const isUrdu = language === 'ur';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card-premium"
            style={{
                padding: '1.5rem',
                marginBottom: '1.5rem',
                borderLeft: '4px solid var(--gold)',
            }}
            whileHover={{ y: -4, borderColor: 'var(--gold-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', delay: index * 0.1 + 0.3 }}
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2.5rem',
                            color: 'rgba(212, 175, 55, 0.15)',
                            lineHeight: 1,
                            fontStyle: 'italic',
                            fontWeight: 700
                        }}
                    >
                        {String(chapter.id).padStart(2, '0')}
                    </motion.span>
                    <div>
                        <h3 className={isUrdu ? 'urdu' : ''} style={{
                            fontSize: isUrdu ? '1.2rem' : '1.1rem', color: 'var(--gold-light)',
                            fontFamily: isUrdu ? 'var(--font-urdu)' : 'var(--font-heading)', fontWeight: 600,
                        }}>
                            {isUrdu ? chapter.urduTitle : chapter.romanTitle}
                        </h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
                            {chapter.englishSubtitle}
                        </p>
                    </div>
                </div>

                {chapter.locked && (
                    <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        style={{ color: 'var(--text-dim)' }}
                    >
                        <Lock size={18} />
                    </motion.div>
                )}
            </div>

            {chapter.locked ? (
                <div style={{
                    background: 'rgba(212, 175, 55, 0.03)', border: '1px dashed var(--glass-border)',
                    borderRadius: '1rem', padding: '1.25rem', textAlign: 'center',
                }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6 }}>
                        {isUrdu ? 'مکمل انٹرویو کے بعد شامل کیا گیا' : 'This section is locked until the full interview is processed.'}
                    </p>
                </div>
            ) : (
                <>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        {expanded ? chapter.story : chapter.story.substring(0, 120) + (chapter.story.length > 120 ? '...' : '')}
                    </p>

                    <motion.blockquote
                        initial={{ opacity: 0, borderLeftWidth: 0 }}
                        whileInView={{ opacity: 1, borderLeftWidth: 2 }}
                        style={{
                            direction: isUrdu ? 'rtl' : 'ltr',
                            borderLeft: '2px solid var(--gold)',
                            paddingLeft: '1.25rem',
                            margin: '1.25rem 0',
                            fontStyle: 'italic',
                            color: 'var(--gold-light)'
                        }}
                    >
                        <p className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '1rem' : '1.05rem', lineHeight: 1.6 }}>
                            "{isUrdu ? chapter.quoteUrdu : chapter.quote}"
                        </p>
                    </motion.blockquote>

                    {chapter.story.length > 120 && (
                        <motion.button
                            whileHover={{ x: 5, color: 'var(--gold-light)' }}
                            onClick={() => setExpanded(p => !p)}
                            style={{
                                background: 'none', border: 'none', color: 'var(--gold)',
                                cursor: 'pointer', fontSize: '0.8rem', padding: '0.5rem 0',
                                fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px',
                                textTransform: 'uppercase', letterSpacing: '0.1em'
                            }}
                        >
                            {expanded ? (isUrdu ? 'کم دکھائیں' : 'Read less') : (isUrdu ? 'مزید پڑھیں' : 'Read more')}
                            <ChevronRight size={14} style={{ transform: expanded ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </motion.button>
                    )}
                </>
            )}
        </motion.div>
    );
}

export default function MemoryVault({ language }) {
    const isUrdu = language === 'ur';
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="page-content" ref={containerRef}>
            {/* Header */}
            <header className="glass" style={{
                padding: '1.5rem 1.25rem', position: 'sticky', top: 0, zIndex: 50,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <BookOpen size={24} className="gold-text" />
                    <h2 className={`heading ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '1.6rem', color: 'var(--gold-light)' }}>
                        {isUrdu ? 'یادوں کا خزانہ' : 'Memory Vault'}
                    </h2>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontWeight: 500 }}>
                    {isUrdu ? 'امّی کی زندگی کے باب' : 'Ammi\'s life legacy, chapter by chapter'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem' }}>
                    <div style={{ width: '30px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.15em', fontWeight: 700 }}>
                        {MEMORY_CHAPTERS.length} CHAPTERS <Sparkles size={10} style={{ display: 'inline', marginLeft: '2px' }} />
                    </span>
                </div>
            </header>

            {/* Chapter cards — timeline */}
            <div style={{ padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {/* Vertical timeline line */}
                <motion.div
                    style={{
                        position: 'absolute', left: '2.5rem', top: '1.5rem', bottom: '1.5rem',
                        width: '2px', background: 'var(--gold)',
                        opacity: 0.2, pointerEvents: 'none',
                        originY: 0,
                        scaleY
                    }}
                />

                {MEMORY_CHAPTERS.map((ch, i) => (
                    <MemoryCard key={ch.id} chapter={ch} index={i} language={language} />
                ))}
            </div>
        </div>
    );
}
