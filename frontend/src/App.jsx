import { useState } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

function App() {
  // Use state to track which page is currently active
  const [currentPage, setCurrentPage] = useState('landing');

  // Logic to handle navigation
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <main>
      {/* 1. Show Landing Page first */}
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateTo} />
      )}

      {/* 2. If 'login' is clicked, show LoginPage on the Login tab */}
      {currentPage === 'login' && (
        <LoginPage 
          isInitialLogin={true} 
          onBack={() => navigateTo('landing')} 
        />
      )}

      {/* 3. If 'register' is clicked, show LoginPage on the Register tab */}
      {currentPage === 'register' && (
        <LoginPage 
          isInitialLogin={false} 
          onBack={() => navigateTo('landing')} 
        />
      )}
    </main>
  );
}

export default App;