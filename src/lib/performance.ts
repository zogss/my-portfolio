/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Performance monitoring utilities
export const performanceMonitor = {
  // Get basic performance metrics
  getMetrics: async () => {
    const navigation = performance.getEntriesByType(
      'navigation',
    )[0] as PerformanceNavigationTiming;

    return {
      fcp:
        navigation.loadEventStart - ((navigation as any)?.navigationStart ?? 0),
      lcp:
        navigation.loadEventEnd - ((navigation as any)?.navigationStart ?? 0),
      cls: 0, // Simplified for now
      score: 85, // Default good score
    };
  },
};

// Optimized animation utilities
export const animationUtils = {
  // Ensure 60fps animations by using transform and opacity only
  optimizeForPerformance: (element: HTMLElement) => {
    element.style.willChange = 'transform, opacity';
    element.style.contain = 'layout style paint';
    element.style.transform = 'translateZ(0)'; // Force hardware acceleration
  },

  // Cleanup optimization
  cleanupOptimization: (element: HTMLElement) => {
    element.style.willChange = 'auto';
    element.style.contain = 'none';
  },

  // Throttle scroll events for better performance
  throttleScroll: (callback: () => void, delay: number = 16) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;

    return () => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        callback();
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(
          () => {
            callback();
            lastExecTime = Date.now();
          },
          delay - (currentTime - lastExecTime),
        );
      }
    };
  },

  // Debounce resize events
  debounceResize: (callback: () => void, delay: number = 100) => {
    let timeoutId: NodeJS.Timeout;

    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  },
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {},
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry?.isIntersecting;
        setIsIntersecting(isElementIntersecting ?? false);

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasIntersected, options]);

  return { ref, isIntersecting, hasIntersected };
};

// Optimized scroll handler hook
export const useOptimizedScroll = (
  callback: (scrollY: number) => void,
  dependencies: React.DependencyList = [],
) => {
  const requestRef = useRef<number | null>(null);
  const previousScrollY = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    if (previousScrollY.current !== scrollY) {
      callback(scrollY);
      previousScrollY.current = scrollY;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, dependencies]);

  useEffect(() => {
    const throttledScroll = animationUtils.throttleScroll(handleScroll);

    window.addEventListener('scroll', throttledScroll, { passive: true });

    const requestRefCurrent = requestRef.current;

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (requestRefCurrent) {
        cancelAnimationFrame(requestRefCurrent);
      }
    };
  }, [handleScroll]);
};

// Optimized resize handler hook
export const useOptimizedResize = (
  callback: (width: number, height: number) => void,
  dependencies: React.DependencyList = [],
) => {
  const handleResize = useCallback(() => {
    callback(window.innerWidth, window.innerHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, dependencies]);

  useEffect(() => {
    const debouncedResize = animationUtils.debounceResize(handleResize);

    window.addEventListener('resize', debouncedResize, { passive: true });

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [handleResize]);
};

// Loading state management
export const useLoadingState = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoadingError = useCallback((errorMessage: string) => {
    setIsLoading(false);
    setError(errorMessage);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
  };
};

// Optimized image loading with blur-up effect
export const useOptimizedImageLoading = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Preload the image
    const preloadImg = new Image();
    preloadImg.src = src;
    preloadImg.onload = handleLoad;
    preloadImg.onerror = handleError;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return { imgRef, isLoaded, hasError };
};

// Component preloading utility
export const preloadComponent = (componentLoader: () => Promise<any>) => {
  const preloadPromise = componentLoader();

  return {
    preload: () => preloadPromise,
    Component: React.lazy(() => preloadPromise),
  };
};

// FPS monitor
export const useFPSMonitor = () => {
  const [fps, setFPS] = useState<number>(0);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    const updateFPS = (currentTime: number) => {
      frameCountRef.current++;

      if (currentTime - lastTimeRef.current >= 1000) {
        setFPS(frameCountRef.current);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      frameRef.current = requestAnimationFrame(updateFPS);
    };

    frameRef.current = requestAnimationFrame(updateFPS);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return fps;
};

// Batch DOM updates for better performance
export const useBatchedUpdates = () => {
  const updateQueueRef = useRef<(() => void)[]>([]);
  const isProcessingRef = useRef(false);

  const batchUpdate = useCallback((updateFn: () => void) => {
    updateQueueRef.current.push(updateFn);

    if (!isProcessingRef.current) {
      isProcessingRef.current = true;

      requestAnimationFrame(() => {
        const updates = updateQueueRef.current.splice(0);
        updates.forEach((update) => update());
        isProcessingRef.current = false;
      });
    }
  }, []);

  return { batchUpdate };
};

// Optimized component mounting
export const useOptimizedMount = (callback: () => void) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, 0);
    return () => clearTimeout(timeoutId);
  }, [callback]);
};

export default {
  performanceMonitor,
  animationUtils,
  useIntersectionObserver,
  useOptimizedScroll,
  useOptimizedResize,
  useLoadingState,
  useOptimizedImageLoading,
  preloadComponent,
  useFPSMonitor,
  useBatchedUpdates,
  useOptimizedMount,
};
