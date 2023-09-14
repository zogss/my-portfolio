import { graphql, useStaticQuery } from 'gatsby'
import {
  GatsbyImage,
  getImage,
  type IGatsbyImageData,
  type ImageDataLike,
} from 'gatsby-plugin-image'
import React from 'react'
import { ProjectObjType } from '~/utils'
import ProjectCard from './ProjectCard'

export const PROJECTS_IMAGES_QUERY = graphql`
  query {
    images: allFile(sort: { base: ASC }, filter: { relativeDirectory: { eq: "projects" } }) {
      nodes {
        id
        base
        childImageSharp {
          gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 100, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  }
`

export interface ProjectsImagesQuery {
  images: {
    nodes: ImageDataLike &
      {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
        id: string
        base: string
      }[]
  }
}

const ProjectsBlock: React.FC = () => {
  //* hooks
  const { images } = useStaticQuery<ProjectsImagesQuery>(PROJECTS_IMAGES_QUERY)

  //* render
  return (
    <div className="z-[1] flex flex-wrap items-center justify-center gap-6 self-stretch lg:flex-col">
      {projects.map((project, index) => (
        <ProjectCard key={index} index={index} {...project}>
          <GatsbyImage
            image={
              getImage(images.nodes.find((img) => img.base.split('.')[0] === project.image_name)!)!
            }
            alt={project.alt}
            className="aspect-[18/9] max-h-[12.5rem] w-full transition-all duration-[5000ms] ease-[cubic-bezier(0.7,0,0.7,1.01)] hover:scale-125 sm:w-auto 2xl:max-h-[13.75rem]"
          />
        </ProjectCard>
      ))}
    </div>
  )
}

export default ProjectsBlock

type ProjectType = ProjectObjType & {
  image_name: string
}

const projects: ProjectType[] = [
  {
    title: 'Spacie',
    description: 'spacie_description',
    image_name: 'spacie_image',
    url: 'https://app.spacie.com.br/',
    repository_url: null,
    alt: 'spacie_alt',
    techs: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'TailwindCSS',
      'Bootstrap',
      'React Hook Form',
      'Yup',
      'Axios',
      'React Query',
      'React Table',
      'ApexCharts',
      'Socket.io Client',
      'i18next',
      'Vite',
      'Firebase',
    ],
  },
  {
    title: 'CS Analytics',
    description: 'cs_analytics_description',
    image_name: 'cs_analytics_image',
    url: 'https://main.d117z3353iltcd.amplifyapp.com/',
    repository_url: null,
    alt: 'cs_analytics_alt',
    techs: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'TailwindCSS',
      'React Hook Form',
      'Zod',
      'Axios',
      'React Query',
      'React Table',
      'ApexCharts',
      'Vite',
      'Recoil',
      'Popper.js',
      'Font Awesome',
    ],
  },
  {
    title: 'Expert Stats',
    description: 'expert_stats_description',
    image_name: 'expert_stats_image',
    url: 'https://expertstats.com.br/',
    repository_url: null,
    alt: 'expert_stats_alt',
    techs: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Angular',
      'Angular Forms',
      'Angular Material',
      'Bootstrap',
      'RxJS',
      'Popper.js',
      'Axios',
      'ApexCharts',
      'Font Awesome',
    ],
  },
  {
    title: 'Chirp',
    description: 'chirp_description',
    image_name: 'chirp_image',
    url: 'https://chirp-zogss.vercel.app/',
    repository_url: 'https://github.com/zogss/chirp',
    alt: 'chirp_alt',
    techs: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Clerk',
      'Trpc',
      'Upstash',
      'Prisma',
      'TailwindCSS',
      'Zod',
    ],
  },
  {
    title: 'Massagueirinha Menu',
    description: 'massagueirinha_menu_description',
    image_name: 'massagueirinha_image',
    url: 'https://massaguerinha-menu-cc348.web.app/',
    repository_url: null,
    alt: 'massagueirinha_menu_alt',
    techs: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Gatsby',
      'Firebase',
      'TailwindCSS',
    ],
  },
  {
    title: 'Bull Blockchain',
    description: 'bull_blockchain_description',
    image_name: 'bullblockchain_image',
    url: null,
    repository_url: 'https://github.com/zogss/blockchains-website/',
    alt: 'bull_blockchain_alt',
    techs: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Express',
      'Handlebars',
      'Alpine',
      'Bootstrap',
      'MongoDB',
      'Yup',
    ],
  },
]
