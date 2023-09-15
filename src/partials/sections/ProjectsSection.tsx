import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import React from 'react'
import ProjectsBlock from '~/components/projects/ProjectsBlock'
import TitleEclipse from '~/components/svgs/TitleEclipse'
import { enterBottomAnimation } from '~/utils'

const ProjectsSection: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <div className="flex w-full flex-col items-center gap-2.5 self-stretch">
        <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
          <TitleEclipse className="absolute left-1/2 top-1/2 h-[31.25rem] -translate-x-1/2 -translate-y-1/2 lg:h-[50rem]" />
          <div className="h-10 w-full text-center sm:h-12 md:h-16">
            <h2 className="absolute left-1/2 w-full -translate-x-1/2 whitespace-nowrap text-4xl font-black leading-[100.5%] tracking-[.08rem] text-white/80 mix-blend-overlay backdrop-blur-[.1766rem] text-shadow-primary sm:text-5xl md:w-auto md:text-[4rem]">
              {upperCase(t('projects'))}
            </h2>
          </div>
        </div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.4 }}
          className="flex w-full justify-center"
        >
          <motion.h3
            variants={enterBottomAnimation}
            className="z-[1] flex flex-col items-center gap-1.5 lg:gap-2.5"
          >
            <span className="text-center font-semibold md:text-lg lg:text-xl">
              {t('projects_section_text_part_1')}
            </span>
            <span className="text-center text-sm font-medium text-white/30 md:text-base lg:text-lg">
              {t('projects_section_text_part_2')}
            </span>
          </motion.h3>
        </motion.div>
      </div>
      <ProjectsBlock />
    </section>
  )
}

export default ProjectsSection
