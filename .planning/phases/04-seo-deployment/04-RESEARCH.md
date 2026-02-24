# Phase 4: SEO + Deployment - Research

**Researched:** 2026-02-24
**Domain:** SEO metadata, structured data, sitemap generation, CI/CD FTP deployment
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Homepage title (DE): "Brian Boy | Software Developer & Musiker"
- Homepage title (EN): "Brian Boy | Software Developer & Musician"
- Meta descriptions should focus on identity ("who he is") rather than ventures
- OG image: reuse existing headshot photo
- Each page gets unique meta title and description in both languages
- JSON-LD Person with jobTitle "Software Developer & Musician"
- worksFor / affiliation: both Morntag and Eleno
- sameAs: all four social profiles (GitHub, LinkedIn, Twitter/X, Instagram)
- Domain: https://brianboy.ch
- Deployment trigger: push to main only (no manual trigger)
- Pipeline: build first (npm run build), then deploy — fail if build fails
- FTP credentials: user has them, will add as GitHub secrets
- Deploy target: root of brianboy.ch (no subdirectory)
- Use Astro's @astrojs/sitemap integration
- hreflang x-default: German (root /)
- Canonical URLs: https://brianboy.ch (no www)
- robots.txt: allow all crawlers
- Site-wide identity: "Software Developer & Musician" (not "Tech Entrepreneur")
- DE equivalent: "Software Developer & Musiker"

### Claude's Discretion
- Meta description copywriting (within "identity focus" direction)
- About page meta title/description wording
- Exact JSON-LD schema structure and optional properties
- GitHub Actions workflow naming and job structure
- FTP upload strategy (full sync vs incremental)

### Deferred Ideas (OUT OF SCOPE)
None
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| REQ-013 | SEO optimized (structured data, meta tags, hreflang) | SEO component pattern in BaseLayout, JSON-LD Person schema, @astrojs/sitemap i18n config for hreflang |
| REQ-017 | FTP deployment via GitHub Actions to Hostpoint | SamKirkland/FTP-Deploy-Action@v4.3.6 with FTPS protocol, GitHub secrets for credentials |
| REQ-T08 | Fast loading (<3s LCP) | Astro static output is inherently fast; OG image in public/ avoids build processing; font preconnect already in place |
</phase_requirements>

## Summary

This phase adds production SEO metadata, structured data, sitemap generation with hreflang, and automated FTP deployment. The existing codebase is well-structured for this work: `BaseLayout.astro` already accepts `title` and `description` props, `@astrojs/sitemap` is already installed and configured, and the `site` URL is set to `https://brianboy.ch`.

The main work involves: (1) extending BaseLayout's `<head>` with OpenGraph, canonical, and hreflang tags, (2) adding JSON-LD Person structured data, (3) configuring the sitemap integration's i18n options for hreflang in the sitemap XML, (4) creating a static robots.txt, (5) updating the identity strings from "Tech Entrepreneur" to "Software Developer", and (6) setting up a GitHub Actions workflow for FTP deployment.

**Primary recommendation:** Build all SEO metadata directly in BaseLayout.astro (no third-party SEO component needed — the site has only 4 pages). Use SamKirkland/FTP-Deploy-Action for deployment — it is the most popular and well-maintained FTP GitHub Action with built-in state tracking for incremental deploys.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @astrojs/sitemap | ^3.0.0 | Sitemap XML generation with hreflang | Already installed; official Astro integration |
| SamKirkland/FTP-Deploy-Action | v4.3.6 | GitHub Actions FTP deployment | 2.5k+ stars, maintained, built-in incremental sync via state file |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | — | — | Site is 4 pages; no astro-seo package required |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-coded meta tags | astro-seo package | Adds dependency for 4 pages; hand-coded is simpler and more explicit |
| SamKirkland/FTP-Deploy-Action | lftp direct in workflow | More control but requires manual state tracking; FTP-Deploy-Action handles incremental sync automatically |
| Static robots.txt | astro-robots-txt integration | Overkill for a simple "allow all" robots.txt; static file in public/ is sufficient |

**Installation:**
No new packages needed. @astrojs/sitemap is already installed. The GitHub Action is referenced in the workflow YAML, not installed via npm.

## Architecture Patterns

