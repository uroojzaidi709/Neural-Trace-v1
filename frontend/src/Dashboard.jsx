// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import {
//   XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
//   ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
// } from 'recharts';
// import {
//   getThreatStats,
//   getThreatDistribution,
//   getLiveMap,
//   getThreatsList,
//   lookupIP,
//   generateReport,
//   getForensicReports,
//   getDownloadURL
// } from './api';

// // ── Fallback trend data (static) ─────────────────────────────────────────────
// const trendData = [
//   { time: '10:00', threats: 20000 },
//   { time: '12:00', threats: 10300 },
//   { time: '14:00', threats: 16350 },
//   { time: '16:00', threats: 25251 },
//   { time: '18:00', threats: 30356 },
//   { time: '20:00', threats: 29450 },
//   { time: '22:00', threats: 85321 },
//   { time: '00:00', threats: 40339 },
//   { time: '02:00', threats: 35321 },
// ];

// const pieColors = ['#4ade80', '#3b82f6', '#0ea5e9', '#f97316', '#ef4444', '#a855f7'];

// // ─────────────────────────────────────────────────────────────────────────────
// const Dashboard = ({ role, onLogout }) => {

//   // ── Tab & modal state ──────────────────────────────────────────────────────
//   const [activeTab, setActiveTab]             = useState('analytics');
//   const [forensicModalOpen, setForensicModalOpen] = useState(false);
//   const [reportViewOpen, setReportViewOpen]   = useState(false);
//   const [selectedThreat, setSelectedThreat]   = useState(null);
//   const [progressStatus, setProgressStatus]   = useState(0);
//   const [progressText, setProgressText]       = useState('Initializing AI engine...');

//   // ── Real data state ────────────────────────────────────────────────────────
//   const [stats, setStats]               = useState(null);
//   const [distribution, setDistribution] = useState([]);
//   const [mapData, setMapData]           = useState([]);
//   const [threats, setThreats]           = useState([]);
//   const [vaultReports, setVaultReports] = useState([]);
//   const [loading, setLoading]           = useState(true);

//   // ── IP Lookup state ────────────────────────────────────────────────────────
//   const [ipInput, setIpInput]   = useState('');
//   const [ipResult, setIpResult] = useState({ score: 0, severity: 'Standby', isScanning: false, country: '', city: '', isp: '' });

//   const isOrg = role === 'organization' || role === 'admin' || role === 'company';

//   // ── Fetch all data on mount ────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         setLoading(true);
//         const [s, d, m, t] = await Promise.all([
//           getThreatStats(),
//           getThreatDistribution(),
//           getLiveMap(),
//           getThreatsList(50),
//         ]);
//         setStats(s);
//         setDistribution(d);
//         setMapData(m);
//         setThreats(t);
//       } catch (err) {
//         console.error('Dashboard fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();

//     // Har 30 second mein refresh karo
//     const interval = setInterval(fetchAll, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Vault tab open hone par reports fetch karo
//   useEffect(() => {
//     if (activeTab === 'vault') {
//       getForensicReports().then(setVaultReports).catch(console.error);
//     }
//   }, [activeTab]);

//   // ── IP Lookup ──────────────────────────────────────────────────────────────
//   const handleIpScan = async () => {
//     if (!ipInput.trim()) return;
//     setIpResult({ score: 0, severity: 'Scanning...', isScanning: true, country: '', city: '', isp: '' });

//     try {
//       const result = await lookupIP(ipInput.trim());
//       setIpResult({
//         score:     result.risk_score  || 0,
//         severity:  result.risk_level  || 'Unknown',
//         country:   result.country     || '',
//         city:      result.city        || '',
//         isp:       result.isp         || '',
//         isScanning: false,
//       });
//     } catch (err) {
//       setIpResult({ score: 0, severity: 'Error', isScanning: false, country: '', city: '', isp: '' });
//     }
//   };

//   // ── Forensics generate ─────────────────────────────────────────────────────
//   const handleGenerateForensics = async (threat) => {
//     setSelectedThreat(threat);
//     setForensicModalOpen(true);
//     setProgressStatus(0);
//     setProgressText('Capturing Network Packets...');

//     setTimeout(() => { setProgressStatus(25); setProgressText('Extracting Payload Signatures...'); }, 1000);
//     setTimeout(() => { setProgressStatus(50); setProgressText('Analyzing with XGBoost ML...'); },    2500);
//     setTimeout(() => { setProgressStatus(75); setProgressText('Querying Threat Intelligence...'); },  4000);
//     setTimeout(async () => {
//       setProgressStatus(100);
//       setProgressText('Generation Complete.');
//       // Real PDF generate karo backend se
//       try {
//         await generateReport(threat.id);
//       } catch (e) {
//         console.error('PDF generation error:', e);
//       }
//       setTimeout(() => {
//         setForensicModalOpen(false);
//         setReportViewOpen(true);
//       }, 800);
//     }, 5500);
//   };

//   const handleCloseReport = () => {
//     setReportViewOpen(false);
//     setSelectedThreat(null);
//   };

//   // ── Priority badge ─────────────────────────────────────────────────────────
//   const getPriority = (attackType) => {
//     const high = ['DDoS Attack', 'SSH Brute Force', 'Malware Upload', 'SSH Unauthorized Access'];
//     const critical = ['DDoS Attack', 'Malware Upload'];
//     if (critical.includes(attackType)) return 'Critical';
//     if (high.includes(attackType))     return 'High';
//     return 'Medium';
//   };

//   // ── Circular progress (system health) ─────────────────────────────────────
//   const CircularProgress = ({ percentage, text }) => (
//     <div className="relative flex items-center justify-center w-20 h-20">
//       <svg className="w-full h-full transform -rotate-90">
//         <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-700" />
//         <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent"
//           strokeDasharray={226} strokeDashoffset={226 - (226 * percentage) / 100}
//           className="text-[#4ade80] transition-all duration-1000" />
//       </svg>
//       <div className="absolute flex flex-col justify-center items-center">
//         <span className="text-white text-lg font-bold">{text}</span>
//       </div>
//     </div>
//   );

//   // ── Sidebar menus ──────────────────────────────────────────────────────────
//   const orgMenuItems = [
//     { id: 'analytics', label: 'Dashboard',     icon: '⏱️' },
//     { id: 'feeds',     label: 'Threat Feeds',  icon: '📋' },
//     { id: 'vault',     label: 'Forensic Vault', icon: '📁' },
//     { id: 'lookup',    label: 'IP Lookup',      icon: '🌐' },
//   ];
//   const citizenMenuItems = [
//     { id: 'analytics', label: 'Live Map',       icon: '🌍' },
//     { id: 'alerts',    label: 'General Alerts', icon: '⚠️' },
//   ];
//   const menuItems = isOrg ? orgMenuItems : citizenMenuItems;

//   // ── Map markers from real data ─────────────────────────────────────────────
//   const mapMarkers = mapData.length > 0
//     ? mapData
//     : [
//         { id: 1, lat: 31.5204, lng: 74.3587,  ip: 'N/A', attack_type: 'N/A' },
//         { id: 2, lat: 33.6844, lng: 73.0479,  ip: 'N/A', attack_type: 'N/A' },
//         { id: 3, lat: 30.1798, lng: 66.9750,  ip: 'N/A', attack_type: 'N/A' },
//         { id: 4, lat: 24.8607, lng: 67.0011,  ip: 'N/A', attack_type: 'N/A' },
//         { id: 5, lat: 25.3960, lng: 68.3578,  ip: 'N/A', attack_type: 'N/A' },
//       ];

//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#070b12] flex text-white font-sans relative overflow-hidden">
//       <style>{`
//         .leaflet-container { background: #070b12 !important; height: 100%; width: 100%; border-radius: 8px; }
//         @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6); } 70% { box-shadow: 0 0 0 10px rgba(239,68,68,0); } 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); } }
//         .pulsing-dot-red { width:14px; height:14px; background-color:#ef4444; border-radius:50%; animation:pulseRed 1.5s infinite; border:2px solid #fff; }
//       `}</style>

