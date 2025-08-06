import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectType } from '@/utils';

import { useTranslation } from '@/i18n/client';
import { AnimationContainer } from '@/components/animation-container';
import ProjectTripleDots from '@/components/variants/projectTripleDots';

const ProjectCard: React.FC<ProjectType> = ({ image, alt, slug, title }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <AnimationContainer className="size-auto">
      <article className="flex flex-col">
        <Link
          href={`/${language}/projects/${slug}`}
          className="flex flex-col items-center gap-3"
        >
          <div className="group/projectCard bg-midnight-slate-700 relative overflow-hidden rounded-md p-2.5 transition-colors duration-500 hover:bg-neutral-300/20 md:p-3.5">
            <div className="z-[1] flex flex-col items-center gap-2 self-stretch md:gap-3">
              <div className="group/projectImg relative max-h-[11.875rem] shrink-0 overflow-hidden rounded border border-transparent transition-colors duration-500 group-hover/projectCard:border-neutral-400/20 sm:h-[11.875rem] sm:max-h-max 2xl:h-[12.8125rem]">
                <Image
                  src={image}
                  alt={t(alt)}
                  width={2400}
                  height={1200}
                  className="aspect-[18/9] max-h-[11.875rem] w-full [transition:transform_5000ms_cubic-bezier(0.7,0,0.7,1.01),max-height_200ms] hover:transform-[scale(150%)] sm:w-auto 2xl:max-h-[12.8125rem]"
                />
                <div className="shadow-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/70 px-5 py-1.5 opacity-0 transition-[background-color,opacity] duration-500 group-hover/projectImg:opacity-100 hover:bg-black">
                  <span className="text-sm font-medium text-neutral-300 lg:text-base">
                    {t('view_project')}
                  </span>
                </div>
              </div>
              <header className="flex w-full items-center justify-center gap-3 lg:gap-5 xl:w-fit">
                <ProjectTripleDots color={slug} size="sm" />
                <span className="m-0 text-lg font-semibold text-neutral-300 lg:pr-4 lg:text-xl xl:pr-0">
                  {t(title)}
                </span>
              </header>
            </div>
          </div>
        </Link>
      </article>
    </AnimationContainer>
  );
};

export default ProjectCard;
