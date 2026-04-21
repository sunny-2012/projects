'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Newsletter from '@/components/blog/Newsletter';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const Footer: React.FC = () => {
    const t = useTranslations();

    useEffect(() => {
        gsap.registerPlugin(ScrollToPlugin);
        
        const goTopButton = document.getElementById("go-top-button");
        if (goTopButton) {
            const handleGoTop = () => {
                gsap.to(window, { duration: 0.5, scrollTo: 0 });
            };
            goTopButton.addEventListener("click", handleGoTop);
            return () => goTopButton.removeEventListener("click", handleGoTop);
        }
    }, []);

    return (
        <footer className="relative flex w-full flex-col section min-h-screen gap-y-10 py-3 lg:gap-y-32">
            <div className="relative flex-grow" />
            
            {/* MAGESTICWORK Display Text */}
            <div className="mb-20 lg:mb-32">
                <h2 className="font-display text-6xl font-extrabold uppercase sm:text-7xl md:text-8xl lg:text-9xl leading-tight tracking-wider">
                    MAGESTICWORK
                </h2>
            </div>
            
            <div className="relative grid grid-cols-6 gap-y-20 lg:grid-cols-12 lg:text-xl">
                <div className="col-span-6 col-start-1 grid grid-cols-6 gap-6 lg:col-span-8">
                    <div className="col-span-2 col-start-4 flex flex-col gap-2 lg:col-span-3">
                        <a href="https://twitter.com//" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                        <a href="https://www.instagram.com//" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                        <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer">TikTok</a>
                    </div>
                    <div className="col-span-3 row-start-1 lg:col-span-2 lg:col-start-4 lg:row-start-auto">
                        <div className="flex flex-col gap-2">
                            <Link href="/">Home</Link>
                            <Link href="/blog/">Blog</Link>
                            <a href="/tags/">Tags</a>
                            <Link href="/contact/">{t('contacts')}</Link>
                            <a href="/terms/">Terms</a>
                            <a href="/privacy/">Privacy Policy</a>
                            <a href="/rss.xml">RSS</a>
                        </div>
                    </div>
                    <div className="col-span-3 mt-10 lg:col-start-4">
                        <div className="relative flex flex-col overflow-hidden" />
                        <div className="relative mt-1 flex h-8 flex-col overflow-hidden">
                            <a href="mailto:test@magesticwork.co" className="block cursor-pointer overflow-hidden">test@magesticwork.co</a>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 row-start-1 text-5xl leading-tight lg:col-span-4 lg:row-start-auto lg:text-6xl">
                    <div>{t("footer.newsletter")}</div>
                    <div>{t("footer.newsletter2")}</div>
                    <Newsletter />
                </div>
            </div>
            <div className="relative mt-4 flex w-full items-end justify-between gap-y-4 text-sm lg:text-xl lg:font-normal">
                <div>©2023 YOUR COMPANY</div>
                <button
                    id="go-top-button"
                    aria-label="Go to Top"
                    className="fill-transparent transition-colors duration-300 hover:fill-black hover:text-white"
                    data-cursor-hover
                    data-cursor-parallax
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="m15 12l-3-3m0 0l-3 3m3-3v6" />
                        </g>
                    </svg>
                </button>
            </div>
        </footer>
    );
};

export default Footer;