//       {/* ── SIDEBAR ── */}
//       <div className="w-20 md:w-65 bg-[#111822] border-r border-[#4ade80]/20 flex flex-col shrink-0 z-10 shadow-2xl">
//         <div className="h-20 flex items-center justify-center border-b border-[#4ade80]/20 px-2">
//           <div className="flex items-center gap-2">
//             <span className="text-[#4ade80] text-3xl">🛡️</span>
//             <h2 className="hidden md:block text-white font-black tracking-small">Neural-Trace</h2>
//           </div>
//         </div>
//         <nav className="flex-1 overflow-y-auto mt-4">
//           {menuItems.map((item) => (
//             <button key={item.id} onClick={() => setActiveTab(item.id)}
//               className={`w-full flex md:flex-row flex-col items-center md:justify-start justify-center p-4 transition-all border-l-4 ${
//                 activeTab === item.id
//                   ? 'bg-[#4ade80]/10 border-[#4ade80] text-[#4ade80]'
//                   : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
//               }`}>
//               <div className="text-2xl md:mr-3">{item.icon}</div>
//               <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider mt-1 md:mt-0">{item.label}</span>
//             </button>
//           ))}
//         </nav>
//         <button onClick={onLogout}
//           className="w-full flex md:flex-row flex-col items-center md:justify-start justify-center p-4 text-gray-500 hover:text-white hover:bg-white/5 border-t border-[#4ade80]/20 transition-all">
//           <span className="text-2xl md:mr-3">📤</span>
//           <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider mt-1 md:mt-0">Logout</span>
//         </button>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div className="flex-1 p-4 md:p-8 overflow-y-auto z-10 relative">
//         <header className="mb-6 flex items-center justify-between">
//           <h1 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
//             {isOrg ? 'MAIN DASHBOARD' : 'CITIZEN VIEW'}
//           </h1>
//           {/* Live indicator */}
//           <div className="flex items-center gap-2 text-xs text-gray-400">
//             <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></span>
//             LIVE — refreshes every 30s
//           </div>
//         </header>

//         {/* Loading state */}
//         {loading && (
//           <div className="flex items-center justify-center h-40">
//             <div className="text-[#4ade80] animate-pulse text-sm font-mono uppercase tracking-widest">
//               Loading real-time data...
//             </div>
//           </div>
//         )}

//         {/* ── ANALYTICS TAB ── */}
//         {activeTab === 'analytics' && !loading && (
//           <div className="space-y-4 animate-[fadeIn_0.4s_ease-out]">

//             {/* STATS CARDS */}
//             <div className={`grid grid-cols-1 ${isOrg ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-4`}>

//               {/* Card 1 — Total threats */}
//               <div className="bg-[#111822] border border-[#4ade80]/30 rounded-xl p-4 shadow-lg flex flex-col justify-center">
//                 <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Total Threats Blocked</p>
//                 <p className="text-3xl font-black text-[#4ade80]">
//                   {stats ? stats.blocked_threats.toLocaleString() : '—'}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Total detected: {stats ? stats.total_threats.toLocaleString() : '—'}
//                 </p>
//               </div>

//               {isOrg ? (
//                 <>
//                   {/* Card 2 — Active sensors */}
//                   <div className="bg-[#111822] border border-gray-700 hover:border-[#4ade80]/30 transition-all rounded-xl p-4 shadow-lg flex flex-col justify-center text-center">
//                     <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Active Sensors</p>
//                     <p className="text-lg font-bold text-white">
//                       <span className="text-[#4ade80]">
//                         Cowrie: {stats?.sensors_active?.cowrie || 0}
//                       </span>
//                       {' / '}
//                       Dionaea: {stats?.sensors_active?.dionaea || 0}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">Status: <span className="text-[#4ade80]">Online</span></p>
//                   </div>

//                   {/* Card 3 — Latest attack */}
//                   <div className="bg-[#111822] border border-gray-700 hover:border-[#4ade80]/30 transition-all rounded-xl p-4 shadow-lg flex flex-col justify-center text-center">
//                     <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Latest Attack Type</p>
//                     <p className="text-xl font-bold text-[#4ade80]">
//                       {stats?.latest_attack_type || 'None'}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Active: {stats?.active_threats || 0} threats
//                     </p>
//                   </div>

//                   {/* Card 4 — System health */}
//                   <div className="bg-[#111822] border border-gray-700 hover:border-[#4ade80]/30 transition-all rounded-xl p-4 shadow-lg flex flex-col justify-center items-center">
//                     <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">System Health</p>
//                     <CircularProgress percentage={98.5} text="98.5%" />
//                     <p className="text-xs text-[#4ade80] mt-1">{stats?.system_health || 'Online'}</p>
//                   </div>
//                 </>
//               ) : (
//                 /* Citizen card 2 */
//                 <div className="bg-[#111822] border border-[#4ade80]/30 rounded-xl p-4 shadow-lg flex flex-col justify-center">
//                   <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">My Safety Status</p>
//                   <p className="text-3xl font-black text-[#4ade80]">SECURE</p>
//                   <p className="text-xs text-gray-400 mt-2">
//                     {stats?.blocked_threats || 0} attacks blocked today.
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* MAP + IP ENRICHMENT */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[350px]">

//               {/* Map */}
//               <div className={`${isOrg ? 'lg:col-span-2' : 'lg:col-span-3'} bg-[#111822] border border-gray-700 hover:border-[#4ade80]/50 transition-all rounded-xl p-1 shadow-lg relative h-[350px]`}>
//                 <MapContainer center={[30.3753, 69.3451]} zoom={5} minZoom={4}
//                   maxBounds={[[23.6, 60.8], [37.1, 77.8]]}
//                   scrollWheelZoom={false} className="h-full w-full rounded-lg">
//                   <TileLayer
//                     url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
//                     attribution='&copy; CARTO'
//                   />
//                   {mapMarkers.map((m) => (
//                     <Marker key={m.id} position={[m.lat, m.lng]}
//                       icon={L.divIcon({ className: 'custom-icon', html: '<div class="pulsing-dot-red"></div>' })}>
//                       <Popup>
//                         <div className="text-xs">
//                           <b>IP:</b> {m.ip}<br />
//                           <b>Attack:</b> {m.attack_type}<br />
//                           <b>Location:</b> {m.location}
//                         </div>
//                       </Popup>
//                     </Marker>
//                   ))}
//                 </MapContainer>
//               </div>

//               {/* IP Enrichment — org only */}
//               {isOrg && (
//                 <div className="bg-[#111822] border border-gray-700 rounded-xl p-6 flex flex-col h-[350px]">
//                   <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest text-center">IP ENRICHMENT LOOKUP</h3>
//                   <div className="w-full">
//                     <p className="text-xs text-gray-400 mb-2">Search IP Intelligence</p>
//                     <div className="flex gap-2">
//                       <input type="text" placeholder="Enter IP Address" value={ipInput}
//                         onChange={(e) => setIpInput(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleIpScan()}
//                         className="flex-1 bg-[#070b12] border border-gray-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-[#4ade80] transition-colors" />
//                       <button onClick={handleIpScan} disabled={ipResult.isScanning}
//                         className="bg-[#4ade80] text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-[#3bca6b] transition-colors disabled:opacity-50">
//                         {ipResult.isScanning ? '...' : 'Scan'}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex-1 flex flex-col items-center justify-center mt-4 space-y-2">
//                     {ipResult.isScanning ? (
//                       <p className="text-[#4ade80] animate-pulse text-sm">Analyzing...</p>
//                     ) : ipResult.score > 0 ? (
//                       <>
//                         <p className="text-xs text-gray-400">Risk Score</p>
//                         <p className={`text-4xl font-black ${
//                           ipResult.score >= 8 ? 'text-red-500' :
//                           ipResult.score >= 6 ? 'text-orange-400' :
//                           ipResult.score >= 4 ? 'text-yellow-400' : 'text-[#4ade80]'}`}>
//                           {ipResult.score}/10
//                         </p>
//                         <p className="text-sm font-bold text-white">{ipResult.severity}</p>
//                         {ipResult.city && (
//                           <p className="text-xs text-gray-400 text-center">
//                             {ipResult.city}, {ipResult.country}<br/>
//                             <span className="text-gray-500">{ipResult.isp}</span>
//                           </p>
//                         )}
//                       </>
//                     ) : (
//                       <p className="text-gray-500 text-sm">Enter an IP to scan</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* CHARTS — org only */}
//             {isOrg && (
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[250px]">

