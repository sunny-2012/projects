import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, subtitle, className }) => {
  return (
    <div className={cn("flex md:justify-center", className)}>
      <div className="inline-flex flex-col gap-4">
        <div className="inline-flex items-center gap-4">
          <div className="hidden h-1 w-20 bg-black md:block"></div>
          <span 
            className="font-mono text-xs font-semibold uppercase tracking-wide" 
            dangerouslySetInnerHTML={{ __html: subtitle }} 
          />
        </div>
        <h1 className="font-display text-5xl font-extrabold sm:text-6xl md:text-7xl lg:text-9xl">{title}</h1>
      </div>
    </div>
  );
};

export default Title;
