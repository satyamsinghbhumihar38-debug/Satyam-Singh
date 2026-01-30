
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Download, Eye, Presentation } from 'lucide-react';
import { generateSlides } from '../services/gemini';
import { SlideContent } from '../types';

export const AIPPTMaker: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState<SlideContent[]>([]);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    try {
      const generated = await generateSlides(topic);
      setSlides(generated);
    } catch (error) {
      console.error(error);
      alert("Failed to generate slides. Check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-orange-600 text-white mb-6 shadow-lg">
          <Presentation className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-3">AI Presentation Maker</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Enter a topic and let AI structure your professional presentation.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        <div className="p-8 border-b border-slate-100">
          <label className="block text-sm font-bold text-slate-700 mb-3">What's your presentation about?</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="e.g. The future of sustainable energy in 2025"
              className="flex-1 bg-slate-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button 
              onClick={handleGenerate}
              disabled={isLoading || !topic}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Thinking...' : 'Generate Slides'}
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>

        {slides.length > 0 && (
          <div className="p-8 bg-slate-50 max-h-[600px] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Generated Outline</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 shadow-sm">
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700">
                  <Download className="w-4 h-4" /> Download PPTX
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {slides.map((slide, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">{slide.title}</h3>
                  </div>
                  <ul className="space-y-2 pl-12">
                    {slide.content.map((bullet, j) => (
                      <li key={j} className="text-slate-600 text-sm flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
