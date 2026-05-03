import { useState, useMemo } from 'react';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY.png';

// Password rule checker
const rules = [
  { id: 'length',    label: 'At least 8 characters',          test: (p) => p.length >= 8 },
  { id: 'upper',     label: 'One uppercase letter (A–Z)',      test: (p) => /[A-Z]/.test(p) },
  { id: 'lower',     label: 'One lowercase letter (a–z)',      test: (p) => /[a-z]/.test(p) },
  { id: 'number',    label: 'One number (0–9)',                test: (p) => /[0-9]/.test(p) },
  { id: 'special',   label: 'One special character (!@#$…)',   test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#4ade80', '#4ade80'];

const CheckIcon = ({ pass }) => pass ? (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

function LoginPage({ isInitialLogin, onBack, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(isInitialLogin);
  const [role, setRole] = useState('User');
  const [formData, setFormData] = useState({ id: '', password: '', fullName: '', email: '', phone: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Compute which rules pass
  const ruleResults = useMemo(() => rules.map(r => ({ ...r, passed: r.test(formData.password) })), [formData.password]);
  const passedCount = ruleResults.filter(r => r.passed).length;

  // Confirm password state
  const confirmTouched = formData.confirmPassword.length > 0;
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleAuth = (e) => {
    e.preventDefault();

    // Block registration if password is weak or doesn't match
    if (!isLogin) {
      if (passedCount < rules.length) {
        alert('Please make sure your password meets all requirements.');
        return;
      }
      if (!passwordsMatch) {
        alert('Passwords do not match.');
        return;
      }
    }

    if (isLogin) {
      if (role === 'Admin') {
        onLoginSuccess('admin');
      } else {
        onLoginSuccess('dashboard');
      }
    } else {
      alert('Account Created Successfully!');
      setIsLogin(true);
      setFormData({ id: '', password: '', fullName: '', email: '', phone: '', confirmPassword: '' });
    }
  };

  const inputClass = "w-full bg-[#040a0f] border border-[#4ade80]/20 p-3 rounded-xl text-white outline-none focus:border-[#4ade80] transition-colors placeholder-gray-600";

  return (
    <div className="min-h-screen bg-[#040a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a141b] border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(74,222,128,0.1)]">

        <button
          onClick={onBack}
          className="text-[#4ade80]/50 hover:text-[#4ade80] text-xs mb-4 flex items-center gap-2 transition-colors"
        >
          ← Back to TIDF Home
        </button>

        <div className="flex flex-col items-center mb-6">
          <img src={cifaLogo} alt="CIFA Logo" className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(74,222,128,0.2)] mb-4" />

          <div className="flex gap-8 border-b border-[#4ade80]/20 w-full justify-center mb-6">
            {['Login', 'Register'].map((tab) => {
              const active = tab === 'Login' ? isLogin : !isLogin;
              return (
                <button
                  key={tab}
                  onClick={() => setIsLogin(tab === 'Login')}
                  className={`pb-2 px-4 transition-all ${active ? 'border-b-2 border-[#4ade80] text-[#4ade80] font-bold' : 'text-gray-500 hover:text-gray-400'}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isLogin ? (
            <>
              <div className="flex flex-col">
                <label className="text-xs text-[#4ade80] font-bold mb-1 ml-1">Account Type</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputClass + " cursor-pointer"}
                >
                  <option value="User">Citizen</option>
                  <option value="Admin">Organization Admin</option>
                </select>
              </div>
              <input
                type="text"
                required
                placeholder={role === 'Admin' ? 'Organization ID / Email' : 'Username / Email'}
                className={inputClass}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              />
            </>
          ) : (
            <>
              <input type="text" required placeholder="Full Name" className={inputClass}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              <input type="email" required placeholder="Email Address" className={inputClass}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type="tel" required placeholder="Phone Number" className={inputClass}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </>
          )}

          {/* ── PASSWORD FIELD ── */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              value={formData.password}
              className={inputClass + " pr-10"}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4ade80] transition-colors"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          {/* ── PASSWORD STRENGTH (register only) ── */}
          {!isLogin && formData.password.length > 0 && (
            <div className="bg-[#060e13] border border-white/8 rounded-xl p-4 space-y-3">
              {/* Strength bar */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] text-gray-500 font-mono tracking-wider">PASSWORD STRENGTH</span>
                  <span className="text-[11px] font-bold" style={{ color: strengthColor[passedCount] }}>
                    {strengthLabel[passedCount]}
                  </span>
                </div>
                <div className="flex gap-1">
                  {rules.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{ background: i < passedCount ? strengthColor[passedCount] : '#1e2d27' }}
                    />
                  ))}
                </div>
              </div>

              {/* Rule checklist */}
              <div className="space-y-1.5">
                {ruleResults.map(({ id, label, passed }) => (
                  <div key={id} className="flex items-center gap-2">
                    <CheckIcon pass={passed} />
                    <span className={`text-xs transition-colors ${passed ? 'text-[#4ade80]' : 'text-gray-500'}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CONFIRM PASSWORD (register only) ── */}
          {!isLogin && (
            <div className="space-y-1">
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  className={`${inputClass} pr-10 ${
                    confirmTouched
                      ? passwordsMatch
                        ? 'border-[#4ade80]/60'
                        : 'border-red-500/60'
                      : ''
                  }`}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4ade80] transition-colors"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>

              {/* Match feedback */}
              {confirmTouched && (
                <div className={`flex items-center gap-1.5 text-xs font-medium px-1 ${passwordsMatch ? 'text-[#4ade80]' : 'text-red-400'}`}>
                  {passwordsMatch ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Passwords match
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Passwords do not match
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#4ade80] hover:bg-[#3bca6b] text-black font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(74,222,128,0.2)] transition-all active:scale-95 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isLogin && (!passwordsMatch || passedCount < rules.length)}
          >
            {isLogin ? 'Authenticate & Sign In' : 'Create Account / Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(v => !v);
              setFormData({ id: '', password: '', fullName: '', email: '', phone: '', confirmPassword: '' });
            }}
            className="text-[#4ade80]/60 text-sm hover:text-[#4ade80] transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up here" : 'Already have an account? Login here'}
          </button>
        </div>

        <p className="mt-6 text-center text-gray-500 text-xs font-mono">
          SYSTEM STATUS: <span className="text-[#4ade80]">ACTIVE</span> | TIDF
        </p>
      </div>
    </div>
  );
}

export default LoginPage;