# Technology Stack

**Project:** Brian Boy Personal Portfolio
**Researched:** 2026-01-28
**Overall Confidence:** HIGH

---

## Executive Summary

For a bilingual static portfolio deployed via FTP to Hostpoint, **Astro + Tailwind CSS + CSS-only animations** is the optimal stack. This combination maximizes SEO performance, minimizes JavaScript payload, and integrates seamlessly with GitHub Actions FTP deployment. The reference sites (steipete.me, leerob.com) validate this approach.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **Astro** | 5.x (stable) | Static site generator | Ships zero JavaScript by default. Built-in i18n routing for bilingual support. Perfect for content-focused portfolios. steipete.me uses Astro. |

**Why Astro over alternatives:**
- **95% less JS than Next.js** for static sites (ships no framework runtime)
- **Native i18n routing** with build-time page generation per locale
- **Island architecture** allows interactive components only where needed
- **Adapter-agnostic** - outputs pure HTML/CSS/JS for any hosting
- **2x faster** than Next.js for content sites per 2026 benchmarks

### Styling

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **Tailwind CSS** | 4.x | Utility-first CSS | Excellent dark mode support via `@custom-variant`. Consistent design tokens. steipete.me uses Tailwind. |

**Why Tailwind over vanilla CSS:**
- **Built-in dark mode** via `dark:` variant with class-based or system preference
- **Design token consistency** across all components
- **Faster prototyping** for a small portfolio scope
- **CSS-in-HTML** reduces context switching
- **Tailwind v4** is leaner and faster than v3
- **Tree-shaking** means production CSS stays small (~16KB)

**Configuration for Tailwind v4 dark mode:**
```css
/* In your CSS */
@import "tailwindcss";
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

### Animation Approach

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **CSS-only (Intersection Observer + CSS)** | Native | Scroll reveals, hover effects | Zero additional bundle size. GPU-accelerated. Sufficient for "tasteful" portfolio animations. |

**Why NOT Framer Motion or GSAP:**
- **Framer Motion** (32KB gzipped) - React-centric, overkill for simple fades
- **GSAP** (23KB gzipped) - Powerful but unnecessary for basic scroll reveals
- **CSS-only approach** - 0KB additional, handles all requirements:
  - Scroll reveal with Intersection Observer (20 lines of vanilla JS)
  - Hover effects via CSS transitions
  - Theme transitions via CSS custom properties
  - Reduced motion support via `prefers-reduced-motion` media query

**Recommended animation patterns:**
```css
/* Scroll reveal */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Internationalization

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **Astro Built-in i18n** | Native | Bilingual DE/EN routing | Build-time page generation per locale. Native hreflang support. No client JS required. |

**Why build-time over client-side i18n:**
- **SEO-optimized** - Each language gets its own static HTML page
- **Proper hreflang tags** - Astro generates automatically
- **Zero JS for translations** - Content baked into HTML at build
- **Clean URLs** - `/de/about` and `/en/about` (or `/about` for default)
- **Fast page loads** - No translation JSON to fetch

**Configuration:**
```javascript
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: 'de', // German default per requirements
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false // /about for DE, /en/about for EN
    }
  }
});
```

**File structure:**
```
src/pages/
├── index.astro          # German homepage (default)
├── about.astro          # German about (default)
├── en/
│   ├── index.astro      # English homepage
│   └── about.astro      # English about
```

### Theme System

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **CSS Custom Properties + data attribute** | Native | Dark/light toggle | Works with Tailwind v4. Supports tri-state (light/dark/system). Prevents FOUC. |

**Implementation approach:**
1. **Tri-state toggle** - Light / Dark / System (respects OS preference)
2. **Blocking inline script** in `<head>` to prevent flash
3. **`data-theme` attribute** on `<html>` element
4. **localStorage** for preference persistence

```html
<!-- In <head> before any CSS -->
<script>
  const theme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

### Deployment

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **GitHub Actions + SamKirkland/FTP-Deploy-Action** | v4.3.6 | CI/CD to Hostpoint | Reliable FTP/FTPS deployment. Syncs only changed files. Active maintenance. |

**Workflow configuration:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Hostpoint
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.6
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: ./public_html/  # Adjust for Hostpoint structure
          protocol: ftps  # Use FTPS for security
```

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **@astrojs/sitemap** | latest | SEO sitemap generation | Always - generates sitemap.xml automatically |
| **sharp** | latest | Image optimization | Always - Astro's default image processor |
| **astro-seo** | latest | Meta tags, OpenGraph | Optional - simplifies SEO tag management |

