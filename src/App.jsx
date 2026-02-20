import { useState, useEffect, useRef } from 'react';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import MemoryVault from './screens/MemoryVault';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [language, setLanguage] = useState('en'); // 'en' | 'ur'
  const [prevScreen, setPrevScreen] = useState(null);

  const navigate = (screen) => {
    setPrevScreen(activeScreen);
    setActiveScreen(screen);
  };

  const screens = {
    home: <HomeScreen language={language} setLanguage={setLanguage} onTalk={() => navigate('chat')} />,
    chat: <ChatScreen language={language} setLanguage={setLanguage} />,
    memories: <MemoryVault language={language} />,
    settings: <SettingsScreen language={language} setLanguage={setLanguage} />,
  };

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: '430px', margin: '0 auto', position: 'relative' }}>
      <div key={activeScreen} className="screen-enter" style={{ flex: 1 }}>
        {screens[activeScreen]}
      </div>

      <BottomNav active={activeScreen} onNavigate={navigate} language={language} />
    </div>
  );
}

export default App;
