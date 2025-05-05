'use client';

import React from 'react';

import { useTranslation } from '@/i18n/client';

import { AnimationContainer } from '../animation-container';
import PenIllustration from '../svgs/PenIllustration';
import ContactForm from './ContactForm';

const ContactBlock: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AnimationContainer className="flex h-auto w-full items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <div className="group/contactFormContainer hover:shadow-secondary flex w-full items-center justify-center transition-shadow duration-500 xl:w-3/4">
          <div className="bg-charcoal-black-700 relative z-[1] flex w-full flex-col items-center overflow-hidden rounded-lg border border-violet-700 p-5 py-6 md:px-8 lg:px-12 lg:py-8">
            <div className="flex flex-col items-start gap-6 self-stretch">
              <h3 className="flex w-full flex-col items-start justify-center gap-3 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
                <span className="text-xl font-semibold md:text-2xl">
                  {t('contact_form_title')}
                </span>
                <p className="text-xs font-medium text-zinc-500 md:text-sm">
                  {t('contact_form_description')}
                </p>
              </h3>
              <div className="flex flex-col items-start justify-center gap-6 self-stretch">
                <ContactForm />
              </div>
            </div>
            <PenIllustration className="absolute right-6 bottom-10 translate-x-1/2 grayscale transition-[filter] duration-500 group-hover/contactFormContainer:grayscale-0" />
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default ContactBlock;
