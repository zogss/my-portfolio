/* eslint-disable @typescript-eslint/no-explicit-any */
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { ProjectObjType } from '~/utils'
import ProjectCard from './ProjectCard'

interface ProjectsBlockProps {
  projects: ProjectObjType[]
}

const ProjectsBlock: React.FC<ProjectsBlockProps> = ({ projects }) => (
  <div className="z-[1] flex flex-col items-center gap-6 self-stretch">
    <ProjectCard index={0} {...projects[0]} img="../../images/projects/spacie_image.png">
      <StaticImage
        src="../../images/projects/spacie_image.png"
        alt={projects[0].alt}
        className="aspect-video h-[200px] w-[400px] rounded-lg"
      />
    </ProjectCard>
    <ProjectCard index={1} {...projects[1]}>
      <StaticImage
        src="../../images/projects/cs_analytics_image.png"
        alt={projects[0].alt}
        className="aspect-video h-[200px] w-[400px] rounded-lg"
      />
    </ProjectCard>
    <ProjectCard index={2} {...projects[2]}>
      <StaticImage
        src="../../images/projects/expert_stats_image.png"
        alt={projects[0].alt}
        className="aspect-video h-[200px] w-[400px] rounded-lg"
      />
    </ProjectCard>
    <ProjectCard index={3} {...projects[3]}>
      <StaticImage
        src="../../images/projects/chirp_image.png"
        alt={projects[0].alt}
        className="aspect-video h-[200px] w-[400px] rounded-lg"
      />
    </ProjectCard>
  </div>
)

export default ProjectsBlock
