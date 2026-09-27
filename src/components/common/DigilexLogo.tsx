import React from 'react';

interface DigilexLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export const DigilexLogo: React.FC<DigilexLogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Sleek Minimalist Geometric Interlocking Nodes Icon */}
      <div className={`relative shrink-0 ${iconSizes[size]} group`}>
        {/* Subtle Ambient Metallic Cyan & Ink Wash Halo */}
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#06B6D4]/20 via-[#22D3EE]/10 to-[#FAF8F5]/10 blur-sm opacity-60 group-hover:opacity-100 transition-all duration-300" />

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Ink Wash Slate Background Gradient */}
            <linearGradient id="inkWashPlate" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1C1E24" />
              <stop offset="50%" stopColor="#121317" />
              <stop offset="100%" stopColor="#0B0C0E" />
            </linearGradient>

            {/* Premium Metallic Cyan Gradient */}
            <linearGradient id="metallicCyan" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ECFEFF" />
              <stop offset="25%" stopColor="#67E8F9" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#085166" />
            </linearGradient>

            {/* Crisp Secondary Cyan Highlight */}
            <linearGradient id="cyanHighlight" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="50%" stopColor="#0891B2" />
              <stop offset="100%" stopColor="#FAF8F5" />
            </linearGradient>

            {/* Soft Ivory Node Fill */}
            <linearGradient id="ivoryMetallic" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D4D0C8" />
            </linearGradient>

            {/* Sharp Edge Border Gradient */}
            <linearGradient id="sharpBorder" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3A3D46" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Hexagonal / Diamond Sharp Edge Security Contour */}
          <polygon
            points="50,6 88,28 88,72 50,94 12,72 12,28"
            fill="url(#inkWashPlate)"
            stroke="url(#sharpBorder)"
            strokeWidth="2.5"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
          />

          {/* Inner Precision Grid Guide */}
          <polygon
            points="50,14 80,32 80,68 50,86 20,68 20,32"
            fill="none"
            stroke="#262930"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* Interlocking Node Mesh Line 1: Security Shield Triangle (Node 1 -> Node 3 -> Node 5) */}
          <path
            d="M50 20 L76 65 L24 65 Z"
            fill="none"
            stroke="url(#metallicCyan)"
            strokeWidth="3"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
          />

          {/* Interlocking Node Mesh Line 2: Financial Growth Inverted Triangle (Node 2 -> Node 4 -> Node 6) */}
          <path
            d="M50 80 L24 35 L76 35 Z"
            fill="none"
            stroke="url(#cyanHighlight)"
            strokeWidth="2.5"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
          />

          {/* Central Intersecting Financial Integration Axis */}
          <path
            d="M50 20 L50 80 M24 35 L76 65 M76 35 L24 65"
            stroke="url(#metallicCyan)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* Sharp Edge Interlocking Node Vertices */}
          {/* Top Node (Security Peak) */}
          <circle cx="50" cy="20" r="3.5" fill="url(#metallicCyan)" stroke="#0E1015" strokeWidth="1.5" />
          
          {/* Bottom Node (Quant Baseline) */}
          <circle cx="50" cy="80" r="3.5" fill="url(#metallicCyan)" stroke="#0E1015" strokeWidth="1.5" />

          {/* Upper Left Node (Financial Vault) */}
          <circle cx="24" cy="35" r="3" fill="#FAF8F5" stroke="#0E1015" strokeWidth="1" />

          {/* Upper Right Node (Cyber Threat Intelligence) */}
          <circle cx="76" cy="35" r="3" fill="#FAF8F5" stroke="#0E1015" strokeWidth="1" />

          {/* Lower Left Node (Risk Analytics) */}
          <circle cx="24" cy="65" r="3" fill="url(#metallicCyan)" stroke="#0E1015" strokeWidth="1" />

          {/* Lower Right Node (Asset Value) */}
          <circle cx="76" cy="65" r="3" fill="url(#metallicCyan)" stroke="#0E1015" strokeWidth="1" />

          {/* Central Interlocking Synergy Core (The AI Risk Engine Node) */}
          <polygon
            points="50,42 57,50 50,58 43,50"
            fill="url(#ivoryMetallic)"
            stroke="url(#metallicCyan)"
            strokeWidth="1.5"
          />

          {/* Active Cyan Pulse Effect on Central Core */}
          <circle
            cx="50"
            cy="50"
            r="4"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="1.5"
            className="animate-ping"
            style={{ transformOrigin: '50px 50px', animationDuration: '3s' }}
          />
        </svg>
      </div>

      {/* Brand Text Block */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-wider text-[#FAF8F5] font-sans ${textSizes[size]} flex items-center`}>
              DIGI<span className="text-[#22D3EE]">LEX</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-pulse" />
          </div>
          {showTagline && (
            <span className="text-[9px] lg:text-[10px] font-mono font-medium tracking-widest text-[#8A8F9B] uppercase mt-1">
              Cyber Risk Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
};

