'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TaglineProps {
  className?: string;
}

const Tagline: React.FC<TaglineProps> = ({ className }) => {
  const t = useTranslations();
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Arrow Animation Fallback for DrawSVG and MotionPath
    if (arrowPathRef.current && arrowRef.current) {
      const path = arrowPathRef.current;
      const length = path.getTotalLength();

      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.timeline({
        scrollTrigger: {
          trigger: ".tagline-arrows",
          start: "center bottom",
          end: "center center",
          scrub: 1,
        },
      })
      .to(path, { strokeDashoffset: 0, ease: "none" })
      .to(arrowRef.current, { opacity: 1, duration: 0.1 });
      
      // MotionPath fallback is harder, so we'll just show the arrow at the end for now
    }

    // Tagline Reveal Animation
    if (taglineRef.current) {
      // Manual line splitting would be better, but for now we'll animate the whole block
      // Or we can try a simple word split
      const text = taglineRef.current.innerText;
      const words = text.split(' ');
      taglineRef.current.innerHTML = words.map(word => `<span class="inline-block mr-[0.3em] reveal-word">${word}</span>`).join('');

      const revealWords = taglineRef.current.querySelectorAll('.reveal-word');
      
      revealWords.forEach((word) => {
        gsap.to(word, {
          backgroundPositionX: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: word,
            scrub: 1,
            start: "top bottom-=20%",
            end: "bottom bottom-=10%",
          },
        });
      });
    }
  }, []);

  return (
    <div 
        id="smooth-wrapper" 
        className={cn("section tagline-section relative bg-zinc-900 text-white min-h-[50vh] flex flex-col justify-center gap-20 py-20", className)}
    >
      <div className="tagline-arrows flex justify-center">
        <svg
          strokeLinecap="round"
          className="h-60 w-60 rotate-45 md:rotate-0 lg:w-100"
          strokeLinejoin="round"
          viewBox="0 0 550 330"
        >
          <path
            ref={arrowPathRef}
            id="tagline-arrow-path"
            fill="none"
            stroke="#fff"
            strokeWidth="8"
            strokeLinecap="round"
            d="M8.5,7.8C46.3,67,121.7,185.5,265.5,185.9c42.8,0.1,120.5-55.9-25.2-120.3
            C79-5.8,177.6,164.1,222.3,207.7c59.1,49.9,83.8,62.1,162.6,96.8"
          />
          <path 
            ref={arrowRef}
            className="opacity-0" 
            id="tagline-arrow" 
            fill="white"
            stroke="white" 
            strokeWidth="2" 
            d="M384.9 304.5l-22-12 8-22z"
          />
        </svg>
      </div>
      <div className="text col-span-12 flex justify-center font-light px-6">
        <p 
            ref={taglineRef} 
            id="services-tagline" 
            className="max-w-5xl text-center text-4xl md:text-5xl lg:text-7xl leading-tight"
        >
          {t("tagline")}
        </p>
      </div>

      <style jsx>{`
        :global(.reveal-word) {
          background: linear-gradient(to right, rgb(255, 255, 255) 50%, rgb(37, 37, 37) 50%);
          background-size: 200% 100%;
          background-position-x: 100%;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default Tagline;