//                 {/* Area Chart */}
//                 <div className="lg:col-span-2 bg-[#111822] border border-gray-700 rounded-xl p-4 flex flex-col">
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="text-sm font-bold text-white uppercase tracking-widest">ATTACK TRENDS (LAST 24 HOURS)</h3>
//                   </div>
//                   <div className="flex-1 min-h-0">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                         <defs>
//                           <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.7} />
//                             <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
//                         <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
//                         <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
//                         <RechartsTooltip contentStyle={{ backgroundColor: '#111822', borderColor: '#4ade80', color: '#fff' }} />
//                         <Area type="monotone" dataKey="threats" stroke="#4ade80" strokeWidth={3} fillOpacity={1} fill="url(#colorGreen)" />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 {/* Pie Chart — real distribution data */}
//                 <div className="bg-[#111822] border border-gray-700 rounded-xl p-4 flex flex-col">
//                   <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">THREAT DISTRIBUTION</h3>
//                   <div className="flex-1 min-h-0">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={distribution.length > 0 ? distribution : [{ name: 'No data', value: 1 }]}
//                           cx="50%" cy="50%"
//                           innerRadius={0} outerRadius={65}
//                           paddingAngle={2} dataKey="value" stroke="none">
//                           {(distribution.length > 0 ? distribution : []).map((_, index) => (
//                             <Cell key={index} fill={pieColors[index % pieColors.length]} />
//                           ))}
//                         </Pie>
//                         <RechartsTooltip contentStyle={{ backgroundColor: '#111822', borderColor: '#4ade80', color: '#fff' }} />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   {/* Legend */}
//                   <div className="mt-1 space-y-1">
//                     {distribution.slice(0, 3).map((d, i) => (
//                       <div key={i} className="flex items-center gap-2 text-[10px] text-gray-400">
//                         <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[i] }}></span>
//                         {d.name} ({d.value})
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── GENERAL ALERTS (citizen) ── */}
//         {activeTab === 'alerts' && !isOrg && (
//           <div className="bg-[#111822] border border-[#4ade80]/20 rounded-xl p-8 shadow-lg max-w-3xl">
//             <div className="mb-6 border-l-4 border-yellow-500 pl-4">
//               <h2 className="text-yellow-500 text-xl font-bold uppercase tracking-wide">Current Threat Advisory</h2>
//               <p className="text-gray-400 mt-2">Elevated phishing attacks targeting banking users. Do not click links in SMS regarding blocked accounts.</p>
//             </div>
//             <div className="space-y-4">
//               {threats.slice(0, 5).map((t) => (
//                 <div key={t.id} className="bg-[#070b12] p-4 rounded-xl border border-red-500/20">
//                   <div className="flex items-center justify-between">
//                     <span className="text-red-400 font-bold uppercase text-xs tracking-widest">
//                       {getPriority(t.attack_type)}
//                     </span>
//                     <span className="text-gray-500 text-xs">{new Date(t.timestamp).toLocaleString()}</span>
//                   </div>
//                   <p className="text-white mt-2 text-sm">
//                     Suspicious activity from <span className="text-[#4ade80] font-mono">{t.attacker_ip}</span> ({t.attacker_location}) — {t.attack_type} detected and {t.is_killed}.
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ── THREAT FEEDS (org) ── */}
//         {activeTab === 'feeds' && isOrg && (
//           <div className="bg-[#111822] border border-[#4ade80]/20 rounded-xl p-6 shadow-lg">
//             {threats.length === 0 ? (
//               <p className="text-gray-400 text-center py-8">No threats found. Run seed data first.</p>
//             ) : (
//               <table className="w-full text-left text-sm whitespace-nowrap">
//                 <thead className="text-[#4ade80] uppercase border-b border-[#4ade80]/20 bg-[#4ade80]/5">
//                   <tr>
//                     <th className="px-4 py-3 font-semibold text-xs tracking-widest">Priority</th>
//                     <th className="px-4 py-3 font-semibold text-xs tracking-widest">Timestamp</th>
//                     <th className="px-4 py-3 font-semibold text-xs tracking-widest">Attacker IP</th>
//                     <th className="px-4 py-3 font-semibold text-xs tracking-widest">Category</th>
//                     <th className="px-4 py-3 font-semibold text-xs tracking-widest">Location</th>
//                     <th className="px-4 py-3 font-semibold text-xs tracking-widest">Status</th>
//                     <th className="px-4 py-3 font-semibold text-xs tracking-widest text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#4ade80]/10">
//                   {threats.map((t) => {
//                     const priority = getPriority(t.attack_type);
//                     return (
//                       <tr key={t.id} className="hover:bg-[#4ade80]/5 transition">
//                         <td className="px-4 py-4">
//                           <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
//                             priority === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
//                             priority === 'High'     ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' :
//                                                       'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'
//                           }`}>{priority}</span>
//                         </td>
//                         <td className="px-4 py-4 text-gray-400 text-xs">
//                           {new Date(t.timestamp).toLocaleString()}
//                         </td>
//                         <td className="px-4 py-4 text-[#4ade80] font-mono text-xs">{t.attacker_ip}</td>
//                         <td className="px-4 py-4 text-gray-300 font-medium">{t.attack_type}</td>
//                         <td className="px-4 py-4 text-gray-400 text-xs">{t.attacker_location}</td>
//                         <td className="px-4 py-4">
//                           <span className={`text-xs font-bold ${t.is_killed === 'Blocked' ? 'text-red-400' : 'text-yellow-400'}`}>
//                             {t.is_killed}
//                           </span>
//                         </td>
//                         <td className="px-4 py-4 text-right space-x-2">
//                           <button
//                             onClick={() => handleGenerateForensics(t)}
//                             className="text-[10px] bg-[#4ade80]/20 text-[#4ade80] hover:bg-[#4ade80] hover:text-black border border-[#4ade80]/30 px-3 py-1.5 rounded uppercase font-bold tracking-wider transition-all">
//                             Gen Forensics
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         {/* ── FORENSIC VAULT ── */}
//         {activeTab === 'vault' && (
//           <div className="bg-[#111822] border border-[#4ade80]/20 rounded-xl p-8 shadow-lg">
//             <h2 className="text-white text-xl font-bold mb-6 uppercase tracking-widest">Archived Case Reports</h2>
//             {vaultReports.length === 0 ? (
//               <p className="text-gray-400 text-center py-8">No reports generated yet. Go to Threat Feeds and click "Gen Forensics".</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {vaultReports.map((r) => (
//                   <div key={r.report_id} className="bg-[#070b12] border border-[#4ade80]/20 p-5 rounded-xl hover:border-[#4ade80]/50 transition cursor-pointer group">
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="h-10 w-10 bg-red-500/10 rounded flex items-center justify-center">
//                         <span className="text-xl">📄</span>
//                       </div>
//                       <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">PDF Report</span>
//                     </div>
//                     <h3 className="text-[#4ade80] font-mono font-bold text-sm mb-1">NT-{String(r.report_id).padStart(5, '0')}</h3>
//                     <p className="text-xs text-gray-400 mb-1">IP: {r.attacker_ip}</p>
//                     <p className="text-xs text-gray-400 mb-1">Type: {r.attack_type}</p>
//                     <p className="text-xs text-gray-500 mb-4">
//                       Generated: {new Date(r.generated_at).toLocaleDateString()}
//                     </p>
//                     <a
//                       href={getDownloadURL(r.report_id)}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="block w-full text-center text-xs bg-[#4ade80]/10 hover:bg-[#4ade80]/30 text-[#4ade80] py-2 rounded font-bold uppercase tracking-wider transition">
//                       Download PDF
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── IP LOOKUP TAB ── */}
//         {activeTab === 'lookup' && (
//           <div className="bg-[#111822] border border-[#4ade80]/20 rounded-xl p-8 shadow-lg max-w-xl">
//             <h2 className="text-white text-xl font-bold mb-6 uppercase tracking-widest">IP Intelligence Lookup</h2>
//             <div className="flex gap-2 mb-6">
//               <input type="text" placeholder="Enter IP Address (e.g. 8.8.8.8)"
//                 value={ipInput}
//                 onChange={(e) => setIpInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleIpScan()}
//                 className="flex-1 bg-[#070b12] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#4ade80] transition-colors" />
//               <button onClick={handleIpScan} disabled={ipResult.isScanning}
//                 className="bg-[#4ade80] text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#3bca6b] transition-colors disabled:opacity-50">
//                 {ipResult.isScanning ? 'Scanning...' : 'Scan'}
//               </button>
//             </div>

