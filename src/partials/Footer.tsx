import { Link } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { navLinks } from '~/components/HeaderLinks'
import SocialLinks from '~/components/SocialLinks'
import FigmaIcon from '~/components/svgs/FigmaIcon'
import YIcon from '~/components/svgs/YIcon'
import { environments } from '~/utils'

const Footer: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <footer className="flex flex-col items-center justify-center gap-6 self-stretch bg-gradient-to-b from-charcoal-black-700 to-black/80 px-[10%] pb-6 pt-12 md:px-[15%]">
      <div className="flex w-full flex-col items-center justify-between gap-8 self-stretch sm:flex-row md:items-start md:gap-3">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <YIcon
            aria-label={t('yan_logo_alt')}
            className="h-24 w-24 shrink-0 md:h-32 md:w-32 lg:h-36 lg:w-36"
          />
          <div className="hidden flex-col items-start gap-1 py-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to || '/'}
                title={t(link.name)}
                className="flex w-full rounded px-3.5 py-3 pr-8 text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
              >
                {t(link.name)}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-2 self-stretch md:items-end md:gap-7">
          <SocialLinks className="w-full justify-center gap-4 md:justify-end" />
          <div className="w-fit rounded-lg bg-gradient-to-b from-violet-500 to-violet-700 p-[.0625rem] md:w-full">
            <a
              href={`mailto:${environments.personal.email}`}
              title={environments.personal.email}
              className="flex w-fit items-center justify-center gap-2.5 rounded-lg bg-gradient-tertiary px-[1.375rem] py-2.5 text-sm md:w-full md:text-base"
            >
              {environments.personal.email}
            </a>
          </div>
        </div>
      </div>
      <div className="h-[.0625rem] w-full self-stretch bg-white/20" />
      <div className="flex w-full flex-col-reverse items-center justify-center gap-3 self-stretch sm:flex-row sm:justify-between">
        <span className="text-xs font-medium text-neutral-100/70 sm:text-white/40">
          @ {new Date().getFullYear()} Yan Lucas.
        </span>
        <a
          href={environments.inspiration.figmaUrl}
          target="_blank"
          rel="noreferrer"
          title={environments.inspiration.figmaUrl}
          className="flex items-center justify-center gap-3 rounded px-3 py-2 text-xs font-medium text-white/40 transition-colors duration-500 hover:bg-zinc-700 hover:text-neutral-300"
        >
          {t('inspired_text', { name: '@KC Studio' })}
          <FigmaIcon aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
