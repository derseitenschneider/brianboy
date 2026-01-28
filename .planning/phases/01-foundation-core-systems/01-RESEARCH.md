# Phase 1: Foundation + Core Systems - Research

**Researched:** 2026-01-28
**Domain:** Astro 5.x + Tailwind CSS v4 + i18n routing + theme toggle
**Confidence:** HIGH

## Summary

This research covers the foundational setup for a bilingual static portfolio: Astro 5.x with Tailwind CSS v4, build-time i18n routing (German at `/`, English at `/en/`), and a flash-free theme toggle system using CSS custom properties.

The key finding is that **Tailwind CSS v4 has fundamentally changed its integration approach** - the old `@astrojs/tailwind` integration is deprecated. Tailwind v4 now uses a Vite plugin (`@tailwindcss/vite`) and CSS-first configuration via `@import "tailwindcss"` and `@theme` directives. This is a major shift from v3's JavaScript-based configuration.

For i18n, Astro's built-in routing with `prefixDefaultLocale: false` provides exactly what we need: German content at root URLs, English content under `/en/`. The theme system requires a blocking inline script in `<head>` using Astro's `is:inline` directive to prevent flash of wrong theme.

**Primary recommendation:** Use the Vite plugin approach for Tailwind v4, configure i18n with `prefixDefaultLocale: false`, and implement theme toggle with `is:inline` blocking script placed before any CSS in the `<head>`.

## Standard Stack

The established libraries/tools for this domain:

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^5.16.x | Static site generator | Zero JS by default, native i18n routing, outputs pure static HTML |
| tailwindcss | ^4.0.0 | Utility-first CSS | Built-in dark mode, design tokens via `@theme`, excellent DX |
| @tailwindcss/vite | ^4.0.0 | Vite integration | Official Tailwind v4 integration method for Astro |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | ^3.0.0 | Sitemap generation | Always - SEO requirement |
| sharp | ^0.33.0 | Image optimization | Astro's default image processor |
| typescript | ^5.0.0 | Type safety | Recommended for Astro projects |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @tailwindcss/vite | @astrojs/tailwind | DEPRECATED for Tailwind v4 - do not use |
| Astro i18n | astro-i18next | Overkill for 2 languages, adds complexity |
| CSS custom properties | Tailwind dark: variant only | Less control over theme transitions |

**Installation:**

```bash
npm create astro@latest brianboy -- --template minimal
cd brianboy
npm install tailwindcss @tailwindcss/vite
npm install @astrojs/sitemap
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro    # Theme script, global CSS, HTML structure
├── components/
│   ├── ThemeToggle.astro   # Theme toggle UI component
│   └── LanguageSwitch.astro # Language switcher component
├── pages/
│   ├── index.astro         # German homepage (default locale)
│   ├── about.astro         # German about (if needed)
│   └── en/
│       ├── index.astro     # English homepage
│       └── about.astro     # English about
├── i18n/
│   └── ui.ts               # Translation strings and helper functions
├── styles/
│   └── global.css          # Tailwind import + @theme configuration
└── content/                # (If using content collections later)
```

### Pattern 1: Tailwind v4 Vite Integration

**What:** Configure Tailwind v4 via the Vite plugin, not the deprecated Astro integration.

**When to use:** All Astro 5.x + Tailwind v4 projects.

**Example:**

```javascript
// astro.config.mjs
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://brianboy.ch",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: false, // German at /, English at /en/
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Pattern 2: CSS-First Tailwind Configuration

**What:** Use `@import "tailwindcss"` and `@theme` instead of tailwind.config.js.

**When to use:** All Tailwind v4 projects.

**Example:**

```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

/* Dark mode with data-theme attribute */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

