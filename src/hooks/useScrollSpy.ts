'use client';

import { useEffect, useState } from 'react';
import { inView } from 'motion/react';

import { useWindowSize } from './useWindowSize';

interface UseScrollSpyProps {
  sectionIds: string[];
  offsetTop?: number;
  onChangeActiveId?: (id: string) => void;
}

export const useScrollSpy = ({
  sectionIds,
  offsetTop = 80,
  onChangeActiveId,
}: UseScrollSpyProps) => {
  const { isSmaller } = useWindowSize({ breakpoint: 'xl' });

  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const stop = inView(
          element,
          () => {
            setActiveSection(id);
            onChangeActiveId?.(id);
          },
          {
            amount: isSmaller && element.id === 'nav-experience' ? 0.3 : 0.5,
            margin: `${-offsetTop}px 0px 0px 0px` as const,
          },
        );

        return () => {
          stop();
        };
      }
    });
  }, [isSmaller, offsetTop, onChangeActiveId, sectionIds]);

  return {
    activeSection,
  };
};
