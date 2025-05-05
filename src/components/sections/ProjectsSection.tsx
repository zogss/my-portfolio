'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectType } from '@/utils';

import { useTranslation } from '@/i18n/client';
import ProjectsBlock from '@/components/projects/ProjectsBlock';
import TitleEclipse from '@/components/svgs/TitleEclipse';

interface ProjectsSectionProps {
  projects?: ProjectType[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects = [] }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <section
      id="nav-projects"
      className="3xl:min-h-lg relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[9%] md:py-14 lg:gap-16"
    >
      <div className="flex w-full flex-col items-center gap-2.5 self-stretch">
        <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
          <TitleEclipse className="absolute top-1/2 left-1/2 h-[31.25rem] -translate-x-1/2 -translate-y-1/2 lg:h-[50rem]" />
          <div className="h-10 w-full text-center sm:h-12 md:h-16">
            <h2 className="text-shadow-primary absolute left-1/2 w-full -translate-x-1/2 text-4xl leading-[100.5%] font-black tracking-[.08rem] whitespace-nowrap text-white/80 uppercase mix-blend-overlay backdrop-blur-[.1766rem] sm:text-5xl md:w-auto md:text-[4rem]">
              {t('projects')}
            </h2>
          </div>
        </div>
        <div data-transition="animate" className="flex w-full justify-center">
          <h3
            data-transition-target="up"
            className="z-[1] flex flex-col items-center gap-1.5 lg:gap-2.5"
          >
            <span className="text-center font-semibold md:text-lg lg:text-xl">
              {t('projects_section_text_part_1')}
            </span>
            <span className="text-center text-sm font-medium text-zinc-500 md:text-base lg:text-lg">
              {t('projects_section_text_part_2')}
            </span>
          </h3>
        </div>
      </div>
      <ProjectsBlock projects={projects} />
      <Link
        href={`/${language}/projects`}
        title={t('view_all_projects')}
        className="bg-midnight-slate-700 shadow-primary hover:bg-midnight-slate-400 z-[2] flex items-center justify-center rounded-md px-4 py-2 transition-colors md:px-5 md:py-2.5"
      >
        <span className="text-sm leading-tight font-medium md:text-base">
          {t('view_all_projects')}
        </span>
      </Link>
    </section>
  );
};

export default ProjectsSection;
