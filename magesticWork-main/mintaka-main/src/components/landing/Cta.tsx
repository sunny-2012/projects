import React from 'react';
import { Link } from '@/i18n/routing';

export default function Cta() {
  return (
    <section>
      <div className="px-8 py-12 mx-auto md:px-12 2xl:max-w-7xl lg:py-24">
        <div className="p-8 lg:p-20 bg-blue-700 rounded-4xl lg:rounded-6xl text-center">
          <div className="inline-flex items-center gap-4">
            <div className="w-20 h-1 bg-white hidden md:block"></div>
            <span className="text-xs font-semibold tracking-wide uppercase text-white">
              Alex Carter, Founder of NexusWeb Solutions.
            </span>
          </div>
          <p className="mt-8 text-4xl font-display font-semibold md:text-6xl lg:text-8xl text-white">
            Elevate your digital vision with us. Contact now to start creating the extraordinary!
          </p>
          <div className="flex mt-10 justify-center">
            <Link
              className="flex items-center justify-center w-full h-10 px-8 rounded-full py-2 text-sm font-semibold text-black transition-all lg:h-16 bg-lime-500 hover:bg-lime-400 lg:w-auto"
              href="/contact"
            >
              Contact us &nbsp;&nbsp; →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
