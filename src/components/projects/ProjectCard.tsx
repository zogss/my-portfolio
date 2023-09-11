import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { useMemo } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'
import { ProjectObjType, enterLeftAnimation, enterRightAnimation } from '~/utils'
import Tag from '../Tag'
import LinesUnion from '../svgs/LinesUnion'

export interface ProjectCardProps extends Omit<ProjectObjType, 'img' | 'alt'> {
  children?: React.ReactNode
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  index,
  title,
  description,
  url,
  repository_url,
  techs,
  children,
}) => {
  //* hooks
  const { t } = useI18next()

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
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.4 }}
      className="flex w-full flex-col items-center gap-3"
    >
      <motion.div
        variants={index % 2 !== 0 ? enterLeftAnimation : enterRightAnimation}
        className="group/projectCard relative flex flex-col items-start gap-3 self-stretch overflow-hidden rounded-lg bg-midnight-slate-700 p-4 md:p-6"
      >
        <div
          className={clsx(
            'z-[1] flex flex-col items-center gap-6 self-stretch xl:items-start',
            index % 2 !== 0 ? 'xl:flex-row-reverse' : 'xl:flex-row'
          )}
        >
          {children}
          <div
            className={clsx(
              'flex flex-1 flex-col items-center gap-2.5',
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
                    className={clsx(`h-2 w-2 rounded-full ${projectBackground}`, {
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out]': i === 0,
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out_0.1s]': i === 1,
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out_0.2s]': i === 2,
                    })}
                  />
                ))}
              </div>
              <h3 className="text-xl font-semibold lg:pr-5 lg:text-2xl xl:pr-0">{t(title)}</h3>
            </div>
            <p
              className={clsx(
                'text-center text-base font-medium text-white/30',
                index % 2 !== 0 ? 'xl:text-end' : 'xl:text-start'
              )}
            >
              {t(description)}
            </p>
          </div>
        </div>
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
                className={`flex w-full items-center justify-center gap-2.5 rounded-md bg-transparent px-4 py-2.5 text-sm font-semibold transition-colors duration-500 ${projectBackground} focus:outline-none md:w-fit`}
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
                className={`${projectBackground} flex w-full items-center justify-center gap-2.5 rounded-md bg-transparent px-4 py-2.5 text-sm font-semibold transition-colors duration-500 focus:outline-none md:w-fit`}
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
      </motion.div>
      <motion.div
        variants={index % 2 !== 0 ? enterLeftAnimation : enterRightAnimation}
        className="w-full overflow-hidden"
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
          {techs.map((tech, i) => (
            <Tag key={i} text={tech} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
