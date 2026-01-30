
import React from 'react';
import { 
  FileText, Image, FilePlus, FileMinus, Minimize, Presentation, 
  FileSpreadsheet, Lock, Unlock, Hash, Search, Crop, 
  PenTool, ShieldCheck, HelpCircle, Share2, Layers, Type,
  Camera, Code, RefreshCw, Wand2, BookOpen, MessageSquarePlus
} from 'lucide-react';
import { Tool } from './types';

export const TOOLS: Tool[] = [
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to high-quality JPG images.', icon: 'FileText', category: 'convert', color: 'bg-orange-500' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert your JPG images to a single PDF document.', icon: 'Image', category: 'convert', color: 'bg-blue-500' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Make DOC and DOCX files easy to read by converting them to PDF.', icon: 'FilePlus', category: 'convert', color: 'bg-indigo-600' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to editable DOCX documents.', icon: 'FileMinus', category: 'convert', color: 'bg-sky-500' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Make Excel spreadsheets readable by converting them to PDF.', icon: 'FileSpreadsheet', category: 'convert', color: 'bg-green-600' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract data from PDF into Excel spreadsheets.', icon: 'FileSpreadsheet', category: 'convert', color: 'bg-emerald-500' },
  { id: 'ppt-to-pdf', name: 'PPT to PDF', description: 'Convert PowerPoint presentations to PDF.', icon: 'Presentation', category: 'convert', color: 'bg-red-500' },
  { id: 'pdf-to-ppt', name: 'PDF to PPT', description: 'Turn PDF documents into editable PPT slides.', icon: 'Presentation', category: 'convert', color: 'bg-rose-500' },
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDFs into one document.', icon: 'Layers', category: 'edit', color: 'bg-violet-500' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Separate pages or extract specific sections from a PDF.', icon: 'Minimize', category: 'edit', color: 'bg-purple-500' },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce the file size of your PDF without losing quality.', icon: 'Minimize', category: 'edit', color: 'bg-teal-500' },
  { id: 'edit-pdf', name: 'Edit PDF', description: 'Add text, images, and shapes to your PDF file.', icon: 'PenTool', category: 'edit', color: 'bg-yellow-500' },
  { id: 'sign-pdf', name: 'Sign PDF', description: 'Sign yourself or request electronic signatures from others.', icon: 'ShieldCheck', category: 'edit', color: 'bg-cyan-600' },
  { id: 'watermark', name: 'Watermark', description: 'Stamp an image or text over your PDF.', icon: 'Type', category: 'edit', color: 'bg-fuchsia-500' },
  { id: 'scan-pdf', name: 'Scan PDF', description: 'Scan documents using your camera and save as PDF.', icon: 'Camera', category: 'image', color: 'bg-slate-700' },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert web pages or HTML code to PDF.', icon: 'Code', category: 'convert', color: 'bg-gray-600' },
  { id: 'protect-pdf', name: 'Protect PDF', description: 'Encrypt your PDF with a password.', icon: 'Lock', category: 'security', color: 'bg-zinc-800' },
  { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password protection from a PDF.', icon: 'Unlock', category: 'security', color: 'bg-neutral-600' },
  { id: 'repair-pdf', name: 'Repair PDF', description: 'Fix damaged PDF documents and recover data.', icon: 'RefreshCw', category: 'edit', color: 'bg-red-700' },
  { id: 'page-numbers', name: 'Page Numbers', description: 'Add page numbers to your PDF easily.', icon: 'Hash', category: 'edit', color: 'bg-blue-400' },
  { id: 'ocr-pdf', name: 'OCR PDF', description: 'Convert scanned PDF and images to searchable text.', icon: 'Search', category: 'ai', color: 'bg-indigo-400' },
  { id: 'compare-pdf', name: 'Compare PDF', description: 'Highlight differences between two versions of a PDF.', icon: 'BookOpen', category: 'edit', color: 'bg-stone-500' },
  { id: 'crop-pdf', name: 'Crop PDF', description: 'Trim the margins of your PDF document.', icon: 'Crop', category: 'edit', color: 'bg-lime-600' },
  { id: 'image-enhancer', name: 'AI Image Enhancer', description: 'Improve image quality using AI.', icon: 'Wand2', category: 'ai', color: 'bg-pink-500' },
  { id: 'ppt-maker', name: 'AI PPT Maker', description: 'Generate professional presentations from text using AI.', icon: 'MessageSquarePlus', category: 'ai', color: 'bg-orange-600' },
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6" />,
  Image: <Image className="w-6 h-6" />,
  FilePlus: <FilePlus className="w-6 h-6" />,
  FileMinus: <FileMinus className="w-6 h-6" />,
  Minimize: <Minimize className="w-6 h-6" />,
  Presentation: <Presentation className="w-6 h-6" />,
  FileSpreadsheet: <FileSpreadsheet className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
  Unlock: <Unlock className="w-6 h-6" />,
  Hash: <Hash className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  Crop: <Crop className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  HelpCircle: <HelpCircle className="w-6 h-6" />,
  Share2: <Share2 className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Type: <Type className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  RefreshCw: <RefreshCw className="w-6 h-6" />,
  Wand2: <Wand2 className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  MessageSquarePlus: <MessageSquarePlus className="w-6 h-6" />,
};
