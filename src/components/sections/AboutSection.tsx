'use client';

import React from 'react';
import Image from 'next/image';
import { differenceInYears } from 'date-fns';

import { env } from '@env';
import { useTranslation } from '@/i18n/client';
import TitleEclipse from '@/components/svgs/TitleEclipse';

import myImage from '@public/images/about_image.png';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="nav-about"
      className="3xl:min-h-lg relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
        <TitleEclipse className="absolute top-1/2 left-1/2 h-[21.875rem] -translate-x-1/2 -translate-y-1/2 md:h-[25rem] lg:h-[50rem]" />
        <div className="h-10 w-full text-center sm:h-12 md:h-16">
          <h2 className="text-shadow-primary absolute left-1/2 w-full -translate-x-1/2 text-4xl leading-[100.5%] font-black tracking-[.08rem] whitespace-nowrap text-white/80 uppercase mix-blend-overlay backdrop-blur-[.1766rem] sm:text-5xl md:w-auto md:text-[4rem]">
            {t('about_me')}
          </h2>
        </div>
      </div>
      <div
        data-transition="animate"
        className="z-[1] flex w-full flex-col items-center gap-10 md:gap-12 xl:flex-row xl:items-start xl:justify-center 2xl:gap-16"
      >
        <div data-transition-target="left" className="relative shrink-0 p-3">
          <Image
            src={myImage}
            alt={t('about_image_alt')}
            priority
            quality={100}
            className="relative z-[1] h-[14.375rem] w-[18.75rem] rounded-3xl shadow-2xl md:h-[21.625rem] md:w-[28.125rem] 2xl:h-[25rem] 2xl:w-[34.375rem]"
          />
          <div className="absolute inset-0 bg-black/70 blur-3xl" />
        </div>
        <div
          data-transition-target="right"
          className="flex w-full flex-col items-center text-sm text-zinc-500 md:text-base lg:text-lg"
        >
          <h3 className="mb-[1.125rem] block max-w-xl text-center text-lg leading-tight font-bold text-neutral-100 md:text-xl md:leading-normal lg:text-2xl xl:max-w-none xl:text-start">
            {t('about_section_text_part_1', {
              location: env.NEXT_PUBLIC_PERSONAL_LOCATION,
            })}
          </h3>
          <p className="mb-3">
            {t('about_section_text_part_2', {
              age: differenceInYears(new Date(), new Date(2003, 0, 20)),
              experience: differenceInYears(new Date(), new Date(2021, 10, 15)),
            })}
          </p>
          <p className="mb-3">{t('about_section_text_part_3')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
