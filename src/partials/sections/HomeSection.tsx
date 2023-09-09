import clsx from 'clsx'
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
  const { t, language } = useI18next()

  //* render
  return (
    <motion.section
      id="home"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="flex min-h-screen w-full flex-col-reverse items-center justify-end gap-10 overflow-hidden px-[10%] pt-[17vh] md:justify-center md:gap-5 md:px-[15%] md:pt-0 lg:flex-col"
    >
      <HomeEclipse className="absolute -translate-x-16 -translate-y-12 md:-translate-y-8" />
      <div className="z-[1] flex w-full flex-col items-center justify-start gap-8 md:gap-12 lg:items-start lg:gap-16 lg:pb-10 2xl:pb-16">
        <div className="flex flex-col items-start justify-start gap-6">
          <div
            className={clsx(
              'flex w-full mix-blend-overlay xl:h-16',
              language === 'br' ? 'h-36 md:h-48' : 'h-24 md:h-32'
            )}
          >
            <h2 className="absolute left-1/2 -translate-x-1/2 text-center text-5xl font-black leading-[100.5%] tracking-[.08rem] text-white/80 backdrop-blur-[.1766rem] text-shadow-primary md:text-[4rem] lg:left-auto lg:max-w-xs lg:translate-x-0 lg:text-start xl:max-w-none xl:whitespace-nowrap">
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
        className="relative flex h-[200px] w-[200px] items-start overflow-hidden rounded-full border border-white/5 bg-gradient-to-bl from-zinc-800/50 to-black/10 shadow-primary before:absolute before:inset-3 before:z-[1] before:rounded-full before:border before:border-white/5 before:bg-gradient-to-l before:from-zinc-800/50 before:to-black/10 md:h-[300px] md:w-[300px] md:translate-y-[25%] lg:absolute lg:right-[5%] lg:h-auto lg:w-[43.75rem] lg:translate-y-[12%] lg:items-center lg:justify-end lg:overflow-auto lg:rounded-2xl lg:border-none lg:bg-gradient-to-l lg:from-black/30 lg:to-black/0 lg:shadow-none lg:before:hidden xl:right-[6%] xl:translate-y-[9%] 2xl:right-[12%] 2xl:translate-y-[7%]"
      >
        <StaticImage
          src="../../images/yan_main_photo.png"
          alt={t('yan_main_photo_alt')}
          className="z-[1] h-[230px] w-[230px] -translate-y-1 rounded-full md:h-[350px] md:w-[350px] md:rounded-none lg:z-0 lg:h-[32.5rem] lg:w-[32.5rem] 2xl:h-[620px] 2xl:w-[620px]"
        />
      </motion.div>
    </motion.section>
  )
}

export default HomeSection
