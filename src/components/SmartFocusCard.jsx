// src/components/SmartFocusCard.jsx
import React from 'react';

export default function SmartFocusCard({ recommendedTask, onComplete, onStartFocus }) {
  if (!recommendedTask) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50/60 border border-purple-100 p-6 rounded-2xl mb-8 shadow-sm relative overflow-hidden group">
      {/* Soft Breathing Accent Glow */}
      <div className="absolute right-[-5%] top-[-20%] w-48 h-48 rounded-full bg-purple-400/10 blur-2xl pointer-events-none group-hover:bg-purple-400/20 transition-all duration-500"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase font-bold tracking-widest text-purple-600 bg-purple-100/80 border border-purple-200/40 px-2.5 py-1 rounded-full">
            🧠 AI Priority Target Focus
          </span>
          <h3 className="text-base font-bold text-slate-800 mt-3 tracking-tight">
            {recommendedTask.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-['IBM_Plex_Mono']">
            Deadline Matrix: {recommendedTask.dueDate || "Immediate Target"}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button 
            onClick={() => onStartFocus(recommendedTask)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition duration-200 shadow-sm"
          >
            🎯 Start Focus
          </button>
          <button 
            onClick={() => onComplete(recommendedTask.id)}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}