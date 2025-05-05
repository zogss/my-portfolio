'use client';

import React, { PropsWithChildren, useEffect, useState } from 'react';

import Loader from '@/components/Loader';

export const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleStart = () => {
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        htmlElement.style.overflow = 'hidden';
        htmlElement.style.marginRight = '.9375rem';
      }
      const element = document.getElementById('loader-wrapper');
      if (element) {
        element.style.display = 'flex';
      }
      setIsLoading(true);
    };

    const handleComplete = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        htmlElement.style.overflow = 'unset';
        htmlElement.style.marginRight = '0rem';
      }
      const element = document.getElementById('loader-wrapper');
      if (element) {
        element.classList.add('opacity-0');

        await new Promise((resolve) => setTimeout(resolve, 500));

        element.style.display = 'none';
      }
      setIsLoading(false);
    };

    // start loading animation
    handleStart();

    // complete loading animation
    handleComplete();

    return () => {
      // stop loading animation
      handleComplete();
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {children}
    </>
  );
};
