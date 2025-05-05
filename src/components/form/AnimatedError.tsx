import React from 'react';
import { motion, Variants } from 'motion/react';

import { useTranslation } from '@/i18n/client';

const animationVariants: Variants = {
  visible: {
    height: 24,
    opacity: 1,
    visibility: 'visible',
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.1,
        delay: 0.1,
      },
    },
  },
  hidden: {
    height: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.1,
      },
    },
  },
};
interface AnimatedErrorProps {
  error?: string;
}

const AnimatedError: React.FC<AnimatedErrorProps> = ({ error = '' }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      id="form-error"
      variants={animationVariants}
      initial="hidden"
      animate={error ? 'visible' : 'hidden'}
      transition={{
        height: {
          duration: 0.2,
        },
        opacity: {
          duration: 0.1,
        },
        visibility: {
          delay: 0.1,
        },
      }}
      className="relative overflow-hidden"
    >
      <div className="flex h-6 items-end">
        <span className="form-error">{t(error)}</span>
      </div>
    </motion.div>
  );
};

export default AnimatedError;
