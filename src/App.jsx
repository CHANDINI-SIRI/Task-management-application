// src/App.jsx
import React, { useState, useEffect } from 'react';

// ==========================================
// 📊 INTERNAL COMPONENT: DYNAMIC LIVE-REACTIVE CHART
// ==========================================
function LocalAnalyticsDeck({ tasks }) {
  const workCount = tasks.filter(t => String(t.category || '').toLowerCase() === 'work').length;
  const healthCount = tasks.filter(t => String(t.category || '').toLowerCase() === 'health').length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;

  const baseSeed = [30, 45, 35, 50, 70, 60, 80, 55, 40, 65, 85, 50];
  const dynamicBars = baseSeed.map((height, index) => {
    let modifier = 0;
    if (index % 3 === 0) modifier = workCount * 6;
    else if (index % 3 === 1) modifier = healthCount * 8;
    else modifier = completedCount * 5;
    return Math.min(100, Math.max(15, height + modifier));
  });

  return (
    <div className="p-6 text-center">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Your Live Activity Signature</span>
        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 animate-pulse">
          • Reactive Matrix Live
        </span>
      </div>
      <div className="h-32 w-full flex items-end gap-1.5 pt-4 relative">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          <div className="border-b border-white w-full h-0" />
          <div className="border-b border-white w-full h-0" />
          <div className="border-b border-white w-full h-0" />
        </div>
        {dynamicBars.map((height, i) => (
          <div 
            key={i} 
            className="flex-1 bg-gradient-to-t from-purple-600/30 via-indigo-500/60 to-purple-400 rounded-t-md transition-all duration-700 ease-out" 
            style={{ height: `${height}%` }} 
          />
        ))}
      </div>
      <div className="flex justify-between text-[9px] text-slate-500 font-bold mt-4 px-1 tracking-wider">
        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
      </div>
    </div>
  );
}