/* Theme tokens */
@theme {
  /* Colors */
  --color-bg-light: #ffffff;
  --color-bg-dark: #1a1a1a;
  --color-text-light: #1a1a1a;
  --color-text-dark: #f5f5f5;
  --color-accent: #0066cc;
  --color-accent-dark: #4da3ff;

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;

  /* Transitions */
  --transition-theme: 200ms ease;
}
```

### Pattern 3: Blocking Theme Script (Prevents Flash)

**What:** Inline script in `<head>` that runs before page paint to set correct theme.

**When to use:** Any theme toggle implementation.

**Example:**

```astro
<!-- src/components/ThemeScript.astro -->
<!-- Source: https://astro-tips.dev/recipes/dark-mode/ -->
<script is:inline>
(function() {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Priority: stored preference > system preference > light default
  const theme = stored || (systemDark ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);

  // Listen for system preference changes (when in "system" mode)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
})();
</script>
```

### Pattern 4: Astro i18n with Locale Helpers

**What:** Use Astro's built-in i18n with helper functions for translations.

**When to use:** All bilingual Astro sites.

**Example:**

```typescript
// src/i18n/ui.ts
// Source: https://docs.astro.build/en/recipes/i18n/
export const languages = {
  de: "Deutsch",
  en: "English",
} as const;

export const defaultLang = "de";

