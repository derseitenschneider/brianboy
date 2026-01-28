# Architecture Patterns

**Domain:** Personal Portfolio Website (Tech Entrepreneur/Musician)
**Researched:** 2026-01-28
**Overall Confidence:** HIGH

## Recommended Architecture

A modern static portfolio site follows a **component-based, layered architecture** that separates concerns between content, presentation, and behavior. The structure is optimized for static generation while supporting dynamic features like theme toggling and language switching via client-side JavaScript.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Theme System │  │  i18n Layer  │  │  Animation System    │  │
│  │ (CSS Vars)   │  │ (JSON + JS)  │  │ (CSS + Intersection) │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                      │              │
│  ┌──────┴─────────────────┴──────────────────────┴───────────┐  │
│  │                    Component Layer                         │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌─────────┐  │  │
│  │  │ Header │ │  Hero  │ │Projects│ │ About  │ │ Contact │  │  │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └─────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                  │
│  ┌───────────────────────────┴───────────────────────────────┐  │
│  │                      Layout Layer                          │  │
│  │            (Base HTML structure, CSS Grid/Flexbox)         │  │
│  └────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                        Static Files                              │
│        (index.html, about.html, CSS, JS, images, fonts)         │
└─────────────────────────────────────────────────────────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With | Data Flow Direction |
|-----------|---------------|-------------------|---------------------|
| **Header/Nav** | Navigation, theme toggle, language toggle | Theme System, i18n Layer, all sections | Outbound events to systems |
| **Hero** | First impression, primary CTA, social links | i18n Layer, Animation System | Receives translations, triggers animations |
| **Projects/Work** | Portfolio showcase with filterable cards | i18n Layer, Animation System | Receives translations, scroll-triggered reveals |
| **About** | Bio, skills, story | i18n Layer | Receives translations |
| **Contact** | Contact form, social links, CTA | i18n Layer | Receives translations, form submission |
| **Footer** | Secondary nav, copyright, social | i18n Layer | Receives translations |
| **Theme System** | CSS variable management, preference persistence | LocalStorage, all styled elements | Broadcasts theme changes via CSS vars |
| **i18n Layer** | Language switching, content translation | LocalStorage, all text content | Broadcasts language to all components |
| **Animation System** | Scroll reveals, hover effects, transitions | Intersection Observer, DOM elements | Observes scroll, applies classes |

### Data Flow

1. **Page Load Flow:**
   ```
   Static HTML → Parse → Check LocalStorage (theme/lang) → Apply preferences → Initialize animations → Render
   ```

2. **Theme Toggle Flow:**
   ```
   User clicks toggle → Update CSS custom properties → Persist to LocalStorage → All components re-render via CSS cascade
   ```

3. **Language Toggle Flow:**
   ```
   User clicks toggle → Load translation JSON → Update DOM via data-i18n attributes → Persist preference → Update URL (optional)
   ```

4. **Scroll Animation Flow:**
   ```
   User scrolls → Intersection Observer fires → Add .revealed class → CSS transitions execute
   ```

## File/Folder Structure Recommendation

```
brianboy/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions FTP deployment
│
├── src/                            # Source files (pre-build)
│   ├── index.html                  # Main single page
│   ├── about.html                  # About page
│   │
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css           # CSS reset/normalize
│   │   │   ├── variables.css       # CSS custom properties (colors, spacing, fonts)
│   │   │   └── typography.css      # Font families, sizes, line heights
│   │   │
│   │   ├── components/
│   │   │   ├── header.css          # Header/nav styles
│   │   │   ├── hero.css            # Hero section
│   │   │   ├── projects.css        # Project cards/grid
│   │   │   ├── about.css           # About section
│   │   │   ├── contact.css         # Contact section/form
│   │   │   └── footer.css          # Footer styles
│   │   │
│   │   ├── utilities/
│   │   │   ├── animations.css      # Keyframes, scroll reveal classes
│   │   │   └── responsive.css      # Media/container queries
│   │   │
│   │   └── main.css                # Imports all CSS files
│   │
│   ├── js/
│   │   ├── theme.js                # Dark/light toggle logic
│   │   ├── i18n.js                 # Language switching logic
│   │   ├── animations.js           # Intersection Observer setup
│   │   ├── navigation.js           # Mobile menu, smooth scroll
│   │   └── main.js                 # Initialize all modules
│   │
│   ├── locales/
│   │   ├── en.json                 # English translations
│   │   └── de.json                 # German translations
│   │
│   └── assets/
│       ├── images/
│       │   ├── projects/           # Project screenshots/thumbnails
│       │   ├── profile/            # Profile photos
│       │   └── icons/              # Custom icons, favicons
│       └── fonts/                  # Self-hosted fonts (if any)
│
├── dist/                           # Build output (deployed via FTP)
│   └── [compiled/minified files]
│
├── .planning/                      # GSD planning documents
│   └── research/
│
├── package.json                    # Build scripts, dependencies
├── .gitignore
└── README.md
```

