import { useState } from 'react';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY (1).png';

function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#06141d] text-white selection:bg-cyan-500/30">
      {/* 1. TOP HEADER */}
      <nav className="flex items-center justify-between px-12 py-6 bg-[#0b1e29]/50 backdrop-blur-md sticky top-0 z-50 border-b border-cyan-900/30">
        <div className="flex items-center gap-2">
          <img src={cifaLogo} alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-cyan-400">Cyber Investigation Forensics Agency</span>
        </div>
        
        <div className="hidden md:flex gap-15 text-sm font-bold text-slate-400">
          <button className="hover:text-cyan-400 transition-colors">Home</button>
          <button className="hover:text-cyan-400 transition-colors">About</button>
          <button className="hover:text-cyan-400 transition-colors">Features</button>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('login')} 
            className="px-5 py-2 rounded-lg border border-cyan-500/50 text-cyan-400 font-bold hover:bg-cyan-500/10 transition-all text-sm"
          >
            Login
          </button>
          <button 
            onClick={() => onNavigate('register')} 
            className="px-5 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-500 shadow-lg shadow-cyan-900/20 transition-all text-sm"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          AI-Powered Cyber Scam Detection <br />
          <span className="text-cyan-500">& Forensic Intelligence</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-12">
          Protecting citizens and empowering agencies with real-time scam analysis and digital forensic tools.
        </p>

        {/* 3. TWO-WAY PORTAL CARDS */}
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto mt-12 px-4">
          
          {/* Card A: Citizen Portal */}
          <div className="flex-1 bg-[#0b1e29] border-2 border-cyan-500/30 p-10 rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <h3 className="text-2xl font-bold mb-4">Report a Scam</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Victim of a scam? Report it now for AI analysis and help us track the scammers.
            </p>
            <button 
              onClick={() => onNavigate('register')}
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all active:scale-95"
            >
              Register to Report
            </button>
          </div>

          {/* Card B: Agency Portal */}
          <div className="flex-1 bg-[#0b1e29] border-2 border-cyan-500/30 p-10 rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <h3 className="text-2xl font-bold mb-4">Agency Access</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Secure login for authorized investigators and cybercrime agencies to access forensic data.
            </p>
            <button 
              onClick={() => onNavigate('login')}
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all active:scale-95"
            >
              Access Agency Vault
            </button>
          </div>
        </div>
      </header>

      {/* --- NEW ABOUT SECTION --- */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-cyan-900/20">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">
              Mission Statement
            </h2>
            <h3 className="text-3xl font-bold mb-6">
              Empowering Digital <span className="text-cyan-400">Security</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              CIFA is a specialized forensic gateway designed to support the Karachi Unit in combating digital fraud. By utilizing AI-driven analysis, we provide a seamless bridge between citizen reporting and professional investigation.
            </p>
            
            {/* Feature Highlights */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-300 font-bold">
                <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                Advanced AI Scam Verification
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300 font-bold">
                <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                Secure Evidence Management
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300 font-bold">
                <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                Cross-Agency Forensic Collaboration
              </li>
            </ul>
          </div>

          {/* Right Side: Visual Shield Placeholder */}
          <div className="md:w-1/2 w-full aspect-video bg-[#0b1e29] border-2 border-cyan-500/20 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center group transition-all hover:border-cyan-400/40">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50"></div>
            <div className="relative z-10 text-center p-8">
              <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">🛡️</div>
              <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mt-2">
                Secure Forensic Node: Active
              </p>
            </div>
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
        </div>
      </section>
      {/* FEATURES SECTION */}
        <section id="features" className="py-24 px-6 max-w-6xl mx-auto border-t border-cyan-900/20">
          <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Core Capabilities</h2>
          <h3 className="text-4xl font-bold">Advanced Forensic <span className="text-cyan-400">Tools</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {/* Feature 1: IP Detection */}
       <div className="bg-[#0b1e29] border border-cyan-500/10 p-8 rounded-3xl hover:border-cyan-400/40 transition-all group">
      <div className="text-3xl mb-4">📍</div>
      <h4 className="text-xl font-bold mb-3 text-cyan-400">IP Trace Analytics</h4>
      <p className="text-slate-400 text-sm leading-relaxed">
        Our system automatically identifies and logs the IP addresses of potential scammers, providing a geographical footprint for investigators.
      </p>
    </div>

    {/* Feature 2: Message Analysis */}
    <div className="bg-[#0b1e29] border border-cyan-500/10 p-8 rounded-3xl hover:border-cyan-400/40 transition-all group">
      <div className="text-3xl mb-4">🔍</div>
      <h4 className="text-xl font-bold mb-3 text-cyan-400">AI Message Screening</h4>
      <p className="text-slate-400 text-sm leading-relaxed">
        Using neural network analysis, we scan incoming messages and emails to detect fraudulent patterns and phishing attempts in real-time.
      </p>
    </div>

    {/* Feature 3: Rapid Reporting */}
    <div className="bg-[#0b1e29] border border-cyan-500/10 p-8 rounded-3xl hover:border-cyan-400/40 transition-all group">
      <div className="text-3xl mb-4">📋</div>
      <h4 className="text-xl font-bold mb-3 text-cyan-400">Rapid Forensic Reports</h4>
      <p className="text-slate-400 text-sm leading-relaxed">
        Once a report is submitted, our AI generates a comprehensive forensic summary and risk assessment in just a matter of hours.
      </p>
    </div>

  </div>

  {/* Technical Badge */}
  <div className="mt-16 flex justify-center">
    <div className="inline-flex items-center gap-4 px-6 py-3 bg-cyan-950/30 border border-cyan-500/20 rounded-full">
      <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/80">
        System Status: Monitoring Neural Network Traffic
      </span>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="py-12 text-center text-cyan-400 text-s semi-bold">
        Cyber Intelligence and Forensic Agency | Karachi Unit
      </footer>
    </div>
  );
}

export default LandingPage;