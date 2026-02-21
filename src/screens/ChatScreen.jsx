import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mic, Send, Volume2 } from 'lucide-react';
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
            <motion.button
                whileHover={{ scale: 1.1, color: 'var(--gold)' }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.9rem', padding: '0.4rem',
                    color: 'var(--gold-dim)', opacity: 0.8, marginTop: '0.25rem',
                    borderRadius: '0.5rem', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
            >
                <Volume2 size={16} />
            </motion.button>
            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{
                            position: 'absolute', bottom: '130%', left: '50%',
                            transform: 'translateX(-50%)', background: 'var(--bg-card)',
                            border: '1px solid var(--gold)', borderRadius: '0.4rem',
                            padding: '0.25rem 0.6rem', fontSize: '0.65rem', whiteSpace: 'nowrap',
                            color: 'var(--gold)', zIndex: 10,
                        }}
                    >
                        Voice coming soon
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ChatScreen({ language, setLanguage }) {
    const isUrdu = language === 'ur';

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const greeting = isUrdu ? AMMI_GREETING.ur : AMMI_GREETING.en;
        setTimeout(() => {
            setMessages([{ role: 'ammi', content: greeting, id: Date.now() }]);
        }, 600);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        setInput('');
        const userMsg = { role: 'user', content: text, id: Date.now() };
        setMessages(prev => [...prev, userMsg]);

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

            {/* ── SIDEBAR ── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            overflow: 'hidden',
                            background: 'rgba(15, 9, 5, 0.98)',
                            borderRight: '1px solid var(--glass-border)',
                            flexShrink: 0,
                            zIndex: 100,
                        }}
                    >
                        <div style={{ padding: '1.5rem', width: '280px' }}>
                            <h3 className="heading gold-text" style={{ fontSize: '0.8rem', marginBottom: '1.5rem', letterSpacing: '0.15em', fontWeight: 700 }}>
                                MEMORY VAULT
                            </h3>
                            {MEMORY_CHAPTERS.map(ch => (
                                <motion.div
                                    key={ch.id}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                                    style={{
                                        padding: '0.75rem 1rem', borderRadius: '0.75rem', marginBottom: '0.5rem',
                                        background: 'rgba(212,175,55,0.03)', border: '1px solid transparent',
                                        cursor: ch.locked ? 'default' : 'pointer', transition: 'all 0.2s',
                                        opacity: ch.locked ? 0.5 : 1,
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    }}
                                >
                                    <div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>
                                            {ch.id}. {ch.romanTitle}
                                        </p>
                                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{ch.englishSubtitle}</p>
                                    </div>
                                    {ch.locked && <X size={12} color="var(--text-dim)" />}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MAIN CHAT ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

                {/* Chat Header */}
                <header className="glass" style={{
                    padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0, zIndex: 10,
                }}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSidebarOpen(p => !p)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gold-dim)', padding: '0.4rem' }}
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>

                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'radial-gradient(circle at 40% 35%, #3d2a10, #1a1008)',
                        border: '1.5px solid var(--gold)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0,
                    }}>👵🏽</div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className={`heading ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                                {isUrdu ? 'امّی' : AMMI_PROFILE.name}
                            </span>
                            <div className="online-dot" />
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                            {isUrdu ? 'آن لائن · لاہور' : 'ONLINE · LAHORE, 1952'}
                        </p>
                    </div>

                    <LanguageToggle language={language} setLanguage={setLanguage} />
                </header>

                {/* Messages List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                    gap: '0.75rem', alignItems: 'flex-end',
                                }}
                            >
                                {msg.role === 'ammi' && (
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                                        background: '#2a1a08', border: '1px solid var(--gold)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
                                        marginBottom: '4px'
                                    }}>👵🏽</div>
                                )}
                                <div style={{ maxWidth: '82%' }}>
                                    <div className={msg.role === 'ammi' ? 'bubble-ammi' : 'bubble-user'}>
                                        <p className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '1.05rem' : '0.95rem', lineHeight: isUrdu ? 2.4 : 1.6 }}>
                                            {msg.content}
                                        </p>
                                    </div>
                                    {msg.role === 'ammi' && <SpeakerButton text={msg.content} />}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}
                        >
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2a1a08', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>👵🏽</div>
                            <div className="bubble-ammi" style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '0.8rem 1.2rem' }}>
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                        style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input Bar */}
                <footer className="glass" style={{
                    padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexShrink: 0,
                    borderTop: '1px solid var(--glass-border)'
                }}>
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(212,175,55,0.15)' }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            background: 'rgba(212,175,55,0.08)', border: '1px solid var(--glass-border)',
                            borderRadius: '50%', width: '44px', height: '44px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--gold)', flexShrink: 0
                        }}
                    >
                        <Mic size={20} />
                    </motion.button>

                    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={isUrdu ? 'امّی کو کچھ بتائیں...' : 'Say something to Ammi...'}
                            rows={1}
                            style={{
                                width: '100%', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)', borderRadius: '2rem',
                                padding: '0.75rem 1.25rem', color: 'var(--text-soft)',
                                fontFamily: isUrdu ? 'var(--font-urdu)' : 'var(--font-body)',
                                fontSize: isUrdu ? '1.05rem' : '0.95rem', direction: isUrdu ? 'rtl' : 'ltr',
                                resize: 'none', outline: 'none', lineHeight: 1.5,
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                            onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                        />
                    </div>

                    <motion.button
                        whileHover={input.trim() && !loading ? { scale: 1.1 } : {}}
                        whileTap={input.trim() && !loading ? { scale: 0.9 } : {}}
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                        style={{
                            background: input.trim() && !loading ? 'var(--gold)' : 'rgba(212,175,55,0.15)',
                            border: 'none', borderRadius: '50%', width: '44px', height: '44px',
                            cursor: input.trim() && !loading ? 'pointer' : 'default',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: input.trim() && !loading ? '#1a1008' : 'var(--text-dim)',
                            transition: 'all 0.3s ease', flexShrink: 0
                        }}
                    >
                        <Send size={20} fill={input.trim() && !loading ? 'currentColor' : 'none'} />
                    </motion.button>
                </footer>
            </div>
        </div>
    );
}
