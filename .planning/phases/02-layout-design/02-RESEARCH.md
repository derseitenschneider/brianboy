# Phase 2: Layout + Design - Research

**Researched:** 2026-01-28
**Domain:** Responsive layout, navigation, CSS animations, typography with Tailwind v4
**Confidence:** HIGH

## Summary

This research covers the implementation of responsive layout, navigation components (header, footer, mobile menu), CSS-only animations (hover effects, scroll-reveal), and typography for a bilingual Astro 5.x site using Tailwind CSS v4.

The key finding is that **CSS scroll-driven animations (`animation-timeline: view()`) now have ~78% global browser support** (Chrome 115+, Edge 115+, Safari 26+), making them viable for production with a simple fallback. For mobile navigation, the Astro-recommended approach uses minimal JavaScript with a `<script>` tag for toggle functionality, which is more accessible than CSS-only checkbox hacks.

The established pattern for responsive layouts in Tailwind v4 remains mobile-first: unprefixed utilities apply to all screens, prefixed utilities (e.g., `md:`) apply at that breakpoint and above. The default breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px) align well with the requirements (375px mobile, 768px tablet, 1280px desktop).

**Primary recommendation:** Build mobile-first with Tailwind's default breakpoints; use minimal JS for mobile menu toggle (not CSS-only hacks); implement scroll-reveal with CSS `animation-timeline: view()` wrapped in `@supports` with instant-visible fallback; respect `prefers-reduced-motion` using Tailwind's `motion-safe:` variant.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | ^4.0.0 | Utility-first responsive CSS | Built-in responsive variants, motion-safe/reduce variants, @theme for tokens |
| @tailwindcss/vite | ^4.0.0 | Vite integration | Official v4 integration for Astro |
| Astro | ^5.16.0 | Framework | Zero JS by default, script handling for interactivity |

### Supporting (No Additional Dependencies Needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Native CSS | - | Scroll-driven animations | `animation-timeline: view()` for scroll-reveal effects |
| Native CSS | - | Hover transitions | Tailwind `transition-*` utilities |
| Native HTML/CSS | - | Sticky positioning | Tailwind `sticky top-0` utilities |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Minimal JS menu toggle | CSS-only checkbox hack | Checkbox hack has accessibility issues (not focusable, poor screen reader support) |
| CSS scroll-driven animations | IntersectionObserver + JS | More code, not needed with ~78% browser support |
| astro-navbar package | Custom header component | Extra dependency for simple use case; custom gives more control |
| Framer Motion / GSAP | CSS transitions | Overkill for hover effects; adds bundle size |

**Installation:**

No additional packages needed. Phase 1 stack is sufficient.

## Architecture Patterns

### Recommended Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro      # Updated: min-h-screen flex flex-col wrapper
├── components/
│   ├── Header.astro          # NEW: Sticky header with nav, mobile menu
│   ├── Footer.astro          # NEW: Footer with secondary nav
│   ├── Navigation.astro      # NEW: Desktop navigation links
│   ├── MobileMenu.astro      # NEW: Mobile hamburger menu
│   ├── ThemeToggle.astro     # Existing
│   ├── LanguageSwitch.astro  # Existing
│   └── ThemeScript.astro     # Existing
├── styles/
│   └── global.css            # Updated: animation keyframes, design tokens
└── pages/
    └── ...
```

### Pattern 1: Mobile-First Responsive Layout

**What:** Base styles target mobile (375px), then layer changes at larger breakpoints.

**When to use:** All layout decisions.

**Example:**
```html
<!-- Mobile: single column, Tablet+: two columns, Desktop: three columns -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  <!-- content -->
</div>

<!-- Mobile: stack vertically, Desktop: horizontal row -->
<header class="flex flex-col md:flex-row md:items-center md:justify-between">
  <!-- content -->
