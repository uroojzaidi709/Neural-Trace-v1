import React from 'react';
import cifaLogo from './assets/CYBER INTELLIGENCE AND FORENSIC AGENCY (1).png';

const UserDashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-[#06141d] font-sans pb-12 text-slate-300">
      
      {/* Top Banner */}
      <div className="bg-[#0b1e29] border-b border-cyan-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          
          <div className="flex items-center space-x-4">
            <img 
              src={cifaLogo} 
              alt="CIFA Logo" 
              className="h-14 w-14 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
            />
            <div>
              <h2 className="text-xl font-bold text-cyan-400 leading-tight tracking-tight">CIFA</h2>
              <p className="text-[15px] text-cyan-500/60 uppercase font-semibold tracking-widest">
                Cyber Intelligence & Forensic Agency
              </p>
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="text-sm font-bold text-cyan-500 hover:text-red-400 px-4 py-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 px-4">
        {/* Form Title Card */}
        <div className="bg-[#0b1e29] border-t-4 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)] p-6 mb-1 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Scam Report Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Submit forensic data for Karachi Unit analysis. Fields with <span className="text-red-400">*</span> are mandatory.</p>
        </div>

        {/* Main Form Section */}
        <form className="bg-[#0b1e29] shadow-2xl p-8 rounded-b-lg border border-cyan-500/10 space-y-8">
          
          {/* Scam Category Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-cyan-500/80 mb-2 uppercase tracking-wider">Scam Category <span className="text-red-400">*</span></label>
            <select className="bg-[#06141d] border border-cyan-500/20 rounded-xl p-3 text-white focus:border-cyan-400 outline-none cursor-pointer transition">
              <option className="bg-[#0b1e29]">Select Category</option>
              <option className="bg-[#0b1e29]">Bank / OTP Scam</option>
              <option className="bg-[#0b1e29]">Lottery / BISP Fraud</option>
              <option className="bg-[#0b1e29]">Phishing Email</option>
              <option className="bg-[#0b1e29]">Other Cyber Crime</option>
            </select>
          </div>

          {/* Message Content Area */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-cyan-500/80 mb-2 uppercase tracking-wider">Message Content <span className="text-red-400">*</span></label>
            <textarea 
              placeholder="Paste the scam message, email headers, or link details here..." 
              className="bg-[#06141d] border border-cyan-500/20 rounded-xl p-4 h-48 text-white focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Evidence Upload Section */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-cyan-500/80 mb-2 uppercase tracking-wider">Evidence Upload (Optional)</label>
            <div className="relative group">
              <input 
                type="file" 
                className="hidden" 
                id="evidence-upload"
                accept="image/*,.pdf,.doc"
              />
              <label 
                htmlFor="evidence-upload"
                className="flex flex-col items-center justify-center w-full border-2 border-dashed border-cyan-500/20 rounded-xl p-6 bg-[#06141d] hover:border-cyan-400/50 hover:bg-[#0b1e29] cursor-pointer transition-all group"
              >
                <span className="text-cyan-500/60 group-hover:text-cyan-400 text-sm mb-1 font-semibold">Click to upload screenshot or document</span>
                <span className="text-[10px] text-slate-500 italic">PNG, JPG, or PDF (Max 5MB)</span>
              </label>
            </div>
          </div>

          {/* Contact Info (Optional) */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-cyan-500/80 mb-2 uppercase tracking-wider">Contact Info (Optional)</label>
            <input 
              type="text" 
              placeholder="Phone number or Email for follow-up" 
              className="bg-[#06141d] border border-cyan-500/20 rounded-xl p-3 text-white focus:border-cyan-400 outline-none transition" 
            />
          </div>

          {/* Affirmation Checkbox */}
          <div className="flex items-start pt-2">
            <input type="checkbox" className="mt-1 h-4 w-4 bg-[#06141d] border-cyan-500/40 rounded text-cyan-500 focus:ring-cyan-500 cursor-pointer" />
            <label className="ml-3 text-sm font-medium text-slate-400 leading-relaxed">
              I affirm that the data provided is accurate for forensic investigation purposes.
            </label>
          </div>

          {/* Glowing Submit Button */}
          <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all active:scale-95 text-lg uppercase tracking-[0.2em]"
            >
              Initiate Trace
            </button>
          </div>
        </form>
        
        <p className="mt-12 text-center text-cyan-500/40 text-[12px] uppercase font-black tracking-[0.3em]">
          Cyber Intelligence Forensic Agency | KARACHI UNIT | SECURE SESSION
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;