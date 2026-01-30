
import React, { useState, useRef, useEffect } from 'react';
// Added RefreshCw to imports
import { Scissors, FileText, ArrowRight, Download, CheckCircle2, Plus, X, Eye, RefreshCw } from 'lucide-react';
import { Tool, ProcessingState } from '../types';

interface SplitPDFToolProps {
  tool: Tool;
  onReset: () => void;
  user: { name: string; email: string } | null;
  onAuthRequired: () => void;
}

export const SplitPDFTool: React.FC<SplitPDFToolProps> = ({ tool, onReset, user, onAuthRequired }) => {
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState<string>('1-2');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; fileName: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleProcess = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    if (!file || !ranges) return;

    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          const dummyContent = `This is a simulated split result for ${file.name}. Extracted pages: ${ranges}`;
          const blob = new Blob([dummyContent], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          setResult({
            url,
            fileName: `${file.name.split('.')[0]}_split.pdf`
          });
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.fileName;
      link.click();
    }
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Split Completed!</h2>
          <p className="text-slate-500 mb-8">Selected pages have been extracted into a new document.</p>
          
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 max-w-md mx-auto mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{result.fileName}</p>
              <p className="text-xs text-slate-400">PDF Document • {ranges} selected</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <Download className="w-5 h-5" />
              Download Result
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResult(null);
                setRanges('1-2');
              }}
              className="flex items-center justify-center gap-2 px-10 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              Start New
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <div className={`inline-flex items-center justify-center p-4 rounded-2xl ${tool.color} text-white mb-6 shadow-lg`}>
          <Scissors className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Split PDF</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Extract specific page ranges from your PDF document easily.</p>
      </div>

      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 transition-all hover:border-indigo-400 cursor-pointer group flex flex-col items-center justify-center"
        >
          <input 
            type="file" 
            accept=".pdf"
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
          />
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileText className="w-10 h-10 text-indigo-600" />
          </div>
          <p className="text-xl font-bold mb-2">Select PDF file</p>
          <p className="text-slate-400">or drag and drop here</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{file.name}</h3>
                  <p className="text-xs text-slate-400">{(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Document</p>
                </div>
              </div>
              <button 
                onClick={() => setFile(null)}
                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Select Page Ranges</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={ranges}
                      onChange={(e) => setRanges(e.target.value)}
                      placeholder="e.g. 1-5, 8, 11-13"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-mono"
                    />
                    <p className="mt-2 text-xs text-slate-400">
                      Use commas to separate ranges or single pages. Example: <strong>1-3, 5, 10-12</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-indigo-900 text-sm mb-1">Split Preview</h4>
                    <p className="text-xs text-indigo-700 leading-relaxed">
                      We will extract {ranges || '...'} and create a new PDF file for you. Original document remains unchanged.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                disabled={isProcessing || !ranges}
                onClick={handleProcess}
                className="flex items-center gap-2 px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Splitting...
                  </>
                ) : (
                  <>
                    <Scissors className="w-5 h-5" />
                    Split PDF Now
                  </>
                )}
              </button>
            </div>
          </div>

          {isProcessing && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin" />
                  <span className="font-semibold text-slate-700">Extracting pages...</span>
                </div>
                <span className="text-sm font-bold text-indigo-600">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