</header>
```

### Pattern 2: Sticky Header

**What:** Header stays fixed at top when scrolling.

**When to use:** Main site navigation.

**Example:**
```astro
---
// src/components/Header.astro
import Navigation from "./Navigation.astro";
import MobileMenu from "./MobileMenu.astro";
import ThemeToggle from "./ThemeToggle.astro";
import LanguageSwitch from "./LanguageSwitch.astro";
---

<header class="sticky top-0 z-40 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo/site name -->
      <a href="/" class="font-semibold text-lg">Brian</a>

      <!-- Desktop navigation (hidden on mobile) -->
      <nav class="hidden md:flex items-center gap-6">
        <Navigation />
      </nav>

      <!-- Right side: theme, language, mobile menu toggle -->
      <div class="flex items-center gap-2">
        <LanguageSwitch />
        <ThemeToggle />
        <MobileMenu class="md:hidden" />
      </div>
    </div>
  </div>
</header>
```

### Pattern 3: Flexbox Sticky Footer

**What:** Footer stays at bottom even with minimal content.

**When to use:** BaseLayout structure.

**Example:**
```astro
---
// src/layouts/BaseLayout.astro (structure)
---
<html lang={lang}>
  <head>...</head>
  <body class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Pattern 4: Mobile Menu with Minimal JS

**What:** Hamburger menu that toggles visibility using a small script.

**When to use:** Mobile navigation (< md breakpoint).

**Example:**
```astro
---
// src/components/MobileMenu.astro
import { getLangFromUrl, useTranslations } from "../i18n/ui";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<div class="md:hidden">
  <!-- Toggle button -->
  <button
    id="mobile-menu-button"
    type="button"
    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    aria-expanded="false"
    aria-controls="mobile-menu"
    aria-label={t("nav.menu")}
  >
    <!-- Hamburger icon -->
    <svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <!-- Close icon (hidden by default) -->
    <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Dropdown menu (hidden by default) -->
  <nav
    id="mobile-menu"
    class="hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg"
  >
    <div class="px-4 py-4 space-y-2">
      <a href="/" class="block py-2 hover:text-accent-500">{t("nav.home")}</a>
      <a href="/about" class="block py-2 hover:text-accent-500">{t("nav.about")}</a>
      <!-- Add more links as needed -->
    </div>
  </nav>
</div>

<script>
  const button = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  button?.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!isExpanded));
    menu?.classList.toggle('hidden');
    iconOpen?.classList.toggle('hidden');
    iconClose?.classList.toggle('hidden');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!button?.contains(e.target as Node) && !menu?.contains(e.target as Node)) {
      button?.setAttribute('aria-expanded', 'false');
      menu?.classList.add('hidden');
      iconOpen?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
    }
  });
</script>
```

### Pattern 5: CSS Scroll-Reveal Animation

**What:** Elements fade in as they enter viewport, using CSS-only `animation-timeline: view()`.

**When to use:** Content sections, cards, portfolio items.

**Example:**
```css
/* src/styles/global.css - add to existing file */

/* Scroll-reveal animation - only when browser supports AND user allows motion */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .scroll-reveal {
      opacity: 0;
      transform: translateY(20px);
      animation: reveal-up linear forwards;
      animation-timeline: view();
      animation-range: entry 0% cover 40%;
    }

    @keyframes reveal-up {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}

/* Fallback: always visible when no support or reduced motion preferred */
@supports not (animation-timeline: view()) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
  }
}
```

Usage in components:
```html
<section class="scroll-reveal">
  <h2>About Me</h2>
  <p>Content here...</p>
</section>
```

### Pattern 6: Hover Transitions with Motion Safety

**What:** Subtle hover effects that respect reduced motion preferences.

**When to use:** Interactive elements (buttons, cards, links).