---

## Alternatives Considered

### Framework Comparison

| Criterion | Astro (Recommended) | Next.js | SvelteKit | Plain HTML |
|-----------|---------------------|---------|-----------|------------|
| **JS Bundle** | ~0KB (zero by default) | ~85KB+ (React runtime) | ~15KB | 0KB |
| **i18n Support** | Built-in routing | Manual or next-intl | Manual | Manual |
| **Build Output** | Pure static HTML | Optimized for Vercel | Static possible | N/A |
| **DX for Portfolio** | Excellent | Overkill | Good | Limited |
| **FTP Deploy** | Simple (outputs /dist) | Requires config | Simple | Simple |
| **Learning Curve** | Low (HTML-like) | Medium (React) | Low-Medium | None |

**Why NOT Next.js:**
- Designed for Vercel deployment, not FTP
- Ships React runtime even for static pages
- Overkill for 2-page portfolio
- i18n requires additional configuration/libraries

**Why NOT SvelteKit:**
- Less mature ecosystem than Astro
- i18n requires manual setup
- Smaller community for portfolio patterns
- Good alternative if already familiar with Svelte

**Why NOT Plain HTML:**
- No component reuse (header, footer, project cards)
- Manual minification/optimization
- No built-in image optimization
- i18n requires duplicating all files manually

### CSS Approach Comparison

| Criterion | Tailwind (Recommended) | Vanilla CSS | CSS Modules |
|-----------|------------------------|-------------|-------------|
| **Dark Mode** | Built-in `dark:` variant | Manual CSS vars | Manual CSS vars |
| **Consistency** | Design tokens enforced | Discipline required | Scoped but manual |
| **Bundle Size** | ~16KB (grows logarithmic) | Varies (grows linear) | Varies |
| **Speed** | Fast prototyping | Slower | Medium |
| **Maintenance** | Classes in HTML | Separate files | Separate files |

### Animation Comparison

| Criterion | CSS-Only (Recommended) | GSAP | Framer Motion |
|-----------|------------------------|------|---------------|
| **Bundle Size** | 0KB | 23KB | 32KB |
| **Scroll Reveals** | IntersectionObserver | ScrollTrigger | Built-in |
| **Hover Effects** | CSS native | JS control | Props-based |
| **Timeline Control** | Limited | Excellent | Good |
| **Learning Curve** | Low | Medium | Medium (React) |
| **Portfolio Need** | Sufficient | Overkill | Overkill |

---

## Complete Package.json Dependencies

```json
{
  "name": "brianboy-portfolio",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "sharp": "^0.33.0",
    "typescript": "^5.0.0"
  }
}
```

**Total production dependencies:** 2 packages
**Estimated node_modules:** ~150MB (dev), 0KB shipped (static output)

---

## Integration Notes

### How the Pieces Work Together

