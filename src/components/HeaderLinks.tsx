import React, {useEffect, useRef, useState} from 'react';
import {useI18next} from 'gatsby-plugin-react-i18next';
import ScrollSpy from 'react-scrollspy-navigation';

import {cn} from '@/utils';

interface HeaderLinksProps {
  floating?: boolean;
}

const HeaderLinks: React.FC<HeaderLinksProps> = ({floating}) => {
  const {t, language} = useI18next();

  const floatingBarRef = useRef<HTMLDivElement>(null);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = (index: string) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  useEffect(() => {
    if (hoveredItem) {
      const hoveredElement = document.getElementById(hoveredItem);
      const floatingBarElement = floatingBarRef.current;
      if (hoveredElement && floatingBarElement) {
        floatingBarElement.style.width = `${hoveredElement.offsetWidth}px`;
        floatingBarElement.style.height = `${hoveredElement.offsetHeight}px`;
        floatingBarElement.style.top = `${hoveredElement.offsetTop}px`;
        floatingBarElement.style.left = `${hoveredElement.offsetLeft}px`;
      }
    }
  }, [hoveredItem]);

  return (
    <ScrollSpy activeClass="active-scroll-spy" offsetTop={80}>
      <div
        className="hidden items-center lg:flex"
        onMouseLeave={handleMouseLeave}>
        {navLinks.map(link => (
          <a
            key={link.name}
            href={link.to}
            id={`${link.name}-${floating ? 'floating' : 'header'}`}
            title={t(link.name)}
            onMouseEnter={() =>
              handleMouseEnter(
                `${link.name}-${floating ? 'floating' : 'header'}`,
              )
            }
            onClick={e => {
              e.preventDefault();
              window.location.href = `${language === 'en' ? '/en/' : ''}${link.to}`;
            }}
            className="relative z-[1] flex rounded px-5 py-2.5 text-neutral-100/50 transition-colors duration-200 hover:text-neutral-100">
            {t(link.name)}
            <div className="link-border absolute inset-x-0 bottom-0" />
          </a>
        ))}
        <div
          ref={floatingBarRef}
          className={cn(
            'absolute rounded bg-white/20 transition-all',
            hoveredItem ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>
    </ScrollSpy>
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
    name: 'tech_stack',
    to: '#nav-tech-stack',
  },
  {
    name: 'contact',
    to: '#nav-contact',
  },
];