export const ui = {
  de: {
    "nav.home": "Startseite",
    "nav.about": "Uber mich",
    "theme.light": "Hell",
    "theme.dark": "Dunkel",
    "theme.system": "System",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(lang: keyof typeof languages, path: string) {
  if (lang === defaultLang) return `/${path}`;
  return `/${lang}/${path}`;
}
```

### Anti-Patterns to Avoid

- **Using @astrojs/tailwind with Tailwind v4:** This integration is deprecated. Always use `@tailwindcss/vite` plugin.

- **Placing theme script in body or in a bundled component:** Script must be inline in `<head>` with `is:inline` directive to prevent flash.

- **Using `<script>` without `is:inline` for theme detection:** Astro bundles scripts by default, which delays execution and causes flash.

- **Storing language in URL only without static pages:** For SEO, each language needs its own static HTML file. Astro's i18n routing handles this correctly.

- **Using tailwind.config.js with Tailwind v4:** The CSS-first `@theme` approach is preferred. Only use `@config` directive if migrating complex v3 configs.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| i18n URL routing | Custom URL parsing | Astro's built-in i18n config | Handles prefixes, hreflang, locale detection |
| Tailwind dark mode selector | Custom CSS selectors | `@custom-variant dark` directive | Tailwind handles all utility generation |
| Image optimization | Manual WebP conversion | Astro `<Image>` component + sharp | Automatic srcset, lazy loading, format optimization |
| Sitemap generation | Manual XML creation | @astrojs/sitemap | Handles i18n URLs, lastmod dates |
| Theme flash prevention | Custom DOM manipulation | Blocking `is:inline` script pattern | Established pattern, works with all browsers |

**Key insight:** Astro 5.x and Tailwind v4 have first-class solutions for i18n and theming. Custom solutions will be harder to maintain and miss edge cases like browser back/forward cache, system preference changes, and proper hreflang generation.

## Common Pitfalls

### Pitfall 1: Using Deprecated @astrojs/tailwind Integration

**What goes wrong:** Installing `@astrojs/tailwind` with Tailwind v4 causes configuration conflicts or doesn't work at all.

**Why it happens:** The integration was designed for Tailwind v3's PostCSS approach. Tailwind v4 uses a Vite plugin.

**How to avoid:** Always use `@tailwindcss/vite` plugin configured in `astro.config.mjs` under `vite.plugins`.

**Warning signs:** Errors mentioning PostCSS, tailwind.config.js not being read, or `@apply` directives not working.

### Pitfall 2: Theme Flash (FOUC)

**What goes wrong:** Page loads with light theme, then flashes to dark (or vice versa) after JavaScript runs.

**Why it happens:** Theme detection script is bundled and deferred, running after first paint.

**How to avoid:**
1. Use `is:inline` directive on theme script
2. Place `<ThemeScript />` component in `<head>` BEFORE any CSS imports
3. Test by hard-refreshing with each preference set in localStorage

**Warning signs:** Visible theme change 100-500ms after page load.

### Pitfall 3: Missing prefixDefaultLocale Configuration

**What goes wrong:** German content appears at `/de/` instead of `/`, breaking the requirement for German at root.

**Why it happens:** Default i18n behavior prefixes all locales including the default.

**How to avoid:** Explicitly set `routing: { prefixDefaultLocale: false }` in i18n config.

**Warning signs:** Root URL redirects to `/de/` or shows 404.

### Pitfall 4: Tailwind @theme Variables Not Generating Utilities

**What goes wrong:** Custom colors defined in `@theme` don't create corresponding utility classes.

**Why it happens:** Variables defined in `:root` instead of `@theme`, or using wrong namespace prefix.

**How to avoid:**
- Use `@theme { }` directive, not `:root { }`
- Follow exact namespace: `--color-*` for colors, `--spacing-*` for spacing, etc.

**Warning signs:** `bg-custom-color` class doesn't work, but `var(--color-custom-color)` works in custom CSS.

### Pitfall 5: i18n Translations Not Falling Back

**What goes wrong:** Missing translation shows empty string or key name instead of defaulting to German.

**Why it happens:** Fallback logic not implemented in translation helper function.

**How to avoid:** Always include fallback in `useTranslations`: `return ui[lang][key] || ui[defaultLang][key]`.

**Warning signs:** Empty text or `nav.home` literal appearing in English pages.

## Code Examples

Verified patterns from official sources:

### BaseLayout.astro (Complete)

```astro
---
// src/layouts/BaseLayout.astro
import "../styles/global.css";
import ThemeScript from "../components/ThemeScript.astro";
import { getLangFromUrl, useTranslations } from "../i18n/ui";

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- hreflang for bilingual SEO -->
    <link rel="alternate" hreflang="de" href={new URL("/", Astro.site)} />
    <link rel="alternate" hreflang="en" href={new URL("/en/", Astro.site)} />
    <link rel="alternate" hreflang="x-default" href={new URL("/", Astro.site)} />

    <!-- Blocking theme script - MUST be before any styles -->
    <ThemeScript />
  </head>
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <slot />
  </body>
</html>
```

### ThemeScript.astro (Blocking Script)

```astro
---
// src/components/ThemeScript.astro
// Source: https://tailwindcss.com/docs/dark-mode + https://astro-tips.dev/recipes/dark-mode/
---

<script is:inline>
(function() {
  const root = document.documentElement;

  function getTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (theme === 'dark' || theme === 'light') {
      localStorage.setItem('theme', theme);
    }
  }

  // Apply immediately
  setTheme(getTheme());

  // Listen for system changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Expose for toggle component
  window.setTheme = setTheme;
  window.getTheme = getTheme;
})();
</script>
```

### ThemeToggle.astro (Toggle Component)

```astro
---
// src/components/ThemeToggle.astro
import { getLangFromUrl, useTranslations } from "../i18n/ui";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<button
  id="theme-toggle"
  type="button"
  class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
  aria-label={t("theme.toggle")}
>
  <!-- Sun icon (shown in dark mode) -->
  <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
  </svg>
  <!-- Moon icon (shown in light mode) -->
  <svg class="w-5 h-5 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
  </svg>
</button>

<script>
  const button = document.getElementById('theme-toggle');
  button?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    (window as any).setTheme(next);
  });
</script>
```

### LanguageSwitch.astro

```astro
---
// src/components/LanguageSwitch.astro
import { languages, getLangFromUrl, getLocalizedPath } from "../i18n/ui";

const lang = getLangFromUrl(Astro.url);
const pathname = Astro.url.pathname.replace(/^\/(en\/)?/, "");
---

