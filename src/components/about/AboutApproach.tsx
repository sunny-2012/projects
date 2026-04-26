import React from 'react';
import { motion } from 'framer-motion';
import Target from 'lucide-react/dist/esm/icons/target';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Search from 'lucide-react/dist/esm/icons/search';
import Shield from 'lucide-react/dist/esm/icons/shield';

const approaches = [
  {
    title: "Strategic Design",
    description: "Every pixel is intentional. We build memorable interfaces that don't just look good, but drive user action and brand loyalty.",
    icon: Target,
    color: "bg-blue-500",
    size: "col-span-1",
  },
  {
    title: "Performance First",
    description: "Speed is a feature. We optimize every script and image to ensure lightning-fast load times that keep users engaged and boost SEO rankings.",
    icon: Zap,
    color: "bg-amber-500",
    size: "col-span-1",
  },
  {
    title: "SEO Foundation",
    description: "Built to be found. Our sites feature clean code and semantic structure, giving you a competitive edge in organic search from day metadata to site maps.",
    icon: Search,
    color: "bg-emerald-500",
    size: "col-span-1 sm:col-span-2",
  },
  {
    title: "Reliable Support",
    description: "We're your long-term partners. From launch day to ongoing maintenance, we provide the technical support needed to keep your studio running smoothly.",
    icon: Shield,
    color: "bg-purple-500",
    size: "col-span-1 sm:col-span-2 lg:col-span-3",
  }
];

const BentoCard = ({ approach, index }: { approach: any, index: number }) => {
  const Icon = approach.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-8 hover:shadow-2xl transition-all duration-500 ${approach.size}`}
    >
      <div className={`inline-flex items-center justify-center rounded-2xl ${approach.color} p-3 text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-zinc-900">{approach.title}</h3>
      <p className="mt-4 text-zinc-600 leading-relaxed">{approach.description}</p>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const AboutApproach = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background blurred accents */}
      <div className="absolute top-0 left-0 -z-10 h-64 w-64 bg-amber-100/30 blur-[100px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[500px] w-[500px] bg-blue-100/20 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Our Methodology</h2>
          <p className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            A growth-focused approach for the digital age.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approaches.map((item, i) => (
            <BentoCard key={item.title} approach={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
