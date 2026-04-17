import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EntryProps {
  title: string;
  url: string;
  author: {
    name: string;
    link: string;
  };
  pubDate: string;
  description: string;
  image: any;
  titleInside?: boolean;
}

const Entry: React.FC<EntryProps> = ({
  title,
  url,
  author,
  pubDate,
  description,
  image,
  titleInside = false,
}) => {
  // Handle image source (it might be an object from Astro's image() or a string)
  let imageSrc = typeof image === 'string' ? image : (image.src || image);
  
  if (typeof imageSrc === 'string' && imageSrc.startsWith('@assets/')) {
    imageSrc = imageSrc.replace('@assets/', '/');
  }

  return (
    <Link href={url as any} title={title} className="group">
      <article className="relative flex h-full flex-1 flex-col overflow-hidden rounded-lg">
        <div
          className={cn(
            "article-overlay relative block w-full overflow-hidden lg:col-span-2",
            titleInside ? "article-gradient-overlay-bottom" : "article-gradient-overlay"
          )}
        >
          <div className="relative aspect-[384/246] h-full w-full rounded-inherit">
            <Image
              className="relative h-full w-full bg-center object-cover rounded-inherit"
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div
          className={cn(
            "flex w-full flex-1 flex-col items-start justify-between",
            titleInside ? "absolute bottom-0 text-white p-12" : "text-white pt-4 md:p-2 md:pt-6"
          )}
        >
          <div className="w-full">
            <div>
              <p className="font-mono text-lg font-medium uppercase tracking-wide lg:text-xl">
                {title}
              </p>
            </div>
            <p className={cn("mt-2 line-clamp-3 text-base", titleInside ? "text-zinc-300" : "text-zinc-400")}>
              {description}
            </p>
          </div>
          <footer>
            <div className="mt-6 inline-flex items-center space-x-1">
              <p className={cn("text-xs font-medium", titleInside ? "text-zinc-200" : "text-zinc-100")}>
                {author.name}
              </p>
              <span aria-hidden="true" className="text-zinc-500">&middot;</span>
              <div className={cn("flex text-xs", titleInside ? "text-zinc-400" : "text-zinc-500")}>
                <time dateTime={pubDate}>{pubDate}</time>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </Link>
  );
};

export default Entry;
