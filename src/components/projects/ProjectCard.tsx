import clsx from 'clsx'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { useCallback } from 'react'
import { ProjectObjType } from '~/utils'
import Tag from '../Tag'
import LinesUnion from '../svgs/LinesUnion'

export interface ProjectCardProps extends ProjectObjType {
  children?: React.ReactNode
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  index,
  title,
  description,
  color,
  techs,
  children,
}) => {
  //* hooks
  const { t } = useI18next()

  //* memos
  const getProjectBg = useCallback(() => {
    switch (color) {
      case 'rose':
        return 'bg-spacie-rose'
      case 'blue':
        return 'bg-cs-blue'
      case 'dark':
        return 'bg-expert-dark'
      case 'black':
        return 'bg-black'
      default:
        return ''
    }
  }, [color])

  //* render
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="relative flex flex-col items-start gap-3 self-stretch overflow-hidden rounded-lg bg-midnight-slate-700 p-6">
        <div
          className={clsx('z-[1] flex items-start gap-6 self-stretch', {
            'flex-row-reverse': index % 2 !== 0,
          })}
        >
          {children}
          <div
            className={clsx(
              'flex flex-1 flex-col gap-2.5',
              index % 2 !== 0 ? 'flex-row-reverse items-end' : 'items-start'
            )}
          >
            <div
              className={clsx('flex items-center gap-6', {
                'flex-row-reverse': index % 2 !== 0,
              })}
            >
              <div className="flex items-start justify-center gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`${title}-circle-${i}`}
                    className={`h-2 w-2 rounded-full ${getProjectBg()}`}
                  />
                ))}
              </div>
              <h3 className="text-2xl font-semibold">{t(title)}</h3>
            </div>
            <p
              className={clsx(
                'text-base font-medium text-white/30',
                index % 2 !== 0 ? 'text-end' : 'text-start'
              )}
            >
              {t(description)}
            </p>
          </div>
        </div>
        <LinesUnion
          className={clsx(
            'absolute',
            index % 2 !== 0 ? '-right-1/4 -top-2/3' : '-left-1/4 -top-2/3 -scale-x-[1]'
          )}
        />
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
        {techs.map((tech, i) => (
          <Tag key={i} text={tech} />
        ))}
      </div>
    </div>
  )
}

export default ProjectCard