**Example:**
```html
<!-- Button with hover effect -->
<button class="
  bg-accent-500 text-white px-4 py-2 rounded-lg
  transition-all duration-200 ease-out
  motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg
  hover:bg-accent-600
">
  Contact Me
</button>

<!-- Card with hover effect -->
<article class="
  bg-white dark:bg-gray-800 rounded-lg p-6 shadow
  transition-shadow duration-200
  motion-safe:hover:shadow-xl
">
  <h3>Project Title</h3>
  <p>Description...</p>
</article>

<!-- Link with underline animation -->
<a href="/about" class="
  relative inline-block
  after:content-[''] after:absolute after:bottom-0 after:left-0
  after:h-0.5 after:bg-current
  after:w-0 motion-safe:after:transition-all motion-safe:after:duration-200
  motion-safe:hover:after:w-full
">
  Learn more
</a>
```

### Anti-Patterns to Avoid

- **CSS-only checkbox hack for mobile menu:** Poor accessibility - checkbox not focusable by default, confusing for screen readers. Use minimal JS instead.

- **Animating width/height/layout properties:** These trigger layout recalculations. Only animate `transform` and `opacity` for smooth performance.

- **Forgetting motion-reduce:** Always wrap animations in `motion-safe:` or provide `motion-reduce:` overrides to respect user preferences.

- **Using `fixed` instead of `sticky` for header:** `fixed` removes element from flow, requiring padding compensation. `sticky` is simpler and more predictable.

- **Missing fallback for scroll-driven animations:** Firefox still requires a flag; ~22% of users won't see animations. Ensure content is visible without animation.

- **Excessive z-index values:** Use a consistent scale (10, 20, 30, 40, 50). Header at z-40, mobile menu dropdown at z-30.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive breakpoints | Custom media queries | Tailwind `sm:`, `md:`, `lg:`, `xl:` variants | Consistent, tested breakpoints |
| Sticky positioning | JavaScript scroll listeners | CSS `position: sticky` | Native, performant, no JS needed |
| Reduced motion support | Custom JS detection | Tailwind `motion-safe:`, `motion-reduce:` | Built-in, SSR-friendly |
| Footer at bottom | Custom flexbox CSS | `min-h-screen flex flex-col` + `flex-1` | Established pattern |
| Scroll animations | IntersectionObserver library | CSS `animation-timeline: view()` | Native, no dependencies, performant |
| Z-index management | Ad-hoc values | Tailwind scale (z-10, z-20, z-30, z-40, z-50) | Predictable layering |

**Key insight:** Tailwind v4's utility classes and CSS's modern features (sticky, scroll-driven animations, motion queries) eliminate the need for animation libraries or complex JavaScript. The only JS needed is minimal: mobile menu toggle (~20 lines).

## Common Pitfalls

### Pitfall 1: Mobile-First Confusion

**What goes wrong:** Styling for desktop first, then trying to override for mobile using `sm:` prefix.

**Why it happens:** Developers think `sm:` means "small screens" when it actually means "640px and above."

**How to avoid:** Always write mobile styles first (unprefixed), then add larger breakpoint overrides.

```html
<!-- WRONG: sm: only kicks in at 640px+ -->
<div class="sm:flex">Won't flex on mobile!</div>

<!-- CORRECT: flex by default, stack on larger screens if needed -->
<div class="flex flex-col md:flex-row">Stacks on mobile, row on tablet+</div>
```

**Warning signs:** Layout looks broken on phones but fine on desktop.

### Pitfall 2: Forgetting Backdrop for Sticky Header

**What goes wrong:** Content shows through sticky header when scrolling, making text unreadable.

**Why it happens:** Sticky header has transparent background.

**How to avoid:** Add solid background with slight transparency and `backdrop-blur-sm` for polish:

```html
<header class="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
```

**Warning signs:** Text overlapping in header area when scrolling.

### Pitfall 3: Animation Without Fallback

**What goes wrong:** Content invisible or stuck in initial state in Firefox or older browsers.

**Why it happens:** `animation-timeline: view()` not supported; element stays at `opacity: 0`.

**How to avoid:** Always wrap in `@supports` with explicit fallback:

```css
@supports not (animation-timeline: view()) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
  }
}
```

**Warning signs:** Empty sections in Firefox, content only appears when scrolling in Chrome.

