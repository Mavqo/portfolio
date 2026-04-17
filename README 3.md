# Portfolio

Client-facing portfolio site built with Astro and deployed via Docker/Nginx.

## Commands

Run all commands from `portfolio/`.

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server (`http://localhost:4321`) |
| `npm run build` | Build production output to `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run verify:deploy` | Run deterministic post-deploy verification and write evidence |

## Post-Deploy Verification

Run this immediately after each deploy to verify release health and produce auditable evidence:

```bash
npm run verify:deploy
```

Use explicit target/release values for production checks:

```bash
TARGET_URL=https://portfolio.example.com EXPECTED_SHA_TAG=<git-sha> npm run verify:deploy
```

Evidence is written to:

- `ops/evidence/deploy-checks/`

Detailed operator contract, rollback checkpoint, and optional checks:

- `ops/runbooks/post-deploy-verification.md`

## CI Registry Deploy

The repository now supports the standard CI path for Docker-based delivery:

- Workflow: `.github/workflows/build-push-registry.yml`
- Registry image: `192.168.1.158:5000/portfolio`
- Tags pushed on `main`: `latest` and `<git-sha>`
- Coolify trigger: API webhook first, signed manual webhook fallback
- Runbook: `ops/runbooks/ci-registry-coolify-runbook.md`
