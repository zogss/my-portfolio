import React from 'react';
import PageLayout from '@/components/layout/PageLayout';

// import {
//   getStrFromLocaleCtx,
//   PageContextType,
//   ProjectsQueryType,
//   ProjectType,
// } from '@/utils';

// import PageHeader from '@/components/PageHeader';
import ProjectsBlock from '@/components/projects/ProjectsBlock';

// import Seo from '@/components/Seo';

// export const Head: HeadFC<I18nPageData, PageContextType> = (
//   props: HeadProps<I18nPageData, PageContextType>,
// ) => (
//   <Seo
//     title={`${getStrFromLocaleCtx(
//       props.data.locales.edges[0].node.data,
//       'projects',
//     )} - Yan Lucas`}
//     description={getStrFromLocaleCtx(
//       props.data.locales.edges[0].node.data,
//       'projects_page_description',
//     )}
//     metaTitle={`${getStrFromLocaleCtx(
//       props.data.locales.edges[0].node.data,
//       'projects',
//     )} - Yan Lucas`}
//     pathname="projects"
//     {...props}
//   />
// );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectsPage: React.FC<any> = ({ data }) => (
  <PageLayout hideSectionLinks>
    {/* <PageHeader
      title="projects"
      subtitle="projects_page_subtitle"
      location={location}
      image={{
        src: data.image,
        alt: 'projects_page_image_alt',
      }}
      hideOverlay
    /> */}
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[9%] md:py-14 lg:gap-16">
      <ProjectsBlock projects={data.content.nodes} />
    </div>
  </PageLayout>
);

export default ProjectsPage;
