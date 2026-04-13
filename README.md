# Marco Digital Agency — Portfolio

> Freelance portfolio site for web development, AI automation, and digital operations.

Live site: [https://mavqo.dev](https://mavqo.dev)

---

## Overview

This is the main public-facing portfolio for Marco Digital Agency. It presents services, selected projects, the work process, client testimonials, and a contact funnel. The site is built as a fast, static-first Astro application with smooth interactions and a clean Tailwind CSS design system.

## Features

- **Bilingual pages** — Italian and English entry points
- **Section-based landing** — Hero, About, Services, Projects, Process, Problems, Testimonials, Contact
- **Responsive design** — Mobile-first Tailwind CSS layout
- **Smooth interactions** — Framer Motion animations
- **Static-first architecture** — Fast builds, easy hosting, SEO-friendly

## Tech Stack

- [Astro](https://astro.build/) 4.15
- [Tailwind CSS](https://tailwindcss.com/) 3.4
- [Framer Motion](https://www.framer.com/motion/) 11
- [Lucide React](https://lucide.dev/) icons
- Node.js >= 22.12.0

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

The site is containerized with Docker and deployed via **Railway** and **Coolify**.

- `Dockerfile` — multi-stage build with nginx serving the `dist/` folder
- `railway.toml` — Railway deploy configuration
- `docker-compose.yaml` — local Docker orchestration

## Project Structure

```text
src/
├── components/
│   ├── layout/       # Navigation, Footer, ScrollProgress
│   ├── sections/     # Page sections (Hero, About, Services, etc.)
│   └── ui/           # Reusable UI primitives (Button, Card, Input, Tag)
├── layouts/          # Astro page layouts
├── pages/            # Routes (IT + EN)
├── i18n/             # Internationalization helpers
├── lib/              # Utilities
└── styles/           # Global styles
public/               # Static assets
docs/                 # Copy, wireframes, and design system docs
```

## Notes

- `docs/` contains copy documents, wireframes, and the design system spec for the site.
- Do not commit `.tmp` build artifacts or local agent context files to version control.
