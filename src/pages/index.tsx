import { graphql, type PageProps } from 'gatsby'
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
import { ProjectObjType } from '~/utils'

export const Head = () => <Seo title="Yan Lucas" />

export interface IndexPageProps extends PageProps {
  data: {
    locales: { edges: any[] }
    photos: { edges: any[] }
    projects: { nodes: ProjectObjType[] }
  }
}

const IndexPage: React.FC<IndexPageProps> = (props) => (
  <MainLayout pageProps={props}>
    <ScrollSpy offsetBottom={100} scrollThrottle={400}>
      <HomeSection />
      <AboutSection />
      <ProjectsSection projects={props.data.projects.nodes} />
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
    photos: allFile(
      sort: { fields: base, order: ASC }
      filter: { extension: { regex: "/(png)/" }, name: { in: ["br_flag", "en_flag"] } }
    ) {
      edges {
        node {
          id
          base
          childImageSharp {
            gatsbyImageData(placeholder: DOMINANT_COLOR, height: 400, formats: AUTO, width: 600)
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    projects: allProjectsJson {
      nodes {
        id
        title
        description
        url
        repository_url
        alt
        techs
        img
      }
    }
  }
`
