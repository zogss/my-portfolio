import React from 'react'
import PenIllustration from '../svgs/PenIllustration'
import ContactForm from './ContactForm'

const ContactBlock: React.FC = () => {
  return (
    <div className="relative z-[1] flex w-full flex-col items-center overflow-hidden rounded-lg border border-violet-700 bg-charcoal-black-700 px-12 py-8 shadow-secondary">
      <div className="flex flex-col items-start gap-6 self-stretch">
        <h4 className="flex flex-col items-start justify-center gap-3">
          <span className="text-2xl font-semibold">Get in touch</span>
          <p className="text-sm font-medium text-white/40">
            You can utilize the form below to send me a message.
          </p>
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
