# Deploy Verification Evidence

- Service: portfolio
- Timestamp (UTC): 20260407T130348Z
- Target URL: http://127.0.0.1:4477
- Primary check URL: http://127.0.0.1:4477/
- Secondary check URL: http://127.0.0.1:4477/privacy/
- Optional image URL: http://127.0.0.1:4477/favicon.svg
- Release identifier: latest
- Registry tags URL: n/a

## Checks
- Primary page availability: running (/)
- Primary page availability: pass (status=200)
- Primary page marker: pass (Siti web moderni)
- Secondary page availability: running (/privacy/)
- Secondary page availability: pass (status=200)
- Secondary page marker: pass (Privacy Policy)
- Optional image check: running (/favicon.svg)
- Optional image check: pass (status=200, content-type=image/svg+xml)
- Registry mutable tag: skipped (REGISTRY_URL and IMAGE_NAME not both set)
- Registry immutable tag: skipped (REGISTRY_URL and IMAGE_NAME not both set)

Result: PASS
Evidence file: ops/evidence/deploy-checks/20260407T130348Z_portfolio_latest.md
