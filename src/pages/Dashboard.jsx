// src/pages/Dashboard.jsx
import React from 'react';
import TaskCard from '../components/TaskCard';
import AnalyticsDeck from '../components/AnalyticsDeck';

export default function Dashboard({ 
  tasks = [], 
  activeFilter = 'All', 
  setActiveFilter, 
  compactMode, 
  showDebugText,
  toggleTaskStatus,
  deleteTask,
  onTriggerFocus
}) {

  const filteredTasks = Array.isArray(tasks) ? tasks.filter(task => {
    if (!task) return false;
    const currentFilter = (activeFilter || 'all').toLowerCase().trim();
    if (currentFilter === 'all') return true;
    return (task.category || 'general').toLowerCase().trim() === currentFilter;
  }) : [];

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const pendingCount = totalCount - completedCount;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-8 py-10 space-y-10">
      
      {/* 🚀 HERO PRESENTATION LAYOUT BLOCK (Matching Reference Image) */}
      <div className="bg-gradient-to-r from-[#1b1936]/80 via-[#151c3a]/80 to-[#121424]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-4 max-w-xl">
          <span className="bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-purple-500/20 inline-block">
            AI Productivity Suite
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Empower Your Learning Journey With <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">Modern Automation</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Consolidate unstructured operational logs into actionable entries instantly. Your platform automatically categorizes metrics, schedules timelines, and indexes workflow items.
          </p>
          <div className="pt-2 flex flex-wrap gap-6 items-center text-slate-300 text-xs font-semibold">
            <div><span className="text-purple-400 text-lg font-black mr-1">99.8%</span> Accuracy</div>
            <div className="w-px h-4 bg-white/10" />
            <div><span className="text-indigo-400 text-lg font-black mr-1">{totalCount}</span> Total Tasks</div>
            <div className="w-px h-4 bg-white/10" />
            <div><span className="text-blue-400 text-lg font-black mr-1">{completionPercentage}%</span> Progress Yield</div>
          </div>
        </div>

        {/* 🎨 Graphical Avatar Card Element Box (Inspired by Reference) */}
        <div className="relative shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/15 border border-white/15 flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-purple-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40" />
          {/* Neon Graphic Element */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 animate-pulse blur-xl opacity-50" />
          <div className="absolute bottom-4 left-4 right-4 bg-[#0d101d]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl text-center">
            <p className="text-[10px] font-bold text-white tracking-wide">TaskFlow Network</p>
            <p className="text-[9px] font-semibold text-purple-400 mt-0.5">⭐ Student Tier Verified</p>
          </div>
        </div>
      </div>

      {/* 📊 Analytics Visualization Deck Component Panel */}
      <div className="w-full block overflow-hidden rounded-3xl border border-white/10 bg-[#161925]/30 backdrop-blur-xl p-3 shadow-xl">
        <AnalyticsDeck tasks={tasks} darkTheme={true} />
      </div>

      {/* 📈 High-Contrast Glass Matrix Cards row with the Circle progress wheel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {[
          { label: "Total Rows", value: totalCount, color: "text-white" },
          { label: "Active Pending", value: pendingCount, color: "text-amber-400" },
          { label: "Completed Handshakes", value: completedCount, color: "text-emerald-400" }
        ].map((stat, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-[#161925]/40 backdrop-blur-md shadow-lg flex flex-col justify-center">
            <span className="text-[10px] font-['IBM_Plex_Mono'] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
            <span className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</span>
          </div>
        ))}

        {/* ⭕ Efficiency Circle Progress Gauge Ring */}
        <div className="p-4 rounded-2xl border border-white/5 bg-[#161925]/40 backdrop-blur-md shadow-lg flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-['IBM_Plex_Mono'] font-bold text-slate-500 uppercase tracking-wider">Productivity</span>
            <span className="text-2xl font-black text-purple-400 mt-0.5">{completionPercentage}%</span>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
              <circle className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="transparent" r="18" cx="22" cy="22" />
              <circle 
                className="text-purple-500 transition-all duration-500 ease-out" 
                strokeWidth="4" 
                strokeDasharray={2 * Math.PI * 18}
                strokeDashoffset={2 * Math.PI * 18 - (completionPercentage / 100) * (2 * Math.PI * 18)}
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="18" 
                cx="22" 
                cy="22" 
              />
            </svg>
            <span className="absolute text-[8px] font-black text-purple-400 uppercase tracking-widest">Yield</span>
          </div>
        </div>
      </div>

      {/* 📋 Task Section Filter Bar Controls Positioned Above Streams */}
      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <div className="flex items-center gap-3">
          <h3 className="font-['IBM_Plex_Mono'] text-xs font-bold text-slate-400 uppercase tracking-widest">
            Active Registry Streams
          </h3>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            {filteredTasks.length} Units
          </span>
        </div>

        {/* Filter Pills Tabs */}
        <div className="flex gap-1 bg-[#131522] p-1 rounded-xl border border-white/10 shadow-inner shrink-0">
          {['All', 'Work', 'Health', 'General'].map((filterName) => (
            <button
              key={filterName}
              type="button"
              onClick={() => setActiveFilter(filterName)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-150 ${
                activeFilter.toLowerCase() === filterName.toLowerCase()
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>
      </div>

      {/* Task Streams Container */}
      <div className="space-y-3.5 w-full">
        {filteredTasks.length === 0 ? (
          <div className="bg-[#161925]/20 border border-dashed border-white/10 p-12 rounded-2xl text-center w-full">
            <span className="text-2xl">🍃</span>
            <p className="text-xs text-slate-500 font-semibold mt-2">No active records match your criteria.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className="bg-[#161925]/30 backdrop-blur-md border border-white/5 rounded-2xl p-1 transition-all duration-200 shadow-md hover:border-white/15 w-full"
            >
              <TaskCard 
                task={task} 
                onToggleStatus={toggleTaskStatus}
                onDeleteTask={deleteTask}
                onTriggerFocus={onTriggerFocus}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}