'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ContactFormDataType, contactSchema } from '@/schemas';
import { getErrorMessage } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { BsCheckCircle, BsExclamationCircle, BsSend } from 'react-icons/bs';

import saveContact from '@/actions/saveContact';
import {
  useReducedMotion,
  useScreenReaderAnnouncement,
} from '@/lib/accessibility';
import { useTranslation } from '@/i18n/client';
import { toast } from '@/components/toast';

interface FormFieldProps {
  name: keyof ContactFormDataType;
  label: string;
  type?: string;
  placeholder: string;
  register: UseFormRegister<ContactFormDataType>;
  error?: string;
  disabled?: boolean;
  rows?: number;
  isTextArea?: boolean;
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  disabled,
  rows,
  isTextArea = false,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };

  const fieldVariants = {
    initial: { scale: 1, borderColor: 'rgba(148, 163, 184, 0.3)' },
    focused: {
      scale: prefersReducedMotion ? 1 : 1.02,
      borderColor: 'rgba(139, 92, 246, 0.6)',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
    },
    error: {
      scale: prefersReducedMotion ? 1 : 1.02,
      borderColor: 'rgba(239, 68, 68, 0.6)',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
  };

  const labelVariants = {
    initial: {
      y: 0,
      scale: 1,
      color: 'rgba(148, 163, 184, 0.7)',
    },
    floating: {
      y: prefersReducedMotion ? 0 : -24,
      scale: prefersReducedMotion ? 1 : 0.85,
      color: 'rgba(139, 92, 246, 0.8)',
    },
    error: {
      y: prefersReducedMotion ? 0 : -24,
      scale: prefersReducedMotion ? 1 : 0.85,
      color: 'rgba(239, 68, 68, 0.8)',
    },
  };

  const shouldFloat = isFocused || hasValue;
  const currentVariant = error ? 'error' : isFocused ? 'focused' : 'initial';
  const labelVariant = error ? 'error' : shouldFloat ? 'floating' : 'initial';

  return (
    <motion.div
      className="relative w-full"
      initial="initial"
      animate={currentVariant}
      variants={fieldVariants}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="relative">
        {icon && (
          <div className="text-muted-foreground absolute top-1/2 left-3 z-10 -translate-y-1/2 transform">
            {icon}
          </div>
        )}

        <motion.label
          htmlFor={name}
          className={`pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 transform transition-colors duration-200 ${icon ? 'left-10' : ''}`}
          animate={labelVariant}
          variants={labelVariants}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
        </motion.label>

        {isTextArea ? (
          <motion.textarea
            id={name}
            rows={rows}
            placeholder={shouldFloat ? placeholder : ''}
            disabled={disabled}
            className={`glass-card text-foreground placeholder:text-muted-foreground/60 w-full resize-none rounded-lg border bg-white/5 px-3 py-4 pt-6 backdrop-blur-sm transition-all duration-300 ease-out focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${icon ? 'pl-10' : ''} ${error ? 'border-destructive' : 'border-white/10'} `}
            onFocus={handleFocus}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...register(name)}
            onBlur={handleBlur}
          />
        ) : (
          <motion.input
            id={name}
            type={type}
            placeholder={shouldFloat ? placeholder : ''}
            disabled={disabled}
            autoComplete={type === 'email' ? 'email' : name}
            className={`glass-card text-foreground placeholder:text-muted-foreground/60 w-full rounded-lg border bg-white/5 px-3 py-4 pt-6 backdrop-blur-sm transition-all duration-300 ease-out focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${icon ? 'pl-10' : ''} ${error ? 'border-destructive' : 'border-white/10'} `}
            onFocus={handleFocus}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...register(name)}
            onBlur={handleBlur}
          />
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            id={`${name}-error`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="text-destructive mt-2 flex items-center gap-2 text-sm"
            role="alert"
            aria-live="polite"
          >
            <BsExclamationCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const announce = useScreenReaderAnnouncement();
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, submitCount, isValid },
  } = useForm<ContactFormDataType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(contactSchema),
  });

  const [submitBlocked, setSubmitBlocked] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Watch form values for progress calculation
  const watchedValues = watch();

  useEffect(() => {
    const fieldsWithValues = Object.values(watchedValues).filter(
      (value) => value && String(value).trim().length > 0,
    ).length;
    const totalFields = 3; // name, email, message
    setProgress((fieldsWithValues / totalFields) * 100);
  }, [watchedValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (submitCount >= 5) {
        setSubmitBlocked(true);
        announce(t('submit_limit_reached'), 'assertive');
        throw new Error('submit_count_error');
      }

      await saveContact(data);

      setSubmitSuccess(true);
      announce(t('contact_form_success'), 'polite');

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

      // Reset success state after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      const err = getErrorMessage(error) || 'global_error';
      announce(t(err), 'assertive');
      toast.error(t(err));
    }
  });

  useEffect(() => {
    if (submitBlocked) {
      const timeout = setTimeout(
        () => {
          reset();
          setSubmitBlocked(false);
          announce(t('form_reset'), 'polite');
        },
        1000 * 60 * 5, // 5 minutes
      );

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [reset, submitBlocked, announce, t]);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: prefersReducedMotion ? 1 : 1.05 },
    tap: { scale: prefersReducedMotion ? 1 : 0.95 },
    success: { scale: prefersReducedMotion ? 1 : 1.1 },
  };

  return (
    <div className="relative w-full lg:w-2/3">
      {/* Progress indicator */}
      <motion.div
        className="mb-6 h-1 overflow-hidden rounded-full bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="from-primary via-primary/80 to-primary h-full rounded-full bg-gradient-to-r"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.div>

      <motion.form
        ref={formRef}
        onSubmit={onSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        noValidate
        aria-label={t('contact_form_label')}
      >
        <FormField
          name="name"
          label={t('name_label')}
          placeholder={t('name_placeholder')}
          register={register}
          error={errors.name?.message ? t(errors.name.message) : undefined}
          disabled={isSubmitting}
          icon={<div className="bg-primary/20 h-4 w-4 rounded-full" />}
        />

        <FormField
          name="email"
          label={t('email_label')}
          type="email"
          placeholder={t('email_placeholder')}
          register={register}
          error={errors.email?.message ? t(errors.email.message) : undefined}
          disabled={isSubmitting}
          icon={<div className="bg-primary/20 h-4 w-4 rounded" />}
        />

        <FormField
          name="message"
          label={t('message_label')}
          placeholder={t('message_placeholder')}
          register={register}
          error={
            errors.message?.message ? t(errors.message.message) : undefined
          }
          disabled={isSubmitting}
          rows={4}
          isTextArea={true}
          icon={<div className="bg-primary/20 h-4 w-4 rounded-sm" />}
        />

        <div className="flex items-center gap-4 pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting || submitBlocked || !isValid}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={submitSuccess ? 'success' : 'initial'}
            className={`from-primary via-primary/90 to-primary text-primary-foreground focus:ring-primary/50 hover:shadow-primary/25 group relative overflow-hidden rounded-lg bg-gradient-to-r px-8 py-4 font-semibold shadow-lg transition-all duration-300 ease-out hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
            aria-describedby="submit-status"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  {t('sending')}
                </motion.div>
              ) : submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <BsCheckCircle className="size-4" />
                  {t('sent')}
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  {t('send')}
                  <BsSend className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />
          </motion.button>

          {/* Form status */}
          <div id="submit-status" className="sr-only" aria-live="polite">
            {isSubmitting && t('form_submitting')}
            {submitSuccess && t('form_submitted')}
            {Object.keys(errors).length > 0 && t('form_has_errors')}
          </div>

          {/* Character count for message */}
          {watchedValues.message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-muted-foreground text-sm"
            >
              {watchedValues.message.length}/500
            </motion.div>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default ContactForm;
