'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import WokCard from '@/components/work/WokCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Project {
  slug: string;
  data: {
    title: string;
    image: {
      source: any;
      alt: string;
    };
    pubDate: any;
    description: string;
  };
}

interface WorkPreviewProps {
    className?: string;
    projects: Project[];
}

const WorkPreview: React.FC<WorkPreviewProps> = ({ className, projects }) => {
    const t = useTranslations();
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !listRef.current) return;

        const previews = Array.from(listRef.current.querySelectorAll('img')) as HTMLElement[];
        previews.forEach((preview) => {
            gsap.from(preview, {
                scrollTrigger: {
                    trigger: preview,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1,
                },
                ease: "power3.out",
                clipPath: "inset(30% round 0.5rem)",
            });
            // Set initial state
            gsap.set(preview, { clipPath: "inset(0% round 0.5rem)" });
        });

        // Background transition
        gsap.to(".home-dark-section", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "bottom bottom",
                end: "bottom 70%",
                scrub: 0.5,
                immediateRender: false,
            },
            ease: "none",
            backgroundColor: "#18181b",
            color: "#fff",
        });

        // Parallax effect for projects
        if (window.innerWidth >= 768) {
            const projectsElements = Array.from(listRef.current.children) as HTMLElement[];
            projectsElements.forEach((project) => {
                gsap.to(project, {
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top bottom",
                        end: "bottom center",
                        scrub: 1,
                    },
                    ease: "none",
                    y: -200,
                });
            });
        }
    }, [projects]);

    return (
        <section 
            id="projects" 
            ref={sectionRef}
            className={cn("section work-preview-section home-dark-section py-12 bg-transparent transition-colors duration-500", className)}
        >
            <div className="col-span-12 col-start-1 mx-auto max-w-7xl">
                <h2 className="sr-only">{t("projects.label")}</h2>
                <ol ref={listRef} className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:gap-44">
                    {projects.map((project, index) => (
                        <WokCard
                            key={project.slug}
                            image={project.data.image.source}
                            project={project.data.title}
                            link={`/work/${project.slug}`}
                            className={cn(
                                index % 2 === 0
                                    ? `md:col-start-1 md:row-span-2`
                                    : `md:col-start-2 md:mt-32 md:row-span-2`
                            )}
                        />
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default WorkPreview;
