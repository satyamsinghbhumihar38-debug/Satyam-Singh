
export type ToolCategory = 'convert' | 'edit' | 'security' | 'ai' | 'image';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  color: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  message: string;
  result?: any;
  resultUrl?: string;
  resultFileName?: string;
}

export interface SlideContent {
  title: string;
  content: string[];
}
