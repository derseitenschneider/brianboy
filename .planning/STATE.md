# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-28)

**Core value:** When someone searches "Brian Boy" they immediately understand who he is and feel confident reaching out
**Current focus:** All phases complete

## Current Position

Phase: 4 of 4 (SEO + Deploy)
Plan: 3 of 3 in current phase
Status: Phase 4 complete. All phases complete.
Last activity: 2026-02-24 — Completed 04-03-PLAN.md (GitHub Actions + FTP Deployment)

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 12
- Average duration: 1.9 min
- Total execution time: 25 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 3/3 | 8 min | 2.7 min |
| 2. Layout | 2/2 | 5 min | 2.5 min |
| 3. Content | 3/3 | 4 min | 1.3 min |
| 4. SEO + Deploy | 3/3 | 7.5 min | 2.5 min |

**Recent Trend:**
- Last 5 plans: 2 min, 3 min, 2 min, 3 min, 2 min
- Trend: Stable

*Updated after each plan completion*
| Phase 03 P02 | 1min | 1 tasks | 2 files |
| Phase 03 P03 | 1 | 1 tasks | 1 files |
| Phase 04 P01 | 4min | 2 tasks | 8 files |
| Phase 04 P02 | 0.5min | 1 tasks | 2 files |
| Phase 04 P03 | 3min | 2 tasks | 1 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Roadmap]: 4 phases for "quick" depth, research-suggested 7 phases compressed
- [Research]: Astro 5.x + Tailwind 4.x stack confirmed, CSS-only animations
- [Research]: Build-time i18n (German root, English /en/) for SEO
- [Plan]: Phase 1 split into 3 sequential plans (scaffold -> theme -> i18n)
- [01-01]: Used @tailwindcss/vite instead of deprecated @astrojs/tailwind
- [01-01]: CSS-first Tailwind config with @import and @theme directives
- [01-01]: data-theme attribute for dark mode (vs class='dark')
- [01-02]: ThemeScript uses is:inline to prevent Astro bundling/deferring
- [01-02]: Theme functions exposed on window for component access
- [01-02]: Icons toggle via Tailwind dark: classes (hidden dark:block pattern)
- [01-03]: German at root (/) with prefixDefaultLocale: false
- [01-03]: Translation strings centralized in src/i18n/ui.ts
- [01-03]: URL-based language detection via getLangFromUrl helper
- [02-01]: scroll-reveal class uses animation-timeline: view() with @supports fallback
- [02-01]: Nested @media inside @supports for proper CSS fallback cascade
- [02-01]: Footer uses getLocalizedPath for bilingual navigation links
- [02-02]: Navigation uses class:list for conditional active styling
- [02-02]: Header uses bg-white/95 with backdrop-blur-sm for glass effect
- [02-02]: MobileMenu uses document click listener for close-on-outside-click
- [02-02]: BaseLayout uses flex flex-col min-h-screen for sticky footer
- [03-01]: Work cards as clickable anchors with group hover for better UX
- [03-01]: Pressdify gets "Projekt" role label for visual consistency across 3 cards
- [03-01]: Hero CTA uses bg-accent-600 matching site accent color
- [03-03]: Two-row footer layout: nav+social on top, copyright below
- [03-03]: Inline SVG icons with fill=currentColor for automatic dark mode support
- [Phase 03-02]: Headshot centered at top of article with mb-12 spacing before narrative
- [Phase 03-02]: Manual text-lg leading-relaxed styling instead of @tailwindcss/typography prose
- [04-01]: Software Developer as brand identity term in both DE and EN (not Web-Entwickler)
- [04-01]: x-default hreflang points to German root as default locale
- [04-01]: JSON-LD sameAs URLs are placeholders pending user update
- [04-02]: de-CH hreflang locale for Swiss German in sitemap
- [04-02]: sitemap-index.xml referenced in robots.txt (@astrojs/sitemap default output)
- [Phase 04]: FTPS protocol for encrypted FTP transfers to Hostpoint
- [Phase 04]: SamKirkland/FTP-Deploy-Action@v4.3.6 for GitHub Actions FTP deployment

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-02-24
Stopped at: Completed 04-03-PLAN.md (GitHub Actions + FTP Deployment). All plans complete.
Resume file: None - project complete
