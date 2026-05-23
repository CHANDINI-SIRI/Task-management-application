// src/components/StatsCard.jsx
import React from 'react';

export default function StatsCard({ title, count }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-300/40 transition-all duration-300 group">
      <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-purple-600 transition-colors duration-200">
        {title}
      </div>
      <div className="text-3xl font-black text-slate-800 mt-1 tracking-tight">
        {count}
      </div>
    </div>
  );
}