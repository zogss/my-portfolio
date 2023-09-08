import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import React from 'react'
import ProjectsBlock from '~/components/projects/ProjectsBlock'
import TitleEclipse from '~/components/svgs/TitleEclipse'
import { ProjectObjType } from '~/utils'

interface ProjectsSectionProps {
  projects: ProjectObjType[]
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full flex-col items-center justify-start gap-16 px-[15%] py-14"
    >
      <TitleEclipse className="absolute -top-[10%] h-auto" />
      <div className="flex w-full flex-col items-center gap-2.5 self-stretch">
        <div className="flex w-full items-center justify-center gap-6 py-[72px]">
          <div className="h-16 w-full text-center mix-blend-overlay">
            <h2 className="absolute left-1/2 -translate-x-1/2 text-[64px] font-black leading-[100.5%] tracking-[1.28px] text-white/80 backdrop-blur-[2.824876308441162px] text-shadow-primary">
              {upperCase(t('projects'))}
            </h2>
          </div>
        </div>
        <h3 className="flex flex-col items-center gap-2.5">
          <span className="text-center text-xl font-semibold">
            {t('projects_section_text_part_1')}
          </span>
          <span className="text-center text-lg font-medium text-white/30">
            {t('projects_section_text_part_2')}
          </span>
        </h3>
      </div>
      <ProjectsBlock projects={projects} />
    </section>
  )
}

export default ProjectsSection
