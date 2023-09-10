import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Loader: React.FC = () => (
  <div
    id="loader-wrapper"
    aria-label="Loading"
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal-black-700 text-black transition-all duration-500 ease-in"
  >
    <div className="flex w-fit -translate-x-10 items-end">
      <motion.div
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
        className="z-[1] bg-gradient-to-r from-charcoal-black-700 to-transparent pl-10"
      >
        <StaticImage
          src="../images/yan_icon.png"
          alt="Yan's icon"
          className="h-24 w-24 shrink-0 md:h-32 md:w-32 lg:h-36 lg:w-36"
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
        className="text-end text-3xl text-neutral-100 md:text-5xl lg:text-7xl"
      >
        an Lucas
      </motion.span>
    </div>
  </div>
)

export default Loader
