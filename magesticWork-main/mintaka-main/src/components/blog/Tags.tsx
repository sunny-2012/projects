import React from 'react';
import Title from '@/components/global/Title';
import { getCollection } from '@/lib/content';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

interface TagsProps {
  locale: string;
}

export default async function Tags({ locale }: TagsProps) {
  const allPosts = await getCollection('posts', locale);
  
  // Extract all tags, filter out undefined, flatten, and get unique values
  const tagsSet = new Set<string>();
  allPosts.forEach(post => {
    if (post.data.tags && Array.isArray(post.data.tags)) {
      post.data.tags.forEach((tag: string) => tagsSet.add(tag));
    }
  });
  
  const tags = Array.from(tagsSet).sort();

  return (
    <section>
      <div className="mx-auto px-8 py-24 md:px-12 lg:pt-32 2xl:max-w-7xl">
        <div>
          <Title className="pb-10 pt-20 uppercase" title="Tags" subtitle="lorem ipsum" />
        </div>
        <div>
          <ol className="mt-12 flex flex-col divide-y divide-zinc-800 py-8">
            {tags.map((tag) => (
              <li key={tag} className="w-full py-8 font-mono text-xl font-semibold text-zinc-800 hover:text-black md:text-2xl">
                <Link href={`/tags/${tag}`} className="flex w-full items-center justify-between">
                  {tag}{" "}
                  <span className="ml-auto">
                    <ArrowRight width={30} height={30} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
