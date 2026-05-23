// src/components/Sidebar.jsx
import React from 'react';

export default function Sidebar({ 
  currentView, 
  onViewChange, 
  compactMode, 
  setCompactMode, 
  showDebugText, 
  setShowDebugText 
}) {
  return (
    <div className="w-64 bg-[#0d0f17]/60 backdrop-blur-2xl h-screen fixed left-0 top-0 border-r border-white/10 flex flex-col justify-between p-5 select-none z-40 shadow-xl">
      <div className="flex flex-col gap-8">
        
        {/* Logo Banner */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex justify-center items-center font-['IBM_Plex_Mono'] font-bold text-white text-sm shadow-md shadow-purple-500/30">
            TF
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            TaskFlow<span className="text-purple-500 font-black">.</span>
          </span>
        </div>

        {/* Links Navigation Stack */}
        <div className="flex flex-col gap-1.5">
          <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold text-slate-500 tracking-widest uppercase px-3 mb-2">
            Workspace Navigation
          </div>

          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'calendar', label: 'Calendar', icon: '📅' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map((item) => (
            <button 
              key={item.id}
              type="button"
              onClick={() => onViewChange && onViewChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-all duration-200 w-full ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-purple-400 border border-purple-500/30 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-sm">{item.icon}</span> {item.label}
            </button>
          ))}
        </div>

        {/* Toggle Switches Panel */}
        <div className="flex flex-col gap-2 pt-5 border-t border-white/10">
          <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold text-slate-500 tracking-widest uppercase px-3 mb-1">
            Engine Configuration
          </div>
          
          <label className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-white/5 cursor-pointer select-none">
            <span>Compact Mode</span>
            <input 
              type="checkbox" 
              checked={compactMode} 
              onChange={(e) => setCompactMode(e.target.checked)}
              className="accent-purple-500 rounded bg-slate-900 border-white/10" 
            />
          </label>

          <label className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-white/5 cursor-pointer select-none">
            <span>Debug Overlay</span>
            <input 
              type="checkbox" 
              checked={showDebugText} 
              onChange={(e) => setShowDebugText(e.target.checked)}
              className="accent-purple-500 rounded bg-slate-900 border-white/10" 
            />
          </label>
        </div>
      </div>

      {/* Profile Card Footer Component */}
      <div className="bg-[#161925]/60 border border-white/10 p-3.5 rounded-2xl flex items-center gap-3 shadow-lg">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex justify-center items-center text-xs font-bold font-['IBM_Plex_Mono'] shadow-md">
          CS
        </div>
        <div className="overflow-hidden">
          <h4 className="text-xs font-bold text-white truncate">Chandini Siri</h4>
          <p className="text-[9px] text-purple-400 font-bold font-['IBM_Plex_Mono'] uppercase tracking-wider mt-0.5">
            🎓 Student Tier Verified
          </p>
        </div>
      </div>
    </div>
  );
}