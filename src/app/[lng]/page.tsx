import React from 'react';

import { env } from '@env';
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

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yan Lucas',
    url: env.APP_URL,
    jobTitle: 'Frontend Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Skim',
      url: 'https://skim.plus',
    },
    sameAs: [
      env.NEXT_PUBLIC_GITHUB_URL,
      env.NEXT_PUBLIC_LINKEDIN_URL,
      env.NEXT_PUBLIC_INSTAGRAM_URL,
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'React Native',
      'Frontend Development',
      'Web Development',
      'Mobile Development',
      'Chrome Extension Development',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yan Lucas',
    url: env.APP_URL,
    author: {
      '@type': 'Person',
      name: 'Yan Lucas',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <PageLayout>
        <HomeSection />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <ExperienceSection />
        <TechStackSection />
        <ContactSection />
      </PageLayout>
    </>
  );
};

export default IndexPage;
