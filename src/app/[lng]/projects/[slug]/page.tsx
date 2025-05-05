import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { APP_NAME } from '@/constants';
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

  return {
    title: project.title,
    description: t(project.short_description),
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
      title: project.title,
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
      type: 'article',
      siteName: APP_NAME,
      url: `${env.APP_URL}/${lng}`,
      title: project.title,
      description: t(project.short_description),
      locale: lng,
      images: [
        {
          url: `${env.APP_URL}${project.image}`,
          width: 1600,
          height: 1600,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: 'Yan Lucas',
      title: project.title,
      description: t(project.short_description),
      images: [
        {
          url: `${env.APP_URL}${project.image}`,
          width: 1600,
          height: 1600,
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
