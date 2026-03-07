import { useState } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import UserDashboard from './UserDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <main>
      {/* 1. Landing Page */}
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateTo} />
      )}

      {/* 2. Login View */}
      {currentPage === 'login' && (
       <LoginPage 
        isInitialLogin={true} 
        onBack={() => navigateTo('landing')} 
        onLoginSuccess={(targetPage) => navigateTo(targetPage)} 
      />
      )}

      {/* 3. Register View */}
      {currentPage === 'register' && (
        <LoginPage 
          isInitialLogin={false} 
          onBack={() => navigateTo('landing')} 
          onLoginSuccess={() => navigateTo('dashboard')}
        />
      )}

      {/* 4. User Dashboard (FIA Style) */}
      {currentPage === 'dashboard' && (
        <UserDashboard onLogout={() => navigateTo('landing')} />
      )}
    </main>
  );
}

export default App;
