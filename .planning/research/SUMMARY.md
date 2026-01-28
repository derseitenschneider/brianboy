# Project Research Summary

**Project:** Brian Boy Personal Portfolio
**Domain:** Personal portfolio website (tech entrepreneur/musician)
**Researched:** 2026-01-28
**Confidence:** HIGH

## Executive Summary

This is a bilingual personal portfolio for a tech entrepreneur (Morntag co-owner, Eleno founder) who is also a musician. The research confirms that **Astro + Tailwind CSS + CSS-only animations** is the optimal stack for this use case. This combination ships zero JavaScript by default, has native i18n routing for German/English support, and outputs pure static files that deploy cleanly via FTP to Hostpoint. Reference portfolios (steipete.me, leerob.com) validate this approach.

The recommended architecture follows a component-based, layered pattern with three cross-cutting systems: theme management via CSS custom properties and `data-theme` attribute, bilingual support via Astro's built-in i18n routing (not client-side switching), and scroll animations via CSS + Intersection Observer. The key architectural decision is to use build-time page generation per locale (`/` for German default, `/en/` for English) rather than client-side translation switching, which improves SEO and eliminates JavaScript overhead.

The critical risks are SEO neglect (your name must rank when searched), bilingual hreflang misconfiguration (German and English versions competing against each other), and theme flash on page load (FOWT). All three are preventable with proper architecture decisions made early: Person schema markup from day one, proper hreflang on every page with `/de/` and `/en/` URL structure, and a blocking inline script in `<head>` to apply theme before render.

## Key Findings

### Recommended Stack

Astro 5.x is the clear winner for a bilingual static portfolio. It ships zero JavaScript by default, has native i18n routing, and outputs pure HTML/CSS that deploys via FTP without configuration. Tailwind CSS 4.x provides excellent dark mode support via `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))` and keeps styling consistent across components.

**Core technologies:**
- **Astro 5.x**: Static site generator with native i18n routing, zero JS by default
- **Tailwind CSS 4.x**: Utility-first CSS with built-in dark mode, ~16KB production CSS
- **CSS + Intersection Observer**: Scroll reveals without animation libraries (0KB added)
- **@astrojs/sitemap**: Automatic sitemap generation for SEO
- **SamKirkland/FTP-Deploy-Action v4.3.6**: GitHub Actions FTP deployment to Hostpoint

**Critical version requirements:** Astro 5.x for latest i18n features, Tailwind 4.x for new `@custom-variant` syntax.

### Expected Features

**Must have (table stakes):**
- Hero section with name, tagline, dual identity (tech + music)
- Responsive/mobile-first design (60%+ of traffic is mobile)
- Project showcase (Eleno, Pressdify) with external links
- Social links (GitHub, LinkedIn, Twitter/X, Instagram)
- Email contact (mailto: link, no form)
- Fast load time (<2.5s LCP)
- Basic SEO (meta tags, OpenGraph, structured data)
- Accessibility basics (semantic HTML, alt text, keyboard navigation)

**Should have (differentiators):**
- Dark/light theme toggle with system preference detection (tri-state)
- Bilingual support (German default, English alternate)
- Subtle scroll-reveal animations respecting reduced motion
- Music identity integration (visual elements, not audio autoplay)

