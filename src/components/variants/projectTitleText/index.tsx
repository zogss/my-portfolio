import React, { Fragment, type ComponentPropsWithoutRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '~/utils'

export const titleText = tv({
  base: 'flex w-full items-center hover:underline justify-center text-white rounded-md text-3xl font-bold leading-none transition-colors duration-500 hover:text-white focus:outline-none',
  variants: {
    color: {
      default: 'decoration-white',
      spacie: 'decoration-spacie-rose',
      'cs-analytics': 'decoration-cs-blue',
      'expert-stats': 'decoration-expert-dark',
      chirp: 'decoration-black',
      'massagueirinha-menu': 'decoration-massgueirinha-orange',
      'bull-blockchain': 'decoration-bull-blockchain-blue',
      'car-rent': 'decoration-car-rent-violet',
      localize: 'decoration-localize-blue',
    },
    size: {
      default: 'text-xl md:text-2xl lg:text-3xl',
      md: 'text-base md:text-xl lg:text-2xl',
      sm: 'text-sm md:text-base lg:text-lg',
      xs: 'text-xs md:text-sm lg:text-base',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'default',
  },
})

type Props<C extends React.ElementType> = {
  children?: React.ReactNode
  asChild?: boolean
  as?: C
} & VariantProps<typeof titleText> &
  ComponentPropsWithoutRef<C>

const ProjectTitleText = <C extends React.ElementType>({
  as,
  className,
  asChild,
  color,
  size,
  ...props
}: Props<C>) => {
  const Comp = as || (asChild ? 'span' : Fragment)

  return <Comp {...props} className={cn(titleText({ color, size }), className)} />
}

export default ProjectTitleText
