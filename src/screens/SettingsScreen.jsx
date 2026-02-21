import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Bell, Info, Shield, ChevronDown, Sparkles } from 'lucide-react';

export default function SettingsScreen({ language, setLanguage }) {
    const isUrdu = language === 'ur';
    const [notifications, setNotifications] = useState(true);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const Row = ({ label, labelUr, icon: Icon, children, onClick }) => (
        <motion.div
            onClick={onClick}
            whileHover={onClick ? { backgroundColor: 'rgba(212, 175, 55, 0.05)', x: 4 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1.25rem', borderBottom: '1px solid var(--glass-border)',
                cursor: onClick ? 'pointer' : 'default',
                background: 'transparent',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {Icon && <Icon size={18} className="gold-text" />}
                <span className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '1rem' : '0.95rem', color: 'var(--text-soft)', fontWeight: 500 }}>
                    {isUrdu ? labelUr : label}
                </span>
            </div>
            {children}
        </motion.div>
    );

    const Toggle = ({ on, onToggle }) => (
        <motion.div
            onClick={onToggle}
            animate={{ backgroundColor: on ? 'var(--gold)' : 'rgba(212, 175, 55, 0.15)' }}
            style={{
                width: '48px', height: '26px', borderRadius: '13px', cursor: 'pointer',
                position: 'relative', transition: 'background-color 0.3s',
            }}
        >
            <motion.div
                animate={{ left: on ? '24px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                    position: 'absolute', top: '4px',
                    width: '18px', height: '18px',
                    borderRadius: '50%', background: on ? '#1a1008' : 'var(--text-dim)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            />
        </motion.div>
    );

    return (
        <motion.div
            className="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <header className="glass" style={{
                padding: '1.5rem 1.25rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Settings size={24} className="gold-text" />
                    <h2 className={`heading ${isUrdu ? 'urdu' : ''}`} style={{ fontSize: '1.6rem', color: 'var(--gold-light)' }}>
                        {isUrdu ? 'ترتیبات' : 'Settings'}
                    </h2>
                </div>
            </header>

            {/* Settings Sections */}
            <div style={{ padding: '1.5rem 1.25rem' }}>

                {/* Language Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="card-premium"
                    style={{ marginBottom: '1.5rem' }}
                >
                    <p style={{ padding: '0.75rem 1.25rem', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.15em', borderBottom: '1px solid var(--glass-border)', fontWeight: 700 }}>
                        {isUrdu ? 'زبان' : 'LANGUAGE'}
                    </p>
                    <Row label="Language Preference" labelUr="زبان کی ترجیح">
                        <div className="lang-toggle">
                            <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
                            <button className={`lang-btn ${language === 'ur' ? 'active' : ''}`} onClick={() => setLanguage('ur')}>اردو</button>
                        </div>
                    </Row>
                </motion.div>

                {/* Notifications Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card-premium"
                    style={{ marginBottom: '1.5rem' }}
                >
                    <p style={{ padding: '0.75rem 1.25rem', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.15em', borderBottom: '1px solid var(--glass-border)', fontWeight: 700 }}>
                        {isUrdu ? 'اطلاعات' : 'NOTIFICATIONS'}
                    </p>
                    <Row label="Push Notifications" labelUr="پش اطلاعات" icon={Bell}>
                        <Toggle on={notifications} onToggle={() => setNotifications(p => !p)} />
                    </Row>
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="card-premium"
                >
                    <p style={{ padding: '0.75rem 1.25rem', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.15em', borderBottom: '1px solid var(--glass-border)', fontWeight: 700 }}>
                        {isUrdu ? 'معلومات' : 'PROFILE & SECURITY'}
                    </p>

                    <Row label="About Forever" labelUr="Forever کے بارے میں" icon={Info} onClick={() => setAboutOpen(p => !p)}>
                        <motion.div animate={{ rotate: aboutOpen ? 180 : 0 }}>
                            <ChevronDown size={18} color="var(--gold-dim)" />
                        </motion.div>
                    </Row>
                    <AnimatePresence>
                        {aboutOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                                    <p className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '0.95rem' : '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                        {isUrdu
                                            ? 'Forever ایک ڈیجیٹل میموری پریزرویشن ایپ ہے جو خاندانوں کو اپنے بزرگوں کی یادیں ہمیشہ کے لیے محفوظ رکھنے میں مدد کرتی ہے۔'
                                            : 'Forever is a digital legacy platform designed to help families capture, preserve, and interact with the wisdom and stories of their elders using advanced AI personas.'
                                        }
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--gold)', marginTop: '0.75rem', fontStyle: 'italic', fontWeight: 600 }}>
                                        "Their voice. Their wisdom. Forever."
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Row label="Data & Privacy" labelUr="ڈیٹا اور پرائیویسی" icon={Shield} onClick={() => setPrivacyOpen(p => !p)}>
                        <motion.div animate={{ rotate: privacyOpen ? 180 : 0 }}>
                            <ChevronDown size={18} color="var(--gold-dim)" />
                        </motion.div>
                    </Row>
                    <AnimatePresence>
                        {privacyOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)' }}>
                                    <p className={isUrdu ? 'urdu' : ''} style={{ fontSize: isUrdu ? '0.95rem' : '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                        {isUrdu
                                            ? 'آپ کی یادیں آپ کی ہیں۔ ہم آپ کا ڈیٹا کبھی فروخت نہیں کرتے۔ آپ کسی بھی وقت سب کچھ برآمد یا حذف کر سکتے ہیں۔'
                                            : 'Your privacy is our priority. Memories are encrypted and only accessible to authorized family members. You retain full ownership of all data and can export it anytime.'
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ textAlign: 'center', marginTop: '2.5rem' }}
                >
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.05em' }}>
                        FOREVER v1.0.4 <Sparkles size={10} style={{ display: 'inline', margin: '0 4px' }} /> BUILT WITH REVERENCE
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
