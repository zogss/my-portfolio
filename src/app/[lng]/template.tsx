'use client';

import React, { PropsWithChildren } from 'react';
import { motion, MotionConfig, type Variants } from 'motion/react';

/**
 * Route transition.
 *
 * `template.tsx` (unlike `layout.tsx`) remounts on every navigation, which gives
 * each route a fresh enter animation while the header, footer and toaster in the
 * layout stay put.
 *
 * This deliberately does not use React's `<ViewTransition>`: that component only
 * ships in React canary, and this project runs stable React 19.2. Swap this file
 * for `<ViewTransition>` once it lands in a stable release.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const Template: React.FC<PropsWithChildren> = ({ children }) => (
  // `reducedMotion="user"` drops the transform for visitors who ask for reduced
  // motion while keeping the fade. Branching on `useReducedMotion()` instead
  // would render a different tree on the server (where the preference is always
  // false) than on the client, which is a hydration mismatch.
  <MotionConfig reducedMotion="user">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="flex size-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  </MotionConfig>
);

export default Template;
