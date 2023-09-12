import { t } from 'i18next'
import React from 'react'
import hotToast, { Toast } from 'react-hot-toast'
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCircleXmark } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'

interface NotificationProps {
  toastInst: Toast
  message: string
}

const dismiss = (id: string) => hotToast.dismiss(id)

export const SuccessNotification: React.FC<NotificationProps> = ({ message, toastInst }) => {
  return (
    <div className="relative flex w-80 items-center rounded-lg border border-green-600 bg-charcoal-black-700 p-4 text-sm text-white">
      <button
        type="button"
        title={t('close')}
        aria-label={t('close')}
        onClick={() => dismiss(toastInst?.id)}
        className="absolute right-0 top-0 m-3 rounded-md p-0.5 text-green-400 transition-colors duration-300 ease-in-out hover:bg-white/20"
      >
        <MdClose className="h-4 w-4" />
      </button>
      <FaCircleCheck
        aria-label={t('success_icon')}
        className="mr-2 h-6 w-6 shrink-0 text-green-500"
      />
      <p>{message}</p>
    </div>
  )
}

export const InfoNotification: React.FC<NotificationProps> = ({ message, toastInst }) => {
  return (
    <div className="relative flex w-80 items-center rounded-lg border border-blue-600 bg-charcoal-black-700 p-4 text-sm text-white">
      <button
        type="button"
        title={t('close')}
        aria-label={t('close')}
        onClick={() => dismiss(toastInst?.id)}
        className="absolute right-0 top-0 m-3 rounded-md p-0.5 text-blue-400 transition-colors duration-300 ease-in-out hover:bg-white/20"
      >
        <MdClose className="h-4 w-4" />
      </button>
      <FaCircleInfo aria-label={t('info_icon')} className="mr-2 h-6 w-6 shrink-0 text-blue-500" />
      <p>{message}</p>
    </div>
  )
}

export const WarningNotification: React.FC<NotificationProps> = ({ message, toastInst }) => {
  return (
    <div className="relative flex w-80 items-center rounded-lg border border-yellow-600 bg-charcoal-black-700 p-4 text-sm text-white">
      <button
        type="button"
        title={t('close')}
        aria-label={t('close')}
        onClick={() => dismiss(toastInst?.id)}
        className="absolute right-0 top-0 m-3 rounded-md p-0.5 text-yellow-400 transition-colors duration-300 ease-in-out hover:bg-white/20"
      >
        <MdClose className="h-4 w-4" />
      </button>
      <FaCircleExclamation
        aria-label={t('warning_icon')}
        className="mr-2 h-6 w-6 shrink-0 text-yellow-500"
      />
      <p>{message}</p>
    </div>
  )
}

export const DangerNotification: React.FC<NotificationProps> = ({ message, toastInst }) => {
  return (
    <div className="relative flex w-80 items-center rounded-lg border border-red-600 bg-charcoal-black-700 p-4 text-sm text-white">
      <button
        type="button"
        title={t('close')}
        aria-label={t('close')}
        onClick={() => dismiss(toastInst?.id)}
        className="absolute right-0 top-0 m-3 rounded-md p-0.5 text-red-400 transition-colors duration-300 ease-in-out hover:bg-white/20"
      >
        <MdClose className="h-4 w-4" />
      </button>
      <FaCircleXmark aria-label={t('error_icon')} className="mr-2 h-6 w-6 shrink-0 text-red-500" />
      <p>{message}</p>
    </div>
  )
}
