'use client';

import React, { useSyncExternalStore } from 'react';
import { cn } from '@/utils';
import { Search } from 'lucide-react';

import { useTranslation } from '@/i18n/client';
import { openCommandPalette } from '@/components/CommandPalette';

/** The platform modifier never changes, so the store never notifies. */
const subscribe = () => () => {};
const getModifier = () =>
  /mac|iphone|ipad/i.test(navigator.userAgent) ? '⌘' : 'Ctrl';
const getServerModifier = () => null;

/**
 * Visible affordance for the ⌘K palette.
 *
 * `navigator` does not exist during SSR, so the shortcut hint is read through
 * `useSyncExternalStore` with a null server snapshot: React renders the
 * placeholder on the server and swaps in the real modifier after hydration,
 * without a hydration mismatch or a setState-in-effect.
 */
const CommandPaletteTrigger: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { t } = useTranslation();
  const modifier = useSyncExternalStore(
    subscribe,
    getModifier,
    getServerModifier,
  );

  return (
    <button
      type="button"
      onClick={openCommandPalette}
      title={t('command_palette_open')}
      aria-label={t('command_palette_open')}
      className={cn(
        'hidden items-center gap-2 rounded-md border border-white/15 px-2.5 py-1.5 text-neutral-100/50 transition-colors hover:bg-white/10 hover:text-neutral-100 lg:inline-flex',
        className,
      )}
    >
      <Search aria-hidden="true" className="size-4 shrink-0" />
      {/* min-width keeps the button from resizing when the modifier resolves */}
      <kbd className="min-w-9 font-sans text-xs">
        {modifier ? `${modifier} K` : ''}
      </kbd>
    </button>
  );
};

export default CommandPaletteTrigger;
