import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { APP_NAME, BASE_KEYWORDS_EN, BASE_KEYWORDS_PT } from '@/constants';
import { getTranslation } from '@/i18n';

import { env } from '@env';
import { getProject, getProjects } from '@/actions/getProjects';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/PageHeader';
import ProjectBlock from '@/components/projects/project/ProjectBlock';

export const generateStaticParams = async () => {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
};

interface ProjectProps {
  params: Promise<{
    lng: string;
    slug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: ProjectProps): Promise<Metadata> => {
  const { lng, slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const {
    t,
    i18n: { language },
  } = await getTranslation(lng);

  const description = t(project.short_description);
  const ogImageUrl = `${env.APP_URL}${project.image}`;

  return {
    metadataBase: new URL(env.APP_URL),
    title: project.title,
    description,
    keywords: language === 'en' ? BASE_KEYWORDS_EN : BASE_KEYWORDS_PT,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: project.title,
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
      canonical: `${env.APP_URL}/${lng}/projects/${slug}`,
      languages: {
        'x-default': `${env.APP_URL}/en/projects/${slug}`,
        'pt-BR': `${env.APP_URL}/pt-BR/projects/${slug}`,
        en: `${env.APP_URL}/en/projects/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      siteName: APP_NAME,
      url: `${env.APP_URL}/${lng}/projects/${slug}`,
      title: project.title,
      description,
      locale: language === 'pt-BR' ? 'pt_BR' : 'en_US',
      alternateLocale: language === 'pt-BR' ? 'en_US' : 'pt_BR',
      images: [
        {
          url: ogImageUrl,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@yanlucasp',
      title: project.title,
      description,
      images: [
        {
          url: ogImageUrl,
          alt: project.title,
        },
      ],
    },
  };
};

const Project: React.FC<ProjectProps> = async ({ params }) => {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageLayout hideSectionLinks>
      <PageHeader
        title={project.title}
        subtitle={project.subtitle}
        pathname={`/projects/${project.slug}`}
        image={{
          src: project.image,
          alt: project.alt,
        }}
      />
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16">
        <ProjectBlock {...project} />
      </div>
    </PageLayout>
  );
};

export default Project;
