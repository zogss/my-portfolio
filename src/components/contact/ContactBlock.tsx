import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { enterBottomAnimation } from '~/utils'
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
      viewport={{ once: true, amount: 0.4 }}
      className="flex w-full items-center justify-center"
    >
      <motion.div
        variants={enterBottomAnimation}
        className="flex w-full items-center justify-center"
      >
        <div className="group/contactFormContainer flex w-full items-center justify-center transition-all duration-500 hover:shadow-secondary xl:w-3/4">
          <div className="relative z-[1] flex w-full flex-col items-center overflow-hidden rounded-lg border border-violet-700 bg-charcoal-black-700 p-5 py-6 md:px-8 lg:px-12 lg:py-8">
            <div className="flex flex-col items-start gap-6 self-stretch">
              <h3 className="flex w-full flex-col items-start justify-center gap-3 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
                <span className="text-xl font-semibold md:text-2xl">{t('contact_form_title')}</span>
                <p className="text-xs font-medium text-white/40 md:text-sm">
                  {t('contact_form_description')}
                </p>
              </h3>
              <div className="flex flex-col items-start justify-center gap-6 self-stretch">
                <ContactForm />
              </div>
            </div>
            <PenIllustration className="absolute bottom-10 right-6 translate-x-1/2 grayscale transition-all duration-500 group-hover/contactFormContainer:grayscale-0" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ContactBlock
