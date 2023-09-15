import { Variants } from 'framer-motion'

export const enterLeftAnimation: Variants = {
  offscreen: {
    x: -500,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      ease: [0, 0.71, 0.2, 1.01],
      duration: 1,
    },
  },
}

export const enterRightAnimation: Variants = {
  offscreen: {
    x: 500,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      ease: [0, 0.71, 0.2, 1.01],
      duration: 1,
    },
  },
}

export const enterBottomAnimation: Variants = {
  offscreen: {
    y: 40,
    scale: 0.8,
    opacity: 0.2,
  },
  onscreen: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.8,
    },
  },
}
