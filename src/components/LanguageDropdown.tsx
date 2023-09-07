import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import { type i18n } from 'i18next'
import React, { Fragment } from 'react'
import { IndexPageProps } from '~/pages'

interface LanguageDropdownProps {
  pageProps: IndexPageProps
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  pageProps: { data, pageContext },
}) => {
  //* hooks
  const {
    t,
    languages,
    originalPath,
    i18n: { language },
  } = useI18next()

  //* handlers
  const getImageByLanguage = (language: string) => {
    return data.photos.edges.find((edge) => edge.node.base.includes(language))
  }

  //* render
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full items-center justify-center gap-1 rounded bg-charcoal-black-700 px-3 py-2 pr-1 text-neutral-100/50 transition-colors hover:bg-white/10">
        {({ open }) => (
          <>
            <GatsbyImage
              image={
                getImage(getImageByLanguage((pageContext as { i18n: i18n }).i18n.language).node)!
              }
              alt={
                getImageByLanguage((pageContext as { i18n: i18n }).i18n.language)
                  .node.base.split('-')
                  .join(' ')
                  .split('.')[0] + ' image'
              }
              className="h-4 w-8 shrink-0 rounded-sm"
            />
            <ChevronDownIcon
              className={clsx(
                'h-5 w-5 shrink-0 transition-all ease-in',
                open ? 'rotate-180' : 'rotate-0'
              )}
              aria-hidden="true"
            />
          </>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-neutral-100/30 rounded-md bg-charcoal-black-700 shadow-white-md"
        >
          {languages.map((lng) => (
            <Menu.Item key={lng} as="li" className="group/translationLink">
              <Link
                to={originalPath}
                language={lng}
                className={clsx(
                  'flex w-full items-center justify-end gap-2 px-3.5 py-3 text-sm transition-colors hover:bg-royal-purple-700 hover:text-white group-first/translationLink:rounded-t-md group-last/translationLink:rounded-b-md',
                  language === lng ? 'bg-royal-purple-700 text-white' : 'text-neutral-100/50'
                )}
              >
                {t(lng)}
                <GatsbyImage
                  image={getImage(getImageByLanguage(lng).node)!}
                  alt={
                    getImageByLanguage(lng).node.base.split('-').join(' ').split('.')[0] + ' image'
                  }
                  className="h-4 w-8 shrink-0 rounded-sm"
                />
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LanguageDropdown
