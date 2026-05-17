// // <!DOCTYPE html>
// // <html lang="en">
// // <head>
// // <meta charset="UTF-8"/>
// // <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
// // <title>Neural-Trace — AI Threat Intelligence & Digital Forensics</title>
// // <link rel="preconnect" href="https://fonts.googleapis.com"/>
// // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
// // <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
// // <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
// // <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
// // <script src="https://cdn.tailwindcss.com"></script>
// // <script>tailwind.config={theme:{extend:{colors:{'neon':'#39FF14','neon-light':'#00ff88'},fontFamily:{rajdhani:['Rajdhani','sans-serif'],mono:['Share Tech Mono','monospace']}}}}</script>
// // <style>
// // :root{--neon:#39FF14;--neon-light:#00ff88;--bg:#050a05;--card-border:rgba(57,255,20,0.15);--card-bg:rgba(57,255,20,0.03);}
// // *{box-sizing:border-box;}
// // html{scroll-behavior:smooth;}
// // body{background:var(--bg);color:#fff;font-family:'Rajdhani',sans-serif;overflow-x:hidden;}
// // ::-webkit-scrollbar{width:5px;}
// // ::-webkit-scrollbar-track{background:#050a05;}
// // ::-webkit-scrollbar-thumb{background:var(--neon);border-radius:3px;}

// // /* SPLASH */
// // #splash{position:fixed;inset:0;z-index:9999;background:#050a05;display:flex;align-items:center;justify-content:center;transition:opacity 1s ease,visibility 1s ease;}
// // #splash.hide{opacity:0;visibility:hidden;pointer-events:none;}
// // #splash-canvas{position:absolute;inset:0;opacity:.12;z-index:0;}
// // .splash-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;}
// // .splash-logo-wrap{opacity:0;transform:scale(.5);animation:splashIn 1s cubic-bezier(.34,1.56,.64,1) .2s forwards;position:relative;display:inline-block;}
// // @keyframes splashIn{to{opacity:1;transform:scale(1);}}
// // .splash-logo-wrap::after{content:'';position:absolute;inset:-10px;border-radius:50%;border:1.5px solid rgba(57,255,20,.45);animation:ringOut 2.2s ease-out 1.3s infinite;}
// // @keyframes ringOut{0%{transform:scale(1);opacity:.8;}100%{transform:scale(1.7);opacity:0;}}
// // .splash-title{opacity:0;transform:translateY(18px);animation:fadeUp .7s ease 1.1s forwards;font-size:clamp(2rem,8vw,3.5rem);font-weight:700;letter-spacing:.18em;color:#39FF14;text-shadow:0 0 28px rgba(57,255,20,.65);margin-top:18px;white-space:nowrap;}
// // @keyframes fadeUp{to{opacity:1;transform:translateY(0);}}
// // .splash-line{width:0;height:2px;background:linear-gradient(90deg,transparent,#39FF14,transparent);animation:lineGrow .8s ease 1.5s forwards;margin-top:12px;}
// // @keyframes lineGrow{to{width:min(280px,70vw);}}
// // .splash-sub{opacity:0;transform:translateY(8px);animation:fadeUp .6s ease 1.8s forwards;font-family:'Share Tech Mono',monospace;font-size:clamp(.52rem,1.9vw,.76rem);letter-spacing:.2em;color:rgba(255,255,255,.5);margin-top:8px;text-align:center;padding:0 20px;}
// // .splash-boot{opacity:0;animation:fadeUp .5s ease 2.2s forwards;font-family:'Share Tech Mono',monospace;font-size:.62rem;color:rgba(57,255,20,.5);letter-spacing:.12em;margin-top:26px;}
// // .splash-bar-wrap{width:min(200px,60vw);height:2px;background:rgba(57,255,20,.1);border-radius:1px;overflow:hidden;margin-top:10px;opacity:0;animation:fadeUp .4s ease 2.4s forwards;}
// // .splash-bar-fill{height:100%;background:var(--neon);width:0;animation:barFill 1.4s ease 2.5s forwards;box-shadow:0 0 8px #39FF14;}
// // @keyframes barFill{to{width:100%;}}

// // /* NAVBAR */
// // #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;backdrop-filter:blur(14px);transition:all .3s;border-bottom:1px solid transparent;}
// // #navbar.scrolled{background:rgba(5,10,5,.96);border-bottom:1px solid var(--neon);box-shadow:0 0 30px rgba(57,255,20,.1);}

// // /* HERO */
// // #matrix-canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:.17;}
// // .hero-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(57,255,20,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);}

// // /* PULSES */
// // @keyframes pd{0%,100%{box-shadow:0 0 0 0 rgba(57,255,20,.7);}50%{box-shadow:0 0 0 8px rgba(57,255,20,0);}}
// // @keyframes pr{0%,100%{box-shadow:0 0 0 0 rgba(255,51,51,.7);}50%{box-shadow:0 0 0 8px rgba(255,51,51,0);}}
// // .pulse-dot{width:8px;height:8px;border-radius:50%;background:var(--neon);animation:pd 1.5s infinite;display:inline-block;flex-shrink:0;}
// // .pulse-dot-red{width:8px;height:8px;border-radius:50%;background:#ff3333;animation:pr 1.5s infinite;display:inline-block;flex-shrink:0;}

// // /* TEXT */
// // .neon-gradient{background:linear-gradient(90deg,var(--neon),var(--neon-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
// // .section-tag{font-family:'Share Tech Mono',monospace;font-size:.73rem;color:var(--neon);letter-spacing:.15em;}
// // .typing-cursor::after{content:'|';color:var(--neon);animation:blink .7s step-end infinite;}
// // @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

// // /* CARDS */
// // .cyber-card{border:1px solid var(--card-border);background:var(--card-bg);transition:all .3s;position:relative;overflow:hidden;}
// // .cyber-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(57,255,20,.05) 0%,transparent 60%);opacity:0;transition:opacity .3s;}
// // .cyber-card:hover::before{opacity:1;}
// // .cyber-card:hover{border-color:rgba(57,255,20,.6);box-shadow:0 0 20px rgba(57,255,20,.15);transform:translateY(-2px);}

// // /* FADE UP */
// // .fade-up{opacity:0;transform:translateY(28px);transition:opacity .7s,transform .7s;}
// // .fade-up.visible{opacity:1;transform:translateY(0);}

// // /* BUTTONS */
// // .btn-neon{background:var(--neon);color:#050a05;font-weight:700;letter-spacing:.05em;transition:all .3s;font-family:'Rajdhani',sans-serif;cursor:pointer;border:none;}
// // .btn-neon:hover{background:var(--neon-light);box-shadow:0 0 20px rgba(57,255,20,.5);transform:translateY(-1px);}
// // .btn-ghost{border:1px solid var(--neon);color:var(--neon);background:transparent;font-weight:600;letter-spacing:.05em;transition:all .3s;font-family:'Rajdhani',sans-serif;cursor:pointer;}
// // .btn-ghost:hover{background:rgba(57,255,20,.1);box-shadow:0 0 15px rgba(57,255,20,.3);}

// // /* ── MAP FIX ── */
// // #map-container{
// //   width:100%;
// //   height:420px;
// //   border-radius:8px;
// //   border:1px solid rgba(57,255,20,.25);
// //   overflow:hidden;
// //   position:relative;
// //   background:#0a120a;
// // }
// // #threat-map{
// //   width:100% !important;
// //   height:100% !important;
// //   position:absolute;
// //   top:0;left:0;right:0;bottom:0;
// //   z-index:1;
// // }
// // .leaflet-container{background:#0a120a !important;}
// // .leaflet-tile-pane{filter:brightness(.85) saturate(.7);}
// // @media(max-width:640px){#map-container{height:280px;}}

// // /* PIPELINE */
// // .pipeline-line{flex:1;height:2px;background:repeating-linear-gradient(90deg,var(--neon) 0,var(--neon) 8px,transparent 8px,transparent 16px);background-size:200% 100%;animation:dashFlow 2s linear infinite;}
// // @keyframes dashFlow{from{background-position:200% 0;}to{background-position:0 0;}}
// // .pipeline-line.paused{animation-play-state:paused;}
// // .pipeline-line.running{animation-play-state:running;}
// // @media(max-width:768px){
// //   .pipeline-horizontal{flex-direction:column;align-items:center;}
// //   .pipeline-line{width:2px;height:30px;flex:none;background:repeating-linear-gradient(180deg,var(--neon) 0,var(--neon) 8px,transparent 8px,transparent 16px);margin:0 auto;}
// // }

// // /* BADGES */
// // .feature-badge{font-family:'Share Tech Mono',monospace;font-size:.58rem;letter-spacing:.1em;padding:2px 7px;border-radius:2px;white-space:nowrap;}
// // .badge-passive{background:rgba(57,255,20,.15);color:var(--neon);}
// // .badge-realtime{background:rgba(0,255,136,.15);color:var(--neon-light);}
// // .badge-ai{background:rgba(57,255,20,.15);color:var(--neon);}
// // .badge-auto{background:rgba(255,51,51,.15);color:#ff6666;}
// // .badge-forensics{background:rgba(0,200,255,.15);color:#00c8ff;}
// // .badge-legal{background:rgba(255,200,0,.15);color:#ffc800;}

// // .city-item{border-bottom:1px solid rgba(57,255,20,.08);transition:background .2s;}
// // .city-item:hover{background:rgba(57,255,20,.05);}
// // .scanline-bg{background-image:linear-gradient(rgba(57,255,20,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,.02) 1px,transparent 1px);background-size:40px 40px;}
// // body::before{content:'';position:fixed;inset:0;z-index:-1;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");background-size:200px 200px;opacity:.4;pointer-events:none;}
// // #mobile-menu{display:none;}
// // #mobile-menu.open{display:block;}

// // /* LOGIN MODAL */
// // #login-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.87);backdrop-filter:blur(12px);display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto;}
// // #login-modal.open{display:flex;}
// // .modal-card{background:#0a141b;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:clamp(22px,5vw,36px);width:100%;max-width:440px;box-shadow:0 0 50px rgba(57,255,20,.12);position:relative;max-height:90vh;overflow-y:auto;}
// // .modal-card::-webkit-scrollbar{width:3px;}
// // .modal-card::-webkit-scrollbar-thumb{background:var(--neon);}
// // .modal-tab{padding:10px 20px;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:.92rem;letter-spacing:.05em;cursor:pointer;border:none;background:transparent;color:#6b7280;border-bottom:2px solid transparent;transition:all .2s;}
// // .modal-tab.active{color:var(--neon);border-bottom-color:var(--neon);}
// // .modal-input{width:100%;background:#040a0f;border:1px solid rgba(57,255,20,.2);padding:12px 14px;border-radius:12px;color:#fff;outline:none;font-family:'Rajdhani',sans-serif;font-size:.92rem;transition:border-color .2s;}
// // .modal-input:focus{border-color:var(--neon);}
// // .modal-input::placeholder{color:#4b5563;}
// // .modal-input option{background:#040a0f;color:#fff;}
// // .modal-input-wrap{position:relative;}
// // .modal-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#6b7280;transition:color .2s;display:flex;align-items:center;}
// // .modal-eye:hover{color:var(--neon);}
// // .str-bar{height:4px;flex:1;border-radius:2px;transition:background .3s;}
// // .role-desc{font-size:.72rem;padding:8px 12px;border-radius:8px;border:1px solid;}
// // .role-citizen{background:rgba(57,255,20,.05);border-color:rgba(57,255,20,.2);color:var(--neon);}
// // .role-company{background:rgba(59,130,246,.05);border-color:rgba(59,130,246,.25);color:#60a5fa;}
// // .popular-card{border-color:var(--neon)!important;box-shadow:0 0 30px rgba(57,255,20,.2);}
// // </style>
// // </head>
// // <body class="font-rajdhani">

// // -- ════════════════════════════════
// //      SPLASH SCREEN
// // ════════════════════════════════ --
// // <div id="splash">
// //   <canvas id="splash-canvas"></canvas>
// //   <div style="position:absolute;inset:0;background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(57,255,20,.09) 0%,transparent 70%);z-index:0;pointer-events:none;"></div>
// //   <div class="splash-inner">
// //     <div class="splash-logo-wrap">
// //       <svg width="150" height="150" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
// //            style="filter:drop-shadow(0 0 28px rgba(57,255,20,.6)) drop-shadow(0 0 60px rgba(57,255,20,.25));">
// //         <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" stroke-width="2"/>
// //         <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" stroke-width="2.5" stroke-dasharray="4 2" opacity=".5"/>
// //         <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,0.5)" stroke="#39FF14" stroke-width="2"/>
// //         <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
// //         <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
// //         <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
// //         <rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
// //         <path d="M73 58 Q80 52 87 58" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9"/>
// //         <path d="M68 53 Q80 44 92 53" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" opacity=".65"/>
// //         <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
// //         <g opacity=".7" stroke="#1a1a1a" stroke-width=".5">
// //           <ellipse cx="34" cy="80" rx="5" ry="3" fill="#0d5c23" transform="rotate(-30 34 80)"/>
// //           <ellipse cx="30" cy="88" rx="5" ry="3" fill="#0d5c23" transform="rotate(-20 30 88)"/>
// //           <ellipse cx="28" cy="97" rx="5" ry="3" fill="#0d5c23" transform="rotate(-10 28 97)"/>
// //           <ellipse cx="30" cy="106" rx="5" ry="3" fill="#0d5c23" transform="rotate(5 30 106)"/>
// //           <ellipse cx="36" cy="113" rx="5" ry="3" fill="#0d5c23" transform="rotate(20 36 113)"/>
// //           <ellipse cx="38" cy="72" rx="5" ry="3" fill="#0d5c23" transform="rotate(-45 38 72)"/>
// //           <line x1="34" y1="80" x2="42" y2="115" stroke="#39FF14" stroke-width=".8" opacity=".4"/>
// //         </g>
// //         <g opacity=".7" stroke="#1a1a1a" stroke-width=".5">
// //           <ellipse cx="126" cy="80" rx="5" ry="3" fill="#0d5c23" transform="rotate(30 126 80)"/>
// //           <ellipse cx="130" cy="88" rx="5" ry="3" fill="#0d5c23" transform="rotate(20 130 88)"/>
// //           <ellipse cx="132" cy="97" rx="5" ry="3" fill="#0d5c23" transform="rotate(10 132 97)"/>
// //           <ellipse cx="130" cy="106" rx="5" ry="3" fill="#0d5c23" transform="rotate(-5 130 106)"/>
// //           <ellipse cx="124" cy="113" rx="5" ry="3" fill="#0d5c23" transform="rotate(-20 124 113)"/>
// //           <ellipse cx="122" cy="72" rx="5" ry="3" fill="#0d5c23" transform="rotate(45 122 72)"/>
// //           <line x1="126" y1="80" x2="118" y2="115" stroke="#39FF14" stroke-width=".8" opacity=".4"/>
// //         </g>
// //         <path d="M52 126 Q80 118 108 126 Q108 136 80 138 Q52 136 52 126Z" fill="#39FF14"/>
// //         <text x="80" y="134" text-anchor="middle" font-family="Rajdhani,sans-serif" font-size="10" font-weight="700" fill="#050a05" letter-spacing="1">EST 2026</text>
// //         <path id="topArc" d="M 24 80 A 56 56 0 0 1 136 80" fill="none"/>
// //         <text font-family="Rajdhani,sans-serif" font-size="8.5" font-weight="700" fill="white" letter-spacing="1.5">
// //           <textPath href="#topArc" startOffset="4%">THREAT INTELLIGENCE &amp; DIGITAL FORENSICS</textPath>
// //         </text>
// //       </svg>
// //     </div>
// //     <div class="splash-title">NEURAL-TRACE</div>
// //     <div class="splash-line"></div>
// //     <div class="splash-sub">PAKISTAN'S AI-POWERED CYBER DEFENSE PLATFORM</div>
// //     <div class="splash-boot">INITIALIZING DEFENSE MATRIX...</div>
// //     <div class="splash-bar-wrap"><div class="splash-bar-fill"></div></div>
// //   </div>
// // </div>

// // <!-- ════════════════════════════════
// //      LOGIN MODAL
// // ════════════════════════════════ -->
// // <div id="login-modal" role="dialog" aria-modal="true">
// //   <div class="modal-card">
// //     <button onclick="closeLogin()" style="color:rgba(57,255,20,.5);font-size:.72rem;font-family:'Share Tech Mono',monospace;letter-spacing:.08em;border:none;background:none;cursor:pointer;margin-bottom:14px;display:flex;align-items:center;gap:6px;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(57,255,20,.5)'">&larr; BACK TO NEURAL-TRACE HOME</button>

// //     <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:16px;">
// //       <svg width="68" height="68" viewBox="0 0 160 160" fill="none" style="margin-bottom:14px;filter:drop-shadow(0 0 12px rgba(57,255,20,.35));">
// //         <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" stroke-width="2"/>
// //         <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" stroke-width="2" stroke-dasharray="4 2" opacity=".4"/>
// //         <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" stroke-width="2"/>
// //         <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
// //         <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
// //         <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
// //         <rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
// //         <path d="M73 58 Q80 52 87 58" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9"/>
// //         <path d="M68 53 Q80 44 92 53" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
// //         <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
// //         <path d="M52 126 Q80 118 108 126 Q108 136 80 138 Q52 136 52 126Z" fill="#39FF14"/>
// //         <text x="80" y="134" text-anchor="middle" font-family="Rajdhani,sans-serif" font-size="10" font-weight="700" fill="#050a05" letter-spacing="1">EST 2026</text>
// //       </svg>
// //       <div style="display:flex;gap:0;border-bottom:1px solid rgba(57,255,20,.2);width:100%;justify-content:center;">
// //         <button class="modal-tab active" id="tab-login" onclick="switchTab('login')">Login</button>
// //         <button class="modal-tab" id="tab-register" onclick="switchTab('register')">Register</button>
// //       </div>
// //     </div>

// //     <div id="modal-error" style="display:none;margin-bottom:12px;padding:10px 14px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:10px;color:#f87171;font-size:.82rem;text-align:center;"></div>

// //     <!-- LOGIN FORM -->
// //     <form id="login-form" onsubmit="handleLogin(event)">
// //       <div style="display:flex;flex-direction:column;gap:12px;">
// //         <div>
// //           <label style="font-size:.72rem;color:var(--neon);font-weight:700;letter-spacing:.06em;display:block;margin-bottom:4px;margin-left:2px;">ACCOUNT TYPE</label>
// //           <select id="login-role" class="modal-input">
// //             <option value="citizen">Citizen</option>
// //             <option value="admin">Organization Admin</option>
// //           </select>
// //         </div>
// //         <input id="login-email" type="email" required placeholder="Email Address" class="modal-input" autocomplete="username"/>
// //         <div class="modal-input-wrap">
// //           <input id="login-pass" type="password" required placeholder="Password" class="modal-input" style="padding-right:42px;" autocomplete="current-password"/>
// //           <button type="button" class="modal-eye" onclick="togglePw('login-pass')">
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
// //           </button>
// //         </div>
// //         <button type="submit" id="login-btn" class="btn-neon" style="width:100%;padding:13px;border-radius:12px;font-size:.92rem;letter-spacing:.05em;margin-top:4px;">
// //           AUTHENTICATE &amp; SIGN IN
// //         </button>
// //       </div>
// //     </form>

// //     <!-- REGISTER FORM -->
// //     <form id="register-form" style="display:none;" onsubmit="handleRegister(event)">
// //       <div style="display:flex;flex-direction:column;gap:12px;">
// //         <div>
// //           <label style="font-size:.72rem;color:var(--neon);font-weight:700;letter-spacing:.06em;display:block;margin-bottom:4px;margin-left:2px;">REGISTER AS</label>
// //           <select id="reg-role" class="modal-input" onchange="updateRoleDesc()">
// //             <option value="citizen">Citizen (Free)</option>
// //             <option value="company">Organization / Corporate</option>
// //           </select>
// //         </div>
// //         <div id="role-desc" class="role-desc role-citizen">Access: Live Map, General Alerts, IP Lookup</div>
// //         <input id="reg-name" type="text" required placeholder="Full Name" class="modal-input" autocomplete="name"/>
// //         <input id="reg-email" type="email" required placeholder="Email Address" class="modal-input" autocomplete="email"/>
// //         <input id="reg-phone" type="tel" required placeholder="Phone Number" class="modal-input" autocomplete="tel"/>
// //         <div class="modal-input-wrap">
// //           <input id="reg-pass" type="password" required placeholder="Password" class="modal-input" style="padding-right:42px;" oninput="checkStrength()" autocomplete="new-password"/>
// //           <button type="button" class="modal-eye" onclick="togglePw('reg-pass')">
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
// //           </button>
// //         </div>
// //         <div id="strength-panel" style="display:none;background:#060e13;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:14px;">
// //           <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
// //             <span style="font-family:'Share Tech Mono',monospace;font-size:.6rem;color:#6b7280;letter-spacing:.08em;">PASSWORD STRENGTH</span>
// //             <span id="str-label" style="font-size:.7rem;font-weight:700;"></span>
// //           </div>
// //           <div style="display:flex;gap:4px;margin-bottom:10px;" id="str-bars">
// //             <div class="str-bar" style="background:#1e2d27;"></div>
// //             <div class="str-bar" style="background:#1e2d27;"></div>
// //             <div class="str-bar" style="background:#1e2d27;"></div>
// //             <div class="str-bar" style="background:#1e2d27;"></div>
// //             <div class="str-bar" style="background:#1e2d27;"></div>
// //           </div>
// //           <div id="rules-list" style="display:flex;flex-direction:column;gap:5px;"></div>
// //         </div>
// //         <div>
// //           <div class="modal-input-wrap">
// //             <input id="reg-confirm" type="password" required placeholder="Confirm Password" class="modal-input" style="padding-right:42px;" oninput="checkConfirm()" autocomplete="new-password"/>
// //             <button type="button" class="modal-eye" onclick="togglePw('reg-confirm')">
// //               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
// //             </button>
// //           </div>
// //           <div id="confirm-msg" style="margin-top:4px;font-size:.73rem;font-weight:600;padding-left:4px;min-height:18px;"></div>
// //         </div>
// //         <button type="submit" id="reg-btn" class="btn-neon" style="width:100%;padding:13px;border-radius:12px;font-size:.92rem;letter-spacing:.05em;margin-top:4px;opacity:.5;cursor:not-allowed;" disabled>
// //           CREATE ACCOUNT / SIGN UP
// //         </button>
// //       </div>
// //     </form>

// //     <div style="text-align:center;margin-top:14px;">
// //       <button id="switch-link" style="background:none;border:none;cursor:pointer;color:rgba(57,255,20,.6);font-size:.85rem;font-family:'Rajdhani',sans-serif;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(57,255,20,.6)'">
// //         Don't have an account? Sign up here
// //       </button>
// //     </div>
// //     <p style="text-align:center;color:#4b5563;font-size:.65rem;font-family:'Share Tech Mono',monospace;margin-top:14px;letter-spacing:.06em;">
// //       SYSTEM STATUS: <span style="color:var(--neon);">ACTIVE</span> | Neural-Trace
// //     </p>
// //   </div>
// // </div>

