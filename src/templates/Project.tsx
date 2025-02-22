import React from 'react';
import {graphql, HeadFC, HeadProps, PageProps} from 'gatsby';

import {getStrFromLocaleCtx, PageContextWithProject} from '@/utils';
import PageLayout from '@/layouts/PageLayout';
import PageHeader from '@/components/PageHeader';
import ProjectBlock from '@/components/projects/project/ProjectBlock';
import Seo from '@/components/Seo';

export const Head: HeadFC<I18nPageData, PageContextWithProject> = (
  props: HeadProps<I18nPageData, PageContextWithProject>,
) => (
  <Seo
    title={`${props.pageContext.project.title} - Yan Lucas`}
    description={getStrFromLocaleCtx(
      props.data.locales.edges[0].node.data,
      props.pageContext.project.short_description,
    )}
    pathname={`projects/${props.pageContext.project.slug}`}
    metaOgType="article"
    metaTitle={`${props.pageContext.project.title} - Yan Lucas`}
    metaTwitterCard="summary_large_image"
    image={
      props.pageContext.project.image.childImageSharp.gatsbyImageData.images
        .fallback?.src
    }
    imageAlt={getStrFromLocaleCtx(
      props.data.locales.edges[0].node.data,
      props.pageContext.project.alt,
    )}
    {...props}
  />
);

const Project: React.FC<PageProps<I18nPageData, PageContextWithProject>> = ({
  pageContext,
  location,
}) => (
  <PageLayout hideSectionLinks>
    <PageHeader
      title={pageContext.project.title}
      subtitle={pageContext.project.subtitle}
      location={location}
      image={{
        src: pageContext.project.image,
        alt: pageContext.project.alt,
      }}
    />
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16">
      <ProjectBlock {...pageContext.project} />
    </div>
  </PageLayout>
);

export default Project;

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
