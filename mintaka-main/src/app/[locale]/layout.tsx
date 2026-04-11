import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import BackgroundTexture from '@/components/global/BackgroundTexture';
import Navigation from '@/components/global/Navigation';
import Footer from '@/components/global/Footer';
import BlobCursorFollower from '@/components/global/BlobCursorFollower';
import SmoothScroll from '@/components/global/SmoothScroll';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: "Mintaka Studio",
    description: "Web Agency Leading in Performant Web Design Solutions",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <BackgroundTexture />
            <Navigation />
            <BlobCursorFollower />
            <main className="grow">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
