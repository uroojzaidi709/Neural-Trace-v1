import { useState } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

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

      {/* 2. Login View - Handles both User and Admin based on the 'role' selected */}
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
          onLoginSuccess={(targetPage) => navigateTo(targetPage)}
        />
      )}

      {/* 4. User/Citizen Dashboard */}
      {currentPage === 'dashboard' && (
        <Dashboard role="citizen" onLogout={() => navigateTo('landing')} />
      )}

      {/* 5. Admin/Organization Dashboard */}
      {currentPage === 'admin' && (
        <Dashboard role="organization" onLogout={() => navigateTo('landing')} />
      )}
    </main>
  );
}

export default App;