import { motion } from 'framer-motion'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'

interface AnimatedErrorProps {
  error?: string
}

const AnimatedError: React.FC<AnimatedErrorProps> = ({ error = '' }) => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <motion.div
      id="form-error"
      initial={false}
      animate={
        error
          ? {
              height: '20px',
              opacity: 1,
              display: 'block',
              transition: {
                height: {
                  duration: 0.2,
                },
                opacity: {
                  duration: 0.1,
                  delay: 0.1,
                },
              },
            }
          : {
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.2,
                },
                opacity: {
                  duration: 0.1,
                },
              },
              transitionEnd: {
                display: 'none',
              },
            }
      }
      className="overflow-hidden"
    >
      <span className="form-error">{t(error)}</span>
    </motion.div>
  )
}

export default AnimatedError
