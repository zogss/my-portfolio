import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { upperCase } from 'lodash'
import React from 'react'
import ContactBlock from '~/components/contact/ContactBlock'
import TitleEclipse from '~/components/svgs/TitleEclipse'
import { enterLeftAnimation } from '~/utils'

const ContactSection: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-start gap-10 px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      <TitleEclipse className="absolute -top-[15%] h-auto md:-top-[10%]" />
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
              {upperCase(t('contact'))}
            </h2>
          </motion.div>
        </div>
      </motion.div>
      <ContactBlock />
    </section>
  )
}

export default ContactSection
