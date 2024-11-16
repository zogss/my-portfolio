import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { kebabCase } from 'lodash'
import React from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'
import Tag from '~/components/Tag'
import ProjectSeparator from '~/components/variants/projectSeparator'
import ProjectTitleText from '~/components/variants/projectTitleText'
import ProjectTripleDots from '~/components/variants/projectTripleDots'
import { ProjectType } from '~/utils'

const ProjectBlock: React.FC<ProjectType> = ({
  title,
  short_description,
  long_description,
  image,
  alt,
  slug,
  techs,
  url,
  repository_url,
}) => {
  const { t } = useI18next()

  return (
    <section className="flex w-full flex-col gap-9">
      <div className="flex w-full flex-col items-start gap-3 md:gap-4">
        <GatsbyImage
          image={getImage(image)!}
          alt={alt}
          className="h-full w-full rounded-md object-contain object-center"
        />
        <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="group/projectCard flex w-full justify-between gap-4 sm:w-fit">
            <ProjectTitleText
              as={url ? 'a' : 'span'}
              {...(url
                ? { href: url, target: '_blank', rel: 'noopener noreferrer', title: url }
                : {})}
              color={slug}
              className="w-fit"
            >
              {t(title)}
            </ProjectTitleText>
            <ProjectTripleDots color={slug} size="md" className="hidden items-center xs:flex" />
          </div>
          {(url || repository_url) && (
            <div className="flex items-center justify-start gap-1 md:gap-2">
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={url}
                  className="flex w-full items-center justify-center rounded-md p-1 text-sm font-semibold transition-colors duration-500 hover:bg-white/10 hover:text-white focus:outline-none md:gap-2 md:p-2 lg:gap-2.5 lg:p-2.5"
                >
                  <span className="sr-only">{t('visit')}</span>
                  <BiLinkExternal className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
                </a>
              )}
              {repository_url && (
                <a
                  href={repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={repository_url}
                  className="flex w-full items-center justify-center rounded-md p-1 text-sm font-semibold transition-colors duration-500 hover:bg-white/10 hover:text-white focus:outline-none md:gap-2 md:p-2 lg:gap-2.5 lg:p-2.5"
                >
                  <span className="sr-only">{t('code')}</span>
                  <BsGithub className="w-h-5 md:6 shmd:rink-0 h-6 w-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full text-sm md:text-base">
        <span>{t(short_description)}</span>
        {long_description.map((paragraph, i) => (
          <p key={`${title}-paragraph-${i}`} className="mt-3">
            {t(paragraph)}
          </p>
        ))}
      </div>
      <div className="mt-5 flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-end justify-start gap-2">
          <span className="text-sm font-semibold text-neutral-400">{t('techs')}</span>
          <ProjectSeparator color={slug} size="xs" />
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
          {techs.map((tech, i) => (
            <Tag key={`${kebabCase(title)}-${tech}-${i}`} text={tech} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectBlock
