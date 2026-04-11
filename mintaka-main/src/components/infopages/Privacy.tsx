import React from 'react';
import { useTranslations } from 'next-intl';
import Title from '@/components/global/Title';

const Privacy: React.FC = () => {
    const t = useTranslations();

    return (
        <section>
            <div className="mx-auto max-w-7xl px-8 py-12 md:px-12 lg:px-32 lg:py-32">
                <div>
                    <Title title="Privacy" subtitle="Last updated 01. Jan 2024" className="pb-10 pt-20 uppercase" />
                </div>
                <div className="prose prose-slate max-w-none mt-12 lg:mt-24">
                    <h2 id="shine-the-light-disclosure">{t("privacy.wip")}</h2>
                    <p>{t("privacy.wip.content")}</p>
                </div>
            </div>
        </section>
    );
};

export default Privacy;
