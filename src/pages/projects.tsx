import React from 'react';
import {graphql, HeadFC, HeadProps, PageProps} from 'gatsby';

import {
  getStrFromLocaleCtx,
  PageContextType,
  ProjectsQueryType,
  ProjectType,
} from '@/utils';
import PageLayout from '@/layouts/PageLayout';
import PageHeader from '@/components/PageHeader';
import ProjectsBlock from '@/components/projects/ProjectsBlock';
import Seo from '@/components/Seo';

export const Head: HeadFC<I18nPageData, PageContextType> = (
  props: HeadProps<I18nPageData, PageContextType>,
) => (
  <Seo
    title={`${getStrFromLocaleCtx(
      props.data.locales.edges[0].node.data,
      'projects',
    )} - Yan Lucas`}
    description={getStrFromLocaleCtx(
      props.data.locales.edges[0].node.data,
      'projects_page_description',
    )}
    metaTitle={`${getStrFromLocaleCtx(
      props.data.locales.edges[0].node.data,
      'projects',
    )} - Yan Lucas`}
    url="projects"
    {...props}
  />
);

const ProjectsPage: React.FC<
  PageProps<I18nPageData & ProjectsQueryType & {image: ProjectType['image']}>
> = ({data, location}) => (
  <PageLayout hideSectionLinks>
    <PageHeader
      title="projects"
      subtitle="projects_page_subtitle"
      location={location}
      image={{
        src: data.image,
        alt: 'projects_page_image_alt',
      }}
      hideOverlay
    />
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[9%] md:py-14 lg:gap-16">
      <ProjectsBlock projects={data.content.nodes} />
    </div>
  </PageLayout>
);

export default ProjectsPage;

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
    content: allProject {
      nodes {
        title
        slug
        image {
          base
          childImageSharp {
            gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 100
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        alt
      }
    }
    image: file(relativePath: {eq: "projects_background_image.jpg"}) {
      base
      childImageSharp {
        gatsbyImageData(
          placeholder: DOMINANT_COLOR
          quality: 100
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`;
