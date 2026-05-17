import { useState } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import CitizenDashboard from './CitizenDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const navigateTo = (pageName) => setCurrentPage(pageName);

  return (
    <main>
      {currentPage === 'landing'   && <LandingPage onNavigate={navigateTo} />}
      {currentPage === 'login'     && <LoginPage isInitialLogin={true}  onBack={() => navigateTo('landing')} onLoginSuccess={navigateTo} />}
      {currentPage === 'register'  && <LoginPage isInitialLogin={false} onBack={() => navigateTo('landing')} onLoginSuccess={navigateTo} />}
      {currentPage === 'dashboard' && <CitizenDashboard onLogout={() => navigateTo('landing')} />}
      {currentPage === 'admin'     && <Dashboard role="organization" onLogout={() => navigateTo('landing')} />}
    </main>
  );
}

export default App;

