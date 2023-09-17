import { HeadFC, graphql } from 'gatsby'
import * as React from 'react'
import Seo from '~/components/Seo'
import PageLayout from '~/layouts/PageLayout'
import AboutSection from '~/partials/sections/AboutSection'
import ContactSection from '~/partials/sections/ContactSection'
import HomeSection from '~/partials/sections/HomeSection'
import ProjectsSection from '~/partials/sections/ProjectsSection'
import TechStackSection from '~/partials/sections/TechStackSection'

export const Head: HeadFC = (props) => <Seo title="Yan Lucas" {...props} />

const IndexPage: React.FC = () => (
  <PageLayout>
    <HomeSection />
    <AboutSection />
    <ProjectsSection />
    <TechStackSection />
    <ContactSection />
  </PageLayout>
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
