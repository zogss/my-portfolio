'use client';

import React, { useEffect, useState } from 'react';
import { ContactFormDataType, contactSchema } from '@/schemas';
import { getErrorMessage } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BsSend } from 'react-icons/bs';

import saveContact from '@/actions/saveContact';
import { useTranslation } from '@/i18n/client';
import { toast } from '@/components/toast';

import Input from '../form/Input';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactFormDataType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(contactSchema),
  });

  const [submitBlocked, setSubmitBlocked] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (submitCount >= 5) {
        setSubmitBlocked(true);
        throw new Error('submit_count_error');
      }

      await saveContact(data);

      reset(
        {
          ...data,
          message: '',
        },
        {
          keepIsSubmitted: true,
          keepSubmitCount: true,
        },
      );
      toast.success(t('contact_form_success'));
    } catch (error) {
      const err = getErrorMessage(error) || 'global_error';

      toast.error(t(err));
    }
  });

  useEffect(() => {
    if (submitBlocked) {
      const timeout = setTimeout(
        () => {
          reset();
          setSubmitBlocked(false);
        },
        1000 * 60 * 5, // 5 minutes
      );

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [reset, submitBlocked]);

  return (
    <form
      onSubmit={onSubmit}
      className="z-[1] flex w-full flex-col items-start gap-3.5 lg:w-2/3"
    >
      <Input className="w-full">
        <Input.Input
          type="text"
          autoComplete="name"
          {...register('name')}
          error={errors.name?.message}
          disabled={isSubmitting}
          label={t('name_label')}
          placeholder={t('name_placeholder')}
          className="form-input-primary form-input"
        />
      </Input>
      <Input className="w-full">
        <Input.Input
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
          disabled={isSubmitting}
          label={t('email_label')}
          placeholder={t('email_placeholder')}
          className="form-input-primary form-input"
        />
      </Input>
      <Input className="w-full">
        <Input.TextArea
          rows={3}
          {...register('message')}
          error={errors.message?.message}
          disabled={isSubmitting}
          label={t('message_label')}
          placeholder={t('message_placeholder')}
          className="form-input-primary form-input"
        />
      </Input>
      <div className="mt-2.5 flex w-fit items-center justify-start gap-6">
        <div className="w-fit rounded-lg bg-gradient-to-b from-violet-500 to-violet-700 p-[.0625rem] grayscale transition-[filter] duration-500 group-hover/contactFormContainer:grayscale-0">
          <button
            type="submit"
            disabled={isSubmitting}
            title={t('send')}
            className="bg-gradient-tertiary flex cursor-pointer items-center justify-center gap-2.5 rounded-lg px-[1.375rem] py-1.5 disabled:opacity-50"
          >
            {t('send')}
            <BsSend className="size-[1.125rem]" />
          </button>
        </div>
        {isSubmitting && (
          <div className="follow-the-leader">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} />
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
