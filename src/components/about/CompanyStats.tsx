import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Website Performance', value: '99%', description: 'Average Lighthouse speed scores.' },
  { label: 'Client Satisfaction', value: '100%', description: 'Projects delivered on time and budget.' },
  { label: 'Organic Growth', value: '3.5x', description: 'Average SEO traffic increase for clients.' },
  { label: 'Success Rate', value: '10/10', description: 'Commitment to excellence in every build.' },
];

const CompanyStats = () => {
  return (
    <section className="bg-zinc-900 py-24 sm:py-32 rounded-[3.5rem] mx-6 lg:mx-8 mb-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 h-64 w-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-violet-500/10 blur-[100px] -ml-32 -mb-32" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-zinc-400">{stat.label}</dt>
              <dd className="order-first text-5xl font-extrabold tracking-tight text-white lg:text-6xl">
                {stat.value}
              </dd>
              <p className="text-sm text-zinc-500">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;