// // <!-- ════════════════════════════════
// //      NAVBAR
// // ════════════════════════════════ -->
// // <nav id="navbar" class="w-full py-3 px-4 md:px-6">
// //   <div class="max-w-7xl mx-auto flex items-center justify-between">
// //     <a href="#" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
// //       <svg width="36" height="36" viewBox="0 0 160 160" fill="none" style="filter:drop-shadow(0 0 8px rgba(57,255,20,.55));flex-shrink:0;">
// //         <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" stroke-width="2.5"/>
// //         <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" stroke-width="2" stroke-dasharray="4 2" opacity=".4"/>
// //         <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" stroke-width="2"/>
// //         <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
// //         <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
// //         <circle cx="80" cy="80" r="3" fill="#0a1f2e"/><rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
// //         <path d="M73 58 Q80 52 87 58" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9"/>
// //         <path d="M68 53 Q80 44 92 53" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
// //         <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
// //         <path d="M52 126 Q80 118 108 126 Q108 136 80 138 Q52 136 52 126Z" fill="#39FF14"/>
// //         <text x="80" y="134" text-anchor="middle" font-family="Rajdhani,sans-serif" font-size="10" font-weight="700" fill="#050a05" letter-spacing="1">EST 2026</text>
// //       </svg>
// //       <span style="color:#39FF14;font-family:'Rajdhani',sans-serif;font-size:clamp(.95rem,2.5vw,1.15rem);font-weight:700;letter-spacing:.14em;">NEURAL-TRACE</span>
// //     </a>
// //     <div class="hidden md:flex items-center gap-6 lg:gap-8">
// //       <a href="#mission"  style="color:rgba(255,255,255,.7);font-size:.82rem;font-weight:600;letter-spacing:.1em;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.7)'">MISSION</a>
// //       <a href="#features" style="color:rgba(255,255,255,.7);font-size:.82rem;font-weight:600;letter-spacing:.1em;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.7)'">FEATURES</a>
// //       <a href="#live-map" style="color:rgba(255,255,255,.7);font-size:.82rem;font-weight:600;letter-spacing:.1em;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.7)'">LIVE MAP</a>
// //       <a href="#pipeline" style="color:rgba(255,255,255,.7);font-size:.82rem;font-weight:600;letter-spacing:.1em;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.7)'">PIPELINE</a>
// //     </div>
// //     <div class="hidden md:flex">
// //       <button class="btn-neon px-5 py-2 rounded text-sm tracking-wider" onclick="openLogin(false)">ACCESS VAULT</button>
// //     </div>
// //     <button class="md:hidden flex flex-col gap-1.5 p-2" onclick="toggleMenu()">
// //       <span class="block w-5 h-0.5" style="background:#39FF14;"></span>
// //       <span class="block w-5 h-0.5" style="background:#39FF14;"></span>
// //       <span class="block w-5 h-0.5" style="background:#39FF14;"></span>
// //     </button>
// //   </div>
// //   <div id="mobile-menu" class="md:hidden mt-3 px-4 pb-4 pt-4" style="border-top:1px solid rgba(57,255,20,.18);">
// //     <div style="display:flex;flex-direction:column;gap:14px;">
// //       <a href="#mission"  style="color:rgba(255,255,255,.75);font-size:.85rem;font-weight:600;letter-spacing:.1em;text-decoration:none;" onclick="toggleMenu()">MISSION</a>
// //       <a href="#features" style="color:rgba(255,255,255,.75);font-size:.85rem;font-weight:600;letter-spacing:.1em;text-decoration:none;" onclick="toggleMenu()">FEATURES</a>
// //       <a href="#live-map" style="color:rgba(255,255,255,.75);font-size:.85rem;font-weight:600;letter-spacing:.1em;text-decoration:none;" onclick="toggleMenu()">LIVE MAP</a>
// //       <a href="#pipeline" style="color:rgba(255,255,255,.75);font-size:.85rem;font-weight:600;letter-spacing:.1em;text-decoration:none;" onclick="toggleMenu()">PIPELINE</a>
// //       <div style="border-top:1px solid rgba(57,255,20,.1);padding-top:12px;">
// //         <button class="btn-neon px-5 py-2 rounded text-sm tracking-wider" onclick="toggleMenu();openLogin(false);">ACCESS VAULT</button>
// //       </div>
// //     </div>
// //   </div>
// // </nav>

// // <!-- ════════════════════════════════
// //      HERO
// // ════════════════════════════════ -->
// // <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden" style="background:#050a05;">
// //   <canvas id="matrix-canvas"></canvas>
// //   <div class="hero-grid"></div>
// //   <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(57,255,20,.06) 0%,transparent 70%);z-index:0;pointer-events:none;"></div>
// //   <div class="relative z-10 text-center max-w-5xl mx-auto px-4 md:px-6" style="padding-top:clamp(90px,12vw,120px);">
// //     <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style="border:1px solid rgba(57,255,20,.3);background:rgba(57,255,20,.05);">
// //       <span class="pulse-dot"></span>
// //       <span style="color:#39FF14;font-family:'Share Tech Mono',monospace;font-size:clamp(.5rem,1.8vw,.72rem);letter-spacing:.14em;">SYSTEM ONLINE &mdash; MONITORING PAKISTAN</span>
// //     </div>
// //     <h1 class="font-bold leading-tight tracking-tight mb-6" style="font-size:clamp(1.7rem,5.5vw,4.2rem);">
// //       <span id="typed-text" class="typing-cursor"></span>
// //     </h1>
// //     <p class="mb-10 max-w-2xl mx-auto leading-relaxed" style="color:rgba(255,255,255,.65);font-size:clamp(.88rem,2.2vw,1.05rem);">
// //       Defending Pakistan's critical digital infrastructure &mdash; in real time &mdash; with passive honeypot traps, live packet analytics, and automated forensic attribution under PECA 2016.
// //     </p>
// //     <div class="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
// //       <button class="btn-neon px-6 md:px-8 py-3 rounded text-sm md:text-base tracking-wider flex items-center gap-2" onclick="openLogin(false)">
// //         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
// //         ACTIVATE AGENT NODE
// //       </button>
// //       <button class="btn-ghost px-6 md:px-8 py-3 rounded text-sm md:text-base tracking-wider" onclick="document.getElementById('mission').scrollIntoView({behavior:'smooth'})">OUR MISSION</button>
// //     </div>
// //     <div class="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
// //       <div class="cyber-card rounded p-3 md:p-4 text-center"><div class="text-xl md:text-2xl font-bold mb-1" style="color:#39FF14;font-family:'Share Tech Mono',monospace;" id="stat1">0%</div><div class="text-xs tracking-wider" style="color:rgba(255,255,255,.5);">CLASSIFIER ACCURACY</div></div>
// //       <div class="cyber-card rounded p-3 md:p-4 text-center"><div class="text-xl md:text-2xl font-bold mb-1" style="color:#39FF14;font-family:'Share Tech Mono',monospace;" id="stat2">0</div><div class="text-xs tracking-wider" style="color:rgba(255,255,255,.5);">ATTACK VECTORS</div></div>
// //       <div class="cyber-card rounded p-3 md:p-4 text-center"><div class="text-xl md:text-2xl font-bold mb-1" style="color:#39FF14;font-family:'Share Tech Mono',monospace;" id="stat3">0</div><div class="text-xs tracking-wider" style="color:rgba(255,255,255,.5);">REAL-TIME FEATURES</div></div>
// //       <div class="cyber-card rounded p-3 md:p-4 text-center"><div class="text-xl md:text-2xl font-bold mb-1" style="color:#39FF14;font-family:'Share Tech Mono',monospace;" id="stat4">0</div><div class="text-xs tracking-wider" style="color:rgba(255,255,255,.5);">CITY NODES ACTIVE</div></div>
// //     </div>
// //   </div>
// //   <div style="position:absolute;bottom:0;left:0;right:0;height:110px;background:linear-gradient(to top,#050a05,transparent);z-index:5;pointer-events:none;"></div>
// // </section>

// // <!-- ════════════════════════════════
// //      MISSION
// // ════════════════════════════════ -->
// // <section id="mission" class="py-16 md:py-24 px-4 md:px-6 scanline-bg">
// //   <div class="max-w-7xl mx-auto">
// //     <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
// //       <div class="fade-up">
// //         <div class="section-tag mb-4">// MISSION.BRIEF</div>
// //         <h2 class="font-bold leading-tight mb-6" style="font-size:clamp(1.7rem,4.5vw,2.8rem);">Securing Pakistan's<br/><span class="neon-gradient">Digital Frontier</span></h2>
// //         <p class="text-base leading-relaxed mb-5" style="color:rgba(255,255,255,.65);">Pakistan's digital infrastructure faces an escalating barrage of state-sponsored intrusions, ransomware campaigns, and critical sector attacks — yet the gap between threat detection and legal accountability remains dangerously wide.</p>
// //         <p class="text-base leading-relaxed" style="color:rgba(255,255,255,.65);">Neural-Trace closes that gap. By combining passive Cowrie + Dionaea honeypot intelligence, real-time XGBoost classification, and automated forensic report generation, we deliver a seamless pipeline from first packet capture to court-admissible evidence under PECA 2016.</p>
// //         <div class="mt-8 flex items-center gap-3"><div style="width:40px;height:2px;background:#39FF14;"></div><span class="text-xs tracking-widest" style="color:rgba(255,255,255,.4);">BUILT FOR PAKISTAN'S CYBER DEFENSE</span></div>
// //       </div>
// //       <div class="grid grid-cols-2 gap-3 fade-up" style="transition-delay:.15s;">
// //         <div class="cyber-card rounded-lg p-4"><div class="mb-3"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div><div class="text-sm font-bold tracking-wider mb-2" style="color:#39FF14;">DETECT</div><p class="text-xs leading-relaxed" style="color:rgba(255,255,255,.6);">Real-time XGBoost ML anomaly detection on live packet flows with 99%+ accuracy</p></div>
// //         <div class="cyber-card rounded-lg p-4"><div class="mb-3"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4444" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div><div class="text-sm font-bold tracking-wider mb-2" style="color:#ff4444;">RESPOND</div><p class="text-xs leading-relaxed" style="color:rgba(255,255,255,.6);">Autonomous iptables firewall rules kill malicious sessions within 340ms</p></div>
// //         <div class="cyber-card rounded-lg p-4"><div class="mb-3"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div><div class="text-sm font-bold tracking-wider mb-2" style="color:#00c8ff;">ATTRIBUTE</div><p class="text-xs leading-relaxed" style="color:rgba(255,255,255,.6);">GeoIP + ASN fingerprinting traces attacks to source with ISP-level precision</p></div>
// //         <div class="cyber-card rounded-lg p-4"><div class="mb-3"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffc800" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div><div class="text-sm font-bold tracking-wider mb-2" style="color:#ffc800;">REPORT</div><p class="text-xs leading-relaxed" style="color:rgba(255,255,255,.6);">SHA-256 sealed PDF forensic reports for FIA Cybercrime Wing submission under PECA 2016</p></div>
// //       </div>
// //     </div>
// //   </div>
// // </section>

// // <!-- ════════════════════════════════
// //      LIVE MAP
// // ════════════════════════════════ -->
// // <section id="live-map" class="py-16 md:py-20 px-4 md:px-6" style="background:rgba(0,0,0,.3);">
// //   <div class="max-w-7xl mx-auto">
// //     <div class="flex flex-wrap items-center gap-3 mb-8 fade-up">
// //       <span class="pulse-dot-red"></span>
// //       <span style="font-family:'Share Tech Mono',monospace;color:#39FF14;font-size:clamp(.62rem,1.8vw,.82rem);letter-spacing:.14em;">LIVE THREAT MAP &mdash; PAKISTAN</span>
// //       <div style="flex:1;height:1px;background:rgba(57,255,20,.18);margin-left:6px;min-width:16px;"></div>
// //       <span style="font-family:'Share Tech Mono',monospace;color:rgba(255,255,255,.35);font-size:.68rem;">FEED ACTIVE</span>
// //     </div>
// //     <div class="grid md:grid-cols-3 gap-5 fade-up" style="transition-delay:.1s;">
// //       <div class="md:col-span-2">
// //         <!-- MAP CONTAINER — fixed height wrapper solves Leaflet render issues -->
// //         <div id="map-container">
// //           <div id="threat-map"></div>
// //         </div>
// //         <div style="display:flex;align-items:center;gap:20px;margin-top:14px;flex-wrap:wrap;">
// //           <div style="display:flex;align-items:center;gap:8px;"><span class="pulse-dot"></span><span class="text-xs tracking-wider" style="color:rgba(255,255,255,.6);">Active Node</span></div>
// //           <div style="display:flex;align-items:center;gap:8px;"><span class="pulse-dot-red"></span><span class="text-xs tracking-wider" style="color:rgba(255,255,255,.6);">High Alert</span></div>
// //         </div>
// //       </div>
// //       <div class="cyber-card rounded-lg overflow-hidden" style="max-height:480px;">
// //         <div style="padding:14px 18px;border-bottom:1px solid rgba(57,255,20,.15);"><span class="text-sm font-bold tracking-widest" style="color:#39FF14;">NODE STATUS</span></div>
// //         <div style="overflow-y:auto;max-height:400px;">
// //           <div class="city-item" style="padding:14px 18px;"><div style="display:flex;align-items:start;justify-content:space-between;"><div><div style="font-weight:700;font-size:.9rem;margin-bottom:3px;">Karachi</div><div style="font-size:.72rem;color:rgba(255,255,255,.5);">5,423 threats blocked</div></div><span class="feature-badge" style="background:rgba(255,51,51,.15);color:#ff4444;">HIGH ALERT</span></div></div>
// //           <div class="city-item" style="padding:14px 18px;"><div style="display:flex;align-items:start;justify-content:space-between;"><div><div style="font-weight:700;font-size:.9rem;margin-bottom:3px;">Lahore</div><div style="font-size:.72rem;color:rgba(255,255,255,.5);">1,802 threats blocked</div></div><span class="feature-badge" style="background:rgba(255,51,51,.15);color:#ff4444;">HIGH ALERT</span></div></div>
// //           <div class="city-item" style="padding:14px 18px;"><div style="display:flex;align-items:start;justify-content:space-between;"><div><div style="font-weight:700;font-size:.9rem;margin-bottom:3px;">Islamabad</div><div style="font-size:.72rem;color:rgba(255,255,255,.5);">987 threats blocked</div></div><span class="feature-badge badge-realtime">ACTIVE</span></div></div>
// //           <div class="city-item" style="padding:14px 18px;"><div style="display:flex;align-items:start;justify-content:space-between;"><div><div style="font-weight:700;font-size:.9rem;margin-bottom:3px;">Quetta</div><div style="font-size:.72rem;color:rgba(255,255,255,.5);">412 threats blocked</div></div><span class="feature-badge" style="background:rgba(57,255,20,.1);color:#39FF14;">MONITORING</span></div></div>
// //           <div class="city-item" style="padding:14px 18px;"><div style="display:flex;align-items:start;justify-content:space-between;"><div><div style="font-weight:700;font-size:.9rem;margin-bottom:3px;">Peshawar</div><div style="font-size:.72rem;color:rgba(255,255,255,.5);">653 threats blocked</div></div><span class="feature-badge badge-realtime">ACTIVE</span></div></div>
// //           <div class="city-item" style="padding:14px 18px;"><div style="display:flex;align-items:start;justify-content:space-between;"><div><div style="font-weight:700;font-size:.9rem;margin-bottom:3px;">Faisalabad</div><div style="font-size:.72rem;color:rgba(255,255,255,.5);">541 threats blocked</div></div><span class="feature-badge badge-realtime">ACTIVE</span></div></div>
// //           <div class="city-item" style="padding:14px 18px;"><div style="display:flex;align-items:start;justify-content:space-between;"><div><div style="font-weight:700;font-size:.9rem;margin-bottom:3px;">Sukkur</div><div style="font-size:.72rem;color:rgba(255,255,255,.5);">778 threats blocked</div></div><span class="feature-badge" style="background:rgba(255,51,51,.15);color:#ff4444;">HIGH ALERT</span></div></div>
// //           <div class="city-item" style="padding:14px 18px;border-bottom:none;"><div style="display:flex;align-items:start;justify-content:space-between;"><div><div style="font-weight:700;font-size:.9rem;margin-bottom:3px;">Hyderabad</div><div style="font-size:.72rem;color:rgba(255,255,255,.5);">329 threats blocked</div></div><span class="feature-badge badge-realtime">ACTIVE</span></div></div>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // </section>

// // <!-- ════════════════════════════════
// //      FEATURES
// // ════════════════════════════════ -->
// // <section id="features" class="py-16 md:py-24 px-4 md:px-6 scanline-bg">
// //   <div class="max-w-7xl mx-auto">
// //     <div class="text-center mb-14 fade-up">
// //       <div class="section-tag mb-4">// SYSTEM.CAPABILITIES</div>
// //       <h2 class="font-bold leading-tight" style="font-size:clamp(1.6rem,4vw,2.8rem);">How <span class="neon-gradient">Neural-Trace</span> Works</h2>
// //       <p class="mt-4 max-w-xl mx-auto" style="color:rgba(255,255,255,.55);font-size:.95rem;">Six interconnected modules form an unbreakable chain of detection, response, and attribution.</p>
// //     </div>
// //     <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
// //       <div class="cyber-card rounded-xl p-5 md:p-6 fade-up" style="transition-delay:.05s;"><div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:18px;"><div style="padding:8px;border-radius:10px;background:rgba(57,255,20,.08);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><span class="feature-badge badge-passive">PASSIVE DEFENSE</span></div><h3 class="font-bold text-lg tracking-wide mb-2">Honeypot Intelligence</h3><p class="text-sm leading-relaxed" style="color:rgba(255,255,255,.6);">Cowrie SSH and Dionaea malware honeypots lure attackers — silently capturing credentials, malware binaries, and C2 callbacks before they reach production infrastructure.</p></div>
// //       <div class="cyber-card rounded-xl p-5 md:p-6 fade-up" style="transition-delay:.1s;"><div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:18px;"><div style="padding:8px;border-radius:10px;background:rgba(0,255,136,.08);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><span class="feature-badge badge-realtime">REAL-TIME</span></div><h3 class="font-bold text-lg tracking-wide mb-2">Scapy Packet Analytics</h3><p class="text-sm leading-relaxed" style="color:rgba(255,255,255,.6);">Live packet capture engine extracts 30 network-layer features per flow — detecting DDoS amplification, botnet beaconing, and port sweeps with sub-second latency.</p></div>
// //       <div class="cyber-card rounded-xl p-5 md:p-6 fade-up" style="transition-delay:.15s;"><div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:18px;"><div style="padding:8px;border-radius:10px;background:rgba(57,255,20,.08);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div><span class="feature-badge badge-ai">AI-POWERED</span></div><h3 class="font-bold text-lg tracking-wide mb-2">XGBoost ML Classifier</h3><p class="text-sm leading-relaxed" style="color:rgba(255,255,255,.6);">Trained on CIC-IDS-2017 — 99%+ accuracy across 15 attack vectors: SSH Brute Force, DDoS, SQL Injection, Port Scan, Malware Upload and more.</p></div>
// //       <div class="cyber-card rounded-xl p-5 md:p-6 fade-up" style="transition-delay:.2s;"><div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:18px;"><div style="padding:8px;border-radius:10px;background:rgba(255,51,51,.08);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></div><span class="feature-badge badge-auto">AUTO-RESPONSE</span></div><h3 class="font-bold text-lg tracking-wide mb-2">Automated Kill Function</h3><p class="text-sm leading-relaxed" style="color:rgba(255,255,255,.6);">Dynamic iptables firewall rules auto-pushed within 340ms — blocking attacker IPs at network perimeter before lateral movement occurs.</p></div>
// //       <div class="cyber-card rounded-xl p-5 md:p-6 fade-up" style="transition-delay:.25s;"><div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:18px;"><div style="padding:8px;border-radius:10px;background:rgba(0,200,255,.08);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span class="feature-badge badge-forensics">FORENSICS</span></div><h3 class="font-bold text-lg tracking-wide mb-2">GeoIP Attribution Engine</h3><p class="text-sm leading-relaxed" style="color:rgba(255,255,255,.6);">ASN data, ISP identity, and geolocation correlate across events — building an evolving threat actor map of Pakistan's digital attack surface.</p></div>
// //       <div class="cyber-card rounded-xl p-5 md:p-6 fade-up" style="transition-delay:.3s;"><div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:18px;"><div style="padding:8px;border-radius:10px;background:rgba(255,200,0,.08);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffc800" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div><span class="feature-badge badge-legal">LEGAL EVIDENCE</span></div><h3 class="font-bold text-lg tracking-wide mb-2">Forensic PDF Reports</h3><p class="text-sm leading-relaxed" style="color:rgba(255,255,255,.6);">Court-admissible reports auto-generated per incident — SHA-256 sealed, XGBoost confidence scores, full firewall action history, FIA-ready under PECA 2016.</p></div>
// //     </div>
// //   </div>
// // </section>

// // <!-- ════════════════════════════════
// //      PIPELINE
// // ════════════════════════════════ -->
// // <section id="pipeline" class="py-16 md:py-24 px-4 md:px-6" style="background:rgba(0,0,0,.25);">
// //   <div class="max-w-6xl mx-auto">
// //     <div class="text-center mb-14 fade-up">
// //       <div class="section-tag mb-4">// ATTACK.PIPELINE</div>
// //       <h2 class="font-bold" style="font-size:clamp(1.5rem,4vw,2.6rem);">From Packet to Evidence &mdash; <span class="neon-gradient">In Seconds</span></h2>
// //     </div>
// //     <div class="flex items-center pipeline-horizontal fade-up" id="pipeline-flow" style="transition-delay:.1s;">
// //       <div style="display:flex;flex-direction:column;align-items:center;text-align:center;min-width:80px;flex:1;"><div style="width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;background:rgba(57,255,20,.08);border:1px solid rgba(57,255,20,.3);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39FF14" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div style="font-size:.65rem;font-weight:700;letter-spacing:.12em;color:#39FF14;font-family:'Share Tech Mono',monospace;margin-bottom:5px;">CAPTURE</div><div style="font-size:.7rem;color:rgba(255,255,255,.5);">Scapy sniffs live flows</div></div>
// //       <div class="pipeline-line mx-2 md:mx-3 paused" id="line1"></div>
// //       <div style="display:flex;flex-direction:column;align-items:center;text-align:center;min-width:80px;flex:1;"><div style="width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;background:rgba(0,255,136,.08);border:1px solid rgba(0,255,136,.3);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div><div style="font-size:.65rem;font-weight:700;letter-spacing:.12em;color:#00ff88;font-family:'Share Tech Mono',monospace;margin-bottom:5px;">EXTRACT</div><div style="font-size:.7rem;color:rgba(255,255,255,.5);">30 flow features</div></div>
// //       <div class="pipeline-line mx-2 md:mx-3 paused" id="line2"></div>
// //       <div style="display:flex;flex-direction:column;align-items:center;text-align:center;min-width:80px;flex:1;"><div style="width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;background:rgba(57,255,20,.08);border:1px solid rgba(57,255,20,.3);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39FF14" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div><div style="font-size:.65rem;font-weight:700;letter-spacing:.12em;color:#39FF14;font-family:'Share Tech Mono',monospace;margin-bottom:5px;">CLASSIFY</div><div style="font-size:.7rem;color:rgba(255,255,255,.5);">XGBoost ML label</div></div>
// //       <div class="pipeline-line mx-2 md:mx-3 paused" id="line3"></div>
// //       <div style="display:flex;flex-direction:column;align-items:center;text-align:center;min-width:80px;flex:1;"><div style="width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;background:rgba(255,51,51,.08);border:1px solid rgba(255,51,51,.3);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff4444" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div><div style="font-size:.65rem;font-weight:700;letter-spacing:.12em;color:#ff4444;font-family:'Share Tech Mono',monospace;margin-bottom:5px;">KILL</div><div style="font-size:.7rem;color:rgba(255,255,255,.5);">Firewall auto-pushed</div></div>
// //       <div class="pipeline-line mx-2 md:mx-3 paused" id="line4"></div>
// //       <div style="display:flex;flex-direction:column;align-items:center;text-align:center;min-width:80px;flex:1;"><div style="width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;background:rgba(255,200,0,.08);border:1px solid rgba(255,200,0,.3);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffc800" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div style="font-size:.65rem;font-weight:700;letter-spacing:.12em;color:#ffc800;font-family:'Share Tech Mono',monospace;margin-bottom:5px;">REPORT</div><div style="font-size:.7rem;color:rgba(255,255,255,.5);">PDF evidence generated</div></div>
// //     </div>
// //     <p class="text-center mt-10" style="color:rgba(255,255,255,.4);font-size:.88rem;">Average pipeline latency: <span style="color:#39FF14;font-family:'Share Tech Mono',monospace;">&lt; 340ms</span> from packet capture to firewall block</p>
// //   </div>
// // </section>

