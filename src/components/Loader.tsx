import React from 'react';
import {motion} from 'framer-motion';

import YIcon from './svgs/YIcon';

const Loader: React.FC = () => (
  <div
    id="loader-wrapper"
    aria-label="Loading"
    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal-black-700 text-black transition-all duration-500 ease-in">
    <div className="flex w-fit items-end">
      <div className="z-[1] bg-gradient-to-r from-charcoal-black-700 to-transparent pb-1.5 lg:pb-2">
        <YIcon className="size-24 shrink-0 md:size-32 lg:size-36" />
      </div>
      <motion.div
        initial={{opacity: 0, width: 0}}
        animate={{opacity: 1, width: 'auto'}}
        transition={{duration: 0.6, ease: 'easeInOut'}}
        className="-translate-x-6 overflow-hidden md:-translate-x-7 lg:-translate-x-8">
        <span className="block overflow-hidden whitespace-nowrap text-end text-3xl text-neutral-100 md:text-5xl lg:text-7xl">
          an Lucas
        </span>
      </motion.div>
    </div>
    <div className="fixed inset-x-0 bottom-0 flex items-center justify-center pb-3">
      <motion.div
        initial={{opacity: 1}}
        animate={{opacity: 0}}
        transition={{duration: 0.2, ease: 'easeInOut'}}
        className="size-5 -translate-x-2.5">
        <div className="loader-dots">
          <div className="absolute inset-0 rounded-full bg-gray-400"></div>
          <div className="absolute inset-0 rounded-full bg-gray-600"></div>
          <div className="absolute inset-0 rounded-full bg-gray-400"></div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Loader;
