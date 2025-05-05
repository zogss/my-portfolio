'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/utils';

import { debounce } from '@/lib/debounce';
import { useTranslation } from '@/i18n/client';
import { useScrollSpy } from '@/hooks/useScrollSpy';

interface HeaderLinksProps {
  floating?: boolean;
}

const HeaderLinks: React.FC<HeaderLinksProps> = ({ floating }) => {
  const { t } = useTranslation();

  const floatingBarRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleChangeActiveId = useCallback(
    (hashId: string) => {
      const id = `${hashId.replace('#', '').replace('nav-', '').replace('-', '_')}-${floating ? 'floating' : 'header'}`;
      const anchorElement = document.getElementById(id);
      const floatingBarElement = underlineRef.current;
      if (anchorElement) {
        const { offsetWidth, offsetLeft } = anchorElement;
        if (floatingBarElement) {
          floatingBarElement.style.width = `${offsetWidth}px`;
          floatingBarElement.style.left = `${offsetLeft}px`;
        }
      }
    },
    [floating],
  );

  const { activeSection } = useScrollSpy({
    sectionIds: navLinks.map((link) => link.to.replace('#', '')),
    offsetTop: 80,
    onChangeActiveId: handleChangeActiveId,
  });

  const handleMouseEnter = (index: string) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  useEffect(() => {
    if (!floating) {
      const handleScroll = debounce((event: Event) => {
        const target = event.target as Document;

        if (target.documentElement.scrollTop <= 20 && navLinks[0]) {
          handleChangeActiveId(navLinks[0].to);
        }
      }, 100);

      document.addEventListener('scroll', handleScroll);

      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }
  }, [floating, handleChangeActiveId]);

  useEffect(() => {
    if (hoveredItem) {
      const hoveredElement = document.getElementById(hoveredItem);
      const floatingBarElement = floatingBarRef.current;
      if (hoveredElement && floatingBarElement) {
        const { offsetWidth, offsetHeight, offsetTop, offsetLeft } =
          hoveredElement;
        floatingBarElement.style.width = `${offsetWidth}px`;
        floatingBarElement.style.height = `${offsetHeight}px`;
        floatingBarElement.style.top = `${offsetTop}px`;
        floatingBarElement.style.left = `${offsetLeft}px`;
      }
    }
  }, [hoveredItem]);

  return (
    <div
      className="relative hidden items-center lg:flex"
      onMouseLeave={handleMouseLeave}
    >
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.to}
          id={`${link.name}-${floating ? 'floating' : 'header'}`}
          title={t(link.name)}
          onMouseEnter={() =>
            handleMouseEnter(`${link.name}-${floating ? 'floating' : 'header'}`)
          }
          className={cn(
            'z-[1] flex rounded px-4 py-2.5 text-neutral-100/50 transition-colors duration-200 hover:text-neutral-100 xl:px-5',
            activeSection === link.to.replace('#', '') && 'text-neutral-100',
          )}
        >
          {t(link.name)}
        </Link>
      ))}
      <div
        ref={floatingBarRef}
        className={cn(
          'absolute rounded bg-white/20 transition-[width,height,top,left,opacity]',
          hoveredItem ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        ref={underlineRef}
        className="absolute -bottom-0.5 h-0.5 rounded-full bg-neutral-100 transition-[width,left] duration-300 ease-in-out"
      />
    </div>
  );
};

export default HeaderLinks;

export const navLinks = [
  {
    name: 'home',
    to: '#nav-home',
  },
  {
    name: 'about',
    to: '#nav-about',
  },
  {
    name: 'projects',
    to: '#nav-projects',
  },
  {
    name: 'experience',
    to: '#nav-experience',
  },
  {
    name: 'tech_stack',
    to: '#nav-tech-stack',
  },
  {
    name: 'contact',
    to: '#nav-contact',
  },
];
