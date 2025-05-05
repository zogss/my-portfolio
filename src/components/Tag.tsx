import React from 'react';
import Link from 'next/link';

import { useTranslation } from '@/i18n/client';

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  const { t } = useTranslation();

  return (
    <Link
      href={`https://www.google.com/search?q=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      title={t('google_seach', { text })}
      aria-label={t('google_seach', { text })}
      className="bg-gradient-primary flex items-center justify-center rounded-full p-0.5"
    >
      <div className="bg-charcoal-black-700 bg-gradient-secondary shadow-primary flex items-center justify-center rounded-full px-3 py-1 md:px-3.5 md:py-1.5">
        <span className="text-xs leading-tight font-semibold text-white/40 md:text-sm">
          {text}
        </span>
      </div>
    </Link>
  );
};

export default Tag;
