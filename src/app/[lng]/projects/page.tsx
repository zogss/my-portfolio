import React from 'react';
import { Metadata } from 'next';
import { APP_NAME } from '@/constants';
import { getTranslation } from '@/i18n';

import { env } from '@env';
import { WithLanguageParams } from '@/@types/i18n.types';
import { getProjects } from '@/actions/getProjects';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/PageHeader';
import ProjectsBlock from '@/components/projects/ProjectsBlock';

export const generateMetadata = async ({
  params,
}: WithLanguageParams): Promise<Metadata> => {
  const { lng } = await params;
  const {
    t,
    i18n: { language },
  } = await getTranslation(lng);

  return {
    title: t('projects_page_title'),
    description: t('projects_page_description'),
    keywords:
      language === 'en'
        ? [
            'Yan',
            'Lucas',
            'Yan Lucas',
            'Yan lucas pereira branco',
            'Yan Lucas software engineer',
            'Yan Lucas frontend developer',
            'Yan Lucas front-end developer',
            'Web development',
            'Software engineer',
            'Frontend',
            'FrontEnd',
            'Front-end',
            'Front end',
            'Front end developer',
            'Front-end developer',
            'FrontEnd developer',
            'Tech',
            'Programming',
            'Games',
            'Gaming',
            'Digital marketing',
            'Marketing',
            'Developer',
            'JavaScript',
            'TypeScript',
            'React',
            'Vue',
            'Angular',
            'Node.js',
            'CSS',
            'HTML',
            'Web design',
            'UI/UX',
            'GitHub',
            'Open source',
          ]
        : [
            'Yan',
            'Lucas',
            'Yan Lucas',
            'Yan lucas pereira branco',
            'Yan Lucas software engineer',
            'Yan Lucas engenheiro de software',
            'Yan Lucas frontend developer',
            'Yan Lucas front-end developer',
            'Yan Lucas desenvolvedor de frontend',
            'Yan Lucas desenvolvedor de front-end',
            'Web development',
            'Desenvolvimento web',
            'Software engineer',
            'Engenheiro de software',
            'Frontent',
            'Front-end',
            'Front end',
            'FrontEnd',
            'Frontend developer',
            'Front-end developer',
            'Front end developer',
            'FrontEnd developer',
            'Desenvolvedor de frontend',
            'Desenvolvedor de front-end',
            'Desenvolvedor front end',
            'Desenvolvedor front-end',
            'Desenvolvedor frontend',
            'Desenvolvedor frontEnd',
            'Tech',
            'Programming',
            'Games',
            'Gaming',
            'Programming',
            'Digital marketing',
            'Marketing',
            'Marketing digital',
            'Marketing-digital',
            'Developer',
            'JavaScript',
            'TypeScript',
            'React',
            'Vue',
            'Angular',
            'Node.js',
            'CSS',
            'HTML',
            'Web design',
            'UI/UX',
            'GitHub',
            'Open source',
          ],
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: t('projects_page_title'),
    },
    authors: {
      name: 'Yan Lucas',
      url: env.APP_URL,
    },
    robots: {
      index: true,
      follow: true,
      notranslate: lng === 'pt-BR',
    },
    alternates: {
      languages: {
        'pt-BR': `${env.APP_URL}/pt-BR`,
        en: `${env.APP_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: APP_NAME,
      url: `${env.APP_URL}/${lng}`,
      title: t('projects_page_title'),
      description: t('projects_page_description'),
      locale: lng,
      images: [
        {
          url: `${env.APP_URL}/images/logo.png`,
          width: 1600,
          height: 1600,
          alt: APP_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary',
      creator: 'Yan Lucas',
      title: t('projects_page_title'),
      description: t('projects_page_description'),
      images: [
        {
          url: `${env.APP_URL}/images/logo.png`,
          width: 1600,
          height: 1600,
          alt: APP_NAME,
        },
      ],
    },
  };
};

const ProjectsPage: React.FC = async () => {
  const projects = await getProjects();

  return (
    <PageLayout hideSectionLinks>
      <PageHeader
        title="projects"
        subtitle="projects_page_subtitle"
        pathname="/projects"
        image={{
          src: '/images/projects_background_image.png',
          alt: 'projects_page_image_alt',
        }}
        hideOverlay
      />
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[9%] md:py-14 lg:gap-16">
        <ProjectsBlock projects={projects} />
      </div>
    </PageLayout>
  );
};

export default ProjectsPage;