### Pitfall 4: Mobile Menu Accessibility

**What goes wrong:** Screen readers can't navigate mobile menu; focus doesn't trap in menu.

**Why it happens:** Missing `aria-expanded`, `aria-controls`, improper focus management.

**How to avoid:** Include ARIA attributes and toggle them with JS:

```html
<button aria-expanded="false" aria-controls="mobile-menu">
<nav id="mobile-menu" class="hidden">
```

**Warning signs:** Lighthouse accessibility warnings, keyboard users can tab through hidden menu items.

### Pitfall 5: Z-Index Wars

**What goes wrong:** Dropdown appears behind header, or modal appears behind everything.

**Why it happens:** Ad-hoc z-index values without a system.

**How to avoid:** Establish a layering system:

| Layer | Z-Index | Use For |
|-------|---------|---------|
| Base content | z-0 | Default |
| Elevated cards | z-10 | Hover states |
| Dropdowns | z-20 | Navigation dropdowns |
| Sticky header | z-40 | Main navigation |
| Mobile menu overlay | z-50 | Full-screen mobile menu |

**Warning signs:** Adding `z-[9999]` to make something appear.

## Code Examples

Verified patterns from official sources:

### Design Tokens in @theme

```css
/* src/styles/global.css - enhanced tokens for layout/design phase */
@import "tailwindcss";

/* Dark mode using data-theme attribute (from Phase 1) */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

/* Theme tokens */
@theme {
  /* Colors */
  --color-accent-500: #0066cc;
  --color-accent-400: #4da3ff;
  --color-accent-600: #0052a3;

  /* Typography - clean sans-serif */
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;

  /* Spacing scale (if customization needed) */
  /* --spacing-18: 4.5rem; */

  /* Transitions */
  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --default-transition-duration: 150ms;
}

/* Theme transition (from Phase 1) */
html {
  transition: background-color 200ms ease, color 200ms ease;
}

html:not([data-theme]) * {
  transition: none !important;
}

/* Scroll-reveal animation */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .scroll-reveal {
      opacity: 0;
      transform: translateY(20px);
      animation: reveal-up linear forwards;
      animation-timeline: view();
      animation-range: entry 0% cover 40%;
    }

    @keyframes reveal-up {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}

/* Fallbacks for scroll-reveal */
@supports not (animation-timeline: view()) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
```

### Complete BaseLayout Structure

```astro
---
// src/layouts/BaseLayout.astro
import "../styles/global.css";
import ThemeScript from "../components/ThemeScript.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import { getLangFromUrl, useTranslations } from "../i18n/ui";

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <ThemeScript />
  </head>
  <body class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Footer Component

```astro
---
// src/components/Footer.astro
import { getLangFromUrl, useTranslations, getLocalizedPath } from "../i18n/ui";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const currentYear = new Date().getFullYear();
---

<footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <!-- Secondary navigation -->
      <nav class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
        <a href={getLocalizedPath(lang, "")} class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          {t("nav.home")}
        </a>
        <a href={getLocalizedPath(lang, "about")} class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          {t("nav.about")}
        </a>
        <!-- Add more links as needed -->
      </nav>

      <!-- Copyright -->
      <p class="text-sm text-gray-500 dark:text-gray-500">
        &copy; {currentYear} Brian. {t("footer.rights")}
      </p>
    </div>
  </div>
</footer>
```

### Responsive Navigation Links

```astro
---
// src/components/Navigation.astro
import { getLangFromUrl, useTranslations, getLocalizedPath } from "../i18n/ui";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const currentPath = Astro.url.pathname;

const links = [
  { href: "", label: t("nav.home") },
  { href: "about", label: t("nav.about") },
  // Add more links as needed
];
---

