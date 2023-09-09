import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import React from 'react'
import TitleEclipse from '~/components/svgs/TitleEclipse'
import TechStackBlock from '~/components/techStack/TechStackBlock'
import { enterLeftAnimation, enterRightAnimation } from '~/utils'

const TechStackSection: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <section
      id="tech-stack"
      className="relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <TitleEclipse className="absolute -top-[6.25rem] h-auto" />
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="flex w-full flex-col items-center gap-2.5 self-stretch"
      >
        <div className="flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
          <motion.div
            variants={enterLeftAnimation}
            className="h-12 w-full text-center mix-blend-overlay md:h-16"
          >
            <h2 className="absolute left-1/2 w-full -translate-x-1/2 text-5xl font-black leading-[100.5%] tracking-[.08rem] text-white/80 backdrop-blur-[.1766rem] text-shadow-primary md:w-auto md:text-[4rem]">
              {upperCase(t('tech_stack'))}
            </h2>
          </motion.div>
        </div>
        <motion.h3
          variants={enterRightAnimation}
          className="z-[1] flex flex-col items-center gap-1.5 lg:gap-2.5 xl:max-w-[37.5rem]"
        >
          <span className="text-center text-lg font-semibold lg:text-xl">
            {t('tech_stack_section_text_part_1')}
          </span>
          <span className="text-center font-medium text-white/30 lg:text-lg">
            {t('tech_stack_section_text_part_2')}
          </span>
        </motion.h3>
      </motion.div>
      <TechStackBlock />
    </section>
  )
}

export default TechStackSection
