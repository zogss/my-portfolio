import { useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'
import PenIllustration from '../svgs/PenIllustration'
import ContactForm from './ContactForm'

const ContactBlock: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <div className="relative z-[1] flex w-full flex-col items-center overflow-hidden rounded-lg border border-violet-700 bg-charcoal-black-700 px-12 py-8 shadow-secondary">
      <div className="flex flex-col items-start gap-6 self-stretch">
        <h4 className="flex w-full flex-col items-start justify-center gap-3 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
          <span className="text-2xl font-semibold">{t('contact_form_title')}</span>
          <p className="text-sm font-medium text-white/40">{t('contact_form_description')}</p>
        </h4>
        <div className="flex flex-col items-start justify-center gap-6 self-stretch">
          <ContactForm />
        </div>
      </div>
      <PenIllustration className="absolute bottom-10 right-6 translate-x-1/2" />
    </div>
  )
}

export default ContactBlock
