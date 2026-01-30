
import React from 'react';
import { TOOLS, ICON_MAP } from '../constants';
import { Tool } from '../types';

interface ToolsGridProps {
  onToolSelect: (id: string) => void;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({ onToolSelect }) => {
  const categories = Array.from(new Set(TOOLS.map(t => t.category)));

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">What would you like to do?</h1>
        <p className="text-lg text-slate-500">Fast, secure, and AI-powered document tools.</p>
      </div>

      {categories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">
            {category} Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TOOLS.filter(t => t.category === category).map(tool => (
              <div 
                key={tool.id}
                onClick={() => onToolSelect(tool.id)}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${tool.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {ICON_MAP[tool.icon]}
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
