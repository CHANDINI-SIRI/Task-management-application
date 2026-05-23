// src/components/FocusMode.jsx
import React, { useState, useEffect } from 'react';

export default function FocusMode({ task, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let countdownInterval = null;
    if (isActive && secondsLeft > 0) {
      countdownInterval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      try { new Audio('/success.mp3').play(); } catch(e){}
      alert("⏱️ Deep Focus Block Completed!");
    }
    return () => clearInterval(countdownInterval);
  }, [isActive, secondsLeft]);

  const formatTimeDisplay = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-6 text-slate-800 animate-fade-in">
      
      {/* Absolute Cinematic Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-200/30 blur-[100px] pointer-events-none animate-pulse"></div>

      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-xs font-['IBM_Plex_Mono'] font-bold text-slate-400 hover:text-slate-900 bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl transition"
      >
        ✕ Close Focus Module
      </button>

      <div className="max-w-xl w-full text-center flex flex-col items-center gap-8 relative z-10">
        <div>
          <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase font-bold tracking-widest text-purple-600 bg-purple-100 border border-purple-200 px-3 py-1 rounded-full">
            ⚡ Deep Focus Session Operational
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 mt-4 max-w-md mx-auto">{task.title}</h2>
        </div>

        {/* ⏱️ APPLE-STYLE POMODORO TIME RADIAL RINGS CONTAINER */}
        <div className="w-60 h-60 rounded-full bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center relative group">
          <div className="absolute inset-3 rounded-full border border-dashed border-slate-100"></div>
          <span className="text-5xl font-black font-['IBM_Plex_Mono'] tracking-tighter bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {formatTimeDisplay()}
          </span>
          <span className="font-['IBM_Plex_Mono'] text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-1.5">
            {isActive ? '● Running' : '⏸ Paused'}
          </span>
        </div>

        {/* BUTTON ACTION BELT CONTROL RINGS */}
        <div className="flex gap-3">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-2.5 rounded-xl text-xs font-['IBM_Plex_Mono'] font-bold uppercase tracking-wider transition duration-200 shadow-sm ${
              isActive 
                ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isActive ? 'Pause Block' : 'Initiate Session'}
          </button>
          <button 
            onClick={() => { setIsActive(false); setSecondsLeft(25 * 60); }}
            className="bg-white hover:bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-['IBM_Plex_Mono'] font-bold text-slate-500 transition duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}