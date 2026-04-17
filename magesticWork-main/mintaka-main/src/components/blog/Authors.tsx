import React from 'react';
import Title from '@/components/global/Title';
import { getCollection } from '@/lib/content';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

interface AuthorsProps {
  locale: string;
}

export default async function Authors({ locale }: AuthorsProps) {
  const allAuthors = await getCollection('authors', locale);

  return (
    <section>
      <div className="mx-auto px-8 py-24 md:px-12 lg:pt-32 2xl:max-w-7xl">
        <div>
          <Title className="pb-10 pt-20 uppercase" title="Authors" subtitle="lorem ipsum" />
        </div>
        <div>
          <ol className="mt-12 flex flex-col divide-y divide-zinc-800 py-8">
            {allAuthors.map((author) => (
              <li key={author.slug} className="w-full py-8 font-mono text-xl font-semibold text-zinc-800 hover:text-black md:text-2xl">
                <Link href={`/author/${author.slug}`} className="flex w-full items-center justify-between">
                  {author.data.name}{" "}
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