### Key Structural Decisions

**1. Flat Component CSS**
Keep component CSS files flat (not nested) for easier maintenance. Each file is self-contained and imports only from `base/`.

**2. JSON-Based i18n**
Use simple JSON files for translations rather than a heavy i18n library. For a bilingual site, this keeps bundle size minimal.

**3. Separated Source and Distribution**
The `src/` folder contains editable source files; `dist/` contains optimized build output. GitHub Actions builds and deploys `dist/` only.

**4. Asset Organization**
Images organized by purpose (projects, profile, icons) for easier management. Fonts self-hosted only if using non-Google fonts.

## Suggested Build Order (Dependencies)

Building components in this order respects dependencies and allows incremental testing:

### Phase 1: Foundation (No Dependencies)
```
1.1 Base CSS (reset, variables, typography)
1.2 Layout structure (HTML skeleton)
1.3 Build tooling setup (if using bundler)
```
**Rationale:** Everything depends on design tokens (CSS variables). Establish these first.

### Phase 2: Core Systems (Depends on Phase 1)
```
2.1 Theme System (CSS variables + toggle logic)
2.2 i18n System (JSON structure + switching logic)
2.3 Animation System (base classes + Intersection Observer)
```
**Rationale:** These cross-cutting concerns affect all components. Build them before components consume them.

### Phase 3: Layout & Navigation (Depends on Phases 1-2)
```
3.1 Header component (nav, toggles)
3.2 Footer component
3.3 Mobile navigation (hamburger menu)
3.4 Responsive layout framework
```
**Rationale:** Navigation frame must work before filling in sections.

### Phase 4: Content Sections (Depends on Phases 1-3)
```
4.1 Hero section (highest visual impact)
4.2 Projects/Work section (core portfolio functionality)
4.3 About section
4.4 Contact section
```
**Rationale:** These can be built in any order but Hero gives fastest visual feedback.

### Phase 5: About Page (Depends on Phases 1-4)
```
5.1 About page layout (reuses components from Phase 4)
5.2 About page specific content
```
**Rationale:** About page reuses header, footer, and systems from main page.

### Phase 6: Polish & Optimization (Depends on all above)
```
6.1 Animation refinement
6.2 SEO optimization (meta tags, structured data, sitemap)
6.3 Performance optimization (image compression, lazy loading)
6.4 Accessibility audit and fixes
```
**Rationale:** Polish happens after core functionality is complete.

### Phase 7: Deployment (Depends on all above)
```
7.1 GitHub Actions workflow
7.2 FTP deployment configuration
7.3 Production testing
```
**Rationale:** Deployment setup is last; needs complete site to test.

### Dependency Graph

```
Phase 1 ──┬──> Phase 2 ──┬──> Phase 3 ──┬──> Phase 4 ──> Phase 5
          │              │              │
          │              │              └──> Phase 6 ──> Phase 7
          │              │
          └──────────────┘
```

## Patterns to Follow

### Pattern 1: CSS Custom Properties for Theming
**What:** Define all colors, spacing, and theme-sensitive values as CSS custom properties in `:root` and `[data-theme="dark"]`.

**When:** Any value that changes between light/dark themes or that you want to be consistent across components.

**Example:**
```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-accent: #0066cc;
  --spacing-section: 5rem;
  --transition-base: 200ms ease;
}

[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #f5f5f5;
  --color-accent: #4da3ff;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color var(--transition-base), color var(--transition-base);
}
```

### Pattern 2: Data Attributes for i18n
**What:** Use `data-i18n` attributes to mark translatable content, with a simple JS function to swap content.

**When:** Any user-facing text that needs translation.

**Example:**
```html
<h1 data-i18n="hero.title">Welcome</h1>
<p data-i18n="hero.subtitle">I build things for the web</p>
```

```javascript
// locales/en.json
{
  "hero": {
    "title": "Welcome",
    "subtitle": "I build things for the web"
  }
}

// locales/de.json
{
  "hero": {
    "title": "Willkommen",
    "subtitle": "Ich baue Dinge fur das Web"
  }
}
```

