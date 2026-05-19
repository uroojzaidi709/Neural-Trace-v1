
import { useState, useEffect, useRef } from "react";
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY.png';

const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
:root{--neon:#39FF14;--neon-light:#00ff88;--bg:#050a05;--card-border:rgba(57,255,20,0.15);--card-bg:rgba(57,255,20,0.03);}
*{box-sizing:border-box;}html{scroll-behavior:smooth;}
body{background:#050a05;color:#fff;font-family:'Rajdhani',sans-serif;overflow-x:hidden;margin:0;}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:#050a05;}::-webkit-scrollbar-thumb{background:#39FF14;border-radius:3px;}
#splash{position:fixed;inset:0;z-index:9999;background:#050a05;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .9s ease,visibility .9s ease;}
#splash.hide{opacity:0;visibility:hidden;pointer-events:none;}
#splash-canvas{position:absolute;inset:0;opacity:.12;z-index:0;}
.splash-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;}
.splash-logo-wrap{opacity:0;transform:scale(.5);animation:splashIn 1s cubic-bezier(.34,1.56,.64,1) .2s forwards;position:relative;display:inline-block;}
@keyframes splashIn{to{opacity:1;transform:scale(1);}}
.splash-logo-wrap::after{content:'';position:absolute;inset:-10px;border-radius:50%;border:1.5px solid rgba(57,255,20,.45);animation:ringOut 2.2s ease-out 1.3s infinite;}
@keyframes ringOut{0%{transform:scale(1);opacity:.8;}100%{transform:scale(1.7);opacity:0;}}
.splash-title{opacity:0;transform:translateY(18px);animation:fadeUp .7s ease 1.1s forwards;font-size:clamp(2rem,8vw,3.5rem);font-weight:700;letter-spacing:.18em;color:#39FF14;text-shadow:0 0 28px rgba(57,255,20,.65);margin-top:18px;white-space:nowrap;}
@keyframes fadeUp{to{opacity:1;transform:translateY(0);}}
.splash-line{width:0;height:2px;background:linear-gradient(90deg,transparent,#39FF14,transparent);animation:lineGrow .8s ease 1.5s forwards;margin-top:12px;}
@keyframes lineGrow{to{width:min(280px,70vw);}}
.splash-sub{opacity:0;transform:translateY(8px);animation:fadeUp .6s ease 1.8s forwards;font-family:'Share Tech Mono',monospace;font-size:clamp(.52rem,1.9vw,.76rem);letter-spacing:.2em;color:rgba(255,255,255,.5);margin-top:8px;text-align:center;padding:0 20px;}
.splash-boot{opacity:0;animation:fadeUp .5s ease 2.2s forwards;font-family:'Share Tech Mono',monospace;font-size:.62rem;color:rgba(57,255,20,.5);letter-spacing:.12em;margin-top:26px;}
.splash-bar-wrap{width:min(200px,60vw);height:2px;background:rgba(57,255,20,.1);border-radius:1px;overflow:hidden;margin-top:10px;opacity:0;animation:fadeUp .4s ease 2.4s forwards;}
.splash-bar-fill{height:100%;background:#39FF14;width:0;animation:barFill 1.4s ease 2.5s forwards;box-shadow:0 0 8px #39FF14;}
@keyframes barFill{to{width:100%;}}
#navbar{position:fixed;top:0;left:0;right:0;z-index:1000;backdrop-filter:blur(14px);transition:all .3s;border-bottom:1px solid transparent;}
#navbar.scrolled{background:rgba(5,10,5,.96);border-bottom:1px solid #39FF14;box-shadow:0 0 30px rgba(57,255,20,.1);}
.desktop-nav{display:flex;align-items:center;gap:clamp(16px,2.5vw,32px);}
.hamburger-btn{display:none;}
@media(max-width:768px){.desktop-nav{display:none !important;}.hamburger-btn{display:flex !important;}.nav-access-btn{display:none;}}
#matrix-canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:.17;}
.hero-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(57,255,20,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);}
@keyframes pd{0%,100%{box-shadow:0 0 0 0 rgba(57,255,20,.7);}50%{box-shadow:0 0 0 8px rgba(57,255,20,0);}}
@keyframes pr{0%,100%{box-shadow:0 0 0 0 rgba(255,51,51,.7);}50%{box-shadow:0 0 0 8px rgba(255,51,51,0);}}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:#39FF14;animation:pd 1.5s infinite;display:inline-block;flex-shrink:0;}
.pulse-dot-red{width:8px;height:8px;border-radius:50%;background:#ff3333;animation:pr 1.5s infinite;display:inline-block;flex-shrink:0;}
.neon-gradient{background:linear-gradient(90deg,#39FF14,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.section-tag{font-family:'Share Tech Mono',monospace;font-size:.73rem;color:#39FF14;letter-spacing:.15em;}
.typing-cursor::after{content:'|';color:#39FF14;animation:blink .7s step-end infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
.cyber-card{border:1px solid rgba(57,255,20,0.15);background:rgba(57,255,20,0.03);transition:all .3s;position:relative;overflow:hidden;}
.cyber-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(57,255,20,.05) 0%,transparent 60%);opacity:0;transition:opacity .3s;}
.cyber-card:hover::before{opacity:1;}
.cyber-card:hover{border-color:rgba(57,255,20,.6);box-shadow:0 0 20px rgba(57,255,20,.15);transform:translateY(-2px);}
.fade-up{opacity:0;transform:translateY(28px);transition:opacity .7s,transform .7s;}
.fade-up.visible{opacity:1;transform:translateY(0);}
.btn-neon{background:#39FF14;color:#050a05;font-weight:700;letter-spacing:.05em;transition:all .3s;font-family:'Rajdhani',sans-serif;cursor:pointer;border:none;}
.btn-neon:hover{background:#00ff88;box-shadow:0 0 20px rgba(57,255,20,.5);transform:translateY(-1px);}
.btn-ghost{border:1px solid #39FF14;color:#39FF14;background:transparent;font-weight:600;letter-spacing:.05em;transition:all .3s;font-family:'Rajdhani',sans-serif;cursor:pointer;}
.btn-ghost:hover{background:rgba(57,255,20,.1);box-shadow:0 0 15px rgba(57,255,20,.3);}
.leaflet-container{background:#0a120a;}.leaflet-popup-content-wrapper{background:transparent!important;border:none!important;box-shadow:none!important;padding:0!important}.leaflet-popup-content{margin:0!important}.leaflet-popup-tip-container{display:none}
.pipeline-line{flex:1;height:2px;background:repeating-linear-gradient(90deg,#39FF14 0,#39FF14 8px,transparent 8px,transparent 16px);background-size:200% 100%;animation:dashFlow 2s linear infinite;}
@keyframes dashFlow{from{background-position:200% 0;}to{background-position:0 0;}}
.pipeline-line.paused{animation-play-state:paused;}.pipeline-line.running{animation-play-state:running;}
@media(max-width:768px){.pipeline-horizontal{flex-direction:column;align-items:center;}.pipeline-line{width:2px;height:30px;flex:none;background:repeating-linear-gradient(180deg,#39FF14 0,#39FF14 8px,transparent 8px,transparent 16px);margin:0 auto;}#threat-map{height:280px!important;}}
.feature-badge{font-family:'Share Tech Mono',monospace;font-size:.58rem;letter-spacing:.1em;padding:2px 7px;border-radius:2px;white-space:nowrap;}
.badge-passive{background:rgba(57,255,20,.15);color:#39FF14;}.badge-realtime{background:rgba(0,255,136,.15);color:#00ff88;}.badge-ai{background:rgba(57,255,20,.15);color:#39FF14;}.badge-auto{background:rgba(255,51,51,.15);color:#ff6666;}.badge-forensics{background:rgba(0,200,255,.15);color:#00c8ff;}.badge-legal{background:rgba(255,200,0,.15);color:#ffc800;}
.city-item{border-bottom:1px solid rgba(57,255,20,.08);transition:background .2s;}.city-item:hover{background:rgba(57,255,20,.05);}
.scanline-bg{background-image:linear-gradient(rgba(57,255,20,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,.02) 1px,transparent 1px);background-size:40px 40px;}
body::before{content:'';position:fixed;inset:0;z-index:-1;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");background-size:200px 200px;opacity:.4;pointer-events:none;}
`;

function Splash({ onDone }) {
  const canvasRef = useRef(null);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const chars = "01アイウエオカキクサシスタチツナニヌ";
    let cols, drops;
    function init() { c.width=window.innerWidth; c.height=window.innerHeight; cols=Math.floor(c.width/18); drops=Array(cols).fill(0).map(()=>Math.floor(Math.random()*-30)); }
    function draw() {
      ctx.fillStyle="rgba(5,10,5,.06)"; ctx.fillRect(0,0,c.width,c.height); ctx.font="13px 'Share Tech Mono',monospace";
      for(let i=0;i<drops.length;i++){const ch=chars[Math.floor(Math.random()*chars.length)],x=i*18,y=drops[i]*18;if(drops[i]>0){ctx.fillStyle="#fff";ctx.fillText(ch,x,y);ctx.fillStyle="#39FF14";ctx.fillText(ch,x,y-18);}if(y>c.height&&Math.random()>.975)drops[i]=0;drops[i]++;}
    }
    init(); window.addEventListener("resize",init);
    const iv=setInterval(draw,55);
    const t=setTimeout(()=>{setHide(true);setTimeout(onDone,900);},3400);
    return()=>{clearInterval(iv);clearTimeout(t);window.removeEventListener("resize",init);};
  },[]);
  return (
    <div id="splash" className={hide?"hide":""}>
      <canvas id="splash-canvas" ref={canvasRef}/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 50% at 50% 50%,rgba(57,255,20,.09) 0%,transparent 70%)",zIndex:0,pointerEvents:"none"}}/>
      <div className="splash-inner">
        <div className="splash-logo-wrap">
          {/* CIFA Logo in splash */}
          <img src={cifaLogo} alt="Neural-Trace Logo" style={{width:150,height:150,objectFit:'contain',filter:'drop-shadow(0 0 28px rgba(57,255,20,.6)) drop-shadow(0 0 60px rgba(57,255,20,.25))',borderRadius:'50%'}}/>
        </div>
        <div className="splash-title">NEURAL-TRACE</div>
        <div className="splash-line"/>
        <div className="splash-sub">PAKISTAN'S AI-POWERED CYBER DEFENSE PLATFORM</div>
        <div className="splash-boot">INITIALIZING DEFENSE MATRIX...</div>
        <div className="splash-bar-wrap"><div className="splash-bar-fill"/></div>
      </div>
    </div>
  );
}

function Navbar({ onOpenLogin }) {
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const NAV=[["MISSION","#mission"],["FEATURES","#features"],["LIVE MAP","#live-map"],["PIPELINE","#pipeline"]];
  return (
    <nav id="navbar" className={scrolled?"scrolled":""} style={{width:"100%",padding:"10px 16px"}}>
      <div style={{maxWidth:"80rem",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="#" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",flexShrink:0}}>
          {/* CIFA Logo in navbar */}
          <img src={cifaLogo} alt="Logo" style={{width:36,height:36,objectFit:'contain',borderRadius:'50%',filter:'drop-shadow(0 0 6px rgba(57,255,20,.5))',flexShrink:0}}/>
          <span style={{color:"#39FF14",fontFamily:"'Rajdhani',sans-serif",fontSize:"clamp(.95rem,2.5vw,1.15rem)",fontWeight:700,letterSpacing:".14em"}}>NEURAL-TRACE</span>
        </a>
        <div className="desktop-nav">
          {NAV.map(([l,h])=><a key={l} href={h} style={{color:"rgba(255,255,255,.7)",fontSize:".82rem",fontWeight:600,letterSpacing:".1em",textDecoration:"none",transition:"color .2s",whiteSpace:"nowrap"}} onMouseOver={e=>e.currentTarget.style.color="#39FF14"} onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,.7)"}>{l}</a>)}
        </div>
        <button className="btn-neon nav-access-btn" style={{padding:"8px 20px",borderRadius:"4px",fontSize:".875rem",letterSpacing:".05em",flexShrink:0}} onClick={()=>onOpenLogin()}>ACCESS VAULT</button>
        <button className="hamburger-btn" onClick={()=>setMenuOpen(v=>!v)} style={{background:"none",border:"none",cursor:"pointer",flexDirection:"column",gap:"6px",padding:"8px"}}>
          {[0,1,2].map(i=><span key={i} style={{display:"block",width:"20px",height:"2px",background:"#39FF14"}}/>)}
        </button>
      </div>
      {menuOpen&&(
        <div style={{marginTop:"12px",padding:"16px",borderTop:"1px solid rgba(57,255,20,.18)",display:"flex",flexDirection:"column",gap:"14px"}}>
          {NAV.map(([l,h])=><a key={l} href={h} style={{color:"rgba(255,255,255,.75)",fontSize:".85rem",fontWeight:600,letterSpacing:".1em",textDecoration:"none"}} onClick={()=>setMenuOpen(false)}>{l}</a>)}
          <div style={{borderTop:"1px solid rgba(57,255,20,.1)",paddingTop:"12px"}}>
            <button className="btn-neon" style={{padding:"8px 20px",borderRadius:"4px",fontSize:".875rem",letterSpacing:".05em"}} onClick={()=>{setMenuOpen(false);onOpenLogin();}}>ACCESS VAULT</button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ onOpenLogin, started }) {
  const canvasRef=useRef(null);
  const [typedHtml,setTypedHtml]=useState("");
  const [typingDone,setTypingDone]=useState(false);
  const [stats,setStats]=useState({s1:"0%",s2:"0",s3:"0",s4:"0"});
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;
    const ctx=c.getContext("2d"); const chars="アイウエオカキクケコ0123456789ABCDEF";
    let cols,drops;
    function init(){c.width=window.innerWidth;c.height=window.innerHeight;cols=Math.floor(c.width/18);drops=Array(cols).fill(0).map(()=>Math.floor(Math.random()*-40));}
    function draw(){ctx.fillStyle="rgba(5,10,5,.045)";ctx.fillRect(0,0,c.width,c.height);ctx.font="14px 'Share Tech Mono',monospace";for(let i=0;i<drops.length;i++){const ch=chars[Math.floor(Math.random()*chars.length)],x=i*18,y=drops[i]*18;if(drops[i]>0){ctx.fillStyle="#fff";ctx.fillText(ch,x,y);ctx.fillStyle="#39FF14";ctx.fillText(ch,x,y-18);}if(y>c.height&&Math.random()>.975)drops[i]=0;drops[i]++;}}
    init();window.addEventListener("resize",init);const iv=setInterval(draw,55);return()=>{clearInterval(iv);window.removeEventListener("resize",init);};
  },[]);
  useEffect(()=>{
    if(!started)return;
    const lines=["AI-POWERED THREAT INTELLIGENCE &","FORENSICS"];let line=0,char=0;
    function type(){const l=lines[line];if(char<l.length){if(line===0)setTypedHtml(l.substring(0,char+1));else setTypedHtml(`${lines[0]}<br/><neon>${l.substring(0,char+1)}</neon>`);char++;setTimeout(type,line===0?38:60);}else if(line<lines.length-1){line++;char=0;setTimeout(type,150);}else setTypingDone(true);}
    type();
    function cnt(key,target,suf,dec,dur){let s=0;const step=target/(dur/16);function run(){s+=step;if(s>=target){setStats(prev=>({...prev,[key]:(dec?target.toFixed(1):Math.floor(target))+suf}));return;}setStats(prev=>({...prev,[key]:(dec?s.toFixed(1):Math.floor(s))+suf}));requestAnimationFrame(run);}run();}
    cnt("s1",99.2,"%",true,1800);cnt("s2",15,"+",false,1200);cnt("s3",30,"",false,1200);cnt("s4",8,"",false,900);
  },[started]);
  return (
    <section id="hero" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#050a05"}}>
      <canvas id="matrix-canvas" ref={canvasRef}/>
      <div className="hero-grid"/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 60% at 50% 50%,rgba(57,255,20,.06) 0%,transparent 70%)",zIndex:0,pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:10,textAlign:"center",maxWidth:"64rem",margin:"0 auto",padding:"clamp(90px,12vw,120px) 16px 0"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"24px",padding:"8px 16px",borderRadius:"9999px",border:"1px solid rgba(57,255,20,.3)",background:"rgba(57,255,20,.05)"}}>
          <span className="pulse-dot"/><span style={{color:"#39FF14",fontFamily:"'Share Tech Mono',monospace",fontSize:"clamp(.5rem,1.8vw,.72rem)",letterSpacing:".14em"}}>SYSTEM ONLINE — MONITORING PAKISTAN</span>
        </div>
        <h1 style={{fontWeight:700,lineHeight:1.15,letterSpacing:"-.01em",marginBottom:"24px",fontSize:"clamp(1.7rem,5.5vw,4.2rem)"}}>
          {typedHtml.includes("<neon>")?(<>{typedHtml.split("<br/>")[0]}<br/><span style={{background:"linear-gradient(90deg,#39FF14,#00ff88)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{typedHtml.split("<neon>")[1]?.replace("</neon>","")||""}</span></>):(<span className={!typingDone?"typing-cursor":""}>{typedHtml}</span>)}
          {typedHtml.includes("<neon>")&&!typingDone&&<span className="typing-cursor" style={{display:"inline"}}/>}
        </h1>
        <p style={{marginBottom:"40px",maxWidth:"42rem",margin:"0 auto 40px",lineHeight:1.7,color:"rgba(255,255,255,.65)",fontSize:"clamp(.88rem,2.2vw,1.05rem)"}}>Defending Pakistan's critical digital infrastructure — in real time — with passive honeypot traps, live packet analytics, and automated forensic attribution under PECA 2016.</p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"12px",marginBottom:"48px"}}>
          <button className="btn-neon" style={{padding:"12px 32px",borderRadius:"4px",fontSize:"clamp(.875rem,2vw,1rem)",letterSpacing:".05em",display:"flex",alignItems:"center",gap:"8px"}} onClick={()=>onOpenLogin()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>ACTIVATE AGENT NODE
          </button>
          <button className="btn-ghost" style={{padding:"12px 32px",borderRadius:"4px",fontSize:"clamp(.875rem,2vw,1rem)",letterSpacing:".05em"}} onClick={()=>document.getElementById("mission")?.scrollIntoView({behavior:"smooth"})}>OUR MISSION</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"12px",maxWidth:"48rem",margin:"0 auto"}}>
          {[{id:"s1",val:stats.s1,label:"CLASSIFIER ACCURACY"},{id:"s2",val:stats.s2,label:"ATTACK VECTORS"},{id:"s3",val:stats.s3,label:"REAL-TIME FEATURES"},{id:"s4",val:stats.s4,label:"CITY NODES ACTIVE"}].map(s=>(
            <div key={s.id} className="cyber-card" style={{borderRadius:"4px",padding:"12px 16px",textAlign:"center"}}>
              <div style={{fontSize:"clamp(1.25rem,3vw,1.5rem)",fontWeight:700,marginBottom:"4px",color:"#39FF14",fontFamily:"'Share Tech Mono',monospace"}}>{s.val}</div>
              <div style={{fontSize:".75rem",letterSpacing:".05em",color:"rgba(255,255,255,.5)"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"110px",background:"linear-gradient(to top,#050a05,transparent)",zIndex:5,pointerEvents:"none"}}/>
    </section>
  );
}

function FadeUp({children,delay=0,style={}}){
  const ref=useRef(null);const[visible,setVisible]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVisible(true);},{threshold:.1});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return <div ref={ref} className={`fade-up${visible?" visible":""}`} style={{transitionDelay:`${delay}s`,...style}}>{children}</div>;
}

function Mission(){
  return(
    <section id="mission" className="scanline-bg" style={{padding:"clamp(64px,8vw,96px) clamp(16px,4vw,24px)"}}>
      <div style={{maxWidth:"80rem",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"clamp(40px,6vw,64px)",alignItems:"center"}}>
          <FadeUp>
            <div className="section-tag" style={{marginBottom:"16px"}}></div>
            <h2 style={{fontWeight:700,lineHeight:1.2,marginBottom:"24px",fontSize:"clamp(1.7rem,4.5vw,2.8rem)"}}>Securing Pakistan's<br/><span className="neon-gradient">Digital Frontier</span></h2>
            <p style={{fontSize:"1rem",lineHeight:1.7,marginBottom:"20px",color:"rgba(255,255,255,.65)"}}>Pakistan's digital infrastructure faces an escalating barrage of state-sponsored intrusions, ransomware campaigns, and critical sector attacks — yet the gap between threat detection and legal accountability remains dangerously wide.</p>
            <p style={{fontSize:"1rem",lineHeight:1.7,color:"rgba(255,255,255,.65)"}}>Neural-Trace closes that gap. By combining passive Cowrie + Dionaea honeypot intelligence, real-time XGBoost classification, and automated forensic report generation, we deliver a seamless pipeline from first packet capture to court-admissible evidence under PECA 2016.</p>
            <div style={{marginTop:"32px",display:"flex",alignItems:"center",gap:"12px"}}><div style={{width:"40px",height:"2px",background:"#39FF14"}}/><span style={{fontSize:".75rem",letterSpacing:".1em",color:"rgba(255,255,255,.4)"}}>BUILT FOR PAKISTAN'S CYBER DEFENSE</span></div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
              {[
                {icon:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,color:"#39FF14",label:"DETECT",desc:"Real-time XGBoost ML anomaly detection on live packet flows with 99%+ accuracy"},
                {icon:<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,color:"#ff4444",label:"RESPOND",desc:"Autonomous iptables firewall rules kill malicious sessions within 340ms"},
                {icon:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,color:"#00c8ff",label:"ATTRIBUTE",desc:"GeoIP + ASN fingerprinting traces attacks to source with ISP-level precision"},
                {icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,color:"#ffc800",label:"REPORT",desc:"SHA-256 sealed PDF forensic reports for FIA Cybercrime Wing submission under PECA 2016"},
              ].map(c=>(
                <div key={c.label} className="cyber-card" style={{borderRadius:"8px",padding:"16px"}}>
                  <div style={{marginBottom:"12px"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2">{c.icon}</svg></div>
                  <div style={{fontSize:".875rem",fontWeight:700,letterSpacing:".05em",marginBottom:"8px",color:c.color}}>{c.label}</div>
                  <p style={{fontSize:".75rem",lineHeight:1.6,color:"rgba(255,255,255,.6)"}}>{c.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

const CITIES=[
  {n:"Karachi",lat:24.8607,lng:67.0011,c:"#ff3333",cnt:"5,423",t:"alert"},
  {n:"Lahore",lat:31.5204,lng:74.3587,c:"#ff3333",cnt:"1,802",t:"alert"},
  {n:"Islamabad",lat:33.6844,lng:73.0479,c:"#39FF14",cnt:"987",t:"active"},
  {n:"Quetta",lat:30.1798,lng:66.975,c:"#39FF14",cnt:"412",t:"monitor"},
  {n:"Peshawar",lat:34.0151,lng:71.5249,c:"#39FF14",cnt:"653",t:"active"},
  {n:"Faisalabad",lat:31.416,lng:73.0911,c:"#39FF14",cnt:"541",t:"active"},
  {n:"Sukkur",lat:27.7244,lng:68.8571,c:"#ff3333",cnt:"778",t:"alert"},
  {n:"Hyderabad",lat:25.396,lng:68.3578,c:"#39FF14",cnt:"329",t:"active"},
];

function LiveMap(){
  const mapRef=useRef(null);const mapInited=useRef(false);
  useEffect(()=>{
    if(mapInited.current)return;
    function initMap(){
      if(!window.L)return;mapInited.current=true;
      try{
        const map=window.L.map("threat-map",{center:[30.3753,69.3451],zoom:5,scrollWheelZoom:false,attributionControl:false,zoomControl:true});
        window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19}).addTo(map);
        CITIES.forEach(city=>{
          window.L.circleMarker([city.lat,city.lng],{radius:16,color:city.c,fillColor:city.c,fillOpacity:0,weight:1,opacity:.3}).addTo(map);
          window.L.circleMarker([city.lat,city.lng],{radius:6,color:city.c,fillColor:city.c,fillOpacity:.9,weight:2}).addTo(map).bindPopup(`<div style="font-family:'Rajdhani',sans-serif;background:#050a05;border:1px solid ${city.c};padding:12px 16px;border-radius:8px;min-width:155px;"><div style="color:${city.c};font-weight:700;font-size:14px;margin-bottom:4px;">${city.n}</div><div style="color:rgba(255,255,255,.7);font-size:12px;">${city.cnt} threats blocked</div><div style="margin-top:6px;font-size:11px;font-weight:700;color:${city.c};">${city.t==="alert"?"HIGH ALERT":city.t==="active"?"ACTIVE":"MONITORING"}</div></div>`);
        });
      }catch(e){console.warn("Map:",e);}
    }
    if(window.L){initMap();return;}
    const link=document.createElement("link");link.rel="stylesheet";link.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(link);
    const script=document.createElement("script");script.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";script.onload=initMap;document.head.appendChild(script);
  },[]);
  return(
    <section id="live-map" style={{padding:"clamp(64px,6vw,80px) clamp(16px,4vw,24px)",background:"rgba(0,0,0,.3)"}}>
      <div style={{maxWidth:"80rem",margin:"0 auto"}}>
        <FadeUp><div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"12px",marginBottom:"32px"}}><span className="pulse-dot-red"/><span style={{fontFamily:"'Share Tech Mono',monospace",color:"#39FF14",fontSize:"clamp(.62rem,1.8vw,.82rem)",letterSpacing:".14em"}}>LIVE THREAT MAP — PAKISTAN</span><div style={{flex:1,height:"1px",background:"rgba(57,255,20,.18)",marginLeft:"6px",minWidth:"16px"}}/><span style={{fontFamily:"'Share Tech Mono',monospace",color:"rgba(255,255,255,.35)",fontSize:".68rem"}}>FEED ACTIVE</span></div></FadeUp>
        <FadeUp delay={0.1}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px"}}>
            <div style={{gridColumn:"span 2"}}><div id="threat-map" ref={mapRef} style={{height:"420px",border:"1px solid rgba(57,255,20,.2)",borderRadius:"8px",overflow:"hidden"}}/><div style={{display:"flex",alignItems:"center",gap:"20px",marginTop:"14px",flexWrap:"wrap"}}><div style={{display:"flex",alignItems:"center",gap:"8px"}}><span className="pulse-dot"/><span style={{fontSize:".75rem",letterSpacing:".05em",color:"rgba(255,255,255,.6)"}}>Active Node</span></div><div style={{display:"flex",alignItems:"center",gap:"8px"}}><span className="pulse-dot-red"/><span style={{fontSize:".75rem",letterSpacing:".05em",color:"rgba(255,255,255,.6)"}}>High Alert</span></div></div></div>
            <div className="cyber-card" style={{borderRadius:"8px",overflow:"hidden",maxHeight:"480px"}}>
              <div style={{padding:"14px 18px",borderBottom:"1px solid rgba(57,255,20,.15)"}}><span style={{fontSize:".875rem",fontWeight:700,letterSpacing:".1em",color:"#39FF14"}}>NODE STATUS</span></div>
              <div style={{overflowY:"auto",maxHeight:"400px"}}>
                {CITIES.map((city,i)=>(
                  <div key={city.n} className="city-item" style={{padding:"14px 18px",borderBottom:i===CITIES.length-1?"none":undefined}}>
                    <div style={{display:"flex",alignItems:"start",justifyContent:"space-between"}}>
                      <div><div style={{fontWeight:700,fontSize:".9rem",marginBottom:"3px"}}>{city.n}</div><div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)"}}>{city.cnt} threats blocked</div></div>
                      {city.t==="alert"&&<span className="feature-badge" style={{background:"rgba(255,51,51,.15)",color:"#ff4444"}}>HIGH ALERT</span>}
                      {city.t==="active"&&<span className="feature-badge badge-realtime">ACTIVE</span>}
                      {city.t==="monitor"&&<span className="feature-badge" style={{background:"rgba(57,255,20,.1)",color:"#39FF14"}}>MONITORING</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

const FEATURES=[
  {icon:<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,color:"#39FF14",badge:"badge-passive",badgeLabel:"PASSIVE DEFENSE",title:"Honeypot Intelligence",desc:"Cowrie SSH and Dionaea malware honeypots lure attackers — silently capturing credentials, malware binaries, and C2 callbacks before they reach production infrastructure."},
  {icon:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,color:"#00ff88",badge:"badge-realtime",badgeLabel:"REAL-TIME",title:"Scapy Packet Analytics",desc:"Live packet capture engine extracts 30 network-layer features per flow — detecting DDoS amplification, botnet beaconing, and port sweeps with sub-second latency."},
  {icon:<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,color:"#39FF14",badge:"badge-ai",badgeLabel:"AI-POWERED",title:"XGBoost ML Classifier",desc:"Model trained on CIC-IDS-2017 achieves 99%+ accuracy across 15 attack vectors including SSH Brute Force, DDoS, SQL Injection, Port Scan, and Malware Upload."},
  {icon:<><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,color:"#ff4444",badge:"badge-auto",badgeLabel:"AUTO-RESPONSE",title:"Automated Kill Function",desc:"Dynamic iptables firewall rules auto-pushed within 340ms — blocking attacker IPs at network perimeter before lateral movement occurs."},
  {icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,color:"#00c8ff",badge:"badge-forensics",badgeLabel:"FORENSICS",title:"GeoIP Attribution Engine",desc:"ASN data, ISP identity, and geolocation correlate across events — building an evolving threat actor map of Pakistan's digital attack surface."},
  {icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,color:"#ffc800",badge:"badge-legal",badgeLabel:"LEGAL EVIDENCE",title:"Forensic PDF Reports",desc:"Court-admissible case reports auto-generated per incident — SHA-256 sealed, XGBoost confidence scores, full firewall action history, FIA-ready under PECA 2016."},
];

function Features(){
  return(
    <section id="features" className="scanline-bg" style={{padding:"clamp(64px,8vw,96px) clamp(16px,4vw,24px)"}}>
      <div style={{maxWidth:"80rem",margin:"0 auto"}}>
        <FadeUp><div style={{textAlign:"center",marginBottom:"56px"}}><div className="section-tag" style={{marginBottom:"16px"}}></div><h2 style={{fontWeight:700,lineHeight:1.2,fontSize:"clamp(1.6rem,4vw,2.8rem)"}}>How <span className="neon-gradient">Neural-Trace</span> Works</h2><p style={{marginTop:"16px",maxWidth:"36rem",margin:"16px auto 0",color:"rgba(255,255,255,.55)",fontSize:".95rem"}}>Six interconnected modules form an unbreakable chain of detection, response, and attribution.</p></div></FadeUp>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"16px 20px"}}>
          {FEATURES.map((f,i)=>(
            <FadeUp key={f.title} delay={i*.05}>
              <div className="cyber-card" style={{borderRadius:"12px",padding:"clamp(20px,3vw,24px)",height:"100%"}}>
                <div style={{display:"flex",alignItems:"start",justifyContent:"space-between",marginBottom:"18px"}}>
                  <div style={{padding:"8px",borderRadius:"10px",background:`rgba(${f.color==="#39FF14"?"57,255,20":f.color==="#00ff88"?"0,255,136":f.color==="#ff4444"?"255,51,51":f.color==="#00c8ff"?"0,200,255":"255,200,0"},.08)`}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2">{f.icon}</svg></div>
                  <span className={`feature-badge ${f.badge}`}>{f.badgeLabel}</span>
                </div>
                <h3 style={{fontWeight:700,fontSize:"clamp(1rem,2vw,1.125rem)",letterSpacing:".025em",marginBottom:"8px"}}>{f.title}</h3>
                <p style={{fontSize:".875rem",lineHeight:1.6,color:"rgba(255,255,255,.6)"}}>{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

const PIPELINE_STEPS=[
  {icon:<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,color:"#39FF14",label:"CAPTURE",desc:"Scapy sniffs live flows"},
  {icon:<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,color:"#00ff88",label:"EXTRACT",desc:"30 flow features"},
  {icon:<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,color:"#39FF14",label:"CLASSIFY",desc:"XGBoost ML label"},
  {icon:<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,color:"#ff4444",label:"KILL",desc:"Firewall auto-pushed"},
  {icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,color:"#ffc800",label:"REPORT",desc:"PDF evidence generated"},
];

function Pipeline(){
  const ref=useRef(null);const[running,setRunning]=useState([false,false,false,false]);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)[0,1,2,3].forEach(i=>setTimeout(()=>setRunning(prev=>{const n=[...prev];n[i]=true;return n;}),i*200))},{threshold:.3});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return(
    <section id="pipeline" style={{padding:"clamp(64px,8vw,96px) clamp(16px,4vw,24px)",background:"rgba(0,0,0,.25)"}}>
      <div style={{maxWidth:"72rem",margin:"0 auto"}}>
        <FadeUp><div style={{textAlign:"center",marginBottom:"56px"}}><div className="section-tag" style={{marginBottom:"16px"}}></div><h2 style={{fontWeight:700,fontSize:"clamp(1.5rem,4vw,2.6rem)"}}>From Packet to Evidence — <span className="neon-gradient">In Seconds</span></h2></div></FadeUp>
        <FadeUp delay={0.1}>
          <div ref={ref} className="pipeline-horizontal" style={{display:"flex",alignItems:"center"}}>
            {PIPELINE_STEPS.map((step,i)=>(
              <React.Fragment key={step.label}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",minWidth:"80px",flex:1}}>
                  <div style={{width:"56px",height:"56px",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"14px",background:`rgba(${step.color==="#39FF14"?"57,255,20":step.color==="#00ff88"?"0,255,136":step.color==="#ff4444"?"255,51,51":"255,200,0"},.08)`,border:`1px solid rgba(${step.color==="#39FF14"?"57,255,20":step.color==="#00ff88"?"0,255,136":step.color==="#ff4444"?"255,51,51":"255,200,0"},.3)`}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2">{step.icon}</svg></div>
                  <div style={{fontSize:".65rem",fontWeight:700,letterSpacing:".12em",color:step.color,fontFamily:"'Share Tech Mono',monospace",marginBottom:"5px"}}>{step.label}</div>
                  <div style={{fontSize:".7rem",color:"rgba(255,255,255,.5)"}}>{step.desc}</div>
                </div>
                {i<PIPELINE_STEPS.length-1&&<div className={`pipeline-line ${running[i]?"running":"paused"}`} style={{margin:"0 8px"}}/>}
              </React.Fragment>
            ))}
          </div>
        </FadeUp>
        <p style={{textAlign:"center",marginTop:"40px",color:"rgba(255,255,255,.4)",fontSize:".88rem"}}>Average pipeline latency: <span style={{color:"#39FF14",fontFamily:"'Share Tech Mono',monospace"}}>&lt; 340ms</span> from packet capture to firewall block</p>
      </div>
    </section>
  );
}

function Footer(){
  return(
    <footer style={{padding:"clamp(40px,6vw,64px) clamp(16px,4vw,48px)",background:"rgba(0,0,0,.5)",borderTop:"1px solid rgba(57,255,20,.1)"}}>
      <div style={{maxWidth:"80rem",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"clamp(32px,5vw,40px)",marginBottom:"40px"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
              <img src={cifaLogo} alt="Logo" style={{width:32,height:32,objectFit:'contain',borderRadius:'50%',filter:'drop-shadow(0 0 6px rgba(57,255,20,.4))'}}/>
              <span style={{color:"#39FF14",fontFamily:"'Rajdhani',sans-serif",fontSize:"1.1rem",fontWeight:700,letterSpacing:".12em"}}>NEURAL-TRACE</span>
            </div>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".88rem",lineHeight:1.7,marginBottom:"14px"}}>Protecting Pakistan's critical digital infrastructure through AI-driven threat intelligence, autonomous forensics, and real-time cyber defense.</p>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}><span className="pulse-dot"/><span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:".65rem",color:"rgba(57,255,20,.7)"}}>ALL SYSTEMS OPERATIONAL</span></div>
          </div>
          <div>
            <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".12em",color:"rgba(255,255,255,.4)",marginBottom:"18px"}}>PLATFORM</div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              {[["Our Mission","#mission"],["Platform Features","#features"],["Live Threat Map","#live-map"],["Detection Pipeline","#pipeline"]].map(([l,h])=><a key={l} href={h} style={{color:"rgba(255,255,255,.6)",fontSize:".88rem",textDecoration:"none",transition:"color .2s"}} onMouseOver={e=>e.currentTarget.style.color="#39FF14"} onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}>{l}</a>)}
            </div>
          </div>
          <div>
            <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".12em",color:"rgba(255,255,255,.4)",marginBottom:"18px"}}>SYSTEM LOG</div>
            <div style={{borderRadius:"10px",padding:"14px",background:"#010801",border:"1px solid rgba(57,255,20,.15)",fontFamily:"'Share Tech Mono',monospace",fontSize:".65rem",lineHeight:1.9}}>
              <div style={{color:"#39FF14"}}>&gt; system.init() -- OK</div>
              <div style={{color:"rgba(57,255,20,.6)"}}>&gt; cowrie_honeypot: ACTIVE</div>
              <div style={{color:"rgba(57,255,20,.6)"}}>&gt; dionaea_trap: ACTIVE</div>
              <div style={{color:"rgba(57,255,20,.6)"}}>&gt; xgboost_classifier: v2.1.1</div>
              <div style={{color:"rgba(57,255,20,.6)"}}>&gt; nodes: KHI LHR ISB QTA PEW</div>
              <div style={{color:"#ff4444"}}>&gt; alerts: HIGH SEVERITY ACTIVE</div>
              <div style={{color:"rgba(57,255,20,.6)"}}>&gt; uptime: 99.97%</div>
              <div style={{color:"#39FF14"}}>&gt; <span className="typing-cursor"/></div>
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(57,255,20,.08)",paddingTop:"20px",display:"flex",flexDirection:"column",gap:"12px",alignItems:"center"}}>
          <p style={{color:"rgba(255,255,255,.28)",fontSize:".75rem",textAlign:"center"}}>© 2026 Neural-Trace — Threat Intelligence & Digital Forensics. All rights reserved. Developed in Pakistan for Pakistan's cyber defense.</p>
          <div style={{display:"flex",gap:"20px",flexWrap:"wrap",justifyContent:"center"}}>
            {[["Privacy Policy","Privacy Policy\n\nNeural-Trace collects network packet metadata and honeypot logs solely for cybersecurity threat detection. No personal user data is sold or shared with third parties.\n\n© 2026 Neural-Trace."],["Terms of Service","Terms of Service\n\nNeural-Trace is authorized for registered citizens, organizations, and government agencies in Pakistan.\n\n© 2026 Neural-Trace."],["Security Disclosure","Security Disclosure\n\nFound a vulnerability? Contact: security@neuraltrace.pk\nResponse time: 48 hours\n\n© 2026 Neural-Trace."]].map(([l,m])=><button key={l} onClick={()=>alert(m)} style={{color:"rgba(255,255,255,.3)",fontSize:".75rem",background:"none",border:"none",cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",transition:"color .2s"}} onMouseOver={e=>e.currentTarget.style.color="#39FF14"} onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,.3)"}>{l}</button>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';

export default function LandingPage({ onNavigate }) {
  const [splashDone,setSplashDone]=useState(false);

  useEffect(()=>{
    const id="neural-trace-styles";
    if(!document.getElementById(id)){const style=document.createElement("style");style.id=id;style.textContent=GLOBAL_STYLES;document.head.appendChild(style);}
  },[]);

  // Wire window.__navigateTo for compatibility
  window.__navigateTo = onNavigate;

  return(
    <div style={{background:"#050a05",minHeight:"100vh",fontFamily:"'Rajdhani',sans-serif"}}>
      <Splash onDone={()=>setSplashDone(true)}/>
      <Navbar onOpenLogin={()=>onNavigate('login')}/>
      <Hero onOpenLogin={()=>onNavigate('login')} started={splashDone}/>
      <Mission/>
      <LiveMap/>
      <Features/>
      <Pipeline/>
      <Footer/>
    </div>
  );
}

