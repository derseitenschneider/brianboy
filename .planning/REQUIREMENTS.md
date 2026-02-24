# Requirements

**Project:** Brian Boy Portfolio
**Scoped:** 2026-01-28
**Version:** v1

## Core Requirements

| ID | Requirement | Priority | Complexity |
|----|-------------|----------|------------|
| REQ-001 | Homepage with condensed bio and work overview | Must | Low |
| REQ-002 | About page with expanded biography content | Must | Low |
| REQ-003 | Bilingual support (German default, English toggle) | Must | High |
| REQ-004 | Dark/light theme toggle with system preference | Must | Medium |
| REQ-005 | Project links: Eleno, Pressdify (name + one-liner + link) | Must | Low |
| REQ-006 | Venture mentions: Morntag, Eleno with equal billing | Must | Low |
| REQ-007 | Brief music mention in bio text (minimal) | Must | Low |
| REQ-008 | Origin story mention (COVID pivot from music to coding) | Must | Low |
| REQ-009 | Social links: GitHub, LinkedIn, Twitter/X, Instagram | Must | Low |
| REQ-010 | Email contact via mailto link | Must | Low |
| REQ-011 | Headshot photo | Must | Low |
| REQ-012 | Mobile-first responsive design | Must | Medium |
| REQ-013 | SEO optimized (structured data, meta tags, hreflang) | Must | Medium |
| REQ-014 | Tasteful animations (hover effects, scroll reveals) | Should | Medium |
| REQ-015 | Sans-serif typography (clean, modern) | Must | Low |
| REQ-016 | Clean, timeless, modern aesthetic | Must | Medium |
| REQ-017 | FTP deployment via GitHub Actions to Hostpoint | Must | Medium |

## Technical Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| REQ-T01 | Astro 5.x framework | Must | Zero JS by default, native i18n |
| REQ-T02 | Tailwind CSS 4.x | Must | Dark mode via custom variant |
| REQ-T03 | CSS-only animations (no heavy libs) | Should | Intersection Observer for scroll |
| REQ-T04 | Build-time i18n (not client-side) | Must | SEO-critical, proper hreflang |
| REQ-T05 | German at root (/), English at /en/ | Must | URL strategy |
| REQ-T06 | Theme toggle: system → user preference | Must | Blocking script to prevent flash |
| REQ-T07 | Static HTML output | Must | Required for FTP hosting |
| REQ-T08 | Fast loading (<3s LCP) | Must | SEO and UX critical |

## Out of Scope (v1)

- Blog/articles
- Newsletter signup
- Contact form
- Testimonials
- Detailed CV/resume
- Analytics/tracking
- Project screenshots/detailed case studies
- Detailed music section
- Morntag client work showcase

## Acceptance Criteria

### Homepage (REQ-001)
- [ ] Name prominently displayed
- [ ] One-sentence tagline/value proposition
- [ ] Links to ventures (Morntag, Eleno)
- [ ] Project cards (Eleno, Pressdify)
- [ ] Social links visible
- [ ] Contact email accessible
- [ ] Works in German and English

### About Page (REQ-002)
- [ ] Expanded version of homepage bio
- [ ] COVID pivot story mentioned
- [ ] Tech + music background integrated
- [ ] Headshot displayed
- [ ] Same language toggle as homepage

### Bilingual (REQ-003)
- [ ] German content at root (/)
- [ ] English content at /en/
- [ ] Language switcher visible on all pages
- [ ] Proper hreflang tags for SEO
- [ ] All content translated (not machine-only)

### Theme (REQ-004)
- [ ] Respects system preference on first visit
- [ ] Toggle persists user choice
- [ ] No flash of wrong theme on load
- [ ] Works across page navigation

### Deployment (REQ-017)
- [ ] Push to main triggers deploy
- [ ] FTP uploads to Hostpoint
- [ ] Cache busting for assets
- [ ] Zero-downtime deployment

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| REQ-001 | Phase 3 | Complete |
| REQ-002 | Phase 3 | Complete |
| REQ-003 | Phase 1 | Complete |
| REQ-004 | Phase 1 | Complete |
| REQ-005 | Phase 3 | Complete |
| REQ-006 | Phase 3 | Complete |
| REQ-007 | Phase 3 | Complete |
| REQ-008 | Phase 3 | Complete |
| REQ-009 | Phase 3 | Complete |
| REQ-010 | Phase 3 | Complete |
| REQ-011 | Phase 3 | Complete |
| REQ-012 | Phase 2 | Complete |
| REQ-013 | Phase 4 | Complete |
| REQ-014 | Phase 2 | Complete |
| REQ-015 | Phase 2 | Complete |
| REQ-016 | Phase 2 | Complete |
| REQ-017 | Phase 4 | Pending |
| REQ-T01 | Phase 1 | Complete |
| REQ-T02 | Phase 1 | Complete |
| REQ-T03 | Phase 1 | Complete |
| REQ-T04 | Phase 1 | Complete |
| REQ-T05 | Phase 1 | Complete |
| REQ-T06 | Phase 1 | Complete |
| REQ-T07 | Phase 1 | Complete |
| REQ-T08 | Phase 4 | Pending |

---
*Generated from research synthesis on 2026-01-28*
*Traceability added on 2026-01-28*
