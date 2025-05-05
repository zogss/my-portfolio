'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/utils';
import { motion } from 'motion/react';

interface AnimationContainerProps {
  className?: string;
  children: ReactNode;
  delay?: number;
  reverse?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export const AnimationContainer: React.FC<AnimationContainerProps> = ({
  children,
  className,
  delay = 0.2,
  reverse,
  orientation = 'vertical',
}) => {
  return (
    <motion.div
      className={cn('size-full', className)}
      initial={{
        opacity: 0,
        scale: 0.975,
        y: orientation === 'vertical' ? (reverse ? -20 : 20) : undefined,
        x: orientation === 'horizontal' ? (reverse ? -100 : 100) : undefined,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: orientation === 'vertical' ? 0 : undefined,
        x: orientation === 'horizontal' ? 0 : undefined,
      }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.8, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};