// // <!-- ════════════════════════════════
// //      FOOTER
// // ════════════════════════════════ -->
// // <footer style="padding:clamp(40px,6vw,60px) clamp(16px,4vw,48px);background:rgba(0,0,0,.5);border-top:1px solid rgba(57,255,20,.1);">
// //   <div class="max-w-7xl mx-auto">
// //     <div class="grid md:grid-cols-3 gap-8 md:gap-10 mb-10">
// //       <div>
// //         <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
// //           <svg width="30" height="30" viewBox="0 0 160 160" fill="none"><circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" stroke-width="2"/><path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" stroke-width="2"/><rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/><path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="80" cy="80" r="3" fill="#0a1f2e"/></svg>
// //           <span style="color:#39FF14;font-family:'Rajdhani',sans-serif;font-size:1.05rem;font-weight:700;letter-spacing:.12em;">NEURAL-TRACE</span>
// //         </div>
// //         <p style="color:rgba(255,255,255,.5);font-size:.88rem;line-height:1.7;margin-bottom:14px;">Protecting Pakistan's critical digital infrastructure through AI-driven threat intelligence, autonomous forensics, and real-time cyber defense.</p>
// //         <div style="display:flex;align-items:center;gap:8px;"><span class="pulse-dot"></span><span style="font-family:'Share Tech Mono',monospace;font-size:.65rem;color:rgba(57,255,20,.7);">ALL SYSTEMS OPERATIONAL</span></div>
// //       </div>
// //       <div>
// //         <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.4);margin-bottom:18px;">PLATFORM</div>
// //         <div style="display:flex;flex-direction:column;gap:12px;">
// //           <a href="#mission"  style="color:rgba(255,255,255,.6);font-size:.88rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.6)'">Our Mission</a>
// //           <a href="#features" style="color:rgba(255,255,255,.6);font-size:.88rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.6)'">Platform Features</a>
// //           <a href="#live-map" style="color:rgba(255,255,255,.6);font-size:.88rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.6)'">Live Threat Map</a>
// //           <a href="#pipeline" style="color:rgba(255,255,255,.6);font-size:.88rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.6)'">Detection Pipeline</a>
// //         </div>
// //       </div>
// //       <div>
// //         <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.4);margin-bottom:18px;">SYSTEM LOG</div>
// //         <div style="border-radius:10px;padding:14px;background:#010801;border:1px solid rgba(57,255,20,.15);font-family:'Share Tech Mono',monospace;font-size:.65rem;line-height:1.9;">
// //           <div style="color:#39FF14;">&gt; system.init() -- OK</div>
// //           <div style="color:rgba(57,255,20,.6);">&gt; cowrie_honeypot: ACTIVE</div>
// //           <div style="color:rgba(57,255,20,.6);">&gt; dionaea_trap: ACTIVE</div>
// //           <div style="color:rgba(57,255,20,.6);">&gt; xgboost_classifier: v2.1.1</div>
// //           <div style="color:rgba(57,255,20,.6);">&gt; nodes: KHI LHR ISB QTA PEW</div>
// //           <div style="color:#ff4444;">&gt; alerts: HIGH SEVERITY ACTIVE</div>
// //           <div style="color:rgba(57,255,20,.6);">&gt; uptime: 99.97%</div>
// //           <div style="color:#39FF14;">&gt; <span class="typing-cursor"></span></div>
// //         </div>
// //       </div>
// //     </div>
// //     <div style="border-top:1px solid rgba(57,255,20,.08);padding-top:20px;display:flex;flex-direction:column;gap:12px;align-items:center;">
// //       <p style="color:rgba(255,255,255,.28);font-size:.75rem;text-align:center;">&copy; 2026 Neural-Trace &mdash; Threat Intelligence &amp; Digital Forensics. All rights reserved. Developed in Pakistan for Pakistan's cyber defense.</p>
// //       <div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;">
// //         <button onclick="showPolicy('privacy')" style="color:rgba(255,255,255,.3);font-size:.75rem;background:none;border:none;cursor:pointer;font-family:'Rajdhani',sans-serif;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.3)'">Privacy Policy</button>
// //         <button onclick="showPolicy('terms')"   style="color:rgba(255,255,255,.3);font-size:.75rem;background:none;border:none;cursor:pointer;font-family:'Rajdhani',sans-serif;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.3)'">Terms of Service</button>
// //         <button onclick="showPolicy('disc')"    style="color:rgba(255,255,255,.3);font-size:.75rem;background:none;border:none;cursor:pointer;font-family:'Rajdhani',sans-serif;transition:color .2s;" onmouseover="this.style.color='#39FF14'" onmouseout="this.style.color='rgba(255,255,255,.3)'">Security Disclosure</button>
// //       </div>
// //     </div>
// //   </div>
// // </footer>

// // <!-- ════════════════════════════════
// //      JAVASCRIPT
// // ════════════════════════════════ -->
// // <script>
// // const API = 'http://localhost:8000';

// // /* ── SPLASH ── */
// // window.addEventListener('DOMContentLoaded', () => {
// //   // Splash matrix canvas
// //   (function(){
// //     const c = document.getElementById('splash-canvas');
// //     if (!c) return;
// //     const ctx = c.getContext('2d');
// //     const chars = '01アイウエオカキクサシスタチツナニヌ';
// //     let cols, drops;
// //     function init(){ c.width=window.innerWidth; c.height=window.innerHeight; cols=Math.floor(c.width/18); drops=Array(cols).fill(0).map(()=>Math.floor(Math.random()*-30)); }
// //     function draw(){ ctx.fillStyle='rgba(5,10,5,.06)'; ctx.fillRect(0,0,c.width,c.height); ctx.font='13px Share Tech Mono,monospace'; for(let i=0;i<drops.length;i++){const ch=chars[Math.floor(Math.random()*chars.length)],x=i*18,y=drops[i]*18; if(drops[i]>0){ctx.fillStyle='#fff';ctx.fillText(ch,x,y);ctx.fillStyle='#39FF14';ctx.fillText(ch,x,y-18);} if(y>c.height&&Math.random()>.975)drops[i]=0; drops[i]++;} }
// //     init(); window.addEventListener('resize', init); setInterval(draw, 55);
// //   })();

// //   // Hide splash at 3.4s, then init map + typing
// //   setTimeout(() => {
// //     document.getElementById('splash').classList.add('hide');
// //     setTimeout(() => {
// //       document.getElementById('splash').style.display = 'none';
// //       startTyping();
// //       doStats();
// //       initMap();   // MAP: init AFTER splash gone so container is visible
// //     }, 1000);
// //   }, 3400);
// // });

// // /* ── NAVBAR SCROLL ── */
// // window.addEventListener('scroll', () => {
// //   document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
// // });

// // /* ── MOBILE MENU ── */
// // function toggleMenu(){ document.getElementById('mobile-menu').classList.toggle('open'); }

// // /* ── HERO MATRIX ── */
// // (function(){
// //   const canvas = document.getElementById('matrix-canvas');
// //   if (!canvas) return;
// //   const ctx = canvas.getContext('2d');
// //   const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
// //   let cols, drops;
// //   function init(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; cols=Math.floor(canvas.width/18); drops=Array(cols).fill(0).map(()=>Math.floor(Math.random()*-40)); }
// //   function draw(){ ctx.fillStyle='rgba(5,10,5,.045)'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.font='14px Share Tech Mono,monospace'; for(let i=0;i<drops.length;i++){const ch=chars[Math.floor(Math.random()*chars.length)],x=i*18,y=drops[i]*18; if(drops[i]>0){ctx.fillStyle='#fff';ctx.fillText(ch,x,y);ctx.fillStyle='#39FF14';ctx.fillText(ch,x,y-18);} if(y>canvas.height&&Math.random()>.975)drops[i]=0; drops[i]++;} }
// //   init(); window.addEventListener('resize', init); setInterval(draw, 55);
// // })();

// // /* ── TYPING ── */
// // function startTyping(){
// //   const lines = ['AI-POWERED THREAT INTELLIGENCE &', 'FORENSICS'];
// //   const el = document.getElementById('typed-text');
// //   if (!el) return;
// //   let line = 0, char = 0;
// //   function type(){
// //     const l = lines[line];
// //     if (char < l.length){
// //       if (line === 0) el.innerHTML = l.substring(0,char+1);
// //       else el.innerHTML = lines[0]+'<br/><span style="background:linear-gradient(90deg,#39FF14,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">'+l.substring(0,char+1)+'</span>';
// //       char++; setTimeout(type, line===0?38:60);
// //     } else if (line < lines.length-1){ line++; char=0; setTimeout(type,150); }
// //     else el.classList.remove('typing-cursor');
// //   }
// //   type();
// // }

// // /* ── COUNTERS ── */
// // function doStats(){
// //   function cnt(el,target,suf,dec,dur){ let s=0; const step=target/(dur/16); function run(){ s+=step; if(s>=target){el.textContent=(dec?target.toFixed(1):Math.floor(target))+suf;return;} el.textContent=(dec?s.toFixed(1):Math.floor(s))+suf; requestAnimationFrame(run); } run(); }
// //   cnt(document.getElementById('stat1'),99.2,'%',true,1800);
// //   cnt(document.getElementById('stat2'),15,'+',false,1200);
// //   cnt(document.getElementById('stat3'),30,'',false,1200);
// //   cnt(document.getElementById('stat4'),8,'',false,900);
// // }

// // /* ── SCROLL OBSERVER ── */
// // document.querySelectorAll('.fade-up').forEach(el=>{
// //   new IntersectionObserver(entries=>{ if(entries[0].isIntersecting) entries[0].target.classList.add('visible'); },{threshold:.1}).observe(el);
// // });

// // /* ── PIPELINE LINES ── */
// // new IntersectionObserver(entries=>{
// //   if(entries[0].isIntersecting) ['line1','line2','line3','line4'].forEach((id,i)=>{
// //     setTimeout(()=>{ const el=document.getElementById(id); if(el){el.classList.remove('paused');el.classList.add('running');} },i*200);
// //   });
// // },{threshold:.3}).observe(document.getElementById('pipeline-flow'));

// // /* ══════════════════════════════════════════
// //    LEAFLET MAP — fixed initialisation
// //    Key fixes:
// //    1. Called AFTER splash hides (container visible + has size)
// //    2. map.invalidateSize() after a delay to force re-render
// //    3. Popup style injected separately (no className conflict)
// // ══════════════════════════════════════════ */
// // function initMap(){
// //   try {
// //     // Inject dark popup style once
// //     const st = document.createElement('style');
// //     st.textContent = `
// //       .leaflet-popup-content-wrapper { background:transparent!important; border:none!important; box-shadow:none!important; padding:0!important; }
// //       .leaflet-popup-content { margin:0!important; }
// //       .leaflet-popup-tip-container { display:none!important; }
// //       .leaflet-control-zoom a { background:#0a1f2e!important; color:#39FF14!important; border-color:rgba(57,255,20,.3)!important; }
// //       .leaflet-control-zoom a:hover { background:rgba(57,255,20,.15)!important; }
// //     `;
// //     document.head.appendChild(st);

// //     const map = L.map('threat-map', {
// //       center: [30.3753, 69.3451],
// //       zoom: 5,
// //       scrollWheelZoom: false,
// //       attributionControl: false,
// //       zoomControl: true,
// //     });

// //     L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// //       subdomains: 'abcd',
// //       maxZoom: 19,
// //     }).addTo(map);

// //     // Force redraw after tiles start loading
// //     setTimeout(() => map.invalidateSize(), 300);

// //     const cities = [
// //       {n:'Karachi',   lat:24.8607, lng:67.0011, c:'#ff3333', cnt:'5,423', t:'alert'},
// //       {n:'Lahore',    lat:31.5204, lng:74.3587, c:'#ff3333', cnt:'1,802', t:'alert'},
// //       {n:'Islamabad', lat:33.6844, lng:73.0479, c:'#39FF14', cnt:'987',   t:'active'},
// //       {n:'Quetta',    lat:30.1798, lng:66.9750, c:'#39FF14', cnt:'412',   t:'monitor'},
// //       {n:'Peshawar',  lat:34.0151, lng:71.5249, c:'#39FF14', cnt:'653',   t:'active'},
// //       {n:'Faisalabad',lat:31.4160, lng:73.0911, c:'#39FF14', cnt:'541',   t:'active'},
// //       {n:'Sukkur',    lat:27.7244, lng:68.8571, c:'#ff3333', cnt:'778',   t:'alert'},
// //       {n:'Hyderabad', lat:25.3960, lng:68.3578, c:'#39FF14', cnt:'329',   t:'active'},
// //     ];

// //     cities.forEach(city => {
// //       // Outer pulse ring
// //       L.circleMarker([city.lat, city.lng], {
// //         radius:18, color:city.c, fillColor:city.c,
// //         fillOpacity:0, weight:1, opacity:.3,
// //       }).addTo(map);

// //       // Inner dot with popup
// //       L.circleMarker([city.lat, city.lng], {
// //         radius:7, color:city.c, fillColor:city.c,
// //         fillOpacity:.9, weight:2,
// //       }).addTo(map).bindPopup(
// //         `<div style="font-family:'Rajdhani',sans-serif;background:#050a05;border:1px solid ${city.c};padding:12px 16px;border-radius:8px;min-width:155px;">
// //           <div style="color:${city.c};font-weight:700;font-size:14px;margin-bottom:4px;">${city.n}</div>
// //           <div style="color:rgba(255,255,255,.7);font-size:12px;">${city.cnt} threats blocked</div>
// //           <div style="margin-top:6px;font-size:11px;font-weight:700;color:${city.c};">${city.t==='alert'?'HIGH ALERT':city.t==='active'?'ACTIVE':'MONITORING'}</div>
// //         </div>`
// //       );
// //     });

// //   } catch(e) {
// //     console.error('Map init error:', e);
// //     document.getElementById('map-container').innerHTML =
// //       '<div style="height:100%;display:flex;align-items:center;justify-content:center;color:rgba(57,255,20,.5);font-family:Share Tech Mono,monospace;font-size:.75rem;">MAP FEED OFFLINE</div>';
// //   }
// // }

// // /* ── LOGIN MODAL ── */
// // function openLogin(isReg){
// //   document.getElementById('login-modal').classList.add('open');
// //   document.body.style.overflow = 'hidden';
// //   switchTab(isReg ? 'register' : 'login');
// //   clearError();
// // }
// // function closeLogin(){
// //   document.getElementById('login-modal').classList.remove('open');
// //   document.body.style.overflow = '';
// // }
// // document.getElementById('login-modal').addEventListener('click', function(e){ if(e.target===this) closeLogin(); });

// // function switchTab(tab){
// //   const isL = tab==='login';
// //   document.getElementById('login-form').style.display   = isL ? 'block' : 'none';
// //   document.getElementById('register-form').style.display = isL ? 'none' : 'block';
// //   document.getElementById('tab-login').classList.toggle('active', isL);
// //   document.getElementById('tab-register').classList.toggle('active', !isL);
// //   document.getElementById('switch-link').textContent = isL ? "Don't have an account? Sign up here" : "Already have an account? Login here";
// //   document.getElementById('switch-link').onclick = () => switchTab(isL ? 'register' : 'login');
// //   clearError();
// // }
// // function showError(m){ const el=document.getElementById('modal-error'); el.textContent=m; el.style.display='block'; }
// // function clearError(){ const el=document.getElementById('modal-error'); el.style.display='none'; el.textContent=''; }
// // function togglePw(id){ const inp=document.getElementById(id); inp.type = inp.type==='text' ? 'password' : 'text'; }
// // function updateRoleDesc(){
// //   const r=document.getElementById('reg-role').value, d=document.getElementById('role-desc');
// //   if(r==='citizen'){ d.textContent='Access: Live Map, General Alerts, IP Lookup'; d.className='role-desc role-citizen'; }
// //   else { d.textContent='Access: Full Dashboard, Threat Feeds, Forensic Vault, IP Intel'; d.className='role-desc role-company'; }
// // }

// // const RULES=[
// //   {test:p=>p.length>=8,          label:'At least 8 characters'},
// //   {test:p=>/[A-Z]/.test(p),      label:'One uppercase letter (A–Z)'},
// //   {test:p=>/[a-z]/.test(p),      label:'One lowercase letter (a–z)'},
// //   {test:p=>/[0-9]/.test(p),      label:'One number (0–9)'},
// //   {test:p=>/[^A-Za-z0-9]/.test(p),label:'One special character (!@#$…)'},
// // ];
// // const STR_L=['','Weak','Fair','Good','Strong','Very Strong'];
// // const STR_C=['','#ef4444','#f97316','#eab308','#4ade80','#4ade80'];

// // function checkStrength(){
// //   const pass=document.getElementById('reg-pass').value;
// //   const panel=document.getElementById('strength-panel');
// //   if(!pass){ panel.style.display='none'; checkRegBtn(); return; }
// //   panel.style.display='block';
// //   const res=RULES.map(r=>({...r,passed:r.test(pass)}));
// //   const cnt=res.filter(r=>r.passed).length;
// //   const bars=document.getElementById('str-bars').children;
// //   for(let i=0;i<5;i++) bars[i].style.background = i<cnt ? STR_C[cnt] : '#1e2d27';
// //   document.getElementById('str-label').textContent=STR_L[cnt];
// //   document.getElementById('str-label').style.color=STR_C[cnt];
// //   const rl=document.getElementById('rules-list'); rl.innerHTML='';
// //   res.forEach(r=>{ const d=document.createElement('div'); d.style.cssText='display:flex;align-items:center;gap:8px;font-size:.73rem;'; d.innerHTML=`<span style="color:${r.passed?'#4ade80':'#6b7280'};font-size:12px;">${r.passed?'✓':'✗'}</span><span style="color:${r.passed?'#4ade80':'#6b7280'};">${r.label}</span>`; rl.appendChild(d); });
// //   checkRegBtn();
// // }
// // function checkConfirm(){
// //   const pass=document.getElementById('reg-pass').value, conf=document.getElementById('reg-confirm').value;
// //   const msg=document.getElementById('confirm-msg');
// //   if(!conf){ msg.textContent=''; msg.style.color=''; checkRegBtn(); return; }
// //   if(pass===conf){ msg.textContent='✓ Passwords match'; msg.style.color='#4ade80'; }
// //   else { msg.textContent='✗ Passwords do not match'; msg.style.color='#f87171'; }
// //   checkRegBtn();
// // }
// // function checkRegBtn(){
// //   const pass=document.getElementById('reg-pass').value, conf=document.getElementById('reg-confirm').value;
// //   const ok=RULES.every(r=>r.test(pass))&&pass===conf&&conf.length>0;
// //   const btn=document.getElementById('reg-btn'); btn.disabled=!ok; btn.style.opacity=ok?'1':'0.5'; btn.style.cursor=ok?'pointer':'not-allowed';
// // }

// // /* ── LOGIN API ── */
// // async function handleLogin(e){
// //   e.preventDefault(); clearError();
// //   const btn=document.getElementById('login-btn'); btn.textContent='AUTHENTICATING...'; btn.disabled=true;
// //   try{
// //     const res=await fetch(`${API}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:document.getElementById('login-email').value.trim(),password:document.getElementById('login-pass').value})});
// //     const data=await res.json();
// //     if(data.access_token){
// //       localStorage.setItem('token',data.access_token);
// //       localStorage.setItem('role',data.role);
// //       localStorage.setItem('full_name',data.full_name);
// //       window.location.href = data.role==='citizen' ? '/dashboard' : '/admin';
// //     } else showError(data.detail||'Invalid email or password.');
// //   } catch{ showError('Connection failed. Make sure the backend is running on port 8000.'); }
// //   finally{ btn.textContent='AUTHENTICATE & SIGN IN'; btn.disabled=false; }
// // }

// // /* ── REGISTER API ── */
// // async function handleRegister(e){
// //   e.preventDefault(); clearError();
// //   const btn=document.getElementById('reg-btn'); btn.textContent='CREATING ACCOUNT...'; btn.disabled=true;
// //   const pass=document.getElementById('reg-pass').value, conf=document.getElementById('reg-confirm').value;
// //   if(pass!==conf){ showError('Passwords do not match.'); btn.textContent='CREATE ACCOUNT / SIGN UP'; checkRegBtn(); return; }
// //   if(!RULES.every(r=>r.test(pass))){ showError('Password does not meet all requirements.'); btn.textContent='CREATE ACCOUNT / SIGN UP'; checkRegBtn(); return; }
// //   try{
// //     const res=await fetch(`${API}/auth/register`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({full_name:document.getElementById('reg-name').value.trim(),email:document.getElementById('reg-email').value.trim(),phone_number:document.getElementById('reg-phone').value.trim(),password:pass,role:document.getElementById('reg-role').value})});
// //     const data=await res.json();
// //     if(data.user_id){ alert('Account created successfully! Please login.'); switchTab('login'); }
// //     else showError(data.detail||'Registration failed. Please try again.');
// //   } catch{ showError('Connection failed. Make sure the backend is running on port 8000.'); }
// //   finally{ btn.textContent='CREATE ACCOUNT / SIGN UP'; checkRegBtn(); }
// // }

// // /* ── FOOTER POPUPS ── */
// // function showPolicy(type){
// //   const msgs={
// //     privacy:'Privacy Policy\n\nNeural-Trace collects network packet metadata and honeypot logs solely for cybersecurity threat detection. No personal user data is sold or shared with third parties. All forensic evidence is stored securely and submitted only to authorized Pakistani law enforcement under PECA 2016. Data retention: 90 days unless required for legal proceedings.\n\n© 2026 Neural-Trace.',
// //     terms:'Terms of Service\n\nNeural-Trace is authorized for registered citizens, organizations, and government agencies in Pakistan.\n\n1. Comply with PECA 2016 at all times\n2. Do not attempt to circumvent platform security\n3. Use forensic reports only for legitimate law enforcement purposes\n4. Report vulnerabilities responsibly\n\nUnauthorized access is monitored and reported to FIA Cybercrime Wing.\n\n© 2026 Neural-Trace.',
// //     disc:'Security Disclosure\n\nFound a vulnerability in Neural-Trace? Report it responsibly:\n\nContact: security@neuraltrace.pk\nResponse time: 48 hours\n\nWe follow responsible disclosure. Researchers who report valid vulnerabilities will be acknowledged.\n\n© 2026 Neural-Trace.'
// //   };
// //   alert(msgs[type]);
// // }
// // </script>
// // </body>
// // </html>


// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8"/>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//     <title>Neural-Trace — AI Threat Intelligence & Digital Forensics</title>
//     <link rel="preconnect" href="https://fonts.googleapis.com"/>
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//     <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
//     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
//     <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
//     <script src="https://cdn.tailwindcss.com"></script>
//     <script>
//         tailwind.config={theme:{extend:{colors:{'neon':'#39FF14','neon-light':'#00ff88'},fontFamily:{rajdhani:['Rajdhani','sans-serif'],mono:['Share Tech Mono','monospace']}}}}
//     </script>
//     <style>
//         :root{--neon:#39FF14;--neon-light:#00ff88;--bg:#050a05;--card-border:rgba(57,255,20,0.15);--card-bg:rgba(57,255,20,0.03);}
//         *{box-sizing:border-box;}
//         html{scroll-behavior:smooth;}
//         body{background:var(--bg);color:#fff;font-family:'Rajdhani',sans-serif;overflow-x:hidden;}
//         ::-webkit-scrollbar{width:5px;}
//         ::-webkit-scrollbar-track{background:#050a05;}
//         ::-webkit-scrollbar-thumb{background:var(--neon);border-radius:3px;}

//         /* SPLASH */
//         #splash{position:fixed;inset:0;z-index:9999;background:#050a05;display:flex;align-items:center;justify-content:center;transition:opacity 1s ease,visibility 1s ease;}
//         #splash.hide{opacity:0;visibility:hidden;pointer-events:none;}
//         .splash-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;}
//         .splash-logo-wrap{opacity:0;transform:scale(.5);animation:splashIn 1s cubic-bezier(.34,1.56,.64,1) .2s forwards;position:relative;}
//         @keyframes splashIn{to{opacity:1;transform:scale(1);}}
//         .splash-title{opacity:0;transform:translateY(18px);animation:fadeUp .7s ease 1.1s forwards;font-size:clamp(2rem,8vw,3.5rem);font-weight:700;letter-spacing:.18em;color:#39FF14;text-shadow:0 0 28px rgba(57,255,20,.65);margin-top:18px;}
//         @keyframes fadeUp{to{opacity:1;transform:translateY(0);}}
//         .splash-line{width:0;height:2px;background:linear-gradient(90deg,transparent,#39FF14,transparent);animation:lineGrow .8s ease 1.5s forwards;margin-top:12px;}
//         @keyframes lineGrow{to{width:min(280px,70vw);}}
        
//         /* NAVBAR */
//         #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;backdrop-filter:blur(14px);transition:all .3s;border-bottom:1px solid transparent;}
//         #navbar.scrolled{background:rgba(5,10,5,.96);border-bottom:1px solid var(--neon);}

//         /* HERO */
//         #matrix-canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:.17;}
        
//         /* MODAL */
//         #login-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.87);backdrop-filter:blur(12px);display:none;align-items:center;justify-content:center;padding:16px;}
//         #login-modal.open{display:flex;}
//         .modal-card{background:#0a141b;border:1px solid rgba(57,255,20,0.3);border-radius:24px;padding:30px;width:100%;max-width:440px;box-shadow:0 0 50px rgba(57,255,20,.12);}
//         .modal-input{width:100%;background:#040a0f;border:1px solid rgba(57,255,20,.2);padding:12px;border-radius:12px;color:#fff;margin-bottom:10px;outline:none;}
//         .modal-tab{padding:10px 20px;cursor:pointer;color:#6b7280;border-bottom:2px solid transparent;}
//         .modal-tab.active{color:var(--neon);border-bottom-color:var(--neon);}

//         /* UTILS */
//         .btn-neon{background:var(--neon);color:#050a05;font-weight:700;padding:10px 20px;transition:0.3s;cursor:pointer;}
//         .btn-neon:hover{box-shadow:0 0 20px var(--neon);}
//         .pulse-dot{width:8px;height:8px;border-radius:50%;background:var(--neon);animation:pulse 1.5s infinite;}
//         @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(57,255,20,0.7);}70%{box-shadow:0 0 0 10px rgba(57,255,20,0);}100%{box-shadow:0 0 0 0 rgba(57,255,20,0);}}
//     </style>
// </head>
// <body class="font-rajdhani">

// <div id="splash">
//     <div class="splash-inner">
//         <div class="splash-title">NEURAL-TRACE</div>
//         <div class="splash-line"></div>
//         <div class="splash-boot">INITIALIZING DEFENSE MATRIX...</div>
//     </div>
// </div>

// <nav id="navbar" class="w-full py-3 px-6">
//     <div class="max-w-7xl mx-auto flex justify-between items-center">
//         <div class="text-neon font-bold text-xl tracking-tighter">NEURAL-TRACE</div>
//         <button class="btn-neon rounded" onclick="openLogin()">ACCESS VAULT</button>
//     </div>
// </nav>

// <section id="hero" class="relative min-h-screen flex items-center justify-center">
//     <canvas id="matrix-canvas"></canvas>
//     <div class="relative z-10 text-center px-4">
//         <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-neon/30 bg-neon/5">
//             <span class="pulse-dot"></span>
//             <span class="text-neon font-mono text-xs uppercase">System Online — Pakistan Cyber Defense</span>
//         </div>
//         <h1 class="text-4xl md:text-6xl font-bold mb-6">Threat Intelligence <br><span class="text-neon">Reimagined</span></h1>
//         <p class="max-w-xl mx-auto text-gray-400 mb-8">AI-powered forensic attribution and real-time monitoring under PECA 2016 standards.</p>
//         <div class="flex justify-center gap-4">
//             <button class="btn-neon rounded-lg" onclick="openLogin()">Get Started</button>
//             <button class="border border-neon text-neon px-6 py-2 rounded-lg hover:bg-neon/10 transition" onclick="document.getElementById('mission').scrollIntoView()">Learn More</button>
//         </div>
//     </div>
// </section>

// <section id="mission" class="py-20 bg-black/50">
//     <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//             <h2 class="text-3xl font-bold mb-4">// MISSION BRIEF</h2>
//             <p class="text-gray-400">Protecting digital sovereignty through automated log analysis and threat hunting. Neural-Trace uses high-fidelity honeypots to capture and analyze adversarial behavior.</p>
//         </div>
//         <div id="map-container" class="h-80 bg-gray-900 rounded-xl border border-neon/20 overflow-hidden">
//             <div id="threat-map" style="height: 100%;"></div>
//         </div>
//     </div>
// </section>

// <div id="login-modal">
//     <div class="modal-card">
//         <div class="flex justify-center gap-4 mb-6">
//             <button class="modal-tab active" id="tab-login" onclick="switchTab('login')">Login</button>
//             <button class="modal-tab" id="tab-register" onclick="switchTab('register')">Register</button>
//         </div>
//         <form id="login-form">
//             <input type="email" placeholder="Admin Email" class="modal-input">
//             <input type="password" placeholder="Password" class="modal-input">
//             <button type="submit" class="btn-neon w-full rounded-xl mt-4">AUTHENTICATE</button>
//         </form>
//         <button onclick="closeLogin()" class="mt-4 text-xs text-gray-500 hover:text-neon w-full text-center uppercase">Cancel</button>
//     </div>
// </div>

// <script>
//     // Splash Screen timeout
//     window.addEventListener('load', () => {
//         setTimeout(() => {
//             document.getElementById('splash').classList.add('hide');
//         }, 2000);
//     });

//     // Navbar Scroll Effect
//     window.addEventListener('scroll', () => {
//         const nav = document.getElementById('navbar');
//         if (window.scrollY > 50) nav.classList.add('scrolled');
//         else nav.classList.remove('scrolled');
//     });

//     // Modal Controls
//     function openLogin() { document.getElementById('login-modal').classList.add('open'); }
//     function closeLogin() { document.getElementById('login-modal').classList.remove('open'); }

//     function switchTab(tab) {
//         document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
//         document.getElementById('tab-' + tab).classList.add('active');
//     }

//     // Matrix Background
//     const canvas = document.getElementById('matrix-canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const fontSize = 14;
//     const columns = canvas.width / fontSize;
//     const drops = Array(Math.floor(columns)).fill(1);

//     function drawMatrix() {
//         ctx.fillStyle = "rgba(5, 10, 5, 0.05)";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.fillStyle = "#39FF14";
//         ctx.font = fontSize + "px monospace";

//         drops.forEach((y, i) => {
//             const text = chars[Math.floor(Math.random() * chars.length)];
//             ctx.fillText(text, i * fontSize, y * fontSize);
//             if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
//             drops[i]++;
//         });
//     }
//     setInterval(drawMatrix, 50);

//     // Initialize Map
//     const map = L.map('threat-map').setView([30.3753, 69.3451], 5);
//     L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
//     L.circleMarker([24.8607, 67.0011], {color: '#39FF14', radius: 8}).addTo(map).bindPopup('Karachi Node: Active');
// </script>

// </body>
// </html>




// import { useState, useEffect, useRef } from "react";

// /* ─── Google Fonts + Leaflet injected once ─── */
// const GLOBAL_STYLES = `
// @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

// :root{--neon:#39FF14;--neon-light:#00ff88;--bg:#050a05;--card-border:rgba(57,255,20,0.15);--card-bg:rgba(57,255,20,0.03);}
// *{box-sizing:border-box;}
// html{scroll-behavior:smooth;}
// body{background:#050a05;color:#fff;font-family:'Rajdhani',sans-serif;overflow-x:hidden;margin:0;}
// ::-webkit-scrollbar{width:5px;}
// ::-webkit-scrollbar-track{background:#050a05;}
// ::-webkit-scrollbar-thumb{background:#39FF14;border-radius:3px;}

// /* SPLASH */
// #splash{position:fixed;inset:0;z-index:9999;background:#050a05;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .9s ease,visibility .9s ease;}
// #splash.hide{opacity:0;visibility:hidden;pointer-events:none;}
// #splash-canvas{position:absolute;inset:0;opacity:.12;z-index:0;}
// .splash-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;}
// .splash-logo-wrap{opacity:0;transform:scale(.5);animation:splashIn 1s cubic-bezier(.34,1.56,.64,1) .2s forwards;position:relative;display:inline-block;}
// @keyframes splashIn{to{opacity:1;transform:scale(1);}}
// .splash-logo-wrap::after{content:'';position:absolute;inset:-10px;border-radius:50%;border:1.5px solid rgba(57,255,20,.45);animation:ringOut 2.2s ease-out 1.3s infinite;}
// @keyframes ringOut{0%{transform:scale(1);opacity:.8;}100%{transform:scale(1.7);opacity:0;}}
// .splash-title{opacity:0;transform:translateY(18px);animation:fadeUp .7s ease 1.1s forwards;font-size:clamp(2rem,8vw,3.5rem);font-weight:700;letter-spacing:.18em;color:#39FF14;text-shadow:0 0 28px rgba(57,255,20,.65);margin-top:18px;white-space:nowrap;}
// @keyframes fadeUp{to{opacity:1;transform:translateY(0);}}
// .splash-line{width:0;height:2px;background:linear-gradient(90deg,transparent,#39FF14,transparent);animation:lineGrow .8s ease 1.5s forwards;margin-top:12px;}
// @keyframes lineGrow{to{width:min(280px,70vw);}}
// .splash-sub{opacity:0;transform:translateY(8px);animation:fadeUp .6s ease 1.8s forwards;font-family:'Share Tech Mono',monospace;font-size:clamp(.52rem,1.9vw,.76rem);letter-spacing:.2em;color:rgba(255,255,255,.5);margin-top:8px;text-align:center;padding:0 20px;}
// .splash-boot{opacity:0;animation:fadeUp .5s ease 2.2s forwards;font-family:'Share Tech Mono',monospace;font-size:.62rem;color:rgba(57,255,20,.5);letter-spacing:.12em;margin-top:26px;}
// .splash-bar-wrap{width:min(200px,60vw);height:2px;background:rgba(57,255,20,.1);border-radius:1px;overflow:hidden;margin-top:10px;opacity:0;animation:fadeUp .4s ease 2.4s forwards;}
// .splash-bar-fill{height:100%;background:#39FF14;width:0;animation:barFill 1.4s ease 2.5s forwards;box-shadow:0 0 8px #39FF14;}
// @keyframes barFill{to{width:100%;}}

// /* NAVBAR */
// #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;backdrop-filter:blur(14px);transition:all .3s;border-bottom:1px solid transparent;}
// #navbar.scrolled{background:rgba(5,10,5,.96);border-bottom:1px solid #39FF14;box-shadow:0 0 30px rgba(57,255,20,.1);}
// .nav-logo-svg{width:36px;height:36px;filter:drop-shadow(0 0 8px rgba(57,255,20,.55));flex-shrink:0;}

// /* HERO */
// #matrix-canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:.17;}
// .hero-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(57,255,20,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);}

// /* PULSES */
// @keyframes pd{0%,100%{box-shadow:0 0 0 0 rgba(57,255,20,.7);}50%{box-shadow:0 0 0 8px rgba(57,255,20,0);}}
// @keyframes pr{0%,100%{box-shadow:0 0 0 0 rgba(255,51,51,.7);}50%{box-shadow:0 0 0 8px rgba(255,51,51,0);}}
// .pulse-dot{width:8px;height:8px;border-radius:50%;background:#39FF14;animation:pd 1.5s infinite;display:inline-block;flex-shrink:0;}
// .pulse-dot-red{width:8px;height:8px;border-radius:50%;background:#ff3333;animation:pr 1.5s infinite;display:inline-block;flex-shrink:0;}

// /* TYPOGRAPHY */
// .neon-gradient{background:linear-gradient(90deg,#39FF14,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
// .section-tag{font-family:'Share Tech Mono',monospace;font-size:.73rem;color:#39FF14;letter-spacing:.15em;}
// .typing-cursor::after{content:'|';color:#39FF14;animation:blink .7s step-end infinite;}
// @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

// /* CARDS */
// .cyber-card{border:1px solid rgba(57,255,20,0.15);background:rgba(57,255,20,0.03);transition:all .3s;position:relative;overflow:hidden;}
// .cyber-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(57,255,20,.05) 0%,transparent 60%);opacity:0;transition:opacity .3s;}
// .cyber-card:hover::before{opacity:1;}
// .cyber-card:hover{border-color:rgba(57,255,20,.6);box-shadow:0 0 20px rgba(57,255,20,.15);transform:translateY(-2px);}

// /* FADE UP */
// .fade-up{opacity:0;transform:translateY(28px);transition:opacity .7s,transform .7s;}
// .fade-up.visible{opacity:1;transform:translateY(0);}

// /* BUTTONS */
// .btn-neon{background:#39FF14;color:#050a05;font-weight:700;letter-spacing:.05em;transition:all .3s;font-family:'Rajdhani',sans-serif;cursor:pointer;border:none;}
// .btn-neon:hover{background:#00ff88;box-shadow:0 0 20px rgba(57,255,20,.5);transform:translateY(-1px);}
// .btn-ghost{border:1px solid #39FF14;color:#39FF14;background:transparent;font-weight:600;letter-spacing:.05em;transition:all .3s;font-family:'Rajdhani',sans-serif;cursor:pointer;}
// .btn-ghost:hover{background:rgba(57,255,20,.1);box-shadow:0 0 15px rgba(57,255,20,.3);}

// /* MAP */
// .leaflet-container{background:#0a120a;}
// .leaflet-popup-content-wrapper{background:transparent!important;border:none!important;box-shadow:none!important;padding:0!important}
// .leaflet-popup-content{margin:0!important}
// .leaflet-popup-tip-container{display:none}

// /* PIPELINE */
// .pipeline-line{flex:1;height:2px;background:repeating-linear-gradient(90deg,#39FF14 0,#39FF14 8px,transparent 8px,transparent 16px);background-size:200% 100%;animation:dashFlow 2s linear infinite;}
// @keyframes dashFlow{from{background-position:200% 0;}to{background-position:0 0;}}
// .pipeline-line.paused{animation-play-state:paused;}
// .pipeline-line.running{animation-play-state:running;}
// @media(max-width:768px){
//   .pipeline-horizontal{flex-direction:column;align-items:center;}
//   .pipeline-line{width:2px;height:30px;flex:none;background:repeating-linear-gradient(180deg,#39FF14 0,#39FF14 8px,transparent 8px,transparent 16px);margin:0 auto;}
//   #threat-map{height:280px!important;}
// }

// /* BADGES */
// .feature-badge{font-family:'Share Tech Mono',monospace;font-size:.58rem;letter-spacing:.1em;padding:2px 7px;border-radius:2px;white-space:nowrap;}
// .badge-passive{background:rgba(57,255,20,.15);color:#39FF14;}
// .badge-realtime{background:rgba(0,255,136,.15);color:#00ff88;}
// .badge-ai{background:rgba(57,255,20,.15);color:#39FF14;}
// .badge-auto{background:rgba(255,51,51,.15);color:#ff6666;}
// .badge-forensics{background:rgba(0,200,255,.15);color:#00c8ff;}
// .badge-legal{background:rgba(255,200,0,.15);color:#ffc800;}

// .city-item{border-bottom:1px solid rgba(57,255,20,.08);transition:background .2s;}
// .city-item:hover{background:rgba(57,255,20,.05);}
// .scanline-bg{background-image:linear-gradient(rgba(57,255,20,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,.02) 1px,transparent 1px);background-size:40px 40px;}

// /* MODAL */
// #login-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.87);backdrop-filter:blur(12px);display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto;}
// #login-modal.open{display:flex;}
// .modal-card{background:#0a141b;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:clamp(22px,5vw,36px);width:100%;max-width:440px;box-shadow:0 0 50px rgba(57,255,20,.12);position:relative;max-height:90vh;overflow-y:auto;}
// .modal-card::-webkit-scrollbar{width:3px;}
// .modal-card::-webkit-scrollbar-thumb{background:#39FF14;}
// .modal-tab{padding:10px 20px;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:.92rem;letter-spacing:.05em;cursor:pointer;border:none;background:transparent;color:#6b7280;border-bottom:2px solid transparent;transition:all .2s;}
// .modal-tab.active{color:#39FF14;border-bottom-color:#39FF14;}
// .modal-input{width:100%;background:#040a0f;border:1px solid rgba(57,255,20,.2);padding:12px 14px;border-radius:12px;color:#fff;outline:none;font-family:'Rajdhani',sans-serif;font-size:.92rem;transition:border-color .2s;}
// .modal-input:focus{border-color:#39FF14;}
// .modal-input::placeholder{color:#4b5563;}
// .modal-input option{background:#040a0f;color:#fff;}
// .modal-input-wrap{position:relative;}
// .modal-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#6b7280;transition:color .2s;display:flex;align-items:center;}
// .modal-eye:hover{color:#39FF14;}
// .str-bar{height:4px;flex:1;border-radius:2px;transition:background .3s;}
// .role-desc{font-size:.72rem;padding:8px 12px;border-radius:8px;border:1px solid;}
// .role-citizen{background:rgba(57,255,20,.05);border-color:rgba(57,255,20,.2);color:#39FF14;}
// .role-company{background:rgba(59,130,246,.05);border-color:rgba(59,130,246,.25);color:#60a5fa;}
// .popular-card{border-color:#39FF14!important;box-shadow:0 0 30px rgba(57,255,20,.2),0 0 60px rgba(57,255,20,.05);}

// body::before{content:'';position:fixed;inset:0;z-index:-1;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");background-size:200px 200px;opacity:.4;pointer-events:none;}
// `;

// /* ─── SVG Badge (reused) ─── */
// function ShieldBadge({ size = 150 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
//       <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" strokeWidth="2"/>
//       <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" strokeWidth="2.5" strokeDasharray="4 2" opacity=".5"/>
//       <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,0.5)" stroke="#39FF14" strokeWidth="2"/>
//       <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
//       <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
//       <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
//       <rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
//       <path d="M73 58 Q80 52 87 58" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9"/>
//       <path d="M68 53 Q80 44 92 53" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".65"/>
//       <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
//       <g opacity=".7" stroke="#1a1a1a" strokeWidth=".5">
//         <ellipse cx="34" cy="80" rx="5" ry="3" fill="#0d5c23" transform="rotate(-30 34 80)"/>
//         <ellipse cx="30" cy="88" rx="5" ry="3" fill="#0d5c23" transform="rotate(-20 30 88)"/>
//         <ellipse cx="28" cy="97" rx="5" ry="3" fill="#0d5c23" transform="rotate(-10 28 97)"/>
//         <ellipse cx="30" cy="106" rx="5" ry="3" fill="#0d5c23" transform="rotate(5 30 106)"/>
//         <ellipse cx="36" cy="113" rx="5" ry="3" fill="#0d5c23" transform="rotate(20 36 113)"/>
//         <ellipse cx="38" cy="72" rx="5" ry="3" fill="#0d5c23" transform="rotate(-45 38 72)"/>
//         <line x1="34" y1="80" x2="42" y2="115" stroke="#39FF14" strokeWidth=".8" opacity=".4"/>
//       </g>
//       <g opacity=".7" stroke="#1a1a1a" strokeWidth=".5">
//         <ellipse cx="126" cy="80" rx="5" ry="3" fill="#0d5c23" transform="rotate(30 126 80)"/>
//         <ellipse cx="130" cy="88" rx="5" ry="3" fill="#0d5c23" transform="rotate(20 130 88)"/>
//         <ellipse cx="132" cy="97" rx="5" ry="3" fill="#0d5c23" transform="rotate(10 132 97)"/>
//         <ellipse cx="130" cy="106" rx="5" ry="3" fill="#0d5c23" transform="rotate(-5 130 106)"/>
//         <ellipse cx="124" cy="113" rx="5" ry="3" fill="#0d5c23" transform="rotate(-20 124 113)"/>
//         <ellipse cx="122" cy="72" rx="5" ry="3" fill="#0d5c23" transform="rotate(45 122 72)"/>
//         <line x1="126" y1="80" x2="118" y2="115" stroke="#39FF14" strokeWidth=".8" opacity=".4"/>
//       </g>
//       <path d="M52 126 Q80 118 108 126 Q108 136 80 138 Q52 136 52 126Z" fill="#39FF14"/>
//       <text x="80" y="134" textAnchor="middle" fontFamily="Rajdhani,sans-serif" fontSize="10" fontWeight="700" fill="#050a05" letterSpacing="1">EST 2026</text>
//       <path id="topArc" d="M 24 80 A 56 56 0 0 1 136 80" fill="none"/>
//       <text fontFamily="Rajdhani,sans-serif" fontSize="8.5" fontWeight="700" fill="white" letterSpacing="1.5">
//         <textPath href="#topArc" startOffset="4%">THREAT INTELLIGENCE &amp; DIGITAL FORENSICS</textPath>
//       </text>
//     </svg>
//   );
// }

// function NavShield() {
//   return (
//     <svg className="nav-logo-svg" viewBox="0 0 160 160" fill="none">
//       <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" strokeWidth="2.5"/>
//       <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" strokeWidth="2" strokeDasharray="4 2" opacity=".4"/>
//       <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" strokeWidth="2"/>
//       <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
//       <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
//       <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
//       <rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
//       <path d="M73 58 Q80 52 87 58" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9"/>
//       <path d="M68 53 Q80 44 92 53" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"/>
//       <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
//       <path d="M52 126 Q80 118 108 126 Q108 136 80 138 Q52 136 52 126Z" fill="#39FF14"/>
//       <text x="80" y="134" textAnchor="middle" fontFamily="Rajdhani,sans-serif" fontSize="10" fontWeight="700" fill="#050a05" letterSpacing="1">EST 2026</text>
//     </svg>
//   );
// }

// /* ─── Eye icon ─── */
// function EyeIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
//       <circle cx="12" cy="12" r="3"/>
//     </svg>
//   );
// }

// /* ─── Password strength rules ─── */
// const RULES = [
//   { test: p => p.length >= 8, label: "At least 8 characters" },
//   { test: p => /[A-Z]/.test(p), label: "One uppercase letter (A–Z)" },
//   { test: p => /[a-z]/.test(p), label: "One lowercase letter (a–z)" },
//   { test: p => /[0-9]/.test(p), label: "One number (0–9)" },
//   { test: p => /[^A-Za-z0-9]/.test(p), label: "One special character (!@#$…)" },
// ];
// const STR_L = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
// const STR_C = ["", "#ef4444", "#f97316", "#eab308", "#4ade80", "#4ade80"];

