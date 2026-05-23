// src/pages/CalendarView.jsx
import React from 'react';

export default function CalendarView({ tasks }) {
  // Graceful array safety fallback check
  const activeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="animate-fade-in">
      {/* View Title Grid Block */}
      <div className="mb-6">
        <h2 className="font-['IBM_Plex_Mono'] text-xs font-bold text-purple-600 uppercase tracking-widest">
          Schedule Matrix
        </h2>
        <h1 className="text-2xl font-black tracking-tight text-slate-800 mt-0.5">
          Academic Timeline
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Dynamic scheduling engine tracking upcoming course deadlines.
        </p>
      </div>

      {/* Grid Layout Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeTasks.map(task => (
          <div 
            key={task.id} 
            className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-300/50 transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              {/* Card Meta Indicator Header Row */}
              <div className="flex justify-between items-center gap-4">
                <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg">
                  ⏳ Due: {task.dueDate || "Today"}
                </span>
                
                {/* Micro-priority Pill Matcher */}
                <span className={`font-['IBM_Plex_Mono'] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                  task.priority === 'High' 
                    ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {task.priority || "Medium"}
                </span>
              </div>

              {/* Task Core Description Title */}
              <h4 className="text-sm font-semibold tracking-tight text-slate-800 mt-4 line-clamp-2 leading-relaxed">
                {task.title}
              </h4>
            </div>

            {/* Scope Categorization Tag Footer */}
            <div className="text-[11px] text-slate-400 mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-1.5">
              <span className="font-medium">Scope Map:</span>
              <span className="font-['IBM_Plex_Mono'] font-bold bg-slate-50 text-slate-500 border border-slate-200/60 px-2 py-0.5 rounded-md text-[10px]">
                #{task.category || "general"}
              </span>
            </div>
            
            {/* Subtle premium card hover glow asset */}
            <div className="absolute inset-0 rounded-2xl border border-purple-500/0 group-hover:border-purple-500/10 pointer-events-none transition-all duration-300"></div>
          </div>
        ))}

        {/* Empty State Fallback Module */}
        {activeTasks.length === 0 && (
          <div className="col-span-full text-center p-16 bg-white/40 backdrop-blur-sm border border-dashed border-slate-200 rounded-2xl shadow-inner">
            <span className="text-3xl filter drop-shadow-sm">🎉</span>
            <h3 className="font-['IBM_Plex_Mono'] text-xs font-bold text-slate-700 uppercase tracking-wider mt-3">
              Clear Roadmap Verified
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Your assignment database is fully up to date. No upcoming targets detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}