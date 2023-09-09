import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { useMemo } from 'react'
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
  color,
  techs,
  children,
}) => {
  //* hooks
  const { t } = useI18next()

  //* memos
  const projectBackground = useMemo(() => {
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
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="flex w-full flex-col items-center gap-3"
    >
      <motion.div
        variants={index % 2 !== 0 ? enterLeftAnimation : enterRightAnimation}
        className="relative flex flex-col items-start gap-3 self-stretch overflow-hidden rounded-lg bg-midnight-slate-700 p-4 md:p-6"
      >
        <div
          className={clsx(
            'z-[1] flex flex-col items-start gap-6 self-stretch',
            index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
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
              className={clsx('flex items-center gap-6', {
                'md:flex-row-reverse': index % 2 !== 0,
              })}
            >
              <div className="flex items-start justify-center gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`${title}-circle-${i}`}
                    className={`h-2 w-2 rounded-full ${projectBackground}`}
                  />
                ))}
              </div>
              <h3 className="text-2xl font-semibold">{t(title)}</h3>
            </div>
            <p
              className={clsx(
                'text-center text-base font-medium text-white/30',
                index % 2 !== 0 ? 'md:text-end' : 'md:text-start'
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
      </motion.div>
      <motion.div
        variants={index % 2 !== 0 ? enterLeftAnimation : enterRightAnimation}
        className="flex w-full flex-wrap items-center justify-center gap-1.5"
      >
        {techs.map((tech, i) => (
          <Tag key={i} text={tech} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
