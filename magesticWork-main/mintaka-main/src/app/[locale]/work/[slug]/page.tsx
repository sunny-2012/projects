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
    const projects = await getCollection('projects', locale);
    projects.forEach((project) => {
      params.push({ locale, slug: project.slug });
    });
  }
  
  return params;
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const project = await getEntryBySlug('projects', slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <MarkdownPostLayout frontmatter={project.data} content={project.content}>
      <MDXRemote source={project.content} />
    </MarkdownPostLayout>
  );
}