// const API = "http://localhost:8000";

// /* ══════════════════════════════════════════
//    LOGIN MODAL
// ══════════════════════════════════════════ */
// function LoginModal({ isOpen, onClose }) {
//   const [tab, setTab] = useState("login");
//   const [loginRole, setLoginRole] = useState("citizen");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPass, setLoginPass] = useState("");
//   const [showLoginPass, setShowLoginPass] = useState(false);
//   const [loginError, setLoginError] = useState("");
//   const [loginLoading, setLoginLoading] = useState(false);

//   const [regRole, setRegRole] = useState("citizen");
//   const [regName, setRegName] = useState("");
//   const [regEmail, setRegEmail] = useState("");
//   const [regPhone, setRegPhone] = useState("");
//   const [regPass, setRegPass] = useState("");
//   const [regConfirm, setRegConfirm] = useState("");
//   const [showRegPass, setShowRegPass] = useState(false);
//   const [showRegConfirm, setShowRegConfirm] = useState(false);
//   const [regError, setRegError] = useState("");
//   const [regLoading, setRegLoading] = useState(false);

//   const passRules = RULES.map(r => ({ ...r, passed: r.test(regPass) }));
//   const passScore = passRules.filter(r => r.passed).length;
//   const passMatch = regPass && regPass === regConfirm;
//   const regReady = passScore === 5 && passMatch;

//   const roleDesc = regRole === "citizen"
//     ? "Access: Live Map, General Alerts, IP Lookup"
//     : "Access: Full Dashboard, Threat Feeds, Forensic Vault, IP Intel";

//   async function handleLogin(e) {
//     e.preventDefault();
//     setLoginError(""); setLoginLoading(true);
//     try {
//       const res = await fetch(`${API}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loginEmail.trim(), password: loginPass }) });
//       const data = await res.json();
//       if (data.access_token) {
//         localStorage.setItem("token", data.access_token);
//         localStorage.setItem("role", data.role);
//         localStorage.setItem("full_name", data.full_name);
//         window.location.href = data.role === "citizen" ? "/dashboard" : "/admin";
//       } else setLoginError(data.detail || "Invalid email or password.");
//     } catch { setLoginError("Connection failed. Make sure backend is running on port 8000."); }
//     finally { setLoginLoading(false); }
//   }

//   async function handleRegister(e) {
//     e.preventDefault();
//     setRegError(""); setRegLoading(true);
//     if (regPass !== regConfirm) { setRegError("Passwords do not match."); setRegLoading(false); return; }
//     if (!RULES.every(r => r.test(regPass))) { setRegError("Password does not meet all requirements."); setRegLoading(false); return; }
//     try {
//       const res = await fetch(`${API}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ full_name: regName.trim(), email: regEmail.trim(), phone_number: regPhone.trim(), password: regPass, role: regRole }) });
//       const data = await res.json();
//       if (data.user_id) { alert("Account created successfully! Please login."); setTab("login"); }
//       else setRegError(data.detail || "Registration failed. Please try again.");
//     } catch { setRegError("Connection failed. Make sure backend is running on port 8000."); }
//     finally { setRegLoading(false); }
//   }

//   if (!isOpen) return null;

//   return (
//     <div id="login-modal" className="open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
//       <div className="modal-card">
//         <button onClick={onClose} style={{ color: "rgba(57,255,20,.5)", fontSize: ".72rem", fontFamily: "'Share Tech Mono',monospace", letterSpacing: ".08em", border: "none", background: "none", cursor: "pointer", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px", transition: "color .2s" }}
//           onMouseOver={e => e.currentTarget.style.color = "#39FF14"} onMouseOut={e => e.currentTarget.style.color = "rgba(57,255,20,.5)"}>
//           &larr; BACK TO NEURAL-TRACE HOME
//         </button>

//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
//           <div style={{ marginBottom: "14px", filter: "drop-shadow(0 0 12px rgba(57,255,20,.3))" }}>
//             <svg width="68" height="68" viewBox="0 0 160 160" fill="none">
//               <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" strokeWidth="2"/>
//               <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" strokeWidth="2" strokeDasharray="4 2" opacity=".4"/>
//               <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" strokeWidth="2"/>
//               <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
//               <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
//               <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
//               <rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
//               <path d="M73 58 Q80 52 87 58" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9"/>
//               <path d="M68 53 Q80 44 92 53" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"/>
//               <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
//             </svg>
//           </div>
//           <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(57,255,20,.2)", width: "100%", justifyContent: "center" }}>
//             <button className={`modal-tab${tab === "login" ? " active" : ""}`} onClick={() => setTab("login")}>Login</button>
//             <button className={`modal-tab${tab === "register" ? " active" : ""}`} onClick={() => setTab("register")}>Register</button>
//           </div>
//         </div>

//         {/* Error */}
//         {(loginError || regError) && (
//           <div style={{ marginBottom: "12px", padding: "10px 14px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: "10px", color: "#f87171", fontSize: ".82rem", textAlign: "center" }}>
//             {tab === "login" ? loginError : regError}
//           </div>
//         )}

//         {/* LOGIN FORM */}
//         {tab === "login" && (
//           <form onSubmit={handleLogin}>
//             <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//               <div>
//                 <label style={{ fontSize: ".72rem", color: "#39FF14", fontWeight: 700, letterSpacing: ".06em", display: "block", marginBottom: "4px", marginLeft: "2px" }}>ACCOUNT TYPE</label>
//                 <select className="modal-input" value={loginRole} onChange={e => setLoginRole(e.target.value)}>
//                   <option value="citizen">Citizen</option>
//                   <option value="admin">Organization Admin</option>
//                 </select>
//               </div>
//               <input type="text" required placeholder="Email Address" className="modal-input" autoComplete="username" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
//               <div className="modal-input-wrap">
//                 <input type={showLoginPass ? "text" : "password"} required placeholder="Password" className="modal-input" style={{ paddingRight: "42px" }} autoComplete="current-password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
//                 <button type="button" className="modal-eye" onClick={() => setShowLoginPass(v => !v)}><EyeIcon /></button>
//               </div>
//               <button type="submit" className="btn-neon" style={{ width: "100%", padding: "13px", borderRadius: "12px", fontSize: ".92rem", letterSpacing: ".05em", marginTop: "4px" }} disabled={loginLoading}>
//                 {loginLoading ? "AUTHENTICATING..." : "AUTHENTICATE & SIGN IN"}
//               </button>
//             </div>
//           </form>
//         )}

//         {/* REGISTER FORM */}
//         {tab === "register" && (
//           <form onSubmit={handleRegister}>
//             <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//               <div>
//                 <label style={{ fontSize: ".72rem", color: "#39FF14", fontWeight: 700, letterSpacing: ".06em", display: "block", marginBottom: "4px", marginLeft: "2px" }}>REGISTER AS</label>
//                 <select className="modal-input" value={regRole} onChange={e => setRegRole(e.target.value)}>
//                   <option value="citizen">Citizen (Free)</option>
//                   <option value="company">Organization / Corporate</option>
//                 </select>
//               </div>
//               <div className={`role-desc ${regRole === "citizen" ? "role-citizen" : "role-company"}`}>{roleDesc}</div>
//               <input type="text" required placeholder="Full Name" className="modal-input" autoComplete="name" value={regName} onChange={e => setRegName(e.target.value)} />
//               <input type="email" required placeholder="Email Address" className="modal-input" autoComplete="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
//               <input type="tel" required placeholder="Phone Number" className="modal-input" autoComplete="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
//               <div className="modal-input-wrap">
//                 <input type={showRegPass ? "text" : "password"} required placeholder="Password" className="modal-input" style={{ paddingRight: "42px" }} autoComplete="new-password" value={regPass} onChange={e => setRegPass(e.target.value)} />
//                 <button type="button" className="modal-eye" onClick={() => setShowRegPass(v => !v)}><EyeIcon /></button>
//               </div>
//               {regPass && (
//                 <div style={{ background: "#060e13", border: "1px solid rgba(255,255,255,.06)", borderRadius: "10px", padding: "14px" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
//                     <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: ".6rem", color: "#6b7280", letterSpacing: ".08em" }}>PASSWORD STRENGTH</span>
//                     <span style={{ fontSize: ".7rem", fontWeight: 700, color: STR_C[passScore] }}>{STR_L[passScore]}</span>
//                   </div>
//                   <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
//                     {[0,1,2,3,4].map(i => <div key={i} className="str-bar" style={{ background: i < passScore ? STR_C[passScore] : "#1e2d27" }} />)}
//                   </div>
//                   <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//                     {passRules.map((r, i) => (
//                       <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: ".73rem" }}>
//                         <span style={{ color: r.passed ? "#4ade80" : "#6b7280", fontSize: "12px" }}>{r.passed ? "✓" : "✗"}</span>
//                         <span style={{ color: r.passed ? "#4ade80" : "#6b7280" }}>{r.label}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div>
//                 <div className="modal-input-wrap">
//                   <input type={showRegConfirm ? "text" : "password"} required placeholder="Confirm Password" className="modal-input" style={{ paddingRight: "42px" }} autoComplete="new-password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} />
//                   <button type="button" className="modal-eye" onClick={() => setShowRegConfirm(v => !v)}><EyeIcon /></button>
//                 </div>
//                 <div style={{ marginTop: "4px", fontSize: ".73rem", fontWeight: 600, paddingLeft: "4px", minHeight: "18px", color: regConfirm ? (passMatch ? "#4ade80" : "#f87171") : "" }}>
//                   {regConfirm ? (passMatch ? "✓ Passwords match" : "✗ Passwords do not match") : ""}
//                 </div>
//               </div>
//               <button type="submit" className="btn-neon" style={{ width: "100%", padding: "13px", borderRadius: "12px", fontSize: ".92rem", letterSpacing: ".05em", marginTop: "4px", opacity: regReady ? 1 : 0.5, cursor: regReady ? "pointer" : "not-allowed" }} disabled={!regReady || regLoading}>
//                 {regLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT / SIGN UP"}
//               </button>
//             </div>
//           </form>
//         )}

//         <div style={{ textAlign: "center", marginTop: "14px" }}>
//           <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(57,255,20,.6)", fontSize: ".85rem", fontFamily: "'Rajdhani',sans-serif", transition: "color .2s" }}
//             onMouseOver={e => e.currentTarget.style.color = "#39FF14"} onMouseOut={e => e.currentTarget.style.color = "rgba(57,255,20,.6)"}
//             onClick={() => setTab(tab === "login" ? "register" : "login")}>
//             {tab === "login" ? "Don't have an account? Sign up here" : "Already have an account? Login here"}
//           </button>
//         </div>
//         <p style={{ textAlign: "center", color: "#4b5563", fontSize: ".65rem", fontFamily: "'Share Tech Mono',monospace", marginTop: "14px", letterSpacing: ".06em" }}>
//           SYSTEM STATUS: <span style={{ color: "#39FF14" }}>ACTIVE</span> | Neural-Trace
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    SPLASH
// ══════════════════════════════════════════ */
// function Splash({ onDone }) {
//   const canvasRef = useRef(null);
//   const [hide, setHide] = useState(false);

//   useEffect(() => {
//     const c = canvasRef.current;
//     if (!c) return;
//     const ctx = c.getContext("2d");
//     const chars = "01アイウエオカキクサシスタチツナニヌ";
//     let cols, drops, raf;
//     function init() {
//       c.width = window.innerWidth; c.height = window.innerHeight;
//       cols = Math.floor(c.width / 18);
//       drops = Array(cols).fill(0).map(() => Math.floor(Math.random() * -30));
//     }
//     function draw() {
//       ctx.fillStyle = "rgba(5,10,5,.06)"; ctx.fillRect(0, 0, c.width, c.height);
//       ctx.font = "13px 'Share Tech Mono',monospace";
//       for (let i = 0; i < drops.length; i++) {
//         const ch = chars[Math.floor(Math.random() * chars.length)];
//         const x = i * 18, y = drops[i] * 18;
//         if (drops[i] > 0) { ctx.fillStyle = "#fff"; ctx.fillText(ch, x, y); ctx.fillStyle = "#39FF14"; ctx.fillText(ch, x, y - 18); }
//         if (y > c.height && Math.random() > 0.975) drops[i] = 0;
//         drops[i]++;
//       }
//     }
//     init();
//     window.addEventListener("resize", init);
//     const interval = setInterval(draw, 55);
//     const timer = setTimeout(() => {
//       setHide(true);
//       setTimeout(onDone, 900);
//     }, 3400);
//     return () => { clearInterval(interval); clearTimeout(timer); window.removeEventListener("resize", init); };
//   }, []);

//   return (
//     <div id="splash" className={hide ? "hide" : ""}>
//       <canvas id="splash-canvas" ref={canvasRef}></canvas>
//       <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(57,255,20,.09) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }}></div>
//       <div className="splash-inner">
//         <div className="splash-logo-wrap">
//           <div style={{ filter: "drop-shadow(0 0 28px rgba(57,255,20,.6)) drop-shadow(0 0 60px rgba(57,255,20,.25))" }}>
//             <ShieldBadge size={150} />
//           </div>
//         </div>
//         <div className="splash-title">NEURAL-TRACE</div>
//         <div className="splash-line"></div>
//         <div className="splash-sub">PAKISTAN'S AI-POWERED CYBER DEFENSE PLATFORM</div>
//         <div className="splash-boot">INITIALIZING DEFENSE MATRIX...</div>
//         <div className="splash-bar-wrap"><div className="splash-bar-fill"></div></div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    NAVBAR
// ══════════════════════════════════════════ */
// function Navbar({ onOpenLogin }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);
//   return (
//     <nav id="navbar" className={scrolled ? "scrolled" : ""} style={{ width: "100%", padding: "12px 16px" }}>
//       <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
//           <NavShield />
//           <span style={{ color: "#39FF14", fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(.95rem,2.5vw,1.15rem)", fontWeight: 700, letterSpacing: ".14em" }}>NEURAL-TRACE</span>
//         </a>
//         <div style={{ display: "none" }} className="desktop-nav">
//           {["MISSION","FEATURES","LIVE MAP","PIPELINE"].map((label, i) => {
//             const href = ["#mission","#features","#live-map","#pipeline"][i];
//             return <a key={label} href={href} style={{ color: "rgba(255,255,255,.7)", fontSize: ".82rem", fontWeight: 600, letterSpacing: ".1em", textDecoration: "none", transition: "color .2s" }} onMouseOver={e => e.currentTarget.style.color="#39FF14"} onMouseOut={e => e.currentTarget.style.color="rgba(255,255,255,.7)"}>{label}</a>;
//           })}
//         </div>
//         <div className="hidden-mobile">
//           <button className="btn-neon" style={{ padding: "8px 20px", borderRadius: "4px", fontSize: ".875rem", letterSpacing: ".05em" }} onClick={() => onOpenLogin(false)}>ACCESS VAULT</button>
//         </div>
//         <button onClick={() => setMenuOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "6px", padding: "8px" }}>
//           {[0,1,2].map(i => <span key={i} style={{ display: "block", width: "20px", height: "2px", background: "#39FF14" }}></span>)}
//         </button>
//       </div>
//       {menuOpen && (
//         <div style={{ marginTop: "12px", padding: "16px", borderTop: "1px solid rgba(57,255,20,.18)", display: "flex", flexDirection: "column", gap: "14px" }}>
//           {["MISSION","FEATURES","LIVE MAP","PIPELINE"].map((label, i) => {
//             const href = ["#mission","#features","#live-map","#pipeline"][i];
//             return <a key={label} href={href} style={{ color: "rgba(255,255,255,.75)", fontSize: ".85rem", fontWeight: 600, letterSpacing: ".1em", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{label}</a>;
//           })}
//           <div style={{ borderTop: "1px solid rgba(57,255,20,.1)", paddingTop: "12px" }}>
//             <button className="btn-neon" style={{ padding: "8px 20px", borderRadius: "4px", fontSize: ".875rem", letterSpacing: ".05em" }} onClick={() => { setMenuOpen(false); onOpenLogin(false); }}>ACCESS VAULT</button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// /* ══════════════════════════════════════════
//    HERO
// ══════════════════════════════════════════ */
// function Hero({ onOpenLogin, started }) {
//   const canvasRef = useRef(null);
//   const [typedHtml, setTypedHtml] = useState("");
//   const [typingDone, setTypingDone] = useState(false);
//   const [stats, setStats] = useState({ s1: "0%", s2: "0", s3: "0", s4: "0" });

//   useEffect(() => {
//     const c = canvasRef.current; if (!c) return;
//     const ctx = c.getContext("2d");
//     const chars = "アイウエオカキクケコサシスセソ0123456789ABCDEF";
//     let cols, drops;
//     function init() { c.width = window.innerWidth; c.height = window.innerHeight; cols = Math.floor(c.width / 18); drops = Array(cols).fill(0).map(() => Math.floor(Math.random() * -40)); }
//     function draw() {
//       ctx.fillStyle = "rgba(5,10,5,.045)"; ctx.fillRect(0, 0, c.width, c.height);
//       ctx.font = "14px 'Share Tech Mono',monospace";
//       for (let i = 0; i < drops.length; i++) {
//         const ch = chars[Math.floor(Math.random() * chars.length)]; const x = i * 18, y = drops[i] * 18;
//         if (drops[i] > 0) { ctx.fillStyle = "#fff"; ctx.fillText(ch, x, y); ctx.fillStyle = "#39FF14"; ctx.fillText(ch, x, y - 18); }
//         if (y > c.height && Math.random() > 0.975) drops[i] = 0; drops[i]++;
//       }
//     }
//     init(); window.addEventListener("resize", init);
//     const iv = setInterval(draw, 55);
//     return () => { clearInterval(iv); window.removeEventListener("resize", init); };
//   }, []);

//   useEffect(() => {
//     if (!started) return;
//     // typing
//     const lines = ["AI-POWERED THREAT INTELLIGENCE &", "FORENSICS"];
//     let line = 0, char = 0;
//     function type() {
//       const l = lines[line];
//       if (char < l.length) {
//         if (line === 0) setTypedHtml(l.substring(0, char + 1));
//         else setTypedHtml(`${lines[0]}<br/><neon>${l.substring(0, char + 1)}</neon>`);
//         char++; setTimeout(type, line === 0 ? 38 : 60);
//       } else if (line < lines.length - 1) { line++; char = 0; setTimeout(type, 150); }
//       else setTypingDone(true);
//     }
//     type();
//     // stats
//     function cnt(key, target, suf, dec, dur) {
//       let s = 0; const step = target / (dur / 16);
//       function run() {
//         s += step;
//         if (s >= target) { setStats(prev => ({ ...prev, [key]: (dec ? target.toFixed(1) : Math.floor(target)) + suf })); return; }
//         setStats(prev => ({ ...prev, [key]: (dec ? s.toFixed(1) : Math.floor(s)) + suf }));
//         requestAnimationFrame(run);
//       }
//       run();
//     }
//     cnt("s1", 99.2, "%", true, 1800); cnt("s2", 15, "+", false, 1200); cnt("s3", 30, "", false, 1200); cnt("s4", 8, "", false, 900);
//   }, [started]);

//   return (
//     <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#050a05" }}>
//       <canvas id="matrix-canvas" ref={canvasRef}></canvas>
//       <div className="hero-grid"></div>
//       <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 50%,rgba(57,255,20,.06) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }}></div>
//       <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "64rem", margin: "0 auto", padding: "clamp(90px,12vw,120px) 16px 0" }}>
//         <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "24px", padding: "8px 16px", borderRadius: "9999px", border: "1px solid rgba(57,255,20,.3)", background: "rgba(57,255,20,.05)" }}>
//           <span className="pulse-dot"></span>
//           <span style={{ color: "#39FF14", fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(.5rem,1.8vw,.72rem)", letterSpacing: ".14em" }}>SYSTEM ONLINE — MONITORING PAKISTAN</span>
//         </div>
//         <h1 style={{ fontWeight: 700, lineHeight: 1.15, letterSpacing: "-.01em", marginBottom: "24px", fontSize: "clamp(1.7rem,5.5vw,4.2rem)" }}>
//           {typedHtml.includes("<neon>") ? (
//             <>
//               {typedHtml.split("<br/>")[0]}<br/>
//               <span style={{ background: "linear-gradient(90deg,#39FF14,#00ff88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
//                 {typedHtml.split("<neon>")[1]?.replace("</neon>", "") || ""}
//               </span>
//             </>
//           ) : (
//             <span className={!typingDone ? "typing-cursor" : ""}>{typedHtml}</span>
//           )}
//           {typedHtml.includes("<neon>") && !typingDone && <span className="typing-cursor" style={{ display: "inline" }}></span>}
//         </h1>
//         <p style={{ marginBottom: "40px", maxWidth: "42rem", margin: "0 auto 40px", lineHeight: 1.7, color: "rgba(255,255,255,.65)", fontSize: "clamp(.88rem,2.2vw,1.05rem)" }}>
//           Defending Pakistan's critical digital infrastructure — in real time — with passive honeypot traps, live packet analytics, and automated forensic attribution under PECA 2016.
//         </p>
//         <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "48px" }}>
//           <button className="btn-neon" style={{ padding: "12px 32px", borderRadius: "4px", fontSize: "clamp(.875rem,2vw,1rem)", letterSpacing: ".05em", display: "flex", alignItems: "center", gap: "8px" }} onClick={() => onOpenLogin(false)}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
//             ACTIVATE AGENT NODE
//           </button>
//           <button className="btn-ghost" style={{ padding: "12px 32px", borderRadius: "4px", fontSize: "clamp(.875rem,2vw,1rem)", letterSpacing: ".05em" }} onClick={() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })}>OUR MISSION</button>
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px", maxWidth: "48rem", margin: "0 auto" }}>
//           {[
//             { id: "s1", val: stats.s1, label: "CLASSIFIER ACCURACY" },
//             { id: "s2", val: stats.s2, label: "ATTACK VECTORS" },
//             { id: "s3", val: stats.s3, label: "REAL-TIME FEATURES" },
//             { id: "s4", val: stats.s4, label: "CITY NODES ACTIVE" },
//           ].map(s => (
//             <div key={s.id} className="cyber-card" style={{ borderRadius: "4px", padding: "12px 16px", textAlign: "center" }}>
//               <div style={{ fontSize: "clamp(1.25rem,3vw,1.5rem)", fontWeight: 700, marginBottom: "4px", color: "#39FF14", fontFamily: "'Share Tech Mono',monospace" }}>{s.val}</div>
//               <div style={{ fontSize: ".75rem", letterSpacing: ".05em", color: "rgba(255,255,255,.5)" }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "110px", background: "linear-gradient(to top,#050a05,transparent)", zIndex: 5, pointerEvents: "none" }}></div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════
//    FADE UP WRAPPER
// ══════════════════════════════════════════ */
// function FadeUp({ children, delay = 0, style = {} }) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return (
//     <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ transitionDelay: `${delay}s`, ...style }}>
//       {children}
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    MISSION
// ══════════════════════════════════════════ */
// function Mission() {
//   return (
//     <section id="mission" className="scanline-bg" style={{ padding: "clamp(64px,8vw,96px) clamp(16px,4vw,24px)" }}>
//       <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(40px,6vw,64px)", alignItems: "center" }}>
//           <FadeUp>
//             <div className="section-tag" style={{ marginBottom: "16px" }}>// MISSION.BRIEF</div>
//             <h2 style={{ fontWeight: 700, lineHeight: 1.2, marginBottom: "24px", fontSize: "clamp(1.7rem,4.5vw,2.8rem)" }}>Securing Pakistan's<br /><span className="neon-gradient">Digital Frontier</span></h2>
//             <p style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "20px", color: "rgba(255,255,255,.65)" }}>Pakistan's digital infrastructure faces an escalating barrage of state-sponsored intrusions, ransomware campaigns, and critical sector attacks — yet the gap between threat detection and legal accountability remains dangerously wide.</p>
//             <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,.65)" }}>Neural-Trace closes that gap. By combining passive Cowrie + Dionaea honeypot intelligence, real-time XGBoost classification, and automated forensic report generation, we deliver a seamless pipeline from first packet capture to court-admissible evidence under PECA 2016.</p>
//             <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
//               <div style={{ width: "40px", height: "2px", background: "#39FF14" }}></div>
//               <span style={{ fontSize: ".75rem", letterSpacing: ".1em", color: "rgba(255,255,255,.4)" }}>BUILT FOR PAKISTAN'S CYBER DEFENSE</span>
//             </div>
//           </FadeUp>
//           <FadeUp delay={0.15}>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//               {[
//                 { icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>, color: "#39FF14", label: "DETECT", desc: "Real-time XGBoost ML anomaly detection on live packet flows with 99%+ accuracy" },
//                 { icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>, color: "#ff4444", label: "RESPOND", desc: "Autonomous iptables firewall rules kill malicious sessions within 340ms" },
//                 { icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>, color: "#00c8ff", label: "ATTRIBUTE", desc: "GeoIP + ASN fingerprinting traces attacks to source with ISP-level precision" },
//                 { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>, color: "#ffc800", label: "REPORT", desc: "SHA-256 sealed PDF forensic reports for FIA Cybercrime Wing submission under PECA 2016" },
//               ].map(c => (
//                 <div key={c.label} className="cyber-card" style={{ borderRadius: "8px", padding: "16px" }}>
//                   <div style={{ marginBottom: "12px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2">{c.icon}</svg></div>
//                   <div style={{ fontSize: ".875rem", fontWeight: 700, letterSpacing: ".05em", marginBottom: "8px", color: c.color }}>{c.label}</div>
//                   <p style={{ fontSize: ".75rem", lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{c.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </FadeUp>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════
//    LIVE MAP
// ══════════════════════════════════════════ */
// const CITIES = [
//   { n: "Karachi", lat: 24.8607, lng: 67.0011, c: "#ff3333", cnt: "5,423", t: "alert" },
//   { n: "Lahore", lat: 31.5204, lng: 74.3587, c: "#ff3333", cnt: "1,802", t: "alert" },
//   { n: "Islamabad", lat: 33.6844, lng: 73.0479, c: "#39FF14", cnt: "987", t: "active" },
//   { n: "Quetta", lat: 30.1798, lng: 66.9750, c: "#39FF14", cnt: "412", t: "monitor" },
//   { n: "Peshawar", lat: 34.0151, lng: 71.5249, c: "#39FF14", cnt: "653", t: "active" },
//   { n: "Faisalabad", lat: 31.416, lng: 73.0911, c: "#39FF14", cnt: "541", t: "active" },
//   { n: "Sukkur", lat: 27.7244, lng: 68.8571, c: "#ff3333", cnt: "778", t: "alert" },
//   { n: "Hyderabad", lat: 25.396, lng: 68.3578, c: "#39FF14", cnt: "329", t: "active" },
// ];

