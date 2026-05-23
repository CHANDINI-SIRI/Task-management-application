// src/components/TaskCard.jsx
import React from 'react';

export default function TaskCard({ task, onToggleStatus, onDeleteTask, onTriggerFocus }) {
  if (!task) return null;

  const getCategoryStyles = (category) => {
    const key = String(category || 'general').toLowerCase().trim();
    switch(key) {
      case 'work': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'health': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getPriorityStyles = (priority) => {
    const lvl = String(priority || 'Medium').toLowerCase().trim();
    if (lvl === 'high') return 'bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold';
    if (lvl === 'low') return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#11131f]/40 backdrop-blur-md rounded-xl group transition-all duration-150">
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Custom Circular Checkbox */}
        <button
          type="button"
          onClick={() => onToggleStatus && onToggleStatus(task.id)}
          className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
            task.status === 'Completed'
              ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/30'
              : 'border-slate-600 hover:border-purple-500 bg-[#0d0f17]'
          }`}
        >
          {task.status === 'Completed' && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Content */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span className={`text-xs font-semibold tracking-tight truncate ${
            task.status === 'Completed' ? 'line-through text-slate-500 font-normal' : 'text-slate-200'
          }`}>
            {task.title}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCategoryStyles(task.category)}`}>
              {task.category || 'general'}
            </span>
            <span className={`text-[9px] font-medium px-2 py-0.5 rounded-md border ${getPriorityStyles(task.priority)}`}>
              {task.priority || 'Medium'}
            </span>
            <span className="text-[9px] text-slate-400 font-medium flex items-center gap-1 bg-slate-500/5 border border-white/5 px-2 py-0.5 rounded-md">
              📅 {task.dueDate || 'Today'}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 shrink-0 ml-4">
        {task.status !== 'Completed' && (
          <button
            type="button"
            onClick={() => onTriggerFocus && onTriggerFocus(task)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition duration-100"
          >
            ⚡ Focus
          </button>
        )}
        <button
          type="button"
          onClick={() => onDeleteTask && onDeleteTask(task.id)}
          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition duration-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}