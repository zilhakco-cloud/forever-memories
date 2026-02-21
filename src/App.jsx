import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <div style={{
      background: 'var(--bg-deep)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '430px',
      margin: '0 auto',
      position: 'relative',
      boxShadow: '0 0 100px rgba(0,0,0,0.5)',
      overflow: 'hidden'
    }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ flex: 1, minHeight: '100%' }}
          >
            {screens[activeScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav active={activeScreen} onNavigate={navigate} language={language} />
    </div>
  );
}

export default App;
