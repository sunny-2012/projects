'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Title from '@/components/global/Title';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Contact: React.FC = () => {
    const t = useTranslations();

    return (
        <section className="isolate px-6 py-24 sm:py-32 lg:px-8 bg-transparent">
            {/* Background gradient decoration */}
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem] [clip-path:polygon(74.1%_44.1%,100%_61.6%,97.5%_26.9%,85.5%_0.1%,80.7%_2%,72.5%_32.5%,60.2%_62.4%,52.4%_68.1%,47.5%_58.3%,45.2%_34.5%,27.5%_76.7%,0.1%_64.9%,17.9%_100%,27.6%_76.8%,76.1%_97.7%,74.1%_44.1%)]"></div>
            </div>
            
            <div className="mx-auto">
                <Title className="pb-10 pt-20 uppercase" title={t("contact.title")} subtitle={t("contact.subtitle")} />
                <form data-static-form-name="contact" className="mx-auto max-w-2xl pt-12 lg:pt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block pl-1 text-sm font-semibold leading-6 text-gray-900">{t("contact.name")}*</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                autoComplete="given-name" 
                                required 
                                className="pointer-events-auto relative m-0 w-full cursor-text rounded-lg border-0 bg-slate-200 px-5 py-2 text-xl font-normal not-italic outline-none placeholder:text-gray-400 focus:ring-slate-500"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block pl-1 text-sm font-semibold leading-6 text-gray-900">{t("contact.email")}*</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                autoComplete="email" 
                                required 
                                className="pointer-events-auto relative m-0 w-full cursor-text rounded-lg border-0 bg-slate-200 px-5 py-2 text-xl font-normal not-italic outline-none placeholder:text-gray-400 focus:ring-slate-500"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block pl-1 text-sm font-semibold leading-6 text-gray-900">{t("contact.company")}</label>
                            <input 
                                type="text" 
                                name="company" 
                                id="company" 
                                autoComplete="organization" 
                                className="pointer-events-auto relative m-0 w-full cursor-text rounded-lg border-0 bg-slate-200 px-5 py-2 text-xl font-normal not-italic outline-none placeholder:text-gray-400 focus:ring-slate-500"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block pl-1 text-sm font-semibold leading-6 text-gray-900">{t("contact.message")}*</label>
                            <textarea 
                                name="message" 
                                id="message" 
                                rows={4} 
                                required 
                                className="pointer-events-auto relative m-0 w-full cursor-text rounded-lg border-0 bg-slate-200 px-5 py-2 text-xl font-normal not-italic outline-none placeholder:text-gray-400 focus:ring-slate-500"
                            />
                        </div>
                        <div className="flex gap-x-4 sm:col-span-2">
                            <label className="text-sm leading-6 text-gray-600">
                                {t("contact.agree")}{' '}
                                <Link href="/privacy" className="font-semibold text-slate-800">privacy policy</Link>.
                            </label>
                        </div>
                    </div>
                    <div className="flex pt-10">
                        <div className="rounded-lg bg-zinc-900">
                            <button
                                type="submit"
                                className="flex h-10 w-full max-w-52 flex-1 items-center justify-center px-4 py-2 text-xl text-slate-200 transition-all hover:text-white sm:w-auto md:font-bold lg:h-10"
                            >
                                {t("contact.send")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
