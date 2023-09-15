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
      viewport={{ once: true, amount: 0.4 }}
      className="flex min-h-screen w-full flex-col items-center justify-center"
    >
      <HomeEclipse className="absolute left-[40%] top-[55vh] h-[37.5rem] -translate-x-1/2 -translate-y-1/2 md:top-[50vh] lg:top-[40vh] lg:h-[50rem] xl:top-[45vh]" />
      <div className="flex w-full flex-col-reverse items-center justify-end gap-10 px-[10%] md:justify-center md:gap-5 md:px-[15%] md:pt-0 lg:flex-col">
        <div className="flex w-full flex-col items-center justify-start gap-8 md:gap-12 lg:items-start lg:gap-14 lg:pb-10 2xl:pb-16">
          <div className="flex flex-col items-start justify-start gap-6">
            <div
              className={clsx(
                'flex w-full mix-blend-overlay',
                language === 'br' ? 'h-36 md:h-48 lg:h-32 3xl:h-16' : 'h-24 md:h-32 xl:h-16'
              )}
            >
              <h2
                className={clsx(
                  'absolute left-1/2 -translate-x-1/2 text-center text-5xl font-black leading-[100.5%] tracking-[.08rem] text-white/80 backdrop-blur-[.1766rem] text-shadow-primary sm:max-w-xs md:flex md:justify-center md:text-[4rem] lg:left-auto lg:block lg:translate-x-0 lg:text-start',
                  language === 'br'
                    ? 'lg:max-w-xl 3xl:max-w-none 3xl:whitespace-nowrap'
                    : 'lg:max-w-xs xl:max-w-none xl:whitespace-nowrap'
                )}
              >
                {upperCase(t('software_engineer'))}
              </h2>
            </div>
            <h2 className="z-[1] text-slate-gray-300">
              <p className="w-full max-w-sm text-center font-medium lg:text-start">
                {t('home_section_description_part_1')}{' '}
                <span className="font-bold text-white">Yan Lucas</span>
                {t('home_section_description_part_2')}
              </p>
            </h2>
          </div>
          <SocialLinks className="z-[1] gap-2 !text-white/40" iconSize="lg" />
        </div>
        <motion.div
          variants={enterRightAnimation}
          className="relative z-[2] flex h-[12.5rem] w-[12.5rem] items-start overflow-hidden rounded-full border border-white/5 bg-gradient-to-bl from-zinc-800/50 to-black/10 shadow-primary before:absolute before:inset-3 before:z-[1] before:rounded-full before:border before:border-white/5 before:bg-gradient-to-l before:from-zinc-800/50 before:to-black/10 md:h-[18.75rem] md:w-[18.75rem] md:translate-y-[25%] lg:absolute lg:right-[5%] lg:h-auto lg:w-[43.75rem] lg:translate-y-[12%] lg:items-center lg:justify-end lg:overflow-auto lg:rounded-2xl lg:border-none lg:bg-gradient-to-l lg:from-black/30 lg:to-black/0 lg:shadow-none lg:before:hidden xl:right-[6%] xl:translate-y-[9%] 2xl:right-[12%] 2xl:translate-y-[7%]"
        >
          <StaticImage
            src="../../images/yan_main_photo.png"
            alt={t('yan_main_photo_alt')}
            quality={100}
            className="z-[3] h-[14.375rem] w-[14.375rem] -translate-y-1 rounded-full md:h-[21.875rem] md:w-[21.875rem] md:rounded-none lg:z-0 lg:h-[32.5rem] lg:w-[32.5rem] 2xl:h-[38.75rem] 2xl:w-[38.75rem]"
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HomeSection
