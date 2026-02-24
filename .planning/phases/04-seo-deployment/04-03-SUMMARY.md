---
phase: 04-seo-deployment
plan: 03
subsystem: infra
tags: [github-actions, ftp, ci-cd, deployment, hostpoint]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Astro static build output (dist/) for FTP upload"
provides:
  - "Automated CI/CD pipeline: push to main triggers build + FTP deploy"
  - "GitHub Actions workflow with FTPS deployment to Hostpoint"
affects: []

# Tech tracking
tech-stack:
  added: [github-actions, FTP-Deploy-Action-v4.3.6]
  patterns: [ci-cd-on-push, build-then-deploy, secrets-based-credentials]

key-files:
  created:
    - .github/workflows/deploy.yml
  modified: []

key-decisions:
  - "FTPS protocol for encrypted FTP transfers to Hostpoint"
  - "npm ci for reproducible CI builds (not npm install)"
  - "server-dir ./ deploys to Hostpoint root (no subdirectory)"
  - "Node 20 with npm cache for faster CI runs"

patterns-established:
  - "CI/CD: Push to main triggers build + deploy (no manual dispatch)"
  - "Secrets: FTP credentials stored as GitHub repository secrets, never in code"

requirements-completed: [REQ-017]

# Metrics
duration: 3min
completed: 2026-02-24
---

# Phase 4 Plan 3: GitHub Actions + FTP Deployment Summary

**GitHub Actions workflow deploying Astro static build to Hostpoint via FTPS on every push to main**

## Performance

- **Duration:** 3 min (split across checkpoint for secret setup)
- **Started:** 2026-02-24
- **Completed:** 2026-02-24
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Created GitHub Actions CI/CD workflow that builds Astro site and deploys via FTPS
- Configured FTP credentials as GitHub repository secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- Pipeline ensures build must pass before deployment (fail-fast on broken builds)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create GitHub Actions deployment workflow** - `deac9f7` (feat)
2. **Task 2: Add FTP credentials as GitHub repository secrets** - completed via `gh secret set` (human-action checkpoint)

## Files Created/Modified
- `.github/workflows/deploy.yml` - GitHub Actions workflow: checkout, setup Node 20, npm ci, build, FTP deploy via SamKirkland/FTP-Deploy-Action@v4.3.6

## Decisions Made
- Used FTPS protocol (encrypted) for secure credential transmission to Hostpoint
- npm ci instead of npm install for deterministic, lockfile-based installs in CI
- server-dir set to ./ (root) per user hosting configuration
- Node 20 with npm cache enabled for faster CI execution
- SamKirkland/FTP-Deploy-Action@v4.3.6 chosen as mature, well-maintained FTP deploy action

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - Task 1 created the workflow file successfully, and the human-action checkpoint for Task 2 was resolved by the user setting secrets via `gh secret set` from their .env file.

## User Setup Required

FTP credentials were configured during execution:
- FTP_SERVER - Hostpoint FTP server hostname
- FTP_USERNAME - Hostpoint FTP account username
- FTP_PASSWORD - Hostpoint FTP account password

All three were set as GitHub repository secrets via `gh secret set`.

## Next Phase Readiness

This is the final plan of the final phase. The project is complete:
- All 4 phases executed (Foundation, Layout, Content, SEO + Deployment)
- Site has full SEO metadata, sitemap, and automated deployment
- Push to main will build and deploy to brianboy.ch automatically

---
*Phase: 04-seo-deployment*
*Completed: 2026-02-24*

## Self-Check: PASSED
- FOUND: .github/workflows/deploy.yml
- FOUND: deac9f7 (Task 1 commit)
- FOUND: 04-03-SUMMARY.md
