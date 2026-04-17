import React from 'react';
import Newsletter from '@/components/blog/Newsletter';

const Cta: React.FC = () => {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-7xl px-8 py-12 md:px-12 lg:px-32 lg:py-24">
        <div className="flex flex-col items-center justify-center gap-10 p-8 text-center lg:p-20">
          <p className="mt-8 font-display text-4xl font-semibold text-white md:text-6xl lg:text-8xl">
            Subscribe to our newsletter!
          </p>
          <Newsletter className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Cta;
