'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ServicesProps {
    className?: string;
}

const Services: React.FC<ServicesProps> = ({ className }) => {
    const t = useTranslations();
    const sectionRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const indicatorsRef = useRef<HTMLDivElement>(null);

    const points = [
        {
            title: t("websites.title"),
            content: t("websites.content"),
            image: "/images/services/website-ui-ux-development.svg",
        },
        {
            title: t("apps.title"),
            content: t("apps.content"),
            image: "/images/services/mobile-app-ui-ux-design.svg",
        },
        {
            title: t("uiux.title"),
            content: t("uiux.content"),
            image: "/images/services/creative-designer-doing-multitasking.svg",
        },
        {
            title: t("seo.title"),
            content: t("seo.content"),
            image: "/images/services/seo-link-building.svg",
        },
        {
            title: t("advertising.title"),
            content: t("advertising.content"),
            image: "/images/services/advertising.svg",
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !wrapperRef.current) return;

        const pointsElements = Array.from(wrapperRef.current.querySelectorAll('.point')) as HTMLElement[];
        const indicators = Array.from(indicatorsRef.current?.children || []) as HTMLElement[];
        const height = 100 * pointsElements.length;

        // Pinner timeline
        const pinTrigger = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=${height}%`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${height}%`,
                scrub: 1,
            },
        });

        pointsElements.forEach((elem, i) => {
            if (i !== 0) {
                gsap.set(elem, { opacity: 0, yPercent: 20 });
            }

            // Indicator animation
            tl.to(indicators[i], { 
                scaleY: 1, 
                backgroundColor: "white", 
                duration: 1,
                ease: "none" 
            }, i);

            if (i > 0) {
                tl.to(elem, { 
                    opacity: 1, 
                    yPercent: 0, 
                    duration: 0.5,
                    ease: "power2.out" 
                }, i - 0.2);
                
                tl.to(pointsElements[i-1], { 
                    opacity: 0, 
                    yPercent: -20, 
                    duration: 0.5,
                    ease: "power2.in" 
                }, i - 0.2);
            }

            // Inner content animations
            const img = elem.querySelector("img");
            const article = elem.querySelector("article");
            
            if (img) tl.from(img, { scale: 0.8, opacity: 0, duration: 0.5 }, i);
            if (article) tl.from(article, { x: 50, opacity: 0, duration: 0.5 }, i);
        });

        return () => {
            pinTrigger.kill();
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="services" 
            className={cn("section services-section relative bg-zinc-950 py-0", className)}
        >
            <div ref={wrapperRef} className="wrapper flex h-screen w-full relative overflow-hidden">
                <div className="container mx-auto px-6 relative flex h-full items-center">
                    {/* Modern Vertical Progress Line */}
                    <div ref={indicatorsRef} className="absolute left-8 top-1/2 -translate-y-1/2 h-64 w-[2px] bg-zinc-800 flex flex-col items-stretch overflow-hidden rounded-full z-20 hidden md:flex">
                        {points.map((_, i) => (
                            <div key={i} className="indicator w-full grow origin-top scale-y-0" style={{ backgroundColor: 'transparent transition-all' }} />
                        ))}
                    </div>

                    <div className="relative w-full h-full">
                        {points.map(({ title, content, image }, i) => (
                            <div 
                                key={i} 
                                className="point absolute inset-0 flex flex-col items-center justify-center gap-12 md:flex-row md:gap-24 lg:gap-32"
                            >
                                <div className="relative w-full max-w-md aspect-square lg:max-w-xl group">
                                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <Image 
                                        src={image} 
                                        alt={title} 
                                        width={600} 
                                        height={600}
                                        className="relative w-full h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <article className="flex flex-col gap-8 text-white max-w-xl">
                                    <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Service 0{i+1}</span>
                                    <h3 className="font-display text-4xl font-bold uppercase md:text-5xl lg:text-7xl leading-tight">{title}</h3>
                                    <p 
                                        className="text-lg text-zinc-400 leading-relaxed font-light" 
                                        dangerouslySetInnerHTML={{ __html: content }} 
                                    />
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="h-px w-12 bg-zinc-700"></div>
                                        <button className="text-sm uppercase tracking-widest font-bold hover:text-white transition-colors">Learn More</button>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
