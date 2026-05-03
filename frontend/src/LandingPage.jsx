import { useState } from 'react';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY.png';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Leaflet icons
const cyberIcon = new L.DivIcon({
  className: 'custom-div-icon bg-transparent border-none',
  html: '<div style="width:14px;height:14px;background:#4ade80;border-radius:50%;box-shadow:0 0 18px 4px rgba(74,222,128,0.8);border:2px solid #040a0f;animation:pulse 2s infinite;"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

const alertIcon = new L.DivIcon({
  className: 'custom-div-icon bg-transparent border-none',
  html: '<div style="width:14px;height:14px;background:#f87171;border-radius:50%;box-shadow:0 0 18px 4px rgba(248,113,113,0.8);border:2px solid #040a0f;animation:pulse 1s infinite;"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

// Pakistan major city nodes
const nodes = [
  { pos: [24.8607, 67.0011], city: 'Karachi', zone: 'South/01', status: 'Active', threats: 3421, type: 'normal' },
  { pos: [31.5497, 74.3436], city: 'Lahore', zone: 'Punjab/01', status: 'High Alert', threats: 1892, type: 'alert' },
  { pos: [33.7294, 73.0931], city: 'Islamabad', zone: 'Capital/01', status: 'Active', threats: 987, type: 'normal' },
  { pos: [30.1798, 66.9750], city: 'Quetta', zone: 'Balochistan/01', status: 'Active', threats: 412, type: 'normal' },
  { pos: [34.0151, 71.5249], city: 'Peshawar', zone: 'KPK/01', status: 'Monitoring', threats: 653, type: 'normal' },
  { pos: [27.3998, 68.3698], city: 'Sukkur', zone: 'Sindh/02', status: 'High Alert', threats: 778, type: 'alert' },
  { pos: [32.0740, 72.6861], city: 'Faisalabad', zone: 'Punjab/02', status: 'Active', threats: 541, type: 'normal' },
  { pos: [25.3792, 68.3683], city: 'Hyderabad', zone: 'Sindh/01', status: 'Active', threats: 329, type: 'normal' },
];

// SVG Icons
const ShieldIcon = ({ size = 28, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || 'text-[#4ade80]'}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" /><path d="M12 16h.01" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80]">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80]">
    <rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" />
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80]">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
  </svg>
);

const HoneypotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80]">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" />
    <path d="M12 8v4" /><path d="M12 16h.01" />
    <path d="M8 12h8" />
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80]">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || 'text-[#4ade80]/50'}>
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const features = [
  {
    icon: <HoneypotIcon />,
    title: 'Honeypot Trap Intelligence',
    desc: 'Passive Cowrie and Dionaea traps lure and fingerprint threat actors — capturing brute-force credentials, malware binaries, and C2 callbacks before they reach production infrastructure.',
    badge: 'PASSIVE DEFENSE',
  },
  {
    icon: <NetworkIcon />,
    title: 'Scapy Flow Analytics',
    desc: 'Live packet capture engine extracts 78 network-layer features per flow — detecting DDoS amplification, botnet beaconing, and port sweeps in sub-100ms windows.',
    badge: 'REAL-TIME',
  },
  {
    icon: <BrainIcon />,
    title: 'Random Forest Classifier',
    desc: 'An AI model trained on Pakistan-specific traffic profiles achieves 99%+ accuracy across 15 attack vectors including SQLi, XSS flooding, and ICMP tunneling.',
    badge: 'AI-POWERED',
  },
  {
    icon: <ShieldIcon size={28} />,
    title: 'Automated Kill Function',
    desc: 'Upon threat confirmation, dynamic firewall rules are pushed instantly — blocking attacker IPs at perimeter before lateral movement occurs, with rollback safeguards.',
    badge: 'AUTO-RESPONSE',
  },
  {
    icon: <EyeIcon />,
    title: 'GeoIP Attribution Engine',
    desc: 'Every flagged connection is enriched with ASN data, ISP identity, and geolocation — building an evolving threat actor map of Pakistan\'s digital attack surface.',
    badge: 'FORENSIC',
  },
  {
    icon: <FileIcon />,
    title: 'Forensic PDF Reports',
    desc: 'Court-admissible case reports are auto-generated per incident — containing raw packet logs, confidence scores, attacker fingerprints, and firewall action history.',
    badge: 'LEGAL EVIDENCE',
  },
];

const pipelineSteps = [
  { label: 'Citizen Agent', sub: 'Scapy Capture' },
  { label: 'Feature Extractor', sub: '78 Attributes' },
  { label: 'AI Classifier', sub: 'Random Forest' },
  { label: 'Kill Function', sub: 'Firewall Block' },
  { label: 'Forensic Report', sub: 'PDF Evidence' },
];

