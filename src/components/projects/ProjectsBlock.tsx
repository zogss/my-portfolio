'use client';

import React from 'react';
import { ProjectType } from '@/utils';

// import ProjectCard from './project/ProjectCard';

export interface ProjectsBlockProps {
  projects: ProjectType[];
}

const ProjectsBlock: React.FC<ProjectsBlockProps> = () => (
  <div className="z-[1] flex flex-wrap items-center justify-center gap-3 self-stretch lg:gap-4">
    {/* {projects.map((project, index) => (
      <ProjectCard key={`${project.slug}-${index}`} {...project} />
    ))} */}
  </div>
);

export default ProjectsBlock;
