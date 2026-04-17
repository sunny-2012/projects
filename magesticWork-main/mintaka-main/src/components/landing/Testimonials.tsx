import React from 'react';

export default function Testimonials() {
  return (
    <section>
      <div className="px-8 py-12 mx-auto md:px-12 2xl:max-w-7xl">
        <div className="p-8 lg:p-20 bg-blue-700 rounded-4xl lg:rounded-6xl">
          <div className="inline-flex items-center gap-4">
            <div className="w-20 h-1 bg-white hidden md:block"></div>
            <span className="text-xs font-semibold tracking-wide uppercase text-white">
              Alex Carter, Founder of NexusWeb Solutions.
            </span>
          </div>
          <p className="mt-8 text-4xl font-display font-semibold md:text-6xl lg:text-8xl text-white">
            "This web agency exceeded my expectations. Their creative prowess and
            technical skills transformed our website into a masterpiece. A
            remarkable team that delivers results!"
          </p>
        </div>
      </div>
    </section>
  );
}
