import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

// --- MOCK DATA ---
const trendData = [
  { time: '10:00', threats: 20000 },
  { time: '12:00', threats: 10300 },
  { time: '14:00', threats: 16350 },
  { time: '16:00', threats: 25251 },
  { time: '18:00', threats: 30356 },
  { time: '20:00', threats: 29450 },
  { time: '22:00', threats: 85321 },
  { time: '00:00', threats: 40339 },
  { time: '02:00', threats: 35321 }
];

const pieData = [
  { name: 'Brute Force', value: 45 },
  { name: 'Web Attacks', value: 35 },
  { name: 'DDoS', value: 20 },
];
const pieColors = ['#4ade80', '#3b82f6', '#0ea5e9'];

const threatFeedsData = [
  { id: 'TF-9901', ip: '192.168.10.45', category: 'DDoS', sensor: 'Scapy', timestamp: '2026-04-16 14:02:11', priority: 'High', geo: 'Moscow, Russia' },
  { id: 'TF-9902', ip: '110.33.121.5', category: 'Brute Force', sensor: 'Cowrie', timestamp: '2026-04-16 14:15:00', priority: 'High', geo: 'Beijing, China' },
  { id: 'TF-9903', ip: '45.22.11.90', category: 'Port Scan', sensor: 'Dionaea', timestamp: '2026-04-16 14:22:18', priority: 'Medium', geo: 'Unknown' },
  { id: 'TF-9904', ip: '180.12.33.1', category: 'SQL Injection', sensor: 'Scapy', timestamp: '2026-04-16 14:35:45', priority: 'Critical', geo: 'São Paulo, Brazil' },
];

