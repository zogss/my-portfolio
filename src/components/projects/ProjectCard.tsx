import clsx from 'clsx'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { kebabCase } from 'lodash'
import React, { useMemo, useState } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'
import { useWindowSize } from '~/hooks/useWindowSize'
import { ProjectObjType } from '~/utils'
import Tag from '../Tag'
import LinesUnion from '../svgs/LinesUnion'
import ProjectCardModal from './ProjectCardModal'

export interface ProjectCardProps extends Omit<ProjectObjType, 'alt'> {
  children: React.ReactNode
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const { index, title, description, url, repository_url, techs, children } = props
  //* hooks
  const { t } = useI18next()
  const { isSmaller } = useWindowSize({
    breakpoint: 'lg',
  })

  //* states
  const [isOpen, setIsOpen] = useState(false)

  //* handlers
  const closeModal = () => setIsOpen(false)

  //* memos
  const projectBackground = useMemo(() => {
    switch (title) {
      case 'Spacie':
        return 'hover:bg-spacie-rose bg-spacie-rose'
      case 'CS Analytics':
        return 'hover:bg-cs-blue bg-cs-blue'
      case 'Expert Stats':
        return 'hover:bg-expert-dark bg-expert-dark'
      case 'Chirp':
        return 'hover:bg-black bg-black'
      case 'Massagueirinha Menu':
        return 'hover:bg-massgueirinha-orange bg-massgueirinha-orange'
      case 'Bull Blockchain':
        return 'hover:bg-bull-blockchain-blue bg-bull-blockchain-blue'
      default:
        return ''
    }
  }, [title])

  //* render
  return (
    <div data-animation="animate" className="flex flex-col lg:w-full">
      <div
        role={isSmaller ? 'button' : undefined}
        tabIndex={isSmaller ? 0 : undefined}
        onClick={isSmaller ? () => setIsOpen(true) : undefined}
        onKeyDown={isSmaller ? (e) => e.key === 'Enter' && setIsOpen(true) : undefined}
        data-animation-target={index % 2 !== 0 ? 'left' : 'right'}
        className="flex flex-col items-center gap-3 lg:w-full"
      >
        <div className="group/projectCard relative flex flex-col items-start gap-3 self-stretch overflow-hidden rounded-lg bg-midnight-slate-700 p-4 md:p-6">
          <div
            className={clsx(
              'z-[1] flex flex-col items-center gap-4 self-stretch md:gap-6 xl:items-start',
              index % 2 !== 0 ? 'xl:flex-row-reverse' : 'xl:flex-row'
            )}
          >
            <div className="group/projectImg relative max-h-[12.5rem] overflow-hidden rounded sm:h-[12.5rem] 2xl:h-[13.75rem]">
              {children}
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={url}
                  className={clsx(
                    'absolute top-2 z-10 flex items-center justify-center gap-2.5 rounded p-2 text-sm font-semibold opacity-0 transition-all duration-500 focus:outline-none group-hover/projectImg:opacity-100',
                    projectBackground,
                    !isSmaller ? (index % 2 !== 0 ? 'right-2' : 'left-2') : 'right-2'
                  )}
                >
                  <BiLinkExternal className="h-3.5 w-3.5 shrink-0 2xl:h-5 2xl:w-5" />
                </a>
              )}
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
              {!isSmaller && (
                <p className="text-justify indent-5 text-base font-medium text-white/30">
                  {t(description)}
                </p>
              )}
            </div>
          </div>
          {!isSmaller && (
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
        {!isSmaller && (
          <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
            {techs.map((tech, i) => (
              <Tag key={`${kebabCase(title)}-${tech}-${i}`} text={tech} />
            ))}
          </div>
        )}
      </div>
      <ProjectCardModal
        isOpen={isOpen}
        close={closeModal}
        Image={children}
        projectBackground={projectBackground}
        {...props}
      />
    </div>
  )
}

export default ProjectCard