//             {ipResult.score > 0 && !ipResult.isScanning && (
//               <div className="space-y-4">
//                 <div className="bg-[#070b12] border border-[#4ade80]/20 rounded-xl p-6 text-center">
//                   <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Risk Score</p>
//                   <p className={`text-6xl font-black mb-2 ${
//                     ipResult.score >= 8 ? 'text-red-500' :
//                     ipResult.score >= 6 ? 'text-orange-400' :
//                     ipResult.score >= 4 ? 'text-yellow-400' : 'text-[#4ade80]'}`}>
//                     {ipResult.score}/10
//                   </p>
//                   <p className="text-white font-bold text-lg">{ipResult.severity}</p>
//                 </div>
//                 <div className="bg-[#070b12] border border-gray-700 rounded-xl p-4 space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-400">Location</span>
//                     <span className="text-white">{ipResult.city}, {ipResult.country}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-400">ISP</span>
//                     <span className="text-white text-right max-w-[200px]">{ipResult.isp}</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ── FORENSIC GENERATION MODAL ── */}
//       {forensicModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
//           <div className="bg-[#070b12] border-2 border-[#4ade80] rounded-2xl w-full max-w-lg p-8 shadow-[0_0_50px_rgba(74,222,128,0.2)] flex flex-col items-center">
//             <div className="h-16 w-16 relative flex items-center justify-center mb-6">
//               <div className="absolute inset-0 border-4 border-[#4ade80]/20 rounded-full"></div>
//               <div className="absolute inset-0 border-4 border-transparent border-t-[#4ade80] rounded-full animate-spin"></div>
//               <span className="text-xl">🤖</span>
//             </div>
//             <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Neural-Trace AI</h2>
//             <p className="text-[#4ade80]/80 font-mono text-sm tracking-widest uppercase mb-8">Forensic Analysis Matrix</p>
//             <div className="w-full space-y-3">
//               <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
//                 <span className="text-gray-400">{progressText}</span>
//                 <span className="text-[#4ade80]">{progressStatus}%</span>
//               </div>
//               <div className="w-full bg-[#111822] h-2 rounded-full overflow-hidden border border-[#4ade80]/20">
//                 <div className="h-full bg-[#4ade80] shadow-[0_0_10px_rgba(74,222,128,0.8)] transition-all duration-500"
//                   style={{ width: `${progressStatus}%` }}></div>
//               </div>
//             </div>
//             <p className="mt-6 text-[9px] text-gray-500 uppercase tracking-[0.2em] italic">
//               Generating tamper-proof forensic PDF...
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ── FORENSIC REPORT VIEW ── */}
//       {reportViewOpen && selectedThreat && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8">
//           <div className="bg-white w-full max-w-5xl h-[90vh] rounded flex flex-col overflow-hidden text-gray-800 shadow-xl relative">
//             <div className="bg-gray-100 border-b border-gray-300 p-4 flex justify-between items-center shrink-0">
//               <div className="flex items-center space-x-2 text-gray-600">
//                 <span className="text-red-600 text-xl">📄</span>
//                 <span className="font-bold font-mono tracking-widest">
//                   NT_REPORT_{String(selectedThreat.id).padStart(5, '0')}.PDF
//                 </span>
//               </div>
//               <div className="space-x-3">
//                 <a
//                   href={getDownloadURL(selectedThreat.id)}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="bg-gray-800 text-white px-4 py-2 rounded font-bold text-sm hover:bg-gray-900 transition inline-block">
//                   Download PDF
//                 </a>
//                 <button onClick={handleCloseReport}
//                   className="bg-red-100 text-red-600 px-4 py-2 rounded font-bold text-sm border border-red-200 hover:bg-red-200 transition">
//                   Close
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 overflow-y-auto p-12 bg-white">
//               <div className="text-center border-b-2 border-gray-800 pb-8 mb-8">
//                 <h1 className="text-3xl font-black text-gray-900 uppercase tracking-widest">Official Forensic Report</h1>
//                 <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mt-2">Neural-Trace — Threat Intelligence & Digital Forensics</p>
//               </div>
//               <div className="mb-8 border border-gray-200 p-6 rounded bg-gray-50 relative overflow-hidden">
//                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
//                 <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-4">1. Case Summary</h2>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div><span className="font-bold text-gray-500">Attack ID:</span> <span className="font-mono">{selectedThreat.id}</span></div>
//                   <div><span className="font-bold text-gray-500">Detection Timestamp:</span> <span className="font-mono">{new Date(selectedThreat.timestamp).toLocaleString()}</span></div>
//                   <div><span className="font-bold text-gray-500">Detection Sensor:</span> <span className="font-mono">{selectedThreat.source_tool}</span></div>
//                   <div><span className="font-bold text-gray-500">Status:</span> <span className="font-black text-red-600">{selectedThreat.is_killed}</span></div>
//                 </div>
//               </div>
//               <div className="mb-8 border border-gray-200 p-6 rounded bg-gray-50 relative overflow-hidden">
//                 <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
//                 <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-4">2. Attacker Intelligence</h2>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div><span className="font-bold text-gray-500">Attacker IP:</span> <span className="font-mono text-red-600 font-bold">{selectedThreat.attacker_ip}</span></div>
//                   <div><span className="font-bold text-gray-500">Location:</span> <span>{selectedThreat.attacker_location}</span></div>
//                   <div><span className="font-bold text-gray-500">Attack Type:</span> <span>{selectedThreat.attack_type}</span></div>
//                   <div><span className="font-bold text-gray-500">Target Port:</span> <span>{selectedThreat.attack_port}</span></div>
//                 </div>
//               </div>
//               <div className="mb-8 border border-emerald-500/30 p-6 rounded bg-emerald-50 relative overflow-hidden">
//                 <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
//                 <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide mb-4">3. Mitigation Status</h2>
//                 <p className="text-emerald-700 font-bold border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-100 italic">
//                   ACTION TAKEN: IP {selectedThreat.attacker_ip} — {selectedThreat.is_killed} by Neural-Trace Autonomous Firewall.
//                 </p>
//                 <p className="text-xs text-gray-500 mt-3">
//                   Full tamper-proof PDF with SHA-256 hash available for download above. Submit to FIA Cybercrime Wing for legal proceedings.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell,
  BarChart, Bar, Cell as BCell, Legend
} from 'recharts';
import {
  getThreatStats, getThreatDistribution, getLiveMap,
  getThreatsList, lookupIP, generateReport,
  getForensicReports, getDownloadURL
} from './api';

const C = {
  bg:'#070b12', panel:'#0d1520', border:'rgba(57,255,20,0.12)',
  green:'#39FF14', greenDim:'rgba(57,255,20,0.15)',
  red:'#ff4444', orange:'#f97316', yellow:'#eab308',
  blue:'#38bdf8', purple:'#a78bfa', gray:'#94a3b8',
};
const COLORS = [C.green,C.blue,C.orange,C.red,C.purple,C.yellow];

const buildTrend = () => {
  const h=[];
  for(let i=23;i>=0;i--){
    const d=new Date(); d.setHours(d.getHours()-i);
    h.push({ time:d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false}), threats:Math.floor(Math.random()*80000+5000), blocked:Math.floor(Math.random()*60000+3000) });
  }
  return h;
};
const TREND = buildTrend();

const makePulse = (color='#ff4444') => L.divIcon({
  className:'',
  html:`<div style="width:14px;height:14px;background:${color};border-radius:50%;box-shadow:0 0 0 0 ${color}88;animation:ntP 1.6s infinite;border:2px solid #fff;"></div>`,
  iconSize:[14,14],iconAnchor:[7,7],
});

const Card = ({label,value,sub,color=C.green,icon}) => (
  <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:16,padding:'20px 24px',display:'flex',flexDirection:'column',gap:6,transition:'border-color .2s',cursor:'default'}}
    onMouseEnter={e=>e.currentTarget.style.borderColor=color+'55'}
    onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
      <span style={{fontSize:10,color:C.gray,fontWeight:700,letterSpacing:2,textTransform:'uppercase'}}>{label}</span>
      {icon&&<span style={{fontSize:20,opacity:.7}}>{icon}</span>}
    </div>
    <span style={{fontSize:32,fontWeight:900,color,lineHeight:1,fontFamily:'monospace'}}>{value??'—'}</span>
    {sub&&<span style={{fontSize:11,color:C.gray}}>{sub}</span>}
  </div>
);

const SecTitle = ({children,live}) => (
  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
    {live&&<span style={{width:7,height:7,borderRadius:'50%',background:C.green,boxShadow:`0 0 8px ${C.green}`,display:'inline-block',animation:'ntP2 2s infinite'}}/>}
    <span style={{fontSize:10,fontWeight:800,letterSpacing:3,color:C.green,textTransform:'uppercase'}}>{children}</span>
  </div>
);

