import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import React from 'react'
import ContactBlock from '~/components/contact/ContactBlock'
import TitleEclipse from '~/components/svgs/TitleEclipse'

const ContactSection: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <section
      id="contact"
      className="relative flex min-h-[75vh] w-full flex-col items-center justify-start gap-10 px-[10%] py-10 sm:min-h-screen md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
        <TitleEclipse className="absolute left-1/2 top-1/2 h-[31.25rem] -translate-x-1/2 -translate-y-1/2 lg:h-[50rem]" />
        <div className="h-12 w-full text-center md:h-16">
          <h2 className="absolute left-1/2 w-full -translate-x-1/2 whitespace-nowrap text-5xl font-black leading-[100.5%] tracking-[.08rem] text-white/80 mix-blend-overlay backdrop-blur-[.1766rem] text-shadow-primary md:w-auto md:text-[4rem]">
            {upperCase(t('contact'))}
          </h2>
        </div>
      </div>
      <ContactBlock />
    </section>
  )
}

export default ContactSection
