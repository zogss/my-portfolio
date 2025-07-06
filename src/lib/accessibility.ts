/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';

// Accessibility utilities for WCAG 2.1 AA compliance
export const a11yUtils = {
  // Focus management
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  },

  // Announce to screen readers
  announceToScreenReader: (
    message: string,
    priority: 'polite' | 'assertive' = 'polite',
  ) => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;

    document.body.appendChild(announcer);

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  // Skip to content link
  createSkipLink: (targetId: string, text: string = 'Skip to main content') => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.className = 'skip-link';
    skipLink.textContent = text;
    skipLink.setAttribute('aria-label', text);

    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });

    return skipLink;
  },

  // Keyboard navigation helpers
  handleArrowNavigation: (
    currentIndex: number,
    maxIndex: number,
    key: string,
    orientation: 'horizontal' | 'vertical' = 'horizontal',
  ): number => {
    const isHorizontal = orientation === 'horizontal';
    const nextKeys = isHorizontal ? ['ArrowRight', 'ArrowDown'] : ['ArrowDown'];
    const prevKeys = isHorizontal ? ['ArrowLeft', 'ArrowUp'] : ['ArrowUp'];

    if (nextKeys.includes(key)) {
      return currentIndex >= maxIndex ? 0 : currentIndex + 1;
    }
    if (prevKeys.includes(key)) {
      return currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }
    if (key === 'Home') {
      return 0;
    }
    if (key === 'End') {
      return maxIndex;
    }

    return currentIndex;
  },
};

// Hook for managing focus trap
export const useFocusTrap = (isActive: boolean = false) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const cleanup = a11yUtils.trapFocus(ref.current);
    return cleanup;
  }, [isActive]);

  return ref;
};

// Hook for managing focus on mount
export const useFocusOnMount = (shouldFocus: boolean = true) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldFocus && ref.current) {
      const timer = setTimeout(() => {
        ref.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [shouldFocus]);

  return ref;
};

// Hook for keyboard navigation
export const useKeyboardNavigation = (
  items: any[],
  options: {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
    onSelect?: (index: number) => void;
  } = {},
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { orientation = 'horizontal', onSelect } = options;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const newIndex = a11yUtils.handleArrowNavigation(
        currentIndex,
        items.length - 1,
        e.key,
        orientation,
      );

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        e.preventDefault();
      }

      if (e.key === 'Enter' || e.key === ' ') {
        onSelect?.(currentIndex);
        e.preventDefault();
      }
    },
    [currentIndex, items.length, orientation, onSelect],
  );

  return {
    currentIndex,
    setCurrentIndex,
    handleKeyDown,
  };
};

// Hook for screen reader announcements
export const useScreenReaderAnnouncement = () => {
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      a11yUtils.announceToScreenReader(message, priority);
    },
    [],
  );

  return announce;
};

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook for high contrast mode
export const useHighContrast = () => {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersHighContrast;
};

// Hook for managing ARIA live regions
export const useAriaLiveRegion = (initialMessage: string = '') => {
  const [message, setMessage] = useState(initialMessage);
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announce = useCallback(
    (newMessage: string, newPriority: 'polite' | 'assertive' = 'polite') => {
      setMessage(newMessage);
      setPriority(newPriority);
    },
    [],
  );

  return {
    message,
    priority,
    announce,
  };
};

// Hook for managing document title
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

// Hook for managing focus restoration
export const useFocusRestore = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const storeFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, []);

  return {
    storeFocus,
    restoreFocus,
  };
};

export default {
  a11yUtils,
  useFocusTrap,
  useFocusOnMount,
  useKeyboardNavigation,
  useScreenReaderAnnouncement,
  useReducedMotion,
  useHighContrast,
  useAriaLiveRegion,
  useDocumentTitle,
  useFocusRestore,
};
