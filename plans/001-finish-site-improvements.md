# Plan 001: Finish site reliability, accessibility, and design improvements

> **Executor instructions**: Follow this plan step by step. Run every verification command and
> confirm the expected result before moving on. Touch only files listed as in scope. Stop on any
> STOP condition; do not improvise. Do not push or merge.
>
> **Drift check**: `git diff --stat 8c4f11f..HEAD -- app components lib emails next.config.ts package.json`
> The execution worktree is seeded with reviewed uncommitted contact/email work; preserve it.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: none
- **Category**: bug, security, perf, tests, accessibility, design
- **Planned at**: commit `8c4f11f`, 2026-07-29

## Why this matters

The site looks polished but its primary booking path is broken, some public claims and reviews are
unverified, mobile navigation is not accessible, motion ignores user preferences, and production
builds suppress type failures. The public email endpoint also needs basic abuse protection. This
plan completes the conversion journey while making the UI calmer, faster, safer, and easier to use
for keyboard, touch, and older users.

## Current state

- `lib/config/site.ts` contains a placeholder Microsoft Bookings URL and unsupported certification,
  guarantee, and turnaround claims.
- `/booking` is linked from navigation and CTAs but has no `page.tsx`.
- `app/(home)/page.tsx` contains locally invented reviews and history/statistics.
- `app/-components/Navbar.tsx` has an icon-only menu without an accessible name or expanded state;
  its drawer animates width and does not handle Escape/focus/background inertness.
- Page-level Motion animations do not honor `prefers-reduced-motion`.
- `app/api/contact/route.ts` validates input and uses Resend but has no rate limiting.
- `next.config.ts` sets `typescript.ignoreBuildErrors: true`.
- The root layout has no skip link, theme color, metadata base, or structured organization metadata.
- `app/(home)/page.tsx`, `about-us/page.tsx`, and `services/page.tsx` are large client components.
- The established form abstraction is `Form.Root`, `Form.Field`, `Form.Input`, `Form.Select`,
  `Form.TextArea`, `Form.ErrorMessage`, and `Form.Submit`; do not replace it with native registration.
- Design language: dark navy `#073654`, aqua `#60d8de`, white, strong editorial headings, restrained
  geometric texture. Preserve this identity while reducing repetitive card treatments and motion.

## Commands

| Purpose | Command | Expected |
| --- | --- | --- |
| Typecheck | `pnpm lint:type-check` | exit 0, no errors |
| Lint | `pnpm lint:eslint` | exit 0, zero warnings |
| Tests | `pnpm test` | exit 0 |
| Build | `pnpm build` | exit 0 |

## Scope

**In scope**

- `app/**`
- `components/**`
- `emails/**`
- `lib/**`
- `tailwind.css`
- `next.config.ts`
- `package.json`
- `pnpm-lock.yaml`
- `.env.example`
- test/config files needed for Vitest

**Out of scope**

- `.env.local` and all secret values
- PM-provided files under Downloads
- replacing the current brand, logo, or contact-page information architecture
- real Google Reviews API integration (explicitly deferred by PM)
- pushing, merging, deployment, DNS, or domain configuration

## Git workflow

- Branch: `codex/site-improvements`
- Commit message style: conventional commits such as `feat: add services page`
- Commit logical units if useful. Do not push.

## Steps

### 1. Repair booking and public content integrity

- Add `app/(home)/booking/page.tsx` as a styled, accessible landing page whose primary action opens
  the configured Microsoft Bookings URL in a new tab and whose secondary action links to `/contact`.
- If the real Bookings URL is still a placeholder, do not send users to it. Present a clear
  “Scheduling link coming soon” state and route the primary actionable fallback to contact/phone.
- Make navigation and internal CTAs consistently target `/booking`; only the booking page may use
  the external URL.
- Replace invented reviews with a clearly labeled Google Reviews placeholder/link or omit the review
  cards until verified reviews exist. Never present fabricated names, dates, ratings, or quotes.
- Remove unconfirmed claims: established year, years in business, certified/court-certified,
  guaranteed accuracy, guaranteed turnaround, absolute privacy claims, and unsupported service counts.
- Preserve confident professional copy without unverifiable absolutes.

**Verify**: search for `example.com`, `certified`, `guaranteed`, `Est. 2012`, and fake reviewer names;
none may remain in public content.

### 2. Build accessible navigation and document foundations

- Add a skip link targeting the shared `<main id="main-content">`.
- Give the mobile menu button `aria-label`, `aria-expanded`, and `aria-controls`.
- Implement the mobile menu with appropriate dialog/navigation semantics, Escape closing, focus
  management, background scroll lock, and inert/hidden closed state. Use transform/opacity, not width.
- Ensure all icon-only buttons have accessible names and decorative icons are hidden from assistive
  technology where appropriate.
