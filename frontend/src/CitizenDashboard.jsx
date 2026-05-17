
import Dashboard from './Dashboard';

export default function CitizenDashboard({ onLogout }) {
  return <Dashboard role="citizen" onLogout={onLogout} />;
}

