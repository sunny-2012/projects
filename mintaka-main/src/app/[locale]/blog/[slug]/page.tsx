import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEntryBySlug, getCollection } from '@/lib/content';
import MarkdownPostLayout from '@/layouts/MarkdownPostLayout';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of routing.locales) {
    const posts = await getCollection('posts', locale);
    posts.forEach((post) => {
      params.push({ locale, slug: post.slug });
    });
  }
  
  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const post = await getEntryBySlug('posts', slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <MarkdownPostLayout frontmatter={post.data} content={post.content}>
      <MDXRemote source={post.content} />
    </MarkdownPostLayout>
  );
}