<nav class="flex gap-2" aria-label="Language selection">
  {Object.entries(languages).map(([code, label]) => (
    <a
      href={getLocalizedPath(code as keyof typeof languages, pathname)}
      class:list={[
        "px-2 py-1 rounded text-sm",
        lang === code
          ? "bg-gray-200 dark:bg-gray-700 font-medium"
          : "hover:bg-gray-100 dark:hover:bg-gray-800",
      ]}
      aria-current={lang === code ? "page" : undefined}
    >
      {label}
    </a>
  ))}
</nav>
```

### global.css (Complete Tailwind v4 Setup)

```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

/* Dark mode using data-theme attribute */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

/* Custom theme tokens */
@theme {
  /* Override/extend default colors */
  --color-accent-500: #0066cc;
  --color-accent-400: #4da3ff;

  /* Custom font stack */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Theme transition - only on color properties to avoid animating layout */
html {
  transition: background-color 200ms ease, color 200ms ease;
}

/* Prevent transitions on initial load */
html:not([data-theme]) * {
  transition: none !important;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Tailwind v4 (Dec 2024) | Must update integration method |
| tailwind.config.js | @theme in CSS | Tailwind v4 (Dec 2024) | CSS-first configuration |
| PostCSS for Tailwind | Vite plugin | Tailwind v4 (Dec 2024) | Faster builds, simpler setup |
| `@apply` in components | Utility classes in HTML | Ongoing best practice | Better performance, easier debugging |
| Client-side i18n | Build-time i18n routing | Astro 4.x+ (2024) | Better SEO, faster pages |

**Deprecated/outdated:**

- **@astrojs/tailwind:** Deprecated for Tailwind v4. Use `@tailwindcss/vite` instead.
- **tailwind.config.js:** Still works via `@config` directive but CSS-first `@theme` is preferred.
- **class="dark" on html:** Tailwind v4 default. We use `data-theme="dark"` for cleaner semantics; requires `@custom-variant`.

## Open Questions

Things that couldn't be fully resolved:

1. **View Transitions and Theme Toggle**
   - What we know: Astro View Transitions may reset theme on navigation
   - What's unclear: Exact interaction with our `is:inline` script
   - Recommendation: Test thoroughly; may need `astro:after-swap` event listener if using View Transitions (not planned for Phase 1)

2. **Tailwind v4 Typography Plugin**
   - What we know: Typography plugin exists for v4
   - What's unclear: If `@tailwindcss/typography` works with v4's CSS-first approach
   - Recommendation: Defer to content phases; not needed for foundation

## Sources

### Primary (HIGH confidence)

- [Tailwind CSS Installation with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro) - Official v4 integration guide
- [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme) - @theme directive documentation
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode) - Dark mode configuration
- [Astro Internationalization Guide](https://docs.astro.build/en/guides/internationalization/) - i18n routing configuration
- [Astro i18n Recipes](https://docs.astro.build/en/recipes/i18n/) - Translation helper patterns
- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/) - Full config options
- [Astro Directives Reference](https://docs.astro.build/en/reference/directives-reference/) - is:inline documentation

### Secondary (MEDIUM confidence)

- [Astro Tips Dark Mode](https://astro-tips.dev/recipes/dark-mode/) - Theme toggle implementation pattern
- [spilled.online Astro Dark Theme Toggle](https://spilled.online/posts/astro-dark-theme-toggle/) - Complete implementation example
- [whitep4nth3r Theme Toggle](https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/) - JavaScript toggle patterns

### Tertiary (LOW confidence)

- [npm create-astro](https://www.npmjs.com/package/create-astro) - Current Astro version (5.16.x)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Official documentation from Tailwind and Astro
- Architecture: HIGH - Multiple verified sources agree on patterns
- Pitfalls: HIGH - Known issues documented in multiple places
- Code examples: HIGH - Adapted from official docs with verification

**Research date:** 2026-01-28
**Valid until:** 2026-02-28 (30 days - stable technologies)
