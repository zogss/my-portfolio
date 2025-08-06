# Yan Lucas - Personal Portfolio

A modern, multilingual personal portfolio website showcasing professional experience, projects, and technical skills. Built with Next.js 15, this portfolio features a clean design, internationalization support, and responsive layouts optimized for both developers and end users.

The portfolio serves as a comprehensive showcase of Yan Lucas's work as a software engineer, featuring interactive project galleries, detailed experience timelines, and a contact system. It's designed to provide visitors with an engaging experience while demonstrating modern web development practices and accessibility standards.

---

## Architecture Overview

This project follows a modern **Next.js App Router architecture** with server-side rendering (SSR) and static site generation (SSG) capabilities. The application is structured as a **Single Page Application (SPA)** with multiple sections, utilizing Next.js's file-based routing system with internationalization support.

**Key Architectural Features:**

- **App Router**: Uses Next.js 15's App Router with the `[lng]` dynamic route for internationalization
- **Server Components**: Leverages React Server Components for optimal performance
- **Static Generation**: Pre-generates static pages for different languages at build time
- **Client-Side Hydration**: Minimal client-side JavaScript for interactive components
- **API Integration**: Server actions for form handling and data fetching
- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

## Technologies Used

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5.8** - Type-safe development
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Motion (Framer Motion)** - Animation library
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **React Hot Toast** - Toast notifications

### **Internationalization**

- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next
- **i18next-browser-languagedetector** - Language detection
- **accept-language** - Server-side language detection

### **UI Components & Styling**

- **Headless UI** - Unstyled, accessible UI components
- **Radix UI** - Low-level UI primitives
- **Embla Carousel** - Carousel/slider component
- **Tailwind Variants** - Component variants
- **clsx & tailwind-merge** - Conditional styling utilities

### **Development & Build Tools**

- **ESLint** - Code linting with custom configuration
- **Prettier** - Code formatting with import sorting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **pnpm** - Fast, disk space efficient package manager

### **Backend Integration**

- **Firebase** - Backend services for contact forms
- **Zod** - Schema validation
- **@t3-oss/env-nextjs** - Environment variable validation

### **Analytics & Performance**

- **Vercel Analytics** - Web analytics
- **Vercel Speed Insights** - Performance monitoring

### **Version Control & Deployment**

- **Git** - Version control
- **Vercel** - Deployment platform (inferred from dependencies)

---

## Folder and File Structure

```
my-portfolio/
├── public/                     # Static assets
│   ├── images/                # Image assets
│   │   ├── projects/         # Project screenshots and images
│   │   └── *.png             # General images (logos, photos, icons)
│   ├── locales/              # Translation files
│   │   ├── en/              # English translations
│   │   └── pt-BR/           # Portuguese (Brazil) translations
│   ├── projects.json         # Project data configuration
│   └── robots.txt           # SEO robots file
├── src/
│   ├── @types/              # TypeScript type definitions
│   ├── actions/             # Server actions (Next.js)
│   │   ├── getCookie.ts     # Cookie management
│   │   ├── getProjects.ts   # Project data fetching
│   │   └── saveContact.ts   # Contact form handling
│   ├── app/                 # Next.js App Router
│   │   ├── [lng]/          # Internationalized routes
│   │   │   ├── layout.tsx   # Language-specific layout
│   │   │   ├── page.tsx     # Homepage
│   │   │   └── projects/    # Projects pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── not-found.tsx    # 404 page
│   │   └── *.ico, *.png     # Favicon and app icons
│   ├── components/          # React components
│   │   ├── sections/        # Page sections (Home, About, Projects, etc.)
│   │   ├── layout/          # Layout components
│   │   ├── projects/        # Project-related components
│   │   ├── contact/         # Contact form components
│   │   ├── form/           # Form input components
│   │   ├── ui/             # Reusable UI components
│   │   ├── svgs/           # SVG components and icons
│   │   └── variants/       # Animation variants
│   ├── constants/          # Application constants
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Internationalization configuration
│   ├── lib/                # Utility libraries and configurations
│   ├── providers/          # React context providers
│   ├── schemas/            # Zod validation schemas
│   ├── styles/             # CSS and styling
│   │   ├── core/           # Core CSS variables
│   │   ├── layers/         # Tailwind CSS layers
│   │   ├── modules/        # Modular CSS (animations, forms, etc.)
│   │   └── globals.css     # Global styles
│   └── utils/              # Utility functions and helpers
├── env.ts                  # Environment variables configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
├── prettier.config.js     # Prettier configuration
└── package.json           # Project dependencies and scripts
```

### **Key Directory Explanations:**

