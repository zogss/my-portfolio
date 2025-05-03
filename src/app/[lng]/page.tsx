import React from 'react';

import PageLayout from '@/components/layout/PageLayout';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import HomeSection from '@/components/sections/HomeSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechStackSection from '@/components/sections/TechStackSection';

const IndexPage: React.FC = () => (
  <PageLayout>
    <HomeSection />
    <AboutSection />
    <ProjectsSection />
    <ExperienceSection />
    <TechStackSection />
    <ContactSection />
  </PageLayout>
);

export default IndexPage;