// function LiveMap() {
//   const mapRef = useRef(null);
//   const mapInited = useRef(false);

//   useEffect(() => {
//     if (mapInited.current) return;
//     // Load Leaflet CSS + JS dynamically
//     function initMap() {
//       if (!window.L) return;
//       mapInited.current = true;
//       try {
//         const map = window.L.map("threat-map", { center: [30.3753, 69.3451], zoom: 5, scrollWheelZoom: false, attributionControl: false, zoomControl: true });
//         window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19 }).addTo(map);
//         CITIES.forEach(city => {
//           window.L.circleMarker([city.lat, city.lng], { radius: 16, color: city.c, fillColor: city.c, fillOpacity: 0, weight: 1, opacity: .3 }).addTo(map);
//           window.L.circleMarker([city.lat, city.lng], { radius: 6, color: city.c, fillColor: city.c, fillOpacity: .9, weight: 2 }).addTo(map)
//             .bindPopup(`<div style="font-family:'Rajdhani',sans-serif;background:#050a05;border:1px solid ${city.c};padding:12px 16px;border-radius:8px;min-width:155px;"><div style="color:${city.c};font-weight:700;font-size:14px;margin-bottom:4px;">${city.n}</div><div style="color:rgba(255,255,255,.7);font-size:12px;">${city.cnt} threats blocked</div><div style="margin-top:6px;font-size:11px;font-weight:700;color:${city.c};">${city.t === "alert" ? "HIGH ALERT" : city.t === "active" ? "ACTIVE" : "MONITORING"}</div></div>`);
//         });
//       } catch (e) { console.warn("Map:", e); }
//     }
//     if (window.L) { initMap(); return; }
//     const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link);
//     const script = document.createElement("script"); script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; script.onload = initMap; document.head.appendChild(script);
//   }, []);

//   return (
//     <section id="live-map" style={{ padding: "clamp(64px,6vw,80px) clamp(16px,4vw,24px)", background: "rgba(0,0,0,.3)" }}>
//       <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
//         <FadeUp>
//           <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
//             <span className="pulse-dot-red"></span>
//             <span style={{ fontFamily: "'Share Tech Mono',monospace", color: "#39FF14", fontSize: "clamp(.62rem,1.8vw,.82rem)", letterSpacing: ".14em" }}>LIVE THREAT MAP — PAKISTAN</span>
//             <div style={{ flex: 1, height: "1px", background: "rgba(57,255,20,.18)", marginLeft: "6px", minWidth: "16px" }}></div>
//             <span style={{ fontFamily: "'Share Tech Mono',monospace", color: "rgba(255,255,255,.35)", fontSize: ".68rem" }}>FEED ACTIVE</span>
//           </div>
//         </FadeUp>
//         <FadeUp delay={0.1}>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
//             <div style={{ gridColumn: "span 2" }}>
//               <div id="threat-map" ref={mapRef} style={{ height: "420px", border: "1px solid rgba(57,255,20,.2)", borderRadius: "8px", overflow: "hidden" }}></div>
//               <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "14px", flexWrap: "wrap" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span className="pulse-dot"></span><span style={{ fontSize: ".75rem", letterSpacing: ".05em", color: "rgba(255,255,255,.6)" }}>Active Node</span></div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span className="pulse-dot-red"></span><span style={{ fontSize: ".75rem", letterSpacing: ".05em", color: "rgba(255,255,255,.6)" }}>High Alert</span></div>
//               </div>
//             </div>
//             <div className="cyber-card" style={{ borderRadius: "8px", overflow: "hidden", maxHeight: "480px" }}>
//               <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(57,255,20,.15)" }}><span style={{ fontSize: ".875rem", fontWeight: 700, letterSpacing: ".1em", color: "#39FF14" }}>NODE STATUS</span></div>
//               <div style={{ overflowY: "auto", maxHeight: "400px" }}>
//                 {CITIES.map((city, i) => (
//                   <div key={city.n} className="city-item" style={{ padding: "14px 18px", borderBottom: i === CITIES.length - 1 ? "none" : undefined }}>
//                     <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}>
//                       <div>
//                         <div style={{ fontWeight: 700, fontSize: ".9rem", marginBottom: "3px" }}>{city.n}</div>
//                         <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)" }}>{city.cnt} threats blocked</div>
//                       </div>
//                       {city.t === "alert" && <span className="feature-badge" style={{ background: "rgba(255,51,51,.15)", color: "#ff4444" }}>HIGH ALERT</span>}
//                       {city.t === "active" && <span className="feature-badge badge-realtime">ACTIVE</span>}
//                       {city.t === "monitor" && <span className="feature-badge" style={{ background: "rgba(57,255,20,.1)", color: "#39FF14" }}>MONITORING</span>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </FadeUp>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════
//    FEATURES
// ══════════════════════════════════════════ */
// const FEATURES = [
//   { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, color: "#39FF14", badge: "badge-passive", badgeLabel: "PASSIVE DEFENSE", title: "Honeypot Intelligence", desc: "Cowrie SSH and Dionaea malware honeypots lure attackers — silently capturing credentials, malware binaries, and C2 callbacks before they reach production infrastructure." },
//   { icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>, color: "#00ff88", badge: "badge-realtime", badgeLabel: "REAL-TIME", title: "Scapy Packet Analytics", desc: "Live packet capture engine extracts 30 network-layer features per flow — detecting DDoS amplification, botnet beaconing, and port sweeps with sub-second latency." },
//   { icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>, color: "#39FF14", badge: "badge-ai", badgeLabel: "AI-POWERED", title: "XGBoost ML Classifier", desc: "Model trained on CIC-IDS-2017 achieves 99%+ accuracy across 15 attack vectors including SSH Brute Force, DDoS, SQL Injection, Port Scan, and Malware Upload." },
//   { icon: <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>, color: "#ff4444", badge: "badge-auto", badgeLabel: "AUTO-RESPONSE", title: "Automated Kill Function", desc: "Dynamic iptables firewall rules auto-pushed within 340ms — blocking attacker IPs at network perimeter before lateral movement occurs. Rollback safeguards included." },
//   { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, color: "#00c8ff", badge: "badge-forensics", badgeLabel: "FORENSICS", title: "GeoIP Attribution Engine", desc: "ASN data, ISP identity, and geolocation correlate across events — building an evolving threat actor map of Pakistan's digital attack surface session by session." },
//   { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>, color: "#ffc800", badge: "badge-legal", badgeLabel: "LEGAL EVIDENCE", title: "Forensic PDF Reports", desc: "Court-admissible case reports auto-generated per incident — SHA-256 sealed, XGBoost confidence scores, full firewall action history, formatted for FIA submission under PECA 2016." },
// ];

// function Features() {
//   return (
//     <section id="features" className="scanline-bg" style={{ padding: "clamp(64px,8vw,96px) clamp(16px,4vw,24px)" }}>
//       <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
//         <FadeUp>
//           <div style={{ textAlign: "center", marginBottom: "56px" }}>
//             <div className="section-tag" style={{ marginBottom: "16px" }}>// SYSTEM.CAPABILITIES</div>
//             <h2 style={{ fontWeight: 700, lineHeight: 1.2, fontSize: "clamp(1.6rem,4vw,2.8rem)" }}>How <span className="neon-gradient">Neural-Trace</span> Works</h2>
//             <p style={{ marginTop: "16px", maxWidth: "36rem", margin: "16px auto 0", color: "rgba(255,255,255,.55)", fontSize: ".95rem" }}>Six interconnected modules form an unbreakable chain of detection, response, and attribution.</p>
//           </div>
//         </FadeUp>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px 20px" }}>
//           {FEATURES.map((f, i) => (
//             <FadeUp key={f.title} delay={i * 0.05}>
//               <div className="cyber-card" style={{ borderRadius: "12px", padding: "clamp(20px,3vw,24px)", height: "100%" }}>
//                 <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "18px" }}>
//                   <div style={{ padding: "8px", borderRadius: "10px", background: `rgba(${f.color === "#39FF14" ? "57,255,20" : f.color === "#00ff88" ? "0,255,136" : f.color === "#ff4444" ? "255,51,51" : f.color === "#00c8ff" ? "0,200,255" : "255,200,0"},.08)` }}>
//                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2">{f.icon}</svg>
//                   </div>
//                   <span className={`feature-badge ${f.badge}`}>{f.badgeLabel}</span>
//                 </div>
//                 <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,2vw,1.125rem)", letterSpacing: ".025em", marginBottom: "8px" }}>{f.title}</h3>
//                 <p style={{ fontSize: ".875rem", lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{f.desc}</p>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════
//    PIPELINE
// ══════════════════════════════════════════ */
// const PIPELINE_STEPS = [
//   { icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>, color: "#39FF14", label: "CAPTURE", desc: "Scapy sniffs live flows" },
//   { icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>, color: "#00ff88", label: "EXTRACT", desc: "30 flow features" },
//   { icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>, color: "#39FF14", label: "CLASSIFY", desc: "XGBoost ML label" },
//   { icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>, color: "#ff4444", label: "KILL", desc: "Firewall auto-pushed" },
//   { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>, color: "#ffc800", label: "REPORT", desc: "PDF evidence generated" },
// ];

// function Pipeline() {
//   const ref = useRef(null);
//   const [running, setRunning] = useState([false, false, false, false]);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) {
//         [0,1,2,3].forEach(i => setTimeout(() => setRunning(prev => { const n = [...prev]; n[i] = true; return n; }), i * 200));
//       }
//     }, { threshold: 0.3 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <section id="pipeline" style={{ padding: "clamp(64px,8vw,96px) clamp(16px,4vw,24px)", background: "rgba(0,0,0,.25)" }}>
//       <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
//         <FadeUp>
//           <div style={{ textAlign: "center", marginBottom: "56px" }}>
//             <div className="section-tag" style={{ marginBottom: "16px" }}>// ATTACK.PIPELINE</div>
//             <h2 style={{ fontWeight: 700, fontSize: "clamp(1.5rem,4vw,2.6rem)" }}>From Packet to Evidence — <span className="neon-gradient">In Seconds</span></h2>
//           </div>
//         </FadeUp>
//         <FadeUp delay={0.1}>
//           <div ref={ref} className="pipeline-horizontal" style={{ display: "flex", alignItems: "center" }}>
//             {PIPELINE_STEPS.map((step, i) => (
//               <>
//                 <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "80px", flex: 1 }}>
//                   <div style={{ width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", background: `rgba(${step.color === "#39FF14" ? "57,255,20" : step.color === "#00ff88" ? "0,255,136" : step.color === "#ff4444" ? "255,51,51" : "255,200,0"},.08)`, border: `1px solid rgba(${step.color === "#39FF14" ? "57,255,20" : step.color === "#00ff88" ? "0,255,136" : step.color === "#ff4444" ? "255,51,51" : "255,200,0"},.3)` }}>
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2">{step.icon}</svg>
//                   </div>
//                   <div style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".12em", color: step.color, fontFamily: "'Share Tech Mono',monospace", marginBottom: "5px" }}>{step.label}</div>
//                   <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.5)" }}>{step.desc}</div>
//                 </div>
//                 {i < PIPELINE_STEPS.length - 1 && (
//                   <div key={`line${i}`} className={`pipeline-line mx-2 ${running[i] ? "running" : "paused"}`} style={{ margin: "0 8px" }}></div>
//                 )}
//               </>
//             ))}
//           </div>
//         </FadeUp>
//         <p style={{ textAlign: "center", marginTop: "40px", color: "rgba(255,255,255,.4)", fontSize: ".88rem" }}>
//           Average pipeline latency: <span style={{ color: "#39FF14", fontFamily: "'Share Tech Mono',monospace" }}>&lt; 340ms</span> from packet capture to firewall block
//         </p>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════
//    FOOTER
// ══════════════════════════════════════════ */
// function Footer() {
//   return (
//     <footer style={{ padding: "clamp(40px,6vw,64px) clamp(16px,4vw,48px)", background: "rgba(0,0,0,.5)", borderTop: "1px solid rgba(57,255,20,.1)" }}>
//       <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(32px,5vw,40px)", marginBottom: "40px" }}>
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
//               <svg width="30" height="30" viewBox="0 0 160 160" fill="none">
//                 <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" strokeWidth="2"/>
//                 <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" strokeWidth="2"/>
//                 <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
//                 <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
//                 <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
//               </svg>
//               <span style={{ color: "#39FF14", fontFamily: "'Rajdhani',sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: ".12em" }}>NEURAL-TRACE</span>
//             </div>
//             <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".88rem", lineHeight: 1.7, marginBottom: "14px" }}>Protecting Pakistan's critical digital infrastructure through AI-driven threat intelligence, autonomous forensics, and real-time cyber defense.</p>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span className="pulse-dot"></span><span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: ".65rem", color: "rgba(57,255,20,.7)" }}>ALL SYSTEMS OPERATIONAL</span></div>
//           </div>
//           <div>
//             <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", color: "rgba(255,255,255,.4)", marginBottom: "18px" }}>PLATFORM</div>
//             <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//               {[["Our Mission","#mission"],["Platform Features","#features"],["Live Threat Map","#live-map"],["Detection Pipeline","#pipeline"]].map(([label, href]) => (
//                 <a key={label} href={href} style={{ color: "rgba(255,255,255,.6)", fontSize: ".88rem", textDecoration: "none", transition: "color .2s" }} onMouseOver={e => e.currentTarget.style.color="#39FF14"} onMouseOut={e => e.currentTarget.style.color="rgba(255,255,255,.6)"}>{label}</a>
//               ))}
//             </div>
//           </div>
//           <div>
//             <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", color: "rgba(255,255,255,.4)", marginBottom: "18px" }}>SYSTEM LOG</div>
//             <div style={{ borderRadius: "10px", padding: "14px", background: "#010801", border: "1px solid rgba(57,255,20,.15)", fontFamily: "'Share Tech Mono',monospace", fontSize: ".65rem", lineHeight: 1.9 }}>
//               <div style={{ color: "#39FF14" }}>&gt; system.init() -- OK</div>
//               <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; cowrie_honeypot: ACTIVE</div>
//               <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; dionaea_trap: ACTIVE</div>
//               <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; xgboost_classifier: v2.1.1</div>
//               <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; nodes: KHI LHR ISB QTA PEW</div>
//               <div style={{ color: "#ff4444" }}>&gt; alerts: HIGH SEVERITY ACTIVE</div>
//               <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; uptime: 99.97%</div>
//               <div style={{ color: "#39FF14" }}>&gt; <span className="typing-cursor"></span></div>
//             </div>
//           </div>
//         </div>
//         <div style={{ borderTop: "1px solid rgba(57,255,20,.08)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
//           <p style={{ color: "rgba(255,255,255,.28)", fontSize: ".75rem", textAlign: "center" }}>© 2026 Neural-Trace — Threat Intelligence & Digital Forensics. All rights reserved. Developed in Pakistan for Pakistan's cyber defense.</p>
//           <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
//             {[
//               ["Privacy Policy", "Privacy Policy\n\nNeural-Trace collects network packet metadata and honeypot logs solely for cybersecurity threat detection. No personal user data is sold or shared with third parties. All forensic evidence is stored securely and submitted only to authorized Pakistani law enforcement under PECA 2016. Data retention: 90 days unless required for legal proceedings.\n\n© 2026 Neural-Trace."],
//               ["Terms of Service", "Terms of Service\n\nNeural-Trace is authorized for registered citizens, organizations, and government agencies in Pakistan.\n\n1. Comply with PECA 2016 at all times\n2. Do not attempt to circumvent platform security\n3. Use forensic reports only for legitimate law enforcement purposes\n4. Report vulnerabilities responsibly\n\nUnauthorized access is monitored and reported to FIA Cybercrime Wing.\n\n© 2026 Neural-Trace."],
//               ["Security Disclosure", "Security Disclosure\n\nFound a vulnerability in Neural-Trace? Report it responsibly:\n\nContact: security@neuraltrace.pk\nResponse time: 48 hours\n\nWe follow responsible disclosure. Researchers who report valid vulnerabilities will be acknowledged.\n\n© 2026 Neural-Trace."],
//             ].map(([label, msg]) => (
//               <button key={label} onClick={() => alert(msg)} style={{ color: "rgba(255,255,255,.3)", fontSize: ".75rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", transition: "color .2s" }} onMouseOver={e => e.currentTarget.style.color="#39FF14"} onMouseOut={e => e.currentTarget.style.color="rgba(255,255,255,.3)"}>{label}</button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ══════════════════════════════════════════
//    ROOT APP
// ══════════════════════════════════════════ */
// export default function NeuralTrace() {
//   const [splashDone, setSplashDone] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);

//   // Inject global styles once
//   useEffect(() => {
//     const id = "neural-trace-styles";
//     if (!document.getElementById(id)) {
//       const style = document.createElement("style");
//       style.id = id;
//       style.textContent = GLOBAL_STYLES;
//       document.head.appendChild(style);
//     }
//     return () => {}; // keep styles across re-renders
//   }, []);

//   return (
//     <div style={{ background: "#050a05", minHeight: "100vh", fontFamily: "'Rajdhani',sans-serif" }}>
//       <Splash onDone={() => setSplashDone(true)} />
//       <LoginModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
//       <Navbar onOpenLogin={() => setModalOpen(true)} />
//       <Hero onOpenLogin={() => setModalOpen(true)} started={splashDone} />
//       <Mission />
//       <LiveMap />
//       <Features />
//       <Pipeline />
//       <Footer />
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";

/* ─── Google Fonts + Leaflet injected once ─── */
const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

