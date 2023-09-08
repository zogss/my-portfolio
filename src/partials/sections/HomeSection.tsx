import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import React from 'react'
import SocialLinks from '~/components/SocialLinks'
import HomeEclipse from '~/components/svgs/HomeEclipse'
import { enterRightAnimation } from '~/utils'

const HomeSection: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <motion.section
      id="home"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-[15%]"
    >
      <HomeEclipse className="absolute -translate-x-16 -translate-y-8 overflow-hidden" />
      <div className="z-[1] flex w-full flex-col items-center justify-start gap-16 lg:items-start lg:pb-10 2xl:pb-16">
        <div className="flex flex-col items-start justify-start gap-6">
          <div className="flex h-32 w-full mix-blend-overlay lg:h-16">
            <h2 className="absolute left-1/2 -translate-x-1/2 text-center text-[4rem] font-black leading-[100.5%] tracking-[.08rem] text-white/80 backdrop-blur-[.1766rem] text-shadow-primary lg:left-auto lg:translate-x-0 lg:whitespace-nowrap lg:text-start">
              {upperCase(t('software_engineer'))}
            </h2>
          </div>
          <h2 className="text-slate-gray-300">
            <p className="w-full max-w-sm text-center font-medium lg:text-start">
              {t('home_section_description_part_1')}{' '}
              <span className="font-bold text-white">Yan Lucas</span>
              {t('home_section_description_part_2')}
            </p>
          </h2>
        </div>
        <SocialLinks className="h-12 gap-2 !text-white/40" iconSize="lg" />
      </div>
      <motion.div
        variants={enterRightAnimation}
        className="absolute right-[5%] hidden h-auto w-[43.75rem] justify-end rounded-2xl bg-gradient-to-l from-black/30 to-black/0 md:translate-y-[25%] lg:flex lg:translate-y-[12%] xl:right-[6%] xl:translate-y-[9%] 2xl:right-[12%] 2xl:translate-y-[7%]"
      >
        <StaticImage
          src="../../images/yan_main_photo.png"
          alt={t('yan_main_photo_alt')}
          className="h-[400px] w-[400px] xl:h-[32.5rem] xl:w-[32.5rem] 2xl:h-[620px] 2xl:w-[620px]"
        />
      </motion.div>
    </motion.section>
  )
}

export default HomeSection