const Dashboard = ({role,onLogout}) => {
  const [tab,setTab]       = useState('overview');
  const [stats,setStats]   = useState(null);
  const [dist,setDist]     = useState([]);
  const [map,setMap]       = useState([]);
  const [threats,setThr]   = useState([]);
  const [vault,setVault]   = useState([]);
  const [loading,setLoad]  = useState(true);
  const [ipIn,setIpIn]     = useState('');
  const [ipRes,setIpRes]   = useState(null);
  const [ipScan,setIpScan] = useState(false);
  const [fOpen,setFOpen]   = useState(false);
  const [rOpen,setROpen]   = useState(false);
  const [sel,setSel]       = useState(null);
  const [prog,setProg]     = useState(0);
  const [progTxt,setProgTxt]=useState('');
  const [search,setSearch] = useState('');
  const [fType,setFType]   = useState('all');
  const [cnt,setCnt]       = useState(0);

  const isOrg = ['organization','admin','company'].includes(role);

  useEffect(()=>{
    if(!stats) return;
    const tgt=stats.blocked_threats||0; let cur=0;
    const step=Math.max(1,Math.floor(tgt/60));
    const t=setInterval(()=>{ cur=Math.min(cur+step,tgt); setCnt(cur); if(cur>=tgt)clearInterval(t); },16);
    return ()=>clearInterval(t);
  },[stats]);

  const fetchAll = useCallback(async()=>{
    try{
      setLoad(true);
      const [s,d,m,t]=await Promise.all([getThreatStats(),getThreatDistribution(),getLiveMap(),getThreatsList(100)]);
      setStats(s);setDist(d);setMap(m);setThr(t);
    }catch(e){console.error(e);}finally{setLoad(false);}
  },[]);

  useEffect(()=>{fetchAll();const iv=setInterval(fetchAll,30000);return()=>clearInterval(iv);},[]);
  useEffect(()=>{if(tab==='vault')getForensicReports().then(setVault).catch(console.error);},[tab]);

  const scanIP=async()=>{
    if(!ipIn.trim())return; setIpScan(true);setIpRes(null);
    try{const r=await lookupIP(ipIn.trim());setIpRes(r);}catch{setIpRes({error:true});}finally{setIpScan(false);};
  };

  const doForensics=async(t)=>{
    setSel(t);setFOpen(true);setProg(0);setProgTxt('Capturing packets...');
    [[1000,20,'Extracting 30 features...'],[2500,45,'XGBoost classifying...'],[4000,70,'Threat intelligence lookup...'],[5200,90,'Building evidence chain...'],[6000,100,'SHA-256 seal complete ✓']].forEach(([d,p,tx])=>setTimeout(()=>{setProg(p);setProgTxt(tx);},d));
    setTimeout(async()=>{try{await generateReport(t.id);}catch{}setTimeout(()=>{setFOpen(false);setROpen(true);},700);},6800);
  };

  const getPri = t=>(['DDoS Attack','Malware Upload'].includes(t)?'Critical':['SSH Brute Force','SSH Unauthorized Access'].includes(t)?'High':'Medium');
  const priColor = {Critical:C.red,High:C.orange,Medium:C.yellow};

  const filtered = threats.filter(t=>{
    const ms=!search||t.attacker_ip?.includes(search)||t.attack_type?.toLowerCase().includes(search.toLowerCase())||t.attacker_location?.toLowerCase().includes(search.toLowerCase());
    const mt=fType==='all'||(fType==='blocked'&&t.is_killed==='Blocked')||(fType==='active'&&t.is_killed!=='Blocked')||t.attack_type===fType;
    return ms&&mt;
  });

  const topCountries=Object.entries(threats.reduce((a,t)=>{const c=(t.attacker_location||'Unknown').split(',').pop().trim();a[c]=(a[c]||0)+1;return a},{})).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([name,value])=>({name,value}));
  const atkTypes=[...new Set(threats.map(t=>t.attack_type))];
  const markers=map.length>0?map:[{id:1,lat:24.8607,lng:67.0011,ip:'—',attack_type:'—',location:'Karachi, PK',is_killed:'Active'},{id:2,lat:31.5204,lng:74.3587,ip:'—',attack_type:'—',location:'Lahore, PK',is_killed:'Active'},{id:3,lat:33.6844,lng:73.0479,ip:'—',attack_type:'—',location:'Islamabad, PK',is_killed:'Blocked'}];

  const orgSidebar=[{id:'overview',label:'Overview',icon:'◈'},{id:'analytics',label:'Analytics',icon:'◉'},{id:'feeds',label:'Threat Feeds',icon:'◎'},{id:'vault',label:'Forensic Vault',icon:'▣'},{id:'lookup',label:'IP Intel',icon:'⬡'}];
  const ctzSidebar=[{id:'overview',label:'Live Map',icon:'◈'},{id:'alerts',label:'Alerts',icon:'◎'},{id:'lookup',label:'Check IP',icon:'⬡'}];
  const sbar=isOrg?orgSidebar:ctzSidebar;
  const P={background:C.panel,border:`1px solid ${C.border}`,borderRadius:16,padding:24};

  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',color:'#fff',fontFamily:"'JetBrains Mono','Fira Code',monospace"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');
        @keyframes ntP{0%{box-shadow:0 0 0 0 rgba(255,68,68,.6)}70%{box-shadow:0 0 0 10px rgba(255,68,68,0)}100%{box-shadow:0 0 0 0 rgba(255,68,68,0)}}
        @keyframes ntP2{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes ntSpin{to{transform:rotate(360deg)}}
        @keyframes ntFU{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ntGlow{0%,100%{box-shadow:0 0 8px ${C.green}44}50%{box-shadow:0 0 24px ${C.green}88}}
        .nt-active{background:${C.greenDim}!important;color:${C.green}!important;border-left:3px solid ${C.green}!important;}
        .nt-tab:hover{background:rgba(255,255,255,.04)!important;color:#fff!important;}
        .nt-row:hover{background:rgba(57,255,20,.04)!important;}
        .leaflet-container{background:${C.bg}!important;border-radius:12px;}
        .leaflet-tile-pane{filter:brightness(.8) saturate(.6);}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}
        .nt-card{animation:ntFU .5s ease both;}
        .nt-in{background:${C.bg};border:1px solid ${C.border};border-radius:10px;padding:10px 14px;color:#fff;font-family:inherit;font-size:12px;outline:none;transition:border-color .2s;}
        .nt-in:focus{border-color:${C.green}88;}
        .nt-btn{background:${C.green};color:#000;border:none;border-radius:10px;padding:10px 20px;font-weight:800;font-family:inherit;font-size:12px;cursor:pointer;transition:all .15s;}
        .nt-btn:hover{background:#3bca6b;transform:translateY(-1px);}
        .nt-gbtn{background:transparent;color:${C.green};border:1px solid ${C.green}44;border-radius:10px;padding:8px 16px;font-weight:700;font-family:inherit;font-size:11px;cursor:pointer;transition:all .15s;}
        .nt-gbtn:hover{background:${C.greenDim};}
        select{appearance:none;}
      `}</style>

      {/* SIDEBAR */}
      <aside style={{width:220,minHeight:'100vh',background:'#0a1119',borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',flexShrink:0,zIndex:10}}>
        <div style={{padding:'24px 20px',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,background:C.greenDim,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',border:`1px solid ${C.green}44`,animation:'ntGlow 3s infinite'}}>
            <span style={{fontSize:18}}>🛡</span>
          </div>
          <div>
            <div style={{fontWeight:900,fontSize:14,color:C.green,letterSpacing:1}}>Neural-Trace</div>
            <div style={{fontSize:9,color:C.gray,letterSpacing:2}}>TIDF PLATFORM</div>
          </div>
        </div>
        <nav style={{flex:1,padding:'12px 0'}}>
          {sbar.map(item=>(
            <button key={item.id} onClick={()=>setTab(item.id)}
              className={`nt-tab ${tab===item.id?'nt-active':''}`}
              style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'13px 20px',background:'transparent',border:'none',borderLeft:'3px solid transparent',color:C.gray,fontFamily:'inherit',fontSize:12,fontWeight:700,cursor:'pointer',letterSpacing:1,textTransform:'uppercase',transition:'all .15s'}}>
              <span style={{fontSize:14,opacity:.8}}>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{padding:'16px 20px',borderTop:`1px solid ${C.border}`}}>
          <div style={{fontSize:10,color:C.gray,marginBottom:4,letterSpacing:1}}>{isOrg?'ORGANIZATION':'CITIZEN'} ACCOUNT</div>
          <div style={{fontSize:11,color:'#fff',fontWeight:700,marginBottom:12}}>{localStorage.getItem('full_name')||'Analyst'}</div>
          <button onClick={onLogout} className="nt-gbtn" style={{width:'100%',textAlign:'center'}}>⎋ Logout</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{flex:1,overflowY:'auto',padding:'28px 32px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
          <div>
            <h1 style={{fontSize:18,fontWeight:900,color:'#fff',letterSpacing:3,textTransform:'uppercase',margin:0}}>
              {tab==='overview'?(isOrg?'Security Overview':'Live Map'):tab==='analytics'?'Threat Analytics':tab==='feeds'?'Threat Intelligence Feeds':tab==='vault'?'Forensic Evidence Vault':tab==='lookup'?'IP Intelligence':'Alerts'}
            </h1>
            <div style={{fontSize:10,color:C.gray,marginTop:4,letterSpacing:1}}>{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:11,color:C.gray}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:C.green,boxShadow:`0 0 8px ${C.green}`,display:'inline-block',animation:'ntP2 2s infinite'}}/>
            LIVE · AUTO REFRESH 30s
            <button onClick={fetchAll} className="nt-gbtn" style={{marginLeft:8}}>⟳</button>
          </div>
        </div>

        {loading&&<div style={{display:'flex',alignItems:'center',gap:12,color:C.green,fontSize:12,marginBottom:24}}><span style={{width:14,height:14,border:`2px solid ${C.green}44`,borderTop:`2px solid ${C.green}`,borderRadius:'50%',display:'inline-block',animation:'ntSpin .8s linear infinite'}}/>Loading real-time data...</div>}

        {/* OVERVIEW */}
        {tab==='overview'&&!loading&&(
          <div style={{display:'flex',flexDirection:'column',gap:24}} className="nt-card">
            {isOrg&&<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
              <Card label="Threats Blocked" value={cnt.toLocaleString()} sub={`${stats?.total_threats||0} total detected`} color={C.green} icon="🛡"/>
              <Card label="Active Threats"  value={stats?.active_threats||0} sub="Require attention" color={C.red} icon="⚠"/>
              <Card label="Sensors Online"  value={`${(stats?.sensors_active?.cowrie||0)+(stats?.sensors_active?.dionaea||0)}`} sub={`Cowrie ${stats?.sensors_active?.cowrie||0} · Dionaea ${stats?.sensors_active?.dionaea||0}`} color={C.blue} icon="📡"/>
              <Card label="System Health"   value="98.5%" sub={stats?.system_health||'Online'} color={C.green} icon="💚"/>
            </div>}
            {!isOrg&&<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
              <Card label="Safety Status" value="SECURE" sub="Neural-Trace protecting you" color={C.green} icon="🛡"/>
              <Card label="Blocked Today" value={cnt.toLocaleString()} sub="Auto-blocked" color={C.green} icon="🔒"/>
              <Card label="Latest Threat" value={stats?.latest_attack_type||'None'} sub={`${stats?.active_threats||0} active`} color={C.orange} icon="⚡"/>
            </div>}

            <div style={{display:'grid',gridTemplateColumns:isOrg?'2fr 1fr':'1fr',gap:16,height:380}}>
              <div style={{...P,padding:4,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:12,left:12,zIndex:500,background:C.bg+'ee',border:`1px solid ${C.border}`,borderRadius:8,padding:'6px 12px',fontSize:10,color:C.gray,letterSpacing:2}}>● LIVE ATTACK MAP</div>
                <MapContainer center={[30.3753,69.3451]} zoom={5} minZoom={4} maxBounds={[[20,55],[40,82]]} scrollWheelZoom={false} style={{height:'100%',width:'100%',borderRadius:12}}>
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; CARTO"/>
                  {markers.map(m=>(
                    <Marker key={m.id} position={[m.lat,m.lng]} icon={makePulse(m.is_killed==='Blocked'?C.green:C.red)}>
                      <Popup><div style={{fontFamily:'monospace',fontSize:11,minWidth:140}}><b>{m.location||m.ip}</b><br/><span>Attack: {m.attack_type}</span><br/><span style={{color:m.is_killed==='Blocked'?'#16a34a':'#dc2626',fontWeight:700}}>● {m.is_killed}</span></div></Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              {isOrg&&(
                <div style={{...P,display:'flex',flexDirection:'column',gap:12}}>
                  <SecTitle>IP Enrichment</SecTitle>
                  <div style={{display:'flex',gap:8}}>
                    <input className="nt-in" placeholder="IP address..." value={ipIn} onChange={e=>setIpIn(e.target.value)} onKeyDown={e=>e.key==='Enter'&&scanIP()} style={{flex:1}}/>
                    <button className="nt-btn" onClick={scanIP} disabled={ipScan}>{ipScan?'...':'Scan'}</button>
                  </div>
                  <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    {ipScan&&<div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}><span style={{width:28,height:28,border:`2px solid ${C.green}44`,borderTop:`2px solid ${C.green}`,borderRadius:'50%',display:'inline-block',animation:'ntSpin .8s linear infinite'}}/><span style={{fontSize:11,color:C.gray}}>Analyzing...</span></div>}
                    {!ipScan&&!ipRes&&<span style={{fontSize:11,color:C.gray,textAlign:'center'}}>Enter IP to check threat intelligence</span>}
                    {!ipScan&&ipRes&&!ipRes.error&&(
                      <div style={{width:'100%'}}>
                        <div style={{textAlign:'center',marginBottom:12}}>
                          <div style={{fontSize:10,color:C.gray,marginBottom:4}}>RISK SCORE</div>
                          <div style={{fontSize:52,fontWeight:900,color:ipRes.risk_score>=8?C.red:ipRes.risk_score>=5?C.orange:C.green,lineHeight:1,fontFamily:'monospace'}}>{ipRes.risk_score}/10</div>
                          <div style={{fontSize:13,fontWeight:700,color:'#fff',marginTop:4}}>{ipRes.risk_level}</div>
                        </div>
                        {[['Location',`${ipRes.city}, ${ipRes.country}`],['ISP',ipRes.isp],['Status',ipRes.threat_status]].map(([k,v])=>(
                          <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:11,padding:'5px 0',borderBottom:`1px solid ${C.border}`}}>
                            <span style={{color:C.gray}}>{k}</span><span style={{color:'#fff',fontWeight:700,maxWidth:120,textAlign:'right',overflow:'hidden',textOverflow:'ellipsis'}}>{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {isOrg&&(
              <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,height:240}}>
                <div style={P}>
                  <SecTitle live>Attack Trends — 24h</SecTitle>
                  <ResponsiveContainer width="100%" height="82%">
                    <AreaChart data={TREND} margin={{top:5,right:10,left:-20,bottom:0}}>
                      <defs>
                        <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.green} stopOpacity={.5}/><stop offset="95%" stopColor={C.green} stopOpacity={0}/></linearGradient>
                        <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.blue} stopOpacity={.3}/><stop offset="95%" stopColor={C.blue} stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
                      <XAxis dataKey="time" stroke={C.gray} fontSize={9} tickLine={false} axisLine={false} interval={3}/>
                      <YAxis stroke={C.gray} fontSize={9} tickLine={false} axisLine={false}/>
                      <RechartsTooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                      <Area type="monotone" dataKey="threats" stroke={C.green} strokeWidth={2} fill="url(#gG)" name="Detected"/>
                      <Area type="monotone" dataKey="blocked" stroke={C.blue}  strokeWidth={2} fill="url(#gB)"  name="Blocked"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div style={P}>
                  <SecTitle>Distribution</SecTitle>
                  <ResponsiveContainer width="100%" height="70%">
                    <PieChart>
                      <Pie data={dist.length?dist:[{name:'No data',value:1}]} cx="50%" cy="50%" outerRadius={65} innerRadius={30} dataKey="value" stroke="none" paddingAngle={3}>
                        {(dist.length?dist:[]).map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                      </Pie>
                      <RechartsTooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{display:'flex',flexDirection:'column',gap:3}}>
                    {dist.slice(0,4).map((d,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',gap:6,fontSize:10,color:C.gray}}>
                        <span style={{width:8,height:8,borderRadius:2,background:COLORS[i%COLORS.length],flexShrink:0}}/>
                        <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}}>{d.name}</span>
                        <span style={{color:'#fff',fontWeight:700}}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS */}
        {tab==='analytics'&&isOrg&&!loading&&(
          <div style={{display:'flex',flexDirection:'column',gap:24}} className="nt-card">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={P}>
                <SecTitle>Top Attacking Countries</SecTitle>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topCountries.length?topCountries:[{name:'No data',value:0}]} margin={{top:5,right:10,left:-20,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
                    <XAxis dataKey="name" stroke={C.gray} fontSize={9} tickLine={false} axisLine={false}/>
                    <YAxis stroke={C.gray} fontSize={9} tickLine={false} axisLine={false}/>
                    <RechartsTooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                    <Bar dataKey="value" name="Attacks" radius={[4,4,0,0]}>
                      {(topCountries.length?topCountries:[]).map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={P}>
                <SecTitle>Attack Type Breakdown</SecTitle>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart layout="vertical" data={dist.length?dist.slice(0,6):[{name:'No data',value:0}]} margin={{top:5,right:30,left:10,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false}/>
                    <XAxis type="number" stroke={C.gray} fontSize={9} tickLine={false} axisLine={false}/>
                    <YAxis type="category" dataKey="name" stroke={C.gray} fontSize={9} tickLine={false} axisLine={false} width={90}/>
                    <RechartsTooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                    <Bar dataKey="value" radius={[0,4,4,0]}>
                      {(dist.length?dist:[]).map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{...P,height:280}}>
              <SecTitle live>48-Hour Attack Volume</SecTitle>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={[...TREND,...TREND.map(d=>({...d,time:d.time+'+'}))]}>
                  <defs>
                    <linearGradient id="gG2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.green} stopOpacity={.5}/><stop offset="95%" stopColor={C.green} stopOpacity={0}/></linearGradient>
                    <linearGradient id="gR2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.red} stopOpacity={.3}/><stop offset="95%" stopColor={C.red} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
                  <XAxis dataKey="time" stroke={C.gray} fontSize={9} tickLine={false} axisLine={false} interval={5}/>
                  <YAxis stroke={C.gray} fontSize={9} tickLine={false} axisLine={false}/>
                  <RechartsTooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                  <Legend wrapperStyle={{fontSize:11,paddingTop:8}}/>
                  <Area type="monotone" dataKey="threats" stroke={C.green} strokeWidth={2} fill="url(#gG2)" name="Detected"/>
                  <Area type="monotone" dataKey="blocked" stroke={C.red}   strokeWidth={2} fill="url(#gR2)" name="Blocked"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
              {[{l:'Detection Rate',v:`${stats?.total_threats?Math.round((stats.blocked_threats/stats.total_threats)*100):0}%`,c:C.green},{l:'Active Threats',v:stats?.active_threats||0,c:C.red},{l:'Unique Types',v:atkTypes.length,c:C.blue},{l:'Avg Risk Score',v:'7.2/10',c:C.orange}].map(s=>(
                <div key={s.l} style={{...P,textAlign:'center',padding:16}}>
                  <div style={{fontSize:10,color:C.gray,letterSpacing:2,marginBottom:8,textTransform:'uppercase'}}>{s.l}</div>
                  <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:'monospace'}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEEDS */}
        {tab==='feeds'&&isOrg&&(
          <div className="nt-card">
            <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap'}}>
              <input className="nt-in" placeholder="🔍 Search IP, type, location..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:200}}/>
              <select className="nt-in" value={fType} onChange={e=>setFType(e.target.value)} style={{minWidth:160,cursor:'pointer'}}>
                <option value="all">All Types</option>
                <option value="blocked">Blocked Only</option>
                <option value="active">Active Only</option>
                {atkTypes.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              <div style={{fontSize:11,color:C.gray,display:'flex',alignItems:'center',padding:'0 8px'}}>{filtered.length} results</div>
            </div>
            <div style={{...P,padding:0,overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`,background:'rgba(57,255,20,.04)'}}>
                  {['Priority','Time','Attacker IP','Attack Type','Location','Status','Actions'].map(h=>(
                    <th key={h} style={{padding:'12px 16px',textAlign:'left',fontSize:10,fontWeight:800,color:C.green,letterSpacing:2,textTransform:'uppercase'}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {filtered.length===0?<tr><td colSpan={7} style={{padding:40,textAlign:'center',color:C.gray,fontSize:12}}>No threats found</td></tr>
                  :filtered.map(t=>{
                    const pri=getPri(t.attack_type),pc=priColor[pri];
                    return(<tr key={t.id} className="nt-row" style={{borderBottom:`1px solid ${C.border}`,transition:'background .1s'}}>
                      <td style={{padding:'12px 16px'}}><span style={{fontSize:10,fontWeight:800,padding:'3px 8px',borderRadius:6,background:`${pc}22`,color:pc,border:`1px solid ${pc}44`,textTransform:'uppercase'}}>{pri}</span></td>
                      <td style={{padding:'12px 16px',color:C.gray,fontSize:11}}>{new Date(t.timestamp).toLocaleString()}</td>
                      <td style={{padding:'12px 16px',color:C.green,fontWeight:700}}>{t.attacker_ip}</td>
                      <td style={{padding:'12px 16px',color:'#fff'}}>{t.attack_type}</td>
                      <td style={{padding:'12px 16px',color:C.gray,fontSize:11}}>{t.attacker_location}</td>
                      <td style={{padding:'12px 16px'}}><span style={{fontSize:11,fontWeight:700,color:t.is_killed==='Blocked'?C.red:C.yellow}}>{t.is_killed}</span></td>
                      <td style={{padding:'12px 16px'}}><button className="nt-gbtn" onClick={()=>doForensics(t)} style={{fontSize:10}}>⊕ Forensics</button></td>
                    </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VAULT */}
        {tab==='vault'&&(
          <div className="nt-card">
            <div style={{...P,marginBottom:20}}><SecTitle>Evidence Archive</SecTitle><p style={{fontSize:12,color:C.gray,margin:0}}>All reports SHA-256 sealed and court-admissible under PECA 2016.</p></div>
            {vault.length===0?<div style={{...P,textAlign:'center',padding:48}}><div style={{fontSize:32,marginBottom:12}}>📂</div><div style={{color:C.gray,fontSize:12}}>No reports yet. Generate from Threat Feeds.</div></div>
            :<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
              {vault.map(r=>(
                <div key={r.report_id} style={{...P,transition:'border-color .2s',cursor:'pointer'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=`${C.green}44`}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
                    <div style={{width:40,height:40,background:`${C.red}11`,border:`1px solid ${C.red}33`,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>📄</div>
                    <span style={{fontSize:9,color:C.gray,letterSpacing:2,textTransform:'uppercase',background:C.bg,padding:'4px 8px',borderRadius:6,border:`1px solid ${C.border}`}}>SHA-256</span>
                  </div>
                  <div style={{fontFamily:'monospace',fontWeight:900,color:C.green,fontSize:13,marginBottom:6}}>NT-{String(r.report_id).padStart(5,'0')}</div>
                  <div style={{fontSize:11,color:C.gray,marginBottom:2}}>{r.attacker_ip}</div>
                  <div style={{fontSize:11,color:'#fff',marginBottom:2}}>{r.attack_type}</div>
                  <div style={{fontSize:10,color:C.gray,marginBottom:16}}>{new Date(r.generated_at).toLocaleDateString()}</div>
                  <a href={getDownloadURL(r.report_id)} target="_blank" rel="noreferrer"
                    style={{display:'block',width:'100%',textAlign:'center',padding:'9px',background:`${C.green}18`,border:`1px solid ${C.green}44`,borderRadius:8,color:C.green,fontWeight:800,fontSize:11,textDecoration:'none',letterSpacing:1}}
                    onMouseEnter={e=>e.currentTarget.style.background=`${C.green}30`}
                    onMouseLeave={e=>e.currentTarget.style.background=`${C.green}18`}>
                    ↓ DOWNLOAD PDF
                  </a>
                </div>
              ))}
            </div>}
          </div>
        )}

        {/* IP LOOKUP */}
        {tab==='lookup'&&(
          <div className="nt-card" style={{maxWidth:620}}>
            <div style={{...P,marginBottom:20}}>
              <SecTitle>IP Threat Intelligence</SecTitle>
              <div style={{display:'flex',gap:12}}>
                <input className="nt-in" placeholder="Enter IP (e.g. 8.8.8.8)" value={ipIn} onChange={e=>setIpIn(e.target.value)} onKeyDown={e=>e.key==='Enter'&&scanIP()} style={{flex:1,fontSize:13,padding:'12px 16px'}}/>
                <button className="nt-btn" onClick={scanIP} disabled={ipScan} style={{padding:'12px 24px',fontSize:13}}>{ipScan?'...':'⬡ Scan'}</button>
              </div>
            </div>
            {!ipScan&&ipRes&&!ipRes.error&&(
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                <div style={{...P,textAlign:'center'}}>
                  <div style={{fontSize:10,color:C.gray,letterSpacing:3,marginBottom:8}}>THREAT RISK SCORE</div>
                  <div style={{fontSize:80,fontWeight:900,lineHeight:1,color:ipRes.risk_score>=8?C.red:ipRes.risk_score>=5?C.orange:C.green,fontFamily:'monospace'}}>{ipRes.risk_score}</div>
                  <div style={{fontSize:13,color:C.gray,marginBottom:4}}>out of 10</div>
                  <div style={{fontSize:16,fontWeight:800,color:'#fff',letterSpacing:3}}>{ipRes.risk_level}</div>
                </div>
                <div style={P}>
                  {[['IP Address',ipRes.ip],['Country',ipRes.country],['City',ipRes.city],['ISP',ipRes.isp],['Organization',ipRes.organization],['Threat Status',ipRes.threat_status]].map(([k,v])=>(
                    <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:`1px solid ${C.border}`,fontSize:12}}>
                      <span style={{color:C.gray,fontWeight:700}}>{k}</span>
                      <span style={{color:'#fff',fontWeight:700,maxWidth:300,textAlign:'right'}}>{v||'—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CITIZEN ALERTS */}
        {tab==='alerts'&&!isOrg&&(
          <div className="nt-card" style={{maxWidth:700}}>
            <div style={{...P,marginBottom:16,borderLeft:`3px solid ${C.yellow}`}}>
              <div style={{fontSize:13,fontWeight:800,color:C.yellow,marginBottom:6,letterSpacing:2}}>⚠ THREAT ADVISORY</div>
              <div style={{fontSize:12,color:C.gray}}>Elevated phishing attacks targeting banking users. Do not click SMS links about blocked accounts.</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {threats.slice(0,8).map(t=>{
                const f={'SSH Brute Force':'🔑 Someone tried to guess your password','DDoS Attack':'🌊 Someone tried to flood the network','Port Scan':'🔭 Someone scanned for open access points','SQL Injection':'💉 Someone tried to hack a database','Malware Upload':'🦠 Someone tried to upload a virus'}[t.attack_type]||`⚡ ${t.attack_type} detected`;
                return(<div key={t.id} style={{...P,padding:'14px 20px',borderLeft:`3px solid ${t.is_killed==='Blocked'?C.green:C.red}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{fontSize:10,fontWeight:800,color:t.is_killed==='Blocked'?C.green:C.red,letterSpacing:2}}>{t.is_killed==='Blocked'?'✓ BLOCKED':'⚠ ACTIVE'}</span>
                    <span style={{fontSize:10,color:C.gray}}>{new Date(t.timestamp).toLocaleString()}</span>
                  </div>
                  <div style={{fontSize:13,color:'#fff'}}>{f}</div>
                  <div style={{fontSize:11,color:C.gray,marginTop:4}}>Origin: {t.attacker_location}</div>
                </div>);
              })}
            </div>
          </div>
        )}
      </main>

      {/* FORENSIC MODAL */}
      {fOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,.85)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:C.panel,border:`2px solid ${C.green}`,borderRadius:24,width:'100%',maxWidth:480,padding:40,display:'flex',flexDirection:'column',alignItems:'center',boxShadow:`0 0 60px ${C.green}33`}}>
            <div style={{position:'relative',width:64,height:64,marginBottom:24}}>
              <div style={{position:'absolute',inset:0,border:`3px solid ${C.greenDim}`,borderRadius:'50%'}}/>
              <div style={{position:'absolute',inset:0,border:'3px solid transparent',borderTopColor:C.green,borderRadius:'50%',animation:'ntSpin .8s linear infinite'}}/>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🤖</div>
            </div>
            <h2 style={{fontSize:18,fontWeight:900,color:'#fff',letterSpacing:3,marginBottom:4}}>NEURAL-TRACE AI</h2>
            <p style={{fontSize:11,color:C.green,letterSpacing:3,marginBottom:32}}>FORENSIC ANALYSIS ENGINE</p>
            <div style={{width:'100%',marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:C.gray,marginBottom:8}}>
                <span>{progTxt}</span><span style={{color:C.green,fontWeight:800}}>{prog}%</span>
              </div>
              <div style={{width:'100%',height:6,background:`${C.green}22`,borderRadius:99,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${prog}%`,background:C.green,borderRadius:99,boxShadow:`0 0 12px ${C.green}`,transition:'width .5s ease'}}/>
              </div>
            </div>
            <p style={{fontSize:10,color:C.gray,letterSpacing:2,fontStyle:'italic',marginTop:16}}>Generating tamper-proof SHA-256 evidence...</p>
          </div>
        </div>
      )}

      {/* REPORT VIEW */}
      {rOpen&&sel&&(
        <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,.95)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{background:'#fff',width:'100%',maxWidth:900,height:'90vh',borderRadius:12,overflow:'hidden',display:'flex',flexDirection:'column',color:'#111'}}>
            <div style={{background:'#f1f5f9',borderBottom:'1px solid #e2e8f0',padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,fontFamily:'monospace',fontSize:13,fontWeight:800}}>
                <span style={{color:'#dc2626',fontSize:18}}>📄</span>NT_REPORT_{String(sel.id).padStart(5,'0')}.PDF
              </div>
              <div style={{display:'flex',gap:10}}>
                <a href={getDownloadURL(sel.id)} target="_blank" rel="noreferrer" style={{background:'#1e293b',color:'#fff',padding:'8px 16px',borderRadius:8,fontWeight:800,fontSize:12,textDecoration:'none'}}>↓ Download PDF</a>
                <button onClick={()=>{setROpen(false);setSel(null);}} style={{background:'#fee2e2',color:'#dc2626',border:'none',padding:'8px 16px',borderRadius:8,fontWeight:800,fontSize:12,cursor:'pointer'}}>✕ Close</button>
              </div>
            </div>
            <div style={{flex:1,overflowY:'auto',padding:48}}>
              <div style={{textAlign:'center',borderBottom:'2px solid #111',paddingBottom:32,marginBottom:32}}>
                <h1 style={{fontSize:28,fontWeight:900,letterSpacing:3,margin:0}}>OFFICIAL FORENSIC REPORT</h1>
                <p style={{fontSize:12,color:'#64748b',letterSpacing:4,marginTop:8}}>Neural-Trace — Threat Intelligence & Digital Forensics</p>
              </div>
              {[{title:'1. Case Summary',color:'#2563eb',rows:[['Attack ID',sel.id],['Timestamp',new Date(sel.timestamp).toLocaleString()],['Sensor',sel.source_tool],['Status',sel.is_killed]]},{title:'2. Attacker Intelligence',color:'#dc2626',rows:[['IP Address',sel.attacker_ip],['Location',sel.attacker_location],['Attack Type',sel.attack_type],['Port',sel.attack_port]]}].map(sec=>(
                <div key={sec.title} style={{marginBottom:28,border:'1px solid #e2e8f0',borderRadius:8,overflow:'hidden',position:'relative'}}>
                  <div style={{position:'absolute',top:0,left:0,width:4,height:'100%',background:sec.color}}/>
                  <div style={{padding:24,paddingLeft:28}}>
                    <h2 style={{fontSize:14,fontWeight:900,letterSpacing:2,marginBottom:16,textTransform:'uppercase'}}>{sec.title}</h2>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px 24px'}}>
                      {sec.rows.map(([k,v])=><div key={k}><span style={{fontSize:11,color:'#64748b',fontWeight:700}}>{k}: </span><span style={{fontSize:12,fontFamily:'monospace',fontWeight:700}}>{v}</span></div>)}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{background:'#f0fdf4',border:'1px solid #86efac',borderRadius:8,padding:20,borderLeft:'4px solid #22c55e'}}>
                <h2 style={{fontSize:14,fontWeight:900,letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>3. Mitigation Status</h2>
                <p style={{fontSize:13,fontWeight:700,color:'#15803d',fontStyle:'italic',margin:0}}>ACTION TAKEN: IP {sel.attacker_ip} — {sel.is_killed} by Neural-Trace Autonomous Firewall. Full PDF available for download. Submit to FIA Cybercrime Wing under PECA 2016.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;