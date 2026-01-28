---
phase: 01-foundation-core-systems
plan: 03
subsystem: i18n
tags: [astro, i18n, typescript, routing, bilingual]

# Dependency graph
requires:
  - phase: 01-02
    provides: Theme toggle and BaseLayout structure
provides:
  - Astro i18n configuration with German default
  - Translation helpers (getLangFromUrl, useTranslations, getLocalizedPath)
  - LanguageSwitch component
  - Bilingual page structure (/ and /en/)
affects: [02-layout, 03-content]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Astro i18n with prefixDefaultLocale: false"
    - "URL-based language detection"
    - "Translation strings in centralized ui.ts"

key-files:
  created:
    - src/i18n/ui.ts
    - src/components/LanguageSwitch.astro
    - src/pages/en/index.astro
  modified:
    - astro.config.mjs
    - src/layouts/BaseLayout.astro
    - src/pages/index.astro
    - src/components/ThemeToggle.astro

key-decisions:
  - "German at root (/) with no prefix, English at /en/"
  - "Translation strings in centralized src/i18n/ui.ts"
  - "URL-based language detection via getLangFromUrl helper"

patterns-established:
  - "i18n pattern: import getLangFromUrl, useTranslations from i18n/ui"
  - "Language-specific pages in src/pages/en/ subdirectory"
  - "Dynamic html lang attribute in BaseLayout"

# Metrics
duration: 3min
completed: 2026-01-28
---

# Phase 01 Plan 03: Bilingual Routing Summary

**Astro i18n with German at root (/), English at /en/, and accessible language switcher component**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-28T12:40:07Z
- **Completed:** 2026-01-28T12:43:00Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- Astro i18n configured with German as default locale (no /de/ prefix)
- Translation system with typed helpers for URL detection and path generation
- LanguageSwitch component with active state styling and aria-current
- Both German and English homepages with localized content

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure Astro i18n and create translation helpers** - `488d251` (feat)
2. **Task 2: Create LanguageSwitch component and update BaseLayout** - `4992937` (feat)
3. **Task 3: Create English page and update German page** - `da5a47d` (feat)

## Files Created/Modified
- `astro.config.mjs` - Added i18n configuration block
- `src/i18n/ui.ts` - Translation strings and typed helper functions
- `src/components/LanguageSwitch.astro` - Accessible language navigation
- `src/layouts/BaseLayout.astro` - Dynamic lang attribute and LanguageSwitch import
- `src/components/ThemeToggle.astro` - Added aria-label prop for i18n support
- `src/pages/index.astro` - German homepage with translations
- `src/pages/en/index.astro` - English homepage

## Decisions Made
- German at root with no prefix (prefixDefaultLocale: false) for clean Swiss-focused URLs
- Centralized translations in ui.ts for maintainability
- TypeScript strict typing on translation keys for compile-time safety
- URL-based language detection (no cookies/localStorage for SSG compatibility)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added aria-label prop to ThemeToggle**
- **Found during:** Task 2 (BaseLayout update)
- **Issue:** ThemeToggle had hardcoded English aria-label, needed i18n support
- **Fix:** Added optional aria-label prop with fallback to default
- **Files modified:** src/components/ThemeToggle.astro
- **Verification:** Component accepts translated aria-label from BaseLayout
- **Committed in:** 4992937 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Minor enhancement for accessibility i18n. No scope creep.

## Issues Encountered
None - plan executed smoothly.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Foundation complete: Astro scaffold, Tailwind, theme toggle, i18n
- Ready for Phase 2: Layout components (header, footer, navigation)
- All core systems in place for content development

---
*Phase: 01-foundation-core-systems*
*Completed: 2026-01-28*
