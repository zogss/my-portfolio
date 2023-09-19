import clsx from 'clsx'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { useMemo } from 'react'
import { ProjectType, getBgFromProject } from '~/utils'
import LinesUnion from '../svgs/LinesUnion'

const ProjectCard: React.FC<ProjectType> = ({ image, alt, slug, title }) => {
  //* hooks
  const { t } = useI18next()

  //* memos
  const projectBackground = useMemo(() => getBgFromProject(slug), [slug])

  //* render
  return (
    <div data-animation="animate" className="flex flex-col">
      <Link
        to={`/projects/${slug}`}
        data-animation-target="up"
        className="flex flex-col items-center gap-3"
      >
        <div className="group/projectCard relative flex flex-col gap-3 self-stretch overflow-hidden rounded-lg bg-midnight-slate-700 p-3 transition-all duration-500 hover:bg-neutral-300/20 md:p-4">
          <div className="z-[1] flex flex-col items-center gap-3 self-stretch md:gap-4">
            <div className="group/projectImg relative max-h-[190px] shrink-0 overflow-hidden rounded border border-transparent transition-colors duration-500 group-hover/projectCard:border-neutral-400/20 sm:h-[190px] sm:max-h-max 2xl:h-[205px]">
              <GatsbyImage
                image={getImage(image)!}
                alt={alt}
                className="aspect-[18/9] max-h-[190px] w-full transition-all duration-[5000ms] ease-[cubic-bezier(0.7,0,0.7,1.01)] hover:scale-150 sm:w-auto 2xl:max-h-[205px]"
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/70 px-5 py-1.5 opacity-0 shadow-primary transition-all duration-500 hover:bg-black group-hover/projectImg:opacity-100">
                <span className="text-sm font-medium text-neutral-300 lg:text-base">
                  {t('view_project')}
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-center gap-3 lg:gap-5 xl:w-fit">
              <div className="flex items-start justify-center gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`${title}-circle-${i}`}
                    className={clsx('h-2 w-2 rounded-full', projectBackground, {
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out]': i === 0,
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out_0.1s]': i === 1,
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out_0.2s]': i === 2,
                    })}
                  />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-neutral-300 lg:pr-4 lg:text-xl xl:pr-0">
                {t(title)}
              </h3>
            </div>
          </div>
          <LinesUnion className="absolute -right-3/4 -top-1/3 -rotate-[30deg] xl:-top-1/2" />
        </div>
      </Link>
    </div>
  )
}

export default ProjectCard

/* 
<div data-animation="animate" className="flex grow flex-col">
      <div
        role={isSmaller ? 'button' : undefined}
        tabIndex={isSmaller ? 0 : undefined}
        onClick={isSmaller ? () => navigate(`projects/${slug}`) : undefined}
        onKeyDown={isSmaller ? (e) => e.key === 'Enter' && navigate(`projects/${slug}`) : undefined}
        data-animation-target={index % 2 !== 0 ? 'left' : 'right'}
        className="flex flex-col items-center gap-3 lg:w-full"
      >
        <div
          className={clsx(
            'group/projectCard relative flex flex-col items-start gap-3 self-stretch overflow-hidden rounded-lg bg-midnight-slate-700 p-4 md:p-6',
            {
              'transition-colors hover:bg-zinc-700': isSmaller,
            }
          )}
        >
          <div
            className={clsx(
              'z-[1] flex flex-col items-center gap-4 self-stretch md:gap-6 xl:items-start'
              // index % 2 !== 0 ? 'xl:flex-row-reverse' : 'xl:flex-row'
            )}
          >
            <div className="group/projectImg max-h-[12.5rem] shrink-0 overflow-hidden rounded sm:h-[12.5rem] sm:max-h-max 2xl:h-[13.75rem]">
              <GatsbyImage
                image={getImage(image)!}
                alt={alt}
                className="aspect-[18/9] max-h-[12.5rem] w-full transition-all duration-[5000ms] ease-[cubic-bezier(0.7,0,0.7,1.01)] hover:scale-125 sm:w-auto 2xl:max-h-[13.75rem]"
              />
            </div>
            <div
              className={clsx(
                'z-10 flex flex-1 flex-col items-center gap-2.5',
                index % 2 !== 0 ? 'flex-row-reverse md:items-end' : 'md:items-start'
              )}
            >
              <div
                className={clsx('flex w-full items-center justify-center gap-4 lg:gap-6 xl:w-fit', {
                  'xl:flex-row-reverse': index % 2 !== 0,
                })}
              >
                <div className="flex items-start justify-center gap-1.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`${title}-circle-${i}`}
                      className={clsx('h-2 w-2 rounded-full', projectBackground, {
                        'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out]': i === 0,
                        'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out_0.1s]': i === 1,
                        'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out_0.2s]': i === 2,
                      })}
                    />
                  ))}
                </div>
                <h3 className="text-xl font-semibold lg:pr-5 lg:text-2xl xl:pr-0">{t(title)}</h3>
              </div>
              {isSmaller && (
                <p className="text-justify indent-5 text-base font-medium text-white/30">
                  {t(description)}
                </p>
              )}
            </div>
          </div>
          {isSmaller && (
            <>
              {(url || repository_url) && (
                <div
                  className={clsx(
                    'z-[1] flex w-full items-center justify-center gap-3',
                    index % 2 !== 0 ? 'xl:justify-end' : 'xl:justify-start'
                  )}
                >
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={url}
                      className={clsx(
                        'flex w-full items-center justify-center gap-2.5 rounded-md bg-transparent px-4 py-2.5 text-sm font-semibold transition-colors duration-500 focus:outline-none md:w-fit',
                        projectBackground
                      )}
                    >
                      <span>{t('visit')}</span>
                      <BiLinkExternal className="h-6 w-6 shrink-0" />
                    </a>
                  )}
                  {repository_url && (
                    <a
                      href={repository_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={repository_url}
                      className={clsx(
                        'flex w-full items-center justify-center gap-2.5 rounded-md bg-transparent px-4 py-2.5 text-sm font-semibold transition-colors duration-500 focus:outline-none md:w-fit',
                        projectBackground
                      )}
                    >
                      <span>{t('code')}</span>
                      <BsGithub className="h-6 w-6 shrink-0" />
                    </a>
                  )}
                </div>
              )}
              <LinesUnion
                className={clsx(
                  'absolute -top-1/3',
                  index % 2 === 0 ? '-right-1/4 xl:-top-2/3' : '-left-1/4 -scale-x-[1] xl:-top-2/3'
                )}
              />
            </>
          )}
        </div>
        {isSmaller && (
          <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
            {techs.map((tech, i) => (
              <Tag key={`${kebabCase(title)}-${tech}-${i}`} text={tech} />
            ))}
          </div>
        )}
      </div>
    </div>
*/
