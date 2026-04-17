import React from 'react';

const BackgroundTexture: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
      {/* Primary Atmospheric Glow (Top Right) */}
      <div 
        className="absolute -top-[10%] -right-[10%] h-[80vw] w-[80vw] rounded-full opacity-[0.15] blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)',
        }}
      />
      
      {/* Secondary Soft Warmth (Bottom Left) */}
      <div 
        className="absolute -bottom-[20%] -left-[10%] h-[70vw] w-[70vw] rounded-full opacity-[0.08] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(253, 224, 71, 0.3) 0%, rgba(253, 224, 71, 0) 70%)',
        }}
      />

      {/* Deep Blue Mist (Center) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100vh] w-[100vw] rounded-full opacity-[0.05] blur-[180px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 60%)',
        }}
      />
      
      {/* Sophisticated Grain Overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay pointer-events-none">
        <filter id="premiumNoise">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="4" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#premiumNoise)" />
      </svg>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
    </div>
  );
};

export default BackgroundTexture;