### Pattern 3: Intersection Observer for Scroll Animations
**What:** Use native Intersection Observer API to trigger CSS classes when elements enter viewport.

**When:** Scroll reveal effects, lazy loading, analytics tracking.

**Example:**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target); // One-time animation
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
```

```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

### Pattern 4: Mobile-First Media Queries
**What:** Write base styles for mobile, then add complexity for larger screens.

**When:** All responsive styling.

**Example:**
```css
/* Base: Mobile styles */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Tablet */
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Pattern 5: Semantic HTML with Schema.org Structured Data
**What:** Use proper HTML5 semantic elements and JSON-LD structured data for SEO.

**When:** Page structure and metadata.

**Example:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Brian",
  "url": "https://brianboy.com",
  "sameAs": [
    "https://twitter.com/brianboy",
    "https://github.com/brianboy"
  ],
  "jobTitle": "Tech Entrepreneur & Musician"
}
</script>

<main>
  <article>
    <header>...</header>
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      ...
    </section>
  </article>
</main>
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Theme Flash on Load
**What:** User sees wrong theme briefly before JavaScript applies preference.

**Why bad:** Jarring visual experience, especially in dark rooms with a bright flash.

**Instead:** Use a small inline script in `<head>` (before CSS) to set `data-theme` attribute immediately based on localStorage or system preference:
```html
<script>
  const theme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

### Anti-Pattern 2: Language in URL Only
**What:** Storing language preference only in URL path (e.g., `/de/about`).

**Why bad:** For a small static site, this means duplicating all HTML files. Also loses preference when navigating to external links and returning.

**Instead:** Use client-side language switching with localStorage persistence. Keep single HTML files with data-i18n attributes. Use `lang` attribute on `<html>` for accessibility.

### Anti-Pattern 3: Heavy Animation Libraries for Simple Effects
**What:** Including GSAP, Framer Motion, or similar for basic fade-in effects.

**Why bad:** Adds 20-100KB to bundle for effects achievable in 20 lines of vanilla JS + CSS.

**Instead:** Use Intersection Observer + CSS transitions for scroll reveals. Reserve heavy libraries only if you need complex sequenced animations.

### Anti-Pattern 4: CSS-in-JS for Static Sites
**What:** Using styled-components, Emotion, or similar runtime CSS solutions.

**Why bad:** Runtime overhead, larger bundle, hydration complexity for what is fundamentally static content.

**Instead:** Use traditional CSS files (optionally with a preprocessor or Tailwind). Static sites benefit from static CSS.

### Anti-Pattern 5: Single Monolithic CSS File
**What:** One massive CSS file with thousands of lines.

**Why bad:** Hard to maintain, hard to find styles, hard to avoid specificity conflicts.

**Instead:** Organize CSS by component with clear naming conventions. Use CSS custom properties for shared values. Consider a build step to concatenate/minify for production.

## SEO Architecture Considerations

### Essential Elements

| Element | Purpose | Implementation |
|---------|---------|----------------|
| **Meta tags** | Basic SEO signals | Title, description, viewport in `<head>` |
| **Open Graph** | Social sharing | og:title, og:description, og:image |
| **Structured Data** | Rich snippets, AI visibility | JSON-LD Person schema |
| **Semantic HTML** | Content structure | Proper heading hierarchy, landmarks |
| **hreflang tags** | Language targeting | `<link rel="alternate" hreflang="de">` |
| **Sitemap** | Crawl guidance | sitemap.xml in root |
| **robots.txt** | Crawl rules | robots.txt in root |

### URL Structure

For a simple two-page site with bilingual support:
```
/                   # Main page (default language)
/about              # About page
```

Language handled client-side, not via URL paths. This keeps the site simpler and avoids duplicate content issues.

## Sources

- [steipete.me GitHub Repository](https://github.com/steipete/steipete.me) - Astro + Tailwind architecture reference
- [leerob/leerob.io](https://github.com/leerob/leerob.io) - Next.js portfolio architecture
- [CSS-Tricks Dark Mode Guide](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/) - Theme implementation patterns
- [web.dev Theme Switch Pattern](https://web.dev/patterns/theming/theme-switch) - Accessible theme toggle
- [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) - GitHub Actions FTP deployment
- [Smashing Magazine i18n for Static Sites](https://www.smashingmagazine.com/2020/11/internationalization-localization-static-sites/) - Bilingual architecture
- [Scroll-driven Animations](https://scroll-driven-animations.style/) - Modern CSS scroll animations
- [Schema.org Person](https://schema.org/Person) - Structured data for portfolio SEO
