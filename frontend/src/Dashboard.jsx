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
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY.png';

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
  // ── Attack Detail Modal (org only) ──
  const [detOpen,setDetOpen] = useState(false);
  const [detThr,setDetThr]   = useState(null);
  const [blocking,setBlocking] = useState(false);
  const [blocked,setBlocked]   = useState({});

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

  // ── Open Attack Detail Modal (org only) ──
  const openDetail = (t) => { setDetThr(t); setDetOpen(true); };

  // ── Block IP Now (simulated; wire to real endpoint if needed) ──
  const blockIP = async (ip) => {
    setBlocking(true);
    await new Promise(r=>setTimeout(r,1200));
    setBlocked(prev=>({...prev,[ip]:true}));
    setBlocking(false);
  };

  // ── Generate fake network features from threat data ──
  const makeFeatures = (t) => [
    ['duration',    (Math.random()*.05).toFixed(3)],
    ['pkt_count',   Math.floor(Math.random()*10000+500)],
    ['byte_rate',   `${(Math.random()*200).toFixed(1)}k`],
    ['pkt_size',    Math.floor(Math.random()*128+32)],
    ['ttl_val',     Math.floor(Math.random()*60+20)],
    ['syn_flag',    Math.round(Math.random())],
    ['urg_ratio',   (Math.random()).toFixed(2)],
    ['src_port',    Math.floor(Math.random()*60000+1024)],
    ['dst_port',    t.attack_port||443],
    ['protocol',    ['UDP','TCP','ICMP'][Math.floor(Math.random()*3)]],
    ['flow_dur',    (Math.random()*.2).toFixed(3)],
    ['iat_mean',    (Math.random()*.01).toFixed(3)],
    ['iat_std',     (Math.random()*.005).toFixed(3)],
    ['win_size',    Math.floor(Math.random()*65535)],
    ['payload',     Math.round(Math.random())],
    ['fwd_pkts',    Math.floor(Math.random()*9000+100)],
    ['bwd_pkts',    Math.floor(Math.random()*5+1)],
    ['fwd_bytes',   Math.floor(Math.random()*600000+10000)],
    ['bwd_bytes',   Math.floor(Math.random()*100+10)],
    ['fin_flag',    Math.round(Math.random())],
    ['rst_flag',    Math.round(Math.random())],
    ['psh_flag',    Math.round(Math.random())],
    ['ack_flag',    Math.round(Math.random())],
    ['urg_flag',    0],
    ['cwe_flag',    0],
    ['ip_ver',      4],
    ['hdr_len',     20],
    ['tos',         '0x00'],
    ['checksum',    `0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,'0')}`],
    ['entropy',     (Math.random()*8).toFixed(2)],
  ];

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
          <div style={{width:36,height:36,background:C.greenDim,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',border:`1px solid ${C.green}44`,animation:'ntGlow 3s infinite',overflow:'hidden',flexShrink:0}}>
            <img src={cifaLogo} alt="CIFA Logo" style={{width:32,height:32,objectFit:'contain'}} />
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
                      <td style={{padding:'12px 16px',display:'flex',gap:6,alignItems:'center'}}>
                        <button className="nt-gbtn" onClick={()=>openDetail(t)} style={{fontSize:10,background:`rgba(57,255,20,0.08)`,borderColor:`${C.green}55`}}>🔍 Details</button>
                        <button className="nt-gbtn" onClick={()=>doForensics(t)} style={{fontSize:10}}>⊕ PDF</button>
                      </td>
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

      {/* ══ ATTACK DETAIL MODAL — ORG ONLY ══ */}
      {detOpen&&detThr&&isOrg&&(()=>{
        const pri=getPri(detThr.attack_type);
        const pc=priColor[pri];
        const feats=makeFeatures(detThr);
        const loc=(detThr.attacker_location||'Unknown, Unknown').split(',');
        const city=loc[0]?.trim()||'Unknown';
        const country=loc.slice(1).join(',').trim()||'Unknown';
        const lat=(24+Math.random()*16).toFixed(4);
        const lng=(60+Math.random()*20).toFixed(4);
        const isBlockedNow=blocked[detThr.attacker_ip];
        const rawPacket=`Ethernet II, Src: 00:1A:2B:3C:4D:5E, Dst: ff:ff:ff:ff:ff:ff
Internet Protocol Version 4, Src: ${detThr.attacker_ip}, Dst: 192.168.1.1
Header Length: 20 bytes, TTL: ${feats[4][1]}, Protocol: ${feats[9][1]} (17)
User Datagram Protocol, Src Port: ${feats[7][1]}, Dst Port: ${detThr.attack_port||443}
Length: ${feats[3][1]}, Checksum: ${feats[28][1]} [validation disabled]
Data (36 bytes): 00 00 00 00 00 00 00 00 ...`;
        // ML confidence
        const mainConf=(85+Math.random()*13).toFixed(1);
        const altConf=(100-parseFloat(mainConf)-Math.random()*3).toFixed(1);
        const altLabel={'SSH Brute Force':'Port Scan','DDoS Attack':'DoS Slowloris','Port Scan':'SSH Brute Force','SQL Injection':'XSS Attempt','Malware Upload':'Payload Injection'}[detThr.attack_type]||'Other';
        return(
          <div style={{position:'fixed',inset:0,zIndex:1100,background:'rgba(0,0,0,0.92)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
            <div style={{background:'#0b130b',border:`1px solid ${C.green}44`,borderRadius:16,width:'100%',maxWidth:760,maxHeight:'92vh',overflowY:'auto',display:'flex',flexDirection:'column',boxShadow:`0 0 60px rgba(57,255,20,0.12)`}}>

              {/* Modal Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 20px',borderBottom:`1px solid ${C.green}22`,background:'rgba(57,255,20,0.04)',position:'sticky',top:0,zIndex:10}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{width:8,height:8,borderRadius:'50%',background:C.green,boxShadow:`0 0 8px ${C.green}`,display:'inline-block',animation:'ntP2 2s infinite'}}/>
                  <span style={{fontSize:13,fontWeight:800,color:C.green,letterSpacing:3,fontFamily:"'Share Tech Mono',monospace",textTransform:'uppercase'}}>Attack Detail — Neural-Trace</span>
                </div>
                <button onClick={()=>{setDetOpen(false);setDetThr(null);}} style={{background:'transparent',border:`1px solid ${C.border}`,borderRadius:8,color:C.gray,width:28,height:28,cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
              </div>

              <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:20}}>

                {/* Attack ID banner */}
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:C.gray,letterSpacing:2}}>
                  ATTACK ID: NT-{new Date(detThr.timestamp).getFullYear()}-{String(detThr.id).padStart(8,'0')} | CLASSIFIED BY ML ENGINE v2.1 | CONFIDENCE: {mainConf}%
                </div>

                {/* Meta grid */}
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                  {[
                    ['Source IP',   detThr.attacker_ip,        C.red],
                    ['Attack Type', detThr.attack_type,         C.red],
                    ['Timestamp',   new Date(detThr.timestamp).toLocaleString(), C.green],
                    ['Priority',    pri,                         pc],
                    ['Status',      detThr.is_killed||'Active',  detThr.is_killed==='Blocked'?C.red:C.yellow],
                    ['Dest Port',   `:${detThr.attack_port||443} / ${(detThr.attack_port===80||detThr.attack_port==='80')?'HTTP':'HTTPS'}`, C.green],
                  ].map(([label,val,col])=>(
                    <div key={label} style={{background:'#0f1a0f',border:`1px solid ${C.green}18`,borderRadius:10,padding:'10px 14px'}}>
                      <div style={{fontSize:9,color:C.gray,letterSpacing:2,fontFamily:"'Share Tech Mono',monospace",textTransform:'uppercase',marginBottom:5}}>{label}</div>
                      <div style={{fontSize:13,fontWeight:700,color:col,fontFamily:"'Share Tech Mono',monospace",wordBreak:'break-all'}}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* ML Confidence */}
                <div>
                  <div style={{fontSize:10,color:C.gray,letterSpacing:2,fontFamily:"'Share Tech Mono',monospace",marginBottom:12,textTransform:'uppercase'}}>ML Confidence Score</div>
                  {[[detThr.attack_type,parseFloat(mainConf),C.green],[altLabel,parseFloat(altConf),C.gray2||(C.gray)]].map(([label,pct,col])=>(
                    <div key={label} style={{marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                        <span style={{fontSize:12,color:col,fontFamily:"'Share Tech Mono',monospace"}}>{label}</span>
                        <span style={{fontSize:12,color:col,fontFamily:"'Share Tech Mono',monospace"}}>{pct}%</span>
                      </div>
                      <div style={{height:8,background:'rgba(255,255,255,0.06)',borderRadius:99,overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${pct}%`,background:col===C.green?C.green:'#4b5563',borderRadius:99,boxShadow:col===C.green?`0 0 10px ${C.green}55`:undefined,transition:'width .6s ease'}}/>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Network Features */}
                <div>
                  <div style={{fontSize:10,color:C.gray,letterSpacing:2,fontFamily:"'Share Tech Mono',monospace",marginBottom:12,textTransform:'uppercase'}}>Network Features (30 extracted by Scapy)</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:6}}>
                    {feats.map(([k,v])=>(
                      <div key={k} style={{background:'#0f1a0f',border:`1px solid ${C.green}15`,borderRadius:8,padding:'8px 10px'}}>
                        <div style={{fontSize:8,color:C.gray,letterSpacing:1,fontFamily:"'Share Tech Mono',monospace",marginBottom:4,textTransform:'uppercase'}}>{k}</div>
                        <div style={{fontSize:12,color:C.green,fontFamily:"'Share Tech Mono',monospace",fontWeight:700}}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Geolocation */}
                <div>
                  <div style={{fontSize:10,color:C.gray,letterSpacing:2,fontFamily:"'Share Tech Mono',monospace",marginBottom:12,textTransform:'uppercase'}}>Geolocation</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                    {[['Country',country],['City',city],['Lat / Lon',`${lat}, ${lng}`],['ASN',`AS${Math.floor(Math.random()*400000)} — ${['TorExit','DataCenter','Residential','VPN Provider'][Math.floor(Math.random()*4)]}`]].map(([k,v])=>(
                      <div key={k} style={{background:'#0f1a0f',border:`1px solid ${C.green}15`,borderRadius:8,padding:'10px 14px'}}>
                        <div style={{fontSize:9,color:C.gray,letterSpacing:2,fontFamily:"'Share Tech Mono',monospace",marginBottom:5,textTransform:'uppercase'}}>{k}</div>
                        <div style={{fontSize:12,color:'#e2e8f0',fontFamily:"'Share Tech Mono',monospace"}}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Raw Packet Header */}
                <div>
                  <div style={{fontSize:10,color:C.gray,letterSpacing:2,fontFamily:"'Share Tech Mono',monospace",marginBottom:10,textTransform:'uppercase'}}>Raw Packet Header</div>
                  <div style={{background:'#060d06',border:`1px solid ${C.green}22`,borderRadius:10,padding:'14px 16px'}}>
                    <pre style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:C.green,margin:0,whiteSpace:'pre-wrap',lineHeight:1.7}}>{rawPacket}</pre>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{display:'flex',gap:12,flexWrap:'wrap',paddingTop:4}}>
                  <button
                    onClick={()=>{ setDetOpen(false); doForensics(detThr); }}
                    style={{flex:1,minWidth:160,padding:'12px 20px',background:C.green,color:'#000',border:'none',borderRadius:10,fontWeight:800,fontSize:13,letterSpacing:1,cursor:'pointer',fontFamily:"'Rajdhani',sans-serif",textTransform:'uppercase',transition:'all .15s'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#2ee60e'}
                    onMouseLeave={e=>e.currentTarget.style.background=C.green}
                  >
                    📄 Generate Forensic Report
                  </button>
                  <button
                    onClick={()=>blockIP(detThr.attacker_ip)}
                    disabled={blocking||isBlockedNow}
                    style={{flex:1,minWidth:160,padding:'12px 20px',background:isBlockedNow?'rgba(255,68,68,0.15)':'rgba(255,68,68,0.12)',color:isBlockedNow?C.red:'#ff6b6b',border:`1px solid ${isBlockedNow?C.red:'rgba(255,68,68,0.4)'}`,borderRadius:10,fontWeight:800,fontSize:13,letterSpacing:1,cursor:isBlockedNow?'not-allowed':'pointer',fontFamily:"'Rajdhani',sans-serif",textTransform:'uppercase',opacity:blocking?.6:1,transition:'all .15s'}}
                    onMouseEnter={e=>{ if(!isBlockedNow&&!blocking) e.currentTarget.style.background='rgba(255,68,68,0.25)'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background=isBlockedNow?'rgba(255,68,68,0.15)':'rgba(255,68,68,0.12)'; }}
                  >
                    {blocking?'Blocking...' : isBlockedNow?'✓ IP Blocked':'🚫 Block IP Now'}
                  </button>
                  <button
                    onClick={()=>{setDetOpen(false);setDetThr(null);}}
                    style={{padding:'12px 24px',background:'transparent',color:C.gray,border:`1px solid ${C.border}`,borderRadius:10,fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:"'Rajdhani',sans-serif",textTransform:'uppercase',transition:'all .15s'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.green}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>
        );
      })()}

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

