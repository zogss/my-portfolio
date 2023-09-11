import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import React from 'react'
import ProjectsBlock from '~/components/projects/ProjectsBlock'
import TitleEclipse from '~/components/svgs/TitleEclipse'
import { ProjectObjType, enterLeftAnimation, enterRightAnimation } from '~/utils'

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
      className="relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <TitleEclipse className="absolute -top-[7.5rem] md:-top-[12.5rem]" />
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.4 }}
        className="flex w-full flex-col items-center gap-2.5 self-stretch"
      >
        <div className="flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
          <motion.div
            variants={enterLeftAnimation}
            className="h-12 w-full text-center mix-blend-overlay md:h-16"
          >
            <h2 className="absolute left-1/2 w-full -translate-x-1/2 text-5xl font-black leading-[100.5%] tracking-[.08rem] text-white/80 backdrop-blur-[.1766rem] text-shadow-primary md:w-auto md:text-[4rem]">
              {upperCase(t('projects'))}
            </h2>
          </motion.div>
        </div>
        <motion.h3
          variants={enterRightAnimation}
          className="z-[1] flex flex-col items-center gap-1.5 lg:gap-2.5"
        >
          <span className="text-center text-lg font-semibold lg:text-xl">
            {t('projects_section_text_part_1')}
          </span>
          <span className="text-center font-medium text-white/30 lg:text-lg">
            {t('projects_section_text_part_2')}
          </span>
        </motion.h3>
      </motion.div>
      <ProjectsBlock projects={projects} />
    </section>
  )
}

export default ProjectsSection
