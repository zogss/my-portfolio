'use client';

import React from 'react';
import Image from 'next/image';
import { differenceInYears } from 'date-fns';

import { env } from '@env';
import { useTranslation } from '@/i18n/client';
import TitleEclipse from '@/components/svgs/TitleEclipse';

import myImage from '@public/images/about_image.png';

const AboutSection: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <section
      id="nav-about"
      className="3xl:min-h-lg relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[72px]">
        <TitleEclipse className="absolute top-1/2 left-1/2 h-[350px] -translate-x-1/2 -translate-y-1/2 md:h-[400px] lg:h-[800px]" />
        <div className="h-10 w-full text-center sm:h-12 md:h-16">
          <h2 className="text-shadow-primary absolute left-1/2 w-full -translate-x-1/2 text-4xl leading-[100.5%] font-black tracking-[1.28px] whitespace-nowrap text-white/80 uppercase mix-blend-overlay backdrop-blur-[2.8256px] sm:text-5xl md:w-auto md:text-[64px]">
            {t('about_me')}
          </h2>
        </div>
      </div>
      <div
        data-transition="animate"
        className="relative z-[1] text-sm font-medium text-zinc-400 md:gap-12 md:text-base lg:text-lg xl:flex-row xl:items-start xl:justify-center 2xl:max-w-4xl 2xl:gap-16"
      >
        <div
          data-transition-target="left"
          className="relative float-left clear-left mr-10 mb-6 shrink-0"
        >
          <Image
            src={myImage}
            alt={t('about_image_alt')}
            priority
            quality={100}
            className="relative z-[1] h-[230px] w-auto rounded-3xl shadow-2xl md:h-[346px] 2xl:h-[250px]"
          />
          <div className="absolute inset-0 bg-black/70 blur-2xl" />
        </div>
        <p data-transition-target="right" className="relative z-[1] mb-3">
          {t('about_section_text_part_1', {
            age: differenceInYears(new Date(), new Date(2003, 0, 20)),
            location:
              language === 'pt-BR'
                ? env.NEXT_PUBLIC_PERSONAL_LOCATION_BR
                : env.NEXT_PUBLIC_PERSONAL_LOCATION_EN,
          })}
        </p>

        <p data-transition-target="right" className="relative z-[1] mb-3">
          {t('about_section_text_part_2')}
        </p>
        <p data-transition-target="right" className="relative z-[1] mb-3">
          {t('about_section_text_part_3')}
        </p>
        <p data-transition-target="right" className="relative z-[1] mb-3">
          {t('about_section_text_part_4')}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
