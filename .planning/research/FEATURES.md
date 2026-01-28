# Feature Landscape

**Domain:** Personal portfolio website for tech entrepreneur/musician
**Researched:** 2026-01-28
**Confidence:** HIGH (verified against reference sites and multiple sources)

## Table Stakes

Features users expect. Missing = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Dependencies | Notes |
|---------|--------------|------------|--------------|-------|
| **Hero/Introduction Section** | First impression in <3 seconds | Low | None | Name, tagline, value proposition. Reference sites (steipete.me, jarredsumner.com) all have this. |
| **Responsive/Mobile Design** | 60%+ of web traffic is mobile | Medium | CSS framework | Must work flawlessly on all devices. No sideways scroll. |
| **Fast Load Time** | Users bounce after 3s delay | Medium | Image optimization, hosting | Performance is non-negotiable in 2026. |
| **Social Links** | Expected way to verify/connect | Low | None | GitHub, LinkedIn, Twitter/X, Instagram as specified. |
| **Project Showcase** | Proves credibility | Low | None | Eleno, Pressdify with links. Minimal cards, not detailed case studies. |
| **Contact Method** | How to reach you | Low | None | Email-only per requirements. mailto: link or simple display. |
| **Clean Typography** | Readability and professionalism | Low | Font selection | All reference sites prioritize typography. DM Sans, Inter, or system fonts common. |
| **Accessibility Basics** | Legal compliance, good practice | Medium | Semantic HTML | Skip-to-content, proper headings, alt text, ARIA labels. |
| **Working Links** | Broken links = instant credibility loss | Low | QA process | Triple-check all external links work. |
| **SEO Fundamentals** | Discoverability | Low | Meta tags | Title, description, OpenGraph, canonical URLs. |

## Differentiators

Features that set this portfolio apart. Not expected, but create memorable experience.

| Feature | Value Proposition | Complexity | Dependencies | Notes |
|---------|-------------------|------------|--------------|-------|
| **Dark/Light Theme Toggle** | User preference respect, modern UX | Medium | CSS custom properties, JS | Required per spec. System preference detection recommended. leerob.com does this well. |
| **Bilingual Support (DE/EN)** | Austrian market + global reach | High | i18n framework | Required per spec. Language switcher, URL strategy (/de, /en or query param). |
| **Music Identity Integration** | Humanizing differentiator, memorable | Medium | Design/content | Session guitarist + music teacher angle. Could include subtle audio visualization, music imagery, or "currently playing" like leerob.com. |
| **Subtle Animations** | Polish and intentionality | Medium | CSS/GSAP | Smooth transitions, hover states. Keep minimal like jarredsumner.com (0.2s transitions). Avoid excessive animation. |
| **Dual Identity Design** | Tech + music fusion uniquely positions | High | Creative direction | Visual language bridging code and music. Rare and memorable. |
| **Personal Touch/Voice** | Authenticity in AI age | Low | Copywriting | Hand-drawn elements, authentic bio, personality in copy. Anti-AI aesthetic trending in 2026. |

## Anti-Features

Features to explicitly NOT build. These are common mistakes or explicitly excluded per requirements.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Blog** | Explicitly excluded. Maintenance burden, scope creep. | Link to external platform if needed later (Medium, dev.to). |
| **Testimonials Section** | Explicitly excluded. Requires ongoing collection/management. | Social proof via project links and GitHub activity instead. |
| **CV/Resume Page** | Explicitly excluded. Static, quickly outdated. | LinkedIn link for detailed professional history. |
| **Newsletter Signup** | Explicitly excluded. Requires email service, compliance. | Social links for updates instead. |
| **Analytics Dashboard** | Explicitly excluded. Privacy concerns, not needed for personal site. | None. Privacy-respecting if any metrics needed. |
| **Complex Case Studies** | Scope creep, maintenance burden. | Simple project cards with external links. Show, don't explain. |
| **Excessive Animations** | Distracting, performance impact, epilepsy risk. | Subtle, intentional micro-interactions only. |
| **Sound/Audio Autoplay** | Universally hated UX pattern. | Never autoplay audio. Optional play button if music showcase needed. |
| **Template Look** | Generic, doesn't showcase skill. | Custom design even if simple. jarredsumner.com is minimal but unique. |
| **Every Project Ever** | Overwhelming, dilutes quality. | Curate to 2-3 best (Eleno, Pressdify as specified). |
| **Contact Form** | Spam magnet, requires backend. | Email link only per requirements. |
| **Chatbot** | Over-engineering for personal site. | Direct email contact. |
| **User Accounts/Login** | Completely unnecessary. | Static site only. |
| **E-commerce/Payments** | Out of scope. | External links if selling anything. |
| **Complex CMS** | Over-engineering. | Markdown or direct code for content. |