// ==========================================
// 🛠️ INTERNAL COMPONENT: PREMIUM TASK CARD
// ==========================================
function LocalTaskCard({ task, onToggleStatus, onDeleteTask }) {
  if (!task) return null;
  
  const isWork = String(task.category || '').toLowerCase() === 'work';
  const isHealth = String(task.category || '').toLowerCase() === 'health';
  const isHigh = String(task.priority || '').toLowerCase() === 'high';
  const isCompleted = task.status === 'Completed';

  return (
    <div className={`flex items-center justify-between p-4 bg-[#11131f]/40 backdrop-blur-md rounded-xl border transition-all duration-500 w-full hover:bg-[#16192a]/60 transform active:scale-[0.99] ${
      isCompleted 
        ? 'border-emerald-500/10 bg-emerald-950/5 opacity-60 line-through' 
        : isHigh 
          ? 'border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.04)] animate-pulse-subtle' 
          : 'border-white/5'
    }`}>
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggleStatus && onToggleStatus(task.id)}
          className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
            isCompleted
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-transparent shadow-lg shadow-emerald-500/20 scale-110'
              : 'border-slate-600 bg-[#0d0f17] hover:border-purple-400 hover:scale-105'
          }`}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-white transform scale-110 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span className={`text-xs font-semibold tracking-tight truncate transition-all duration-300 ${
            isCompleted ? 'text-slate-500 font-normal' : 'text-slate-200'
          }`}>
            {task.title}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md border transition-all duration-300 ${
              isCompleted ? 'bg-slate-800/40 text-slate-600 border-transparent' :
              isWork ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
              isHealth ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
              'bg-slate-500/10 text-slate-400 border-slate-500/20'
            }`}>
              {task.category || 'general'}
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border transition-all duration-300 ${
              isCompleted ? 'bg-slate-800/40 text-slate-600 border-transparent' :
              isHigh ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
            }`}>
              {task.priority || 'Medium'}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDeleteTask && onDeleteTask(task.id)}
        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition duration-150 ml-4 shrink-0 hover:scale-110 active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

// ==========================================
// 🚀 MAIN APPLICATION ENGINE
// ==========================================
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 'task-1', title: 'Prepare project presentation slides #work', priority: 'High', category: 'work', status: 'Pending' },
    { id: 'task-2', title: 'Morning 30-minute cardio run #health', priority: 'Medium', category: 'health', status: 'Completed' },
    { id: 'task-3', title: 'Review notes for upcoming semester exams #work', priority: 'High', category: 'work', status: 'Pending' },
    { id: 'task-4', title: 'Pick up groceries and fresh fruit basket', priority: 'Low', category: 'general', status: 'Pending' },
    { id: 'task-5', title: 'Drink 3 liters of water throughout the day #health', priority: 'Medium', category: 'health', status: 'Completed' }
  ]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [layoutMode, setLayoutMode] = useState('list');
  const [activeFilter, setActiveFilter] = useState('All');
  const [inputString, setInputString] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 

  const [liveCategory, setLiveCategory] = useState('general');
  const [livePriority, setLivePriority] = useState('Medium');

  // ⭐ NEW: GLOBAL KEYBOARD SHORTCUT COMMAND ENGINE
  useEffect(() => {
    const handleGlobalShortcuts = (event) => {
      // Ignore listening if the user is actively typing an assignment inside an entry input field
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        // Allow user to escape out of fields effortlessly using the Escape key
        if (event.key === 'Escape') document.activeElement.blur();
        return;
      }

      // [N] key pulls visual focus straight into the entry input line automatically
      if (event.key.toLowerCase() === 'n') {
        event.preventDefault();
        const inputEl = document.querySelector('input[placeholder*="What\'s on your mind"]');
        if (inputEl) inputEl.focus();
      }

      // [D] cycles dashboard modules seamlessly right under the fingers
      if (event.key.toLowerCase() === 'd') {
        event.preventDefault();
        const views = ['dashboard', 'calendar', 'settings'];
        setCurrentView(prev => {
          const currentIndex = views.indexOf(prev);
          const nextIndex = (currentIndex + 1) % views.length;
          return views[nextIndex];
        });
      }
    };

    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, []);

  useEffect(() => {
    let cat = 'general';
    if (/#work/i.test(inputString)) cat = 'work';
    else if (/#health/i.test(inputString)) cat = 'health';
    setLiveCategory(cat);

    let prio = 'Medium';
    if (/high/i.test(inputString)) prio = 'High';
    else if (/low/i.test(inputString)) prio = 'Low';
    setLivePriority(prio);
  }, [inputString]);

  const handleInjectTag = (tagText) => {
    if (inputString.includes(tagText)) return;
    setInputString((prev) => (prev.trim() ? `${prev} ${tagText}` : tagText));
  };

  const fetchTasksFromServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setTasks(data);
      }
    } catch (error) {
      console.log("ℹ️ Server not running; using responsive local sample tasks safely.");
    }
  };

  useEffect(() => {
    fetchTasksFromServer();
  }, []);

  const handleParseInput = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!inputString.trim()) return;

    const newLocalTask = {
      id: `local-${Date.now()}`,
      title: inputString,
      priority: livePriority,
      category: liveCategory,
      status: 'Pending'
    };

    setTasks(prev => [newLocalTask, ...prev]);
    setInputString('');

    try {
      await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputString,
          priority: livePriority,
          category: liveCategory,
          dueDate: 'Today'
        })
      });
      fetchTasksFromServer();
    } catch (err) {
      console.error("❌ Failed logging task entry:", err);
    }
  };

  const toggleTaskStatus = async (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' };
      }
      return t;
    }));

    const target = tasks.find(t => t.id === taskId);
    if (!target) return;
    const updatedStatus = target.status === 'Completed' ? 'Pending' : 'Completed';

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus })
      });
      fetchTasksFromServer();
    } catch (err) {
      console.error("❌ Status synchronization failure:", err);
    }
  };

  const deleteTask = async (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, { method: 'DELETE' });
      fetchTasksFromServer();
    } catch (err) {
      console.error("❌ Database drop failure:", err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = activeFilter === 'All' || String(task.category || 'general').toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = String(task.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const pendingCount = totalCount - completedCount;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const isDayFullyComplete = totalCount > 0 && pendingCount === 0;

  const getPillCount = (filterName) => {
    if (filterName === 'All') return tasks.length;
    return tasks.filter(t => String(t.category || 'general').toLowerCase() === filterName.toLowerCase()).length;
  };

  const triggerQuickTaskCreation = () => {
    setInputString("Review my strategy notes for next week #work");
    const inputEl = document.querySelector('input[type="text"]');
    if (inputEl) inputEl.focus();
  };

  return (
    <div className="flex h-screen w-screen bg-[#0f111a] bg-gradient-to-br from-[#0f111a] via-[#1a1333] to-[#0b0d16] text-slate-100 overflow-hidden font-['Inter'] antialiased relative">
      
      <div className={`absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
        isDayFullyComplete ? 'bg-emerald-500/10' : 'bg-purple-600/15'
      }`} />

      {/* 🧭 SIDEBAR */}
      <div className="w-64 bg-[#0d0f17]/60 backdrop-blur-2xl h-screen fixed left-0 top-0 border-r border-white/10 flex flex-col justify-between p-5 select-none z-40 shadow-xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex justify-center items-center font-bold text-white text-sm shadow-md">
              TF
            </div>
            <span className="text-lg font-bold tracking-tight text-white">TaskFlow<span className="text-purple-500 font-black">.</span></span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase px-3 mb-2">Workspace Navigation</div>
            {[
              { id: 'dashboard', label: 'Dashboard [D]', icon: '📊' },
              { id: 'calendar', label: 'Calendar [D]', icon: '📅' },
              { id: 'settings', label: 'Settings [D]', icon: '⚙️' }
            ].map((item) => (
              <button 
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-all duration-200 w-full ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Shortcut Helper Badge in Footer */}
        <div className="bg-[#161925]/60 border border-white/10 p-3.5 rounded-2xl flex flex-col gap-2 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex justify-center items-center text-[10px] font-bold">⌨️</div>
            <div className="text-[10px] font-bold text-slate-400">
              Press <kbd className="bg-slate-800 text-purple-400 px-1 py-0.5 rounded border border-white/15 mx-0.5 shadow-sm">N</kbd> to compose new task.
            </div>
          </div>
        </div>
      </div>

      {/* ⚙️ MAIN WORKSPACE WINDOW */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden pl-64 relative z-10">
        
        {/* Input Bar */}
        <div className="bg-[#161925]/40 backdrop-blur-xl border-b border-white/10 px-8 py-5 w-full shrink-0">
          <form onSubmit={handleParseInput} className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
            <div className="flex gap-4 items-center">
              <input 
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="What's on your mind today? (Press ESC to exit typing state)"
                className="w-full bg-[#0d0f17]/60 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-[#0d0f17]/90 transition-all duration-200 shadow-inner"
              />
              <button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-7 py-3.5 rounded-2xl hover:from-purple-500 hover:to-indigo-500 transition shrink-0 shadow-lg shadow-purple-600/20">
                Add Task
              </button>
            </div>
            
            <div className="flex flex-wrap justify-between items-center gap-3 bg-[#0c0e16]/60 border border-white/5 p-2 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">⚡ Quick Labels:</span>
                <button type="button" onClick={() => handleInjectTag('#work')} className="text-[10px] font-medium bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 px-2.5 py-1 rounded-md transition">
                  💼 Work (#work)
                </button>
                <button type="button" onClick={() => handleInjectTag('#health')} className="text-[10px] font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 px-2.5 py-1 rounded-md transition">
                  🌱 Health (#health)
                </button>
                <button type="button" onClick={() => handleInjectTag('high priority')} className="text-[10px] font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 px-2.5 py-1 rounded-md transition">
                  🔥 Urgent (high)
                </button>
              </div>

              <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Auto-Sorted As:</span>
                <span className="text-[9px] font-black text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded">
                  {liveCategory}
                </span>
                <span className="text-[9px] font-black text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded">
                  {livePriority}
                </span>
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto w-full">
          {currentView === 'calendar' ? (
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8 py-10">
              <h1 className="text-3xl font-black tracking-tight text-white">Calendar Planner</h1>
              <div className="bg-[#161925]/40 backdrop-blur-md border border-white/10 p-12 rounded-3xl mt-6 text-center text-slate-400 text-xs shadow-xl">🗓️ Your plan layout is loaded and ready. Press <kbd className="bg-slate-800 text-white px-2 py-0.5 rounded border border-white/10 mx-1">D</kbd> to jump back to Dashboard.</div>
            </div>
          ) : currentView === 'settings' ? (
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8 py-10">
              <h1 className="text-3xl font-black tracking-tight text-white">App Settings</h1>
              <div className="bg-[#161925]/40 backdrop-blur-md border border-white/10 p-12 rounded-3xl mt-6 text-center text-slate-400 text-xs shadow-xl">⚙️ Preference configs loaded. Press <kbd className="bg-slate-800 text-white px-2 py-0.5 rounded border border-white/10 mx-1">D</kbd> to jump back to Dashboard.</div>
            </div>
          ) : (
            // MAIN DASHBOARD LAYOUT
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8 py-10 space-y-10">
              
              {/* EMOTIONAL HERO BANNER */}
              <div className={`backdrop-blur-xl border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden transition-all duration-700 ${
                isDayFullyComplete 
                  ? 'from-[#0b291b]/90 via-[#0a2118]/90 to-[#0e1714]/90 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.06)]' 
                  : 'from-[#1b1936]/80 via-[#151c3a]/80 to-[#121424]/90 border-white/10'
              }`}>
                <div className="space-y-4 max-w-xl z-10">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border inline-block transition-all duration-500 ${
                    isDayFullyComplete 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-md' 
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  }`}>
                    {isDayFullyComplete ? '🎉 Complete Victory!' : 'Personal Space'}
                  </span>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight transition-all duration-500">
                    {isDayFullyComplete ? (
                      <>You've conquered <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">everything today!</span></>
                    ) : (
                      <>Welcome back! Let's clear out <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">your goals today</span></>
                    )}
                  </h2>
                  
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {isDayFullyComplete 
                      ? "Incredible job, Chandini. Every single goal has been completed. Take some time off, recharge, and enjoy the rest of your beautiful evening!" 
                      : "Organize your daily study sessions, personal milestones, and routines all in one clean place. Your progress updates in real time as you complete tasks."}
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-6 items-center text-slate-300 text-xs font-semibold">
                    <div>{isDayFullyComplete ? '✨ Perfect Day Status' : '🎉 Great Job!'}</div>
                    <div className="w-px h-4 bg-white/10" />
                    <div><span className={`text-lg font-black mr-1 transition-colors ${isDayFullyComplete ? 'text-emerald-400' : 'text-indigo-400'}`}>{totalCount}</span> Total Tasks</div>
                    <div className="w-px h-4 bg-white/10" />
                    <div><span className={`text-lg font-black mr-1 transition-colors ${isDayFullyComplete ? 'text-emerald-400' : 'text-blue-400'}`}>{completionPercentage}%</span> Done</div>
                  </div>
                </div>

                <div className={`relative shrink-0 w-48 h-48 rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-700 ${
                  isDayFullyComplete 
                    ? 'from-emerald-500/10 to-teal-500/5 border-emerald-500/20' 
                    : 'from-purple-600/20 to-blue-600/15 border-white/15'
                }`}>
                  <div className={`w-24 h-24 rounded-full blur-xl opacity-50 absolute transition-all duration-700 ${
                    isDayFullyComplete ? 'bg-emerald-500' : 'bg-gradient-to-tr from-purple-500 to-indigo-500'
                  }`} />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0d101d]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-white tracking-wide">
                      {isDayFullyComplete ? '🏆 Unstoppable 🏆' : 'Stay Consistent ✨'}
                    </p>
                  </div>
                </div>
              </div>

              {/* REACTIVE CHART COMPONENT */}
              <div className="w-full block overflow-hidden rounded-3xl border border-white/10 bg-[#161925]/30 backdrop-blur-xl p-3 shadow-xl">
                <LocalAnalyticsDeck tasks={tasks} />
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div className="p-5 rounded-2xl border border-white/5 bg-[#161925]/40 backdrop-blur-md flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Tasks</span>
                  <span className="text-2xl font-black mt-1 text-white">{totalCount}</span>
                </div>
                <div className="p-5 rounded-2xl border border-white/5 bg-[#161925]/40 backdrop-blur-md flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">To-Do</span>
                  <span className={`text-2xl font-black mt-1 transition-colors ${pendingCount === 0 && totalCount > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>{pendingCount}</span>
                </div>
                <div className="p-5 rounded-2xl border border-white/5 bg-[#161925]/40 backdrop-blur-md flex flex-col justify-center">
                  <span className="text-2xl font-black mt-1 text-emerald-400">{completedCount}</span>
                </div>

                {/* Progress Circle */}
                <div className="p-4 rounded-2xl border border-white/5 bg-[#161925]/40 backdrop-blur-md flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Day Progress</span>
                    <span className={`text-2xl font-black mt-0.5 transition-colors ${isDayFullyComplete ? 'text-emerald-400' : 'text-purple-400'}`}>{completionPercentage}%</span>
                  </div>
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                      <circle className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="transparent" r="18" cx="22" cy="22" />
                      <circle 
                        className={`transition-all duration-700 ${isDayFullyComplete ? 'text-emerald-400' : 'text-purple-500'}`} 
                        strokeWidth="4" 
                        strokeDasharray={2 * Math.PI * 18}
                        strokeDashoffset={2 * Math.PI * 18 - (completionPercentage / 100) * (2 * Math.PI * 18)}
                        strokeLinecap="round" stroke="currentColor" fill="transparent" r="18" cx="22" cy="22" 
                      />
                    </svg>
                    <span className={`absolute text-[8px] font-black uppercase tracking-widest ${isDayFullyComplete ? 'text-emerald-400' : 'text-purple-400'}`}>
                      {isDayFullyComplete ? '100%' : 'Done'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Layout Filter & SMART SEARCH ROW */}
              <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">My Task View</h3>
                  
                  <div className="flex bg-[#0d0f17] p-1 rounded-xl border border-white/5">
                    <button 
                      type="button"
                      onClick={() => setLayoutMode('list')}
                      className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition ${layoutMode === 'list' ? 'bg-[#1e2235] text-purple-400 font-bold border border-white/5 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      📝 Single List
                    </button>
                    <button 
                      type="button"
                      onClick={() => setLayoutMode('grid')}
                      className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition ${layoutMode === 'grid' ? 'bg-[#1e2235] text-purple-400 font-bold border border-white/5 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      ✨ Grid Layout
                    </button>
                  </div>

                  {/* REAL-TIME SEARCH BOX */}
                  <div className="relative min-w-[200px]">
                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-xs text-slate-500">🔍</span>
                    <input 
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Quick filter items..."
                      className="w-full bg-[#0d0f17]/80 text-xs text-slate-300 placeholder-slate-600 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-purple-500/60 transition"
                    />
                    {searchTerm && (
                      <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 hover:text-white bg-white/5 px-1.5 py-0.5 rounded">
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Pills with DYNAMIC COUNTER BADGES */}
                <div className="flex gap-1.5 bg-[#131522] p-1 rounded-xl border border-white/10 shrink-0">
                  {['All', 'Work', 'Health', 'General'].map((filterName) => {
                    const isSelected = activeFilter.toLowerCase() === filterName.toLowerCase();
                    const count = getPillCount(filterName);
                    
                    return (
                      <button
                        key={filterName}
                        type="button"
                        onClick={() => setActiveFilter(filterName)}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-150 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{filterName}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md transition ${
                          isSelected 
                            ? 'bg-white/20 text-white' 
                            : count > 0 
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/10' 
                              : 'bg-slate-800 text-slate-600'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Task View Layout Block */}
              {filteredTasks.length === 0 ? (
                <div className="bg-[#121422]/40 backdrop-blur-md border border-white/5 p-12 rounded-2xl text-center w-full max-w-2xl mx-auto space-y-6 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.02] to-transparent pointer-events-none" />
                  
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-600/20 to-indigo-500/20 rounded-full flex items-center justify-center mx-auto border border-purple-500/20 shadow-inner">
                    <span className="text-2xl animate-pulse">✨</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-200">All caught up ahead of schedule!</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      {searchTerm 
                        ? "We couldn't find anything matching that search phrase. Clear the search bar or quickly pre-load a default workflow item below."
                        : "Your list is beautifully clean. You have no pending metrics or active items waiting for feedback. Ready to schedule a head start?"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={triggerQuickTaskCreation}
                    className="inline-flex items-center gap-2 bg-[#1b1d30] hover:bg-[#22253d] text-purple-400 text-xs font-bold px-5 py-2.5 rounded-xl border border-purple-500/20 transition-all duration-200 shadow-md active:scale-95"
                  >
                    💡 Auto-Fill Next Goal Step
                  </button>
                </div>
              ) : layoutMode === 'list' ? (
                <div className="space-y-3.5 w-full">
                  {filteredTasks.map(task => (
                    <LocalTaskCard 
                      key={task.id} 
                      task={task} 
                      onToggleStatus={toggleTaskStatus} 
                      onDeleteTask={deleteTask} 
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {filteredTasks.map(task => (
                    <div key={task.id} className="transition-all duration-200">
                      <LocalTaskCard 
                        task={task} 
                        onToggleStatus={toggleTaskStatus} 
                        onDeleteTask={deleteTask} 
                      />
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}