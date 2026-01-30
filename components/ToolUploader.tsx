
import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, File, AlertCircle, CheckCircle2, ArrowRight, RefreshCw, Download, FileText, Share2, Eye } from 'lucide-react';
import { Tool, ProcessingState } from '../types';
import { ICON_MAP } from '../constants';

interface ToolUploaderProps {
  tool: Tool;
  onProcess: (files: File[]) => void;
  processingState: ProcessingState;
  onReset: () => void;
}

interface PreviewState {
  file: File | null;
  url: string | null;
}

export const ToolUploader: React.FC<ToolUploaderProps> = ({ tool, onProcess, processingState, onReset }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<PreviewState>({ file: null, url: null });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isProcessing, progress, resultUrl, resultFileName } = processingState;

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview.url) URL.revokeObjectURL(preview.url);
    };
  }, [preview.url]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview({ file, url });
  };

  const closePreview = () => {
    if (preview.url) URL.revokeObjectURL(preview.url);
    setPreview({ file: null, url: null });
  };

  const startProcessing = () => {
    if (files.length > 0) {
      onProcess(files);
    }
  };

  const handleDownload = () => {
    if (resultUrl && resultFileName) {
      const link = document.createElement('a');
      link.href = resultUrl;
      link.download = resultFileName;
      link.click();
    }
  };

  const isSuccess = !isProcessing && progress === 100 && resultUrl;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <div className={`inline-flex items-center justify-center p-4 rounded-2xl ${tool.color} text-white mb-6 shadow-lg`}>
          {React.isValidElement(ICON_MAP[tool.icon]) && React.cloneElement(ICON_MAP[tool.icon] as React.ReactElement, { className: 'w-10 h-10' })}
        </div>
        <h1 className="text-3xl font-bold mb-3">{tool.name}</h1>
        <p className="text-slate-500 max-w-lg mx-auto">{tool.description}</p>
      </div>

      {!isSuccess ? (
        <>
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 transition-all hover:border-indigo-400 group">
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              disabled={isProcessing}
            />
            
            {files.length === 0 ? (
              <div 
                className="flex flex-col items-center justify-center py-12 cursor-pointer"
                onClick={() => !isProcessing && fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-lg font-semibold mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-slate-400">PDF, JPG, DOCX, XLSX, PPTX (Max 25MB)</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-500">{files.length} Files Selected</span>
                  {!isProcessing && (
                    <button 
                      onClick={() => setFiles([])}
                      className="text-sm text-red-500 hover:text-red-600 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group relative">
                      <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
                        {file.type.startsWith('image/') ? (
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt="thumbnail" 
                            className="w-full h-full object-cover"
                            onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                          />
                        ) : (
                          <File className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                        <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handlePreview(file)}
                          className="p-1.5 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {!isProcessing && (
                          <button 
                            onClick={() => removeFile(i)}
                            className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {!isProcessing && (
                    <div 
                      className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-400">Add More</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex justify-center">
                  <button
                    disabled={isProcessing}
                    onClick={startProcessing}
                    className={`flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isProcessing ? 'Processing...' : 'Start Conversion'}
                    {!isProcessing && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {isProcessing && (
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin" />
                  <span className="font-semibold">{processingState.message}</span>
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
        </>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Files Ready!</h2>
          <p className="text-slate-500 mb-8">Your document has been processed and is ready for download.</p>
          
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 max-w-md mx-auto mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{resultFileName}</p>
              <p className="text-xs text-slate-400">Processed Document • 1.2 MB</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <Download className="w-5 h-5" />
              Download Now
            </button>
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-10 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              Start New
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview.file && preview.url && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 truncate max-w-xs">{preview.file.name}</h3>
                  <p className="text-xs text-slate-400">File Preview</p>
                </div>
              </div>
              <button onClick={closePreview} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-slate-50 p-4 flex items-center justify-center">
              {preview.file.type.startsWith('image/') ? (
                <img src={preview.url} alt="preview" className="max-w-full h-auto rounded-lg shadow-sm" />
              ) : preview.file.type === 'application/pdf' ? (
                <iframe 
                  src={`${preview.url}#toolbar=0&navpanes=0&scrollbar=0`} 
                  className="w-full h-[70vh] rounded-lg border-0 bg-white"
                  title="PDF Preview"
                />
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                    <File className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium">Preview not available for this file type.</p>
                  <p className="text-xs text-slate-400 mt-1">Don't worry, we can still process it!</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={closePreview}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
