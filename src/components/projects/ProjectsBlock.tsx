import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import BullBlockchainGif from '~/images/projects/bullblockchain_image.gif'
import { ProjectObjType } from '~/utils'
import ProjectCard from './ProjectCard'

interface ProjectsBlockProps {
  projects: ProjectObjType[]
}

const ProjectsBlock: React.FC<ProjectsBlockProps> = ({ projects }) => (
  <div className="z-[1] flex flex-col items-center gap-6 self-stretch">
    <ProjectCard index={0} {...projects[0]}>
      <StaticImage
        src="../../images/projects/spacie_image.png"
        alt={projects[0].alt}
        className="aspect-[16/9] max-h-[200px] w-full rounded-lg lg:h-[200px] lg:w-[400px]"
      />
    </ProjectCard>
    <ProjectCard index={1} {...projects[1]}>
      <StaticImage
        src="../../images/projects/cs_analytics_image.png"
        alt={projects[1].alt}
        className="aspect-[16/9] max-h-[200px] w-full rounded-lg lg:h-[200px] lg:w-[400px]"
      />
    </ProjectCard>
    <ProjectCard index={2} {...projects[2]}>
      <StaticImage
        src="../../images/projects/expert_stats_image.png"
        alt={projects[2].alt}
        className="aspect-[16/9] max-h-[200px] w-full rounded-lg lg:h-[200px] lg:w-[400px]"
      />
    </ProjectCard>
    <ProjectCard index={3} {...projects[3]}>
      <StaticImage
        src="../../images/projects/chirp_image.png"
        alt={projects[3].alt}
        className="aspect-[16/9] max-h-[200px] w-full rounded-lg lg:h-[200px] lg:w-[400px]"
      />
    </ProjectCard>
    <ProjectCard index={4} {...projects[4]}>
      <StaticImage
        src="../../images/projects/massagueirinha_image.png"
        alt={projects[4].alt}
        className="aspect aspect-[16/9] max-h-[200px] w-full rounded-lg lg:h-[200px] lg:w-[400px]"
      />
    </ProjectCard>
    <ProjectCard index={5} {...projects[5]}>
      <img
        src={BullBlockchainGif}
        alt={projects[5].alt}
        className="aspect-[16/9] max-h-[200px] w-full rounded-lg lg:h-[200px] lg:w-[400px]"
      />
    </ProjectCard>
  </div>
)

export default ProjectsBlock
