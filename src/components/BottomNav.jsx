import { motion } from 'framer-motion';
import { Home, MessageCircle, Library, Settings } from 'lucide-react';

const NAV_ITEMS = [
    { id: 'home', Icon: Home, label: 'Home', labelUr: 'گھر' },
    { id: 'chat', Icon: MessageCircle, label: 'Talk', labelUr: 'بات' },
    { id: 'memories', Icon: Library, label: 'Memories', labelUr: 'یادیں' },
    { id: 'settings', Icon: Settings, label: 'Settings', labelUr: 'ترتیب' },
];

export default function BottomNav({ active, onNavigate, language }) {
    return (
        <nav className="bottom-nav glass">
            <div className="nav-container">
                {NAV_ITEMS.map((item) => {
                    const isActive = active === item.id;
                    const { Icon } = item;

                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => onNavigate(item.id)}
                            aria-label={item.label}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="nav-active-bg"
                                    style={{
                                        position: 'absolute',
                                        inset: '4px',
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        borderRadius: 'var(--radius-sm)',
                                        zIndex: -1,
                                    }}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <motion.div
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                <Icon className="nav-icon" />
                            </motion.div>

                            <span className={`nav-label ${language === 'ur' ? 'urdu' : ''}`} style={{
                                fontSize: language === 'ur' ? '0.6rem' : '0.65rem',
                                marginTop: language === 'ur' ? '-4px' : '0'
                            }}>
                                {language === 'ur' ? item.labelUr : item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
