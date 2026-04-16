import React from 'react';
import Authors from '@/components/blog/Authors';

export async function generateMetadata() {
  return {
    title: "Authors - Magestic Work: Meet Our Expert Team",
    description: "Discover the creative minds behind Magestic Work. Our authors are industry experts in web design, SEO, and digital marketing, sharing valuable insights.",
  };
}

export default async function AuthorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return <Authors locale={locale} />;
}
