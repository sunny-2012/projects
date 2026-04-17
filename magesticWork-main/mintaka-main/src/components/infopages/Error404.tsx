'use client';

import React from 'react';
import { Link } from '@/i18n/routing';

export default function Error404() {
  return (
    <section className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center pb-10 pt-20 uppercase">
            <div className="inline-flex flex-col gap-4">
              <div className="inline-flex items-center justify-center gap-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-wide">404</span>
              </div>
              <h1 className="font-display text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">Page not found</h1>
            </div>
          </div>

          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="squircle-bg rounded-lg bg-zinc-900">
              <Link
                className="flex h-10 w-full max-w-52 flex-1 items-center justify-center px-4 py-2 text-xl text-slate-200 transition-all hover:text-white sm:w-auto md:font-bold lg:h-10"
                href="/"
              >
                Homepage
              </Link>
            </div>
            <Link href="/contact" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .gradient-element {
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        }
      `}</style>
    </section>
  );
}
