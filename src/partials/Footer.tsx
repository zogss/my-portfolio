import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'
import SocialLinks from '~/components/SocialLinks'
import FigmaIcon from '~/components/svgs/FigmaIcon'
import { environments } from '~/utils'

const Footer: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <footer className="flex flex-col items-center justify-center gap-6 self-stretch bg-gradient-to-b from-charcoal-black-700 to-black/80 px-[15%] pb-6 pt-12">
      <div className="flex w-full items-start justify-between self-stretch">
        <div className="flex items-start gap-8">
          <StaticImage
            src="../images/yan_icon.png"
            alt="Yan's icon"
            className="h-36 w-36 shrink-0"
          />
          <div className="flex flex-col items-start gap-1 py-1">
            <Link
              to="#home"
              className="flex w-full rounded px-3.5 py-3 pr-8 text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
            >
              {t('home')}
            </Link>
            <Link
              to="#about"
              className="flex w-full rounded px-3.5 py-3 pr-8 text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
            >
              {t('about')}
            </Link>
            <Link
              to="#projects"
              className="flex w-full rounded px-3.5 py-3 pr-8 text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
            >
              {t('projects')}
            </Link>
            <Link
              to="#tech-stack"
              className="flex w-full rounded px-3.5 py-3 pr-8 text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
            >
              {t('tech_stack')}
            </Link>
            <Link
              to="#contact"
              className="flex w-full rounded px-3.5 py-3 pr-8 text-sm text-neutral-100/50 transition-colors duration-200 hover:bg-white/20 hover:text-neutral-100"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-end justify-end gap-7 self-stretch">
          <SocialLinks className="w-full justify-end gap-4" />
          <div className="w-full rounded-lg bg-gradient-to-b from-violet-500 to-violet-700 p-[.0625rem]">
            <a
              href={`mailto:${environments.personal.email}`}
              className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-tertiary px-[1.375rem] py-2.5"
            >
              {environments.personal.email}
            </a>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full self-stretch bg-white/20" />
      <div className="flex w-full items-center justify-between self-stretch">
        <span className="text-xs font-medium text-white/40">
          @ {new Date().getFullYear()} Yan Lucas.
        </span>
        <a
          href={environments.inspiration.figmaUrl}
          target="_blank"
          rel="noreferrer"
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
