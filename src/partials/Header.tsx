import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useRef } from 'react'
import HeaderLinks from '~/components/HeaderLinks'
import LanguageDropdown from '~/components/LanguageDropdown'
import SocialLinks from '~/components/SocialLinks'
import { IndexPageProps } from '~/pages'

interface HeaderProps {
  pageProps: IndexPageProps
}

const Header: React.FC<HeaderProps> = ({ pageProps }) => {
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
      <header
        ref={headerRef}
        className="fixed left-1/2 top-0 z-10 flex  w-[80vw]  -translate-x-1/2 items-center justify-between px-8 py-3 pr-3"
      >
        <div className="flex items-center gap-16">
          <Link to="#home" className="flex shrink-0">
            <StaticImage
              src="../images/yan_icon.png"
              alt="Yan Logo"
              className="h-[2.125rem] w-[2.125rem] shrink-0"
            />
          </Link>
          <SocialLinks className="h-12 gap-1" iconSize="sm" />
        </div>
        <div className="flex items-center gap-12">
          <HeaderLinks />
          <LanguageDropdown pageProps={pageProps} />
        </div>
      </header>
      <nav
        ref={navRef}
        className="fixed left-1/2 top-0 z-10 flex w-[80vw] -translate-x-1/2 -translate-y-[100%] items-center justify-between rounded-b-xl border border-t-0 border-zinc-800 bg-zinc-900/90 px-8 py-3 pr-3 shadow-primary transition-all duration-300"
      >
        <div className="flex items-center gap-16">
          <Link to="#home" className="flex shrink-0">
            <StaticImage
              src="../images/yan_icon.png"
              alt="Yan Logo"
              className="h-[2.125rem] w-[2.125rem] shrink-0"
            />
          </Link>
          <SocialLinks className="h-12 gap-1" iconSize="sm" />
        </div>
        <div className="flex items-center gap-12">
          <HeaderLinks floating />
          <LanguageDropdown pageProps={pageProps} />
        </div>
      </nav>
    </>
  )
}

export default Header
