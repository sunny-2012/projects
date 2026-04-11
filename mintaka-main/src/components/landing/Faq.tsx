'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FaqProps {
  className?: string;
}

const AccordionItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                duration: 0.5,
                ease: "power3.inOut",
            });
        }
    }, [isOpen]);

    return (
        <div className="faq-item border-b border-zinc-800/50 overflow-hidden reveal">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-8 text-left group focus:outline-none"
            >
                <div className="flex items-center gap-6">
                    <span className="text-zinc-600 font-mono text-sm">0{index + 1}</span>
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-200 group-hover:text-white transition-colors">{question}</h3>
                </div>
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className={cn("absolute w-full h-[2px] bg-zinc-500 transition-transform duration-500", isOpen ? "rotate-0" : "rotate-90")} />
                    <div className="absolute w-full h-[2px] bg-zinc-500" />
                </div>
            </button>
            <div ref={contentRef} className="h-0 opacity-0">
                <p className="pb-8 pl-14 text-lg text-zinc-400 font-light leading-relaxed max-w-3xl">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const Faq: React.FC<FaqProps> = ({ className }) => {
  const t = useTranslations();
  const faqPathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const faqs = Array.from({ length: 10 }).map((_, i) => ({
    question: t(`faqs.question${i + 1}`),
    answer: t(`faqs.answer${i + 1}`),
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    // Trigger stagger reveal for all FAQ items
    const items = sectionRef.current.querySelectorAll('.faq-item');
    gsap.fromTo(items, {
        opacity: 0,
        y: 30
    }, {
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

    // FAQ Section Clip Animation (Enhanced)
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom center",
        end: "bottom top",
        scrub: 1,
      },
      clipPath: "inset(4vw round 4rem)",
    });

    if (faqPathRef.current) {
        const path = faqPathRef.current;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.timeline({
            scrollTrigger: {
                trigger: ".faq-more-questions",
                start: "top 80%",
            },
        })
        .to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut"
        });
    }
  }, []);

  return (
    <section 
        ref={sectionRef}
        id="faq" 
        className={cn("section faq-section relative bg-zinc-950 text-white py-32", className)}
        style={{ clipPath: "inset(0% round 0)" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
            <div className="md:col-span-4 lg:col-span-3">
                <div className="sticky top-32">
                    <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-4 block">Help Center</span>
                    <h2 className="font-display text-5xl md:text-6xl lg:text-8xl font-black uppercase leading-tight italic">FAQ's</h2>
                    <p className="text-zinc-500 mt-6 text-lg hidden md:block">Everything you need to know about our process and services.</p>
                </div>
            </div>
            <div className="md:col-span-8 lg:col-span-9 flex flex-col">
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} {...faq} index={i} />
                ))}
            </div>
        </div>

        <div className="faq-more-questions flex flex-col items-center justify-center gap-12 mt-40">
            <div className="relative flex flex-col items-center">
                <h4 className="text-white text-2xl font-medium mb-8 italic">{t("faq.otherquestions")}</h4>
                <div className="relative w-24 h-24 mb-12">
                    <svg
                        className="absolute inset-0 w-full h-full"
                        fill="transparent"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="30px"
                        viewBox="0 0 800 800"
                    >
                         <path
                            d="M779.3,519.1c-16.3,0-31,0-47.3-1.6c62-154.9,101.1-415.9-112.5-458.3C569,47.8,520,54.3,485.8,82
                            c-58.7-35.9-132.1-53.8-195.7-45.7c-42.4,4.9-71.8,32.6-89.7,68.5c-39.1-13-81.5-17.9-110.9-4.9C-21.4,147.3-29.5,294,66.7,362.5
                            c9.8,6.5,17.9-6.5,11.4-14.7C-1.8,259.8,40.6,82,180.8,139.1c1.6,1.6,4.9,1.6,6.5,3.3c-11.4,44-8.2,94.6,11.4,130.5
                            c42.4,78.3,145.1,26.1,125.6-53.8c-9.8-37.5-45.7-73.4-89.7-96.2c13-26.1,34.2-45.7,70.1-47.3c48.9-1.6,99.5,9.8,141.9,34.2
                            c4.9,3.3,8.2,4.9,13,8.2c-4.9,11.4-9.8,24.5-13,39.1c-9.8,48.9,1.6,146.8,55.4,171.2c66.9,29.4,102.7-75,84.8-123.9
                            c-13-37.5-39.1-70.1-70.1-96.2c13-9.8,31-14.7,53.8-13c225,16.3,177.8,274,119.1,422.4c-16.3-1.6-34.2-4.9-52.2-6.5
                            c-3.3,0-6.5,0-8.2,1.6c-9.8-8.2-27.7-4.9-27.7,11.4c-3.3,71.8,21.2,156.6,40.8,226.7c4.9,16.3,31,21.2,39.1,4.9
                            c35.9-70.1,76.6-135.4,115.8-203.8C805.4,538.7,794,519.1,779.3,519.1z M285.2,220.6c21.2,52.2-47.3,65.2-58.7,26.1
                            c-4.9-16.3-8.2-34.2-8.2-52.2c0-11.4,1.6-22.8,3.3-34.2C247.7,175,272.2,196.2,285.2,220.6z M492.3,135.8
                            c27.7,19.6,50.6,45.7,57.1,76.6c1.6,11.4,1.6,83.2-24.5,81.5c-34.2-1.6-44-83.2-44-106C480.9,170.1,484.2,152.2,492.3,135.8z
                             M642.4,540.3c32.6,8.2,66.9,14.7,101.1,19.6c-24.5,40.8-48.9,81.5-71.8,123.9C663.6,634.9,657,584.3,642.4,540.3z"
                        />
                    </svg>
                    <svg
                        className="absolute inset-0 w-full h-full"
                        fill="transparent"
                        stroke="#fff"
                        strokeWidth="30px"
                        viewBox="0 0 800 800"
                    >
                         <path
                            ref={faqPathRef}
                            d="M779.3,519.1c-16.3,0-31,0-47.3-1.6c62-154.9,101.1-415.9-112.5-458.3C569,47.8,520,54.3,485.8,82
                            c-58.7-35.9-132.1-53.8-195.7-45.7c-42.4,4.9-71.8,32.6-89.7,68.5c-39.1-13-81.5-17.9-110.9-4.9C-21.4,147.3-29.5,294,66.7,362.5
                            c9.8,6.5,17.9-6.5,11.4-14.7C-1.8,259.8,40.6,82,180.8,139.1c1.6,1.6,4.9,1.6,6.5,3.3c-11.4,44-8.2,94.6,11.4,130.5
                            c42.4,78.3,145.1,26.1,125.6-53.8c-9.8-37.5-45.7-73.4-89.7-96.2c13-26.1,34.2-45.7,70.1-47.3c48.9-1.6,99.5,9.8,141.9,34.2
                            c4.9,3.3,8.2,4.9,13,8.2c-4.9,11.4-9.8,24.5-13,39.1c-9.8,48.9,1.6,146.8,55.4,171.2c66.9,29.4,102.7-75,84.8-123.9
                            c-13-37.5-39.1-70.1-70.1-96.2c13-9.8,31-14.7,53.8-13c225,16.3,177.8,274,119.1,422.4c-16.3-1.6-34.2-4.9-52.2-6.5
                            c-3.3,0-6.5,0-8.2,1.6c-9.8-8.2-27.7-4.9-27.7,11.4c-3.3,71.8,21.2,156.6,40.8,226.7c4.9,16.3,31,21.2,39.1,4.9
                            c35.9-70.1,76.6-135.4,115.8-203.8C805.4,538.7,794,519.1,779.3,519.1z M285.2,220.6c21.2,52.2-47.3,65.2-58.7,26.1
                            c-4.9-16.3-8.2-34.2-8.2-52.2c0-11.4,1.6-22.8,3.3-34.2C247.7,175,272.2,196.2,285.2,220.6z M492.3,135.8
                            c27.7,19.6,50.6,45.7,57.1,76.6c1.6,11.4,1.6,83.2-24.5,81.5c-34.2-1.6-44-83.2-44-106C480.9,170.1,484.2,152.2,492.3,135.8z
                             M642.4,540.3c32.6,8.2,66.9,14.7,101.1,19.6c-24.5,40.8-48.9,81.5-71.8,123.9C663.6,634.9,657,584.3,642.4,540.3z"
                        />
                    </svg>
                </div>
            </div>
            
            <div 
                className="group relative inline-flex p-[1px] rounded-full overflow-hidden transition-all duration-300 hover:scale-105" 
                data-cursor-hover
            >
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-white/50 to-zinc-800 animate-gradient-x"></div>
                <Link
                    className="relative px-12 py-5 bg-zinc-950 rounded-full text-xl font-bold transition-all hover:bg-transparent"
                    href="/contact/"
                >
                    {t("contactus")}
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
