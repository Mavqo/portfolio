# Portfolio Design Spec — Marco
**Date:** 2026-03-20
**Status:** Approved

---

## Overview

A freelance portfolio website for **Marco**, a developer specializing in Web Development and AI Automation. Target audience: small businesses (PMI) and startups looking for a freelance developer — not recruiters.

**Brand:** Marco — Web & AI Automation
**Tone:** Accessible and direct, with a professional touch. Speaks to non-technical business owners.
**Language:** English
**Hosting:** TBD (Vercel or GitHub Pages — decided after build)

---

## Structure

Single scrollable one-page site with anchor navigation. 10 sections in order:

1. **Nav** — Sticky, minimal. Logo "Marco" + links (Services, Work, About) + CTA button "Let's talk →"
2. **Hero** — Bold left-aligned headline + subtext + 2 CTAs + professional photo (right side)
3. **Tech Strip** — Horizontal logo bar: React, Python, n8n, FastAPI, Next.js, LLM APIs, PostgreSQL
4. **Problem → Solution** — "Sound familiar?" — 3 pain point cards (outdated site / wasted hours / tech overwhelm)
5. **Services** — 2 cards side by side: Web Development + AI Automation (with bullet deliverables)
6. **How It Works** — Dark background, 3-step process: We talk → I build → You launch
7. **Projects** — 3 placeholder cards (case studies to be added later)
8. **About** — Photo + 3-4 lines bio + skill pills
9. **Contact** — Dark background form (name, email, message) + "Reply within 24h"
10. **Footer** — © 2026 Marco · Web & AI Automation · Switzerland

---

## Visual Design

**Style:** Light + Dark Accents
**Background:** White (`#ffffff`)
**Primary text:** Dark navy (`#1a1a2e`)
**Accent:** Purple-navy (`#4a4a8a`)
**Alternating sections:** Light gray (`#f8f8fc`) for Problem and Projects; Dark navy (`#1a1a2e`) for How It Works and Contact
**Typography:** System font stack (`'Segoe UI', system-ui, sans-serif`)
**Border radius:** 8–16px on cards, 20px on hero photo
**Hero layout:** Split — text left, photo right
**Hero headline style:** Bold Statement, left-aligned, large (2.8rem), multi-line

---

## Key Copy Decisions

- **Hero headline:** "I build websites and automations that work for you."
- **Hero subtext:** "Whether you need a professional website or want to save hours with AI automation — I help small businesses grow without the tech headaches."
- **Problem section title:** "Running a business is hard enough."
- **Services headline:** "Two services. Real results."
- **How it works headline:** "Simple. Fast. No surprises."
- **Contact CTA:** "Ready to start a project?"

---

## Components

### Nav
- Sticky, white background, 1px bottom border
- Logo left, links center, CTA button right
- CTA: dark navy background, white text

### Hero
- Left: label (uppercase small) → H1 → subtitle → 2 buttons (primary + secondary outline)
- Right: photo with rounded corners (placeholder → real photo after bg removal on remove.bg)

### Tech Strip
- Full-width, light border top/bottom
- "Built with" label + icon+name pairs for each technology

### Pain Cards
- White background, light border, rounded
- Emoji icon + bold title + description
- 3 across on desktop, stacked on mobile

### Service Cards
- 2-column grid, border (2px), no background fill
- Tag badge (purple) → H3 → description → arrow list of deliverables

### How It Works Steps
- Dark navy background, white text
- 3 numbered circles (purple) → title → description
- Horizontal layout desktop, stacked mobile

### Project Cards
- White card, image thumbnail area (placeholder gray)
- Tags → title → description
- "Coming soon" state until real case studies are ready

### Contact Form
- Dark navy background
- 3 fields: name, email, textarea
- Single CTA button: "Send message →" (white bg, dark text)
- Note: form needs backend or third-party service (Formspree / Netlify Forms)

---

## Photo

Marco's photo will be used in Hero (large) and About (small). Original photo needs background removal via [remove.bg](https://www.remove.bg) before use. Replace placeholder once processed.

---

## Out of Scope (v1)

- Multi-language support
- Blog / articles section
- Pricing page
- Client login / dashboard
- Analytics beyond basic (add later)
- Case studies (added in v2 once projects complete)

---

## Technical Stack

- **HTML + CSS + vanilla JS** — no framework needed for v1 (simple static site)
- **Responsive** — mobile-first, breakpoints at 768px
- **No build step** — single HTML file or minimal file structure
- **Form backend** — Formspree (free tier) — implementation plan will include a placeholder endpoint step
- **Deploy** — TBD (Vercel / GitHub Pages / custom domain)
