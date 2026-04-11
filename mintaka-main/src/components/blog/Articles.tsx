import React from 'react';
import { getTranslations } from 'next-intl/server';
import Entry from '@/components/blog/Entry';
import Title from '@/components/global/Title';
import { getCollection } from '@/lib/content';

interface ArticlesProps {
  locale: string;
}

const Articles = async ({ locale }: ArticlesProps) => {
  const t = await getTranslations();
  
  const allPosts = (await getCollection("posts", locale))
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  return (
    <section className="relative bg-zinc-950">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
        <div className="relative left-1/2 aspect-1155/678 w-144 -translate-x-1/2 rotate-30 bg-linear-to-tr from-zinc-800 to-zinc-500 opacity-20 sm:left-[calc(50%-40rem)] sm:w-288 [clip-path:polygon(74.1%_44.1%,100%_61.6%,97.5%_26.9%,85.5%_0.1%,80.7%_2%,72.5%_32.5%,60.2%_62.4%,52.4%_68.1%,47.5%_58.3%,45.2%_34.5%,27.5%_76.7%,0.1%_64.9%,17.9%_100%,27.6%_76.8%,76.1%_97.7%,74.1%_44.1%)]"></div>
      </div>
      
      <div className="mx-auto flex flex-col gap-16 px-8 py-24 md:px-12 lg:pt-32 2xl:max-w-7xl">
        <Title title={t("blog.title")} subtitle={t("blog.subtitle")} className="pb-10 pt-20 uppercase" />
        
        {allPosts && allPosts[0] && (
          <Entry
            url={"/blog/" + allPosts[0].slug}
            title={allPosts[0].data.title}
            description={allPosts[0].data.description}
            pubDate={new Date(allPosts[0].data.pubDate).toISOString().slice(0, 10)}
            author={allPosts[0].data.author}
            image={allPosts[0].data.image.source}
            titleInside={false}
          />
        )}

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.slice(1).map((post) => (
            <Entry
              key={post.slug}
              url={"/blog/" + post.slug}
              title={post.data.title}
              description={post.data.description}
              pubDate={new Date(post.data.pubDate).toISOString().slice(0, 10)}
              author={post.data.author}
              image={post.data.image.source}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
