import React from 'react';
import {Menu} from '@headlessui/react';
import {useI18next} from 'gatsby-plugin-react-i18next';

import {cn} from '@/utils';

import HeaderLinks from './HeaderLinks';
import LanguageDropdown from './LanguageDropdown';

interface HeaderMenuProps {
  hideSectionLinks?: boolean;
  floating?: boolean;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  floating,
  hideSectionLinks,
}) => {
  const {t} = useI18next();

  return (
    <div className="flex items-center gap-2 md:gap-5 xl:gap-12">
      {!hideSectionLinks && (
        <div className="hidden lg:block">
          <HeaderLinks floating={floating} />
        </div>
      )}
      <LanguageDropdown />
      {!hideSectionLinks && (
        <Menu.Button
          title={t('menu')}
          aria-label={t('menu')}
          className={({open}) =>
            cn(
              'inline-flex items-center justify-center gap-0.5 rounded px-2 py-1.5 text-neutral-100/50 transition-colors hover:bg-white/10 md:gap-1 md:px-3 md:py-2 lg:hidden',
              {'bg-white/20': open},
            )
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-[1.375rem] md:size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Menu.Button>
      )}
    </div>
  );
};

export default HeaderMenu;
