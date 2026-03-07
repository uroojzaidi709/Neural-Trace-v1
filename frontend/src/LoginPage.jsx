import { useState } from 'react';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY (1).png';

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
      if (role === 'Admin') {
        // We will create the admin case in App.jsx next
        onLoginSuccess('admin'); 
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
    <div className="min-h-screen bg-[#06141d] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0b1e29] border-2 border-cyan-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        
        <button 
          onClick={onBack} 
          className="text-cyan-500/50 hover:text-cyan-400 text-xs mb-4 flex items-center gap-2 transition-colors"
        >
          ← Back to CIFA Home
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="mb-4">
            <img 
              src={cifaLogo} 
              alt="CIFA Logo" 
              className="w-24 h-24 object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            />
          </div>
          
          <div className="flex gap-8 border-b border-cyan-900/50 w-full justify-center mb-6">
            <button 
              onClick={() => setIsLogin(true)}
              className={`pb-2 px-4 transition-all ${isLogin ? 'border-b-2 border-cyan-400 text-cyan-400 font-bold' : 'text-slate-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`pb-2 px-4 transition-all ${!isLogin ? 'border-b-2 border-cyan-400 text-cyan-400 font-bold' : 'text-slate-500'}`}
            >
              Register
            </button>
          </div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isLogin ? (
            <>
              <div className="flex flex-col">
                <label className="text-xs text-cyan-500 font-bold mb-1 ml-1">Account Type</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#06141d] border border-cyan-500/20 p-3 rounded-xl text-white outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="User">Standard User</option>
                  <option value="Admin">Agency Admin</option>
                </select>
              </div>

              <input 
                type="text" 
                required
                placeholder={role === 'Admin' ? "Agency ID" : "Username / Email"}
                className="w-full bg-[#06141d] border border-cyan-500/20 p-3 rounded-xl text-white outline-none focus:border-cyan-400"
                onChange={(e) => setFormData({...formData, id: e.target.value})}
              />
            </>
          ) : (
            <>
              <input 
                type="text" 
                required
                placeholder="Full Name"
                className="w-full bg-[#06141d] border border-cyan-500/20 p-3 rounded-xl text-white outline-none focus:border-cyan-400"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <input 
                type="email" 
                required
                placeholder="Email Address"
                className="w-full bg-[#06141d] border border-cyan-500/20 p-3 rounded-xl text-white outline-none focus:border-cyan-400"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="tel" 
                required
                placeholder="Phone Number"
                className="w-full bg-[#06141d] border border-cyan-500/20 p-3 rounded-xl text-white outline-none focus:border-cyan-400"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </>
          )}

          <input 
            type="password" 
            required
            placeholder="Password"
            className="w-full bg-[#06141d] border border-cyan-500/20 p-3 rounded-xl text-white outline-none focus:border-cyan-400"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          {!isLogin && (
            <input 
              type="password" 
              required
              placeholder="Confirm Password"
              className="w-full bg-[#06141d] border border-cyan-500/20 p-3 rounded-xl text-white outline-none focus:border-cyan-400"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          )}

          <button 
            type="submit" 
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-900/40 transition-all active:scale-95 mt-2"
          >
            {isLogin ? 'Authenticate & Sign In' : 'Create Account / Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyan-500/60 text-sm hover:text-cyan-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up here" : "Already have an account? Login here"}
          </button>
        </div>

        <p className="mt-6 text-center text-cyan-400 text-s italic">
          Cyber Intelligence and Forensic Agency | Karachi Unit
        </p>
      </div>
    </div>
  );
}

export default LoginPage;