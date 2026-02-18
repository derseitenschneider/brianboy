# Roadmap: Brian Boy Portfolio

## Overview

This roadmap delivers a bilingual personal portfolio website in 4 phases. We start by establishing the foundation with Astro, Tailwind, and core cross-cutting systems (theme toggle, i18n routing). Then we build the responsive layout and design system. With infrastructure in place, we populate content sections for both homepage and about page in both languages. Finally, we add SEO optimization and deploy via GitHub Actions to Hostpoint.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (e.g., 2.1): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Foundation + Core Systems** - Astro/Tailwind setup, theme toggle, i18n routing
- [x] **Phase 2: Layout + Design** - Responsive layout, typography, design tokens, animations
- [x] **Phase 3: Content** - Homepage, About page, all sections in both languages (completed 2026-02-18)
- [ ] **Phase 4: SEO + Deployment** - Meta tags, structured data, GitHub Actions, FTP deploy

## Phase Details

### Phase 1: Foundation + Core Systems
**Goal**: Working Astro project with theme toggle and bilingual URL structure
**Depends on**: Nothing (first phase)
**Requirements**: REQ-003, REQ-004, REQ-T01, REQ-T02, REQ-T03, REQ-T04, REQ-T05, REQ-T06, REQ-T07
**Success Criteria** (what must be TRUE):
  1. User can run `npm run dev` and see a working Astro site
  2. User can toggle between dark and light themes with no flash on page load
  3. User can visit `/` for German and `/en/` for English with language switcher working
  4. Theme preference persists across page navigation and browser sessions
  5. Build outputs static HTML files suitable for FTP deployment
**Plans**: 3 plans in 3 waves (sequential)

Plans:
- [x] 01-01-PLAN.md — Astro + Tailwind v4 project scaffold
- [x] 01-02-PLAN.md — Theme system (blocking script, toggle, persistence)
- [x] 01-03-PLAN.md — i18n routing (German root, English /en/, language switcher)

### Phase 2: Layout + Design
**Goal**: Complete responsive layout with navigation, design tokens, and animation system
**Depends on**: Phase 1
**Requirements**: REQ-012, REQ-014, REQ-015, REQ-016
**Success Criteria** (what must be TRUE):
  1. Site renders correctly on mobile (375px), tablet (768px), and desktop (1280px)
  2. Header with navigation, theme toggle, and language switcher is visible on all pages
  3. Footer with secondary navigation is visible on all pages
  4. Mobile navigation works via hamburger menu
  5. Hover and scroll-reveal animations work, respecting reduced motion preference
**Plans**: 2 plans in 2 waves (sequential)

Plans:
- [x] 02-01-PLAN.md — Design tokens, scroll-reveal CSS, Footer component
- [x] 02-02-PLAN.md — Header, Navigation, MobileMenu, BaseLayout integration

### Phase 3: Content
**Goal**: Complete homepage and about page with all content sections in German and English
**Depends on**: Phase 2
**Requirements**: REQ-001, REQ-002, REQ-005, REQ-006, REQ-007, REQ-008, REQ-009, REQ-010, REQ-011
**Success Criteria** (what must be TRUE):
  1. Homepage displays name, tagline, ventures (Morntag, Eleno), and projects (Eleno, Pressdify)
  2. About page shows expanded bio with COVID pivot story and music mention
  3. Headshot photo is displayed on about page
  4. Social links (GitHub, LinkedIn, Twitter/X, Instagram) are accessible
  5. Email contact works via mailto link
  6. All content exists in both German and English with proper translations
**Plans**: 3 plans in 2 waves (03-01 sequential, 03-02 + 03-03 parallel)

Plans:
- [ ] 03-01-PLAN.md — Translation strings, Hero component, WorkSection component, homepage rewrite
- [ ] 03-02-PLAN.md — About page with flowing bio narrative in both languages
- [ ] 03-03-PLAN.md — Footer social icon links and email mailto

### Phase 4: SEO + Deployment
**Goal**: Production-ready site with proper SEO and automated deployment
**Depends on**: Phase 3
**Requirements**: REQ-013, REQ-017, REQ-T08
**Success Criteria** (what must be TRUE):
  1. Each page has unique meta title, description, and OpenGraph tags
  2. Proper hreflang tags link German and English versions
  3. JSON-LD Person schema is present for Brian Boy
  4. Sitemap.xml is generated with all pages
  5. Push to main triggers GitHub Actions deploy to Hostpoint via FTP
  6. Page loads with LCP under 3 seconds
**Plans**: TBD

Plans:
- [ ] 04-01: Meta tags, OpenGraph, hreflang implementation
- [ ] 04-02: JSON-LD schema and sitemap
- [ ] 04-03: GitHub Actions + FTP deployment pipeline

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Core Systems | 3/3 | Complete | 2026-01-28 |
| 2. Layout + Design | 2/2 | Complete | 2026-01-28 |
| 3. Content | 0/3 | Complete    | 2026-02-18 |
| 4. SEO + Deployment | 0/3 | Not started | - |
