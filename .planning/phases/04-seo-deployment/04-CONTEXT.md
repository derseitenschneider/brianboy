# Phase 4: SEO + Deployment - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Production-ready site with proper SEO metadata (meta tags, OpenGraph, hreflang, JSON-LD), sitemap generation, and automated deployment via GitHub Actions to Hostpoint FTP. Also update homepage subheading to reflect "Software Developer & Musician" identity.

</domain>

<decisions>
## Implementation Decisions

### Meta Tags & OpenGraph
- Homepage title (DE): "Brian Boy | Software Developer & Musiker"
- Homepage title (EN): "Brian Boy | Software Developer & Musician"
- Meta descriptions should focus on identity ("who he is") rather than ventures
- OG image: reuse existing headshot photo
- Each page gets unique meta title and description in both languages

### Structured Data (JSON-LD Person)
- Job title: "Software Developer & Musician"
- worksFor / affiliation: both Morntag and Eleno
- sameAs: all four social profiles (GitHub, LinkedIn, Twitter/X, Instagram)
- Domain: https://brianboy.ch

### Deployment
- Trigger: push to main only (no manual trigger)
- Pipeline: build first (npm run build), then deploy — fail if build fails
- FTP credentials: user has them, will add as GitHub secrets
- Deploy target: root of brianboy.ch (no subdirectory)

### Sitemap & Hreflang
- Use Astro's @astrojs/sitemap integration
- hreflang x-default: German (root /)
- Canonical URLs: https://brianboy.ch (no www)
- robots.txt: allow all crawlers

### Identity Update
- Site-wide identity: "Software Developer & Musician" (not "Tech Entrepreneur")
- Applies to: SEO metadata, homepage subheading, structured data
- DE equivalent: "Software Developer & Musiker"

### Claude's Discretion
- Meta description copywriting (within "identity focus" direction)
- About page meta title/description wording
- Exact JSON-LD schema structure and optional properties
- GitHub Actions workflow naming and job structure
- FTP upload strategy (full sync vs incremental)

</decisions>

<specifics>
## Specific Ideas

- Identity is "Software Developer & Musician" — not "Tech Entrepreneur"
- German meta title uses "Musiker" not "Musician"
- Site is Swiss-based, German as default/x-default makes sense
- Keep URLs clean without www prefix

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-seo-deployment*
*Context gathered: 2026-02-24*
