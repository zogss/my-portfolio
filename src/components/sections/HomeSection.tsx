'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils';

import { useTranslation } from '@/i18n/client';
import SocialLinks from '@/components/SocialLinks';
import HomeEclipse from '@/components/svgs/HomeEclipse';

import { AnimationContainer } from '../animation-container';

const HomeSection: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <section
      id="nav-home"
      className="flex min-h-screen w-full flex-col items-center justify-center"
    >
      <HomeEclipse className="absolute top-[55vh] left-[40%] h-150 -translate-x-1/2 -translate-y-1/2 md:top-[50vh] lg:top-[40vh] lg:h-200 xl:top-[45vh]" />
      <div className="flex w-full flex-col-reverse items-center justify-end gap-10 px-[10%] md:justify-center md:gap-5 md:px-[15%] md:pt-0 lg:flex-col">
        <div className="flex w-full flex-col items-center justify-start gap-8 md:gap-12 lg:items-start lg:gap-14 lg:pb-10 2xl:pb-16">
          <div className="flex flex-col items-start justify-start gap-6">
            <div
              className={cn(
                'flex w-full mix-blend-overlay',
                language === 'pt-BR'
                  ? '3xl:h-16 h-36 md:h-48 lg:h-32'
                  : 'h-24 md:h-32 xl:h-16',
              )}
            >
              <h1
                className={cn(
                  'text-shadow-primary absolute left-1/2 -translate-x-1/2 text-center text-5xl leading-[100.5%] font-black tracking-[.08rem] text-white/80 uppercase backdrop-blur-[.1766rem] sm:max-w-xs md:flex md:justify-center md:text-[4rem] lg:left-auto lg:block lg:translate-x-0 lg:text-start',
                  language === 'pt-BR'
                    ? '3xl:max-w-none 3xl:whitespace-nowrap lg:max-w-xl'
                    : 'lg:max-w-xs xl:max-w-none xl:whitespace-nowrap',
                )}
              >
                {t('software_engineer')}
              </h1>
            </div>
            <h2 className="z-3 text-zinc-400">
              <p className="w-full max-w-sm text-center font-medium lg:text-start">
                {t('home_section_description_part_1')}{' '}
                <b className="font-bold text-white">Yan Lucas</b>
                {t('home_section_description_part_2')}
              </p>
            </h2>
          </div>
          <SocialLinks
            animate
            className="z-3 gap-2 text-white/40"
            iconSize="lg"
          />
        </div>
        <AnimationContainer
          orientation="horizontal"
          className={cn(
            'shadow-primary relative z-2 flex size-50 items-start overflow-hidden rounded-full border border-white/5 bg-linear-to-bl from-zinc-800/50 to-black/10 md:size-75 md:translate-y-0 lg:absolute lg:right-[5%] lg:h-auto lg:w-175 lg:items-center lg:justify-end lg:overflow-auto lg:rounded-2xl lg:border-none lg:bg-linear-to-l lg:from-black/30 lg:to-black/0 lg:shadow-none xl:right-[6%] 2xl:right-[12%]',
            language === 'pt-BR'
              ? ''
              : 'xl:translate-y-[9%] 2xl:translate-y-[7%]',
          )}
        >
          <Image
            src="/images/yan_main_photo.png"
            alt={t('yan_main_photo_alt')}
            priority
            quality={85}
            width={620}
            height={620}
            className="z-3 size-50 shrink-0 translate-y-4 rounded-full md:size-87.5 md:translate-y-0 md:rounded-none lg:z-0 lg:size-130 2xl:size-155"
          />
        </AnimationContainer>
      </div>
    </section>
  );
};

export default HomeSection;
