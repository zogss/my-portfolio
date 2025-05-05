'use client';

import React, { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { LoadingProvider } from '@/providers/LoadingProvider';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LoadingProvider>
      {children}
      <Toaster
        position="bottom-right"
        containerClassName="react-hot-toast__container"
        toastOptions={{
          duration: 5000,
          className: 'react-hot-toast__toast',
        }}
      />
    </LoadingProvider>
  );
};
