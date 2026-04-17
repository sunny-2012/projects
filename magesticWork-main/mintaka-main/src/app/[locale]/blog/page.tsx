import React from 'react';
import Articles from '@/components/blog/Articles';
import { setRequestLocale } from 'next-intl/server';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Articles locale={locale} />;
}