## Feature Dependencies

```
Core Structure (must complete first)
    |
    +-- Hero Section
    +-- Responsive Layout
    +-- Typography System
    |
    +---> Theme System (dark/light)
    |         |
    |         +-- CSS Custom Properties
    |         +-- System Preference Detection
    |         +-- LocalStorage Persistence
    |
    +---> i18n System (DE/EN)
              |
              +-- Translation Files
              +-- Language Switcher
              +-- URL Strategy
              |
              +---> Content (depends on i18n)
                        |
                        +-- About Content
                        +-- Project Descriptions
                        +-- Meta Tags (per language)

Independent (can build in parallel)
    +-- Social Links Component
    +-- Project Cards Component
    +-- Footer Component
    +-- Accessibility Audit
    +-- SEO Implementation
```

## Complexity Assessment

| Feature | Effort | Risk | Notes |
|---------|--------|------|-------|
| Single page + About | Low | Low | Straightforward structure |
| Theme toggle | Medium | Low | Well-documented patterns |
| Bilingual (i18n) | High | Medium | Adds complexity to all content, needs URL strategy |
| Responsive design | Medium | Low | Standard practice |
| Project cards | Low | Low | Simple components with links |
| Social links | Low | Low | Icon + link only |
| Contact (email) | Low | Low | mailto: link |
| Animations | Medium | Low | Keep subtle to avoid scope creep |
| Music identity | Medium | Medium | Creative challenge, could scope creep |

## MVP Recommendation

**Phase 1: Core (Table Stakes)**
1. Hero section with name, tagline, tech + music positioning
2. Responsive single page layout
3. Project cards (Eleno, Pressdify)
4. Social links (GitHub, LinkedIn, Twitter/X, Instagram)
5. Email contact
6. Basic SEO

**Phase 2: Differentiators**
1. Dark/light theme toggle with system preference
2. Bilingual support (start with EN, add DE)
3. Subtle animations

**Phase 3: Polish**
1. Music identity visual elements
2. About page with deeper personal story
3. Performance optimization
4. Accessibility audit

**Defer Indefinitely:**
- Blog, testimonials, CV, newsletter, analytics (per requirements)
- Complex case studies
- Any feature not explicitly required

## Sources

**Reference Site Analysis:**
- steipete.me: Blog-centric, social links, RSS, search, minimal personal intro
- jarredsumner.com: Ultra-minimal, name + bio + links only, subtle hover effects
- adamwathan.me: Content-heavy (articles, talks, podcasts), project showcase, journal
- leerob.com: Theme toggle, personal touches ("currently playing"), writing focus

**Industry Research:**
- Portfolio design trends emphasize minimalism, storytelling, and subtle animation
- Mobile-first approach critical (60%+ traffic)
- i18n adds significant complexity but enables bilingual markets
- "Anti-design" and authenticity trending as counter to AI-polished aesthetics
- Performance and accessibility are baseline expectations

**Confidence Levels:**
- Table stakes: HIGH (verified across all reference sites)
- Differentiators: HIGH (explicitly required or strongly supported by research)
- Anti-features: HIGH (explicitly excluded in requirements or established anti-patterns)
