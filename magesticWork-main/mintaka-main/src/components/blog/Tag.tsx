import React from 'react';
import Title from '@/components/global/Title';
import Entry from '@/components/blog/Entry';

interface TagProps {
  tag: string;
  posts: any[];
}

export default function Tag({ tag, posts }: TagProps) {
  return (
    <section>
      <div className="mx-auto px-8 py-24 md:px-12 lg:pt-32 2xl:max-w-7xl">
        <div className="py-10">
          <Title title={tag} subtitle="tag" className="pb-10 pt-20 uppercase" />
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-x-3 gap-y-24 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-x-6">
          {posts.map((post) => (
            <Entry
              key={post.slug}
              url={"/blog/" + post.slug}
              title={post.data.title}
              description={post.data.description}
              pubDate={post.data.pubDate ? new Date(post.data.pubDate).toISOString().slice(0, 10) : ''}
              author={post.data.author}
              image={post.data.image?.source}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
