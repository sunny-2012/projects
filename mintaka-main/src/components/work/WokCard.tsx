'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WokCardProps {
  image: string;
  project: string;
  link: string;
  description?: string;
  className?: string;
}

const WokCard: React.FC<WokCardProps> = ({ 
  image, 
  project, 
  link, 
  description, 
  className 
}) => {
  const t = useTranslations();

  // Convert @assets path to public path if needed, but we already copied them to /images/projects/
  const imageSrc = image.startsWith('@assets') 
    ? image.replace('@assets/images/projects/', '/images/projects/') 
    : image;

  return (
    <li className={cn("flex flex-col", className)}>
      <Link href={link as any} aria-label={`Project ${project}`}>
        <div className="relative h-[25rem] w-full overflow-hidden rounded-md lg:rounded-lg">
          <Image 
            className="object-cover"
            src={imageSrc} 
            alt={project}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
      <div className="px-2 py-8">
        <Link 
          href={link as any} 
          className="flex items-center justify-between text-base font-medium lg:gap-x-8 group"
        >
          <h3 className="font-mono text-lg font-medium uppercase tracking-wide md:mt-0 lg:text-xl">
            {project}
          </h3>
          <span className="text-right text-base group-hover:text-primary-700 transition-colors">
            <span className="hidden lg:inline-block">{t("projects.see")}</span>
            <span className="sr-only">{project}</span> &nbsp; &rarr;
          </span>
        </Link>
        {description && <p className="mt-8 line-clamp-2 text-sm text-slate-500">{description}</p>}
      </div>
    </li>
  );
};

export default WokCard;
