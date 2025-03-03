import * as React from 'react';
import {graphql, HeadFC, HeadProps} from 'gatsby';

import {PageContextType} from '@/utils';
import PageLayout from '@/layouts/PageLayout';
import AboutSection from '@/partials/sections/AboutSection';
import ContactSection from '@/partials/sections/ContactSection';
import ExperienceSection from '@/partials/sections/ExperienceSection';
import HomeSection from '@/partials/sections/HomeSection';
import ProjectsSection from '@/partials/sections/ProjectsSection';
import TechStackSection from '@/partials/sections/TechStackSection';
import Seo from '@/components/Seo';

export const Head: HeadFC<I18nPageData, PageContextType> = (
  props: HeadProps<I18nPageData, PageContextType>,
) => <Seo {...props} />;

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

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {ns: {in: ["common"]}, language: {eq: $language}}
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
