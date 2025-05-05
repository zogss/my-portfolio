'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/utils';
import { motion } from 'motion/react';

interface AnimationContainerProps {
  className?: string;
  children: ReactNode;
  delay?: number;
  reverse?: boolean;
}

export const AnimationContainer: React.FC<AnimationContainerProps> = ({
  children,
  className,
  delay = 0.2,
  reverse,
}) => {
  return (
    <motion.div
      className={cn('size-full', className)}
      initial={{ opacity: 0, scale: 0.975, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.8, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};
