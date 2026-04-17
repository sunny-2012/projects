import React from 'react';
import Author from '@/components/blog/Author';
import { getEntryBySlug, getCollection } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  // Try to generate static paths if possible, though locale might not be provided in build time cleanly without further configuration
  const authors = await getCollection('authors', locale);
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const author = await getEntryBySlug('authors', slug, locale);
  if (!author) return { title: 'Not Found' };
  
  return {
    title: author.data.name,
    description: author.data.description,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const author = await getEntryBySlug('authors', slug, locale);
  
  if (!author) {
    notFound();
  }

  return <Author author={author} />;
}
