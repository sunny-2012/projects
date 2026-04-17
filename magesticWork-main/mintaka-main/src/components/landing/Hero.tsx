'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LinkBlend from '@/components/global/LinkBlend';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const Hero: React.FC = () => {
    const t = useTranslations('hero');
    const headerRef = useRef<HTMLHeadingElement>(null);
    const rotatorRef = useRef<HTMLSpanElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // Header Reveal Animation
        if (headerRef.current) {
            const spans = headerRef.current.querySelectorAll('span:first-child');
            gsap.fromTo(spans, {
                yPercent: 100,
                opacity: 0,
                skewY: 10
            }, {
                duration: 1.5,
                yPercent: 0,
                opacity: 1,
                skewY: 0,
                ease: "expo.out",
                stagger: 0.1,
                delay: 0.2
            });
            gsap.set(headerRef.current, { visibility: "visible" });
        }

        // Parallax Effect for the Section
        if (sectionRef.current) {
            gsap.to(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                yPercent: 20,
                opacity: 0.8
            });
        }

        // Improved Rotator Animation with Fluidity
        if (rotatorRef.current) {
            const words = Array.from(rotatorRef.current.children) as HTMLElement[];
            if (words.length > 0) {
                const rotatorTimeline = gsap.timeline({ repeat: -1 });
                // Hide extra placeholder span
                gsap.set(words[words.length - 1], { display: 'none' });
                
                const activeWords = words.slice(0, -1);

                activeWords.forEach((word, index) => {
                    const wordTL = gsap.timeline();
                    const delay = index === 0 ? 0 : index - 0.2;

                    // Entry Animation
                    wordTL.fromTo(word, {
                        yPercent: 110,
                        opacity: 0,
                        rotateX: -90,
                    }, { 
                        duration: 1.2, 
                        yPercent: 0, 
                        opacity: 1, 
                        rotateX: 0,
                        ease: "elastic.out(1, 0.75)" 
                    });

                    // Exit Animation (if not the last cycle)
                    wordTL.to(word, { 
                        duration: 0.8, 
                        yPercent: -110, 
                        opacity: 0, 
                        rotateX: 90,
                        ease: "expo.in",
                        delay: 1.5
                    });

                    rotatorTimeline.add(wordTL, index * 2.5);
                });
            }
        }

        const goProjectsButton = document.getElementById("go-projects-button");
        if (goProjectsButton) {
            const handleGoProjects = () => {
                gsap.to(window, { duration: 1, scrollTo: { y: "#projects", autoKill: false }, ease: "power4.inOut" });
            };
            goProjectsButton.addEventListener("click", handleGoProjects);
            return () => goProjectsButton.removeEventListener("click", handleGoProjects);
        }
    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="hero" 
            className="section hero min-h-[90vh] relative overflow-hidden flex items-center justify-center bg-transparent"
        >
            <div className="container mx-auto px-6 py-20 lg:py-32">
                <div className="flex flex-col items-center text-center">
                    <div className="overflow-hidden mb-4">
                        <h1 
                            ref={headerRef}
                            className="font-display text-5xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl invisible leading-[0.9]"
                        >
                            <span className="block">{t("title.main")}</span>
                            <span ref={rotatorRef} className="rotator relative block mt-8 overflow-hidden h-[1.1em]">
                                <span>{t("title.1")}</span>
                                <span>{t("title.2")}</span>
                                <span>{t("title.3")}</span>
                                <span>{t("title.4")}</span>
                                <span className="absolute opacity-0">{t("title.1")}</span>
                            </span>
                        </h1>
                    </div>
                    
                    <div className="max-w-2xl mx-auto flex flex-col items-center gap-10 mt-12 opacity-0 animate-reveal" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                        <p className="font-mono text-zinc-400 text-base md:text-lg leading-relaxed text-balance">
                            {t("subtitle")}
                        </p>
                        
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
                                <div className="absolute inset-0 bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500 animate-gradient-x opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                <Link
                                    className="relative glass flex h-14 items-center justify-center px-10 rounded-full text-lg font-bold text-white transition-all hover:bg-white/10"
                                    aria-label="Contact Page"
                                    href="/contact/"
                                >
                                    {t("contact")}
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 text-zinc-500">
                                <div className="h-px w-8 bg-zinc-800"></div>
                                <small className="uppercase tracking-widest font-bold text-[10px]">
                                    {t("or")}
                                </small>
                                <div className="h-px w-8 bg-zinc-800"></div>
                            </div>
                            
                            <LinkBlend 
                                id="go-projects-button" 
                                isButton={true}
                                className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                            >
                                {t("scroll")}
                                <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                                </svg>
                            </LinkBlend>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .rotator > span {
                    position: absolute;
                    left: 0;
                    right: 0;
                    width: 100%;
                    white-space: nowrap;
                    font-size: 0.9em;
                }
                .rotator > span:not(:first-child) {
                    opacity: 0;
                }
                @keyframes reveal {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-reveal {
                    animation: reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1);
                }
                @keyframes gradient-x {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
            `}</style>
        </section>
    );
};

export default Hero;
