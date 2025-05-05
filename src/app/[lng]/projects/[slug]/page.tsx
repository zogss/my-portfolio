import React from 'react';
import { notFound } from 'next/navigation';

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
    slug: string;
  }>;
}

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
