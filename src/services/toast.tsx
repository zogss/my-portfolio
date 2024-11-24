import React from 'react';
import hotToast, {ToastOptions} from 'react-hot-toast';

import {
  DangerNotification,
  InfoNotification,
  SuccessNotification,
  WarningNotification,
} from '@/components/Notification';

interface IToast {
  success: (message: string, overrideConfig?: ToastOptions) => void;
  error: (message: string, overrideConfig?: ToastOptions) => void;
  info: (message: string, overrideConfig?: ToastOptions) => void;
  warning: (message: string, overrideConfig?: ToastOptions) => void;
}

const _toast: IToast = {
  success(message: string, overrideConfig?: ToastOptions) {
    hotToast(
      d => <SuccessNotification message={message} toastInst={d} />,
      overrideConfig,
    );
  },
  error(message: string, overrideConfig?: ToastOptions) {
    hotToast(
      d => <DangerNotification message={message} toastInst={d} />,
      overrideConfig,
    );
  },
  info(message: string, overrideConfig?: ToastOptions) {
    hotToast(
      d => <InfoNotification message={message} toastInst={d} />,
      overrideConfig,
    );
  },
  warning(message: string, overrideConfig?: ToastOptions) {
    hotToast(
      d => <WarningNotification message={message} toastInst={d} />,
      overrideConfig,
    );
  },
};

export const toast = _toast;
