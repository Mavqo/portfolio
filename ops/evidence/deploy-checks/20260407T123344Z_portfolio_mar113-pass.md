# Deploy Verification Evidence

- Service: portfolio
- Timestamp (UTC): 20260407T123344Z
- Target URL: http://127.0.0.1:4477
- Primary check URL: http://127.0.0.1:4477/
- Secondary check URL: http://127.0.0.1:4477/
- Optional image URL: http://127.0.0.1:4477/assets/logos/react.png
- Release identifier: mar113-pass
- Registry tags URL: n/a

## Checks
- Primary page availability: running (/)
- Primary page availability: pass (status=200)
- Primary page marker: pass (Siti web moderni)
- Secondary page availability: running (/)
- Secondary page availability: pass (status=200)
- Secondary page marker: pass (Privacy Policy)
- Optional image check: running (/assets/logos/react.png)
- Optional image check: pass (status=200, content-type=image/png)
- Registry mutable tag: skipped (REGISTRY_URL and IMAGE_NAME not both set)
- Registry immutable tag: skipped (REGISTRY_URL and IMAGE_NAME not both set)

Result: PASS
Evidence file: ops/evidence/deploy-checks/20260407T123344Z_portfolio_mar113-pass.md
