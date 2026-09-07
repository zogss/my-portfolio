'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { RESUME_FILES } from '@/constants';
import { cn, ProjectType } from '@/utils';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import { track } from '@vercel/analytics';
import {
  ArrowRight,
  Download,
  ExternalLink,
  FolderGit2,
  Languages,
  Mail,
  Search,
} from 'lucide-react';

import { env } from '@env';
import { TRACK_EVENT_KEYS } from '@/lib/track-event-keys';
import { useTranslation } from '@/i18n/client';
import { fallbackLng, languages } from '@/i18n/settings';
import { navLinks } from '@/components/HeaderLinks';

/**
 * Lets any component open the palette without threading state through a
 * provider — the palette already listens on `window` for the ⌘K shortcut.
 */
export const COMMAND_PALETTE_OPEN_EVENT = 'command-palette:open';

export const openCommandPalette = () =>
  window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT));

type CommandGroup = 'sections' | 'projects' | 'actions';

interface Command {
  id: string;
  /** Translation key or literal label. */
  label: string;
  /** Extra searchable text, e.g. a project subtitle. */
  keywords?: string;
  group: CommandGroup;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
}

/** Diacritic-insensitive substring match, so "experiencia" finds "Experiência". */
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

interface CommandPaletteProps {
  projects: ProjectType[];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ projects }) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const lng = languages.includes(language) ? language : fallbackLng;

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    const open = () =>
      setIsOpen((wasOpen) => {
        if (!wasOpen) track(TRACK_EVENT_KEYS.COMMAND_PALETTE_OPEN);
        return true;
      });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((wasOpen) => {
          if (!wasOpen) track(TRACK_EVENT_KEYS.COMMAND_PALETTE_OPEN);
          return !wasOpen;
        });
        return;
      }

      // Escape has to be handled here rather than by `Dialog`'s `onClose`:
      // `ComboboxOptions` is `static`, so Headless UI's combobox treats Escape
      // as "close my dropdown" and stops it before it ever reaches the dialog.
      // The capture phase runs ahead of that handler.
      if (event.key === 'Escape') close();
    };

    // Capture phase, for the Escape case above.
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, open);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, open);
    };
  }, [close]);

  const commands = useMemo<Command[]>(() => {
    const goTo = (href: string) => () => {
      close();
      router.push(href);
    };

    const openExternal = (href: string, event?: string) => () => {
      close();
      if (event) track(event);
      window.open(href, '_blank', 'noopener,noreferrer');
    };

    const resume = RESUME_FILES[lng] ?? RESUME_FILES[fallbackLng];
    const otherLng = languages.find((item) => item !== lng) ?? fallbackLng;

    return [
      ...navLinks.map<Command>((link) => ({
        id: `section-${link.name}`,
        label: t(link.name),
        group: 'sections',
        icon: ArrowRight,
        run: goTo(`/${lng}${link.to}`),
      })),
      ...projects.map<Command>((project) => ({
        id: `project-${project.slug}`,
        label: project.title,
        keywords: `${t(project.subtitle)} ${project.techs.join(' ')}`,
        group: 'projects',
        icon: FolderGit2,
        run: goTo(`/${lng}/projects/${project.slug}`),
      })),
      {
        id: 'action-all-projects',
        label: t('projects_page_title'),
        group: 'actions',
        icon: FolderGit2,
        run: goTo(`/${lng}/projects`),
      },
      ...(resume
        ? [
            {
              id: 'action-resume',
              label: t('download_cv'),
              group: 'actions' as const,
              icon: Download,
              run: () => {
                close();
                track(TRACK_EVENT_KEYS.RESUME_CLICK, {
                  language: lng,
                  source: 'command-palette',
                });
                const link = document.createElement('a');
                link.href = resume.path;
                link.download = resume.fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
              },
            },
          ]
        : []),
      {
        id: 'action-language',
        label: t(otherLng),
        keywords: 'language idioma locale',
        group: 'actions',
        icon: Languages,
        run: () => {
          close();
          track(
            otherLng === 'pt-BR'
              ? TRACK_EVENT_KEYS.LANGUAGE_DROPDOWN_SELECT_PT
              : TRACK_EVENT_KEYS.LANGUAGE_DROPDOWN_SELECT_EN,
          );
          // Keep the current page, matching LanguageDropdown: switching locale
          // from a project should stay on that project, not jump home.
          router.push(`/${otherLng}${pathname.replace(`/${lng}`, '')}`);
        },
      },
      {
        id: 'action-email',
        label: env.NEXT_PUBLIC_PERSONAL_EMAIL,
        keywords: 'email contact contato',
        group: 'actions',
        icon: Mail,
        run: openExternal(
          `mailto:${env.NEXT_PUBLIC_PERSONAL_EMAIL}`,
          TRACK_EVENT_KEYS.EMAIL_CLICK,
        ),
      },
      {
        id: 'action-github',
        label: 'GitHub',
        group: 'actions',
        icon: ExternalLink,
        run: openExternal(
          env.NEXT_PUBLIC_GITHUB_URL,
          TRACK_EVENT_KEYS.GITHUB_CLICK,
        ),
      },
      {
        id: 'action-linkedin',
        label: 'LinkedIn',
        group: 'actions',
        icon: ExternalLink,
        run: openExternal(
          env.NEXT_PUBLIC_LINKEDIN_URL,
          TRACK_EVENT_KEYS.LINKEDIN_CLICK,
        ),
      },
    ];
  }, [close, lng, pathname, projects, router, t]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return commands;
    return commands.filter((command) =>
      normalize(`${command.label} ${command.keywords ?? ''}`).includes(q),
    );
  }, [commands, query]);

  const groups: { key: CommandGroup; label: string }[] = [
    { key: 'sections', label: t('command_group_sections') },
    { key: 'projects', label: t('command_group_projects') },
    { key: 'actions', label: t('command_group_actions') },
  ];

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/70 backdrop-blur-sm duration-200 data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex items-start justify-center p-4 pt-[12vh]">
        <DialogPanel
          transition
          className="bg-charcoal-black-700 shadow-primary w-full max-w-xl overflow-hidden rounded-xl border border-white/10 duration-200 data-closed:scale-95 data-closed:opacity-0"
        >
          <Combobox
            onChange={(command: Command | null) => command?.run()}
            immediate
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search aria-hidden="true" className="size-5 text-neutral-400" />
              <ComboboxInput
                autoFocus
                aria-label={t('command_palette_label')}
                placeholder={t('command_palette_placeholder')}
                displayValue={() => query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent py-4 text-base text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded border border-white/15 px-1.5 py-0.5 text-xs text-neutral-400 sm:block">
                esc
              </kbd>
            </div>

            <ComboboxOptions
              static
              className="max-h-80 scroll-py-2 overflow-y-auto p-2"
            >
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-neutral-400">
                  {t('command_palette_empty')}
                </p>
              ) : (
                groups.map(({ key, label }) => {
                  const items = filtered.filter(
                    (command) => command.group === key,
                  );
                  if (!items.length) return null;

                  return (
                    <div key={key} className="mb-1 last:mb-0">
                      <div className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                        {label}
                      </div>
                      {items.map((command) => (
                        <ComboboxOption
                          key={command.id}
                          value={command}
                          className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-300 select-none',
                            'data-focus:bg-royal-purple-700 data-focus:text-white',
                          )}
                        >
                          <command.icon
                            aria-hidden="true"
                            className="size-4 shrink-0 opacity-70"
                          />
                          <span className="truncate">{command.label}</span>
                        </ComboboxOption>
                      ))}
                    </div>
                  );
                })
              )}
            </ComboboxOptions>
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CommandPalette;
