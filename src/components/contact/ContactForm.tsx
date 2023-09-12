import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection, getFirestore, setDoc } from 'firebase/firestore'
import app from 'gatsby-plugin-firebase-v9.0'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsSend } from 'react-icons/bs'
import { ContactFormDataType, contactSchema } from '~/schemas'
import { toast } from '~/services/toast'
import { getErrorMessage } from '~/utils/getErrorMessage'
import Input from '../form/Input'

const ContactForm: React.FC = () => {
  //* hooks
  const { t } = useI18next()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactFormDataType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(contactSchema),
  })

  //* states
  const [submitBlocked, setSubmitBlocked] = useState(false)

  //* handlers
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (submitCount >= 5) {
        setSubmitBlocked(true)
        throw new Error('submit_count_error')
      }
      const db = getFirestore(app)

      const dataWithTimestamp = { ...data, createdAt: new Date() }
      const contactsRef = await addDoc(collection(db, 'contacts'), dataWithTimestamp)
      await setDoc(contactsRef, dataWithTimestamp)

      reset(
        {
          ...data,
          message: '',
        },
        {
          keepIsSubmitted: true,
          keepSubmitCount: true,
        }
      )
      toast.success(t('contact_form_success'))
    } catch (error) {
      const err = getErrorMessage(error) || 'global_error'

      toast.error(t(err))
    }
  })

  //* effects
  useEffect(() => {
    if (submitBlocked) {
      const timeout = setTimeout(
        () => {
          reset()
          setSubmitBlocked(false)
        },
        1000 * 60 * 5 // 5 minutes
      )

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [reset, submitBlocked])

  //* render
  return (
    <form onSubmit={onSubmit} className="z-[1] flex w-full flex-col items-start gap-3.5 lg:w-2/3">
      <Input className="w-full">
        <Input.Input
          type="text"
          id="name"
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
          id="email"
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
          id="message"
          {...register('message')}
          error={errors.message?.message}
          disabled={isSubmitting}
          label={t('message_label')}
          placeholder={t('message_placeholder')}
          className="form-input-primary form-input"
        />
      </Input>
      <div className="mt-2.5 flex w-fit items-center justify-start gap-6">
        <div className="w-fit rounded-lg bg-gradient-to-b from-violet-500 to-violet-700 p-[.0625rem] grayscale transition-all duration-500 group-hover/contactFormContainer:grayscale-0">
          <button
            type="submit"
            disabled={isSubmitting}
            title={t('send')}
            className="flex items-center justify-center gap-2.5 rounded-lg bg-gradient-tertiary px-[1.375rem] py-1.5 transition-all duration-200 disabled:opacity-50"
          >
            {t('send')}
            <BsSend className="h-[1.125rem] w-[1.125rem]" />
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
  )
}

export default ContactForm
