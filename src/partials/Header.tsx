import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs'
import LanguageDropdown from '~/components/LanguageDropdown'
import { IndexPageProps } from '~/pages'

interface HeaderProps {
  pageProps: IndexPageProps
}

const Header: React.FC<HeaderProps> = ({ pageProps }) => (
  <header className="flex w-full items-center justify-between px-8 py-3 pr-3">
    <div className="flex items-center gap-16">
      <div className="flex shrink-0">
        <StaticImage
          src="../images/yan_icon.png"
          alt="Yan Logo"
          className="h-[2.125rem] w-[2.125rem] shrink-0"
        />
      </div>
      <div className="flex h-12 items-center gap-3 text-slate-gray-500">
        <BsInstagram className="h-6 w-6 shrink-0" />
        <BsLinkedin className="h-6 w-6 shrink-0" />
        <BsGithub className="h-6 w-6 shrink-0" />
      </div>
    </div>
    <div className="flex items-center gap-12">
      <div className="flex items-center gap-1.5">
        <Link to="#home" className="flex rounded px-3.5 py-3 text-neutral-100/50">
          Home
        </Link>
        <Link to="#about" className="flex rounded px-3.5 py-3 text-neutral-100/50">
          About
        </Link>
        <Link to="#projects" className="flex rounded px-3.5 py-3 text-neutral-100/50">
          Projects
        </Link>
        <Link to="#tech-stack" className="flex rounded px-3.5 py-3 text-neutral-100/50">
          Tech Stack
        </Link>
        <Link to="#contact" className="flex rounded px-3.5 py-3 text-neutral-100/50">
          Contact
        </Link>
      </div>
      <LanguageDropdown pageProps={pageProps} />
    </div>
  </header>
)

export default Header