- **`src/app/[lng]/`**: Implements Next.js internationalization with dynamic language routing
- **`src/components/sections/`**: Contains main page sections (HomeSection, AboutSection, ProjectsSection, etc.)
- **`src/actions/`**: Server actions for data fetching and form handling (Next.js App Router pattern)
- **`src/i18n/`**: Complete internationalization setup with language detection and switching
- **`public/locales/`**: JSON translation files for English and Portuguese
- **`src/styles/modules/`**: Modular CSS organization with animations, components, and utilities

---

## Coding Rules and Conventions (CRITICAL for AI Tools)

### **Naming Conventions**

- **Variables and functions**: `camelCase` (e.g., `getUserData`, `isLoading`)
- **Components and classes**: `PascalCase` (e.g., `ContactForm`, `ProjectCard`)
- **Files and directories**: `kebab-case` for directories, `PascalCase` for React components, `camelCase` for utilities
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `APP_DEFAULT_TITLE`, `API_ENDPOINTS`)
- **CSS classes**: Follow Tailwind CSS conventions and `kebab-case` for custom classes
- **Translation keys**: `snake_case` (e.g., `contact_form_success`, `projects_page_title`)

### **Code Style & Formatting**

- **ESLint Configuration**: Uses `@eslint/js`, TypeScript ESLint, React, and Next.js plugins
- **Prettier**: Automatic code formatting with import sorting via `@ianvs/prettier-plugin-sort-imports`
- **Import Order**: Specific import order enforced by Prettier:
  1. React imports
  2. Next.js imports
  3. Third-party modules
  4. Type imports
  5. Environment variables
  6. Internal modules (actions, lib, hooks, etc.)
  7. Components (UI first, then others)
  8. Styles
  9. Relative imports
- **Semicolons**: Always required
- **Quotes**: Single quotes preferred (`'` over `"`)
- **Trailing commas**: Required in objects and arrays
- **Tab width**: 2 spaces
- **Arrow functions**: Preferred for callbacks and functional components

### **TypeScript Rules**

- **Strict mode**: Enabled with `noUncheckedIndexedAccess`
- **Unused variables**: Error, but allow variables starting with `_` (e.g., `_unused`)
- **Type definitions**: Store in `src/@types/` directory
- **Path aliases**: Use `@/` for src directory, `@env` for environment, `@public/` for public assets
- **React components**: Always type with `React.FC` or explicit prop interfaces

### **React & Next.js Conventions**

- **Components**: Use function declarations for components, not arrow functions for exports
- **Server Components**: Default to Server Components, use `'use client'` directive only when needed
- **File naming**: React components use `PascalCase.tsx`, utilities use `camelCase.ts`
- **Props**: Always define TypeScript interfaces for component props
- **Hooks**: Custom hooks must start with `use` and be in `src/hooks/`
- **Server Actions**: Place in `src/actions/` directory with descriptive names

### **Internationalization Rules**

- **Language codes**: Use `en` for English, `pt-BR` for Portuguese Brazil
- **Translation keys**: Use descriptive `snake_case` keys
- **Fallback language**: Always `en` (English)
- **Dynamic content**: Use interpolation with `{{variable}}` syntax
- **Component text**: Never hardcode text, always use translation keys

### **Styling Conventions**

- **Tailwind CSS**: Primary styling method, prefer utility classes
- **Custom CSS**: Only when Tailwind is insufficient, place in `src/styles/modules/`
- **Responsive design**: Mobile-first approach using Tailwind breakpoints
- **CSS organization**: Use CSS layers (base, components, utilities)
- **Animations**: Use Motion (Framer Motion) for complex animations, CSS for simple ones

### **Error Handling**

- **Form validation**: Use Zod schemas for validation
- **API errors**: Handle with try/catch blocks and proper error messages
- **User feedback**: Use React Hot Toast for notifications
- **Error boundaries**: Implement for component error handling
- **Loading states**: Always provide loading indicators for async operations

### **Performance & SEO**

- **Images**: Use Next.js Image component with proper optimization
- **Metadata**: Define proper metadata for each page using Next.js metadata API
- **Static generation**: Prefer static generation over server-side rendering when possible
- **Code splitting**: Let Next.js handle automatic code splitting

### **Environment Variables**

- **Validation**: Use `@t3-oss/env-nextjs` for environment variable validation
- **Naming**: Use `NEXT_PUBLIC_` prefix for client-side variables
- **Security**: Never commit sensitive keys, use `.env.local` for development

### **Testing & Quality**

- **Linting**: Run `pnpm lint` before committing
- **Formatting**: Use `pnpm format` to format all files
- **Type checking**: Ensure no TypeScript errors before deployment

### **Git & Commit Conventions**

- **Commit messages**: Use conventional commits format:
  - `feat: add new contact form validation`
  - `fix: resolve mobile navigation bug`
  - `docs: update README with deployment instructions`
  - `style: format code with prettier`
  - `refactor: reorganize component structure`
- **Branch naming**: Use `feature/description`, `fix/description`, `docs/description`

### **Component Architecture**

