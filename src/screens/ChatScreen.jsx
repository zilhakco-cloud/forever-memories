import { useState, useRef, useEffect } from 'react';
import { AMMI_PROFILE, MEMORY_CHAPTERS } from '../config/ammi-data';
import { AMMI_GREETING } from '../config/ammi-persona';
import { sendMessageToAmmi, playAmmiVoice } from '../services/claudeService';

function LanguageToggle({ language, setLanguage }) {
    return (
        <div className="lang-toggle">
            <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
            <button className={`lang-btn ${language === 'ur' ? 'active' : ''}`} onClick={() => setLanguage('ur')}>UR</button>
        </div>
    );
}

function SpeakerButton({ text }) {
    const [tooltip, setTooltip] = useState(false);

    const handleClick = () => {
        playAmmiVoice(text);
        setTooltip(true);
        setTimeout(() => setTooltip(false), 2000);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={handleClick}
                title="Voice coming soon"
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.85rem', padding: '0.2rem 0.4rem',
                    color: 'var(--gold-dim)', opacity: 0.7, marginTop: '0.25rem',
                    borderRadius: '0.25rem', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.target.style.opacity = 0.7; e.target.style.color = 'var(--gold-dim)'; }}
            >
                🔊
            </button>
            {tooltip && (
                <div style={{
                    position: 'absolute', bottom: '130%', left: '50%',
                    transform: 'translateX(-50%)', background: 'var(--bg-card)',
                    border: '1px solid var(--gold)', borderRadius: '0.4rem',
                    padding: '0.25rem 0.6rem', fontSize: '0.65rem', whiteSpace: 'nowrap',
                    color: 'var(--gold)', zIndex: 10,
                    // REAL_VOICE: This tooltip disappears when voice is live
                }}>
                    Voice coming soon
                </div>
            )}
        </div>
    );
}

