import React from 'react';

import { getProjects } from '@/actions/getProjects';
import PageLayout from '@/components/layout/PageLayout';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import HomeSection from '@/components/sections/HomeSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechStackSection from '@/components/sections/TechStackSection';

const IndexPage: React.FC = async () => {
  const projects = await getProjects();

  return (
    <PageLayout>
      <HomeSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <ExperienceSection />
      <TechStackSection />
      <ContactSection />
    </PageLayout>
  );
};

export default IndexPage;
