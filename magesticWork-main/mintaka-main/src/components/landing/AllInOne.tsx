'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Note: DrawSVGPlugin is a Club GSAP premium plugin. 
// If it's not installed in the Next.js project's gsap package, this might cause an error.
// Assuming it's available or we gracefully degrade.
let DrawSVGPlugin: any;
try {
  DrawSVGPlugin = require('gsap/DrawSVGPlugin').DrawSVGPlugin;
} catch (e) {
  console.warn("GSAP DrawSVGPlugin is missing. Animation will fall back to simple opacity.");
}

interface AllInOneProps {
  className?: string;
}

export default function AllInOne({ className }: AllInOneProps) {
  const linePathRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (DrawSVGPlugin) {
      gsap.registerPlugin(DrawSVGPlugin);
    }

    if (linePathRef.current && wrapperRef.current) {
      if (DrawSVGPlugin) {
        gsap.set(linePathRef.current, { drawSVG: 0 });
        gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            scrub: 1,
            start: "top center",
            end: "bottom center",
          },
          defaults: { ease: "none" },
        }).to(
          linePathRef.current,
          {
            drawSVG: "100%",
          },
          0
        );
      } else {
        // Fallback if DrawSVGPlugin isn't available
        gsap.set(linePathRef.current, { strokeDasharray: 2000, strokeDashoffset: 2000 });
        gsap.to(linePathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            scrub: 1,
            start: "top center",
            end: "bottom center",
          }
        });
      }
    }
  }, []);

  return (
    <section id="all-in-one" className={`all-in-one-section relative text-white ${className || ''}`}>
      <div className="wrapper col-span-12 min-h-screen w-full">
        <div ref={wrapperRef} className="line-animation-wrapper h-full min-h-[110rem]">
          <svg id="all-in-one-svg" className="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1200">
            <path
              ref={linePathRef}
              className="all-in-one-line-path"
              d="M -5 0 Q 334 135 189 164 T 227 362 A 1 1 0 0 0 302 268 A 1 1 0 0 0 215 410 C 274 443 324 481 322 552 C 310 703 365 610 983 719"
              fill="none"
              stroke="white"
              strokeWidth="5px"
            />
          </svg>
        </div>

        <div className="min-h-[150rem]">
          <div>
            <h2>Best thing?</h2>
          </div>
          <div>
            <h3>It's all in 1 package</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
