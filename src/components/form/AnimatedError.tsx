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
    <motion.span
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
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            }
          : {
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                },
              },
              transitionEnd: {
                display: 'none',
              },
            }
      }
      className="form-error"
    >
      {t(error)}
    </motion.span>
  )
}

export default AnimatedError
