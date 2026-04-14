import { useState } from 'react';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Leaflet icon for cyber dots
const cyberIcon = new L.DivIcon({
  className: 'custom-div-icon bg-transparent border-none',
  html: '<div class="w-4 h-4 bg-[#4ade80] rounded-full shadow-[0_0_20px_rgba(74,222,128,1)] animate-pulse border-2 border-[#040a0f]"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// Inline SVGs for premium look
const ShieldIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "text-[#4ade80]"}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
);

const AnalyticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80]">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
    <path d="M8 11.5 10 13l2-3"></path>
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80]">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
    <path d="M6.002 6.5A3 3 0 0 1 5.603 5.125"></path>
    <path d="M11.581 15.5a5.81 5.81 0 0 1-5.627 5.033"></path>
    <path d="M12.419 15.5a5.81 5.81 0 0 0 5.627 5.033"></path>
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "text-gray-500"}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#040a0f] text-white selection:bg-[#4ade80]/30 font-sans relative overflow-x-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4ade80] opacity-[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-[#4ade80] opacity-[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full min-h-screen">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#040a0f]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <img src={cifaLogo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold tracking-wider text-[#4ade80]">Threat Intelligence & Digital Forensics</span>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-300">
            <button className="hover:text-[#4ade80] transition-colors">Mission</button>
            <button className="hover:text-[#4ade80] transition-colors">Features</button>
            <button className="hover:text-[#4ade80] transition-colors">Live Map</button>
            <button className="hover:text-[#4ade80] transition-colors">Forensic Vault</button>
          </div>

          <div>
            <button
              onClick={() => onNavigate('login')}
              className="px-6 py-2.5 rounded text-black bg-[#4ade80] hover:bg-[#3bca6b] font-bold transition-all text-sm shadow-[0_0_15px_rgba(74,222,128,0.3)]"
            >
              Initiate Node Security / Access Vault
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a3f0c1]">
            AI-POWERED NETWORK INTELLIGENCE<br />
            <span className="text-[#4ade80] drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]">& REAL-TIME THREAT NEUTRALIZATION</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl mb-10 leading-relaxed font-light">
            Defending Karachi's digital infrastructure with passive honeypot traps, live packet analytics, and automated forensic attribution.
          </p>

          <button
            onClick={() => onNavigate('dashboard')}
            className="px-8 py-4 rounded text-black bg-[#4ade80] hover:bg-[#3bca6b] font-bold text-lg shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            Activate Agent Node & Monitor Traffic
          </button>
        </main>

        {/* Live Map Section */}
        <section id="live-map" className="px-6 py-6 max-w-6xl mx-auto w-full mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></div>
            <h2 className="text-xl font-bold tracking-widest text-[#4ade80] uppercase">Live Threat Intelligence Map</h2>
          </div>
          <div className="h-[400px] w-full bg-[#0a141b] rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(74,222,128,0.1)] relative z-10">
            <MapContainer
              center={[24.8607, 67.0011]}
              zoom={12}
              scrollWheelZoom={false}
              className="w-full h-full z-0"
              style={{ zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              <Marker position={[24.8607, 67.0011]} icon={cyberIcon}>
                <Popup>
                  <div className="text-xs text-gray-800">
                    <strong>Node:</strong> Saddar / Central <br />
                    <span className="text-green-600 font-bold">Status: Active</span><br />
                    <strong>Threats Blocked:</strong> 1,245
                  </div>
                </Popup>
              </Marker>
              <Marker position={[24.9100, 67.0800]} icon={cyberIcon}>
                <Popup>
                  <div className="text-xs text-gray-800">
                    <strong>Node:</strong> Gulshan-e-Iqbal <br />
                    <span className="text-red-500 font-bold">Status: High Alert</span>
                  </div>
                </Popup>
              </Marker>
              <Marker position={[24.8100, 67.0300]} icon={cyberIcon}>
                <Popup>
                  <div className="text-xs text-gray-800">
                    <strong>Node:</strong> Clifton Area <br />
                    <span className="text-green-600 font-bold">Status: Active</span>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-12 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex gap-4 group">
              <div className="mt-1">
                <ShieldIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4ade80] transition-colors">Honeypot Trap Intelligence</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Deploy Cowrie and Dionaea traps to neutralize brute-force and malware droppers before they touch your core network.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 group">
              <div className="mt-1">
                <AnalyticsIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4ade80] transition-colors">Scapy Flow Analytics</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Leverage Scapy engine to extract 78 live network features, detecting DDoS, Botnets, and PortScans in milliseconds.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 group">
              <div className="mt-1">
                <BrainIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4ade80] transition-colors">Random Forest Classification</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our AI Classifier achieves 99% accuracy in categorizing over 15 distinct network attack vectors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Flowchart / Reporting Section */}
        <section className="px-6 py-12 max-w-6xl mx-auto w-full mb-16">
          <div className="bg-[#0a141b] border border-white/10 rounded-2xl p-8 flex flex-col lg:flex-row gap-10 items-center">

            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold text-white mb-8">Closing the Loop: Detection to Attribution</h2>

              <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <div className="bg-[#122621] border border-[#4ade80]/30 rounded px-4 py-6 text-center w-full md:w-auto flex-1 hover:border-[#4ade80] transition-colors shadow-lg">
                  <div className="font-bold text-white text-sm">Citizen Agent</div>
                  <div className="text-[#4ade80] text-xs mt-1">(Scapy)</div>
                </div>

                <ArrowRightIcon className="hidden md:block" />

                <div className="bg-[#122621] border border-[#4ade80]/30 rounded px-4 py-6 text-center w-full md:w-auto flex-1 hover:border-[#4ade80] transition-colors shadow-lg">
                  <div className="font-bold text-white text-sm">AI Classifier</div>
                  <div className="text-[#4ade80] text-xs mt-1">(Random Forest)</div>
                </div>

                <ArrowRightIcon className="hidden md:block" />

                <div className="bg-[#122621] border border-[#4ade80]/30 rounded px-4 py-6 text-center w-full md:w-auto flex-1 hover:border-[#4ade80] transition-colors shadow-lg">
                  <div className="font-bold text-white text-sm">Kill Function</div>
                  <div className="text-[#4ade80] text-xs mt-1">(Firewall Block)</div>
                </div>

                <ArrowRightIcon className="hidden md:block" />

                <div className="bg-[#122621] border border-[#4ade80]/30 rounded px-4 py-6 text-center w-full md:w-auto flex-1 hover:border-[#4ade80] transition-colors shadow-lg">
                  <div className="font-bold text-white text-sm">Forensic PDF Report</div>
                  <div className="text-[#4ade80] text-xs mt-1">(Legal Evidence)</div>
                </div>
              </div>
            </div>

            {/* PDF Report Mockup */}
            <div className="w-full lg:w-[35%] bg-white p-5 rounded text-black text-xs shadow-[0_0_20px_rgba(255,255,255,0.05)] hidden md:block">
              <div className="border-b border-gray-300 pb-3 mb-3 flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <ShieldIcon className="text-black w-6 h-6 inline-block" />
                  <span className="font-black text-[12px] tracking-tight">TIFD</span>
                </div>
                <div className="text-[9px] text-gray-500 text-right leading-relaxed font-mono mt-1">
                  TIMESTAMP: 2026-04-14<br />
                  FORENSIC REPORT
                </div>
              </div>
              <h4 className="font-bold text-[13px] mb-4 border-b border-black pb-1 inline-block">Case Report: #INT-2026-0045</h4>
              <div className="mb-4 space-y-2">
                <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-1">
                  <span className="font-bold text-gray-700">Attacker IP:</span>
                  <span className="col-span-2 font-mono text-[11px]">124.223.x.x (Masked)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-1">
                  <span className="font-bold text-gray-700">Target Node:</span>
                  <span className="col-span-2">Karachi/South/04</span>
                </div>
                <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-1">
                  <span className="font-bold text-gray-700">Attack Vector:</span>
                  <span className="col-span-2 text-red-600 font-bold bg-red-50 inline-block px-1 rounded">DDoS Amplification</span>
                </div>
                <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-1">
                  <span className="font-bold text-gray-700">Confidence:</span>
                  <span className="col-span-2">99.8% (Random Forest Model)</span>
                </div>
              </div>
              <div className="bg-gray-100 border-l-2 border-gray-400 p-2 mt-4 text-[10px] text-gray-600 italic">
                Detailed Scapy packet capture logs attached in secondary appendix. Firewall rule applied automatically.
              </div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto px-8 py-6 border-t border-white/5 bg-[#040a0f] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span>SYSTEM STATUS: <span className="text-[#4ade80]">MONITORING TRAFFIC</span></span>
            <span className="mx-2">|</span>
            <span className="flex items-center">
              FORENSIC NODE: ACTIVE
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse ml-2 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
            </span>
          </div>
          <div>
            &copy; 2026 Threat Intelligence & Digital Forensics. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;