{links.map(({ href, label }) => {
  const fullHref = getLocalizedPath(lang, href);
  const isActive = currentPath === fullHref || currentPath === `${fullHref}/`;

  return (
    <a
      href={fullHref}
      class:list={[
        "text-sm font-medium transition-colors",
        isActive
          ? "text-accent-500 dark:text-accent-400"
          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100",
      ]}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </a>
  );
})}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| IntersectionObserver for scroll reveal | CSS `animation-timeline: view()` | 2024-2025 | No JS needed, ~78% browser support |
| CSS checkbox hack for mobile menu | Minimal JS toggle | Best practice | Better accessibility |
| JavaScript scroll listeners | CSS `position: sticky` | 2018+ (now universal) | No JS needed, simpler code |
| Manual media queries | Tailwind responsive variants | Tailwind v1+ | Consistent breakpoints |
| `@apply` heavy styles | Utility classes in markup | Tailwind v3+ recommendation | Better performance, treeshaking |

**Deprecated/outdated:**

- **jQuery for animations:** Native CSS handles most use cases
- **Position: fixed + padding hack for sticky headers:** `position: sticky` is simpler
- **Large animation libraries for simple effects:** CSS transitions and animations sufficient
- **CSS-only hamburger menus (checkbox hack):** Accessibility issues make minimal JS preferred

## Open Questions

Things that couldn't be fully resolved:

1. **Firefox scroll-driven animation support**
   - What we know: Firefox requires `layout.css.scroll-driven-animations.enabled` flag (not enabled by default as of v150)
   - What's unclear: When Firefox will enable by default
   - Recommendation: Use `@supports` with visible fallback; ~78% support is acceptable for progressive enhancement

2. **View Transitions interaction with mobile menu**
   - What we know: If View Transitions are added later, `astro:page-load` event may be needed to reinitialize menu
   - What's unclear: Exact behavior with our current implementation
   - Recommendation: Test if View Transitions are added; may need event listener

3. **Exact scroll-reveal timing preferences**
   - What we know: `animation-range: entry 0% cover 40%` is a common pattern
   - What's unclear: What feels best for this specific site
   - Recommendation: Implement with reasonable defaults, fine-tune based on design review

## Sources

### Primary (HIGH confidence)

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Mobile-first breakpoints, v4 customization
- [Tailwind CSS Transition Property](https://tailwindcss.com/docs/transition-property) - v4 transition utilities
- [Tailwind CSS Position](https://tailwindcss.com/docs/position) - Sticky positioning
- [Tailwind CSS Font Family](https://tailwindcss.com/docs/font-family) - Typography tokens in @theme
- [MDN CSS Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) - animation-timeline specification
- [Astro Tutorial: Client-Side Scripts](https://docs.astro.build/en/tutorial/3-components/4/) - Menu interactivity pattern
- [Can I Use: animation-timeline view()](https://caniuse.com/mdn-css_properties_animation-timeline_view) - 77.96% global support

### Secondary (MEDIUM confidence)

- [Chrome Developers: Scroll-Driven Animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) - Implementation patterns
- [Smashing Magazine: CSS Scroll-Driven Animations](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/) - Practical guide
- [Epic Web Dev: Motion Safe/Reduce](https://www.epicweb.dev/tips/motion-safe-and-motion-reduce-modifiers) - Accessibility patterns
- [Web3Templates: Astro Navigation](https://web3templates.com/blog/create-responsive-navigation-menu-in-astro-javascript) - Mobile menu pattern

### Tertiary (LOW confidence)

- [DEV Community: Sticky Footer](https://dev.to/timosville/sticky-footer-using-tailwind-css-225p) - Flexbox pattern confirmation
- [Masuga: Flexbox Sticky Footer](https://www.gomasuga.com/blog/creating-a-sticky-footer-with-tailwind) - Pattern verification

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Using existing Phase 1 stack, no new dependencies
- Architecture: HIGH - Patterns from official Tailwind and Astro documentation
- Pitfalls: HIGH - Well-documented issues with established solutions
- Code examples: HIGH - Adapted from official docs with modern practices

**Research date:** 2026-01-28
**Valid until:** 2026-02-28 (30 days - stable technologies, CSS scroll-driven animations maturing)
