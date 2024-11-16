import { StaticImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import TitleEclipse from '~/components/svgs/TitleEclipse'
import { environments } from '~/utils'

const AboutSection: React.FC = () => {
  const { t } = useI18next()

  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
        <TitleEclipse className="absolute left-1/2 top-1/2 h-[21.875rem] -translate-x-1/2 -translate-y-1/2 md:h-[25rem] lg:h-[50rem]" />
        <div className="h-10 w-full text-center sm:h-12 md:h-16">
          <h2 className="absolute left-1/2 w-full -translate-x-1/2 whitespace-nowrap text-4xl font-black leading-[100.5%] tracking-[.08rem] text-white/80 mix-blend-overlay backdrop-blur-[.1766rem] text-shadow-primary sm:text-5xl md:w-auto md:text-[4rem]">
            {upperCase(t('about_me'))}
          </h2>
        </div>
      </div>
      <div
        data-animation="animate"
        className="z-[1] flex w-full flex-col items-center gap-10 md:gap-12 xl:flex-row xl:items-start xl:justify-center 2xl:gap-16"
      >
        <div data-animation-target="left" className="relative p-3">
          <StaticImage
            src="../../images/about_image.jpg"
            alt={t('about_image_alt')}
            quality={100}
            width={550}
            height={400}
            className="z-[1] h-[14.375rem] w-[18.75rem] rounded-3xl shadow-2xl md:h-[21.625rem] md:w-[28.125rem] 2xl:h-[25rem] 2xl:w-[34.375rem]"
          />
          <div className="absolute inset-0 bg-black/70 blur-3xl" />
        </div>
        <div
          data-animation-target="right"
          className="flex w-full flex-col items-center text-sm text-neutral-100/40 md:text-base lg:text-lg"
        >
          <h3 className="mb-[1.125rem] block max-w-xl text-center text-lg font-bold leading-tight text-neutral-100 md:text-xl md:leading-normal lg:text-2xl xl:max-w-none xl:text-start">
            {t('about_section_text_part_1', { location: environments.personal.location })}
          </h3>
          <p className="mb-3">
            {t('about_section_text_part_2', {
              age:
                DateTime.now().year - DateTime.fromObject({ year: 2003, month: 1, day: 20 }).year,
              experience:
                DateTime.now().year - DateTime.fromObject({ year: 2021, month: 11, day: 15 }).year,
            })}
          </p>
          <p className="mb-3">{t('about_section_text_part_3')}</p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
