import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background animated elements */}
      <div className="absolute inset-0 -z-10 bg-slate-50 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-24 h-[600px] w-[600px] rounded-full bg-purple-200/40 blur-[140px]" />
        <div className="absolute -bottom-48 left-0 h-[400px] w-[400px] rounded-full bg-emerald-100/30 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Who We Are
            </span>
          </motion.div>

          <motion.h1
            className="mt-10 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Digital craftsmanship that{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              accelerates growth.
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 text-xl leading-8 text-zinc-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We blend architectural precision with creative flair to build websites that aren't just 
            beautiful—they're strategic assets built for performance and conversion.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="/contact/"
              className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95"
            >
              Start Your Project
            </a>
            <a
              href="/services/"
              className="text-sm font-semibold leading-6 text-zinc-900 hover:text-blue-600 transition-colors"
            >
              Our process <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
