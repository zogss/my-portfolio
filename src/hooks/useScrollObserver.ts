import { useEffect, useRef, useState } from 'react';

interface UseScrollObserverProps {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number[];
  onChangeActiveId?: ((id: string, activeLink: string) => void) | null;
}

type LinkEntry = {
  id: string;
  ratio: number;
};

/**
 *
 * @param root
 * @param rootMargin
 * @param threshold
 * @param onChangeActiveId
 * @returns
 */
const useScrollObserver = ({
  root,
  rootMargin,
  threshold,
  onChangeActiveId,
}: UseScrollObserverProps) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const idsRef = useRef<LinkEntry[]>([]);

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const ref = idsRef.current.find((el) => el.id === id);
        if (ref) ref.ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      const maxRatio = Math.max(...idsRef.current.map((el) => el.ratio), 0.1);
      const entry = idsRef.current.find((el) => el.ratio === maxRatio);

      if (entry) {
        setActiveLink(entry.id);
      }

      if (
        entry &&
        entry.id &&
        activeLink !== entry.id &&
        typeof onChangeActiveId === 'function'
      ) {
        if (activeLink) {
          onChangeActiveId(entry.id, activeLink);
        }
      }
    };

    const optionsObserver = { root, rootMargin, threshold };
    const observer = new IntersectionObserver(
      handleIntersection,
      optionsObserver,
    );

    idsRef.current.forEach(({ id }) => {
      const content = document.getElementById(id);
      if (content) {
        observer.observe(content);
      }
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsRef, root, rootMargin, threshold]);

  return { idsRef, activeLink };
};

export default useScrollObserver;
