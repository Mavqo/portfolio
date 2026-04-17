# CI -> Registry -> Coolify Deploy Runbook

Service: `portfolio`
Owner: Automation Engineering
Last updated: `2026-04-08`

## 1. Why this automation exists

This workflow removes manual image build and redeploy steps for the portfolio service.

Process risk if bypassed:
- Manual local deploys bypass CI audit logs and make image provenance unclear.
- Coolify can redeploy stale images if `latest` is updated outside the standard path.

## 2. Automation score

| Dimension | Score (1-5) | Notes |
| --- | --- | --- |
| Time savings | 4 | Replaces repeated build, push, and redeploy steps. |
| Operational importance | 4 | Controls a public-facing portfolio release path. |
| Dependency risk | 3 | Depends on self-hosted runner, local registry, and Coolify trigger credentials. |
| Maintainability | 4 | Small workflow with explicit retry and verification contracts. |

Decision: keep automation, but require deterministic verification and explicit rollback.

## 3. System contract

Trigger:
- `push` to `main`
- manual `workflow_dispatch`

Orchestration entrypoint:
- `.github/workflows/build-push-registry.yml`

Inputs:
- Git commit on `main`
- `Dockerfile`, `nginx.conf`, and site source from repository
- GitHub secrets:
  - `COOLIFY_DEPLOY_WEBHOOK`
  - `COOLIFY_API_TOKEN`
  - `COOLIFY_MANUAL_WEBHOOK_SECRET`
  - `REGISTRY_USERNAME` (optional)
  - `REGISTRY_PASSWORD` (optional)

Outputs:
- Docker image tags:
  - `192.168.1.158:5000/portfolio:latest`
  - `192.168.1.158:5000/portfolio:<git-sha>`
- Coolify redeploy request (API webhook primary, signed manual webhook fallback)

Side effects:
- Updated `latest` tag in the local registry
- New Coolify deployment request
- GitHub Actions run log as release audit trail

## 4. Preconditions

- Self-hosted runner online with labels: `self-hosted`, `Linux`, `portfolio`
- Registry reachable: `http://192.168.1.158:5000/v2/_catalog`
- Coolify app configured to pull `192.168.1.158:5000/portfolio`
- Production target URL known to operator for verification

## 5. Canonical deploy procedure

1. Push approved commit to `main` or start `workflow_dispatch`.
2. Confirm GitHub Actions run `Build and Push to Local Registry` starts.
3. Confirm image push includes both `latest` and commit SHA tags.
4. Confirm redeploy trigger succeeds:
   - preferred: API webhook returns a `deployment_uuid`
   - fallback: signed manual webhook returns a `deployment_uuid`
5. Run deterministic verification:

```bash
cd portfolio
TARGET_URL=https://portfolio.example.com \
REGISTRY_URL=http://192.168.1.158:5000 \
IMAGE_NAME=portfolio \
EXPECTED_SHA_TAG=<commit-sha> \
npm run verify:deploy
```

6. Attach or reference the evidence file from `ops/evidence/deploy-checks/` in the task handoff.

## 6. Verification contract

`scripts/verify-post-deploy.sh` must pass before release is accepted.

Checks:
- homepage returns `200`
- homepage includes `Siti web moderni`
- privacy page returns `200`
- privacy page includes `Privacy Policy`
- registry contains `latest`
- registry contains `EXPECTED_SHA_TAG` when provided

## 7. Rollback procedure

Rollback after one failed verification retry when:
- homepage is unavailable or missing expected content
- privacy page is unavailable or missing expected content
- required registry tags are missing

Procedure:
1. Identify the last known-good SHA tag from prior evidence.
2. In Coolify, pin the image tag to `192.168.1.158:5000/portfolio:<known-good-sha>`.
3. Trigger redeploy from Coolify.
4. Re-run `npm run verify:deploy` with `EXPECTED_SHA_TAG=<known-good-sha>`.
5. Document the rollback SHA, reason, and evidence path in the issue.

## 8. Failure handling and observability

- API webhook retries up to 3 times; hard failure exits the workflow non-zero.
- If webhook credentials are absent but the manual webhook secret is present, the workflow sends a signed fallback payload.
- Minimum audit trail:
  - GitHub Actions run URL
  - deployed commit SHA
  - evidence file path
  - rollback note if used
