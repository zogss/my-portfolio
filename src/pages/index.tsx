import { graphql } from 'gatsby'
import * as React from 'react'
import ScrollSpy from 'react-ui-scrollspy'
import Seo from '~/components/Seo'
import MainLayout from '~/layouts/MainLayout'
import {
  AboutSection,
  ContactSection,
  HomeSection,
  ProjectsSection,
  TechStackSection,
} from '~/partials/sections'

export const Head = () => <Seo title="Yan Lucas" />

const IndexPage: React.FC = () => (
  <MainLayout>
    <ScrollSpy offsetBottom={100}>
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />
    </ScrollSpy>
  </MainLayout>
)

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
