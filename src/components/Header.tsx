'use client';

import React, { Fragment, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/utils';
import { Menu, MenuItem, MenuItems } from '@headlessui/react';
import { AnimatePresence, motion } from 'motion/react';

import { useTranslation } from '@/i18n/client';
import { navLinks } from '@/components/HeaderLinks';
import HeaderMenu from '@/components/HeaderMenu';
import SocialLinks from '@/components/SocialLinks';
import YIcon from '@/components/svgs/YIcon';

interface HeaderProps {
  hideSectionLinks?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideSectionLinks }) => {
  const { t } = useTranslation();

  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerElement = headerRef.current;
    const navElement = navRef.current;
    if (navElement && headerElement) {
      const handleScroll = () => {
        if (window.scrollY > 20) {
          headerElement.classList.remove('flex');
          headerElement.classList.add('hidden');

          navElement.classList.remove('-translate-y-full');
        } else {
          headerElement.classList.remove('hidden');
          headerElement.classList.add('flex');

          navElement.classList.add('-translate-y-full');
        }
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <>
      <Menu as={Fragment}>
        {({ open, close }) => (
          <header
            ref={headerRef}
            className={cn(
              'fixed inset-x-0 top-0 z-10 flex w-full flex-col items-center justify-between px-5 py-3 pr-3 md:px-6 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:px-[calc(4.5vw)] xl:px-[calc(10vw_+_1.625rem)]',
              open
                ? 'bg-charcoal-black-700/90'
                : 'from-charcoal-black-700/90 to-charcoal-black-700/50 bg-gradient-to-b',
            )}
          >
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5 xl:gap-16">
                <Link
                  href={hideSectionLinks ? '/' : '#home'}
                  title={
                    hideSectionLinks
                      ? t('navigate_home_page')
                      : t('navigate_home')
                  }
                  aria-label={t('navigate_home')}
                  className="flex shrink-0"
                >
                  <YIcon
                    aria-label={t('yan_logo_alt')}
                    className="size-[2.125rem] shrink-0"
                  />
                  <span className="sr-only">{t('yan_logo_alt')}</span>
                </Link>
                <SocialLinks className="h-12 gap-1" iconSize="sm" />
              </div>
              <HeaderMenu hideSectionLinks={hideSectionLinks} />
            </div>
            {!hideSectionLinks && (
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="header"
                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex w-full overflow-hidden lg:hidden"
                  >
                    <MenuItems
                      as="div"
                      static
                      className="mt-4 flex w-full flex-col items-start gap-1 py-2"
                    >
                      {navLinks.map((link) => (
                        <MenuItem
                          as={Link}
                          key={link.name}
                          href={link.to}
                          onClick={() => close()}
                          className="flex w-full justify-center rounded px-3.5 py-3 pr-8 text-center text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
                        >
                          {t(link.name)}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </header>
        )}
      </Menu>
      <Menu as={Fragment}>
        {({ open, close }) => (
          <nav
            ref={navRef}
            className="shadow-primary fixed inset-x-0 top-0 z-10 flex w-full -translate-y-full flex-col items-center justify-between rounded-b-xl border border-t-0 border-zinc-800 bg-zinc-900/60 px-5 py-3 pr-3 backdrop-blur transition-[transform,width] duration-300 md:px-6 lg:left-1/2 lg:w-[96vw] lg:-translate-x-1/2 lg:px-8 xl:w-[80vw]"
          >
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5 xl:gap-16">
                <Link
                  href={hideSectionLinks ? '/' : '#home'}
                  title={
                    hideSectionLinks
                      ? t('navigate_home_page')
                      : t('navigate_home')
                  }
                  aria-label={t('navigate_home')}
                  className="flex shrink-0"
                >
                  <YIcon
                    aria-label={t('yan_logo_alt')}
                    className="size-[2.125rem] shrink-0"
                  />
                  <span className="sr-only">{t('yan_logo_alt')}</span>
                </Link>
                <SocialLinks className="h-12 gap-1" iconSize="sm" />
              </div>
              <HeaderMenu floating hideSectionLinks={hideSectionLinks} />
            </div>
            {!hideSectionLinks && (
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="nav"
                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex w-full overflow-hidden lg:hidden"
                  >
                    <MenuItems
                      as="div"
                      static
                      className="mt-4 flex w-full flex-col items-start gap-1 py-2"
                    >
                      {navLinks.map((link) => (
                        <MenuItem
                          as={Link}
                          key={link.name}
                          href={link.to}
                          onClick={() => close()}
                          className="flex w-full justify-center rounded px-3.5 py-3 pr-8 text-center text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
                        >
                          {t(link.name)}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </nav>
        )}
      </Menu>
    </>
  );
};

export default Header;
