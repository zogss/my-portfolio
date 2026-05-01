# CLAUDE.md

Working notes for Claude Code on this repo. Read this before making non-trivial edits.

## Stack snapshot

- **Next.js 16.2** App Router · **React 19.2** · **TypeScript 5.8** strict + `noUncheckedIndexedAccess`
- **Tailwind CSS 4.2** with `@theme` blocks (no `tailwind.config.js`)
- **motion** (Framer Motion v12) for animation
- **i18next** 25 with `i18next-resources-to-backend` (dynamic JSON imports)
- **react-hook-form** + **zod** for forms
- **Firebase 11 / Firestore** for contact submissions
- **@t3-oss/env-nextjs** validates env at boot
- **pnpm 10** · Node ≥ 22

## Path aliases

```ts
'@/*'      → 'src/*'
'@env'     → 'env.ts'
'@public/*' → 'public/*'
```

## Routing & i18n model

- Locales: `en` (fallback) and `pt-BR`. Defined in [src/i18n/settings.ts](src/i18n/settings.ts).
- **No `middleware.ts`** — locale routing is handled by [src/proxy.ts](src/proxy.ts) (Next.js 16 `ProxyConfig`). Resolution order: URL path segment → `i18next` cookie → `fallbackLng`. Missing-locale paths are redirected to `/{lng}{pathname}`.
- All localized pages live under [src/app/[lng]/](src/app/%5Blng%5D/). `generateStaticParams` in the locale layout pre-renders both locales.
- **Server-side translation:** `await getTranslation(lng)` from [src/i18n/index.ts](src/i18n/index.ts) returns `{ t, i18n }`. Active language is also available via `languageCtx.get()` from [src/lib/server-ctx.ts](src/lib/server-ctx.ts).
- **Client-side translation:** `useTranslation()` from [src/i18n/client.ts](src/i18n/client.ts).
- **Translation files:** [public/locales/en/translations.json](public/locales/en/translations.json) and [public/locales/pt-BR/translations.json](public/locales/pt-BR/translations.json) — single `translations` namespace, `snake_case` keys, often split into numbered fragments (`*_part_1`, `*_part_2`) so the UI can wrap pieces in styled spans.
- **Always update both locale files** when adding a key. The `en` file is the schema-of-truth — `pt-BR` should have the same keys.

## Where to put things

| Adding...                            | Goes in...                                                                                                                                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A new top-level page                 | [src/app/[lng]/<route>/page.tsx](src/app/%5Blng%5D/)                                                                                                                                                |
| A new project entry                  | Append to [public/projects.json](public/projects.json), add `*_description` + `*_long_description_NN` keys to both locale JSONs, drop image into [public/images/projects/](public/images/projects/) |
| A new work experience entry          | Prepend to `experiences` array in [src/components/sections/ExperienceSection.tsx](src/components/sections/ExperienceSection.tsx) and add role + description translation keys                        |
| A new section on the home page       | New file in [src/components/sections/](src/components/sections/), import in [src/app/[lng]/page.tsx](src/app/%5Blng%5D/page.tsx)                                                                    |
| A reusable UI primitive              | [src/components/ui/](src/components/ui/)                                                                                                                                                            |
| A custom hook                        | [src/hooks/](src/hooks/) (`use-` prefix, kebab- or camelCase to match neighbours)                                                                                                                   |
| A server action                      | [src/actions/](src/actions/) — file starts with `'use server'`                                                                                                                                      |
| A Zod schema                         | [src/schemas/](src/schemas/)                                                                                                                                                                        |
| A shared type                        | [src/@types/](src/@types/) or [src/utils/interfaces/](src/utils/interfaces/)                                                                                                                        |
| A new color / spacing / shadow token | `:root` or `@theme` block in [src/styles/core/variables.css](src/styles/core/variables.css) — and add the matching `@theme inline` mapping if it should appear as a Tailwind utility                |
| Custom CSS                           | [src/styles/modules/](src/styles/modules/) (and import via `modules.css`) or [src/styles/layers/](src/styles/layers/)                                                                               |

## Component patterns to follow

