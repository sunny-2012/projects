import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Title from '@/components/global/Title';
import Cta from '@/components/blog/Cta';
import Comments from '@/components/blog/Comments';
import { ExternalLink } from 'lucide-react';

interface MarkdownPostLayoutProps {
  frontmatter: any;
  content: string;
  children: React.ReactNode;
}

function getArticleReadingTime(body: string): number {
  if (!body) return 0;
  const wordsPerMinute = 183;
  const numberOfWords = body.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
}

const MarkdownPostLayout: React.FC<MarkdownPostLayoutProps> = ({ frontmatter, content, children }) => {
  const t = useTranslations();
  const readingTime = getArticleReadingTime(content);

  let imageSrc = frontmatter.image.source;
  if (typeof imageSrc === 'string' && imageSrc.startsWith('@assets/')) {
    imageSrc = imageSrc.replace('@assets/', '/');
  }

  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-8 py-12 md:px-12 lg:px-32 lg:py-32">
          <div className="flex flex-col gap-6 pt-20">
            <Title
              title={frontmatter.title}
              subtitle={`Written by: <a href="${frontmatter.author.link}" rel="author" class="hover:underline">${frontmatter.author.name}</a> on ${new Date(frontmatter.pubDate)
                .toISOString()
                .slice(0, 10)}`}
            />

            <p className="max-w-2xl text-base text-slate-500">
              <em>{frontmatter.description}</em>
            </p>

            {frontmatter?.link && (
              <a className="font-mono text-xl font-bold flex items-center gap-2" href={frontmatter?.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={20} className="inline" /> {t("blog.gotoproject")}
              </a>
            )}
          </div>
          
          <div className="mt-12 w-full justify-center">
            <div className="relative w-full aspect-video mt-12 overflow-hidden rounded-lg">
              <Image 
                className="object-cover" 
                src={imageSrc} 
                alt={frontmatter.image.alt} 
                fill
                priority
              />
            </div>
            
            <div className="flex justify-between px-2 pt-4 font-mono text-sm">
              <div className="flex flex-wrap gap-1">
                {frontmatter?.tags?.length > 0 && <span className="py-3 lowercase">TAGS:</span>}
                <ul className="flex flex-wrap justify-center">
                  {frontmatter?.tags?.map((tag: string) => (
                    <li key={tag} className="inline-flex items-center rounded-full px-1 py-3 font-medium uppercase tracking-widest">
                      <a href={`/tags/${tag}`} className="hover:underline">{tag}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="py-3">~{readingTime} MIN</span>
            </div>

            <div className="prose-styles mt-12 prose dark:prose-invert max-w-none">
              {children}
            </div>
          </div>
          <Comments />
        </div>
      </section>
      <Cta />
    </>
  );
};

export default MarkdownPostLayout;
