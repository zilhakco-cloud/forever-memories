const NAV_ITEMS = [
    { id: 'home', icon: '🏠', label: 'Home', labelUr: 'گھر' },
    { id: 'chat', icon: '💬', label: 'Talk', labelUr: 'بات' },
    { id: 'memories', icon: '📖', label: 'Memories', labelUr: 'یادیں' },
    { id: 'settings', icon: '⚙️', label: 'Settings', labelUr: 'ترتیب' },
];

export default function BottomNav({ active, onNavigate, language }) {
    return (
        <nav className="bottom-nav">
            {NAV_ITEMS.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${active === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                    aria-label={item.label}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className={language === 'ur' ? 'urdu' : ''} style={{ fontSize: language === 'ur' ? '0.65rem' : '0.7rem' }}>
                        {language === 'ur' ? item.labelUr : item.label}
                    </span>
                </button>
            ))}
        </nav>
    );
}