```
┌─────────────────────────────────────────────────────────────────┐
│                        Development                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   src/pages/                    src/components/                  │
│   ├── index.astro    ──────>   ├── Header.astro                 │
│   ├── about.astro              ├── ProjectCard.astro            │
│   └── en/                      ├── ThemeToggle.astro            │
│       ├── index.astro          └── LanguageSwitch.astro         │
│       └── about.astro                    │                      │
│                                          │                       │
│   src/styles/                            │                       │
│   └── global.css  <── Tailwind imports ──┘                      │
│       @import "tailwindcss";                                     │
│       @custom-variant dark ...                                   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                        Build (npm run build)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   dist/                                                          │
│   ├── index.html          (German, static)                      │
│   ├── about/index.html    (German, static)                      │
│   ├── en/                                                        │
│   │   ├── index.html      (English, static)                     │
│   │   └── about/index.html                                      │
│   ├── _astro/                                                    │
│   │   ├── *.css           (Tailwind, minified)                  │
│   │   └── *.js            (minimal: theme, animations)          │
│   ├── sitemap.xml                                                │
│   └── robots.txt                                                 │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                        Deploy (GitHub Actions)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   git push main ─> GitHub Actions ─> FTP ─> Hostpoint           │
│                                                                  │
│   SamKirkland/FTP-Deploy-Action syncs dist/ to server           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Critical Integration Points

1. **Astro + Tailwind v4:**
   - Install `@tailwindcss/vite` plugin
   - Import Tailwind in `global.css`
   - Astro auto-detects and processes

2. **Astro i18n + Theme Toggle:**
   - Theme preference persists across language switches via localStorage
   - Blocking script in BaseLayout.astro applies theme before render
   - Works identically on `/` and `/en/` routes

3. **Build Output + FTP:**
   - Astro outputs pure static files to `dist/`
   - No server runtime required
   - FTP action syncs entire `dist/` directory
   - Cache busting via Astro's content hashing (`_astro/*.hash.css`)

4. **Image Optimization:**
   - Use Astro's `<Image>` component
   - Sharp processes at build time
   - Outputs WebP with srcset automatically
   - Static files upload via FTP normally

---

## SEO Configuration

### Required Meta Tags (per language)

```astro
---
// src/layouts/BaseLayout.astro
const { lang = 'de', title, description } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<html lang={lang}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />

  <!-- hreflang for bilingual SEO -->
  <link rel="alternate" hreflang="de" href="https://brianboy.ch/" />
  <link rel="alternate" hreflang="en" href="https://brianboy.ch/en/" />
  <link rel="alternate" hreflang="x-default" href="https://brianboy.ch/" />

  <!-- OpenGraph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content={lang === 'de' ? 'de_CH' : 'en_US'} />
</head>
```

### Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Brian Boy",
  "url": "https://brianboy.ch",
  "jobTitle": "Tech Entrepreneur & Musician",
  "worksFor": [
    { "@type": "Organization", "name": "Morntag" },
    { "@type": "Organization", "name": "Eleno" }
  ],
  "sameAs": [
    "https://github.com/brianboy",
    "https://linkedin.com/in/brianboy",
    "https://twitter.com/brianboy"
  ]
}
</script>
```

---

## Deployment Approach

### Repository Secrets Required

| Secret | Purpose |
|--------|---------|
| `FTP_SERVER` | Hostpoint FTP server address (e.g., `ftp.brianboy.ch`) |
| `FTP_USERNAME` | FTP account username |
| `FTP_PASSWORD` | FTP account password |

### Cache Busting Strategy

Astro automatically hashes static assets:
- `styles.a1b2c3d4.css` - changes with content
- `theme.e5f6g7h8.js` - changes with code

No additional cache busting configuration needed. Browser cache headers should be set via `.htaccess` on Hostpoint:

```apache
# .htaccess
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

---

## Performance Budget

| Metric | Target | How Achieved |
|--------|--------|--------------|
| **LCP** | < 2.5s | No JS blocking render, optimized images |
| **FID** | < 100ms | Minimal JS (only theme + scroll observer) |
| **CLS** | < 0.1 | Proper image dimensions, no layout shifts |
| **Total JS** | < 10KB | CSS-only animations, no framework runtime |
| **Total CSS** | < 20KB | Tailwind tree-shaking |
| **HTML per page** | < 50KB | Static generation, no hydration |

---

## Sources

### HIGH Confidence (Official Documentation)

- [Astro i18n Routing](https://docs.astro.build/en/guides/internationalization/) - Native internationalization
- [Astro 5.0 Release](https://astro.build/blog/astro-5/) - Latest stable features
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode) - Theme toggle configuration
- [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) - GitHub Actions FTP deployment

### MEDIUM Confidence (Verified with Multiple Sources)

- [Best Next.js Alternatives 2026](https://naturaily.com/blog/best-nextjs-alternatives) - Framework comparison
- [Astro.js Localization Guide](https://phrase.com/blog/posts/astrojs-localization-multilingual-static-sites/) - i18n patterns
- [Tailwind v4 Dark Mode](https://dev.to/tene/dark-mode-using-tailwindcss-v40-2lc6) - Custom variant setup
- [CSS/JS Animation Trends 2026](https://webpeak.org/blog/css-js-animation-trends/) - Animation approach validation

### Reference Sites (Validated Stacks)

- [steipete.me](https://github.com/steipete/steipete.me) - Astro + Tailwind, Vercel
- leerob.com - Next.js + Tailwind (heavier stack, validates Tailwind choice)
