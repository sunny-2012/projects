import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LinkBlendProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isButton?: boolean;
}

const LinkBlend: React.FC<LinkBlendProps> = ({ 
  children, 
  className, 
  isButton, 
  ...rest 
}) => {
  const Component = isButton ? 'button' : 'a';
  
  return (
    <Component 
      className={cn(
        "cursor-pointer inline-block text-black no-underline relative transition-all duration-200 ease-[cubic-bezier(0.445,0.05,0.55,0.95)] z-10",
        "after:content-[''] after:bg-[#292524] after:w-[calc(100%+9px)] after:h-[1px] after:absolute after:bottom-[-2px] after:left-[-4px] after:transition-all after:duration-200 after:ease-[cubic-bezier(0.445,0.05,0.55,0.95)]",
        "hover:text-white hover:after:h-[calc(100%+4px)] hover:after:z-[-1]",
        className
      )}
      {...(rest as any)}
    >
      {children}
    </Component>
  );
};

export default LinkBlend;
