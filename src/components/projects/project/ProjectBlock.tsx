import clsx from 'clsx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { useMemo } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'
import { ProjectType, getBgFromProject } from '~/utils'

const ProjectBlock: React.FC<ProjectType> = ({
  title,
  short_description,
  long_description,
  image,
  alt,
  slug,
  url,
  repository_url,
}) => {
  //* hooks
  const { t } = useI18next()

  //* memos
  const projectBackground = useMemo(() => getBgFromProject(slug), [slug])

  //* render
  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col items-start gap-3 md:gap-4">
        <GatsbyImage
          image={getImage(image)!}
          alt={alt}
          className="h-full w-full rounded-md object-contain object-center"
        />
        <div className="flex w-full items-center justify-between">
          {(url || repository_url) && (
            <div className="flex items-center justify-start gap-1 md:gap-2">
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={url}
                  className="flex w-full items-center justify-center rounded-md p-1 text-sm font-semibold transition-colors duration-500 hover:bg-white/5 hover:text-white focus:outline-none md:gap-2 md:px-3.5 md:py-2 lg:gap-2.5 lg:px-4 lg:py-2.5"
                >
                  <span className="sr-only md:not-sr-only">{t('visit')}</span>
                  <BiLinkExternal className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
                </a>
              )}
              {repository_url && (
                <a
                  href={repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={repository_url}
                  className="flex w-full items-center justify-center rounded-md p-1 text-sm font-semibold transition-colors duration-500 hover:bg-white/5 hover:text-white focus:outline-none md:gap-2 md:px-3.5 md:py-2 lg:gap-2.5 lg:px-4 lg:py-2.5"
                >
                  <span className="sr-only md:not-sr-only">{t('code')}</span>
                  <BsGithub className="w-h-5 md:6 shmd:rink-0 h-6 w-5" />
                </a>
              )}
            </div>
          )}
          <div className="flex items-start justify-center gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`${title}-circle-${i}`}
                className={clsx('h-2 w-2 rounded-full lg:h-3 lg:w-3', projectBackground)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full text-sm md:text-base">
        <h6>{t(short_description)}</h6>
        {long_description.map((paragraph, i) => (
          <p key={`${title}-paragraph-${i}`} className="mt-3">
            {t(paragraph)}
          </p>
        ))}
      </div>
    </section>
  )
}

export default ProjectBlock
