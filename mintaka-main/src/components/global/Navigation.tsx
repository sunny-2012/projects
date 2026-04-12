'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const logoPathRef = useRef<SVGPathElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);

  const pages = [
    { title: 'Home', url: '/' as const },
    { title: t('contacts'), url: '/contact/' as const },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Logo Animation
    // Note: DrawSVGPlugin is a premium plugin, using a simple fallback if not available
    const logoTl = gsap.timeline({
      defaults: { duration: 1, ease: 'power2.out' },
    });

    if (logoPathRef.current) {
      // If DrawSVG were available, we'd use it here. 
      // Falling back to a standard animation for the logo
      logoTl.from(logoPathRef.current, { 
        strokeDashoffset: 1000, 
        strokeDasharray: 1000, 
        duration: 1.5 
      })
      .to(logoPathRef.current, { fill: 'currentColor', duration: 2 }, '<+=0.5');
    }

    // Menu Collapse Animation on Scroll (Desktop)
    if (window.innerWidth >= 768 && menuListRef.current && navContainerRef.current) {
        const menuCollapseTl = gsap.timeline({
            defaults: { ease: 'back.inOut(1.7)', duration: 0.4 },
            paused: true
        })
        .to(navContainerRef.current, { width: 125 })
        .to(menuListRef.current, {
            x: () => {
                if (pathname === '/' || pathname === '/it/') return '9.5rem';
                return '-3.5rem';
            }
        }, '<');

        const handleScroll = () => {
            if (window.scrollY > 200) {
                menuCollapseTl.play();
                menuListRef.current?.classList.add('collapsed');
            } else {
                menuCollapseTl.reverse();
                menuListRef.current?.classList.remove('collapsed');
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8">
      <Link href="/" aria-label="Home" className="logo absolute z-50 flex h-[4.5rem] items-center md:h-[5.9rem]">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2809.6 545.3"
          className="logo-svg h-7 w-36 md:h-9"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
        >
          <path
            ref={logoPathRef}
            d="M81.3,373.8v-184c0-3.4,0.3-6.7,0.9-10c3.2-18.1,17.5-69.5,77.3-78.8c0,0,43.7-5.5,76.9,27.7c0.5,0.5,0.5,1.3,0,1.8
            L202.7,164c-0.5,0.5-1.3,0.5-1.8,0c-3-3.1-14.1-12.8-35.6-12.8c-24.6,0-32.5,28.4-33.1,30.8c0,0.1-0.1,0.2-0.1,0.3v185.1
            c0,0.1,0,0.3,0.1,0.4c0.9,2.4,9.4,23.5,35,23.6h0.1c0.8,0.1,15.6,0.9,29.8-13.4l66.5-67.2c0.1-0.1,0.1-0.1,0.1-0.2
            c0.5-0.8,2.9-5.1,3.6-12.6c0-0.1,0-0.1,0-0.1v-51.6c0-2.8-0.8-5.5-2.4-7.9c-2.4-3.6-7.5-10.3-11.9-14.2c-0.5-0.5-0.6-1.3-0.1-1.8
            l35.3-35.3c0.4-0.4,1.2-0.5,1.7-0.1c5,4.1,29.5,25.9,29.5,54.6v66.2c0,2-0.2,3.9-0.7,5.9c-2,6.2-6.5,19.7-21.3,34.5L216,429.5
            c-2.6,2.6-5.8,4.9-9.2,6.5c-12.2,5.6-42.5,16.1-76.9,0.5h-0.1c-1-0.4-28.7-11.1-46.5-51.4C82.1,381.5,81.3,377.7,81.3,373.8z"
          />
          {/* Add more paths if needed from the original SVG */}
        </svg>
      </Link>

      <div className={cn("navigation fixed right-0 top-0 z-50 transition-all duration-300 px-6 py-6 md:px-12 md:py-8", isOpen && "w-full navbar-open")}>
        <div className={cn("ml-auto md:max-w-fit transition-all duration-300", isOpen ? "max-w-3xl" : "max-w-[8rem]")}>
          <div className="mx-auto w-full">
            <div
              ref={navContainerRef}
              className="shadow-thick resizable nav-container squircle relative mx-auto flex w-full flex-col justify-center overflow-x-hidden bg-zinc-900 backdrop-blur-xl backdrop-filter md:flex-row-reverse"
            >
              <div className="flex flex-row items-center justify-end md:hidden">
                {!isOpen && (
                  <Link href="/contact/" className="px-3 py-[0.4rem] pl-4" aria-label="Contact Page">
                    <Mail className="text-white" size={20} />
                  </Link>
                )}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={cn(
                    "inline-flex items-center justify-center px-3 py-[0.4rem] pr-4 text-white hover:text-blue-300 focus:text-white focus:outline-none",
                    isOpen ? "pt-4" : "pt-[0.4rem]"
                  )}
                  aria-label={isOpen ? "Close navbar" : "Open navbar"}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <nav className={cn("flex-grow flex-col justify-center py-12 md:flex md:py-0", isOpen ? "flex" : "hidden")}>
                <ul
                  ref={menuListRef}
                  className="flex list-none flex-col items-end justify-center gap-2 px-2 text-center text-3xl md:flex-row md:items-center md:text-base"
                >
                  {pages.map((page) => (
                    <li key={page.url}>
                      <Link
                        href={page.url}
                        className={cn(
                          "inline-block cursor-pointer px-1 py-[0.33rem] transition-colors",
                          pathname === page.url && "active"
                        )}
                      >
                        <span className="menu-item-container inline-block px-4 py-1 rounded-[0.45rem] hover:bg-white active:bg-[#aaa] group">
                          <span className="menu-item font-semibold uppercase tracking-wide text-zinc-400 group-hover:text-black transition-colors">
                            {page.title}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navigation {
          mix-blend-mode: difference;
        }
        .navigation.navbar-open {
          mix-blend-mode: luminosity;
        }
        .menu-item-container.active {
          background: #aaa;
        }
        .menu-item-container.active .menu-item {
          color: #000;
        }
        :global(nav ul.collapsed .menu-item) {
          color: #fff;
        }
      `}</style>
    </header>
  );
};

export default Navigation;
