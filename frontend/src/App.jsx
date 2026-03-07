import { useState } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard'; 

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

      {/* 4. User Dashboard (Scam Report Portal) */}
      {currentPage === 'dashboard' && (
        <UserDashboard onLogout={() => navigateTo('landing')} />
      )}

      {/* 5. Admin Dashboard (Forensic Command Center) */}
      {currentPage === 'admin' && (
        <AdminDashboard onLogout={() => navigateTo('landing')} />
      )}
    </main>
  );
}

export default App;