function LandingPage({ onNavigate }) {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="min-h-screen bg-[#040a0f] text-white font-sans relative overflow-x-hidden">

      {/* Pulse keyframes injected inline */}
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        .fade-up { animation: fadeUp 0.7s ease both; }
      `}</style>

      {/* Background ambient */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-8%] left-[-8%] w-[55%] h-[55%] bg-[#4ade80] opacity-[0.025] blur-[140px] rounded-full" />
        <div className="absolute top-[30%] right-[-5%] w-[40%] h-[40%] bg-[#4ade80] opacity-[0.025] blur-[140px] rounded-full" />
        <div className="absolute bottom-[5%] left-[20%] w-[35%] h-[35%] bg-[#22d3ee] opacity-[0.02] blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── NAVBAR ── */}
        <nav className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#040a0f]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <img src={cifaLogo} alt="CIFA Logo" className="w-9 h-9 object-contain" />
            <div>
              <div className="text-[#4ade80] font-bold tracking-widest text-sm">THREAT INTELLIGENCE & DIGITAL FORENSICS</div>
              <div className="text-gray-420 text-[10px] font-bold tracking-wider">TIFD</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-15 text-sm font-medium text-gray-420">
            {['Mission', 'Features', 'Live Map', 'Pipeline'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-[#4ade80] transition-colors tracking-wide">{item}</a>
            ))}
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="px-5 py-2 rounded text-black bg-[#4ade80] hover:bg-[#3bca6b] font-bold transition-all text-sm shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_25px_rgba(74,222,128,0.5)]"
          >
            Access Vault
          </button>
        </nav>

        {/* ── HERO ── */}
        <section className="flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center max-w-5xl mx-auto fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] inline-block" style={{animation:'pulse 2s infinite'}} />
            <span className="text-[#4ade80] text-xs tracking-widest font-mono">SYSTEM ONLINE — MONITORING PAKISTAN</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-[#d1fae5] to-[#4ade80]">
            AI-POWERED THREAT<br />INTELLIGENCE & FORENSICS
          </h1>
          <p className="max-w-2xl text-gray-300 text-lg md:text-xl mb-10 leading-relaxed font-light">
            Defending Pakistan's critical digital infrastructure — in real time — with passive honeypot traps, live packet analytics, and automated forensic attribution.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-3.5 rounded text-black bg-[#4ade80] hover:bg-[#3bca6b] font-bold text-base shadow-[0_0_20px_rgba(74,222,128,0.35)] transition-all hover:scale-105 active:scale-95"
            >
              Activate Agent Node
            </button>
            <a href="#mission"
              className="px-8 py-3.5 rounded border border-[#4ade80]/30 text-[#4ade80] hover:border-[#4ade80] font-bold text-base transition-all hover:bg-[#4ade80]/5"
            >
              Our Mission
            </a>
          </div>
        </section>

        {/* ── STAT BAR ── */}
        <div className="border-y border-white/5 bg-[#070f14] py-5">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '99.2%', label: 'Classifier Accuracy' },
              { val: '15+', label: 'Attack Vectors Detected' },
              { val: '78', label: 'Real-Time Flow Features' },
              { val: '8', label: 'City Nodes Active' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-2xl font-extrabold text-[#4ade80] tracking-tight">{val}</div>
                <div className="text-xs text-gray-500 mt-1 tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MISSION ── */}
        <section id="mission" className="px-6 py-20 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#4ade80] text-xs font-mono tracking-widest mb-4"></div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                Securing Pakistan's Digital Frontier
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5">
                Pakistan's digital economy is growing rapidly — but so is its exposure to state-sponsored attacks, ransomware groups, and opportunistic cybercriminals targeting ISPs, government portals, and financial networks.
              </p>
              <p className="text-gray-400 leading-relaxed mb-5">
                The <span className="text-[#4ade80] font-semibold">Threat Intelligence & Digital Forensics (TIFD)</span> platform was built to close the gap between attack detection and legal accountability. We don't just block threats — we <span className="text-white font-semibold">identify, document, and attribute</span> them with court-admissible precision.
              </p>
              <p className="text-gray-400 leading-relaxed">
                By deploying citizen agent nodes across major Pakistani cities, we build a collaborative, crowd-powered defensive mesh — creating a national threat picture no single ISP or agency could achieve alone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Detect', desc: 'Real-time ML-powered anomaly detection on live packet flows.' },
                { title: 'Respond', desc: 'Automated firewall rules kill malicious sessions in milliseconds.' },
                { title: 'Attribute', desc: 'GeoIP + ASN fingerprinting traces attacks to source nodes.' },
                { title: 'Report', desc: 'Auto-generated PDF case files suitable for law enforcement.' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-[#0a141b] border border-white/8 rounded-xl p-5 hover:border-[#4ade80]/30 transition-colors">
                  <div className="text-[#4ade80] font-bold text-lg mb-2">{title}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVE MAP ── */}
        <section id="live-map" className="px-6 py-12 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4ade80]" style={{animation:'pulse 2s infinite'}} />
            <h2 className="text-xl font-bold tracking-widest text-[#4ade80] uppercase font-mono">Live Threat Map — Pakistan</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* Map */}
            <div className="flex-1 h-[460px] bg-[#0a141b] rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(74,222,128,0.08)] relative">
              <MapContainer
                center={[30.3753, 69.3451]}
                zoom={5}
                scrollWheelZoom={false}
                className="w-full h-full"
                style={{ zIndex: 0 }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {nodes.map((node) => (
                  <Marker
                    key={node.city}
                    position={node.pos}
                    icon={node.type === 'alert' ? alertIcon : cyberIcon}
                    eventHandlers={{ click: () => setActiveNode(node) }}
                  >
                    <Popup>
                      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#111', minWidth: '160px' }}>
                        <strong style={{ fontSize: '13px' }}>{node.city}</strong><br />
                        <span>Zone: {node.zone}</span><br />
                        <span style={{ color: node.status === 'High Alert' ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
                          ● {node.status}
                        </span><br />
                        <span>Threats Blocked: <strong>{node.threats.toLocaleString()}</strong></span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 z-[500] bg-[#040a0f]/90 border border-white/10 rounded-lg px-4 py-3 flex gap-5 text-xs font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  <span className="text-gray-400">Active Node</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f87171] shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                  <span className="text-gray-400">High Alert</span>
                </span>
              </div>
            </div>

            {/* Node list */}
            <div className="w-full lg:w-64 flex flex-col gap-2 overflow-y-auto max-h-[460px]">
              {nodes.map((node) => (
                <div
                  key={node.city}
                  onClick={() => setActiveNode(node)}
                  className={`bg-[#0a141b] border rounded-xl px-4 py-3 cursor-pointer transition-all hover:border-[#4ade80]/40 ${
                    activeNode?.city === node.city ? 'border-[#4ade80]/60 bg-[#0f1f17]' : 'border-white/8'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-sm">{node.city}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      node.status === 'High Alert'
                        ? 'bg-red-900/40 text-red-400 border border-red-500/30'
                        : node.status === 'Monitoring'
                        ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-500/30'
                        : 'bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                  <div className="text-gray-500 text-[11px] font-mono">Zone: {node.zone}</div>
                  <div className="text-[#4ade80] text-xs mt-1 font-mono">{node.threats.toLocaleString()} threats blocked</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="px-6 py-16 max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="text-[#4ade80] text-xs font-mono tracking-widest mb-3"></div>
            <h2 className="text-3xl font-extrabold text-white">How TIFD Protects the Network</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc, badge }) => (
              <div
                key={title}
                className="bg-[#0a141b] border border-white/8 rounded-2xl p-6 hover:border-[#4ade80]/30 transition-all group hover:bg-[#0d1c15]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#4ade80]/10 rounded-xl flex items-center justify-center group-hover:bg-[#4ade80]/15 transition-colors">
                    {icon}
                  </div>
                  <span className="text-[9px] font-mono tracking-widest px-2 py-1 rounded-full bg-[#4ade80]/8 text-[#4ade80] border border-[#4ade80]/15">
                    {badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#4ade80] transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PIPELINE ── */}
        <section id="pipeline" className="px-6 py-16 max-w-6xl mx-auto w-full mb-10">
          <div className="text-center mb-12">
            <div className="text-[#4ade80] text-xs font-mono tracking-widest mb-3"></div>
            <h2 className="text-3xl font-extrabold text-white">From Packet to Evidence</h2>
          </div>

          <div className="bg-[#0a141b] border border-white/8 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-10 h-10 rounded-full border-2 border-[#4ade80]/40 bg-[#4ade80]/5 flex items-center justify-center mb-3 font-bold text-[#4ade80] text-sm">
                      {i + 1}
                    </div>
                    <div className="font-bold text-white text-sm mb-1">{step.label}</div>
                    <div className="text-[#4ade80] text-[10px] font-mono">{step.sub}</div>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <ArrowRightIcon className="hidden md:block text-[#4ade80]/30 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
              <div className="bg-[#060e13] rounded-xl p-4">
                <div className="text-[#4ade80] font-bold mb-1 text-xs font-mono">DETECTION LATENCY</div>
                <div className="text-white font-bold text-2xl">{'<'} 100ms</div>
                <div className="text-xs mt-1">From first packet to firewall block</div>
              </div>
              <div className="bg-[#060e13] rounded-xl p-4">
                <div className="text-[#4ade80] font-bold mb-1 text-xs font-mono">FALSE POSITIVE RATE</div>
                <div className="text-white font-bold text-2xl">0.3%</div>
                <div className="text-xs mt-1">Validated on Pakistan ISP traffic data</div>
              </div>
              <div className="bg-[#060e13] rounded-xl p-4">
                <div className="text-[#4ade80] font-bold mb-1 text-xs font-mono">REPORT GENERATION</div>
                <div className="text-white font-bold text-2xl">Instant</div>
                <div className="text-xs mt-1">Auto-generated per incident with full logs</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="mt-auto px-8 py-6 border-t border-white/5 bg-[#040a0f] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2 mb-3 md:mb-0">
            <span>SYSTEM STATUS: <span className="text-[#4ade80]">MONITORING PAKISTAN</span></span>
            <span className="mx-2">|</span>
            <span className="flex items-center gap-1.5">
              FORENSIC NODE: ACTIVE
              <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.8)]" style={{animation:'pulse 2s infinite'}} />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src={cifaLogo} alt="" className="w-5 h-5 object-contain opacity-50" />
            <span>&copy; 2026 TIFD — Threat Intelligence &amp; Digital Forensics. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;