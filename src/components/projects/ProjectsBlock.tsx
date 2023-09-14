import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { ProjectObjType } from '~/utils'
import ProjectCard from './ProjectCard'

const ProjectsBlock: React.FC = () => (
  <div className="z-[1] flex flex-col items-center gap-6 self-stretch">
    <ProjectCard index={0} {...projects[0]}>
      <StaticImage
        src="../../images/projects/spacie_image.png"
        alt={projects[0].alt}
        className="aspect-[18/9] h-full max-h-[12.5rem] transition-all duration-[5000ms] ease-[cubic-bezier(0,0.1,0.2,0.3,0.5,0.7,1.01)] hover:scale-125 2xl:max-h-[220px]"
      />
    </ProjectCard>
    <ProjectCard index={1} {...projects[1]}>
      <StaticImage
        src="../../images/projects/cs_analytics_image.png"
        alt={projects[1].alt}
        className="aspect-[18/9] h-full max-h-[12.5rem] transition-all duration-[5000ms] ease-[cubic-bezier(0,0.1,0.2,0.3,0.5,0.7,1.01)] hover:scale-125 2xl:max-h-[220px]"
      />
    </ProjectCard>
    <ProjectCard index={2} {...projects[2]}>
      <StaticImage
        src="../../images/projects/expert_stats_image.png"
        alt={projects[2].alt}
        className="aspect-[18/9] h-full max-h-[12.5rem] transition-all duration-[5000ms] ease-[cubic-bezier(0,0.1,0.2,0.3,0.5,0.7,1.01)] hover:scale-125 2xl:max-h-[220px]"
      />
    </ProjectCard>
    <ProjectCard index={3} {...projects[3]}>
      <StaticImage
        src="../../images/projects/chirp_image.png"
        alt={projects[3].alt}
        className="aspect-[18/9] h-full max-h-[12.5rem] transition-all duration-[5000ms] ease-[cubic-bezier(0,0.1,0.2,0.3,0.5,0.7,1.01)] hover:scale-125 2xl:max-h-[220px]"
      />
    </ProjectCard>
    <ProjectCard index={4} {...projects[4]}>
      <StaticImage
        src="../../images/projects/massagueirinha_image.png"
        alt={projects[4].alt}
        className="aspect-[18/9] h-full max-h-[12.5rem] transition-all duration-[5000ms] ease-[cubic-bezier(0,0.1,0.2,0.3,0.5,0.7,1.01)] hover:scale-125 2xl:max-h-[220px]"
      />
    </ProjectCard>
    <ProjectCard index={5} {...projects[5]}>
      <StaticImage
        src="../../images/projects/bullblockchain_image.png"
        alt={projects[5].alt}
        className="aspect-[18/9] h-full max-h-[12.5rem] transition-all duration-[5000ms] ease-[cubic-bezier(0,0.1,0.2,0.3,0.5,0.7,1.01)] hover:scale-125 2xl:max-h-[220px]"
      />
    </ProjectCard>
  </div>
)

export default ProjectsBlock

const projects: ProjectObjType[] = [
  {
    title: 'Spacie',
    description: 'spacie_description',
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
