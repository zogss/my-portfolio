# Yan Lucas — Personal Portfolio

A bilingual personal portfolio website for Yan Lucas, built with **Next.js 16** (App Router), **React 19**, and **Tailwind CSS 4**. The site presents an introduction, work experience, project showcase, tech stack, and a contact form, with full English / Brazilian-Portuguese localization.

Live: [https://yanlucas.site](https://yanlucas.site)

---

## Stack

| Area            | Technology                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Framework       | Next.js 16.2 (App Router, RSC, static generation)                                                        |
| UI runtime      | React 19.2, TypeScript 5.8                                                                               |
| Styling         | Tailwind CSS 4.2, `@tailwindcss/typography`, `@tailwindcss/container-queries`, `tw-animate-css`          |
| Animation       | [`motion`](https://motion.dev) 12 (Framer Motion successor)                                              |
| Forms           | `react-hook-form` + `zod` (via `@hookform/resolvers`)                                                    |
| i18n            | `i18next` 25 + `react-i18next` 15 + `i18next-resources-to-backend`                                       |
| UI primitives   | `@headlessui/react`, `@radix-ui/react-slot`, `embla-carousel-react`                                      |
| Icons           | `lucide-react`, `react-icons`, custom SVG components                                                     |
| Backend         | Firebase 11 (Firestore — contact form storage)                                                           |
| Env validation  | `@t3-oss/env-nextjs` + `zod`                                                                             |
| Analytics       | `@vercel/analytics`, `@vercel/speed-insights`, Google Analytics (gtag)                                   |
| Tooling         | ESLint 9 (flat config), Prettier 3, `@ianvs/prettier-plugin-sort-imports`, `prettier-plugin-tailwindcss` |
| Package manager | `pnpm` 10 (Node ≥ 22)                                                                                    |

---

## Architecture

The app is an internationalized single-page experience with a few sub-routes, served from a Next.js 16 App Router under a dynamic `[lng]` segment.

### Routing & i18n flow

1. **Proxy layer** — [src/proxy.ts](src/proxy.ts) inspects every incoming request. Using Next.js 16's `ProxyConfig`, it resolves the locale in this order:
   - Path segment (`/en/...`, `/pt-BR/...`)
   - `i18next` cookie
   - Fallback to `en`
     If the URL is missing a locale, it 308-redirects to `/{lng}{pathname}` and refreshes the cookie.
2. **Root layout** — [src/app/layout.tsx](src/app/layout.tsx) sets up `<html lang dir>` from the cookie, loads Inter via `next/font`, mounts `Analytics`, `SpeedInsights`, and the Google Analytics script.
3. **Locale layout** — [src/app/[lng]/layout.tsx](src/app/[lng]/layout.tsx) generates static params for both locales, builds full SEO metadata (canonical, hreflang, OpenGraph, Twitter, keywords per language), and wraps children in `AppProvider` (i18n context) and `AppLayout` (header / footer).
4. **Translations** — [src/i18n/index.ts](src/i18n/index.ts) creates per-request i18next instances with a dynamic `import()` of `public/locales/{lng}/translations.json`. The active language is propagated via [src/lib/server-ctx.ts](src/lib/server-ctx.ts) (`AsyncLocalStorage`).

### Pages

- [src/app/[lng]/page.tsx](src/app/[lng]/page.tsx) — Home page composed of `HomeSection`, `AboutSection`, `ProjectsSection`, `ExperienceSection`, `TechStackSection`, `ContactSection`. Also renders Person + WebSite JSON-LD structured data inline.
- [src/app/[lng]/projects/page.tsx](src/app/[lng]/projects/page.tsx) — Projects listing page.
- [src/app/[lng]/projects/[slug]/page.tsx](src/app/[lng]/projects/[slug]/page.tsx) — Individual project detail.
- [src/app/not-found.tsx](src/app/not-found.tsx) — Global 404.
- [src/app/sitemap.ts](src/app/sitemap.ts) — Sitemap generation.

---

## Folder structure

```text
my-portfolio/
├── public/
│   ├── images/                  # Photos, project art, OG images
│   ├── locales/
│   │   ├── en/translations.json
│   │   └── pt-BR/translations.json
│   ├── projects.json            # Source of truth for project cards
│   └── robots.txt
├── src/
│   ├── @types/                  # Shared TS types (e.g. WithLanguageParams)
│   ├── actions/                 # Server actions
│   │   ├── getCookie.ts         # Server-side cookie read
│   │   ├── getProjects.ts       # Reads /public/projects.json
│   │   └── saveContact.ts       # Persists contact form to Firestore
│   ├── app/                     # App Router
│   │   ├── [lng]/               # Localized routes (en, pt-BR)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── projects/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   ├── layout.tsx           # Root layout (HTML, fonts, analytics)
│   │   ├── manifest.json
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   └── icon.* / favicon.ico
│   ├── components/
│   │   ├── sections/            # HomeSection, AboutSection, ProjectsSection,
│   │   │                        # ExperienceSection, TechStackSection, ContactSection
│   │   ├── layout/              # app-layout.tsx, PageLayout.tsx
│   │   ├── projects/            # ProjectsBlock.tsx, ProjectsHeader.tsx
│   │   ├── techStack/           # TechStackBlock.tsx
│   │   ├── contact/             # ContactForm.tsx, ContactBlock.tsx
│   │   ├── form/                # Input.tsx, AnimatedError.tsx
│   │   ├── ui/                  # button.tsx, carousel.tsx (Embla wrapper)
│   │   ├── svgs/                # Eclipses, flags, decorative icons
│   │   └── *.tsx                # Header, Footer, LanguageDropdown, Loader,
│   │                            # Notification, Tag, Toast, WithEnterAnimation,
│   │                            # animation-container, with-translation (HOC)
│   ├── constants/               # APP_*, BASE_KEYWORDS_EN/PT
│   ├── hooks/                   # useScrollSpy, useScrollObserver, useWindowSize,
│   │                            # use-event-listener, use-event-callback,
│   │                            # use-local-storage, use-isomorphic-layout-effect
│   ├── i18n/                    # settings.ts, index.ts (server), client.ts
│   ├── lib/                     # firebase, server-ctx, utils (cn), debounce,
│   │                            # react-utils, track-event-keys
│   ├── providers/               # app-provider, cookie-provider, LoadingProvider
│   ├── schemas/                 # contactSchema.ts (Zod)
│   ├── styles/
│   │   ├── core/variables.css   # Design tokens (colors, fonts, spacing, shadows)
│   │   ├── layers/              # base.css, components.css, utilities.css
│   │   ├── modules/             # animations.css, forms.css, libs.css,
│   │   │                        # transitions/*, modules.css (entry)
│   │   └── globals.css          # Tailwind + token / layer / module imports
│   ├── utils/
│   │   ├── helpers/             # cn, capitalize, getStrFromLocaleCtx, getErrorMessage
│   │   ├── interfaces/          # ProjectType, page props, metadata shapes
│   │   └── index.ts
│   ├── proxy.ts                 # Locale routing & cookie management
│   └── routes.ts                # LOCALE_PREFIX_REGEX
├── env.ts                       # @t3-oss/env-nextjs schema
├── next.config.ts
├── tsconfig.json                # Path aliases: @/*, @env, @public/*
├── eslint.config.js             # Flat config (Next + TS + React + Hooks + Prettier)
└── prettier.config.js           # Import order + Tailwind sort plugin
```

---

## Design system

The visual system lives in [src/styles/](src/styles/) and uses Tailwind 4's `@theme` blocks rather than a `tailwind.config.js` file.

- **Tokens** — [src/styles/core/variables.css](src/styles/core/variables.css)
  - Custom palette: `charcoal-black-{400,700}`, `midnight-slate-{400,700}`, `slate-gray-{200..500}`, `royal-purple-700`.
  - Per-project accent colors: `spacie-rose`, `cs-blue`, `expert-dark`, `massagueirinha-orange`, `bull-blockchain-blue`, `car-rent-violet`, `localize-blue`.
  - Shadcn-style neutral set in OKLCH (`--background`, `--foreground`, `--card`, ...) used by `@theme inline`.
  - Spacing, typography, breakpoints, shadows, and animated gradients (with CSS `@property` for transitions on gradient stops).
- **Layers** — `base.css` (resets / globals), `components.css` (reusable component classes), `utilities.css` (custom utilities). All composed in [src/styles/globals.css](src/styles/globals.css).
- **Animation** — Custom keyframes in [src/styles/modules/animations.css](src/styles/modules/animations.css) (`follow-the-leader`, `loader-dots`, `wiggle-up`) plus `tw-animate-css` and Motion components for orchestrated entrances.
- **Background** — App body uses `bg-charcoal-black-700` (a near-black indigo) with `font-inter`.

Class composition uses [`cn()`](src/utils/helpers/cn.ts) (clsx + `tailwind-merge`) and `tailwind-variants` for small variant systems.

---

## Data flow

- **Projects** — [public/projects.json](public/projects.json) holds an array of `ProjectType` objects (id, slug, title, subtitle, descriptions as i18n keys, `techs[]`, image, alt, optional carousel / url / repo, `color_badge`). [src/actions/getProjects.ts](src/actions/getProjects.ts) reads it via `fs.readFileSync` and exposes `getProjects()` and `getProject(slug)` server actions. Long descriptions reference translation keys — content lives in the locale JSON.
- **Experience** — Hardcoded `experiences` array in [src/components/sections/ExperienceSection.tsx](src/components/sections/ExperienceSection.tsx). Roles and descriptions reference translation keys.
- **Contact** — [src/components/contact/ContactForm.tsx](src/components/contact/ContactForm.tsx) validates with [src/schemas/contactSchema.ts](src/schemas/contactSchema.ts) (Zod) and submits via [src/actions/saveContact.ts](src/actions/saveContact.ts), which writes to the Firestore `contacts` collection with a server timestamp. Successful / failed submissions emit Vercel Analytics events keyed in [src/lib/track-event-keys.ts](src/lib/track-event-keys.ts).
- **Translations** — Two namespaces aren't used; everything is the default `translations` namespace. Keys follow `snake_case` and rely heavily on numbered fragments (`home_section_description_part_1`, `about_section_text_part_2`, ...) so the UI can interleave styled spans inside a single sentence.

---

## SEO & metadata

- Metadata is generated per locale in [src/app/[lng]/layout.tsx](src/app/[lng]/layout.tsx) — title template, keywords (separate EN / PT lists in [src/constants/index.ts](src/constants/index.ts)), `metadataBase`, `canonical`, `hreflang` (including `x-default`), full OpenGraph (with `summary_large_image` Twitter card), and `appleWebApp` config.
- The home page injects Person + WebSite JSON-LD `<script type="application/ld+json">` at the top of [src/app/[lng]/page.tsx](src/app/[lng]/page.tsx).
- [src/app/sitemap.ts](src/app/sitemap.ts) and [public/robots.txt](public/robots.txt) handle crawl directives.

---

## Conventions

- **Naming** — `PascalCase.tsx` for React components, `camelCase.ts` for utilities and hooks, `SCREAMING_SNAKE_CASE` for constants, `snake_case` for translation keys.
- **Components** — Default to React Server Components; opt into `'use client'` only when state, refs, or browser APIs are needed (forms, animations driven by hooks, providers).
- **Imports** — Order is enforced by `@ianvs/prettier-plugin-sort-imports`. See [prettier.config.js](prettier.config.js) for the exact group order (React → Next → 3rd-party → types → @env → @/@types → @/actions → @/lib → @/i18n → @/schemas → @/hooks → @/providers → @/components/ui → @/components → @/styles → @/app → @public → relative).
- **TypeScript** — Strict mode + `noUncheckedIndexedAccess`. Path aliases: `@/*` → `src/*`, `@env` → `env.ts`, `@public/*` → `public/*`.
- **ESLint** — Flat config (`@eslint/js` recommended + TypeScript ESLint + React + React Hooks + `@next/next` core-web-vitals). Unused vars are an error unless prefixed with `_`. See [eslint.config.js](eslint.config.js).
- **i18n** — Never hard-code user-facing strings. Add keys to **both** [public/locales/en/translations.json](public/locales/en/translations.json) and [public/locales/pt-BR/translations.json](public/locales/pt-BR/translations.json). Use `getTranslation(lng)` server-side, `useTranslation()` client-side.
- **Commits** — Conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`).

---

## Local development

### Requirements

- Node ≥ 22
- pnpm 10 (`packageManager` field is `pnpm@10.33.2`)

### Setup

```bash
pnpm install
cp .env.example .env.local        # fill in Firebase + personal URLs
pnpm dev                          # http://localhost:3000 → redirects to /en or /pt-BR
```

`env.ts` validates everything at boot — missing or malformed vars fail the build. Required groups:

- `API_URL`, `APP_URL`, `NODE_ENV`
- `FIREBASE_*` (8 keys)
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PERSONAL_EMAIL`, `NEXT_PUBLIC_PERSONAL_LOCATION_EN`, `NEXT_PUBLIC_PERSONAL_LOCATION_BR`
- `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_INSPIRATION_FIGMA_URL`

### Scripts

| Command            | Purpose                                                  |
| ------------------ | -------------------------------------------------------- |
| `pnpm dev`         | Start the Next.js dev server                             |
| `pnpm build`       | Production build                                         |
| `pnpm start`       | Run the built app                                        |
| `pnpm lint`        | ESLint over the whole repo                               |
| `pnpm format`      | Prettier write across `**/*.{js,jsx,ts,tsx,json,css,md}` |
| `pnpm check-types` | `tsc --noEmit` (no test suite is configured)             |

---

## Deployment

The app targets Vercel — `@vercel/analytics` and `@vercel/speed-insights` are wired up in the root layout, and `next.config.ts` declares AVIF / WebP image formats with quality presets. There is no separate CI configuration in the repo; Vercel handles build + deploy on push.

---

## License

Private and proprietary. All rights reserved.

---

## Contact

**Yan Lucas** — Frontend Engineer

- Website: [https://yanlucas.site](https://yanlucas.site)
- Reach out via the contact form on the site.
