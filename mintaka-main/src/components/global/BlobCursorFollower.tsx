'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, Power2 } from 'gsap';

const BlobCursorFollower: React.FC = () => {
    const blobRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isTouchDevice = window.matchMedia("(hover: none)").matches;
        if (isTouchDevice) return;

        const mouse = { x: 0, y: 0 };
        const pos = { x: 0, y: 0 };
        const ratio = 0.65;
        const blob = blobRef.current;
        const magicCursor = cursorRef.current;

        if (!blob || !magicCursor) return;

        gsap.set(blob, { xPercent: -50, yPercent: -50 });

        const handleMouseMove = (e: MouseEvent) => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            mouse.x = e.pageX;
            mouse.y = e.pageY - scrollTop;
        };

        document.addEventListener("mousemove", handleMouseMove);

        const updatePosition = () => {
            pos.x += (mouse.x - pos.x) * ratio;
            pos.y += (mouse.y - pos.y) * ratio;
            gsap.to(blob, { duration: 0.5, x: pos.x, y: pos.y });
        };

        gsap.ticker.add(updatePosition);

        const parallaxWraps = document.querySelectorAll("[data-cursor-hover]");
        parallaxWraps.forEach((wrap) => {
            const magneticElement = (e: MouseEvent, target: HTMLElement, movement: number) => {
                const boundingRect = target.getBoundingClientRect();
                const relX = e.pageX - boundingRect.left;
                const relY = e.pageY - boundingRect.top;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                gsap.to(target, {
                    duration: 0.3,
                    x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
                    y: ((relY - boundingRect.height / 2 - scrollTop) / boundingRect.height) * movement,
                    ease: Power2.easeOut,
                });
            };

            const onMouseEnter = () => {
                gsap.to(blob, { duration: 0.5, opacity: 0.5 });
            };

            const onMouseLeave = () => {
                gsap.to(blob, { duration: 0.5, opacity: 0.2 });
                if (wrap.hasAttribute("data-cursor-parallax")) {
                    gsap.to(wrap, { duration: 0.3, scale: 1, x: 0, y: 0 });
                }
            };

            const onMouseMove = (e: Event) => {
                if (wrap.hasAttribute("data-cursor-parallax")) {
                    magneticElement(e as MouseEvent, wrap as HTMLElement, 10);
                }
            };

            wrap.addEventListener("mouseenter", onMouseEnter);
            wrap.addEventListener("mouseleave", onMouseLeave);
            wrap.addEventListener("mousemove", onMouseMove);
        });

        magicCursor.classList.add("active");

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            gsap.ticker.remove(updatePosition);
        };
    }, []);

    return (
        <div ref={cursorRef} id="cursor-follower" className="pointer-events-none absolute h-full w-full opacity-0 transition-opacity duration-200 delay-1000 [&.active]:opacity-100">
            <div ref={blobRef} id="blob" className="fixed rounded-full blur-[100px] opacity-20 top-0 left-0 h-[500px] w-[500px] bg-[#edb74d] scale-50" />
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                :global(#cursor-follower.active) {
                    animation: fadeIn 2s forwards;
                }
            `}</style>
        </div>
    );
};

export default BlobCursorFollower;
