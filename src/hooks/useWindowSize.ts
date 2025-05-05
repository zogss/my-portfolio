'use client';

import { useEffect, useState } from 'react';

import { debounce } from '@/lib/debounce';

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 992,
  xl: 1200,
};

type WindowSize = {
  width?: number;
  height?: number;
};

type useWindowSizePropsType = {
  breakpoint: keyof typeof breakpoints;
  showCurrentBreakpoint?: boolean;
};

type useWindowSizeReturnType = {
  isSmaller: boolean;
  windowSize?: WindowSize;
  currBreakpoint?: keyof typeof breakpoints;
};

type useWindowSizeType = (
  props: useWindowSizePropsType,
) => useWindowSizeReturnType;

export const useWindowSize: useWindowSizeType = ({
  breakpoint,
  showCurrentBreakpoint,
}) => {
  const [isSmaller, setIsSmaller] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>();
  const [currBreakpoint, setCurrBreakpoint] =
    useState<keyof typeof breakpoints>();

  useEffect(() => {
    let isFirstRender = true;

    const handleResize = debounce(() => {
      if (window.innerWidth <= breakpoints[breakpoint]) {
        setIsSmaller(true);
      } else {
        setIsSmaller(false);
      }

      if (showCurrentBreakpoint) {
        if (window.innerWidth < breakpoints.sm) {
          setCurrBreakpoint('xs');
        } else if (window.innerWidth < breakpoints.md) {
          setCurrBreakpoint('sm');
        } else if (window.innerWidth < breakpoints.lg) {
          setCurrBreakpoint('md');
        } else if (window.innerWidth < breakpoints.xl) {
          setCurrBreakpoint('lg');
        } else {
          setCurrBreakpoint('xl');
        }
      }

      const newWindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (
        windowSize?.width !== newWindowSize.width ||
        windowSize?.height !== newWindowSize.height
      ) {
        setWindowSize(newWindowSize);
      }
      isFirstRender = false;
    }, 200);

    if (isFirstRender) handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint, showCurrentBreakpoint, windowSize]);

  return {
    isSmaller,
    windowSize,
    currBreakpoint,
  };
};
