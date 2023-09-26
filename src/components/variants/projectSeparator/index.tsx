import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '~/utils'

export const separator = tv({
  base: 'mb-1 w-full',
  variants: {
    color: {
      default: 'bg-white',
      spacie: 'bg-spacie-rose',
      'cs-analytics': 'bg-cs-blue',
      'expert-stats': 'bg-expert-dark',
      chirp: 'bg-black',
      'massagueirinha-menu': 'bg-massgueirinha-orange',
      'bull-blockchain': 'bg-bull-blockchain-blue',
      'car-rent': 'bg-car-rent-violet',
      localize: 'bg-localize-blue',
    },
    size: {
      default: 'h-1',
      md: 'h-1.5',
      sm: 'h-0.5',
      xs: 'h-[.0625rem]',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'default',
  },
})

type Props = {
  className?: string
} & VariantProps<typeof separator>

const ProjectSeparator: React.FC<Props> = ({ className, color, size }) => (
  <div className={cn(separator({ color, size }), className)} />
)

export default ProjectSeparator
