import { useState } from 'react';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY.png';

// 1. Add 'onLoginSuccess' to the props
function LoginPage({ isInitialLogin, onBack, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(isInitialLogin); 
  const [role, setRole] = useState('User'); 
  const [formData, setFormData] = useState({ id: '', password: '', fullName: '', email: '', phone: '', confirmPassword: '' });

  const handleAuth = (e) => {
    e.preventDefault();
    console.log(`${isLogin ? "Logging in" : "Registering"} as ${role}:`, formData);

    // 2. Logic to redirect after "Auth"
    if (isLogin) {
      if (role === 'Organization') {
        // We will create the admin case in App.jsx next
        onLoginSuccess('Organization'); 
      } else {
        onLoginSuccess('dashboard'); // Takes standard users to the FIA form
      }
    } else {
      // If they just registered, maybe take them back to login or straight to dashboard
      alert("Account Created Successfully!");
      setIsLogin(true);
    }
  };

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
          <div className="mb-4">
            <img 
              src={cifaLogo} 
              alt="CIFA Logo" 
              className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]"
            />
          </div>
          
          <div className="flex gap-8 border-b border-[#4ade80]/20 w-full justify-center mb-6">
            <button 
              onClick={() => setIsLogin(true)}
              className={`pb-2 px-4 transition-all ${isLogin ? 'border-b-2 border-[#4ade80] text-[#4ade80] font-bold' : 'text-gray-500 hover:text-gray-400'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`pb-2 px-4 transition-all ${!isLogin ? 'border-b-2 border-[#4ade80] text-[#4ade80] font-bold' : 'text-gray-500 hover:text-gray-400'}`}
            >
              Register
            </button>
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
                  className="w-full bg-[#040a0f] border border-[#4ade80]/20 p-3 rounded-xl text-white outline-none focus:border-[#4ade80] cursor-pointer selection:bg-[#4ade80]/20"
                >
                  <option value="User">Citizen</option>
                  <option value="Admin">Organization Admin</option>
                </select>
              </div>

              <input 
                type="text" 
                required
                placeholder={role === 'Organization' ? "Organization ID" : "Username / Email"}
                className="w-full bg-[#040a0f] border border-[#4ade80]/20 p-3 rounded-xl text-white outline-none focus:border-[#4ade80]"
                onChange={(e) => setFormData({...formData, id: e.target.value})}
              />
            </>
          ) : (
            <>
              <input 
                type="text" 
                required
                placeholder="Full Name"
                className="w-full bg-[#040a0f] border border-[#4ade80]/20 p-3 rounded-xl text-white outline-none focus:border-[#4ade80]"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <input 
                type="email" 
                required
                placeholder="Email Address"
                className="w-full bg-[#040a0f] border border-[#4ade80]/20 p-3 rounded-xl text-white outline-none focus:border-[#4ade80]"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="tel" 
                required
                placeholder="Phone Number"
                className="w-full bg-[#040a0f] border border-[#4ade80]/20 p-3 rounded-xl text-white outline-none focus:border-[#4ade80]"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </>
          )}

          <input 
            type="password" 
            required
            placeholder="Password"
            className="w-full bg-[#040a0f] border border-[#4ade80]/20 p-3 rounded-xl text-white outline-none focus:border-[#4ade80]"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          {!isLogin && (
            <input 
              type="password" 
              required
              placeholder="Confirm Password"
              className="w-full bg-[#040a0f] border border-[#4ade80]/20 p-3 rounded-xl text-white outline-none focus:border-[#4ade80]"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          )}

          <button 
            type="submit" 
            className="w-full bg-[#4ade80] hover:bg-[#3bca6b] text-black font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(74,222,128,0.2)] transition-all active:scale-95 mt-2"
          >
            {isLogin ? 'Authenticate & Sign In' : 'Create Account / Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#4ade80]/60 text-sm hover:text-[#4ade80] transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up here" : "Already have an account? Login here"}
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