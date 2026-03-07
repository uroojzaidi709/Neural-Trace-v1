import React, { useState } from 'react';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY (1).png';

const UserDashboard = ({ onLogout }) => {
  // Navigation State to switch between citizen portal modules
  const [activeTab, setActiveTab] = useState('intelligence');

  const menuItems = [
    { id: 'intelligence', label: 'Intelligence Dashboard', icon: '🏠' },
    { id: 'report', label: 'Report Cyber Scam', icon: '🚨' },
    { id: 'vault', label: 'Evidence Vault', icon: '🔐' },
    { id: 'status', label: 'My Reports / Case Status', icon: '📊' },
    { id: 'alerts', label: 'Threat Alerts', icon: '⚠️' },
    { id: 'guidelines', label: 'Security Guidelines', icon: '🛡️' },
    { id: 'feedback', label: 'Digital Suggestion Box', icon: '📥' },
  ];

  return (
    <div className="min-h-screen bg-[#06141d] flex text-slate-300 font-sans">
      
      {/* --- CITIZEN SIDEBAR NAVIGATION --- */}
      <div className="w-72 bg-[#0b1e29] border-r border-cyan-500/20 p-6 flex flex-col shadow-2xl shrink-0">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <img 
            src={cifaLogo} 
            alt="CIFA Logo" 
            className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
          />
          <div>
            <h2 className="text-cyan-400 font-black tracking-widest text-xl italic leading-none">CIFA</h2>
            <p className="text-[8px] uppercase text-cyan-600 font-bold tracking-widest mt-1">Citizen Safety Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 p-3.5 rounded-xl transition-all border ${
                activeTab === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                : 'border-transparent hover:bg-white/5 text-slate-500'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-bold text-xs uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout} 
          className="mt-6 w-full border border-red-500/30 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500/10 transition-all uppercase text-[10px] tracking-widest"
        >
          Logout Session
        </button>
      </div>

      {/* --- MAIN PORTAL CONTENT AREA --- */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
              {activeTab === 'intelligence' ? 'Home Intelligence' : activeTab.replace('-', ' ')}
            </h1>
            <div className="h-1.5 w-24 bg-cyan-500 mt-2 rounded-full"></div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-cyan-500/60 uppercase">CIFA | Karachi Unit</p>
            <p className="text-[10px] text-slate-500 italic uppercase tracking-widest">Secure Citizen Session</p>
          </div>
        </header>

        {/* Dynamic View Switcher */}
        <div className="bg-[#0b1e29]/40 border border-cyan-500/10 rounded-3xl p-8 shadow-inner min-h-[75vh]">
          
          {/* VIEW 1: Intelligence Dashboard */}
          {activeTab === 'intelligence' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-gradient-to-r from-cyan-900/20 to-transparent p-8 rounded-2xl border border-cyan-500/20">
                <h2 className="text-2xl font-bold text-white mb-2">Karachi Cyber Safety Overview</h2>
                <p className="text-slate-400 max-w-2xl leading-relaxed">Cyber Investigation Forensics Agency is currently monitoring digital channels for phishing and OTP scams. Your reporting helps secure the Karachi network.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#06141d] p-6 rounded-2xl border border-green-500/20">
                  <p className="text-[10px] uppercase font-bold text-green-500 tracking-widest">Personal Safety Status</p>
                  <h3 className="text-2xl font-black text-white mt-1 uppercase">Protected</h3>
                </div>
                <div className="bg-[#06141d] p-6 rounded-2xl border border-cyan-500/20">
                  <p className="text-[10px] uppercase font-bold text-cyan-500 tracking-widest">Active Threats (Karachi)</p>
                  <h3 className="text-2xl font-black text-white mt-1">14 High Risk</h3>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Report Cyber Scam (YOUR ORIGINAL FORM - UNTOUCHED) */}
          {activeTab === 'report' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#0b1e29] border-t-4 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)] p-6 mb-1 rounded-t-lg">
                <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Scam Report Portal</h1>
                <p className="text-sm text-slate-400 mt-1">Submit forensic data for Karachi Unit analysis. Fields with <span className="text-red-400">*</span> are mandatory.</p>
              </div>

              <form className="bg-[#0b1e29] shadow-2xl p-8 rounded-b-lg border border-cyan-500/10 space-y-8">
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-cyan-500/80 mb-2 uppercase tracking-wider">Scam Category <span className="text-red-400">*</span></label>
                  <select className="bg-[#06141d] border border-cyan-500/20 rounded-xl p-3 text-white focus:border-cyan-400 outline-none cursor-pointer transition">
                    <option className="bg-[#0b1e29]">Select Category</option>
                    <option className="bg-[#0b1e29]">Bank / OTP Scam</option>
                    <option className="bg-[#0b1e29]">Lottery / BISP Fraud</option>
                    <option className="bg-[#0b1e29]">Phishing Email</option>
                    <option className="bg-[#0b1e29]">Other Cyber Crime</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold text-cyan-500/80 mb-2 uppercase tracking-wider">Message Content <span className="text-red-400">*</span></label>
                  <textarea 
                    placeholder="Paste the scam message, email headers, or link details here..." 
                    className="bg-[#06141d] border border-cyan-500/20 rounded-xl p-4 h-48 text-white focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] outline-none transition resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold text-cyan-500/80 mb-2 uppercase tracking-wider">Evidence Upload (Optional)</label>
                  <div className="relative group">
                    <input type="file" className="hidden" id="evidence-upload" accept="image/*,.pdf,.doc" />
                    <label htmlFor="evidence-upload" className="flex flex-col items-center justify-center w-full border-2 border-dashed border-cyan-500/20 rounded-xl p-6 bg-[#06141d] hover:border-cyan-400/50 hover:bg-[#0b1e29] cursor-pointer transition-all group">
                      <span className="text-cyan-500/60 group-hover:text-cyan-400 text-sm mb-1 font-semibold">Click to upload screenshot or document</span>
                      <span className="text-[10px] text-slate-500 italic">PNG, JPG, or PDF (Max 5MB)</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold text-cyan-500/80 mb-2 uppercase tracking-wider">Contact Info (Optional)</label>
                  <input type="text" placeholder="Phone number or Email for follow-up" className="bg-[#06141d] border border-cyan-500/20 rounded-xl p-3 text-white focus:border-cyan-400 outline-none transition" />
                </div>

                <div className="flex items-start pt-2">
                  <input type="checkbox" className="mt-1 h-4 w-4 bg-[#06141d] border-cyan-500/40 rounded text-cyan-500 focus:ring-cyan-500 cursor-pointer" />
                  <label className="ml-3 text-sm font-medium text-slate-400 leading-relaxed">
                    I affirm that the data provided is accurate for forensic investigation purposes.
                  </label>
                </div>

                <div className="flex justify-center pt-4">
                  <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all active:scale-95 text-lg uppercase tracking-[0.2em]">
                    Initiate Trace
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW 3: Evidence Vault */}
          {activeTab === 'vault' && (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-cyan-500/10 rounded-3xl animate-fadeIn">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Secure Evidence Vault</h3>
              <p className="text-slate-500 text-sm mb-8">View and manage the forensic data you have submitted to CIFA.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="h-32 w-32 bg-[#06141d] border border-cyan-500/10 rounded-xl flex items-center justify-center text-xs italic text-cyan-800">No Assets Found</div>
              </div>
            </div>
          )}

          {/* VIEW 4: My Reports / Case Status */}
          {activeTab === 'status' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#06141d] p-6 rounded-2xl border border-cyan-500/10 flex justify-between items-center group hover:border-cyan-500/30 transition-all">
                <div>
                  <h4 className="font-bold text-white tracking-widest uppercase">CASE: NC-709-X01</h4>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase">Type: Bank Fraud | Filed: March 08, 2026</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full border border-cyan-500/30 font-black uppercase tracking-widest">
                    Forensic Trace Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5-7: Placeholders for Alerts, Guidelines, and Feedback */}
          {['alerts', 'guidelines', 'feedback'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full py-20 opacity-40 animate-pulse">
              <div className="text-6xl mb-4">📡</div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-500">
                {activeTab.replace('-', ' ')} Feed
              </h2>
              <p className="text-sm italic mt-2">Connecting to Secure CIFA Broadcast Node...</p>
            </div>
          )}

        </div>
        
        <p className="mt-8 text-center text-cyan-500/30 text-[10px] uppercase font-black tracking-[0.4em]">
          CIFA | Karachi Division Secure Session
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;