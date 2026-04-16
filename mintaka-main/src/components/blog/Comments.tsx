'use client';

import React, { useEffect, useRef } from 'react';

const Comments: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.dataset.repo = 'majesticooss/magesticwork';
    script.dataset.repoId = 'R_kgDOK_K6WQ';
    script.dataset.category = 'Blog';
    script.dataset.categoryId = 'DIC_kwDOK_K6Wc4CcGH6';
    script.dataset.mapping = 'og:title';
    script.dataset.strict = '0';
    script.dataset.reactionsEnabled = '1';
    script.dataset.emitMetadata = '0';
    script.dataset.inputPosition = 'top';
    script.dataset.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    script.dataset.lang = 'en';
    script.dataset.loading = 'lazy';
    script.crossOrigin = 'anonymous';
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="prose prose-lg mx-auto pt-20 dark:prose-invert"
    />
  );
};

export default Comments;
