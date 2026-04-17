# Portfolio Post-Deploy Verification Runbook

This runbook applies the reusable starter from `../../../ops/templates/post-deploy-verification-starter.md` to `portfolio`.

## Why This Automation Exists

Manual deploy checks for the agency portfolio were inconsistent and not reliably documented. This verifier creates a deterministic release gate with auditable evidence.

Starter score for this service:

| Dimension | Score | Notes |
| --- | --- | --- |
| Time savings | 4/5 | One command replaces repeated route and asset checks |
| Operational importance | 4/5 | The portfolio is client-facing and regressions are reputation-critical |
| Dependency risk | 2/5 | HTTP target is required; registry checks are optional |
| Maintainability | 4/5 | Explicit env contract and deterministic markdown evidence |

Decision: automate. Operational value is higher than implementation and maintenance cost.

## Filled Service Contract

- Trigger: manual operator run immediately after deploy completion.
- Inputs:
  - `TARGET_URL`: deployed service base URL (default `http://127.0.0.1:4321`)
  - `PRIMARY_PATH`: required primary route path (default `/`)
  - `EXPECTED_PRIMARY_TEXT`: marker text required in the primary route body (default `Siti web moderni`)
  - `SECONDARY_PATH`: required secondary route path (default `/privacy/)`)
  - `EXPECTED_SECONDARY_TEXT`: marker text required in the secondary route body (default `Privacy Policy`)
  - `OPTIONAL_IMAGE_PATH`: optional static image path to verify (disabled by default)
  - `OPTIONAL_IMAGE_CONTENT_TYPE`: expected image content-type marker when image check is enabled (default `image/`)
  - Optional image tag checks: `REGISTRY_URL`, `IMAGE_NAME`, `EXPECTED_TAG`, `EXPECTED_SHA_TAG`
  - `EVIDENCE_DIR`: evidence output folder (default `ops/evidence/deploy-checks`)
- Outputs:
  - non-zero exit code on any required failure
  - one timestamped markdown evidence artifact
  - explicit PASS/FAIL and failure reason
- Side effects:
  - writes one file under `ops/evidence/deploy-checks/`
  - can block deploy closure when checks fail

## Command

```bash
npm run verify:deploy
```

Example with explicit release identity:

```bash
TARGET_URL=https://portfolio.example.com EXPECTED_SHA_TAG=<git-sha> npm run verify:deploy
```

Example enabling optional image verification:

```bash
TARGET_URL=https://portfolio.example.com \
OPTIONAL_IMAGE_PATH=/assets/logos/react.png \
OPTIONAL_IMAGE_CONTENT_TYPE=image/png \
EXPECTED_SHA_TAG=<git-sha> \
npm run verify:deploy
```

Example enabling optional registry checks:

```bash
TARGET_URL=https://portfolio.example.com \
REGISTRY_URL=http://127.0.0.1:5000 \
IMAGE_NAME=portfolio \
EXPECTED_TAG=latest \
EXPECTED_SHA_TAG=<git-sha> \
npm run verify:deploy
```

## Evidence Location

- Directory: `ops/evidence/deploy-checks/`
- Filename convention: `<UTC-timestamp>_<service>_<release-id>.md`

## Rollback Checkpoint

Rollback after one retry when any required check fails:

- primary route is not reachable or status is not `200`
- primary route marker text is missing
- secondary route is not reachable or status is not `200`
- secondary route marker text is missing
- optional image check is enabled and fails status/content-type validation
- registry checks are enabled and required tags are missing

Rollback note must include:

- known-good release identifier
- failed evidence file path
- suspected fault domain (`app`, `network`, `registry`, `orchestrator`)

## Portfolio-Specific Deltas (For Future Reuse)

- Portfolio is a static Astro build served by Nginx; there is no dedicated API health endpoint by default, so verification uses route-level markers.
- Secondary route validation (`/privacy`) provides a deterministic non-homepage page check.
- Optional image check is available for deploy paths where static asset integrity matters.
- Registry checks remain optional because deploys may run as direct platform builds without externally queryable image tags.
