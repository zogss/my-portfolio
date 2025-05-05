import React, { useMemo } from 'react';
import { cn } from '@/utils';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';

import { env } from '@env';

interface SocialLinksProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  animate = false,
  className,
  iconSize,
}) => {
  const iconSizeClass = useMemo(() => {
    switch (iconSize) {
      case 'sm':
        return 'h-5 w-5 lg:h-6 lg:w-6';
      case 'md':
        return 'h-7 w-7';
      case 'lg':
        return 'h-10 w-10 md:h-12 md:w-12';
      default:
        return 'h-7 w-7';
    }
  }, [iconSize]);

  return (
    <div
      data-transition-target={animate ? 'left' : undefined}
      className={cn('text-slate-gray-500 flex items-center', className)}
    >
      <a
        href={env.NEXT_PUBLIC_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        title={env.NEXT_PUBLIC_INSTAGRAM_URL}
        className="rounded-md bg-transparent p-2 transition-colors duration-500 hover:bg-white/20 hover:text-white/70 md:p-2.5 lg:p-3"
      >
        <BsInstagram className={cn(iconSizeClass, 'shrink-0')} />
      </a>
      <a
        href={env.NEXT_PUBLIC_LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        title={env.NEXT_PUBLIC_LINKEDIN_URL}
        className="rounded-md bg-transparent p-2 transition-colors duration-500 hover:bg-white/20 hover:text-white/70 md:p-2.5 lg:p-3"
      >
        <BsLinkedin className={cn(iconSizeClass, 'shrink-0')} />
      </a>
      <a
        href={env.NEXT_PUBLIC_GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        title={env.NEXT_PUBLIC_GITHUB_URL}
        className="rounded-md bg-transparent p-2 transition-colors duration-500 hover:bg-white/20 hover:text-white/70 md:p-2.5 lg:p-3"
      >
        <BsGithub className={cn(iconSizeClass, 'shrink-0')} />
      </a>
    </div>
  );
};

export default SocialLinks;
