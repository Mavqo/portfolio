# Deploy Verification Evidence

- Service: portfolio
- Timestamp (UTC): 20260407T130324Z
- Target URL: http://127.0.0.1:4477
- Primary check URL: http://127.0.0.1:4477/
- Secondary check URL: http://127.0.0.1:4477/privacy
- Optional image URL: http://127.0.0.1:4477/favicon.svg
- Release identifier: latest
- Registry tags URL: n/a

## Checks
- Primary page availability: running (/)
- Primary page availability: pass (status=200)
- Primary page marker: pass (Siti web moderni)
- Secondary page availability: running (/privacy)

Result: FAIL
Failure reason: Secondary route returned 301 (expected 200)
Evidence file: ops/evidence/deploy-checks/20260407T130324Z_portfolio_latest.md
