import { useState, useMemo } from 'react';
import { loginUser, registerUser } from './api';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY.png';

// ── Neon green colour token — matches the vivid #39FF14 in the UI ──
const NEON = '#39FF14';

const rules = [
  { id: 'length',  label: 'At least 8 characters',        test: (p) => p.length >= 8 },
  { id: 'upper',   label: 'One uppercase letter (A–Z)',    test: (p) => /[A-Z]/.test(p) },
  { id: 'lower',   label: 'One lowercase letter (a–z)',    test: (p) => /[a-z]/.test(p) },
  { id: 'number',  label: 'One number (0–9)',              test: (p) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (!@#$…)', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
const strengthColor = ['', '#ef4444', '#f97316', '#eab308', NEON, NEON];

const CheckIcon = ({ pass }) => pass ? (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={NEON} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
) : (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

function LoginPage({ isInitialLogin, onBack, onLoginSuccess }) {
  const [isLogin, setIsLogin]           = useState(isInitialLogin);
  const [loginRole, setLoginRole]       = useState('User');
  const [registerRole, setRegisterRole] = useState('citizen');
  const [formData, setFormData]         = useState({
    id: '', password: '', fullName: '',
    email: '', phone: '', confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const ruleResults    = useMemo(() => rules.map(r => ({ ...r, passed: r.test(formData.password) })), [formData.password]);
  const passedCount    = ruleResults.filter(r => r.passed).length;
  const confirmTouched = formData.confirmPassword.length > 0;
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isLogin) {
        if (passedCount < rules.length) { setError('Password does not meet all requirements.'); setLoading(false); return; }
        if (!passwordsMatch)            { setError('Passwords do not match.');                  setLoading(false); return; }

        const result = await registerUser(formData.fullName, formData.email, formData.password, registerRole);
        if (result.user_id) {
          alert('Account Created Successfully! Please login.');
          setIsLogin(true);
          setFormData({ id: '', password: '', fullName: '', email: '', phone: '', confirmPassword: '' });
        } else {
          setError(result.detail || 'Registration failed. Try again.');
        }

      } else {
        const result = await loginUser(formData.id, formData.password);
        if (result.access_token) {
          localStorage.setItem('token',     result.access_token);
          localStorage.setItem('role',      result.role);
          localStorage.setItem('full_name', result.full_name);
          onLoginSuccess(result.role === 'citizen' ? 'dashboard' : 'admin');
        } else {
          setError(result.detail || 'Invalid email or password.');
        }
      }
    } catch {
      setError('Connection failed. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // ── Base input style using inline styles so the neon token is applied directly ──
  const inputStyle = {
    width: '100%',
    background: '#040a0f',
    border: `1px solid rgba(57,255,20,0.25)`,
    padding: '12px 14px',
    borderRadius: '12px',
    color: '#fff',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '13px',
    transition: 'border-color .2s, box-shadow .2s',
  };
  const inputFocusStyle = { borderColor: NEON, boxShadow: `0 0 8px rgba(57,255,20,0.25)` };

  // Tailwind classes still used for layout utilities; colour overrides via style prop
  const inputClass = "w-full p-3 rounded-xl text-white outline-none transition-colors placeholder-gray-600";

  return (
    <div style={{ minHeight: '100vh', background: '#040a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>

      {/* ── Keyframe animations injected once ── */}
      <style>{`
        @keyframes ntGlow { 0%,100%{box-shadow:0 0 18px rgba(57,255,20,0.35)} 50%{box-shadow:0 0 38px rgba(57,255,20,0.70)} }
        @keyframes ntPulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .nt-input:focus { border-color:${NEON} !important; box-shadow:0 0 10px rgba(57,255,20,0.30) !important; }
        .nt-input::placeholder { color:#4b5563; }
        .nt-input option { background:#040a0f; color:#fff; }
        .nt-back:hover  { color:${NEON} !important; }
        .nt-tab-active  { border-bottom:2px solid ${NEON}; color:${NEON}; font-weight:700; }
        .nt-tab-inactive{ color:#6b7280; }
        .nt-tab-inactive:hover { color:#9ca3af; }
        .nt-submit:hover:not(:disabled) { background:#2ee60e !important; box-shadow:0 0 28px rgba(57,255,20,0.55) !important; transform:translateY(-1px); }
        .nt-submit:active:not(:disabled){ transform:scale(0.97); }
        .nt-toggle:hover { color:${NEON} !important; }
      `}</style>

      <div style={{
        width: '100%', maxWidth: '440px',
        background: '#0a141b',
        border: `1px solid rgba(57,255,20,0.18)`,
        padding: '32px',
        borderRadius: '28px',
        boxShadow: '0 0 60px rgba(57,255,20,0.15)',
        animation: 'ntGlow 4s ease-in-out infinite',
      }}>

        {/* ── BACK BUTTON ── */}
        <button onClick={onBack} className="nt-back" style={{
          color: `rgba(57,255,20,0.5)`, background: 'none', border: 'none',
          fontSize: '11px', cursor: 'pointer', marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .2s',
          fontFamily: 'monospace', letterSpacing: '1px',
        }}>
          ← BACK TO NEURAL-TRACE HOME
        </button>

        {/* ── LOGO ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            border: `2px solid ${NEON}`,
            boxShadow: `0 0 24px rgba(57,255,20,0.5), inset 0 0 16px rgba(57,255,20,0.1)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px', overflow: 'hidden',
            animation: 'ntGlow 3s ease-in-out infinite',
          }}>
            <img src={cifaLogo} alt="Logo" style={{ width: '68px', height: '68px', objectFit: 'contain' }} />
          </div>

          {/* ── TABS ── */}
          <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid rgba(57,255,20,0.20)`, width: '100%', justifyContent: 'center', marginBottom: '8px' }}>
            {['Login', 'Register'].map((tab) => {
              const active = tab === 'Login' ? isLogin : !isLogin;
              return (
                <button key={tab}
                  onClick={() => { setIsLogin(tab === 'Login'); setError(''); }}
                  className={active ? 'nt-tab-active' : 'nt-tab-inactive'}
                  style={{
                    paddingBottom: '10px', paddingLeft: '16px', paddingRight: '16px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '14px', transition: 'all .2s',
                    borderBottom: active ? `2px solid ${NEON}` : '2px solid transparent',
                    color: active ? NEON : '#6b7280',
                    fontWeight: active ? '700' : '400',
                    letterSpacing: '0.5px',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div style={{
            marginBottom: '16px', padding: '12px 14px',
            background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.30)',
            borderRadius: '12px', color: '#f87171', fontSize: '12px', textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* ── LOGIN FIELDS ── */}
          {isLogin ? (
            <>
              <div>
                <label style={{ fontSize: '10px', color: NEON, fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Account Type
                </label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  className="nt-input"
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="User">Citizen</option>
                  <option value="Admin">Organization Admin</option>
                </select>
              </div>
              <input
                type="text" required
                placeholder={loginRole === 'Admin' ? 'Organization ID / Email' : 'Email Address'}
                value={formData.id}
                className="nt-input"
                style={inputStyle}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              />
            </>
          ) : (
            /* ── REGISTER FIELDS ── */
            <>
              <div>
                <label style={{ fontSize: '10px', color: NEON, fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Register As
                </label>
                <select
                  value={registerRole}
                  onChange={(e) => setRegisterRole(e.target.value)}
                  className="nt-input"
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="citizen">👤 Citizen (Free)</option>
                  <option value="company">🏢 Organization / Corporate</option>
                </select>
              </div>

              {/* Role description */}
              <div style={{
                fontSize: '11px', padding: '10px 12px', borderRadius: '10px',
                background: registerRole === 'citizen' ? 'rgba(57,255,20,0.05)' : 'rgba(59,130,246,0.05)',
                border: `1px solid ${registerRole === 'citizen' ? 'rgba(57,255,20,0.22)' : 'rgba(59,130,246,0.22)'}`,
                color: registerRole === 'citizen' ? NEON : '#60a5fa',
              }}>
                {registerRole === 'citizen'
                  ? '✓ Access: Live Map, General Alerts, IP Lookup'
                  : '✓ Access: Full Dashboard, Threat Feeds, Forensic Vault, IP Lookup'}
              </div>

              <input type="text"  required placeholder="Full Name"     className="nt-input" style={inputStyle} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              <input type="email" required placeholder="Email Address" className="nt-input" style={inputStyle} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type="tel"   required placeholder="Phone Number"  className="nt-input" style={inputStyle} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </>
          )}

          {/* ── PASSWORD ── */}
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required placeholder="Password"
              value={formData.password}
              className="nt-input"
              style={{ ...inputStyle, paddingRight: '44px' }}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPassword(v => !v)} style={{
              position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#6b7280', transition: 'color .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = NEON}
              onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          {/* ── PASSWORD STRENGTH ── */}
          {!isLogin && formData.password.length > 0 && (
            <div style={{
              background: '#060e13', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px', padding: '16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '9px', color: '#6b7280', fontFamily: 'monospace', letterSpacing: '2px' }}>PASSWORD STRENGTH</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: strengthColor[passedCount] }}>{strengthLabel[passedCount]}</span>
              </div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {rules.map((_, i) => (
                  <div key={i} style={{
                    height: '4px', flex: 1, borderRadius: '99px', transition: 'background .3s',
                    background: i < passedCount ? strengthColor[passedCount] : '#1e2d27',
                    boxShadow: i < passedCount ? `0 0 6px ${strengthColor[passedCount]}88` : 'none',
                  }} />
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {ruleResults.map(({ id, label, passed }) => (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckIcon pass={passed} />
                    <span style={{ fontSize: '11px', color: passed ? NEON : '#6b7280', transition: 'color .2s' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CONFIRM PASSWORD ── */}
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  className="nt-input"
                  style={{
                    ...inputStyle, paddingRight: '44px',
                    ...(confirmTouched ? { borderColor: passwordsMatch ? `rgba(57,255,20,0.6)` : 'rgba(239,68,68,0.6)' } : {}),
                  }}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', transition: 'color .2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = NEON}
                  onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {confirmTouched && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '600', paddingLeft: '4px', color: passwordsMatch ? NEON : '#f87171' }}>
                  {passwordsMatch ? (
                    <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Passwords match</>
                  ) : (
                    <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> Passwords do not match</>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── SUBMIT ── */}
          <button
            type="submit"
            disabled={loading || (!isLogin && (!passwordsMatch || passedCount < rules.length))}
            className="nt-submit"
            style={{
              width: '100%',
              background: NEON,
              color: '#000',
              fontWeight: '800',
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: `0 0 20px rgba(57,255,20,0.40)`,
              transition: 'all .2s',
              opacity: (loading || (!isLogin && (!passwordsMatch || passedCount < rules.length))) ? 0.5 : 1,
              marginTop: '4px',
            }}
          >
            {loading ? 'Please wait...' : isLogin ? 'Authenticate & Sign In' : 'Create Account / Sign Up'}
          </button>
        </form>

        {/* ── SWITCH MODE ── */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button
            onClick={() => { setIsLogin(v => !v); setError(''); setFormData({ id: '', password: '', fullName: '', email: '', phone: '', confirmPassword: '' }); }}
            className="nt-toggle"
            style={{ background: 'none', border: 'none', color: `rgba(57,255,20,0.55)`, fontSize: '13px', cursor: 'pointer', transition: 'color .2s' }}
          >
            {isLogin ? "Don't have an account? Sign up here" : 'Already have an account? Login here'}
          </button>
        </div>

        {/* ── FOOTER ── */}
        <p style={{ marginTop: '24px', textAlign: 'center', color: '#6b7280', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '1px' }}>
          SYSTEM STATUS: <span style={{ color: NEON, textShadow: `0 0 8px rgba(57,255,20,0.6)` }}>ACTIVE</span> | Neural-Trace
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