### Recommended Changes to Project Structure
```
src/
├── layouts/
│   └── BaseLayout.astro    # MODIFY: add OG, canonical, hreflang, JSON-LD to <head>
├── components/
│   └── Hero.astro           # MODIFY: update tagline from "Tech Entrepreneur" to "Software Developer"
├── i18n/
│   └── ui.ts                # MODIFY: update identity strings
├── pages/
│   ├── index.astro          # MODIFY: update title/description props
│   ├── about.astro          # MODIFY: update title/description props
│   └── en/
│       ├── index.astro      # MODIFY: update title/description props
│       └── about.astro      # MODIFY: update title/description props
public/
├── robots.txt               # NEW: static robots.txt
├── og-image.jpg             # NEW: copy of headshot for OG (placed in public/ for static URL)
.github/
└── workflows/
    └── deploy.yml           # NEW: GitHub Actions workflow
astro.config.mjs             # MODIFY: add sitemap i18n config
```

### Pattern 1: SEO Props in BaseLayout
**What:** Extend BaseLayout Props interface to accept all SEO metadata, then render it in `<head>`
**When to use:** Every page passes its unique SEO data through layout props

```typescript
// BaseLayout.astro frontmatter
interface Props {
  title: string;
  description: string;
  ogTitle?: string;      // Falls back to title
  ogDescription?: string; // Falls back to description
  ogImage?: string;       // Falls back to default OG image
  ogType?: string;        // Falls back to "website"
  canonicalUrl?: string;  // Falls back to Astro.url
  noindex?: boolean;
}
```

### Pattern 2: Hreflang Tags via Helper
**What:** Generate hreflang link tags by computing the alternate-language URL for each page
**When to use:** In BaseLayout `<head>`, on every page

```astro
---
// In BaseLayout.astro
import { getLocalizedPath } from "../i18n/ui";

const currentPath = Astro.url.pathname;
const lang = getLangFromUrl(Astro.url);
const alternateLang = lang === "de" ? "en" : "de";
const canonicalUrl = new URL(currentPath, Astro.site).href;
const alternateUrl = new URL(getLocalizedPath(alternateLang, currentPath), Astro.site).href;
const deUrl = lang === "de" ? canonicalUrl : alternateUrl;
---
<link rel="canonical" href={canonicalUrl} />
<link rel="alternate" hreflang="de" href={deUrl} />
<link rel="alternate" hreflang="en" href={lang === "en" ? canonicalUrl : alternateUrl} />
<link rel="alternate" hreflang="x-default" href={deUrl} />
```

