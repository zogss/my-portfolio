import React from 'react';

import { getProjects } from '@/actions/getProjects';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/PageHeader';
import ProjectsBlock from '@/components/projects/ProjectsBlock';

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
