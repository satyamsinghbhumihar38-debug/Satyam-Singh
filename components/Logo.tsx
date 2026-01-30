
import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brain Circuit Icon */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#2962FF" />
            </linearGradient>
          </defs>
          
          {/* Left Brain Half */}
          <path 
            d="M48 20C35 20 25 30 25 45C25 55 30 65 40 75C42 77 45 78 48 78V20Z" 
            fill="url(#logo-gradient)" 
            opacity="0.9"
          />
          {/* Right Brain Half */}
          <path 
            d="M52 20C65 20 75 30 75 45C75 55 70 65 60 75C58 77 55 78 52 78V20Z" 
            fill="url(#logo-gradient)"
          />
          
          {/* Circuit Details - Left */}
          <circle cx="38" cy="35" r="2" fill="white" />
          <circle cx="32" cy="50" r="2" fill="white" />
          <circle cx="40" cy="62" r="2" fill="white" />
          <path d="M38 35L44 35M32 50L44 50M40 62L44 62" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Circuit Details - Right */}
          <circle cx="62" cy="35" r="2" fill="white" />
          <circle cx="68" cy="50" r="2" fill="white" />
          <circle cx="60" cy="62" r="2" fill="white" />
          <path d="M62 35L56 35M68 50L56 50M60 62L56 62" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Bottom Nodes */}
          <circle cx="48" cy="85" r="3" fill="url(#logo-gradient)" />
          <circle cx="52" cy="85" r="3" fill="url(#logo-gradient)" />
        </svg>
      </div>

      {!iconOnly && (
        <span className="font-extrabold text-2xl tracking-tighter flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-700">
            OMNI DOCS AI
          </span>
        </span>
      )}
    </div>
  );
};
