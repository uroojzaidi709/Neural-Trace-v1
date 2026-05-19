import { useState } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  window.__navigateTo = navigateTo;

  // Determine role from localStorage
  const role = localStorage.getItem('role') || 'citizen';

  return (
    <main>
      {currentPage === 'landing'   && <LandingPage onNavigate={navigateTo} />}
      {currentPage === 'login'     && <LoginPage isInitialLogin={true}  onBack={() => navigateTo('landing')} onLoginSuccess={navigateTo} />}
      {currentPage === 'register'  && <LoginPage isInitialLogin={false} onBack={() => navigateTo('landing')} onLoginSuccess={navigateTo} />}
      {/* Both 'dashboard' and 'admin' use same Dashboard component but with correct role */}
      {currentPage === 'dashboard' && <Dashboard role="citizen" onLogout={() => { localStorage.clear(); navigateTo('landing'); }} />}
      {currentPage === 'admin'     && <Dashboard role="organization" onLogout={() => { localStorage.clear(); navigateTo('landing'); }} />}
    </main>
  );
}

export default App;