export default function ChatScreen({ language, setLanguage }) {
    const isUrdu = language === 'ur';

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [history, setHistory] = useState([]); // Claude API conversation history
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Send Ammi's greeting automatically on load
    useEffect(() => {
        const greeting = isUrdu ? AMMI_GREETING.ur : AMMI_GREETING.en;
        setTimeout(() => {
            setMessages([{ role: 'ammi', content: greeting, id: Date.now() }]);
        }, 600);
    }, []); // Only on first load

    // Scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        setInput('');
        const userMsg = { role: 'user', content: text, id: Date.now() };
        setMessages(prev => [...prev, userMsg]);

        // Add to Claude history format
        const updatedHistory = [...history, { role: 'user', content: text }];
        setHistory(updatedHistory);

        setLoading(true);
        try {
            const reply = await sendMessageToAmmi(history, text);
            const ammiMsg = { role: 'ammi', content: reply, id: Date.now() + 1 };
            setMessages(prev => [...prev, ammiMsg]);
            setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (e) {
            console.error('[Forever] Chat error:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', paddingBottom: 'var(--nav-height)' }}>

            {/* ── LEFT SIDEBAR — Memory Vault Chapters ── */}
            <div style={{
                width: sidebarOpen ? '240px' : '0', overflow: 'hidden',
                transition: 'width 0.3s ease', background: 'rgba(20, 12, 4, 0.97)',
                borderRight: '1px solid rgba(201,168,76,0.15)', flexShrink: 0,
                display: 'flex', flexDirection: 'column',
            }}>
                <div style={{ padding: '1rem', minWidth: '240px' }}>
                    <h3 className="heading" style={{ color: 'var(--gold)', fontSize: '0.85rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                        MEMORY VAULT
                    </h3>
                    {MEMORY_CHAPTERS.map(ch => (
                        <div key={ch.id} style={{
                            padding: '0.6rem 0.75rem', borderRadius: '0.5rem', marginBottom: '0.25rem',
                            background: 'rgba(201,168,76,0.04)', border: '1px solid transparent',
                            cursor: ch.locked ? 'default' : 'pointer', transition: 'all 0.2s',
                            opacity: ch.locked ? 0.5 : 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}
                            onMouseEnter={e => { if (!ch.locked) e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; }}
                        >
                            <div>
                                <p style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>
                                    {ch.id}. {ch.romanTitle}
                                </p>
                                <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{ch.englishSubtitle}</p>
                            </div>
                            {ch.locked && <span style={{ fontSize: '0.7rem' }}>🔒</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── MAIN CHAT ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                {/* Chat Header */}
                <div style={{
                    padding: '0.85rem 1rem', background: 'rgba(26,16,8,0.95)',
                    backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,168,76,0.12)',
                    display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0,
                }}>
                    {/* Sidebar toggle */}
                    <button onClick={() => setSidebarOpen(p => !p)} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: '1rem', color: 'var(--gold-dim)', padding: '0.25rem',
                    }}>
                        {sidebarOpen ? '✕' : '☰'}
                    </button>

                    {/* Avatar small */}
                    <div style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        background: 'radial-gradient(circle at 40% 35%, #3d2a10, #1a1008)',
                        border: '1.5px solid var(--gold)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0,
                    }}>👵🏽</div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span className={`heading ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '1rem', fontWeight: 600 }}>
                                {isUrdu ? 'امّی' : AMMI_PROFILE.name}
                            </span>
                            <div className="online-dot" />
                        </div>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                            {isUrdu ? 'آن لائن · لاہور' : 'Online · Lahore, 1952'}
                        </p>
                    </div>

                    <LanguageToggle language={language} setLanguage={setLanguage} />
                </div>

                {/* Messages List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                display: 'flex',
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                gap: '0.5rem', alignItems: 'flex-end',
                            }}
                        >
                            {msg.role === 'ammi' && (
                                <div style={{
                                    width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                                    background: '#2a1a08', border: '1px solid var(--gold)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
                                }}>👵🏽</div>
                            )}
                            <div style={{ maxWidth: '78%' }}>
                                <div className={msg.role === 'ammi' ? 'bubble-ammi' : 'bubble-user'}>
                                    <p className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '1rem' : '0.95rem', lineHeight: isUrdu ? 2.2 : 1.65 }}>
                                        {msg.content}
                                    </p>
                                </div>
                                {msg.role === 'ammi' && <SpeakerButton text={msg.content} />}
                            </div>
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {loading && (
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#2a1a08', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>👵🏽</div>
                            <div className="bubble-ammi" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0.75rem 1rem' }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} style={{
                                        width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)',
                                        animation: 'breathe 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s`,
                                    }} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input Bar */}
                <div style={{
                    padding: '0.75rem 1rem', background: 'rgba(26,16,8,0.95)',
                    backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(201,168,76,0.12)',
                    display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexShrink: 0,
                }}>
                    {/* Mic placeholder */}
                    <button
                        title="Voice input coming soon"
                        style={{
                            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                            borderRadius: '50%', width: '40px', height: '40px',
                            cursor: 'pointer', fontSize: '1rem', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--gold-dim)',
                        }}
                        onClick={() => console.log('[Forever] 🎙️ Voice input — coming soon')}
                    >
                        🎙️
                    </button>

                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isUrdu ? 'امّی کو کچھ بتائیں...' : 'Say something to Ammi...'}
                        rows={1}
                        style={{
                            flex: 1, background: 'rgba(201,168,76,0.06)',
                            border: '1px solid rgba(201,168,76,0.2)', borderRadius: '1.5rem',
                            padding: '0.6rem 1rem', color: 'var(--text-soft)',
                            fontFamily: isUrdu ? 'var(--font-urdu)' : 'var(--font-body)',
                            fontSize: isUrdu ? '1rem' : '0.9rem', direction: isUrdu ? 'rtl' : 'ltr',
                            resize: 'none', outline: 'none', lineHeight: 1.6,
                        }}
                    />

                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                        style={{
                            background: input.trim() && !loading ? 'var(--gold)' : 'rgba(201,168,76,0.2)',
                            border: 'none', borderRadius: '50%', width: '40px', height: '40px',
                            cursor: input.trim() && !loading ? 'pointer' : 'default',
                            fontSize: '1rem', flexShrink: 0, transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
}
