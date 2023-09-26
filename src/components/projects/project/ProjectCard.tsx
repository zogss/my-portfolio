import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'
import ProjectTripleDots from '~/components/variants/projectTripleDots'
import { ProjectType } from '~/utils'

const ProjectCard: React.FC<ProjectType> = ({ image, alt, slug, title }) => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <article data-animation="animate" className="flex flex-col">
      <Link
        to={`/projects/${slug}`}
        data-animation-target="up"
        className="flex flex-col items-center gap-3"
      >
        <div className="group/projectCard relative overflow-hidden rounded-md bg-midnight-slate-700 p-2.5 transition-all duration-500 hover:bg-neutral-300/20 md:p-3.5">
          <div className="z-[1] flex flex-col items-center gap-2 self-stretch md:gap-3">
            <div className="group/projectImg relative max-h-[11.875rem] shrink-0 overflow-hidden rounded border border-transparent transition-colors duration-500 group-hover/projectCard:border-neutral-400/20 sm:h-[11.875rem] sm:max-h-max 2xl:h-[12.8125rem]">
              <GatsbyImage
                image={getImage(image)!}
                alt={alt}
                className="aspect-[18/9] max-h-[11.875rem] w-full transition-all duration-[5000ms] ease-[cubic-bezier(0.7,0,0.7,1.01)] hover:scale-150 sm:w-auto 2xl:max-h-[12.8125rem]"
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/70 px-5 py-1.5 opacity-0 shadow-primary transition-all duration-500 hover:bg-black group-hover/projectImg:opacity-100">
                <span className="text-sm font-medium text-neutral-300 lg:text-base">
                  {t('view_project')}
                </span>
              </div>
            </div>
            <header className="flex w-full items-center justify-center gap-3 lg:gap-5 xl:w-fit">
              <ProjectTripleDots color={slug} size="sm" />
              <h3 className="text-lg font-semibold text-neutral-300 lg:pr-4 lg:text-xl xl:pr-0">
                {t(title)}
              </h3>
            </header>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProjectCard
