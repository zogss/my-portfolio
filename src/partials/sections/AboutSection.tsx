import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import AboutEclipse from '~/components/svgs/AboutEclipse'
import { enterLeftAnimation, enterRightAnimation, environments } from '~/utils'

const AboutSection: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <AboutEclipse className="absolute -top-[20%] h-auto -translate-x-10 sm:-top-[18%] md:-top-[10%] lg:w-[80%]" />
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]"
      >
        <motion.div
          variants={enterLeftAnimation}
          className="h-12 w-full text-center mix-blend-overlay md:h-16"
        >
          <h2 className="absolute left-1/2 w-full -translate-x-1/2 text-5xl font-black leading-[100.5%] tracking-[.08rem] text-white/80 backdrop-blur-[.1766rem] text-shadow-primary md:w-auto md:text-[4rem]">
            {upperCase(t('about_me'))}
          </h2>
        </motion.div>
      </motion.div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="z-[1] flex w-full flex-col items-center justify-between gap-10 md:gap-12 lg:gap-16 xl:flex-row"
      >
        <motion.div variants={enterLeftAnimation} className="relative p-3">
          <StaticImage
            src="../../images/about_image.jpg"
            alt={t('about_image_alt')}
            className="z-[1] h-[14.375rem] w-[18.75rem] rounded-3xl shadow-2xl md:h-[21.625rem] md:w-[28.125rem] 2xl:h-[25rem] 2xl:w-[34.375rem]"
          />
          <div className="absolute inset-0 bg-black/70 blur-3xl" />
        </motion.div>
        <motion.h3 variants={enterRightAnimation} className="text-neutral-100/40 md:text-lg">
          <span className="mb-[1.125rem] block text-center text-lg font-bold leading-tight text-neutral-100 md:text-2xl md:leading-normal xl:text-start">
            {t('about_section_text_part_1', { location: environments.personal.location })}
          </span>
          <p className="mb-3 text-center xl:text-start">
            {t('about_section_text_part_2', {
              age:
                DateTime.now().year - DateTime.fromObject({ year: 2003, month: 1, day: 20 }).year,
              experience:
                DateTime.now().year - DateTime.fromObject({ year: 2021, month: 11, day: 15 }).year,
            })}
          </p>
          <p className="text-center xl:text-start">{t('about_section_text_part_3')}</p>
        </motion.h3>
      </motion.div>
    </section>
  )
}

export default AboutSection
