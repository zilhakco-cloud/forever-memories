import { useEffect, useRef, useState } from 'react';
import { MEMORY_CHAPTERS } from '../config/ammi-data';

// Intersection observer for fade-in-on-scroll effect
function useScrollReveal(ref) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
        }, { threshold: 0.12 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref]);
    return visible;
}

function MemoryCard({ chapter, index, language }) {
    const ref = useRef(null);
    const visible = useScrollReveal(ref);
    const [expanded, setExpanded] = useState(false);
    const isUrdu = language === 'ur';

    return (
        <div
            ref={ref}
            className={`memory-card ${visible ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 0.07}s` }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span className="chapter-number" style={{ animationDelay: `${index * 0.07 + 0.1}s` }}>
                        {String(chapter.id).padStart(2, '0')}
                    </span>
                    <div>
                        <p className={isUrdu ? 'urdu' : ''} style={{
                            fontSize: isUrdu ? '1.1rem' : '1rem', color: 'var(--gold)',
                            fontFamily: isUrdu ? 'var(--font-urdu)' : 'var(--font-heading)', fontWeight: 600,
                        }}>
                            {isUrdu ? chapter.urduTitle : chapter.romanTitle}
                        </p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem', letterSpacing: '0.05em' }}>
                            {chapter.englishSubtitle}
                        </p>
                    </div>
                </div>

                {chapter.locked && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ fontSize: '0.9rem' }}>🔒</span>
                    </div>
                )}
            </div>

            {chapter.locked ? (
                <div style={{
                    background: 'rgba(201,168,76,0.05)', border: '1px dashed rgba(201,168,76,0.2)',
                    borderRadius: '0.75rem', padding: '1rem', textAlign: 'center',
                }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6 }}>
                        {isUrdu ? 'مکمل انٹرویو کے بعد شامل کیا گیا' : 'Added after full interview is completed'}
                    </p>
                </div>
            ) : (
                <>
                    {/* Story excerpt */}
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {expanded ? chapter.story : chapter.story.substring(0, 110) + (chapter.story.length > 110 ? '...' : '')}
                    </p>

                    {/* Pull quote */}
                    <blockquote className="pull-quote" style={{ direction: isUrdu ? 'rtl' : 'ltr' }}>
                        <p className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '0.9rem' : '1rem' }}>
                            "{isUrdu ? chapter.quoteUrdu : chapter.quote}"
                        </p>
                    </blockquote>

                    {/* Read more */}
                    {chapter.story.length > 110 && (
                        <button
                            onClick={() => setExpanded(p => !p)}
                            style={{
                                background: 'none', border: 'none', color: 'var(--gold)',
                                cursor: 'pointer', fontSize: '0.75rem', padding: '0.25rem 0',
                                fontFamily: 'var(--font-body)', letterSpacing: '0.05em',
                                textDecoration: 'underline', textUnderlineOffset: '3px',
                            }}
                        >
                            {expanded ? (isUrdu ? 'کم دکھائیں' : 'Read less ↑') : (isUrdu ? 'مزید پڑھیں' : 'Read more ↓')}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default function MemoryVault({ language }) {
    const isUrdu = language === 'ur';

    return (
        <div className="page-content">
            {/* Header */}
            <div style={{
                padding: '1.5rem 1.25rem 1rem', position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(26,16,8,0.9)', backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}>
                <h2 className={`heading ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '1.4rem', color: 'var(--gold)' }}>
                    {isUrdu ? '📖 یادوں کا خزانہ' : '📖 Memory Vault'}
                </h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {isUrdu ? 'امّی کی زندگی کے باب' : 'Ammi\'s life, chapter by chapter'}
                </p>

                {/* Timeline connector hint */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <div style={{ width: '24px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                        {MEMORY_CHAPTERS.length} CHAPTERS
                    </span>
                </div>
            </div>

            {/* Chapter cards — scrollable timeline */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                {/* Vertical timeline line */}
                <div style={{
                    position: 'absolute', left: '2.35rem', top: '1.25rem', bottom: '1.25rem',
                    width: '1px', background: 'linear-gradient(to bottom, var(--gold), transparent)',
                    opacity: 0.2, pointerEvents: 'none',
                }} />

                {MEMORY_CHAPTERS.map((ch, i) => (
                    <MemoryCard key={ch.id} chapter={ch} index={i} language={language} />
                ))}
            </div>
        </div>
    );
}
