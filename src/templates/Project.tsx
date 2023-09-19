import { HeadFC, PageProps, graphql } from 'gatsby'
import React from 'react'
import PageHeader from '~/components/PageHeader'
import Seo from '~/components/Seo'
import PageLayout from '~/layouts/PageLayout'
import { IProjectPageContext } from '~/utils'

export const Head: HeadFC<I18nPageData, IProjectPageContext> = (props) => (
  <Seo title={`${props.pageContext.project.title} | Yan Lucas`} {...props} />
)

const Project: React.FC<PageProps<I18nPageData, IProjectPageContext>> = ({
  pageContext,
  location,
}) => (
  <PageLayout hideSectionLinks>
    <PageHeader
      title={pageContext.project.title}
      subtitle="projects_page_subtitle"
      location={location}
      image={{
        src: pageContext.project.image,
        alt: pageContext.project.alt,
      }}
    />
    <div className="relatve flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16">
      project
    </div>
  </PageLayout>
)

export default Project

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
