'use client';

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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

type NavigationState = 'top' | 'scrolled' | 'hidden' | 'floating';

const Header: React.FC<HeaderProps> = ({ hideSectionLinks }) => {
  const { t } = useTranslation();

  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  const [navigationState, setNavigationState] =
    useState<NavigationState>('top');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isAtTop = currentScrollY < 20;
      const isScrolledSignificantly = currentScrollY > 100;

      // Calculate scroll progress
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / windowHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Update scroll direction
      setIsScrollingDown(isScrollingDown && currentScrollY > 50);
      setLastScrollY(currentScrollY);

      // Determine navigation state
      let newState: NavigationState = 'top';

      if (isAtTop) {
        newState = 'top';
      } else if (isScrollingDown && isScrolledSignificantly) {
        newState = 'hidden';
      } else if (!isAtTop) {
        newState = 'floating';
      }

      setNavigationState(newState);

      // Apply state to elements with performance optimizations
      const headerElement = headerRef.current;
      const navElement = navRef.current;
      const progressElement = scrollProgressRef.current;

      if (headerElement && navElement && progressElement) {
        // Force hardware acceleration
        headerElement.style.transform = 'translateZ(0)';
        navElement.style.transform = 'translateZ(0)';
        progressElement.style.transform = 'translateZ(0)';

        // Update scroll progress bar
        progressElement.style.width = `${progress}%`;

        // Apply morphing states with optimized transforms
        switch (newState) {
          case 'top':
            headerElement.style.transform =
              'translateY(0) scale(1) translateZ(0)';
            headerElement.style.opacity = '1';
            navElement.style.transform = 'translateY(-100%) translateZ(0)';
            navElement.style.opacity = '0';
            break;

          case 'floating':
            headerElement.style.transform = 'translateY(-100%) translateZ(0)';
            headerElement.style.opacity = '0';
            navElement.style.transform = 'translateY(0) scale(1) translateZ(0)';
            navElement.style.opacity = '1';
            break;

          case 'hidden':
            headerElement.style.transform = 'translateY(-100%) translateZ(0)';
            headerElement.style.opacity = '0';
            navElement.style.transform =
              'translateY(-100%) scale(0.95) translateZ(0)';
            navElement.style.opacity = '0';
            break;
        }
      }
    });
  }, [lastScrollY]);

  // Optimized scroll event listener
  useEffect(() => {
    // Initial call
    handleScroll();

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleScroll]);

  // Enhanced header variants based on state
  const getHeaderVariants = () => {
    const baseVariants = {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -100, opacity: 0 },
    };

    switch (navigationState) {
      case 'top':
        return {
          ...baseVariants,
          animate: {
            ...baseVariants.animate,
            scale: 1,
            backdropFilter: 'blur(0px)',
            backgroundColor: 'rgba(8, 7, 12, 0.8)',
          },
        };
      case 'floating':
        return {
          ...baseVariants,
          animate: {
            ...baseVariants.animate,
            scale: 0.95,
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(8, 7, 12, 0.95)',
          },
        };
      default:
        return baseVariants;
    }
  };

  // Preload performance optimizations
  useEffect(() => {
    const headerElement = headerRef.current;
    const navElement = navRef.current;

    if (headerElement && navElement) {
      // Optimize for performance
      headerElement.style.willChange = 'transform, opacity';
      navElement.style.willChange = 'transform, opacity';
      headerElement.style.contain = 'layout style paint';
      navElement.style.contain = 'layout style paint';

      return () => {
        headerElement.style.willChange = 'auto';
        navElement.style.willChange = 'auto';
        headerElement.style.contain = 'none';
        navElement.style.contain = 'none';
      };
    }
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="bg-muted/20 scroll-progress fixed inset-x-0 top-0 z-50 h-1">
        <div
          ref={scrollProgressRef}
          className="from-primary via-primary/80 to-primary h-full bg-gradient-to-r transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Header - Visible at page top */}
      <Menu as={Fragment}>
        {({ open, close }) => (
          <motion.header
            ref={headerRef}
            variants={getHeaderVariants()}
            initial="initial"
            animate="animate"
            className={cn(
              'fixed inset-x-0 top-1 z-40 flex w-full flex-col items-center justify-between px-5 py-3 pr-3 md:px-6 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:px-[calc(4.5vw)] xl:px-[calc(10vw_+_1.625rem)]',
              'ease-spring transition-all duration-500',
              'nav-top',
              {
                'glass-card shadow-glass-lg': navigationState !== 'top',
                'from-charcoal-black-700/90 to-charcoal-black-700/50 bg-gradient-to-b':
                  navigationState === 'top',
                'bg-charcoal-black-700/95 backdrop-blur-xl': open,
              },
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
                  className="group hover-magnetic flex shrink-0"
                >
                  <YIcon
                    aria-label={t('yan_logo_alt')}
                    className="size-[2.125rem] shrink-0 transition-transform duration-300 group-hover:scale-110"
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
                    key="header-menu"
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex w-full overflow-hidden lg:hidden"
                  >
                    <MenuItems
                      as="div"
                      static
                      className="mt-4 flex w-full flex-col items-start gap-1 py-2"
                    >
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <MenuItem
                            as={Link}
                            href={link.to}
                            onClick={() => close()}
                            className="flex w-full justify-center rounded-lg px-3.5 py-3 pr-8 text-center text-sm text-neutral-100/50 transition-all duration-200 hover:scale-105 hover:bg-white/20 hover:text-neutral-100 active:scale-95"
                          >
                            {t(link.name)}
                          </MenuItem>
                        </motion.div>
                      ))}
                    </MenuItems>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.header>
        )}
      </Menu>

      {/* Floating Navigation - Appears when scrolling */}
      <Menu as={Fragment}>
        {({ open, close }) => (
          <motion.nav
            ref={navRef}
            initial={{ y: -100, opacity: 0, scale: 0.9 }}
            animate={{
              y: navigationState === 'floating' ? 0 : -100,
              opacity: navigationState === 'floating' ? 1 : 0,
              scale: navigationState === 'floating' ? 1 : 0.9,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={cn(
              'fixed inset-x-0 top-4 z-40 flex w-full flex-col items-center justify-between',
              'glass-card shadow-glass-lg border-white/10',
              'mx-4 md:mx-6 lg:left-1/2 lg:mx-0 lg:w-[96vw] lg:-translate-x-1/2 xl:w-[80vw]',
              'px-5 py-3 pr-3 md:px-6 lg:px-8',
              'ease-spring hover:shadow-glass-lg transition-all duration-500 hover:scale-[1.02]',
              'nav-floating',
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
                  className="group hover-magnetic flex shrink-0"
                >
                  <YIcon
                    aria-label={t('yan_logo_alt')}
                    className="size-[2.125rem] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
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
                    key="floating-menu"
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex w-full overflow-hidden lg:hidden"
                  >
                    <MenuItems
                      as="div"
                      static
                      className="mt-4 flex w-full flex-col items-start gap-1 py-2"
                    >
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <MenuItem
                            as={Link}
                            href={link.to}
                            onClick={() => close()}
                            className="flex w-full justify-center rounded-lg px-3.5 py-3 pr-8 text-center text-sm text-neutral-100/50 transition-all duration-200 hover:scale-105 hover:bg-white/20 hover:text-neutral-100 active:scale-95"
                          >
                            {t(link.name)}
                          </MenuItem>
                        </motion.div>
                      ))}
                    </MenuItems>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.nav>
        )}
      </Menu>

      {/* Scroll Direction Indicator */}
      <AnimatePresence>
        {navigationState === 'floating' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="scroll-indicator"
          >
            <div className="glass-card rounded-full p-2">
              <motion.div
                animate={{
                  rotate: isScrollingDown ? 180 : 0,
                  scale: isScrollingDown ? 0.9 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="text-primary h-6 w-6"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
