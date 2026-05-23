// src/components/AnalyticsDeck.jsx
import React from 'react';

export default function AnalyticsDeck({ tasks = [] }) {
  return (
    <div className="p-6 text-center">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-['IBM_Plex_Mono'] font-bold text-slate-400 uppercase tracking-widest">Activity Analytics Stream</span>
        <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/20">Live Sync</span>
      </div>
      
      {/* Visual Wave Graph Placeholder */}
      <div className="h-32 w-full flex items-end gap-1 pt-4 relative">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-white/10 w-full h-0" />
          <div className="border-b border-white/10 w-full h-0" />
          <div className="border-b border-white/10 w-full h-0" />
        </div>
        
        {/* Fake animated wave visualization bar pillars */}
        {[40, 55, 45, 60, 85, 70, 95, 65, 50, 75, 90, 60].map((height, i) => (
          <div key={i} className="flex-1 bg-gradient-to-t from-purple-600/20 to-indigo-500/60 rounded-t-sm transition-all duration-500" style={{ height: `${height}%` }} />
        ))}
      </div>
      
      <div className="flex justify-between text-[9px] text-slate-500 font-bold font-['IBM_Plex_Mono'] mt-3 px-1">
        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
      </div>
    </div>
  );
}