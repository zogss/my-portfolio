import clsx from 'clsx'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '~/utils'

export const tripleDots = tv({
  slots: {
    wrapper: 'flex items-start justify-center',
    dot: 'rounded-full',
  },
  variants: {
    color: {
      default: {
        dot: 'bg-white',
      },
      spacie: { dot: 'bg-spacie-rose' },
      'cs-analytics': { dot: 'bg-cs-blue' },
      'expert-stats': { dot: 'bg-expert-dark' },
      chirp: { dot: 'bg-black' },
      'massagueirinha-menu': { dot: 'bg-massgueirinha-orange' },
      'bull-blockchain': { dot: 'bg-bull-blockchain-blue' },
      'car-rent': { dot: 'bg-car-rent-violet' },
      localize: { dot: 'bg-localize-blue' },
    },
    size: {
      default: { wrapper: 'gap-1.5', dot: 'h-2 w-2 md:h-3 md:w-3' },
      md: { wrapper: 'gap-2', dot: 'h-2.5 w-2.5 md:h-3.5 md:w-3.5' },
      sm: { wrapper: 'gap-1.5', dot: 'h-1.5 w-1.5 md:h-2 md:w-2' },
      xs: { wrapper: 'gap-1', dot: 'h-1.5 w-1.5' },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'default',
  },
})

type Props = {
  animate?: boolean
  className?: string
  nestedClassName?: string
} & VariantProps<typeof tripleDots>

const ProjectTripleDots: React.FC<Props> = ({
  animate = true,
  className,
  color,
  size,
  nestedClassName,
}) => {
  const { wrapper, dot } = tripleDots({ color, size })

  return (
    <div className={cn(wrapper(), className)}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`circle-${i}`}
          className={cn(
            dot(
              animate
                ? {
                    class: clsx({
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out]': i === 0,
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out_0.1s]': i === 1,
                      'group-hover/projectCard:animate-[wiggleUp_0.5s_ease-in-out_0.2s]': i === 2,
                    }),
                  }
                : undefined
            ),
            nestedClassName
          )}
        />
      ))}
    </div>
  )
}

export default ProjectTripleDots
