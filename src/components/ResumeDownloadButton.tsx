'use client';

import React from 'react';
import { RESUME_FILES } from '@/constants';
import { cn } from '@/utils';
import { track } from '@vercel/analytics';
import { Download } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

import { TRACK_EVENT_KEYS } from '@/lib/track-event-keys';
import { useTranslation } from '@/i18n/client';
import { fallbackLng } from '@/i18n/settings';

const resumeButton = tv({
  base: 'group/resume z-3 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-lg font-semibold transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none',
  variants: {
    variant: {
      primary: 'bg-gradient-tertiary text-white hover:brightness-110',
      outline:
        'border border-white/20 text-neutral-100/60 hover:bg-white/10 hover:text-white',
    },
    size: {
      md: 'px-5 py-2 text-sm md:px-5.5 md:py-2.5 md:text-base',
      lg: 'px-6 py-2.5 text-base md:px-7 md:py-3 md:text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ResumeDownloadButtonProps
  extends
    VariantProps<typeof resumeButton>,
    Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'download' | 'onClick'> {
  /** Where the button was rendered, forwarded to analytics. */
  source: string;
}

/**
 * Downloads the CV for the active locale.
 *
 * The file is a static asset under `public/docs`, so this is a plain anchor with
 * `download` rather than a JS-driven blob: the browser saves it directly, the URL
 * is shareable, and it still works with JS disabled or when the click is a
 * middle-click / "save link as".
 */
const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({
  source,
  variant,
  size,
  className,
  ...rest
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const resume = RESUME_FILES[language] ?? RESUME_FILES[fallbackLng];

  // `fallbackLng` is always a key of RESUME_FILES, but noUncheckedIndexedAccess
  // cannot know that.
  if (!resume) return null;

  return (
    <a
      href={resume.path}
      download={resume.fileName}
      title={t('download_cv')}
      aria-label={t('download_cv')}
      onClick={() => {
        track(TRACK_EVENT_KEYS.RESUME_CLICK, { language, source });
      }}
      className={cn(resumeButton({ variant, size }), className)}
      {...rest}
    >
      <Download
        aria-hidden="true"
        className="size-4.5 shrink-0 transition-transform duration-500 group-hover/resume:translate-y-0.5 md:size-5"
      />
      {t('download_cv')}
    </a>
  );
};

export default ResumeDownloadButton;
