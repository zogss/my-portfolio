import React from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';

import { env } from '@env';
import { TRACK_EVENT_KEYS } from '@/lib/track-event-keys';
import { useTranslation } from '@/i18n/client';
import { navLinks } from '@/components/HeaderLinks';
import SocialLinks from '@/components/SocialLinks';
import FigmaIcon from '@/components/svgs/FigmaIcon';
import YIcon from '@/components/svgs/YIcon';

interface FooterProps {
  hideSectionLinks?: boolean;
}

const Footer: React.FC<FooterProps> = ({ hideSectionLinks }) => {
  const { t } = useTranslation();

  return (
    <footer className="from-charcoal-black-700 flex flex-col items-center justify-center gap-6 self-stretch bg-gradient-to-b to-black/80 px-[10%] pt-12 pb-6 md:px-[15%]">
      <div className="flex w-full flex-col items-center justify-between gap-8 self-stretch sm:flex-row md:items-start md:gap-3">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <Link
            href={hideSectionLinks ? '/' : '#home'}
            title={t('navigate_home')}
            aria-label={t('navigate_home')}
            className="flex shrink-0"
          >
            <YIcon
              aria-label={t('yan_logo_alt')}
              className="size-24 shrink-0 md:size-32 lg:size-36"
            />
            <span className="sr-only">{t('yan_logo_alt')}</span>
          </Link>
          {!hideSectionLinks && (
            <div className="hidden flex-col items-start gap-1 py-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.to || '/'}
                  title={t(link.name)}
                  className="flex w-full rounded px-3.5 py-3 pr-8 text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
                >
                  {t(link.name)}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-end gap-2 self-stretch md:items-end md:gap-7">
          <SocialLinks className="w-full justify-center gap-4 md:justify-end" />
          <div className="w-fit rounded-lg bg-gradient-to-b from-violet-500 to-violet-700 p-[.0625rem] md:w-full">
            <Link
              href={`mailto:${env.NEXT_PUBLIC_PERSONAL_EMAIL}`}
              title={env.NEXT_PUBLIC_PERSONAL_EMAIL}
              onClick={() => {
                track(TRACK_EVENT_KEYS.EMAIL_CLICK);
              }}
              className="bg-gradient-tertiary flex w-fit items-center justify-center gap-2.5 rounded-lg px-[1.375rem] py-2.5 text-sm md:w-full md:text-base"
            >
              {env.NEXT_PUBLIC_PERSONAL_EMAIL}
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[.0625rem] w-full self-stretch bg-white/20" />
      <div className="flex w-full flex-col-reverse items-center justify-center gap-3 self-stretch sm:flex-row sm:justify-between">
        <span className="text-xs font-medium text-neutral-100/70 sm:text-white/40">
          @ {new Date().getFullYear()} Yan Lucas.
        </span>
        <Link
          href={env.NEXT_PUBLIC_INSPIRATION_FIGMA_URL}
          target="_blank"
          rel="noreferrer"
          title={env.NEXT_PUBLIC_INSPIRATION_FIGMA_URL}
          onClick={() => {
            track(TRACK_EVENT_KEYS.KC_STUDIO_CLICK);
          }}
          className="flex items-center justify-center gap-3 rounded px-3 py-2 text-xs font-medium text-white/40 transition-colors duration-500 hover:bg-zinc-700 hover:text-neutral-300"
        >
          {t('inspired_text', { name: '@KC Studio' })}
          <FigmaIcon aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
