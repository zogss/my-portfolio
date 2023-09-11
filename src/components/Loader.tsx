import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Loader: React.FC = () => (
  <div
    id="loader-wrapper"
    aria-label="Loading"
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal-black-700 text-black transition-all duration-500 ease-in"
  >
    <motion.div layout className="flex w-fit items-end">
      <motion.div layout className="z-[1] bg-gradient-to-r from-charcoal-black-700 to-transparent">
        <StaticImage
          src="../images/yan_icon.png"
          alt="Yan's icon"
          placeholder="blurred"
          className="h-24 w-24 shrink-0 md:h-32 md:w-32 lg:h-36 lg:w-36"
        />
      </motion.div>
      <motion.div
        layout
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
        className="overflow-hidden"
      >
        <span className="truncate text-end text-3xl text-neutral-100 md:text-5xl lg:text-7xl">
          an Lucas
        </span>
      </motion.div>
    </motion.div>
  </div>
)

export default Loader
