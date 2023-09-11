import { motion } from 'framer-motion'
import React from 'react'
import YIcon from './svgs/YIcon'

const Loader: React.FC = () => (
  <div
    id="loader-wrapper"
    aria-label="Loading"
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal-black-700 text-black transition-all duration-500 ease-in"
  >
    <div className="flex w-fit items-end">
      <div className="z-[1] bg-gradient-to-r from-charcoal-black-700 to-transparent">
        <YIcon className="h-24 w-24 shrink-0 md:h-32 md:w-32 lg:h-36 lg:w-36" />
      </div>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
        className="overflow-hidden"
      >
        <span className="truncate text-end text-3xl text-neutral-100 md:text-5xl lg:text-7xl">
          an Lucas
        </span>
      </motion.div>
    </div>
  </div>
)

export default Loader
