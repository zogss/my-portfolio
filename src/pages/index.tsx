/* eslint-disable @typescript-eslint/no-explicit-any */
import { graphql, type PageProps } from 'gatsby'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
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

export const Head = () => {
  //* hooks
  const { t } = useTranslation()

  //* render
  return <Seo title={t('Home')} />
}

export interface IndexPageProps extends PageProps {
  data: {
    locales: { edges: any[] }
    photos: { edges: any[] }
    projects: { nodes: ProjectObjType[] }
  }
}

const IndexPage: React.FC<IndexPageProps> = (props) => (
  <MainLayout pageProps={props}>
    <HomeSection />
    <AboutSection />
    <ProjectsSection projects={props.data.projects.nodes} />
    <TechStackSection />
    <ContactSection />
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
      filter: { extension: { regex: "/(png)/" } }
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
        alt
        color
        techs
        img
      }
    }
  }
`
