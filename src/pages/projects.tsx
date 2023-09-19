import { HeadFC, PageProps, graphql } from 'gatsby'
import React from 'react'
import PageHeader from '~/components/PageHeader'
import Seo from '~/components/Seo'
import ProjectsBlock from '~/components/projects/ProjectsBlock'
import PageLayout from '~/layouts/PageLayout'
import { ProjectType, ProjectsQueryType } from '~/utils'

export const Head: HeadFC = (props) => <Seo title="Projects | Yan Lucas" {...props} />

const ProjectsPage: React.FC<
  PageProps<I18nPageData & ProjectsQueryType & { image: ProjectType['image'] }>
> = ({ data, location }) => (
  <PageLayout hideSectionLinks>
    <PageHeader
      title="projects"
      subtitle="projects_page_subtitle"
      location={location}
      image={{
        src: data.image,
        alt: 'projects_page_image_alt',
      }}
    />
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[9%] md:py-14 lg:gap-16">
      <ProjectsBlock projects={data.content.nodes} />
    </div>
  </PageLayout>
)

export default ProjectsPage

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
    content: allProject {
      nodes {
        title
        slug
        description
        url
        repository_url
        alt
        image {
          base
          childImageSharp {
            gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 100, formats: [AUTO, WEBP, AVIF])
          }
        }
        techs
      }
    }
    image: file(relativePath: { eq: "code_image.jpg" }) {
      base
      childImageSharp {
        gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 100, formats: [AUTO, WEBP, AVIF])
      }
    }
  }
`