### Pattern 3: JSON-LD in BaseLayout
**What:** Add Person schema as a `<script type="application/ld+json">` tag on every page (or just the homepage)
**When to use:** Placed in BaseLayout `<head>` so it appears site-wide

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Brian Boy",
  "url": "https://brianboy.ch",
  "image": "https://brianboy.ch/og-image.jpg",
  "jobTitle": "Software Developer & Musician",
  "worksFor": [
    {
      "@type": "Organization",
      "name": "morntag",
      "url": "https://morntag.com"
    },
    {
      "@type": "Organization",
      "name": "Eleno",
      "url": "https://eleno.net"
    }
  ],
  "sameAs": [
    "https://github.com/brianboy",
    "https://linkedin.com/in/brianboy",
    "https://x.com/brianboy",
    "https://instagram.com/brianboy"
  ]
})} />
```

Note: The exact social URLs need to be confirmed with the user. Placeholders shown above.

### Pattern 4: OpenGraph Meta Tags
**What:** Standard OG tags in `<head>` for social sharing previews
**When to use:** Every page

```astro
<!-- OpenGraph -->
<meta property="og:title" content={ogTitle || title} />
<meta property="og:description" content={ogDescription || description} />
<meta property="og:type" content={ogType || "website"} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={new URL("/og-image.jpg", Astro.site).href} />
<meta property="og:site_name" content="Brian Boy" />
<meta property="og:locale" content={lang === "de" ? "de_CH" : "en"} />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={ogTitle || title} />
<meta name="twitter:description" content={ogDescription || description} />
<meta name="twitter:image" content={new URL("/og-image.jpg", Astro.site).href} />
```

### Anti-Patterns to Avoid
- **Duplicate meta descriptions across pages:** Each page MUST have unique description. The current site passes the same `site.description` for both homepages — this needs per-page descriptions.
- **Missing canonical URLs:** Without canonical tags, search engines may treat `/` and `/index.html` as separate pages.
- **hreflang without x-default:** Always include x-default to handle unmatched locales. Decision: x-default points to German (root `/`).
- **OG image via Astro image pipeline:** Don't use `astro:assets` for the OG image — social media crawlers need a stable, absolute URL. Place the image in `public/` for a predictable path.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap XML | Custom XML generator | @astrojs/sitemap (already installed) | Handles pagination, hreflang links, proper XML namespaces |
| FTP sync state | Manual file tracking | SamKirkland/FTP-Deploy-Action state file | Tracks which files changed; avoids re-uploading everything |
| hreflang in sitemap | Manual sitemap entries | @astrojs/sitemap i18n option | Generates proper xhtml:link elements automatically |

**Key insight:** The site has only 4 pages (2 routes x 2 languages). All meta tags can be written directly in the layout without abstractions. The complexity is in getting the values right, not in the rendering mechanism.

## Common Pitfalls

### Pitfall 1: @astrojs/sitemap i18n Config Mismatch
**What goes wrong:** Sitemap generates incorrect hreflang links because locale keys don't match the actual URL structure.
**Why it happens:** The sitemap i18n expects locale keys that match URL path segments. With `prefixDefaultLocale: false`, German pages have no prefix, but the sitemap config still needs to know about both locales.
**How to avoid:** Configure sitemap i18n with `defaultLocale: 'de'` and `locales: { de: 'de-CH', en: 'en' }`. The locale keys must match what Astro's i18n routing uses.
**Warning signs:** Build the sitemap and inspect `dist/sitemap-0.xml` to verify hreflang links point to correct URLs.

### Pitfall 2: OG Image Path Issues
**What goes wrong:** Social media previews show broken images or no image.
**Why it happens:** OG image URL must be absolute (https://brianboy.ch/og-image.jpg), not relative. If the image goes through Astro's image pipeline, the filename gets a hash that changes each build.
**How to avoid:** Place the OG image in `public/` directory as a static file. Use `new URL("/og-image.jpg", Astro.site).href` to generate the absolute URL.
**Warning signs:** Test with Facebook's Sharing Debugger or Twitter Card Validator after deployment.

### Pitfall 3: FTP Deploy State File Conflicts
**What goes wrong:** FTP-Deploy-Action uploads everything on every push, or skips files it shouldn't.
**Why it happens:** The action uses a `.ftp-deploy-sync-state.json` file on the server to track state. First deploy has no state file, so it uploads everything (expected). Problems arise if the state file gets deleted or corrupted.
**How to avoid:** Let the action manage its state file. Don't manually delete files on the server. If a full re-upload is needed, use the `dangerous-clean-slate` option once.
**Warning signs:** Deployments taking much longer than expected (re-uploading everything).

### Pitfall 4: FTPS vs FTP Protocol
**What goes wrong:** Connection refused or timeout on Hostpoint.
**Why it happens:** Many hosting providers require FTPS (encrypted) rather than plain FTP. Default protocol in the action is FTP (unencrypted).
**How to avoid:** Set `protocol: ftps` in the workflow. Hostpoint likely supports FTPS on port 21. If connection fails, try `security: loose` to accept self-signed certificates (common with shared hosting).
**Warning signs:** Workflow fails with connection timeout or SSL errors.

### Pitfall 5: Missing `site` in Astro Config
**What goes wrong:** Sitemap generates relative URLs, canonical URLs are wrong.
**Why it happens:** `Astro.site` returns undefined if `site` is not set in `astro.config.mjs`.
**How to avoid:** Already handled — the config has `site: "https://brianboy.ch"`. Just verify it stays there.
**Warning signs:** Sitemap URLs starting with `undefined/` or missing protocol.

### Pitfall 6: Identity Strings Not Fully Updated
**What goes wrong:** Some pages still show "Tech Entrepreneur" while others say "Software Developer."
**Why it happens:** The identity string appears in multiple places: ui.ts translations, Hero.astro hardcoded text, meta descriptions, JSON-LD.
**How to avoid:** Search the entire codebase for "Tech" and "Unternehmer" to find all instances. Update them all in one pass.
**Warning signs:** Visual inconsistency between hero tagline and meta description.

## Code Examples

### Sitemap i18n Configuration
```javascript
// astro.config.mjs — update existing sitemap() call
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://brianboy.ch",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "de",
        locales: {
          de: "de-CH",
          en: "en",
        },
      },
    }),
  ],
  // ... rest of config
});
```

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Hostpoint

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.6
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps
          local-dir: ./dist/
          server-dir: ./
```

