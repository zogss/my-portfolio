import React from 'react'
import ProjectsBlock from '~/components/projects/ProjectsBlock'
import TitleEclipse from '~/components/svgs/TitleEclipse'
import { ProjectObjType } from '~/utils'

interface ProjectsSectionProps {
  projects: ProjectObjType[]
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => (
  <section
    id="about"
    className="relative flex min-h-screen w-full flex-col items-center justify-start gap-16 px-[15%] py-14"
  >
    <TitleEclipse className="absolute -top-[10%] h-auto w-[80%] overflow-hidden" />
    <div className="flex w-full items-center justify-center gap-6 py-[72px]">
      <div className="h-16 w-full text-center mix-blend-overlay">
        <h2 className="absolute left-1/2 -translate-x-1/2 text-[64px] font-black leading-[100.5%] tracking-[1.28px] text-white/80 backdrop-blur-[2.824876308441162px] text-shadow-primary">
          PROJECTS
        </h2>
      </div>
    </div>
    <ProjectsBlock projects={projects} />
  </section>
)

export default ProjectsSection
