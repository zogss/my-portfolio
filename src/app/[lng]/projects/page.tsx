import React from 'react';
import { Metadata } from 'next';
import { APP_NAME, BASE_KEYWORDS_EN, BASE_KEYWORDS_PT } from '@/constants';
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

  const title = t('projects_page_title');
  const description = t('projects_page_description');
  const ogImageUrl = `${env.APP_URL}/images/logo.png`;

  return {
    metadataBase: new URL(env.APP_URL),
    title,
    description,
    keywords: language === 'en' ? BASE_KEYWORDS_EN : BASE_KEYWORDS_PT,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title,
    },
    authors: {
      name: 'Yan Lucas',
      url: env.APP_URL,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${env.APP_URL}/${lng}/projects`,
      languages: {
        'x-default': `${env.APP_URL}/en/projects`,
        'pt-BR': `${env.APP_URL}/pt-BR/projects`,
        en: `${env.APP_URL}/en/projects`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: APP_NAME,
      url: `${env.APP_URL}/${lng}/projects`,
      title,
      description,
      locale: language === 'pt-BR' ? 'pt_BR' : 'en_US',
      alternateLocale: language === 'pt-BR' ? 'en_US' : 'pt_BR',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: APP_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@yanlucasp',
      title,
      description,
      images: [
        {
          url: ogImageUrl,
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
