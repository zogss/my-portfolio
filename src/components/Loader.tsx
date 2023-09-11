import { motion } from 'framer-motion'
import React from 'react'
import YIcon from './svgs/YIcon'

const Loader: React.FC = () => (
  <div
    id="loader-wrapper"
    aria-label="Loading"
    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal-black-700 text-black transition-all duration-500 ease-in"
  >
    <div className="flex w-fit items-end -space-x-6 md:-space-x-7 lg:-space-x-8">
      <div className="z-[1] bg-gradient-to-r from-charcoal-black-700 to-transparent pb-1.5 lg:pb-2">
        <YIcon className="h-24 w-24 shrink-0 md:h-32 md:w-32 lg:h-36 lg:w-36" />
      </div>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
        className="overflow-hidden"
      >
        <span className="truncate text-end text-3xl text-neutral-100 md:text-5xl lg:text-7xl">
          an Lucas
        </span>
      </motion.div>
    </div>
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center pb-3">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="inline-block h-5 w-5"
      >
        <div className="ldio-r4drh11gvk7">
          <div className="absolute inset-0 rounded-full bg-gray-400"></div>
          <div className="absolute inset-0 rounded-full bg-gray-600"></div>
          <div className="absolute inset-0 rounded-full bg-gray-400"></div>
        </div>
      </motion.div>
    </div>
  </div>
)

export default Loader
