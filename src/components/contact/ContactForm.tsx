import { zodResolver } from '@hookform/resolvers/zod'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BsSend } from 'react-icons/bs'
import { ContactFormDataType, contactSchema } from '~/schemas'
import Input from '../form/Input'

const ContactForm: React.FC = () => {
  //* hooks
  const { t } = useI18next()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormDataType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(contactSchema),
  })

  //* handlers
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  //* render
  return (
    <form onSubmit={onSubmit} className="flex w-3/4 flex-col items-start gap-3.5">
      <Input className="w-full">
        <Input.Input
          type="text"
          id="name"
          {...register('name')}
          error={errors.name?.message}
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
          label={t('message_label')}
          placeholder={t('message_placeholder')}
          className="form-input-primary form-input"
        />
      </Input>
      <div className="mt-2.5 w-fit rounded-lg bg-gradient-to-b from-violet-500 to-violet-700 p-[.0625rem]">
        <button
          type="submit"
          className="bg-gradient-tertiary flex items-center justify-center gap-2.5 rounded-lg px-[1.375rem] py-1.5"
        >
          {t('send')}
          <BsSend className="h-[1.125rem] w-[1.125rem]" />
        </button>
      </div>
    </form>
  )
}

export default ContactForm