- Add visible `focus-visible` styling for links, buttons, card overlays, form controls, and social links.
- Add `metadataBase`, theme color, canonical/default Open Graph metadata, and page-specific metadata.
- Add Organization/LocalBusiness JSON-LD using confirmed `siteConfig` fields only.

**Verify**: keyboard-only navigation reaches skip link, menu, all links, and contact fields in order;
Escape closes the mobile menu and returns focus to its trigger.

### 3. Establish a restrained motion and interaction system

- Add shared custom easing tokens and `prefers-reduced-motion` handling.
- Use Motion’s reduced-motion support for JS animations and CSS media queries for CSS animation.
- Remove infinite decorative animation under reduced motion.
- Replace `transition-all` with explicit properties. Keep frequent UI interactions at 120–220ms;
  marketing entrances may remain longer but must not block interaction.
- Add subtle `active:scale-[0.97]` feedback to pressable controls.
- Preserve only high-value staged entrances; reduce repeated fade-up animation on dense card grids.
- Keep hover-only embellishments behind hover-capable pointer media where practical.

**Verify**: `rg "transition-all" app components` returns no first-party page/component matches; reduced
motion mode shows all content immediately and disables infinite animation.

### 4. Protect and test the contact flow

- Add a small server-side rate-limit abstraction suitable for one Vercel instance and document that a
  durable provider is required for multi-instance guarantees. Key by trusted platform IP headers, do
  not log PII, and return `429` with `Retry-After`.
- Preserve server Zod validation, honeypot, Resend SDK, React Email `react` property, reply-to, and
  generic client-facing errors.
- Add unit tests for schema validation, email template rendering, API invalid input, missing key,
  rate limit, Resend success, and Resend error. Mock network/SDK calls.
- Never read, print, snapshot, or copy the API key.

**Verify**: tests cover all named cases and make no real network request.

### 5. Restore build integrity and reduce client boundaries

- Remove `typescript.ignoreBuildErrors`.
- Add a `test` script and lightweight Vitest configuration if none exists.
- Split static page content into server components where practical. Isolate only components that use
  Motion, state, browser APIs, or event handlers behind client boundaries.
- Prefer CSS entrance/hover behavior for purely decorative effects when it meaningfully removes a
  client boundary. Do not perform a risky wholesale rewrite solely to eliminate `"use client"`.
- Remove now-unused components such as the old standalone map section when confirmed unreachable.
- Resolve every ESLint warning in first-party code without disabling rules globally.

**Verify**: typecheck, lint, tests, and build all exit 0.

### 6. Visually verify the complete site

- Inspect `/`, `/about-us`, `/services`, `/booking`, and `/contact` at mobile, tablet, and desktop.
- Confirm no horizontal overflow, clipped headings, unreadable contrast, hidden focus, or layout shift.
- On contact, confirm the PM-requested bordered fields, compact map, quick-call card, validation,
  submission states, and older-user readability remain intact.
- Verify native select colors explicitly work in Windows light/dark system settings.

**Verify**: capture screenshots at approximately 390px and 1440px for each route and report paths.

## Test plan

- Unit: shared contact schema valid/invalid/limits.
- Unit: React Email renders all supplied fields and safely handles optional empty values.
- Route: 400 invalid, 429 throttled, 503 missing configuration, 502 provider failure, 200 success.
- Component/accessibility: mobile menu semantics and contact labels if the existing test stack supports DOM.
- Manual: keyboard, reduced motion, responsive pages, booking fallback behavior.

## Done criteria

- [ ] `/booking` renders and no CTA reaches a placeholder URL.
- [ ] No fabricated reviews or unsupported claims remain.
- [ ] Mobile navigation passes keyboard and semantic checks.
- [ ] Skip link, metadata, and structured data exist.
- [ ] Reduced-motion behavior works and first-party `transition-all` usage is removed.
- [ ] Contact endpoint is throttled and tested without real email delivery.
- [ ] `typescript.ignoreBuildErrors` is removed.
- [ ] Typecheck, zero-warning lint, tests, and build pass.
- [ ] No secret file or value appears in Git status/diff.
- [ ] Responsive screenshots were reviewed.

## STOP conditions

- The real Microsoft Bookings URL cannot be found: implement the safe contact fallback; do not invent it.
- Accessibility requires replacing the project’s established component library: stop and report.
- A verification fails twice after a reasonable scoped correction.
- Any step requires exposing or rotating the Resend credential.
- Requirements conflict with the PM-requested contact form/map/email behavior.

## Maintenance notes

- Replace the safe booking fallback once the client supplies the exact Microsoft Bookings URL.
- Replace the review placeholder only with confirmed Google Business data or an approved widget.
- In-memory throttling is defense-in-depth; production scale-out should use a durable rate-limit store.
- Review motion on a physical phone before production approval.
