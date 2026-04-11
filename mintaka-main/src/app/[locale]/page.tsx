import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Tagline from "@/components/landing/Tagline";
import WorkPreview from "@/components/landing/WorkPreview";
import Faq from "@/components/landing/Faq";
import { getCollection } from "@/lib/content";
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const projects = (await getCollection("projects", locale))
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime())
    .slice(0, 4); // Show only top 4 on home page

  return (
    <>
      <Hero />
      <WorkPreview 
        projects={projects as any} 
        className="!pt-20 pb-20 lg:!pt-36 lg:pb-40" 
      />
      <Services />
      <Tagline />
      <Faq />
    </>
  );
}