- **Single responsibility**: Each component should have one clear purpose
- **Composition**: Prefer composition over inheritance
- **Prop drilling**: Use React Context for deeply nested props
- **State management**: Use React hooks for local state, Context for shared state
- **Side effects**: Use useEffect sparingly, prefer server actions when possible

---

## Installation and Local Development

### **Prerequisites**

- **Node.js**: Version 22 or higher (specified in engines)
- **pnpm**: Version 10.14.0 or compatible (specified in packageManager)
- **Git**: For version control
- **Modern browser**: For testing (Chrome, Firefox, Safari, Edge)

### **Installation Steps**

1. **Clone the repository**

   ```bash
   git clone https://github.com/zogss/my-portfolio.git
   # or your repository URL
   ```

2. **Navigate to project directory**

   ```bash
   cd my-portfolio
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Set up environment variables**

   ```bash
   # Copy the example environment file (if it exists)
   cp .env.example .env.local

   # Or create a new .env.local file and add required variables
   # Check env.ts for required environment variables
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The application supports both English (`/en`) and Portuguese (`/pt-BR`) routes
   - Default route redirects to browser's preferred language or English fallback

### **Development Workflow**

1. **Code formatting**: Run `pnpm format` before committing
2. **Linting**: Run `pnpm lint` to check for code issues
3. **Type checking**: TypeScript will show errors in your IDE
4. **Hot reload**: Changes are automatically reflected in the browser
5. **Language testing**: Test both `/en` and `/pt-BR` routes

---

## Available Scripts

### **Development Scripts**

- **`pnpm dev`**: Starts the Next.js development server on `http://localhost:3000`
- **`pnpm build`**: Creates an optimized production build
- **`pnpm start`**: Starts the production server (requires `pnpm build` first)

### **Code Quality Scripts**

- **`pnpm lint`**: Runs ESLint to check for code issues and enforces coding standards
- **`pnpm format`**: Formats all code using Prettier with custom import sorting

### **Utility Commands**

```bash
# Install new dependencies
pnpm add <package-name>
pnpm add -D <package-name>  # For dev dependencies

# Update dependencies
pnpm update

# Check for outdated packages
pnpm outdated

# Clean install (remove node_modules and reinstall)
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### **Deployment Commands**

```bash
# Build for production
pnpm build

# Test production build locally
pnpm start

# Analyze bundle size (if configured)
pnpm build && pnpm analyze
```

---

## Project Features

### **Core Functionality**

- **Multilingual Support**: English and Portuguese (Brazil) with automatic language detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Project Showcase**: Dynamic project gallery with detailed project pages
- **Contact System**: Contact form with Firebase integration and rate limiting
- **SEO Optimized**: Proper metadata, sitemap, and robots.txt configuration
- **Performance Optimized**: Image optimization, code splitting, and caching strategies

### **Sections**

- **Home**: Hero section with introduction and call-to-action
- **About**: Personal background and professional philosophy
- **Projects**: Portfolio of completed projects with filtering and detailed views
- **Experience**: Professional timeline and work history
- **Tech Stack**: Technologies and tools showcase
- **Contact**: Contact form with validation and success/error handling

### **Technical Features**

- **Server-Side Rendering**: Fast initial page loads
- **Static Site Generation**: Pre-generated pages for optimal performance
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Analytics Integration**: Vercel Analytics and Speed Insights

---

## How to Contribute

### **Getting Started**

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/my-portfolio.git
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### **Development Guidelines**

1. **Follow coding conventions** outlined in this README
2. **Test your changes** in both languages (`/en` and `/pt-BR`)
3. **Run linting and formatting**:
   ```bash
   pnpm lint
   pnpm format
   ```
4. **Ensure TypeScript compilation**:
   ```bash
   pnpm build
   ```

### **Commit and Pull Request Process**

1. **Make atomic commits** with descriptive messages following conventional commit format
2. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
3. **Create a Pull Request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Testing instructions
   - Any breaking changes noted

### **Areas for Contribution**

- **New project additions**: Add projects to `public/projects.json`
- **Translation improvements**: Enhance translations in `public/locales/`
- **Performance optimizations**: Improve loading times and user experience
- **Accessibility enhancements**: Improve WCAG compliance
- **New features**: Contact form enhancements, project filtering, etc.
- **Bug fixes**: Address any reported issues

### **Code Review Process**

- All contributions require code review
- Maintain consistency with existing code style
- Ensure all tests pass and build succeeds
- Address any feedback promptly

---

## License

This project is private and proprietary. All rights reserved.

---

## Contact

**Yan Lucas** - Software Engineer

- Website: [https://yanlucas.site](https://yanlucas.site)
- Email: Contact through the website's contact form

---

_This README is optimized for AI tools like Windsurf Editor, Cursor, and GitHub Copilot to provide comprehensive context for code understanding and development assistance._
