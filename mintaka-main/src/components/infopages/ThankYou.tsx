'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const ThankYou: React.FC = () => {
    const t = useTranslations();

    return (
        <section className="isolate px-6 py-24 sm:py-32 lg:px-8">
            <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <div className="flex justify-center pb-10 pt-20 uppercase">
                        <div className="inline-flex flex-col gap-4">
                            <div className="inline-flex items-center justify-center gap-4">
                                <span className="font-mono text-xs font-semibold uppercase tracking-wide">{t("thanks.subtitle")}</span>
                            </div>
                            <h1 className="font-display text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">{t("thanks.title")}</h1>
                        </div>
                    </div>

                    <p className="mt-6 text-base leading-7 text-gray-600">{t("thanks.content")}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <div className="rounded-lg bg-zinc-900">
                            <Link
                                className="flex h-10 w-full max-w-52 flex-1 items-center justify-center px-4 py-2 text-xl text-slate-200 transition-all hover:text-white sm:w-auto md:font-bold lg:h-10"
                                href="/"
                            >
                                {t("homepage")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThankYou;
