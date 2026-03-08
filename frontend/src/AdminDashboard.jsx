import React, { useState } from 'react';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('command');

  const menuItems = [
    { id: 'command', label: 'Central Command', icon: '📡' },
    { id: 'cases', label: 'Forensic Cases', icon: '📁' },
    { id: 'trace', label: 'Digital Trace', icon: '🔍' },
    { id: 'metadata', label: 'Metadata Profiler', icon: '🆔' },
    { id: 'locker', label: 'Evidence Locker', icon: '🔐' },
    { id: 'reports', label: 'Intelligence Reports', icon: '📄' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'audit', label: 'Audit Logs', icon: '📜' },
  ];

  const recentThreats = [
    { id: 1, type: "Bank Scam", ip: "192.168.10.45", mac: "00-B0-D0-63-C2-26", device: "Samsung S21", risk: "98% CRITICAL", os: "Android 13", imei: "3582410XXXXXXXX" },
    { id: 2, type: "OTP Fraud", ip: "110.33.121.5", mac: "44-2C-05-76-21-99", device: "iPhone 13", risk: "85% HIGH", os: "iOS 17.2", imei: "3599281XXXXXXXX" },
  ];

  return (
    <div className="min-h-screen bg-[#06141d] flex text-slate-300 font-sans">
      <style>{`
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scan { animation: scan 4s linear infinite; }
        @keyframes mapPulse { 0% { opacity: 0.4; } 50% { opacity: 0.8; } 100% { opacity: 0.4; } }
        .animate-mapPulse { animation: mapPulse 4s ease-in-out infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-72 bg-[#0b1e29] border-r border-cyan-500/20 p-6 flex flex-col shadow-2xl shrink-0">
        <div className="mb-10 px-2">
          <h2 className="text-cyan-400 font-black tracking-widest text-2xl italic">CIFA</h2>
          <p className="text-[10px] uppercase text-cyan-600 font-bold tracking-[0.2em]">Forensic Unit Karachi</p>
        </div>
        
        <nav className="flex-1 space-y-6 overflow-y-auto pr-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full flex flex-col items-start group transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-1">
                <span className={`text-lg transition-colors ${activeTab === item.id ? 'text-cyan-400' : 'group-hover:text-cyan-300 text-slate-500'}`}>
                  {item.icon}
                </span>
                <span className={`font-bold text-xs uppercase tracking-wider transition-colors ${activeTab === item.id ? 'text-cyan-400' : 'group-hover:text-white text-slate-500'}`}>
                  {item.label}
                </span>
              </div>
              <div className={`h-[2px] rounded-full transition-all duration-300 ${
                activeTab === item.id 
                ? 'w-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
                : 'w-0 group-hover:w-1/2 bg-cyan-500/50'
              }`}></div>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout} 
          className="mt-6 w-full border border-red-500/30 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500/10 transition-all uppercase text-[10px] tracking-widest active:scale-95"
        >
          Terminate Session
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
              {activeTab === 'command' ? 'Immediate Threat Monitor' : activeTab.replace('-', ' ')}
            </h1>
            <div className="h-1.5 w-24 bg-cyan-500 mt-2 rounded-full"></div>
          </div>
          <div className="text-right">
            <span className="bg-cyan-500/10 text-cyan-400 text-[10px] px-3 py-1 rounded-full border border-cyan-500/20 font-bold uppercase tracking-widest">
              Live Secure Link: Active
            </span>
          </div>
        </header>

        <div className="bg-[#0b1e29]/40 border border-cyan-500/10 rounded-3xl p-8 shadow-inner min-h-[75vh]">
          
          {/* VIEW: Central Command */}
          {activeTab === 'command' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-[#06141d] p-6 rounded-2xl border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  <p className="text-[10px] uppercase font-bold text-cyan-500/60 tracking-widest">Total Scams Detected</p>
                  <h3 className="text-4xl font-black text-white mt-1">1,452 +</h3>
                </div>
                <div className="bg-[#06141d] p-6 rounded-2xl border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  <p className="text-[10px] uppercase font-bold text-cyan-500/60 tracking-widest">Active Investigations</p>
                  <h3 className="text-4xl font-black text-white mt-1">17</h3>
                </div>
              </div>

              <div className="h-[550px] bg-[#06141d] rounded-2xl border border-cyan-500/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-[300px] h-[300px] border border-cyan-500 rounded-full animate-pulse"></div>
                  <div className="absolute w-[500px] h-[500px] border border-cyan-500/40 rounded-full"></div>
                  <div className="absolute w-full h-[2px] bg-cyan-400/30 animate-scan"></div>
                </div>

                <div className="z-10 w-full max-w-xl p-8 transition-all duration-700 group-hover:scale-105">
                  <svg viewBox="0 0 800 800" className="w-full h-full drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M380 150 L420 180 L460 170 L500 210 L520 280 L580 320 L600 400 L550 480 L500 520 L480 600 L420 650 L350 630 L280 680 L200 650 L150 580 L180 500 L120 450 L100 380 L150 300 L220 250 L280 280 L320 200 Z"
                      stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-mapPulse"
                    />
                    <circle cx="210" cy="620" r="8" fill="#ef4444" className="animate-ping" />
                    <circle cx="210" cy="620" r="4" fill="#ef4444" />
                    <circle cx="530" cy="420" r="3" fill="#06b6d4" opacity="0.6" />
                    <circle cx="480" cy="280" r="3" fill="#06b6d4" opacity="0.6" />
                    <text x="120" y="650" fill="#ef4444" className="text-[12px] font-black font-mono tracking-tighter">NODE_KARACHI_HUB</text>
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {/* VIEW: Digital Trace*/}
          {activeTab === 'trace' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-cyan-400 font-bold uppercase text-sm tracking-widest mb-4">Network Trace Analysis Hub</h3>
              <table className="w-full text-left text-xs">
                <thead className="text-cyan-500 uppercase border-b border-cyan-500/10">
                  <tr>
                    <th className="pb-4">Target Type</th>
                    <th className="pb-4">Scammer IP Address</th>
                    <th className="pb-4">Hardware Info</th>
                    <th className="pb-4 text-right">Risk Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-500/5">
                  {recentThreats.map(threat => (
                    <tr key={threat.id} className="hover:bg-cyan-500/5 transition-colors group cursor-crosshair">
                      <td className="py-6 font-semi-bold text-white uppercase tracking-wider">{threat.type}</td>
                      <td className="py-6 text-cyan-400 font-mono tracking-widest semi-bold">{threat.ip}</td>
                      <td className="py-6 text-slate-400 font-semibold">{threat.device} <span className="text-[10px] text-slate-600 block">{threat.os}</span></td>
                      <td className="py-6 text-right text-red-500 font-black tracking-widest">{threat.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VIEW: Metadata Profiler */}
          {activeTab === 'metadata' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {recentThreats.map(threat => (
                <div key={threat.id} className="bg-[#06141d] p-6 rounded-2xl border border-cyan-500/20 space-y-4 hover:border-cyan-400/40 transition-all shadow-lg">
                  <div className="flex justify-between items-start border-b border-cyan-500/10 pb-4">
                    <h3 className="text-cyan-400 font-bold uppercase tracking-widest">{threat.device}</h3>
                    <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-1 rounded font-black">TRACED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-500 uppercase font-bold text-[9px]">MAC Address</p>
                      <p className="font-mono text-cyan-200">{threat.mac}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 uppercase font-bold text-[9px]">OS Version</p>
                      <p className="text-white">{threat.os}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 uppercase font-bold text-[9px]">IMEI / Device ID</p>
                      <p className="text-white font-mono">{threat.imei}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 uppercase font-bold text-[9px]">Network Node</p>
                      <p className="text-white font-mono">{threat.ip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fallback for other tabs */}
          {!['command', 'trace', 'metadata'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full py-20 opacity-50">
              <div className="text-6xl mb-4 animate-pulse">⚡</div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-500">
                {activeTab.replace('-', ' ')} Module
              </h2>
              <p className="text-sm italic mt-2">Awaiting Secure Node Sync...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;