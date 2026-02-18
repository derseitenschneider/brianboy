# Phase 3: Content - Research

**Researched:** 2026-02-18
**Domain:** Content population, i18n translation strings, Astro Image component, SVG social icons, page routing
**Confidence:** HIGH

## Summary

Phase 3 populates the homepage and about page with all content sections in both German and English. The technical domain is straightforward: extending the existing i18n translation system (`src/i18n/ui.ts`), creating new Astro page components (`about.astro`, `en/about.astro`), using Astro's built-in `<Image>` component for the headshot, and adding inline SVG social icons to the existing footer.

No new dependencies are required. The existing stack (Astro 5.16, Tailwind v4, built-in i18n system) handles everything. The `<Image>` component from `astro:assets` optimizes images at build time using Sharp (bundled with Astro, though `sharp` may need explicit install if missing). Social icons should be inline SVGs with `currentColor` fill for theme compatibility -- no icon library needed for just 4 icons.

The about page does not yet exist (`/about` and `/en/about` routes are missing). The homepage currently has placeholder content. The footer exists from Phase 2 but needs social icon links and email mailto added.

**Primary recommendation:** Extend the existing `ui.ts` translation map with all content strings, create about pages mirroring the existing `index.astro`/`en/index.astro` pattern, use `<Image>` from `astro:assets` for the headshot, and add inline SVG icons directly in Footer.astro.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Hero section: Name + short paragraph introduction (2-3 sentences summarizing who Brian is)
- Hero section: Headshot photo displayed in the hero alongside the text
- Hero section: Compact hero — not full viewport, content below peeks in immediately
- Hero section: "Get in touch" CTA button that opens mailto directly (not scroll)
- Work section: Single combined "Work" section (not separate ventures/projects sections)
- Work section: Eleno appears once as a single entry with dual role (founded + product link)
- Work section: Morntag labeled as "Co-Owner" with description as web development agency
- Work section: Pressdify as a project entry with one-liner + link
- About page: Narrative starts with music origin, then COVID pivot to tech — music is the "before" that makes the "after" interesting
- About page: Music gets enough detail to serve as context for the pivot (not just one sentence — it's the setup for the story)
- About page: One continuous flowing narrative without section headings
- Contact & social links: Social links and email live in the footer (already built in Phase 2) — no separate contact section on pages
- Contact & social links: Footer gets icon-only social links (GitHub, LinkedIn, X, Instagram)
- Contact & social links: Email in footer as mailto link
- Contact & social links: About page relies on footer for contact — no repeated contact section
- Contact & social links: Hero CTA goes to mailto directly

### Claude's Discretion
- Work section layout style (cards vs list vs other)
- Headshot placement/sizing on about page
- Exact spacing and visual hierarchy within sections
- Translation tone for German vs English (formal vs casual)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| REQ-001 | Homepage with condensed bio and work overview | Hero section with name, intro paragraph, headshot, CTA; Work section with Morntag, Eleno, Pressdify entries |
| REQ-002 | About page with expanded biography content | New `about.astro` and `en/about.astro` pages with flowing narrative, headshot |
| REQ-005 | Project links: Eleno, Pressdify (name + one-liner + link) | Work section entries with external links |
| REQ-006 | Venture mentions: Morntag, Eleno with equal billing | Combined Work section with both ventures given equal visual weight |
| REQ-007 | Brief music mention in bio text (minimal) | About page narrative starts with music origin |
| REQ-008 | Origin story mention (COVID pivot from music to coding) | About page narrative covers COVID pivot arc |
| REQ-009 | Social links: GitHub, LinkedIn, Twitter/X, Instagram | Inline SVG icons in Footer.astro with external links |
| REQ-010 | Email contact via mailto link | Footer mailto link + Hero CTA mailto button |
| REQ-011 | Headshot photo | Astro `<Image>` component, placed in hero and about page |
</phase_requirements>

## Standard Stack

### Core (Already Installed — No Changes)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | ^5.16.0 | Framework, `<Image>` component, page routing | Built-in image optimization, static page generation |
| Tailwind CSS | ^4.0.0 | Styling all content sections | Utility-first, dark mode support |
| i18n/ui.ts | Custom | Translation strings and helpers | Already in place from Phase 1 |

### Supporting (May Need Explicit Install)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp | ^0.33.x | Image optimization for `<Image>` component | Astro bundles it, but if build fails with MissingSharp error, install explicitly: `npm install sharp` |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG icons | astro-icon + @iconify-json/tabler | Extra dependency for just 4 icons; inline SVGs are simpler |
| `<Image>` component | Raw `<img>` tag | Loses automatic optimization, WebP conversion, CLS prevention |
| Translation strings in ui.ts | Separate JSON files per language | JSON files scale better for large sites, but ui.ts is simpler for 2-page portfolio |

**Installation:**

No new packages needed. If sharp is missing:
```bash
npm install sharp
```

## Architecture Patterns

### Recommended Project Structure (Phase 3 additions)

```
src/
├── assets/
│   └── images/
│       └── headshot.jpg          # NEW: Brian's headshot photo
├── components/
│   ├── Footer.astro              # MODIFY: Add social icons + email mailto
│   ├── Hero.astro                # NEW: Hero section component
│   ├── WorkSection.astro         # NEW: Combined work/ventures/projects
│   └── ... (existing)
├── i18n/
│   └── ui.ts                     # MODIFY: Add all content translation keys
├── pages/
│   ├── index.astro               # MODIFY: Replace placeholder with Hero + Work
│   ├── about.astro               # NEW: German about page
│   └── en/
│       ├── index.astro           # MODIFY: Replace placeholder with Hero + Work
│       └── about.astro           # NEW: English about page
└── styles/
    └── global.css                # Existing (may add minor content styles)
```

### Pattern 1: Content via Translation Keys

**What:** All user-facing text lives in `ui.ts` as translation keys. Pages reference keys, never hardcode text.

**When to use:** Every piece of visible text content.

**Example:**
```typescript
// src/i18n/ui.ts — extend existing structure
export const ui = {
  de: {
    // ... existing keys ...
    "hero.intro": "Kurzer Absatz über Brian...",
    "hero.cta": "Kontakt aufnehmen",
    "work.title": "Arbeit",
    "work.morntag.role": "Mitinhaber",
    "work.morntag.description": "Webagentur...",
    "work.eleno.role": "Gründer",
    "work.eleno.description": "Beschreibung...",
    "work.pressdify.description": "Einzeiler...",
    "about.narrative": "Die ganze Geschichte...",
    // ...
  },
  en: {
    // ... mirror all keys in English ...
  },
} as const;
```

**Usage in component:**
```astro
---
import { getLangFromUrl, useTranslations } from "../i18n/ui";
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---
<p>{t("hero.intro")}</p>
```

### Pattern 2: Astro Image Component for Headshot

**What:** Use `<Image>` from `astro:assets` for optimized headshot rendering.

**When to use:** The headshot photo in hero section and about page.

**Example:**
```astro
---
import { Image } from 'astro:assets';
import headshot from '../assets/images/headshot.jpg';
---

<Image
  src={headshot}
  alt="Brian Boy"
  width={400}
  height={400}
  class="rounded-full"
/>
```

**Key points:**
- Image must be in `src/` (not `public/`) for optimization
- Astro automatically infers dimensions from the source file
- Outputs optimized WebP at build time
- Width/height prevent CLS (Cumulative Layout Shift)
- `class` attribute works for Tailwind styling

### Pattern 3: Inline SVG Social Icons

**What:** Inline SVG elements directly in the footer component with `currentColor` fill.

**When to use:** The 4 social media icons (GitHub, LinkedIn, X, Instagram).

**Example:**
```astro
<!-- In Footer.astro -->
<div class="flex items-center gap-4">
  <a href="https://github.com/brianboy" aria-label="GitHub" class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425..." clip-rule="evenodd"/>
    </svg>
  </a>
  <!-- Repeat for LinkedIn, X, Instagram -->
</div>
```

**Key points:**
- `fill="currentColor"` inherits text color → works with dark mode
- `aria-label` on the `<a>` for accessibility (icon-only links)
- `aria-hidden="true"` on the SVG to prevent redundant screen reader announcements
- `w-5 h-5` (20px) is standard size for footer social icons

### Pattern 4: About Page Routing

**What:** Create about pages following existing routing convention.

**When to use:** Adding the about page in both languages.

**Example:**
```
src/pages/about.astro          → brianboy.ch/about
src/pages/en/about.astro       → brianboy.ch/en/about
```

Both pages import `BaseLayout` and use `getLangFromUrl`/`useTranslations` exactly like the existing index pages do.

### Pattern 5: Compact Hero Layout

**What:** Side-by-side text + headshot hero that doesn't take full viewport height.

**When to use:** Homepage hero section.

**Example:**
```astro
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
  <div class="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
    <!-- Text content -->
    <div class="flex-1">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {t("hero.greeting")} Brian Boy
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
        {t("hero.intro")}
      </p>
      <a href="mailto:email@brianboy.ch"
         class="inline-flex items-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors">
        {t("hero.cta")}
      </a>
    </div>
    <!-- Headshot -->
    <div class="shrink-0">
      <Image src={headshot} alt="Brian Boy" width={300} height={300} class="rounded-full" />
    </div>
  </div>
</section>
```

**Key points:**
- `py-16 md:py-24` gives breathing room without full viewport
- Mobile: stacks vertically (text then photo). Desktop: side by side
- Content below is immediately visible (compact hero decision)

### Anti-Patterns to Avoid

- **Hardcoded text in templates:** All text must go through `t()` function for i18n. Never write German or English text directly in `.astro` files.
- **Images in `public/` directory:** Public images skip optimization. Place headshot in `src/assets/` for automatic WebP conversion and sizing.
- **Separate icon component files for 4 icons:** Over-engineering. Inline SVGs in Footer.astro is appropriate for this small number of icons.
- **Long translation values in ui.ts:** For the about page narrative (multiple paragraphs), consider using an array of paragraph strings or a single string with `\n\n` separators rendered with `.split()`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Manual resize/WebP conversion | `<Image>` from `astro:assets` | Automatic format conversion, sizing, CLS prevention |
| Social icon SVGs | Custom icon drawing | Standard SVG paths from Simple Icons or Tabler | Pixel-perfect, recognizable brand icons |
| Translation system | New i18n library | Existing `ui.ts` with `useTranslations()` | Already built and working in Phase 1 |
| Dark mode icon colors | Manual color switching | `fill="currentColor"` + Tailwind `text-*` classes | Inherits parent color automatically |
| Responsive hero layout | CSS Grid with manual breakpoints | Tailwind `flex-col md:flex-row` | Proven pattern, mobile-first |

**Key insight:** Phase 3 is primarily a content phase, not a technical one. The infrastructure (i18n, layout, routing, dark mode) already exists. The work is: populate translation strings, create components for content sections, add the about page route, and enhance the footer.

## Common Pitfalls

### Pitfall 1: Missing Translation Keys

**What goes wrong:** Adding a key in one language but forgetting the other. TypeScript catches this at build time if the `ui` type is properly set up.
**Why it happens:** Easy to add German text and forget English (or vice versa).
**How to avoid:** The existing `UiKey` type in `ui.ts` is based on `defaultLang` (de). Add ALL keys to German first, then mirror to English. TypeScript will error if English is missing a key that German has.
**Warning signs:** Build warnings about missing translation keys; fallback to German text on English pages.

### Pitfall 2: About Page Narrative Too Long for Translation Strings

**What goes wrong:** A multi-paragraph narrative crammed into a single translation string becomes hard to maintain.
**Why it happens:** The about page has a flowing narrative with multiple paragraphs.
**How to avoid:** Split the narrative into logical paragraph keys: `about.p1`, `about.p2`, `about.p3`, etc. Or use an array approach. Each paragraph is a separate translation key rendered in sequence.
**Warning signs:** Single massive string in ui.ts that's hard to read or edit.

### Pitfall 3: Headshot Image Not Found at Build

**What goes wrong:** Build fails because image path doesn't resolve.
**Why it happens:** Image placed in wrong directory, or import path is incorrect.
**How to avoid:** Place image in `src/assets/images/`, use relative import: `import headshot from '../assets/images/headshot.jpg'`. Astro resolves `src/` imports at build time.
**Warning signs:** Build error mentioning missing module or unresolved import.

### Pitfall 4: SVG Icons Not Responding to Dark Mode

**What goes wrong:** Social icons stay one color regardless of theme.
**Why it happens:** SVG uses hardcoded `fill="#000"` instead of `currentColor`.
**How to avoid:** Always use `fill="currentColor"` on SVG paths. Style the parent `<a>` with Tailwind text color classes that include dark mode variants.
**Warning signs:** Icons visible in light mode but invisible in dark mode (or vice versa).

### Pitfall 5: Mailto Link with Missing Email

**What goes wrong:** CTA button and footer email link go nowhere.
**Why it happens:** Placeholder email not replaced with real address.
**How to avoid:** Define the email address as a constant or translation key. Use consistently in hero CTA and footer.
**Warning signs:** `mailto:undefined` or `mailto:` with no address in the rendered HTML.

### Pitfall 6: About Page Not Linked in Navigation

**What goes wrong:** About page exists but can't be reached.
**Why it happens:** Navigation already has the "About" link from Phase 2 (`Navigation.astro` links to `/about`), but the page file doesn't exist yet.
**How to avoid:** Verify the about page renders at both `/about` and `/en/about` after creation. Navigation links are already in place.
**Warning signs:** 404 on `/about` — this currently happens because the page doesn't exist yet.

## Code Examples

### Extended ui.ts Translation Structure

```typescript
// src/i18n/ui.ts — Phase 3 additions to existing structure
export const ui = {
  de: {
    // ... existing Phase 1 keys ...

    // Hero section
    "hero.intro": "2-3 Sätze über Brian...",
    "hero.cta": "Kontakt aufnehmen",

    // Work section
    "work.title": "Arbeit",
    "work.morntag.name": "Morntag",
    "work.morntag.role": "Mitinhaber",
    "work.morntag.description": "Webagentur...",
    "work.morntag.url": "https://morntag.com",
    "work.eleno.name": "Eleno",
    "work.eleno.role": "Gründer",
    "work.eleno.description": "Beschreibung...",
    "work.eleno.url": "https://eleno.app",
    "work.pressdify.name": "Pressdify",
    "work.pressdify.description": "Einzeiler...",
    "work.pressdify.url": "https://pressdify.com",

    // About page (split into paragraphs)
    "about.title": "Über mich",
    "about.p1": "Erster Absatz — Musik-Ursprung...",
    "about.p2": "Zweiter Absatz — COVID-Pivot...",
    "about.p3": "Dritter Absatz — Heute...",

    // Footer additions
    "footer.email.label": "E-Mail",
  },
  en: {
    // ... mirror all keys ...
  },
} as const;
```

### About Page Structure

```astro
---
// src/pages/about.astro (German) — English version at src/pages/en/about.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import { Image } from "astro:assets";
import headshot from "../assets/images/headshot.jpg";
import { getLangFromUrl, useTranslations } from "../i18n/ui";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<BaseLayout title={`${t("about.title")} — Brian Boy`} description={t("about.meta")}>
  <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <Image
      src={headshot}
      alt="Brian Boy"
      width={200}
      height={200}
      class="rounded-full mb-8"
    />
    <div class="prose dark:prose-invert max-w-none">
      <p>{t("about.p1")}</p>
      <p>{t("about.p2")}</p>
      <p>{t("about.p3")}</p>
    </div>
  </article>
</BaseLayout>
```

**Note on prose class:** Tailwind's `prose` class (from `@tailwindcss/typography`) would add nice defaults for paragraph spacing. However, this project doesn't have `@tailwindcss/typography` installed. Instead, use manual spacing: `space-y-6` on the container or `mb-6` on paragraphs.

### Footer with Social Icons

```astro
<!-- Addition to existing Footer.astro -->
<div class="flex items-center gap-4">
  <a href="https://github.com/USERNAME" target="_blank" rel="noopener noreferrer"
     aria-label="GitHub"
     class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <!-- GitHub SVG path -->
    </svg>
  </a>
  <a href="https://linkedin.com/in/USERNAME" target="_blank" rel="noopener noreferrer"
     aria-label="LinkedIn"
     class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <!-- LinkedIn SVG path -->
    </svg>
  </a>
  <a href="https://x.com/USERNAME" target="_blank" rel="noopener noreferrer"
     aria-label="X"
     class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <!-- X/Twitter SVG path -->
    </svg>
  </a>
  <a href="https://instagram.com/USERNAME" target="_blank" rel="noopener noreferrer"
     aria-label="Instagram"
     class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <!-- Instagram SVG path -->
    </svg>
  </a>
  <a href="mailto:email@brianboy.ch"
     aria-label={t("footer.email.label")}
     class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
      <!-- Mail icon SVG path -->
    </svg>
  </a>
</div>
```

### SVG Icon Paths (Standard, Recognizable)

Source: [Simple Icons](https://simpleicons.org/) — standard brand SVG paths.

```html
<!-- GitHub -->
<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>

<!-- LinkedIn -->
<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>

<!-- X (Twitter) -->
<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>

<!-- Instagram -->
<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>

<!-- Email (outline style) -->
<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<img>` tags with manual optimization | Astro `<Image>` component | Astro 3.0+ (2023) | Automatic WebP, sizing, CLS prevention |
| Icon font libraries (Font Awesome) | Inline SVG with currentColor | 2020+ | No external requests, tree-shakeable, theme-aware |
| Separate JSON translation files | TypeScript translation map with type safety | Astro community pattern | Build-time type checking catches missing keys |
| `@astrojs/image` integration | Built-in `astro:assets` | Astro 3.0+ | No extra package needed |

**Deprecated/outdated:**
- **`@astrojs/image` package:** Replaced by built-in `astro:assets` in Astro 3.0+
- **Squoosh image service:** Removed in Astro 5.0, Sharp is now the only built-in option
- **Icon fonts (Font Awesome CDN):** Inline SVG is lighter, more accessible, and theme-compatible

## Open Questions

1. **Headshot image file**
   - What we know: The `<Image>` component needs a source file in `src/assets/images/`
   - What's unclear: Whether the user has a headshot ready to provide
   - Recommendation: Use a placeholder path (`src/assets/images/headshot.jpg`) in code; the user will need to provide the actual image file before build succeeds

2. **Actual social media URLs**
   - What we know: GitHub, LinkedIn, X, Instagram links are needed
   - What's unclear: Brian's actual usernames/URLs for these platforms
   - Recommendation: Use placeholder URLs that are easy to find-and-replace; or define them as constants

3. **Email address**
   - What we know: Mailto links needed in hero CTA and footer
   - What's unclear: Which email address to use
   - Recommendation: Define as a constant in one place (either ui.ts or a config file) so it's easy to update

4. **About page narrative content**
   - What we know: Music origin, COVID pivot, self-taught coding, agency co-ownership, SaaS arc
   - What's unclear: Exact wording and level of detail the user wants
   - Recommendation: Write draft content in translation keys; user will review and refine

5. **Work section external URLs**
   - What we know: Morntag, Eleno, Pressdify need links
   - What's unclear: Exact URLs (morntag.com? eleno.app? pressdify.com?)
   - Recommendation: Use reasonable domain guesses as placeholders; easy to update

## Sources

### Primary (HIGH confidence)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) - `<Image>` component usage, local image imports, optimization
- [Astro Image API Reference](https://docs.astro.build/en/reference/modules/astro-assets/) - Component props, responsive layout property
- Existing codebase: `src/i18n/ui.ts`, `src/pages/index.astro`, `src/components/Footer.astro` — established patterns to follow

### Secondary (MEDIUM confidence)
- [Simple Icons](https://simpleicons.org/) - Standard SVG paths for brand icons
- [Astro Upgrade to v5](https://docs.astro.build/en/guides/upgrade-to/v5/) - Squoosh removal, Sharp as default

### Tertiary (LOW confidence)
- [astro-icon](https://www.astroicon.dev/) - Considered but rejected for this small scope

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies, extending existing patterns
- Architecture: HIGH - Following established codebase conventions from Phase 1/2
- Pitfalls: HIGH - Well-understood content population patterns
- Code examples: HIGH - Based on existing codebase patterns and official Astro docs

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (30 days - stable technologies, no fast-moving dependencies)
