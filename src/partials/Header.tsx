import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { Fragment, useEffect, useRef } from 'react'
import { navLinks } from '~/components/HeaderLinks'
import HeaderMenu from '~/components/HeaderMenu'
import SocialLinks from '~/components/SocialLinks'
import { IndexPageProps } from '~/pages'

interface HeaderProps {
  pageProps: IndexPageProps
}

const Header: React.FC<HeaderProps> = ({ pageProps }) => {
  //* hooks
  const { t } = useI18next()

  //* refs
  const headerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  //* effects
  useEffect(() => {
    const headerElement = headerRef.current
    const navElement = navRef.current
    if (navElement && headerElement) {
      const handleScroll = () => {
        if (window.scrollY > 20) {
          headerElement.classList.remove('flex')
          headerElement.classList.add('hidden')

          navElement.classList.remove('-translate-y-[100%]')
        } else {
          headerElement.classList.remove('hidden')
          headerElement.classList.add('flex')

          navElement.classList.add('-translate-y-[100%]')
        }
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  //* render
  return (
    <>
      <Menu key="header-disclosure" as={Fragment}>
        {({ open, close }) => (
          <>
            <header
              ref={headerRef}
              className={clsx(
                'fixed left-0 right-0 top-0 z-10 flex w-full flex-col items-center justify-between px-5 py-3 pr-3 md:px-6 lg:left-1/2 lg:right-auto lg:w-[90vw] lg:-translate-x-1/2 lg:px-8 xl:w-[80vw]',
                open
                  ? 'bg-charcoal-black-700/90'
                  : 'bg-gradient-to-b from-charcoal-black-700/90 to-charcoal-black-700/50'
              )}
            >
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-6 lg:gap-8 xl:gap-16">
                  <Link to="#home" className="flex shrink-0">
                    <StaticImage
                      src="../images/yan_icon.png"
                      alt="Yan Logo"
                      className="h-[2.125rem] w-[2.125rem] shrink-0"
                    />
                  </Link>
                  <SocialLinks className="h-12 gap-1" iconSize="sm" />
                </div>
                <HeaderMenu pageProps={pageProps} />
              </div>
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
                    <Menu.Items
                      as="div"
                      static
                      className="mt-4 flex w-full flex-col items-start gap-1 py-2"
                    >
                      {navLinks.map((link) => (
                        <Menu.Item
                          as={Link}
                          key={link.name}
                          to={link.to}
                          onClick={() => close()}
                          className="flex w-full justify-center rounded px-3.5 py-3 pr-8 text-center text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
                        >
                          {t(link.name)}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>
          </>
        )}
      </Menu>
      <Menu key="nav-disclosure" as={Fragment}>
        {({ open, close }) => (
          <>
            <nav
              ref={navRef}
              className="fixed left-0 right-0 top-0 z-10 flex w-full -translate-y-[100%] flex-col items-center justify-between rounded-b-xl border border-t-0 border-zinc-800 bg-zinc-900/90 px-5 py-3 pr-3 shadow-primary transition-all duration-300 md:px-6 lg:left-1/2 lg:w-[90vw] lg:-translate-x-1/2 lg:px-8 xl:w-[80vw]"
            >
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-6 lg:gap-8 xl:gap-16">
                  <Link to="#home" className="flex shrink-0">
                    <StaticImage
                      src="../images/yan_icon.png"
                      alt="Yan Logo"
                      className="h-[2.125rem] w-[2.125rem] shrink-0"
                    />
                  </Link>
                  <SocialLinks className="h-12 gap-1" iconSize="sm" />
                </div>
                <HeaderMenu floating pageProps={pageProps} />
              </div>
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
                    <Menu.Items
                      as="div"
                      static
                      className="mt-4 flex w-full flex-col items-start gap-1 py-2"
                    >
                      {navLinks.map((link) => (
                        <Menu.Item
                          as={Link}
                          key={link.name}
                          to={link.to}
                          onClick={() => close()}
                          className="flex w-full justify-center rounded px-3.5 py-3 pr-8 text-center text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
                        >
                          {t(link.name)}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </>
        )}
      </Menu>
    </>
  )
}

export default Header