### robots.txt (static file)
```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://brianboy.ch/sitemap-index.xml
```

Note: @astrojs/sitemap generates `sitemap-index.xml` (not `sitemap.xml`) as the entry point, which then references `sitemap-0.xml` etc.

### Complete BaseLayout Head (target state)
```astro
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Primary Meta -->
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Canonical & Hreflang -->
  <link rel="canonical" href={canonicalUrl} />
  <link rel="alternate" hreflang="de" href={deUrl} />
  <link rel="alternate" hreflang="en" href={enUrl} />
  <link rel="alternate" hreflang="x-default" href={deUrl} />

  <!-- OpenGraph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={`${Astro.site}og-image.jpg`} />
  <meta property="og:site_name" content="Brian Boy" />
  <meta property="og:locale" content={lang === "de" ? "de_CH" : "en"} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={`${Astro.site}og-image.jpg`} />

  <!-- JSON-LD Person -->
  <script type="application/ld+json" set:html={JSON.stringify(personSchema)} />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:..." rel="stylesheet" />

  <ThemeScript />
</head>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/sitemap` without i18n | i18n option with locale mapping | @astrojs/sitemap 3.x | Automatic hreflang in sitemap XML |
| Manual FTP upload | SamKirkland/FTP-Deploy-Action v4.3.6 with state tracking | 2023+ | Incremental deploys, no manual work |
| Meta tags only | JSON-LD structured data | Ongoing (Google recommendation) | Rich search results, knowledge panel potential |
| `og:locale` with full BCP47 | Simple locale codes accepted | Ongoing | `de_CH` and `en` both valid for og:locale |

**Deprecated/outdated:**
- Plain FTP (unencrypted): Most hosts now prefer or require FTPS. Always try `protocol: ftps` first.
- `changefreq` and `priority` in sitemaps: Google officially ignores these. Still included by @astrojs/sitemap but not worth customizing.

## Open Questions

1. **Exact social profile URLs for sameAs**
   - What we know: GitHub, LinkedIn, Twitter/X, Instagram are the four platforms
   - What's unclear: The exact URLs/usernames for each platform
   - Recommendation: Use placeholder URLs in the JSON-LD; user provides actual URLs before deployment

2. **Hostpoint FTP protocol and port**
   - What we know: Hostpoint is a Swiss hosting provider; FTP-Deploy-Action supports FTP, FTPS, and FTPS-Legacy
   - What's unclear: Whether Hostpoint requires FTPS or accepts plain FTP; which port
   - Recommendation: Default to `protocol: ftps` on port 21. User can adjust if connection fails.

3. **OG image dimensions**
   - What we know: Recommended OG image size is 1200x630px. Existing headshot is square (used at 340x340 on the page).
   - What's unclear: Whether a cropped/resized version of the headshot will look good at OG dimensions, or if a separate OG image should be created.
   - Recommendation: For now, place the headshot as-is in `public/og-image.jpg`. Social platforms will crop/fit it. A purpose-built OG image (with name overlay) would be better but is out of scope for this phase.

## Sources

### Primary (HIGH confidence)
- [@astrojs/sitemap official docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — i18n configuration, all options
- [SamKirkland/FTP-Deploy-Action README](https://github.com/SamKirkland/FTP-Deploy-Action) — workflow YAML, configuration options, protocol support
- [Schema.org Person type](https://schema.org/Person) — official property definitions
- Existing codebase (`astro.config.mjs`, `BaseLayout.astro`, `ui.ts`) — verified current state

### Secondary (MEDIUM confidence)
- [jsonld.com Person example](https://jsonld.com/person/) — JSON-LD structure reference with worksFor, sameAs patterns
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) — JSON-LD must reflect visible page content

### Tertiary (LOW confidence)
- Hostpoint FTP protocol specifics — not verified; defaulting to FTPS as safe assumption

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — @astrojs/sitemap already installed, FTP-Deploy-Action well-documented
- Architecture: HIGH — BaseLayout pattern clear, only 4 pages, straightforward meta tag additions
- Pitfalls: HIGH — well-known SEO gotchas; FTP protocol uncertainty is the only gap
- Deployment: MEDIUM — Hostpoint-specific FTP settings may need adjustment at deploy time

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (stable domain; no fast-moving changes expected)