**Defer indefinitely:**
- Blog, testimonials, CV, newsletter, analytics (explicitly excluded)
- Complex case studies (show, don't explain)
- Contact form (spam magnet, email link sufficient)

### Architecture Approach

The architecture follows a component-based, layered structure optimized for static generation. Three cross-cutting systems (theme, i18n, animation) sit above the component layer and broadcast state changes via CSS custom properties, data attributes, and CSS classes. Build-time page generation per locale (`/about` for German, `/en/about` for English) means each language gets its own static HTML with proper hreflang tags, eliminating the need for client-side translation.

**Major components:**
1. **Header/Nav** — Navigation, theme toggle, language switcher
2. **Hero** — First impression, social links, dual identity positioning
3. **Projects** — Portfolio showcase cards with external links
4. **About** — Bio, personal story, tech+music intersection
5. **Contact** — Email CTA, social links
6. **Footer** — Secondary nav, copyright

**Key patterns to follow:**
- CSS custom properties for all theme-sensitive values
- Blocking inline script in `<head>` to prevent theme flash (FOWT)
- Intersection Observer + CSS transitions for scroll reveals
- Mobile-first media queries
- Semantic HTML with JSON-LD Person schema

### Critical Pitfalls

1. **SEO Neglect** — Implement Person schema markup, unique meta tags, and alt text from day one. Your name search must return your portfolio, not LinkedIn.

2. **Bilingual hreflang Misconfiguration** — Use `/de/` and `/en/` URL structure with hreflang on every page, not just homepage. Include self-referencing tags and `x-default`. Do separate German keyword research.

3. **Theme Flash (FOWT)** — Add blocking inline script in `<head>` before CSS to read localStorage and apply `data-theme` attribute. Implement tri-state toggle (light/dark/system).

4. **Mobile Performance** — Set budget (LCP <2.5s, CLS <0.1), animate only `transform` and `opacity`, implement WebP with srcset, test on real mid-range Android device.

5. **Ignoring Reduced Motion** — Add `@media (prefers-reduced-motion: reduce)` from first animation. Never remove animations completely; reduce duration instead.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation
**Rationale:** Everything depends on base CSS variables, HTML structure, and build tooling. Performance architecture and semantic HTML must be established first.
**Delivers:** Working Astro project with Tailwind, base layout, CSS custom properties, semantic HTML skeleton
**Addresses:** Fast load time, accessibility basics, responsive layout foundation
**Avoids:** Performance architecture gaps (Pitfall 4), semantic HTML gaps (Pitfall 7)

### Phase 2: Core Systems
**Rationale:** Theme and i18n are cross-cutting concerns that affect all components. Building them before content components prevents rework.
**Delivers:** Working theme toggle (tri-state), bilingual URL structure, animation system
**Uses:** Astro i18n routing, CSS custom properties, Intersection Observer
**Implements:** Theme system, i18n layer, animation system
**Avoids:** Theme flash (Pitfall 3), hreflang misconfiguration (Pitfall 2)

### Phase 3: Navigation & Layout
**Rationale:** Navigation frame must work before filling in content sections. Header contains theme and language toggles.
**Delivers:** Header, footer, mobile navigation, responsive layout framework
**Addresses:** Navigation, theme toggle UX, language switcher UX
**Avoids:** SPA accessibility gaps (Pitfall 7), missing language detection (Pitfall 13)

### Phase 4: Content Sections
**Rationale:** With systems and navigation in place, content sections can be built with full functionality. Hero delivers fastest visual feedback.
**Delivers:** Hero, Projects, About, Contact sections for both languages
**Addresses:** All table stakes features, project showcase, social links, email contact
**Avoids:** Generic about page (Pitfall 11), no clear CTA (Pitfall 12)

### Phase 5: About Page
**Rationale:** About page reuses all systems and components from main page. Builds on established patterns.
**Delivers:** Dedicated about page with deeper personal story, tech+music intersection
**Addresses:** About page requirement, personal differentiation
**Avoids:** Generic copy (Pitfall 11)

### Phase 6: SEO & Polish
**Rationale:** SEO optimization and animation refinement happen after core functionality is complete. Allows full-site testing.
**Delivers:** Meta tags, OpenGraph, JSON-LD schema, sitemap, animation polish, accessibility audit
**Addresses:** SEO fundamentals, structured data, reduced motion support
**Avoids:** SEO neglect (Pitfall 1), reduced motion ignored (Pitfall 5)

### Phase 7: Deployment
**Rationale:** Deployment setup is last; needs complete site to test properly. GitHub Actions + FTP to Hostpoint.
**Delivers:** CI/CD pipeline, FTP deployment, cache-busting, production testing
**Uses:** SamKirkland/FTP-Deploy-Action, Astro build output
**Avoids:** Cache invalidation nightmare (Pitfall 6)

### Phase Ordering Rationale

- **Foundation before systems:** CSS variables and HTML structure are dependencies for everything else
- **Systems before components:** Theme and i18n affect all components; building them first prevents rework
- **Navigation before content:** Frame must work before filling in sections
- **Main page before about:** About page reuses components; establish patterns first
- **Polish after functionality:** SEO and animations are refinements, not foundations
- **Deployment last:** Needs complete site to test properly

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Core Systems):** i18n URL routing with Astro 5.x should be validated against latest docs; hreflang implementation is critical
- **Phase 7 (Deployment):** Hostpoint-specific FTP configuration may need validation

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Astro + Tailwind setup is well-documented
- **Phase 3 (Navigation):** Standard responsive navigation patterns
- **Phase 4 (Content Sections):** Straightforward component implementation
- **Phase 6 (SEO & Polish):** Well-documented SEO and accessibility patterns

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official Astro/Tailwind docs, validated by reference sites (steipete.me) |
| Features | HIGH | Cross-referenced multiple portfolio sources, explicit requirements clear |
| Architecture | HIGH | Established patterns, reference implementations available |
| Pitfalls | HIGH | Multiple authoritative sources (MDN, Deque, web.dev) |

**Overall confidence:** HIGH

### Gaps to Address

- **Hostpoint-specific configuration:** FTP server address, directory structure may need discovery during deployment phase
- **German keyword research:** SEO recommendations mention separate keyword research for German market; not done during research phase
- **Music identity visual design:** Creative direction for tech+music visual fusion not specified; needs design decisions during content phase

## Sources

### Primary (HIGH confidence)
- [Astro i18n Routing](https://docs.astro.build/en/guides/internationalization/) — Native internationalization
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode) — Theme toggle configuration
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — Accessibility
- [web.dev Theme Switch Patterns](https://web.dev/patterns/theming/theme-switch) — Theme implementation
- [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) — Deployment

### Secondary (MEDIUM confidence)
- [steipete.me GitHub](https://github.com/steipete/steipete.me) — Astro + Tailwind reference implementation
- [Seobility Multilingual SEO](https://www.seobility.net/en/blog/multilingual-seo-issues/) — hreflang patterns
- [Josh Comeau Reduced Motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/) — Animation accessibility
- [Brandur Dark Mode Notes](https://brandur.org/fragments/dark-mode-notes) — FOWT prevention

### Tertiary (LOW confidence)
- [Personal Branding SEO 2026](https://zumeirah.com/personal-branding-seo-strategy-2026/) — SEO claims should be validated

---
*Research completed: 2026-01-28*
*Ready for roadmap: yes*
