import { StaticImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import AboutEclipse from '~/components/svgs/AboutEclipse'
import { environments } from '~/utils'

const AboutSection: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col items-center justify-start gap-16 px-[15%] py-14"
    >
      <AboutEclipse className="absolute -top-[10%] h-auto w-[80%] overflow-hidden" />
      <div className="flex w-full items-center justify-center gap-6 py-[72px]">
        <div className="h-16 w-full text-center mix-blend-overlay">
          <h2 className="absolute left-1/2 -translate-x-1/2 text-[64px] font-black leading-[100.5%] tracking-[1.28px] text-white/80 backdrop-blur-[2.824876308441162px] text-shadow-primary">
            {upperCase(t('about_me'))}
          </h2>
        </div>
      </div>
      <div className="z-[1] flex w-full items-center justify-between gap-16">
        <div className="relative p-3">
          <StaticImage
            src="../../images/about_image.jpg"
            alt={t('about_image_alt')}
            className="z-[1] h-[346px] w-[450px] rounded-3xl shadow-2xl 2xl:h-[400px] 2xl:w-[550px]"
          />
          <div className="absolute inset-0 bg-black/70 blur-3xl" />
        </div>
        <h3 className="text-lg text-neutral-100/40">
          <span className="mb-[18px] block text-2xl font-bold text-neutral-100">
            {t('about_section_text_part_1', { location: environments.personal.location })}
          </span>
          <p className="mb-3">
            {t('about_section_text_part_2', {
              age:
                DateTime.now().year - DateTime.fromObject({ year: 2003, month: 1, day: 20 }).year,
              experience:
                DateTime.now().year - DateTime.fromObject({ year: 2021, month: 11, day: 15 }).year,
            })}
          </p>
          <p>{t('about_section_text_part_3')}</p>
        </h3>
      </div>
    </section>
  )
}

export default AboutSection
