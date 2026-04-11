import React, { useId } from 'react';
import { cn } from '@/lib/utils'; // Assuming a utility like clsx/tailwind-merge exists, else we can just use template literals. Wait, I should avoid importing aliases if I'm not sure. I'll just use simple template string.

export default function GrainyGradient({
  colorBg = "#6cf901",
  colorA = "#EDB74D",
  colorB = "#EB6666",
  colorC = "#6FB18A",
  className,
  children,
  ...rest
}: {
  colorBg?: string;
  colorA?: string;
  colorB?: string;
  colorC?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  // We use useId() so it's SSR safe and doesn't cause hydration mismatch like Math.random() did.
  const filterId = useId().replace(/:/g, ''); 
  const filterUrlId = `url(#${filterId})`;

  return (
    <div className={`grainy-gradient relative overflow-hidden ${className || ''}`} {...rest}>
      <svg className="hidden">
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch"></feTurbulence>
          <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix>
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise"></feComposite>
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen"></feBlend>
        </filter>
      </svg>
      <div className="blob-cont absolute flex flex-col justify-center items-center -z-20 h-full w-full">
        <div 
          className="color-a blob absolute rounded-[100px] blur-[80px] opacity-50 top-[200px] left-[100px] h-[200px] w-[200px]"
          style={{ backgroundColor: colorA, animation: 'gg-color-a 8s infinite ease' }}
        ></div>
        <div 
          className="color-c blob absolute rounded-[100px] blur-[80px] opacity-50 right-0 top-[300px] h-[250px] w-[200px]"
          style={{ backgroundColor: colorC, animation: 'gg-color-c 8s infinite linear' }}
        ></div>
        <div 
          className="color-b blob absolute rounded-[100px] blur-[80px] opacity-50 top-[80px] right-[-20px] h-[200px] w-[250px]"
          style={{ backgroundColor: colorB, animation: 'gg-color-b 8s infinite ease' }}
        ></div>
      </div>
      {children}

      <style>{`
        .grainy-gradient {
          border-radius: inherit;
        }
        .grainy-gradient::before,
        .grainy-gradient::after {
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 40%;
          border-radius: inherit;
        }
        .grainy-gradient::before {
          background: ${colorBg};
          filter: ${filterUrlId};
        }

        @keyframes gg-color-a {
          0% { top: 200px; left: 100px; transform: scale(1); }
          30% { top: 300px; left: 150px; transform: scale(1.2); }
          60% { top: 100px; left: 200px; transform: scale(1.3); }
          100% { top: 200px; left: 100px; transform: scale(1); }
        }
        @keyframes gg-color-b {
          0% { top: 80px; right: -20px; transform: scale(1.2); }
          30% { top: 300px; right: -20px; transform: scale(1); }
          60% { top: 200px; right: 100px; transform: scale(1); }
          100% { top: 80px; right: -20px; transform: scale(1.2); }
        }
        @keyframes gg-color-c {
          0% { top: 250px; right: 0px; transform: scale(1); }
          30% { top: 150px; right: 150px; transform: scale(1.4); }
          60% { top: 250px; right: 100px; transform: scale(1); }
          100% { top: 250px; right: 0px; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
