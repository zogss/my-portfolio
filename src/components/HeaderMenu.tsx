import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import { IndexPageProps } from '~/pages'
import HeaderLinks from './HeaderLinks'
import LanguageDropdown from './LanguageDropdown'

interface HeaderMenuProps {
  pageProps: IndexPageProps
  floating?: boolean
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ pageProps, floating }) => {
  return (
    <>
      <div className="hidden items-center gap-10 lg:flex xl:gap-12">
        <HeaderLinks floating={floating} />
        <LanguageDropdown pageProps={pageProps} />
      </div>

      <Disclosure.Button
        className={({ open }) =>
          clsx(
            'inline-flex items-center justify-center gap-1 rounded px-3 py-2 text-neutral-100/50 transition-colors hover:bg-white/10 lg:hidden',
            { 'bg-white/20': open }
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </Disclosure.Button>
    </>
  )
}

export default HeaderMenu
