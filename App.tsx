
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ToolsGrid } from './components/ToolsGrid';
import { ToolUploader } from './components/ToolUploader';
import { AIPPTMaker } from './components/AIPPTMaker';
import { SplitPDFTool } from './components/SplitPDFTool';
import { AuthModal } from './components/AuthModal';
import { Logo } from './components/Logo';
import { TOOLS, ICON_MAP } from './constants';
import { Tool, ProcessingState } from './types';
import { Menu, X, Search, Bell, User, LayoutGrid, LogIn } from 'lucide-react';
import { performOCR, enhanceImage } from './services/gemini';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    message: ''
  });

  const activeTool = activeToolId ? TOOLS.find(t => t.id === activeToolId) : null;

  const handleToolSelect = (id: string | null) => {
    setActiveToolId(id);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setProcessingState({ isProcessing: false, progress: 0, message: '' });
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
  };

  const handleProcess = async (files: File[]) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setProcessingState({ isProcessing: true, progress: 0, message: 'Uploading...' });

    // AI Tools Special Handling
    if (activeToolId === 'ocr-pdf') {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        setProcessingState(prev => ({ ...prev, progress: 50, message: 'Analyzing with AI...' }));
        try {
          const text = await performOCR(reader.result as string, file.type);
          
          // Create a downloadable text file
          const blob = new Blob([text], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          
          setProcessingState({
            isProcessing: false,
            progress: 100,
            message: 'Completed',
            result: text,
            resultUrl: url,
            resultFileName: `extracted_${file.name.split('.')[0]}.txt`
          });
        } catch (e) {
          alert("OCR Failed. Please try a different image.");
          setProcessingState({ isProcessing: false, progress: 0, message: '' });
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    if (activeToolId === 'image-enhancer') {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        setProcessingState(prev => ({ ...prev, progress: 50, message: 'Enhancing with AI...' }));
        try {
          const result = await enhanceImage(reader.result as string, file.type, "");
          if (result) {
            setProcessingState({
              isProcessing: false,
              progress: 100,
              message: 'Completed',
              resultUrl: result,
              resultFileName: `enhanced_${file.name}`
            });
          }
        } catch (e) {
          alert("Enhancement failed.");
          setProcessingState({ isProcessing: false, progress: 0, message: '' });
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // Default Simulation for other tools with downloadable result
    const interval = setInterval(() => {
      setProcessingState(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          
          // Generate a dummy blob for download simulation
          const dummyContent = `This is a processed result from OMNI DOCS AI for tool: ${activeTool?.name}`;
          const blob = new Blob([dummyContent], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);

          return { 
            ...prev, 
            progress: 100, 
            message: 'Done!',
            resultUrl: url,
            resultFileName: `OmniDocs_${activeToolId}_${Date.now()}.pdf`
          };
        }
        return { 
          ...prev, 
          progress: prev.progress + 10, 
          message: prev.progress < 30 ? 'Uploading...' : prev.progress < 70 ? 'Converting...' : 'Finalizing...' 
        };
      });
    }, 400);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeToolId={activeToolId} onToolSelect={handleToolSelect} />
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="md:hidden">
              <Logo iconOnly className="scale-75 origin-left" />
            </div>
            <div className="relative max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tools..."
                className="bg-slate-50 border-0 rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-indigo-600 focus:w-80 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            {user ? (
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                  <p className="text-xs text-slate-400">Pro Account</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:border-indigo-400 transition-colors">
                  <img src="https://picsum.photos/seed/docpro/100/100" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={() => setUser(null)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          {activeToolId === null ? (
            <ToolsGrid onToolSelect={handleToolSelect} />
          ) : activeToolId === 'ppt-maker' ? (
            <AIPPTMaker />
          ) : activeToolId === 'split-pdf' && activeTool ? (
            <SplitPDFTool 
              tool={activeTool} 
              onReset={() => handleToolSelect(null)} 
              user={user}
              onAuthRequired={() => setIsAuthModalOpen(true)}
            />
          ) : activeTool ? (
            <ToolUploader 
              tool={activeTool} 
              onProcess={handleProcess} 
              processingState={processingState}
              onReset={() => setProcessingState({ isProcessing: false, progress: 0, message: '' })}
            />
          ) : null}
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div 
              className="w-80 bg-white h-full shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div onClick={() => handleToolSelect(null)}>
                  <Logo />
                </div>
                <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6 text-slate-400" /></button>
              </div>
              <nav className="p-4 space-y-1">
                {TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolSelect(tool.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-semibold ${
                      activeToolId === tool.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={activeToolId === tool.id ? 'text-indigo-600' : 'text-slate-400'}>
                      {ICON_MAP[tool.icon]}
                    </div>
                    {tool.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={handleLogin}
        />
      </main>
    </div>
  );
};

export default App;