- **Default to Server Components.** Add `'use client'` only when you actually need state, refs, browser APIs, react-hook-form, motion-driven hooks, or context.
- **Translation in Server Components:** `const { t } = await getTranslation(lng);` — never import the JSON directly.
- **Translation in Client Components:** wrap in `withTranslation` HOC ([src/components/with-translation.tsx](src/components/with-translation.tsx)) or call `useTranslation()`. The locale comes from the cookie via [src/providers/cookie-provider.tsx](src/providers/cookie-provider.tsx).
- **Class composition:** use `cn()` from [src/utils/helpers/cn.ts](src/utils/helpers/cn.ts) (re-exported via `@/utils`). It wraps `clsx` + `tailwind-merge`.
- **Variants:** prefer `tailwind-variants` (`tv()`) for components with size/color variants.
- **Animations:** use `motion` from `motion/react`. Existing helpers — [src/components/WithEnterAnimation.tsx](src/components/WithEnterAnimation.tsx), [src/components/animation-container.tsx](src/components/animation-container.tsx) — drive entrance animations from intersection observers.
- **Forms:** see [src/components/contact/ContactForm.tsx](src/components/contact/ContactForm.tsx) for the canonical pattern (RHF + Zod resolver + server action + react-hot-toast feedback + analytics event).
- **Icons:** prefer `lucide-react` for general UI icons; project-specific decorative SVGs live in [src/components/svgs/](src/components/svgs/).

## Styling rules

- **Tailwind utilities first.** Custom CSS only when a utility doesn't exist.
- **Tokens flow through `@theme inline`** in [src/styles/core/variables.css](src/styles/core/variables.css). To make a CSS variable available as a Tailwind utility (`bg-foo-500`, `text-foo-500`), add a matching `--color-foo-500: var(--foo-500);` line inside the `@theme inline` block. Same pattern for spacing, fonts, shadows.
- **Background of the app is dark** (`bg-charcoal-black-700`). Component foregrounds default to white / slate.
- **Mobile-first.** Custom breakpoints add `xs` (25rem) and `3xl` (112rem) on top of Tailwind's defaults.
- Prettier's `prettier-plugin-tailwindcss` will re-order utility classes — do not fight it manually.

## Env vars

[env.ts](env.ts) validates everything via Zod. If you reference a new var, add it to **both** the schema and `runtimeEnv`. Use `import { env } from '@env'` to access them — never `process.env.X` directly. Public vars must be prefixed `NEXT_PUBLIC_`.

## Things to watch out for

- **`noUncheckedIndexedAccess`** — array / object index reads are typed as `T | undefined`. Be explicit about narrowing.
- **Locale param is async.** Page / layout props use `WithLanguageParams<T>` from [src/@types/i18n.types.ts](src/@types/i18n.types.ts), where `params` is a Promise. Always `await params` before reading `lng`.
- **Don't add `middleware.ts`.** This project uses the Next.js 16 proxy file ([src/proxy.ts](src/proxy.ts)) instead. Modify that one.
- **Project descriptions are translation keys, not literal strings.** [public/projects.json](public/projects.json) stores the _key name_; the actual EN / PT text is in the locale JSONs.
- **`tailwind.config.js` does not exist.** Tailwind 4 reads tokens from `@theme` blocks in CSS. Don't recreate the config file.
- **Two `cn` files exist** — [src/lib/utils.ts](src/lib/utils.ts) and [src/utils/helpers/cn.ts](src/utils/helpers/cn.ts). The codebase imports from `@/utils` (the helpers version). Prefer that.
- **Google Analytics + Vercel Analytics + Speed Insights** are all already mounted in [src/app/layout.tsx](src/app/layout.tsx). Track product events through `@vercel/analytics`'s `track()` with keys from [src/lib/track-event-keys.ts](src/lib/track-event-keys.ts).
- **`'pt-BR'` not `'pt'`.** Internal locale code is `pt-BR`; Open Graph uses `pt_BR`. The `translations.json` `pt` key is just a label, not the routing locale.
- **Hardcoded experience data.** Most-recent role lives in [src/components/sections/ExperienceSection.tsx](src/components/sections/ExperienceSection.tsx). When updating, prepend to the array (newest first).

## Scripts

```bash
pnpm dev           # next dev
pnpm build         # next build (validates env.ts)
pnpm start         # next start
pnpm lint          # eslint .
pnpm format        # prettier --write
pnpm check-types   # tsc --noEmit
```

There is **no test suite** configured. Verify changes with `pnpm check-types`, `pnpm lint`, and a manual pass over both `/en` and `/pt-BR` in the dev server.

## Commit style

Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`. Branches use `feature/...`, `fix/...`, `docs/...`.
