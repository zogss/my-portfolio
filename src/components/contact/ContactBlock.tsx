import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { enterRightAnimation } from '~/utils'
import PenIllustration from '../svgs/PenIllustration'
import ContactForm from './ContactForm'

const ContactBlock: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="group/contactFormContainer flex w-3/4 items-center justify-center transition-all duration-500 hover:shadow-secondary"
    >
      <motion.div
        variants={enterRightAnimation}
        className="relative z-[1] flex w-full flex-col items-center overflow-hidden rounded-lg border border-violet-700 bg-charcoal-black-700 px-12 py-8"
      >
        <div className="flex flex-col items-start gap-6 self-stretch">
          <h4 className="flex w-full flex-col items-start justify-center gap-3 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
            <span className="text-2xl font-semibold">{t('contact_form_title')}</span>
            <p className="text-sm font-medium text-white/40">{t('contact_form_description')}</p>
          </h4>
          <div className="flex flex-col items-start justify-center gap-6 self-stretch">
            <ContactForm />
          </div>
        </div>
        <PenIllustration className="absolute bottom-10 right-6 translate-x-1/2 grayscale transition-all duration-500 group-hover/contactFormContainer:grayscale-0" />
      </motion.div>
    </motion.div>
  )
}

export default ContactBlock