:root{--neon:#39FF14;--neon-light:#00ff88;--bg:#050a05;--card-border:rgba(57,255,20,0.15);--card-bg:rgba(57,255,20,0.03);}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:#050a05;color:#fff;font-family:'Rajdhani',sans-serif;overflow-x:hidden;margin:0;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:#050a05;}
::-webkit-scrollbar-thumb{background:#39FF14;border-radius:3px;}

/* SPLASH */
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

/* NAVBAR */
#navbar{position:fixed;top:0;left:0;right:0;z-index:1000;backdrop-filter:blur(14px);transition:all .3s;border-bottom:1px solid transparent;}
#navbar.scrolled{background:rgba(5,10,5,.96);border-bottom:1px solid #39FF14;box-shadow:0 0 30px rgba(57,255,20,.1);}
.nav-logo-svg{width:36px;height:36px;filter:drop-shadow(0 0 8px rgba(57,255,20,.55));flex-shrink:0;}

/* NAV LINKS — show on desktop, hide on mobile */
.desktop-nav{
  display:flex;
  align-items:center;
  gap:clamp(16px,2.5vw,32px);
}
/* Hamburger — hide on desktop, show on mobile */
.hamburger-btn{display:none;}

@media(max-width:768px){
  .desktop-nav{display:none !important;}
  .hamburger-btn{display:flex !important;}
  .nav-access-btn{display:none;}
}

/* HERO */
#matrix-canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:.17;}
.hero-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(57,255,20,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);}

/* PULSES */
@keyframes pd{0%,100%{box-shadow:0 0 0 0 rgba(57,255,20,.7);}50%{box-shadow:0 0 0 8px rgba(57,255,20,0);}}
@keyframes pr{0%,100%{box-shadow:0 0 0 0 rgba(255,51,51,.7);}50%{box-shadow:0 0 0 8px rgba(255,51,51,0);}}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:#39FF14;animation:pd 1.5s infinite;display:inline-block;flex-shrink:0;}
.pulse-dot-red{width:8px;height:8px;border-radius:50%;background:#ff3333;animation:pr 1.5s infinite;display:inline-block;flex-shrink:0;}

/* TYPOGRAPHY */
.neon-gradient{background:linear-gradient(90deg,#39FF14,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.section-tag{font-family:'Share Tech Mono',monospace;font-size:.73rem;color:#39FF14;letter-spacing:.15em;}
.typing-cursor::after{content:'|';color:#39FF14;animation:blink .7s step-end infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

/* CARDS */
.cyber-card{border:1px solid rgba(57,255,20,0.15);background:rgba(57,255,20,0.03);transition:all .3s;position:relative;overflow:hidden;}
.cyber-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(57,255,20,.05) 0%,transparent 60%);opacity:0;transition:opacity .3s;}
.cyber-card:hover::before{opacity:1;}
.cyber-card:hover{border-color:rgba(57,255,20,.6);box-shadow:0 0 20px rgba(57,255,20,.15);transform:translateY(-2px);}

/* FADE UP */
.fade-up{opacity:0;transform:translateY(28px);transition:opacity .7s,transform .7s;}
.fade-up.visible{opacity:1;transform:translateY(0);}

/* BUTTONS */
.btn-neon{background:#39FF14;color:#050a05;font-weight:700;letter-spacing:.05em;transition:all .3s;font-family:'Rajdhani',sans-serif;cursor:pointer;border:none;}
.btn-neon:hover{background:#00ff88;box-shadow:0 0 20px rgba(57,255,20,.5);transform:translateY(-1px);}
.btn-ghost{border:1px solid #39FF14;color:#39FF14;background:transparent;font-weight:600;letter-spacing:.05em;transition:all .3s;font-family:'Rajdhani',sans-serif;cursor:pointer;}
.btn-ghost:hover{background:rgba(57,255,20,.1);box-shadow:0 0 15px rgba(57,255,20,.3);}

/* MAP */
.leaflet-container{background:#0a120a;}
.leaflet-popup-content-wrapper{background:transparent!important;border:none!important;box-shadow:none!important;padding:0!important}
.leaflet-popup-content{margin:0!important}
.leaflet-popup-tip-container{display:none}

/* PIPELINE */
.pipeline-line{flex:1;height:2px;background:repeating-linear-gradient(90deg,#39FF14 0,#39FF14 8px,transparent 8px,transparent 16px);background-size:200% 100%;animation:dashFlow 2s linear infinite;}
@keyframes dashFlow{from{background-position:200% 0;}to{background-position:0 0;}}
.pipeline-line.paused{animation-play-state:paused;}
.pipeline-line.running{animation-play-state:running;}
@media(max-width:768px){
  .pipeline-horizontal{flex-direction:column;align-items:center;}
  .pipeline-line{width:2px;height:30px;flex:none;background:repeating-linear-gradient(180deg,#39FF14 0,#39FF14 8px,transparent 8px,transparent 16px);margin:0 auto;}
  #threat-map{height:280px!important;}
}

/* BADGES */
.feature-badge{font-family:'Share Tech Mono',monospace;font-size:.58rem;letter-spacing:.1em;padding:2px 7px;border-radius:2px;white-space:nowrap;}
.badge-passive{background:rgba(57,255,20,.15);color:#39FF14;}
.badge-realtime{background:rgba(0,255,136,.15);color:#00ff88;}
.badge-ai{background:rgba(57,255,20,.15);color:#39FF14;}
.badge-auto{background:rgba(255,51,51,.15);color:#ff6666;}
.badge-forensics{background:rgba(0,200,255,.15);color:#00c8ff;}
.badge-legal{background:rgba(255,200,0,.15);color:#ffc800;}

.city-item{border-bottom:1px solid rgba(57,255,20,.08);transition:background .2s;}
.city-item:hover{background:rgba(57,255,20,.05);}
.scanline-bg{background-image:linear-gradient(rgba(57,255,20,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,.02) 1px,transparent 1px);background-size:40px 40px;}

/* MODAL */
#login-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.87);backdrop-filter:blur(12px);display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto;}
#login-modal.open{display:flex;}
.modal-card{background:#0a141b;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:clamp(22px,5vw,36px);width:100%;max-width:440px;box-shadow:0 0 50px rgba(57,255,20,.12);position:relative;max-height:90vh;overflow-y:auto;}
.modal-card::-webkit-scrollbar{width:3px;}
.modal-card::-webkit-scrollbar-thumb{background:#39FF14;}
.modal-tab{padding:10px 20px;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:.92rem;letter-spacing:.05em;cursor:pointer;border:none;background:transparent;color:#6b7280;border-bottom:2px solid transparent;transition:all .2s;}
.modal-tab.active{color:#39FF14;border-bottom-color:#39FF14;}
.modal-input{width:100%;background:#040a0f;border:1px solid rgba(57,255,20,.2);padding:12px 14px;border-radius:12px;color:#fff;outline:none;font-family:'Rajdhani',sans-serif;font-size:.92rem;transition:border-color .2s;}
.modal-input:focus{border-color:#39FF14;}
.modal-input::placeholder{color:#4b5563;}
.modal-input option{background:#040a0f;color:#fff;}
.modal-input-wrap{position:relative;}
.modal-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#6b7280;transition:color .2s;display:flex;align-items:center;}
.modal-eye:hover{color:#39FF14;}
.str-bar{height:4px;flex:1;border-radius:2px;transition:background .3s;}
.role-desc{font-size:.72rem;padding:8px 12px;border-radius:8px;border:1px solid;}
.role-citizen{background:rgba(57,255,20,.05);border-color:rgba(57,255,20,.2);color:#39FF14;}
.role-company{background:rgba(59,130,246,.05);border-color:rgba(59,130,246,.25);color:#60a5fa;}
.popular-card{border-color:#39FF14!important;box-shadow:0 0 30px rgba(57,255,20,.2),0 0 60px rgba(57,255,20,.05);}

body::before{content:'';position:fixed;inset:0;z-index:-1;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");background-size:200px 200px;opacity:.4;pointer-events:none;}
`;

/* ─── SVG Badge (reused) ─── */
function ShieldBadge({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" strokeWidth="2"/>
      <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" strokeWidth="2.5" strokeDasharray="4 2" opacity=".5"/>
      <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,0.5)" stroke="#39FF14" strokeWidth="2"/>
      <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
      <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
      <rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
      <path d="M73 58 Q80 52 87 58" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9"/>
      <path d="M68 53 Q80 44 92 53" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".65"/>
      <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
      <g opacity=".7" stroke="#1a1a1a" strokeWidth=".5">
        <ellipse cx="34" cy="80" rx="5" ry="3" fill="#0d5c23" transform="rotate(-30 34 80)"/>
        <ellipse cx="30" cy="88" rx="5" ry="3" fill="#0d5c23" transform="rotate(-20 30 88)"/>
        <ellipse cx="28" cy="97" rx="5" ry="3" fill="#0d5c23" transform="rotate(-10 28 97)"/>
        <ellipse cx="30" cy="106" rx="5" ry="3" fill="#0d5c23" transform="rotate(5 30 106)"/>
        <ellipse cx="36" cy="113" rx="5" ry="3" fill="#0d5c23" transform="rotate(20 36 113)"/>
        <ellipse cx="38" cy="72" rx="5" ry="3" fill="#0d5c23" transform="rotate(-45 38 72)"/>
        <line x1="34" y1="80" x2="42" y2="115" stroke="#39FF14" strokeWidth=".8" opacity=".4"/>
      </g>
      <g opacity=".7" stroke="#1a1a1a" strokeWidth=".5">
        <ellipse cx="126" cy="80" rx="5" ry="3" fill="#0d5c23" transform="rotate(30 126 80)"/>
        <ellipse cx="130" cy="88" rx="5" ry="3" fill="#0d5c23" transform="rotate(20 130 88)"/>
        <ellipse cx="132" cy="97" rx="5" ry="3" fill="#0d5c23" transform="rotate(10 132 97)"/>
        <ellipse cx="130" cy="106" rx="5" ry="3" fill="#0d5c23" transform="rotate(-5 130 106)"/>
        <ellipse cx="124" cy="113" rx="5" ry="3" fill="#0d5c23" transform="rotate(-20 124 113)"/>
        <ellipse cx="122" cy="72" rx="5" ry="3" fill="#0d5c23" transform="rotate(45 122 72)"/>
        <line x1="126" y1="80" x2="118" y2="115" stroke="#39FF14" strokeWidth=".8" opacity=".4"/>
      </g>
      <path d="M52 126 Q80 118 108 126 Q108 136 80 138 Q52 136 52 126Z" fill="#39FF14"/>
      <text x="80" y="134" textAnchor="middle" fontFamily="Rajdhani,sans-serif" fontSize="10" fontWeight="700" fill="#050a05" letterSpacing="1">EST 2026</text>
      <path id="topArc" d="M 24 80 A 56 56 0 0 1 136 80" fill="none"/>
      <text fontFamily="Rajdhani,sans-serif" fontSize="8.5" fontWeight="700" fill="white" letterSpacing="1.5">
        <textPath href="#topArc" startOffset="4%">THREAT INTELLIGENCE &amp; DIGITAL FORENSICS</textPath>
      </text>
    </svg>
  );
}

function NavShield() {
  return (
    <svg className="nav-logo-svg" viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" strokeWidth="2.5"/>
      <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" strokeWidth="2" strokeDasharray="4 2" opacity=".4"/>
      <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" strokeWidth="2"/>
      <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
      <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
      <rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
      <path d="M73 58 Q80 52 87 58" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9"/>
      <path d="M68 53 Q80 44 92 53" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"/>
      <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
      <path d="M52 126 Q80 118 108 126 Q108 136 80 138 Q52 136 52 126Z" fill="#39FF14"/>
      <text x="80" y="134" textAnchor="middle" fontFamily="Rajdhani,sans-serif" fontSize="10" fontWeight="700" fill="#050a05" letterSpacing="1">EST 2026</text>
    </svg>
  );
}

/* ─── Eye icon ─── */
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

/* ─── Password strength rules ─── */
const RULES = [
  { test: p => p.length >= 8, label: "At least 8 characters" },
  { test: p => /[A-Z]/.test(p), label: "One uppercase letter (A–Z)" },
  { test: p => /[a-z]/.test(p), label: "One lowercase letter (a–z)" },
  { test: p => /[0-9]/.test(p), label: "One number (0–9)" },
  { test: p => /[^A-Za-z0-9]/.test(p), label: "One special character (!@#$…)" },
];
const STR_L = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
const STR_C = ["", "#ef4444", "#f97316", "#eab308", "#4ade80", "#4ade80"];

const API = "http://13.63.35.36:8000";

/* ══════════════════════════════════════════
   LOGIN MODAL
══════════════════════════════════════════ */
function LoginModal({ isOpen, onClose }) {
  const [tab, setTab] = useState("login");
  const [loginRole, setLoginRole] = useState("citizen");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [regRole, setRegRole] = useState("citizen");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const passRules = RULES.map(r => ({ ...r, passed: r.test(regPass) }));
  const passScore = passRules.filter(r => r.passed).length;
  const passMatch = regPass && regPass === regConfirm;
  const regReady = passScore === 5 && passMatch;

  const roleDesc = regRole === "citizen"
    ? "Access: Live Map, General Alerts, IP Lookup"
    : "Access: Full Dashboard, Threat Feeds, Forensic Vault, IP Intel";

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError(""); setLoginLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loginEmail.trim(), password: loginPass }) });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("full_name", data.full_name);
        window.location.href = data.role === "citizen" ? "/dashboard" : "/admin";
      } else setLoginError(data.detail || "Invalid email or password.");
    } catch { setLoginError("Connection failed. Make sure backend is running on port 8000."); }
    finally { setLoginLoading(false); }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setRegError(""); setRegLoading(true);
    if (regPass !== regConfirm) { setRegError("Passwords do not match."); setRegLoading(false); return; }
    if (!RULES.every(r => r.test(regPass))) { setRegError("Password does not meet all requirements."); setRegLoading(false); return; }
    try {
      const res = await fetch(`${API}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ full_name: regName.trim(), email: regEmail.trim(), phone_number: regPhone.trim(), password: regPass, role: regRole }) });
      const data = await res.json();
      if (data.user_id) { alert("Account created successfully! Please login."); setTab("login"); }
      else setRegError(data.detail || "Registration failed. Please try again.");
    } catch { setRegError("Connection failed. Make sure backend is running on port 8000."); }
    finally { setRegLoading(false); }
  }

  if (!isOpen) return null;

  return (
    <div id="login-modal" className="open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card">
        <button onClick={onClose} style={{ color: "rgba(57,255,20,.5)", fontSize: ".72rem", fontFamily: "'Share Tech Mono',monospace", letterSpacing: ".08em", border: "none", background: "none", cursor: "pointer", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px", transition: "color .2s" }}
          onMouseOver={e => e.currentTarget.style.color = "#39FF14"} onMouseOut={e => e.currentTarget.style.color = "rgba(57,255,20,.5)"}>
          &larr; BACK TO NEURAL-TRACE HOME
        </button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ marginBottom: "14px", filter: "drop-shadow(0 0 12px rgba(57,255,20,.3))" }}>
            <svg width="68" height="68" viewBox="0 0 160 160" fill="none">
              <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" strokeWidth="2"/>
              <circle cx="80" cy="80" r="64" fill="none" stroke="#39FF14" strokeWidth="2" strokeDasharray="4 2" opacity=".4"/>
              <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" strokeWidth="2"/>
              <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
              <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
              <rect x="78.5" y="82" width="3" height="5" rx="1" fill="#0a1f2e"/>
              <path d="M73 58 Q80 52 87 58" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9"/>
              <path d="M68 53 Q80 44 92 53" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"/>
              <circle cx="80" cy="62" r="2" fill="white" opacity=".9"/>
            </svg>
          </div>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(57,255,20,.2)", width: "100%", justifyContent: "center" }}>
            <button className={`modal-tab${tab === "login" ? " active" : ""}`} onClick={() => setTab("login")}>Login</button>
            <button className={`modal-tab${tab === "register" ? " active" : ""}`} onClick={() => setTab("register")}>Register</button>
          </div>
        </div>

        {(loginError || regError) && (
          <div style={{ marginBottom: "12px", padding: "10px 14px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: "10px", color: "#f87171", fontSize: ".82rem", textAlign: "center" }}>
            {tab === "login" ? loginError : regError}
          </div>
        )}

        {tab === "login" && (
          <form onSubmit={handleLogin}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: ".72rem", color: "#39FF14", fontWeight: 700, letterSpacing: ".06em", display: "block", marginBottom: "4px", marginLeft: "2px" }}>ACCOUNT TYPE</label>
                <select className="modal-input" value={loginRole} onChange={e => setLoginRole(e.target.value)}>
                  <option value="citizen">Citizen</option>
                  <option value="admin">Organization Admin</option>
                </select>
              </div>
              <input type="text" required placeholder="Email Address" className="modal-input" autoComplete="username" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <div className="modal-input-wrap">
                <input type={showLoginPass ? "text" : "password"} required placeholder="Password" className="modal-input" style={{ paddingRight: "42px" }} autoComplete="current-password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
                <button type="button" className="modal-eye" onClick={() => setShowLoginPass(v => !v)}><EyeIcon /></button>
              </div>
              <button type="submit" className="btn-neon" style={{ width: "100%", padding: "13px", borderRadius: "12px", fontSize: ".92rem", letterSpacing: ".05em", marginTop: "4px" }} disabled={loginLoading}>
                {loginLoading ? "AUTHENTICATING..." : "AUTHENTICATE & SIGN IN"}
              </button>
            </div>
          </form>
        )}

        {tab === "register" && (
          <form onSubmit={handleRegister}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: ".72rem", color: "#39FF14", fontWeight: 700, letterSpacing: ".06em", display: "block", marginBottom: "4px", marginLeft: "2px" }}>REGISTER AS</label>
                <select className="modal-input" value={regRole} onChange={e => setRegRole(e.target.value)}>
                  <option value="citizen">Citizen (Free)</option>
                  <option value="company">Organization / Corporate</option>
                </select>
              </div>
              <div className={`role-desc ${regRole === "citizen" ? "role-citizen" : "role-company"}`}>{roleDesc}</div>
              <input type="text" required placeholder="Full Name" className="modal-input" autoComplete="name" value={regName} onChange={e => setRegName(e.target.value)} />
              <input type="email" required placeholder="Email Address" className="modal-input" autoComplete="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
              <input type="tel" required placeholder="Phone Number" className="modal-input" autoComplete="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
              <div className="modal-input-wrap">
                <input type={showRegPass ? "text" : "password"} required placeholder="Password" className="modal-input" style={{ paddingRight: "42px" }} autoComplete="new-password" value={regPass} onChange={e => setRegPass(e.target.value)} />
                <button type="button" className="modal-eye" onClick={() => setShowRegPass(v => !v)}><EyeIcon /></button>
              </div>
              {regPass && (
                <div style={{ background: "#060e13", border: "1px solid rgba(255,255,255,.06)", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: ".6rem", color: "#6b7280", letterSpacing: ".08em" }}>PASSWORD STRENGTH</span>
                    <span style={{ fontSize: ".7rem", fontWeight: 700, color: STR_C[passScore] }}>{STR_L[passScore]}</span>
                  </div>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
                    {[0,1,2,3,4].map(i => <div key={i} className="str-bar" style={{ background: i < passScore ? STR_C[passScore] : "#1e2d27" }} />)}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {passRules.map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: ".73rem" }}>
                        <span style={{ color: r.passed ? "#4ade80" : "#6b7280", fontSize: "12px" }}>{r.passed ? "✓" : "✗"}</span>
                        <span style={{ color: r.passed ? "#4ade80" : "#6b7280" }}>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="modal-input-wrap">
                  <input type={showRegConfirm ? "text" : "password"} required placeholder="Confirm Password" className="modal-input" style={{ paddingRight: "42px" }} autoComplete="new-password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} />
                  <button type="button" className="modal-eye" onClick={() => setShowRegConfirm(v => !v)}><EyeIcon /></button>
                </div>
                <div style={{ marginTop: "4px", fontSize: ".73rem", fontWeight: 600, paddingLeft: "4px", minHeight: "18px", color: regConfirm ? (passMatch ? "#4ade80" : "#f87171") : "" }}>
                  {regConfirm ? (passMatch ? "✓ Passwords match" : "✗ Passwords do not match") : ""}
                </div>
              </div>
              <button type="submit" className="btn-neon" style={{ width: "100%", padding: "13px", borderRadius: "12px", fontSize: ".92rem", letterSpacing: ".05em", marginTop: "4px", opacity: regReady ? 1 : 0.5, cursor: regReady ? "pointer" : "not-allowed" }} disabled={!regReady || regLoading}>
                {regLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT / SIGN UP"}
              </button>
            </div>
          </form>
        )}

        <div style={{ textAlign: "center", marginTop: "14px" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(57,255,20,.6)", fontSize: ".85rem", fontFamily: "'Rajdhani',sans-serif", transition: "color .2s" }}
            onMouseOver={e => e.currentTarget.style.color = "#39FF14"} onMouseOut={e => e.currentTarget.style.color = "rgba(57,255,20,.6)"}
            onClick={() => setTab(tab === "login" ? "register" : "login")}>
            {tab === "login" ? "Don't have an account? Sign up here" : "Already have an account? Login here"}
          </button>
        </div>
        <p style={{ textAlign: "center", color: "#4b5563", fontSize: ".65rem", fontFamily: "'Share Tech Mono',monospace", marginTop: "14px", letterSpacing: ".06em" }}>
          SYSTEM STATUS: <span style={{ color: "#39FF14" }}>ACTIVE</span> | Neural-Trace
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SPLASH
══════════════════════════════════════════ */
function Splash({ onDone }) {
  const canvasRef = useRef(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const chars = "01アイウエオカキクサシスタチツナニヌ";
    let cols, drops, raf;
    function init() {
      c.width = window.innerWidth; c.height = window.innerHeight;
      cols = Math.floor(c.width / 18);
      drops = Array(cols).fill(0).map(() => Math.floor(Math.random() * -30));
    }
    function draw() {
      ctx.fillStyle = "rgba(5,10,5,.06)"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = "13px 'Share Tech Mono',monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 18, y = drops[i] * 18;
        if (drops[i] > 0) { ctx.fillStyle = "#fff"; ctx.fillText(ch, x, y); ctx.fillStyle = "#39FF14"; ctx.fillText(ch, x, y - 18); }
        if (y > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    init();
    window.addEventListener("resize", init);
    const interval = setInterval(draw, 55);
    const timer = setTimeout(() => {
      setHide(true);
      setTimeout(onDone, 900);
    }, 3400);
    return () => { clearInterval(interval); clearTimeout(timer); window.removeEventListener("resize", init); };
  }, []);

  return (
    <div id="splash" className={hide ? "hide" : ""}>
      <canvas id="splash-canvas" ref={canvasRef}></canvas>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(57,255,20,.09) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }}></div>
      <div className="splash-inner">
        <div className="splash-logo-wrap">
          <div style={{ filter: "drop-shadow(0 0 28px rgba(57,255,20,.6)) drop-shadow(0 0 60px rgba(57,255,20,.25))" }}>
            <ShieldBadge size={150} />
          </div>
        </div>
        <div className="splash-title">NEURAL-TRACE</div>
        <div className="splash-line"></div>
        <div className="splash-sub">PAKISTAN'S AI-POWERED CYBER DEFENSE PLATFORM</div>
        <div className="splash-boot">INITIALIZING DEFENSE MATRIX...</div>
        <div className="splash-bar-wrap"><div className="splash-bar-fill"></div></div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   NAVBAR  ← KEY CHANGE HERE
══════════════════════════════════════════ */
function Navbar({ onOpenLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const NAV_LINKS = [
    ["MISSION",  "#mission"],
    ["FEATURES", "#features"],
    ["LIVE MAP", "#live-map"],
    ["PIPELINE", "#pipeline"],
  ];

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""} style={{ width: "100%", padding: "12px 16px" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
          <NavShield />
          <span style={{ color: "#39FF14", fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(.95rem,2.5vw,1.15rem)", fontWeight: 700, letterSpacing: ".14em" }}>NEURAL-TRACE</span>
        </a>

        {/* Desktop nav links — centre */}
        <div className="desktop-nav">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{ color: "rgba(255,255,255,.7)", fontSize: ".82rem", fontWeight: 600, letterSpacing: ".1em", textDecoration: "none", transition: "color .2s", whiteSpace: "nowrap" }}
              onMouseOver={e => e.currentTarget.style.color = "#39FF14"}
              onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,.7)"}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA button */}
        <button
          className="btn-neon nav-access-btn"
          style={{ padding: "8px 20px", borderRadius: "4px", fontSize: ".875rem", letterSpacing: ".05em", flexShrink: 0 }}
          onClick={() => onOpenLogin(false)}
        >
          ACCESS VAULT
        </button>

        {/* Mobile hamburger — hidden on desktop via CSS */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "6px", padding: "8px" }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: "20px", height: "2px", background: "#39FF14" }}></span>
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ marginTop: "12px", padding: "16px", borderTop: "1px solid rgba(57,255,20,.18)", display: "flex", flexDirection: "column", gap: "14px" }}>
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{ color: "rgba(255,255,255,.75)", fontSize: ".85rem", fontWeight: 600, letterSpacing: ".1em", textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div style={{ borderTop: "1px solid rgba(57,255,20,.1)", paddingTop: "12px" }}>
            <button
              className="btn-neon"
              style={{ padding: "8px 20px", borderRadius: "4px", fontSize: ".875rem", letterSpacing: ".05em" }}
              onClick={() => { setMenuOpen(false); onOpenLogin(false); }}
            >
              ACCESS VAULT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero({ onOpenLogin, started }) {
  const canvasRef = useRef(null);
  const [typedHtml, setTypedHtml] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [stats, setStats] = useState({ s1: "0%", s2: "0", s3: "0", s4: "0" });

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const chars = "アイウエオカキクケコサシスセソ0123456789ABCDEF";
    let cols, drops;
    function init() { c.width = window.innerWidth; c.height = window.innerHeight; cols = Math.floor(c.width / 18); drops = Array(cols).fill(0).map(() => Math.floor(Math.random() * -40)); }
    function draw() {
      ctx.fillStyle = "rgba(5,10,5,.045)"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = "14px 'Share Tech Mono',monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]; const x = i * 18, y = drops[i] * 18;
        if (drops[i] > 0) { ctx.fillStyle = "#fff"; ctx.fillText(ch, x, y); ctx.fillStyle = "#39FF14"; ctx.fillText(ch, x, y - 18); }
        if (y > c.height && Math.random() > 0.975) drops[i] = 0; drops[i]++;
      }
    }
    init(); window.addEventListener("resize", init);
    const iv = setInterval(draw, 55);
    return () => { clearInterval(iv); window.removeEventListener("resize", init); };
  }, []);

  useEffect(() => {
    if (!started) return;
    const lines = ["AI-POWERED THREAT INTELLIGENCE &", "FORENSICS"];
    let line = 0, char = 0;
    function type() {
      const l = lines[line];
      if (char < l.length) {
        if (line === 0) setTypedHtml(l.substring(0, char + 1));
        else setTypedHtml(`${lines[0]}<br/><neon>${l.substring(0, char + 1)}</neon>`);
        char++; setTimeout(type, line === 0 ? 38 : 60);
      } else if (line < lines.length - 1) { line++; char = 0; setTimeout(type, 150); }
      else setTypingDone(true);
    }
    type();
    function cnt(key, target, suf, dec, dur) {
      let s = 0; const step = target / (dur / 16);
      function run() {
        s += step;
        if (s >= target) { setStats(prev => ({ ...prev, [key]: (dec ? target.toFixed(1) : Math.floor(target)) + suf })); return; }
        setStats(prev => ({ ...prev, [key]: (dec ? s.toFixed(1) : Math.floor(s)) + suf }));
        requestAnimationFrame(run);
      }
      run();
    }
    cnt("s1", 99.2, "%", true, 1800); cnt("s2", 15, "+", false, 1200); cnt("s3", 30, "", false, 1200); cnt("s4", 8, "", false, 900);
  }, [started]);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#050a05" }}>
      <canvas id="matrix-canvas" ref={canvasRef}></canvas>
      <div className="hero-grid"></div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 50%,rgba(57,255,20,.06) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }}></div>
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "64rem", margin: "0 auto", padding: "clamp(90px,12vw,120px) 16px 0" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "24px", padding: "8px 16px", borderRadius: "9999px", border: "1px solid rgba(57,255,20,.3)", background: "rgba(57,255,20,.05)" }}>
          <span className="pulse-dot"></span>
          <span style={{ color: "#39FF14", fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(.5rem,1.8vw,.72rem)", letterSpacing: ".14em" }}>SYSTEM ONLINE — MONITORING PAKISTAN</span>
        </div>
        <h1 style={{ fontWeight: 700, lineHeight: 1.15, letterSpacing: "-.01em", marginBottom: "24px", fontSize: "clamp(1.7rem,5.5vw,4.2rem)" }}>
          {typedHtml.includes("<neon>") ? (
            <>
              {typedHtml.split("<br/>")[0]}<br/>
              <span style={{ background: "linear-gradient(90deg,#39FF14,#00ff88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {typedHtml.split("<neon>")[1]?.replace("</neon>", "") || ""}
              </span>
            </>
          ) : (
            <span className={!typingDone ? "typing-cursor" : ""}>{typedHtml}</span>
          )}
          {typedHtml.includes("<neon>") && !typingDone && <span className="typing-cursor" style={{ display: "inline" }}></span>}
        </h1>
        <p style={{ marginBottom: "40px", maxWidth: "42rem", margin: "0 auto 40px", lineHeight: 1.7, color: "rgba(255,255,255,.65)", fontSize: "clamp(.88rem,2.2vw,1.05rem)" }}>
          Defending Pakistan's critical digital infrastructure — in real time — with passive honeypot traps, live packet analytics, and automated forensic attribution under PECA 2016.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "48px" }}>
          <button className="btn-neon" style={{ padding: "12px 32px", borderRadius: "4px", fontSize: "clamp(.875rem,2vw,1rem)", letterSpacing: ".05em", display: "flex", alignItems: "center", gap: "8px" }} onClick={() => onOpenLogin(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            ACTIVATE AGENT NODE
          </button>
          <button className="btn-ghost" style={{ padding: "12px 32px", borderRadius: "4px", fontSize: "clamp(.875rem,2vw,1rem)", letterSpacing: ".05em" }} onClick={() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })}>OUR MISSION</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px", maxWidth: "48rem", margin: "0 auto" }}>
          {[
            { id: "s1", val: stats.s1, label: "CLASSIFIER ACCURACY" },
            { id: "s2", val: stats.s2, label: "ATTACK VECTORS" },
            { id: "s3", val: stats.s3, label: "REAL-TIME FEATURES" },
            { id: "s4", val: stats.s4, label: "CITY NODES ACTIVE" },
          ].map(s => (
            <div key={s.id} className="cyber-card" style={{ borderRadius: "4px", padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "clamp(1.25rem,3vw,1.5rem)", fontWeight: 700, marginBottom: "4px", color: "#39FF14", fontFamily: "'Share Tech Mono',monospace" }}>{s.val}</div>
              <div style={{ fontSize: ".75rem", letterSpacing: ".05em", color: "rgba(255,255,255,.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "110px", background: "linear-gradient(to top,#050a05,transparent)", zIndex: 5, pointerEvents: "none" }}></div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FADE UP WRAPPER
══════════════════════════════════════════ */
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   MISSION
══════════════════════════════════════════ */
function Mission() {
  return (
    <section id="mission" className="scanline-bg" style={{ padding: "clamp(64px,8vw,96px) clamp(16px,4vw,24px)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(40px,6vw,64px)", alignItems: "center" }}>
          <FadeUp>
            <div className="section-tag" style={{ marginBottom: "16px" }}>// MISSION.BRIEF</div>
            <h2 style={{ fontWeight: 700, lineHeight: 1.2, marginBottom: "24px", fontSize: "clamp(1.7rem,4.5vw,2.8rem)" }}>Securing Pakistan's<br /><span className="neon-gradient">Digital Frontier</span></h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "20px", color: "rgba(255,255,255,.65)" }}>Pakistan's digital infrastructure faces an escalating barrage of state-sponsored intrusions, ransomware campaigns, and critical sector attacks — yet the gap between threat detection and legal accountability remains dangerously wide.</p>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,.65)" }}>Neural-Trace closes that gap. By combining passive Cowrie + Dionaea honeypot intelligence, real-time XGBoost classification, and automated forensic report generation, we deliver a seamless pipeline from first packet capture to court-admissible evidence under PECA 2016.</p>
            <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "2px", background: "#39FF14" }}></div>
              <span style={{ fontSize: ".75rem", letterSpacing: ".1em", color: "rgba(255,255,255,.4)" }}>BUILT FOR PAKISTAN'S CYBER DEFENSE</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>, color: "#39FF14", label: "DETECT", desc: "Real-time XGBoost ML anomaly detection on live packet flows with 99%+ accuracy" },
                { icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>, color: "#ff4444", label: "RESPOND", desc: "Autonomous iptables firewall rules kill malicious sessions within 340ms" },
                { icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>, color: "#00c8ff", label: "ATTRIBUTE", desc: "GeoIP + ASN fingerprinting traces attacks to source with ISP-level precision" },
                { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>, color: "#ffc800", label: "REPORT", desc: "SHA-256 sealed PDF forensic reports for FIA Cybercrime Wing submission under PECA 2016" },
              ].map(c => (
                <div key={c.label} className="cyber-card" style={{ borderRadius: "8px", padding: "16px" }}>
                  <div style={{ marginBottom: "12px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2">{c.icon}</svg></div>
                  <div style={{ fontSize: ".875rem", fontWeight: 700, letterSpacing: ".05em", marginBottom: "8px", color: c.color }}>{c.label}</div>
                  <p style={{ fontSize: ".75rem", lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   LIVE MAP
══════════════════════════════════════════ */
const CITIES = [
  { n: "Karachi", lat: 24.8607, lng: 67.0011, c: "#ff3333", cnt: "5,423", t: "alert" },
  { n: "Lahore", lat: 31.5204, lng: 74.3587, c: "#ff3333", cnt: "1,802", t: "alert" },
  { n: "Islamabad", lat: 33.6844, lng: 73.0479, c: "#39FF14", cnt: "987", t: "active" },
  { n: "Quetta", lat: 30.1798, lng: 66.9750, c: "#39FF14", cnt: "412", t: "monitor" },
  { n: "Peshawar", lat: 34.0151, lng: 71.5249, c: "#39FF14", cnt: "653", t: "active" },
  { n: "Faisalabad", lat: 31.416, lng: 73.0911, c: "#39FF14", cnt: "541", t: "active" },
  { n: "Sukkur", lat: 27.7244, lng: 68.8571, c: "#ff3333", cnt: "778", t: "alert" },
  { n: "Hyderabad", lat: 25.396, lng: 68.3578, c: "#39FF14", cnt: "329", t: "active" },
];

function LiveMap() {
  const mapRef = useRef(null);
  const mapInited = useRef(false);

  useEffect(() => {
    if (mapInited.current) return;
    function initMap() {
      if (!window.L) return;
      mapInited.current = true;
      try {
        const map = window.L.map("threat-map", { center: [30.3753, 69.3451], zoom: 5, scrollWheelZoom: false, attributionControl: false, zoomControl: true });
        window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19 }).addTo(map);
        CITIES.forEach(city => {
          window.L.circleMarker([city.lat, city.lng], { radius: 16, color: city.c, fillColor: city.c, fillOpacity: 0, weight: 1, opacity: .3 }).addTo(map);
          window.L.circleMarker([city.lat, city.lng], { radius: 6, color: city.c, fillColor: city.c, fillOpacity: .9, weight: 2 }).addTo(map)
            .bindPopup(`<div style="font-family:'Rajdhani',sans-serif;background:#050a05;border:1px solid ${city.c};padding:12px 16px;border-radius:8px;min-width:155px;"><div style="color:${city.c};font-weight:700;font-size:14px;margin-bottom:4px;">${city.n}</div><div style="color:rgba(255,255,255,.7);font-size:12px;">${city.cnt} threats blocked</div><div style="margin-top:6px;font-size:11px;font-weight:700;color:${city.c};">${city.t === "alert" ? "HIGH ALERT" : city.t === "active" ? "ACTIVE" : "MONITORING"}</div></div>`);
        });
      } catch (e) { console.warn("Map:", e); }
    }
    if (window.L) { initMap(); return; }
    const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link);
    const script = document.createElement("script"); script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; script.onload = initMap; document.head.appendChild(script);
  }, []);

  return (
    <section id="live-map" style={{ padding: "clamp(64px,6vw,80px) clamp(16px,4vw,24px)", background: "rgba(0,0,0,.3)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <FadeUp>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <span className="pulse-dot-red"></span>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", color: "#39FF14", fontSize: "clamp(.62rem,1.8vw,.82rem)", letterSpacing: ".14em" }}>LIVE THREAT MAP — PAKISTAN</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(57,255,20,.18)", marginLeft: "6px", minWidth: "16px" }}></div>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", color: "rgba(255,255,255,.35)", fontSize: ".68rem" }}>FEED ACTIVE</span>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
            <div style={{ gridColumn: "span 2" }}>
              <div id="threat-map" ref={mapRef} style={{ height: "420px", border: "1px solid rgba(57,255,20,.2)", borderRadius: "8px", overflow: "hidden" }}></div>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "14px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span className="pulse-dot"></span><span style={{ fontSize: ".75rem", letterSpacing: ".05em", color: "rgba(255,255,255,.6)" }}>Active Node</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span className="pulse-dot-red"></span><span style={{ fontSize: ".75rem", letterSpacing: ".05em", color: "rgba(255,255,255,.6)" }}>High Alert</span></div>
              </div>
            </div>
            <div className="cyber-card" style={{ borderRadius: "8px", overflow: "hidden", maxHeight: "480px" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(57,255,20,.15)" }}><span style={{ fontSize: ".875rem", fontWeight: 700, letterSpacing: ".1em", color: "#39FF14" }}>NODE STATUS</span></div>
              <div style={{ overflowY: "auto", maxHeight: "400px" }}>
                {CITIES.map((city, i) => (
                  <div key={city.n} className="city-item" style={{ padding: "14px 18px", borderBottom: i === CITIES.length - 1 ? "none" : undefined }}>
                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: ".9rem", marginBottom: "3px" }}>{city.n}</div>
                        <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)" }}>{city.cnt} threats blocked</div>
                      </div>
                      {city.t === "alert" && <span className="feature-badge" style={{ background: "rgba(255,51,51,.15)", color: "#ff4444" }}>HIGH ALERT</span>}
                      {city.t === "active" && <span className="feature-badge badge-realtime">ACTIVE</span>}
                      {city.t === "monitor" && <span className="feature-badge" style={{ background: "rgba(57,255,20,.1)", color: "#39FF14" }}>MONITORING</span>}
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

/* ══════════════════════════════════════════
   FEATURES
══════════════════════════════════════════ */
const FEATURES = [
  { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, color: "#39FF14", badge: "badge-passive", badgeLabel: "PASSIVE DEFENSE", title: "Honeypot Intelligence", desc: "Cowrie SSH and Dionaea malware honeypots lure attackers — silently capturing credentials, malware binaries, and C2 callbacks before they reach production infrastructure." },
  { icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>, color: "#00ff88", badge: "badge-realtime", badgeLabel: "REAL-TIME", title: "Scapy Packet Analytics", desc: "Live packet capture engine extracts 30 network-layer features per flow — detecting DDoS amplification, botnet beaconing, and port sweeps with sub-second latency." },
  { icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>, color: "#39FF14", badge: "badge-ai", badgeLabel: "AI-POWERED", title: "XGBoost ML Classifier", desc: "Model trained on CIC-IDS-2017 achieves 99%+ accuracy across 15 attack vectors including SSH Brute Force, DDoS, SQL Injection, Port Scan, and Malware Upload." },
  { icon: <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>, color: "#ff4444", badge: "badge-auto", badgeLabel: "AUTO-RESPONSE", title: "Automated Kill Function", desc: "Dynamic iptables firewall rules auto-pushed within 340ms — blocking attacker IPs at network perimeter before lateral movement occurs. Rollback safeguards included." },
  { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, color: "#00c8ff", badge: "badge-forensics", badgeLabel: "FORENSICS", title: "GeoIP Attribution Engine", desc: "ASN data, ISP identity, and geolocation correlate across events — building an evolving threat actor map of Pakistan's digital attack surface session by session." },
  { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>, color: "#ffc800", badge: "badge-legal", badgeLabel: "LEGAL EVIDENCE", title: "Forensic PDF Reports", desc: "Court-admissible case reports auto-generated per incident — SHA-256 sealed, XGBoost confidence scores, full firewall action history, formatted for FIA submission under PECA 2016." },
];

function Features() {
  return (
    <section id="features" className="scanline-bg" style={{ padding: "clamp(64px,8vw,96px) clamp(16px,4vw,24px)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-tag" style={{ marginBottom: "16px" }}>// SYSTEM.CAPABILITIES</div>
            <h2 style={{ fontWeight: 700, lineHeight: 1.2, fontSize: "clamp(1.6rem,4vw,2.8rem)" }}>How <span className="neon-gradient">Neural-Trace</span> Works</h2>
            <p style={{ marginTop: "16px", maxWidth: "36rem", margin: "16px auto 0", color: "rgba(255,255,255,.55)", fontSize: ".95rem" }}>Six interconnected modules form an unbreakable chain of detection, response, and attribution.</p>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px 20px" }}>
          {FEATURES.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.05}>
              <div className="cyber-card" style={{ borderRadius: "12px", padding: "clamp(20px,3vw,24px)", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "18px" }}>
                  <div style={{ padding: "8px", borderRadius: "10px", background: `rgba(${f.color === "#39FF14" ? "57,255,20" : f.color === "#00ff88" ? "0,255,136" : f.color === "#ff4444" ? "255,51,51" : f.color === "#00c8ff" ? "0,200,255" : "255,200,0"},.08)` }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2">{f.icon}</svg>
                  </div>
                  <span className={`feature-badge ${f.badge}`}>{f.badgeLabel}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,2vw,1.125rem)", letterSpacing: ".025em", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: ".875rem", lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PIPELINE
══════════════════════════════════════════ */
const PIPELINE_STEPS = [
  { icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>, color: "#39FF14", label: "CAPTURE", desc: "Scapy sniffs live flows" },
  { icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>, color: "#00ff88", label: "EXTRACT", desc: "30 flow features" },
  { icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>, color: "#39FF14", label: "CLASSIFY", desc: "XGBoost ML label" },
  { icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>, color: "#ff4444", label: "KILL", desc: "Firewall auto-pushed" },
  { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>, color: "#ffc800", label: "REPORT", desc: "PDF evidence generated" },
];

function Pipeline() {
  const ref = useRef(null);
  const [running, setRunning] = useState([false, false, false, false]);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        [0,1,2,3].forEach(i => setTimeout(() => setRunning(prev => { const n = [...prev]; n[i] = true; return n; }), i * 200));
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pipeline" style={{ padding: "clamp(64px,8vw,96px) clamp(16px,4vw,24px)", background: "rgba(0,0,0,.25)" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-tag" style={{ marginBottom: "16px" }}>// ATTACK.PIPELINE</div>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(1.5rem,4vw,2.6rem)" }}>From Packet to Evidence — <span className="neon-gradient">In Seconds</span></h2>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div ref={ref} className="pipeline-horizontal" style={{ display: "flex", alignItems: "center" }}>
            {PIPELINE_STEPS.map((step, i) => (
              <>
                <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "80px", flex: 1 }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", background: `rgba(${step.color === "#39FF14" ? "57,255,20" : step.color === "#00ff88" ? "0,255,136" : step.color === "#ff4444" ? "255,51,51" : "255,200,0"},.08)`, border: `1px solid rgba(${step.color === "#39FF14" ? "57,255,20" : step.color === "#00ff88" ? "0,255,136" : step.color === "#ff4444" ? "255,51,51" : "255,200,0"},.3)` }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2">{step.icon}</svg>
                  </div>
                  <div style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".12em", color: step.color, fontFamily: "'Share Tech Mono',monospace", marginBottom: "5px" }}>{step.label}</div>
                  <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.5)" }}>{step.desc}</div>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div key={`line${i}`} className={`pipeline-line mx-2 ${running[i] ? "running" : "paused"}`} style={{ margin: "0 8px" }}></div>
                )}
              </>
            ))}
          </div>
        </FadeUp>
        <p style={{ textAlign: "center", marginTop: "40px", color: "rgba(255,255,255,.4)", fontSize: ".88rem" }}>
          Average pipeline latency: <span style={{ color: "#39FF14", fontFamily: "'Share Tech Mono',monospace" }}>&lt; 340ms</span> from packet capture to firewall block
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ padding: "clamp(40px,6vw,64px) clamp(16px,4vw,48px)", background: "rgba(0,0,0,.5)", borderTop: "1px solid rgba(57,255,20,.1)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(32px,5vw,40px)", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <svg width="30" height="30" viewBox="0 0 160 160" fill="none">
                <circle cx="80" cy="80" r="78" fill="#0a1f2e" stroke="#39FF14" strokeWidth="2"/>
                <path d="M80 28L46 42v22c0 22 14.5 42.5 34 48 19.5-5.5 34-26 34-48V42L80 28z" fill="rgba(0,80,30,.5)" stroke="#39FF14" strokeWidth="2"/>
                <rect x="68" y="72" width="24" height="20" rx="3" fill="white" opacity=".92"/>
                <path d="M72 72v-8a8 8 0 0 1 16 0v8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <circle cx="80" cy="80" r="3" fill="#0a1f2e"/>
              </svg>
              <span style={{ color: "#39FF14", fontFamily: "'Rajdhani',sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: ".12em" }}>NEURAL-TRACE</span>
            </div>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".88rem", lineHeight: 1.7, marginBottom: "14px" }}>Protecting Pakistan's critical digital infrastructure through AI-driven threat intelligence, autonomous forensics, and real-time cyber defense.</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span className="pulse-dot"></span><span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: ".65rem", color: "rgba(57,255,20,.7)" }}>ALL SYSTEMS OPERATIONAL</span></div>
          </div>
          <div>
            <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", color: "rgba(255,255,255,.4)", marginBottom: "18px" }}>PLATFORM</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[["Our Mission","#mission"],["Platform Features","#features"],["Live Threat Map","#live-map"],["Detection Pipeline","#pipeline"]].map(([label, href]) => (
                <a key={label} href={href} style={{ color: "rgba(255,255,255,.6)", fontSize: ".88rem", textDecoration: "none", transition: "color .2s" }} onMouseOver={e => e.currentTarget.style.color="#39FF14"} onMouseOut={e => e.currentTarget.style.color="rgba(255,255,255,.6)"}>{label}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", color: "rgba(255,255,255,.4)", marginBottom: "18px" }}>SYSTEM LOG</div>
            <div style={{ borderRadius: "10px", padding: "14px", background: "#010801", border: "1px solid rgba(57,255,20,.15)", fontFamily: "'Share Tech Mono',monospace", fontSize: ".65rem", lineHeight: 1.9 }}>
              <div style={{ color: "#39FF14" }}>&gt; system.init() -- OK</div>
              <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; cowrie_honeypot: ACTIVE</div>
              <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; dionaea_trap: ACTIVE</div>
              <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; xgboost_classifier: v2.1.1</div>
              <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; nodes: KHI LHR ISB QTA PEW</div>
              <div style={{ color: "#ff4444" }}>&gt; alerts: HIGH SEVERITY ACTIVE</div>
              <div style={{ color: "rgba(57,255,20,.6)" }}>&gt; uptime: 99.97%</div>
              <div style={{ color: "#39FF14" }}>&gt; <span className="typing-cursor"></span></div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(57,255,20,.08)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <p style={{ color: "rgba(255,255,255,.28)", fontSize: ".75rem", textAlign: "center" }}>© 2026 Neural-Trace — Threat Intelligence & Digital Forensics. All rights reserved. Developed in Pakistan for Pakistan's cyber defense.</p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              ["Privacy Policy", "Privacy Policy\n\nNeural-Trace collects network packet metadata and honeypot logs solely for cybersecurity threat detection. No personal user data is sold or shared with third parties. All forensic evidence is stored securely and submitted only to authorized Pakistani law enforcement under PECA 2016. Data retention: 90 days unless required for legal proceedings.\n\n© 2026 Neural-Trace."],
              ["Terms of Service", "Terms of Service\n\nNeural-Trace is authorized for registered citizens, organizations, and government agencies in Pakistan.\n\n1. Comply with PECA 2016 at all times\n2. Do not attempt to circumvent platform security\n3. Use forensic reports only for legitimate law enforcement purposes\n4. Report vulnerabilities responsibly\n\nUnauthorized access is monitored and reported to FIA Cybercrime Wing.\n\n© 2026 Neural-Trace."],
              ["Security Disclosure", "Security Disclosure\n\nFound a vulnerability in Neural-Trace? Report it responsibly:\n\nContact: security@neuraltrace.pk\nResponse time: 48 hours\n\nWe follow responsible disclosure. Researchers who report valid vulnerabilities will be acknowledged.\n\n© 2026 Neural-Trace."],
            ].map(([label, msg]) => (
              <button key={label} onClick={() => alert(msg)} style={{ color: "rgba(255,255,255,.3)", fontSize: ".75rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", transition: "color .2s" }} onMouseOver={e => e.currentTarget.style.color="#39FF14"} onMouseOut={e => e.currentTarget.style.color="rgba(255,255,255,.3)"}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════ */
export default function NeuralTrace() {
  const [splashDone, setSplashDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const id = "neural-trace-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_STYLES;
      document.head.appendChild(style);
    }
    return () => {};
  }, []);

  return (
    <div style={{ background: "#050a05", minHeight: "100vh", fontFamily: "'Rajdhani',sans-serif" }}>
      <Splash onDone={() => setSplashDone(true)} />
      <LoginModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onOpenLogin={() => setModalOpen(true)} />
      <Hero onOpenLogin={() => setModalOpen(true)} started={splashDone} />
      <Mission />
      <LiveMap />
      <Features />
      <Pipeline />
      <Footer />
    </div>
  );
}