const Dashboard = ({ role, onLogout }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [forensicModalOpen, setForensicModalOpen] = useState(false);
  const [reportViewOpen, setReportViewOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [progressStatus, setProgressStatus] = useState(0);
  const [progressText, setProgressText] = useState('Initializing AI engine...');

  const [ipInput, setIpInput] = useState('');
  const [ipResult, setIpResult] = useState({ score: 0, severity: 'Standby', isScanning: false });

  const handleIpScan = () => {
    if (!ipInput.trim()) return;
    setIpResult({ score: 0, severity: 'Scanning...', isScanning: true });
    
    // Simulate network lookup
    setTimeout(() => {
      // Create pseudo-random score based on string
      const hash = ipInput.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const score = (hash % 10) + 1; // 1 to 10
      let severity = 'Low';
      if (score >= 8) severity = 'Critical';
      else if (score >= 6) severity = 'High';
      else if (score >= 4) severity = 'Medium';
      
      setIpResult({ score, severity, isScanning: false });
    }, 1500);
  };

  const isOrg = role === 'organization';

  const orgMenuItems = [
    { id: 'analytics', label: 'Dashboard', icon: '⏱️' },
    { id: 'feeds', label: 'Threat Feeds', icon: '📋' },
    { id: 'vault', label: 'Forensic Vault', icon: '📁' },
    { id: 'lookup', label: 'IP Lookup', icon: '🌐' },
  ];

  const citizenMenuItems = [
    { id: 'analytics', label: 'Live Map', icon: '🌍' },
    { id: 'alerts', label: 'General Alerts', icon: '⚠️' }
  ];

  const menuItems = isOrg ? orgMenuItems : citizenMenuItems;

  const handleGenerateForensics = (threat) => {
    setSelectedThreat(threat);
    setForensicModalOpen(true);
    setProgressStatus(0);
    setProgressText('Capturing Network Packets...');
    
    setTimeout(() => { setProgressStatus(25); setProgressText('Extracting Payload Signatures...'); }, 1000);
    setTimeout(() => { setProgressStatus(50); setProgressText('Analyzing with Random Forest...'); }, 2500);
    setTimeout(() => { setProgressStatus(75); setProgressText('Querying Threat Intelligence...'); }, 4000);
    setTimeout(() => { 
      setProgressStatus(100); 
      setProgressText('Generation Complete.');
      setTimeout(() => {
        setForensicModalOpen(false);
        setReportViewOpen(true);
      }, 800);
    }, 5500);
  };

  const handleCloseReport = () => {
    setReportViewOpen(false);
    setSelectedThreat(null);
  };

  const CircularProgress = ({ percentage, text }) => (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="40" cy="40" r="36" stroke="CurrentColor" strokeWidth="4" fill="transparent" className="text-gray-700" />
        <circle cx="40" cy="40" r="36" stroke="CurrentColor" strokeWidth="4" fill="transparent" strokeDasharray={226} strokeDashoffset={226 - (226 * percentage) / 100} className="text-[#4ade80] transition-all duration-1000" />
      </svg>
      <div className="absolute flex flex-col justify-center items-center">
        <span className="text-white text-lg font-bold">{text}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070b12] flex text-white font-sans relative overflow-hidden">
      <style>{`
        .leaflet-container { background: #070b12 !important; height: 100%; width: 100%; border-radius: 8px; }
        @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        .pulsing-dot-red { width: 14px; height: 14px; background-color: #ef4444; border-radius: 50%; animation: pulseRed 1.5s infinite; border: 2px solid #fff; }
      `}</style>

      {/* --- SIDEBAR --- */}
      <div className="w-20 md:w-65 bg-[#111822] border-r border-[#4ade80]/20 flex flex-col shrink-0 z-10 shadow-2xl">
        <div className="h-20 flex items-center justify-center border-b border-[#4ade80]/20 px-2">
          <div className="flex items-center gap-2">
             <span className="text-[#4ade80] text-3xl">🛡️</span>
             <h2 className="hidden md:block text-white font-black tracking-small">Threat Intelligence & Digital Forensics Unit</h2>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex md:flex-row flex-col items-center md:justify-start justify-center p-4 transition-all border-l-4 ${
                activeTab === item.id 
                ? 'bg-[#4ade80]/10 border-[#4ade80] text-[#4ade80]' 
                : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="text-2xl md:mr-3">{item.icon}</div>
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider mt-1 md:mt-0">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="w-full flex md:flex-row flex-col items-center md:justify-start justify-center p-4 text-gray-500 hover:text-white hover:bg-white/5 border-t border-[#4ade80]/20 transition-all">
           <span className="text-2xl md:mr-3">📤</span>
           <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider mt-1 md:mt-0">Logout</span>
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto z-10 relative">
        <header className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
            {isOrg ? "MAIN DASHBOARD" : "CITIZEN VIEW"} <span className="text-[#4ade80]"></span>
          </h1>
        </header>

        {/* --- VIEW: VISUAL ANALYTICS --- */}
        {activeTab === 'analytics' && (
          <div className="space-y-4 animate-[fadeIn_0.4s_ease-out]">
            
            {/* STATS ROW (Dynamic based on role) */}
            <div className={`grid grid-cols-1 ${isOrg ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-4`}>
              {/* Box 1 (Both) */}
              <div className="bg-[#111822] border border-[#4ade80]/30 rounded-xl p-4 shadow-lg flex flex-col justify-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Total Threats Blocked</p>
                <p className="text-3xl font-black text-[#4ade80]">1,262,378</p>
              </div>

              {isOrg ? (
                <>
                  {/* Box 2 (Org Only) */}
                  <div className="bg-[#111822] border border-gray-700 hover:border-[#4ade80]/30 transition-all rounded-xl p-4 shadow-lg flex flex-col justify-center text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Active Sensors</p>
                    <p className="text-lg font-bold text-white"><span className="text-[#4ade80]">Cowrie: 14</span> / Dionaea: 8</p>
                    <p className="text-xs text-gray-500 mt-1">Status: <span className="text-[#4ade80]">Up</span></p>
                  </div>
                  {/* Box 3 (Org Only) */}
                  <div className="bg-[#111822] border border-gray-700 hover:border-[#4ade80]/30 transition-all rounded-xl p-4 shadow-lg flex flex-col justify-center text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Latest Attack Type</p>
                    <p className="text-xl font-bold text-[#4ade80]">Brute Force</p>
                    <p className="text-xs text-gray-500 mt-1">SSH (1 min ago)</p>
                  </div>
                  {/* Box 4 (Org Only) */}
                  <div className="bg-[#111822] border border-gray-700 hover:border-[#4ade80]/30 transition-all rounded-xl p-4 shadow-lg flex flex-col justify-center items-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">System Health</p>
                    <CircularProgress percentage={98.5} text="98.5%" />
                  </div>
                </>
              ) : (
                /* Citizen Simple Box 2 */
                <div className="bg-[#111822] border border-[#4ade80]/30 rounded-xl p-4 shadow-lg flex flex-col justify-center">
                   <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">My Safety Status</p>
                   <p className="text-3xl font-black text-[#4ade80]">SECURE</p>
                   <p className="text-xs text-gray-400 mt-2">Your endpoints are actively monitored by TIFD.</p>
                </div>
              )}
            </div>

            {/* MAP & SIDE PANEL ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[350px]">
              
              {/* Map (Spans 2 cols if Org, 3 cols if Citizen) */}
              <div className={`${isOrg ? 'lg:col-span-2' : 'lg:col-span-3'} bg-[#111822] border border-gray-700 hover:border-[#4ade80]/50 transition-all rounded-xl p-1 shadow-lg relative h-[350px]`}>
                <div className="absolute top-4 left-4 z-[400] bg-[#1a2332] px-3 py-1 rounded flex items-center gap-2 border border-black shadow-md opacity-90">
                  <span className="w-4 h-4 bg-[#4ade80] flex items-center justify-center text-black text-[10px] font-bold rounded-sm">N</span>
                  <span className="text-white text-xs font-bold tracking-widest">KARACHI</span>
                </div>
                <div className="absolute top-4 right-4 z-[400] text-[#4ade80] font-bold text-xl">70%</div>
                
                <MapContainer 
                  center={[30.3753, 69.3451]} 
                  zoom={5} 
                  minZoom={4}
                  maxBounds={[[23.6, 60.8], [37.1, 77.8]]} // Pakistan Boundaries
                  scrollWheelZoom={false} 
                  className="h-full w-full rounded-lg"
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  />
                  <Marker position={[31.5204, 74.3587]} icon={L.divIcon({ className: 'custom-icon', html: '<div class="pulsing-dot-red"></div>' })} />
                  <Marker position={[33.6844, 73.0479]} icon={L.divIcon({ className: 'custom-icon', html: '<div class="pulsing-dot-red"></div>' })} />
                  <Marker position={[30.1798, 66.9750]} icon={L.divIcon({ className: 'custom-icon', html: '<div class="pulsing-dot-red"></div>' })} />
                  <Marker position={[24.8607, 67.0011]} icon={L.divIcon({ className: 'custom-icon', html: '<div class="pulsing-dot-red"></div>' })} />
                  <Marker position={[25.3960, 68.3578]} icon={L.divIcon({ className: 'custom-icon', html: '<div class="pulsing-dot-red"></div>' })} />
                </MapContainer>
              </div>

              {/* IP Enrichment (Org Only) */}
              {isOrg && (
                <div className="bg-[#111822] border border-gray-700 rounded-xl p-6 flex flex-col h-[350px] relative">
                  <div className="absolute top-4 right-4 text-[#4ade80] font-bold text-xl">30%</div>
                  <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest text-center">IP ENRICHMENT LOOKUP</h3>
                  
                  <div className="w-full">
                    <p className="text-xs text-gray-400 mb-2">Search IP Intelligence</p>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         placeholder="Enter IP Address" 
                         value={ipInput}
                         onChange={(e) => setIpInput(e.target.value)}
                         className="flex-1 bg-[#070b12] border border-gray-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-[#4ade80] transition-colors" 
                       />
                       <button 
                         onClick={handleIpScan}
                         disabled={ipResult.isScanning}
                         className="bg-[#4ade80] text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-[#3bca6b] transition-colors shadow-[0_0_15px_rgba(74,222,128,0.3)] disabled:opacity-50"
                       >
                         {ipResult.isScanning ? '...' : 'Scan'}
                       </button>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center mt-6 p-4">
                    <div className="flex items-center gap-6">
                      {/* Fake Speedometer Gauge using pure CSS/SVG */}
                      <div className="relative w-24 h-12 overflow-hidden">
                        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-[10px] border-r-red-500 border-b-red-500 border-t-[#4ade80] border-l-yellow-500 transform rotate-45"></div>
                        <div 
                          className="absolute bottom-0 left-[48%] w-1 h-10 bg-white origin-bottom z-10 shadow-lg transition-transform duration-1000 ease-out"
                          style={{ transform: `rotate(${Math.min(Math.max((ipResult.score / 10) * 180 - 90, -90), 90)}deg)` }}
                        ></div>
                        <div className="absolute bottom-0 left-[43%] w-3 h-3 bg-white rounded-full z-20"></div>
                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] font-bold text-gray-400 px-2 leading-none translate-y-3">
                           <span>0</span><span>10</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Risk Score</h4>
                        <p className="text-xs text-gray-300">
                          {ipResult.isScanning ? (
                            <span className="animate-pulse">Analyzing footprint...</span>
                          ) : (
                            <>
                              Risk Score: <span className={`font-bold ${ipResult.score >= 8 ? 'text-red-500' : ipResult.score >= 6 ? 'text-red-400' : ipResult.score >= 4 ? 'text-yellow-400' : 'text-[#4ade80]'}`}>
                                {ipResult.score} / 10 ({ipResult.severity})
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CHARTS ROW (Org Only) */}
            {isOrg && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[250px]">
                {/* Area Chart */}
                <div className="lg:col-span-2 bg-[#111822] border border-gray-700 rounded-xl p-4 flex flex-col relative">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">ATTACK TRENDS (LAST 24 HOURS)</h3>
                    <span className="text-[#4ade80] font-bold text-lg">60%</span>
                  </div>
                  <p className="text-xs text-[#4ade80] font-bold text-center mb-2">Total Attacks: 85,321</p>
                  
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickMargin={5} axisLine={false} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#111822', borderColor: '#4ade80', color: '#fff' }} itemStyle={{ color: '#4ade80' }} />
                        <Area type="monotone" dataKey="threats" stroke="#4ade80" strokeWidth={3} fillOpacity={1} fill="url(#colorGreen)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-[#111822] border border-gray-700 rounded-xl p-4 flex flex-col relative">
                   <div className="flex justify-between items-center mb-2">
                     <h3 className="text-sm font-bold text-white uppercase tracking-widest">THREAT DISTRIBUTION</h3>
                     <span className="text-[#4ade80] font-bold text-lg">40%</span>
                   </div>
                   <div className="flex-1 flex items-center justify-center relative min-h-0">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={65}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip contentStyle={{ backgroundColor: '#111822', borderColor: '#4ade80', color: '#fff' }} itemStyle={{ color: '#4ade80' }} />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Custom Labels on top of pie chart */}
                      <div className="absolute w-full h-full pointer-events-none flex items-center justify-center">
                         <div className="absolute top-[20%] left-[5%] text-[10px] text-gray-300">DDoS (20%)</div>
                         <div className="absolute bottom-[10%] left-[5%] text-[10px] text-gray-300">Web Attacks (35%)</div>
                         <div className="absolute top-[40%] right-[0%] text-[10px] text-gray-300">Brute Force<br/>(45%)</div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- VIEW: GENERAL ALERTS (CITIZEN ONLY) --- */}
        {activeTab === 'alerts' && !isOrg && (
          <div className="bg-[#111822] border border-[#4ade80]/20 rounded-xl p-8 shadow-lg max-w-3xl animate-[fadeIn_0.4s_ease-out]">
            <div className="mb-6 border-l-4 border-yellow-500 pl-4">
              <h2 className="text-yellow-500 text-xl font-bold uppercase tracking-wide">Current Threat Advisory</h2>
              <p className="text-gray-400 mt-2">Elevated phishing attacks targeting banking users. Do not click links in SMS regarding blocked accounts.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#070b12] p-4 rounded-xl border border-red-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-red-400 font-bold uppercase text-xs tracking-widest">High Risk</span>
                  <span className="text-gray-500 text-xs">Today, 2:00 PM</span>
                </div>
                <p className="text-white mt-2">Suspicious activity originating from foreign nodes targeting local ISPs. Ensure 2FA is enabled.</p>
              </div>
              <div className="bg-[#070b12] p-4 rounded-xl border border-[#4ade80]/20">
                 <div className="flex items-center justify-between">
                  <span className="text-[#4ade80] font-bold uppercase text-xs tracking-widest">Notice</span>
                  <span className="text-gray-500 text-xs">Yesterday, 9:15 AM</span>
                </div>
                <p className="text-white mt-2">Routine system security checks completed successfully. Karachi infrastructure is secure.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: THREAT FEEDS (ORG ONLY) --- */}
        {activeTab === 'feeds' && isOrg && (
          <div className="bg-[#111822] border border-[#4ade80]/20 rounded-xl p-6 shadow-lg animate-[fadeIn_0.4s_ease-out]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-[#4ade80] uppercase border-b border-[#4ade80]/20 bg-[#4ade80]/5">
                <tr>
                  <th className="px-4 py-3 font-semibold text-xs tracking-widest">Priority</th>
                  <th className="px-4 py-3 font-semibold text-xs tracking-widest">Timestamp</th>
                  <th className="px-4 py-3 font-semibold text-xs tracking-widest">Attacker IP</th>
                  <th className="px-4 py-3 font-semibold text-xs tracking-widest">Category</th>
                  <th className="px-4 py-3 font-semibold text-xs tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4ade80]/10">
                {threatFeedsData.map((feed) => (
                  <tr key={feed.id} className="hover:bg-[#4ade80]/5 transition group">
                    <td className="px-4 py-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${feed.priority === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : feed.priority === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'}`}>{feed.priority}</span></td>
                    <td className="px-4 py-4 text-gray-400 text-xs">{feed.timestamp}</td>
                    <td className="px-4 py-4 text-[#4ade80] font-mono text-xs">{feed.ip}</td>
                    <td className="px-4 py-4 text-gray-300 font-medium">{feed.category}</td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <button onClick={() => handleGenerateForensics(feed)} className="text-[10px] bg-[#4ade80]/20 text-[#4ade80] hover:bg-[#4ade80] hover:text-black border border-[#4ade80]/30 px-3 py-1.5 rounded uppercase font-bold tracking-wider transition-all">Gen Forensics</button>
                      <button className="text-[10px] bg-red-600/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 px-3 py-1.5 rounded uppercase font-bold tracking-wider transition-all">Kill/Block IP</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- VIEW: VAULT --- */}
        {activeTab === 'vault' && (
          <div className="bg-[#111822] border border-[#4ade80]/20 rounded-xl p-8 shadow-lg animate-[fadeIn_0.4s_ease-out]">
            <h2 className="text-white text-xl font-bold mb-6 uppercase tracking-widest">Archived Case Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(item => (
                <div key={item} className="bg-[#070b12] border border-[#4ade80]/20 p-5 rounded-xl hover:border-[#4ade80]/50 transition cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 bg-red-500/10 rounded flex items-center justify-center"><span className="text-xl">📄</span></div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">PDF Report</span>
                  </div>
                  <h3 className="text-[#4ade80] font-mono font-bold text-sm mb-1">CASE-ID-409{item}</h3>
                  <p className="text-xs text-gray-400 mb-4">Generated: 12-Apr-2026</p>
                  <button className="w-full text-xs bg-[#4ade80]/10 hover:bg-[#4ade80]/30 text-[#4ade80] py-2 rounded font-bold uppercase tracking-wider transition">View Document</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* --- FORENSIC GENERATION MODAL --- */}
      {forensicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s]">
          <div className="bg-[#070b12] border-2 border-[#4ade80] rounded-2xl w-full max-w-lg p-8 shadow-[0_0_50px_rgba(74,222,128,0.2)] flex flex-col items-center">
             <div className="h-16 w-16 relative flex items-center justify-center mb-6">
               <div className="absolute inset-0 border-4 border-[#4ade80]/20 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-transparent border-t-[#4ade80] rounded-full animate-spin"></div>
               <span className="text-xl">🤖</span>
             </div>
             <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2 relative">TIDF AI Core<span className="absolute -right-6 top-0 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-[#3bca6b]"></span></span></h2>
             <p className="text-[#4ade80]/80 font-mono text-sm tracking-widest uppercase mb-8">Forensic Analysis Matrix</p>
             <div className="w-full space-y-3">
               <div className="flex justify-between text-xs font-bold uppercase tracking-wider"><span className="text-gray-400">{progressText}</span><span className="text-[#4ade80]">{progressStatus}%</span></div>
               <div className="w-full bg-[#111822] h-2 rounded-full overflow-hidden border border-[#4ade80]/20">
                 <div className="h-full bg-[#4ade80] shadow-[0_0_10px_rgba(74,222,128,0.8)] transition-all duration-500" style={{ width: `${progressStatus}%` }}></div>
               </div>
             </div>
             <p className="mt-6 text-[9px] text-gray-500 uppercase tracking-[0.2em] italic">Do not close window. Establishing secure deep packet inspection...</p>
          </div>
        </div>
      )}

      {/* --- FORENSIC REPORT VIEW --- */}
      {reportViewOpen && selectedThreat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 animate-[fadeIn_0.3s]">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded flex flex-col overflow-hidden text-gray-800 shadow-[0_0_0_2px_#cbd5e1] relative">
            <div className="bg-gray-100 border-b border-gray-300 p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2 text-gray-600"><span className="text-red-600 text-xl">📄</span><span className="font-bold font-mono tracking-widest">TIDF_REPORT_{selectedThreat.id}.PDF</span></div>
              <div className="space-x-3">
                <button className="bg-gray-800 text-white px-4 py-2 rounded font-bold text-sm tracking-wide shadow-md hover:bg-gray-900 transition">Print / Download PDF</button>
                <button onClick={handleCloseReport} className="bg-red-100 text-red-600 px-4 py-2 rounded font-bold text-sm border border-red-200 hover:bg-red-200 transition">Close</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-12 bg-white">
              <div className="text-center border-b-2 border-gray-800 pb-8 mb-8">
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-widest">Official Forensic Report</h1>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mt-2">Threat Intelligence & Digital Forensics Unit</p>
              </div>
              <div className="mb-8 border border-gray-200 p-6 rounded bg-gray-50 relative overflow-hidden"><div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div><h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-4">1. Case Summary</h2><div className="grid grid-cols-2 gap-4 text-sm"><div><span className="font-bold text-gray-500">Unique Case ID:</span> <span className="font-mono">{selectedThreat.id}</span></div><div><span className="font-bold text-gray-500">Detection Timestamp:</span> <span className="font-mono">{selectedThreat.timestamp}</span></div><div><span className="font-bold text-gray-500">Triggering Sensor:</span> <span className="font-mono">{selectedThreat.sensor}</span></div><div><span className="font-bold text-gray-500">Priority Level:</span> <span className={`font-black uppercase ${selectedThreat.priority === 'Critical' ? 'text-red-600' : 'text-orange-600'}`}>{selectedThreat.priority}</span></div></div></div>
              <div className="mb-8 border border-gray-200 p-6 rounded bg-gray-50 relative overflow-hidden"><div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div><h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-4">2. Attacker Intelligence</h2><div className="grid grid-cols-2 gap-4 text-sm"><div><span className="font-bold text-gray-500">Attacker IP Address:</span> <span className="font-mono text-red-600 font-bold">{selectedThreat.ip}</span></div><div><span className="font-bold text-gray-500">Geolocation:</span> <span>{selectedThreat.geo}</span></div><div><span className="font-bold text-gray-500">Category:</span> <span>{selectedThreat.category}</span></div></div></div>
              <div className="mb-8 border border-gray-200 p-6 rounded bg-gray-50 relative overflow-hidden"><div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div><h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-4">3. Technical Evidence (DPI)</h2><div className="space-y-6 text-sm"><div><h3 className="font-bold text-gray-700 uppercase tracking-wider mb-2 text-xs">Network Metadata</h3><div className="bg-gray-800 text-emerald-400 p-4 rounded font-mono text-xs overflow-x-auto shadow-inner">SRC_PORT: 51294<br/>DST_PORT: {selectedThreat.category === 'SQL Injection' ? '80' : '443'}<br/>PROTOCOL: IPv4/TCP</div></div><div><h3 className="font-bold text-gray-700 uppercase tracking-wider mb-2 text-xs">Payload Analysis</h3><div className="bg-gray-800 text-yellow-400 p-4 rounded font-mono text-xs overflow-x-auto shadow-inner whitespace-pre">{selectedThreat.category === 'SQL Injection' ? "GET /login.php?user=admin' OR '1'='1 -- HTTP/1.1\\nHost: target.cifa.gov.pk" : "POST /auth/ssh HTTP/1.1\\n\\n[ENCRYPTED PAYLOAD ATTEMPTING BRUTE-FORCE...]"}</div></div></div></div>
              <div className="mb-8 border border-emerald-500/30 p-6 rounded bg-emerald-50 relative overflow-hidden"><div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div><h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-4">4. Mitigation Status</h2><p className="text-emerald-700 font-bold border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-100 italic">ACTION TAKEN: IP Address {selectedThreat.ip} successfully blacklisted by Neural-Trace Autonomous Firewall.</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;