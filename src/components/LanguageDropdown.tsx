import React, {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {Link, useI18next} from 'gatsby-plugin-react-i18next';
import {BiChevronDown} from 'react-icons/bi';

import {cn} from '@/utils';

import BrFlag from './svgs/flags/BrFlag';
import UsFlag from './svgs/flags/UsFlag';

const LanguageDropdown: React.FC = () => {
  const {t, language, languages, originalPath} = useI18next();

  const getFlagByLanguage = (language: string) => {
    return flags.find(flag => flag.slug === language) || flags[0];
  };

  const CurrentFlag = getFlagByLanguage(language).Icon;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        title={t('language')}
        aria-label={t('language')}
        className={({open}) =>
          cn(
            'inline-flex w-full items-center justify-center gap-0.5 rounded px-2 py-1.5 pr-0.5 text-neutral-100/50 transition-colors hover:bg-white/10 md:gap-1 md:px-3 md:py-2 md:pr-1',
            {'bg-white/20': open},
          )
        }>
        {({open}) => (
          <>
            <CurrentFlag className="size-8 shrink-0 rounded" />
            <BiChevronDown
              className={cn(
                'size-5 shrink-0 transition-transform ease-in',
                open ? 'rotate-180' : 'rotate-0',
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
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          as="ul"
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-neutral-100/30 rounded-md bg-charcoal-black-700 shadow-white-md">
          {languages.map(lng => {
            const Flag = getFlagByLanguage(lng).Icon;
            return (
              <Menu.Item key={lng} as="li" className="group/translationLink">
                <Link
                  to={originalPath || '/'}
                  language={lng}
                  title={t(lng)}
                  className={cn(
                    'flex w-full items-center justify-end gap-2 px-3.5 py-3 text-sm transition-colors hover:bg-royal-purple-700 hover:text-white group-first/translationLink:rounded-t-md group-last/translationLink:rounded-b-md',
                    language === lng
                      ? 'bg-royal-purple-700 text-white'
                      : 'text-neutral-100/50',
                  )}>
                  {t(lng)}
                  <Flag className="size-6 shrink-0 rounded-sm" />
                </Link>
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageDropdown;

const flags = [
  {
    name: 'brazil',
    slug: 'br',
    Icon: BrFlag,
  },
  {
    name: 'united_states',
    slug: 'en',
    Icon: UsFlag,
  },
];
