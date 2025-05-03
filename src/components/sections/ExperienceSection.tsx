'use client';
import React from 'react';
import { cn } from '@/utils';
import { capitalize } from '@/utils/helpers/capitalize';
import { useTranslation } from '@/i18n/client';
import { motion, Variants } from 'motion/react';

import { useWindowSize } from '@/hooks/useWindowSize';
import TitleEclipse from '@/components/svgs/TitleEclipse';

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.985,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const ExperienceSection: React.FC = () => {
  const { isSmaller } = useWindowSize({ breakpoint: 'md' });
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <section
      id="nav-experience"
      className="3xl:min-h-lg relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <div className="flex w-full flex-col items-center gap-2.5 self-stretch">
        <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
          <TitleEclipse className="absolute top-1/2 left-1/2 h-[31.25rem] -translate-x-1/2 -translate-y-1/2 lg:h-[50rem]" />
          <div className="h-10 w-full text-center sm:h-12 md:h-16">
            <h2 className="text-shadow-primary absolute left-1/2 w-full -translate-x-1/2 text-4xl leading-[100.5%] font-black tracking-[.08rem] whitespace-nowrap text-white/80 uppercase mix-blend-overlay sm:text-5xl md:w-auto md:text-[4rem]">
              {t('experience')}
            </h2>
          </div>
        </div>
        <div data-transition="animate" className="flex w-full justify-center">
          <h3
            data-transition-target="up"
            className="z-[1] flex flex-col items-center gap-1.5 lg:gap-2.5"
          >
            <span className="text-center font-semibold md:text-lg lg:text-xl">
              {t('experience_section_text_part_1')}
            </span>
            <span className="text-center text-sm font-medium text-zinc-500 md:text-base lg:text-lg">
              {t('experience_section_text_part_2')}
            </span>
          </h3>
        </div>
      </div>
      <div className="relative flex w-full justify-center">
        <div className="shadow-secondary absolute -top-8 left-0 h-[calc(100%+4rem)] w-1 -translate-x-1/2 bg-[linear-gradient(180deg,#08070c22_0%,#663BC3cc_20%,#663BC3cc_70%,#08070C_120%)] lg:left-1/2" />
        <div className="relative w-full lg:-space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: isSmaller ? 0.4 : 0.2,
              }}
              variants={itemVariants}
              className={cn(
                'relative flex w-full translate-x-4 items-center',
                index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end',
              )}
            >
              <div
                className={cn(
                  'flex w-full flex-col gap-2 pb-8 pl-8 lg:w-[calc(50%-1rem)]',
                  index % 2 === 0
                    ? 'lg:items-end lg:pr-8 lg:text-right'
                    : 'lg:items-start lg:pl-8',
                )}
              >
                <div
                  className={cn(
                    'flex lg:absolute lg:top-1/2 lg:z-[1] lg:-translate-y-1/2',
                    index % 2 === 0
                      ? 'lg:right-1/2 lg:translate-x-[calc(100%+24px)]'
                      : 'lg:left-1/2 lg:translate-x-[calc((100%+24px)*-1)]',
                  )}
                >
                  <span className="text-sm font-medium text-neutral-400">
                    {capitalize(
                      exp.period.from.toLocaleDateString(
                        language === 'pt-BR' ? 'pt-BR' : 'en-US',
                        {
                          month: 'short',
                          year: 'numeric',
                        },
                      ),
                    )}{' '}
                    -{' '}
                    {exp.period.to
                      ? capitalize(
                          exp.period.to.toLocaleDateString(
                            language === 'pt-BR' ? 'pt-BR' : 'en-US',
                            {
                              month: 'short',
                              year: 'numeric',
                            },
                          ),
                        )
                      : t('at_the_moment')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-300">
                  {t(exp.role)}
                </h3>
                <span className="text-base font-medium text-zinc-400">
                  {exp.company}
                </span>
                <p className="max-w-lg text-sm leading-relaxed text-zinc-400/85">
                  {t(exp.description)}
                </p>
              </div>
              <div className="shadow-white-sm absolute top-1/2 left-0 z-[1] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 lg:left-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

export const experiences = [
  {
    company: 'Tracking Trade',
    role: 'web_development_intern',
    period: {
      from: new Date('2023-11-01'),
      to: undefined,
    },
    description: 'tracking_trade_description',
  },
  {
    company: 'inkPen',
    role: 'software_engineer_and_technical_leader',
    period: {
      from: new Date('2023-08-01'),
      to: new Date('2024-12-31'),
    },
    description: 'inkPen_description',
  },
  {
    company: 'O Personal Digital',
    role: 'frontend_developer',
    period: {
      from: new Date('2022-07-01'),
      to: new Date('2024-04-30'),
    },
    description: 'opd_description',
  },
  {
    company: 'Lisbom Dev',
    role: 'software_engineer',
    period: {
      from: new Date('2022-07-01'),
      to: new Date('2024-04-30'),
    },
    description: 'lisbom_dev_description',
  },
  {
    company: 'Truck Up',
    role: 'software_engineer',
    period: {
      from: new Date('2023-01-01'),
      to: new Date('2023-03-31'),
    },
    description: 'truck_up_description',
  },
];
