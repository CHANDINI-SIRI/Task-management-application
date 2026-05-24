// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';

// ==========================================
// 🧠 SMART SCANNED TEXT CLEANER PIPELINE
// ==========================================
function cleanScannedText(rawText) {
  if (!rawText) return "";

  let clean = rawText
    .replace(/[^a-zA-Z0-9\s\-\.\:\#]/g, '') 
    .replace(/\s+/g, ' ')                  
    .trim();

  if (clean.length > 80) {
    const actionPhrases = /(read|complete|homework|assignment|chapters?|pages?|due|project|exam|quiz)/i;
    const sentences = clean.split(/[.:]/);
    const bestSentence = sentences.find(s => actionPhrases.test(s));
    clean = bestSentence ? bestSentence.trim() : sentences[0].trim();
  }

  if (clean.length > 70) {
    clean = clean.substring(0, 67) + "...";
  }

  return clean || "New Scanned Assignment Task";
}

// ==========================================
// 📊 INSPIRED PREMIUM INTERACTIVE ANALYTICS
// ==========================================
function PremiumAnalyticsHub({ tasks }) {
  const activeCount = tasks.filter(t => t.status !== 'Completed').length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const total = tasks.length;
  
  const midWeekHeight = Math.min(100, 30 + (activeCount * 12));
  const endWeekHeight = Math.min(100, 20 + (completedCount * 15));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Task Summary Ratio</h3>
        <div className="flex items-center justify-between pt-2">
          <div className="relative w-28 h-28 rounded-full border-[10px] border-indigo-500 flex items-center justify-center font-bold text-slate-800 text-lg">
            {total > 0 ? Math.round((completedCount / total) * 100) : 0}%
            <div className="absolute inset-[-10px] rounded-full border-[10px] border-slate-100 pointer-events-none border-l-transparent border-b-transparent" />
          </div>
          <div className="space-y-2 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Upcoming ({Math.round(activeCount * 0.4)})</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> In Progress ({Math.round(activeCount * 0.6)})</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Completed ({completedCount})</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Task Activity Velocity</h3>
          <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">Weekly Analytics Monitor</span>
        </div>
        <div className="h-32 w-full flex items-end gap-4 relative pt-4">
          <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none border-b border-slate-100 text-[9px] text-slate-300 font-bold">
            <div className="w-full border-b border-dashed border-slate-100 pb-1">100</div>
            <div className="w-full border-b border-dashed border-slate-100 pb-1">50</div>
            <div className="w-full border-b border-dashed border-slate-100 pb-1">25</div>
          </div>
          {[35, 45, midWeekHeight, 50, 65, endWeekHeight, 40].map((height, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full gap-2 z-10">
              <div className="w-full bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t-lg transition-all duration-700 shadow-sm" style={{ height: `${height}%` }} />
              <span className="text-[9px] font-bold text-slate-400">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🚀 MAIN PLATFORM ENTERPRISE COMPONENT
// ==========================================
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('tf_auth_token') || '');
  const [username, setUsername] = useState(localStorage.getItem('tf_username') || '');
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');

  const [tasks, setTasks] = useState([
    { _id: 'init-1', title: '🚀 Welcome to TaskFlow OS Enterprise Platform Framework', category: 'general', priority: 'HIGH', status: 'Pending' },
    { _id: 'init-2', title: '💼 Complete Zenithloop Architecture & Database Validation Models', category: 'work', priority: 'HIGH', status: 'Pending' },
    { _id: 'init-3', title: '🌱 Monitor cardio metrics & routine morning wellness sequence', category: 'health', priority: 'MEDIUM', status: 'Pending' }
  ]);
  
  const [inputString, setInputString] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('all');

  const [liveCategory, setLiveCategory] = useState('GENERAL');
  const [livePriority, setLivePriority] = useState('MEDIUM');

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let cat = 'GENERAL';
    if (/#work|assignment|exam|study/i.test(inputString)) cat = 'WORK';
    else if (/#health/i.test(inputString)) cat = 'HEALTH';
    setLiveCategory(cat);

    let prio = 'MEDIUM';
    if (/high|urgent|due tomorrow|exam/i.test(inputString)) prio = 'HIGH';
    else if (/low/i.test(inputString)) prio = 'LOW';
    setLivePriority(prio);
  }, [inputString]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('tf_auth_token', token);
      localStorage.setItem('tf_username', username);
      fetchTasks();
    } else {
      localStorage.removeItem('tf_auth_token');
      localStorage.removeItem('tf_username');
    }
  }, [token]);

  useEffect(() => {
    if (isScannerOpen && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => alert("Camera stream allocation access blocked or unavailable."));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isScannerOpen]);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tf_auth_token')}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setTasks(prevInitTasks => {
          const defaultExamples = prevInitTasks.filter(t => t._id.startsWith('init-'));
          return [...data, ...defaultExamples];
        });
      }
    } catch (err) {
      console.warn("Database offline. Running mock fallback state overlay layer.");
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const endpoint = isLoginMode ? 'login' : 'register';
    
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });
      const data = await res.json();
      if (data.error) {
        setAuthError(data.error);
      } else {
        if (isLoginMode) {
          setUsername(data.username);
          setToken(data.token);
        } else {
          setIsLoginMode(true);
          setAuthError('Identity established! Log in down below.');
        }
      }
    } catch (err) {
      // 🔌 OFFLINE FALLBACK MODE SWITCH
      console.warn("Authentication server offline. Deploying seamless mock sandbox profile session.");
      if (isLoginMode) {
        setUsername(authForm.username || 'chandini_siri');
        setToken('mock-sandbox-token-xyz123');
      } else {
        setIsLoginMode(true);
        setAuthError('Identity established (Offline Sandbox Mode)! Log in below.');
      }
    }
  };

  const handleCreateTask = async (e) => {
    if (e) e.preventDefault();
    if (!inputString.trim()) return;

    const cleanTitle = inputString.replace(/#work|#health|high|low|urgent/gi, '').trim();

    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: cleanTitle, category: liveCategory.toLowerCase(), priority: livePriority })
      });
      const newTask = await res.json();
      setTasks(prev => [newTask, ...prev]);
      setInputString('');
    } catch (err) {
      const localTask = {
        _id: `local-${Date.now()}`,
        title: cleanTitle,
        category: liveCategory.toLowerCase(),
        priority: livePriority,
        status: 'Pending'
      };
      setTasks(prev => [localTask, ...prev]);
      setInputString('');
    }
  };

  const captureAndScanAssignment = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsScanning(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');

    try {
      const { data: { text } } = await Tesseract.recognize(
        dataUrl,
        'eng',
        { logger: m => console.log(m) }
      );

      let scannedText = text.replace(/\n/g, ' ').trim();
      
      if (scannedText) {
        const refinedTaskTitle = cleanScannedText(scannedText);
        setInputString(`${refinedTaskTitle} #work high`);
      } else {
        alert("Could not cleanly extract alphanumeric parameters from view.");
      }
    } catch (err) {
      console.error("OCR Pipeline Error: ", err);
      alert("OCR scanning system cluster timed out.");
    } finally {
      setIsScanning(false);
      setIsScannerOpen(false);
    }
  };

  const toggleTaskStatus = async (id) => {
    const original = tasks.find(t => t._id === id);
    if (!original) return;
    const nextStatus = original.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      if (!id.startsWith('init-') && !id.startsWith('local-')) {
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ status: nextStatus })
        });
      }
      setTasks(prev => prev.map(t => t._id === id ? { ...t, status: nextStatus } : t));
    } catch (err) {
      setTasks(prev => prev.map(t => t._id === id ? { ...t, status: nextStatus } : t));
    }
  };

  const saveTaskTitle = async (id) => {
    if (!editingText.trim()) return;
    try {
      if (!id.startsWith('init-') && !id.startsWith('local-')) {
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ title: editingText })
        });
      }
      setTasks(prev => prev.map(t => t._id === id ? { ...t, title: editingText } : t));
      setEditingId(null);
    } catch (err) {
      setTasks(prev => prev.map(t => t._id === id ? { ...t, title: editingText } : t));
      setEditingId(null);
    }
  };

  const deleteTask = async (id) => {
    try {
      if (!id.startsWith('init-') && !id.startsWith('local-')) {
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setTasks(prev => prev.filter(t => t._id !== id));
    }
  };

  const activeScopeTasks = tasks.filter(t => t.status !== 'Completed' && (activeTab === 'all' || t.category === activeTab));
  const victoryLogTasks = tasks.filter(t => t.status === 'Completed');

  const totalTasksCount = tasks.length;
  const completedCount = victoryLogTasks.length;
  const upcomingCount = totalTasksCount - completedCount;

  if (!token) {
    return (
      <div className="flex h-screen w-screen bg-slate-50 text-slate-800 font-['Inter'] overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute right-[-100px] top-[-100px] w-96 h-96 rounded-full border-[24px] border-white/[0.02] pointer-events-none" />
          <div className="flex items-center gap-3 z-10">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex justify-center items-center font-black text-sm text-white">T</div>
            <span className="text-lg font-black tracking-tight text-white">Taskcore OS</span>
          </div>
          <div className="space-y-6 z-10 max-w-md">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">v2.5 Vision Engine</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">Automate metrics capturing sequences instantly.</h1>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">Capture assignment notes via your localized core OCR camera grid matrix node directly inside an isolated sandboxed viewport frame.</p>
          </div>
          <p className="text-[10px] text-slate-500 font-medium z-10">© 2026 Taskcore Systems Inc.</p>
        </div>

        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-6 md:px-16 bg-white">
          <form onSubmit={handleAuthSubmit} className="w-full max-w-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-slate-800">{isLoginMode ? 'Sign In to Workspace' : 'Initialize Profile Scope'}</h2>
              <p className="text-xs text-slate-400 font-medium">Verify configuration keys to deploy your custom dashboard.</p>
            </div>
            {authError && <div className="text-xs text-center font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 py-3 rounded-xl shadow-sm">{authError}</div>}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Access Username ID</label>
                <input type="text" placeholder="e.g. chandini_siri" required value={authForm.username} onChange={e => setAuthForm(p => ({ ...p, username: e.target.value }))} className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-indigo-500 font-semibold text-slate-800 transition" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Terminal Passcode</label>
                <input type="password" placeholder="••••••••" required value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-indigo-500 font-semibold text-slate-800 transition" />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white text-xs font-bold py-3.5 rounded-xl shadow-md hover:bg-indigo-500 transition">
              {isLoginMode ? 'Establish Access Link' : 'Register Profile Matrix'}
            </button>
            <p className="text-center text-xs text-slate-400 font-medium pt-2">
              {isLoginMode ? "No security configuration? " : "Profile scope established? "}
              <button type="button" onClick={() => { setIsLoginMode(!isLoginMode); setAuthError(''); }} className="text-indigo-600 font-bold hover:underline">{isLoginMode ? 'Initialize profile' : 'Sign in to account'}</button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-slate-50/50 text-slate-700 overflow-hidden pl-64 font-['Inter'] text-sm">
      {/* SIDEBAR NAVIGATION LEFT */}
      <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-slate-100 flex flex-col justify-between p-6 select-none z-40">
        <div className="space-y-6">
          <div className="flex items-center gap-3 py-1">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex justify-center items-center font-bold text-xs text-white">T</div>
            <span className="text-md font-bold tracking-tight text-slate-800">Taskcore</span>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Workspace Navigation</div>
            <button type="button" onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center gap-3 text-xs px-3 py-3 rounded-xl font-semibold transition ${currentView === 'dashboard' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}><span>🎛️</span> Dashboard</button>
            <button type="button" onClick={() => setCurrentView('tasks')} className={`w-full flex items-center gap-3 text-xs px-3 py-3 rounded-xl font-semibold transition ${currentView === 'tasks' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}><span>📋</span> Task Management</button>
            <button type="button" onClick={() => setCurrentView('calendar')} className={`w-full flex items-center gap-3 text-xs px-3 py-3 rounded-xl font-semibold transition ${currentView === 'calendar' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}><span>📅</span> Calendar Planner</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 font-bold text-xs text-indigo-600 flex items-center justify-center">CS</div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-800 truncate">Chandini Siri</span>
              <span className="text-[10px] text-slate-400 font-mono truncate">@{username}</span>
            </div>
          </div>
          <button type="button" onClick={() => { setToken(''); setUsername(''); }} className="w-full text-center text-[11px] font-bold text-slate-400 hover:text-rose-500 transition py-1">🔒 Disconnect Instance</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* TOP OBJECTIVE INPUT BAR W/ INTEGRATED SCANNER TRIGGERS */}
        <div className="bg-white border-b border-slate-100 px-8 py-4 w-full flex items-center justify-between shadow-sm">
          <form onSubmit={handleCreateTask} className="flex gap-3 items-center w-full max-w-3xl">
            <div className="relative w-full flex items-center">
              <span className="absolute left-4 text-slate-400">🔍</span>
              <input type="text" value={inputString} onChange={e => setInputString(e.target.value)} placeholder="Type tasks or snap assignment... (#work, high)" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-12 py-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium transition" />
              
              <button type="button" onClick={() => setIsScannerOpen(true)} className="absolute right-3 text-slate-400 hover:text-indigo-600 text-xs p-1 transition" title="Scan Written Assignment Sheet">📷</button>
            </div>
            <button type="submit" className="bg-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm hover:bg-indigo-500 transition whitespace-nowrap">Deploy</button>
          </form>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <span>AUTO-PARSED:</span>
            <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md border border-indigo-100">{liveCategory}</span>
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100">{livePriority}</span>
          </div>
        </div>

        {/* OCR ASSIGNMENT SCANNER OVERLAY DRAWER PANEL */}
        {isScannerOpen && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl max-w-md w-full border border-slate-100 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">📷 Optical Assignment Scanning Matrix</h3>
                <button type="button" onClick={() => setIsScannerOpen(false)} className="text-slate-400 text-xs font-bold">✕</button>
              </div>
              <div className="relative aspect-video w-full bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                {isScanning && (
                  <div className="absolute inset-0 bg-slate-950/70 text-white flex flex-col justify-center items-center space-y-2">
                    <span className="text-xs font-bold tracking-widest uppercase animate-pulse">Running OCR Extract Sync...</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsScannerOpen(false)} className="flex-1 bg-slate-50 text-slate-500 text-xs font-bold py-2.5 rounded-xl border border-slate-100">Cancel</button>
                <button type="button" onClick={captureAndScanAssignment} disabled={isScanning} className="flex-1 bg-indigo-600 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm hover:bg-indigo-500 transition">Snap & Parse</button>
              </div>
            </div>
          </div>
        )}

        {/* SCROLL CONTAINER SUB VIEWS */}
        <div className="flex-1 overflow-y-auto w-full max-w-6xl mx-auto px-8 py-8 space-y-6">
          {currentView === 'dashboard' && (
            <>
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 flex justify-between items-center text-white relative overflow-hidden shadow-md">
                <div className="space-y-2 max-w-xl z-10">
                  <h1 className="text-2xl font-bold tracking-tight">Good Morning, Chandini Siri</h1>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">Your enterprise system layout interface dashboard metrics monitoring grid is active.</p>
                </div>
                <div className="absolute right-[-20px] top-[-20px] w-48 h-48 rounded-full border-[16px] border-white/[0.04] pointer-events-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming Metrics</span>
                    <span className="text-2xl font-black text-slate-800 tracking-tight mt-1 block">{upcomingCount}</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">📋</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">In Progress Matrix</span>
                    <span className="text-2xl font-black text-slate-800 tracking-tight mt-1 block">{activeScopeTasks.length}</span>
                  </div>
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">🔄</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Completed Targets</span>
                    <span className="text-2xl font-black text-slate-800 tracking-tight mt-1 block">{completedCount}</span>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">✅</div>
                </div>
              </div>
              <PremiumAnalyticsHub tasks={tasks} />
            </>
          )}

          {currentView === 'tasks' && (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">PROJECT DEPLOYMENT SCOPES</div>
                <div className="flex gap-1 bg-slate-50 p-1 rounded-xl text-xs font-semibold text-slate-500">
                  {['all', 'work', 'health', 'general'].map(tab => (
                    <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`px-3 py-1 rounded-lg capitalize transition ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm font-bold' : ''}`}>{tab}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide px-1 mb-2">Active Open Tasks</div>
                {activeScopeTasks.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs font-medium bg-slate-50/50 rounded-xl border border-dashed border-slate-100">No active parameters inside this metric window cell shell.</div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {activeScopeTasks.map(task => (
                      <div key={task._id} className="flex items-center justify-between py-3.5 group transition-all">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <button type="button" onClick={() => toggleTaskStatus(task._id)} className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:border-indigo-500">
                            <span className="opacity-0 hover:opacity-100 text-[9px] text-indigo-500">✓</span>
                          </button>
                          {editingId === task._id ? (
                            <input type="text" value={editingText} onChange={e => setEditingText(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveTaskTitle(task._id)} className="text-xs font-semibold px-2 py-1 border border-indigo-400 rounded-md focus:outline-none w-full max-w-md bg-slate-50" autoFocus />
                          ) : (
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-semibold tracking-wide text-slate-800">{task.title}</span>
                              <div className="flex gap-2 text-[9px] font-black uppercase mt-0.5">
                                <span className="text-indigo-600 bg-indigo-50 px-1.5 rounded">{task.category || 'general'}</span>
                                <span className={`px-1.5 rounded ${String(task.priority).toUpperCase() === 'HIGH' ? 'text-rose-600 bg-rose-50' : 'text-slate-500 bg-slate-50'}`}>{task.priority || 'Medium'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {editingId === task._id ? (
                            <button type="button" onClick={() => saveTaskTitle(task._id)} className="text-emerald-600 text-xs font-bold px-2 py-1">Save</button>
                          ) : (
                            <button type="button" onClick={() => { setEditingId(task._id); setEditingText(task.title); }} className="text-slate-400 hover:text-indigo-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition">Edit</button>
                          )}
                          <button type="button" onClick={() => deleteTask(task._id)} className="text-slate-400 hover:text-rose-500 font-bold text-xs px-3 py-1 transition opacity-0 group-hover:opacity-100">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
                  <span>🏆 THE VICTORY LOG RECORD</span>
                  <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.2 rounded-full font-bold">{victoryLogTasks.length} Done</span>
                </div>
                {victoryLogTasks.length === 0 ? (
                  <div className="text-center py-6 text-slate-400 bg-slate-50/40 rounded-xl text-xs font-medium border border-dashed border-slate-100">No data archives verified in this runtime loop loop block.</div>
                ) : (
                  <div className="divide-y divide-slate-50 opacity-70">
                    {victoryLogTasks.map(task => (
                      <div key={task._id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-4">
                          <button type="button" onClick={() => toggleTaskStatus(task._id)} className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center">✓</button>
                          <span className="text-xs font-medium text-slate-400 line-through">{task.title}</span>
                        </div>
                        <div className="flex gap-2 items-center text-[11px] font-bold">
                          <button type="button" onClick={() => toggleTaskStatus(task._id)} className="text-indigo-600 hover:underline">Restore</button>
                          <button type="button" onClick={() => deleteTask(task._id)} className="text-rose-500 hover:underline pl-2">Delete Permanently</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentView === 'calendar' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">May 2026</h3>
                  <div className="flex gap-1 text-xs font-bold text-slate-400"><button type="button" className="p-1">◀</button><button type="button" className="p-1">▶</button></div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 uppercase border-b border-slate-50 pb-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2 text-xs font-bold text-slate-700 min-h-[180px]">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <div key={day} className={`p-2 flex items-center justify-center rounded-xl transition cursor-pointer relative ${day === 24 ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-50'}`}>
                      {day}
                      {day === 24 && <span className="absolute bottom-1 w-1 h-1 bg-white rounded-full " />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Schedule Agenda</h3>
                <div className="space-y-3">
                  {[
                    { time: '09:00 AM', title: 'Team Sync Scrum Redesign', tag: 'Project Sync' },
                    { time: '11:00 AM', title: 'Client Presentation Demo Case', tag: 'Product Showcase' },
                    { time: '04:00 PM', title: 'Weekly Core Planning Session', tag: 'Workspace Planning' }
                  ].map((evt, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <div className="text-[9px] font-bold text-indigo-600 font-mono">{evt.time}</div>
                      <div className="text-xs font-bold text-slate-800">{evt.title}</div>
                      <div className="text-[9px] text-slate-400 font-semibold">{evt.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}