import React from 'react';
import Title from '@/components/global/Title';

interface AuthorProps {
  author: any;
}

export default function Author({ author }: AuthorProps) {
  return (
    <section>
      <div className="mx-auto px-8 py-24 md:px-12 lg:pt-32 2xl:max-w-7xl">
        <div className="py-10">
          <Title title={author.data.name || ''} subtitle="author" className="pb-10 pt-20 uppercase" />
        </div>
      </div>
    </section>
  );
}
