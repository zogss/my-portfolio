import clsx from 'clsx'
import React, { useMemo } from 'react'
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs'

interface SocialLinksProps {
  className?: string
  iconSize?: 'sm' | 'md' | 'lg'
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className, iconSize }) => {
  //* memos
  const iconSizeClass = useMemo(() => {
    switch (iconSize) {
      case 'sm':
        return 'h-6 w-6'
      case 'md':
        return 'h-7 w-7'
      case 'lg':
        return 'h-12 w-12'
      default:
        return 'h-7 w-7'
    }
  }, [iconSize])

  //* render
  return (
    <div className={clsx('flex items-center text-slate-gray-500', className)}>
      <a
        href={process.env.PERSONAL_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-transparent p-3 transition-colors duration-500 hover:bg-white/20 hover:text-black/70"
      >
        <BsInstagram className={clsx(iconSizeClass, 'shrink-0')} />
      </a>
      <a
        href={process.env.PERSONAL_LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-transparent p-3 transition-colors duration-500 hover:bg-white/20 hover:text-black/70"
      >
        <BsLinkedin className={clsx(iconSizeClass, 'shrink-0')} />
      </a>
      <a
        href={process.env.PERSONAL_GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-transparent p-3 transition-colors duration-500 hover:bg-white/20 hover:text-black/70"
      >
        <BsGithub className={clsx(iconSizeClass, 'shrink-0')} />
      </a>
    </div>
  )
}

export default SocialLinks