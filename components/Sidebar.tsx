
import React from 'react';
import { TOOLS, ICON_MAP } from '../constants';
import { Logo } from './Logo';

interface SidebarProps {
  activeToolId: string | null;
  onToolSelect: (id: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeToolId, onToolSelect }) => {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 h-screen overflow-y-auto flex flex-col sticky top-0 hidden md:flex">
      <div className="p-6 border-b border-slate-100 flex items-center cursor-pointer" onClick={() => onToolSelect(null)}>
        <Logo />
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">All Tools</p>
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold ${
              activeToolId === tool.id 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className={`${activeToolId === tool.id ? 'text-indigo-600' : 'text-slate-400'}`}>
              {ICON_MAP[tool.icon]}
            </div>
            <span className="truncate">{tool.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-100">
          <p className="text-sm font-bold mb-1">Upgrade to Pro</p>
          <p className="text-xs opacity-90 mb-4 leading-relaxed">Unlock advanced AI features and unlimited conversions.</p>
          <button className="w-full py-2.5 bg-white text-indigo-600 rounded-xl text-xs font-extrabold hover:bg-slate-50 transition-all transform active:scale-95">
            Get Pro Access
          </button>
        </div>
      </div>
    </aside>
  );
};
