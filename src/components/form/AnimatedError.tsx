import React from 'react';
import { useTranslation } from '@/i18n/client';
import { motion } from 'motion/react';

interface AnimatedErrorProps {
  error?: string;
}

const AnimatedError: React.FC<AnimatedErrorProps> = ({ error = '' }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      id="form-error"
      initial={false}
      animate={
        error
          ? {
              height: '1.25rem',
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
  );
};

export default AnimatedError;
