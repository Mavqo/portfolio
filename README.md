# Portfolio

Freelance portfolio site. Italian and English. Services, projects, process, testimonials, contact form.

Live: [mavqo.dev](https://mavqo.dev)

Built with Astro 4.15, Tailwind CSS 3.4, Framer Motion, React. Node >= 22.12.

## Run locally

```bash
npm install && npm run dev
```

Build: `npm run build`

Deployed with Docker via Coolify. See `Dockerfile` and `docker-compose.yaml`.

## Structure

```
src/
├── components/
│   ├── layout/       # Nav, Footer, ScrollProgress
│   ├── sections/     # Hero, About, Services, Projects, etc.
│   └── ui/           # Button, Card, Input, Tag
├── layouts/          # Astro page layouts
├── pages/            # Routes (IT + EN)
├── i18n/             # Translation files
├── lib/              # Utilities
└── styles/           # Global styles
public/               # Static assets
docs/                 # Copy docs, wireframes, design system
```
