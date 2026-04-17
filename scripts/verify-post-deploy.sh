#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-portfolio}"
TARGET_URL="${TARGET_URL:-http://127.0.0.1:4321}"
PRIMARY_PATH="${PRIMARY_PATH:-/}"
EXPECTED_PRIMARY_TEXT="${EXPECTED_PRIMARY_TEXT:-Siti web moderni}"
SECONDARY_PATH="${SECONDARY_PATH:-/privacy/}"
EXPECTED_SECONDARY_TEXT="${EXPECTED_SECONDARY_TEXT:-Privacy Policy}"
OPTIONAL_IMAGE_PATH="${OPTIONAL_IMAGE_PATH:-}"
OPTIONAL_IMAGE_CONTENT_TYPE="${OPTIONAL_IMAGE_CONTENT_TYPE:-image/}"
REGISTRY_URL="${REGISTRY_URL:-}"
IMAGE_NAME="${IMAGE_NAME:-}"
EXPECTED_TAG="${EXPECTED_TAG:-latest}"
EXPECTED_SHA_TAG="${EXPECTED_SHA_TAG:-}"
REQUEST_TIMEOUT_SECONDS="${REQUEST_TIMEOUT_SECONDS:-5}"
EVIDENCE_DIR="${EVIDENCE_DIR:-ops/evidence/deploy-checks}"

TARGET_ROOT="${TARGET_URL%/}"
PRIMARY_URL="${TARGET_ROOT}${PRIMARY_PATH}"
SECONDARY_URL="${TARGET_ROOT}${SECONDARY_PATH}"
IMAGE_URL=""
if [[ -n "${OPTIONAL_IMAGE_PATH}" ]]; then
  IMAGE_URL="${TARGET_ROOT}${OPTIONAL_IMAGE_PATH}"
fi

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
RELEASE_ID="${EXPECTED_SHA_TAG:-${EXPECTED_TAG}}"
SAFE_SERVICE_NAME="$(printf "%s" "${SERVICE_NAME}" | tr -cs '[:alnum:]-_' '-')"
SAFE_RELEASE_ID="$(printf "%s" "${RELEASE_ID}" | tr -cs '[:alnum:]-_' '-')"

if [[ -z "${SAFE_RELEASE_ID}" ]]; then
  SAFE_RELEASE_ID="unspecified-release"
fi

mkdir -p "${EVIDENCE_DIR}"
EVIDENCE_FILE="${EVIDENCE_DIR}/${TIMESTAMP}_${SAFE_SERVICE_NAME}_${SAFE_RELEASE_ID}.md"

PRIMARY_BODY_FILE="/tmp/${SERVICE_NAME}-${TIMESTAMP}-primary-body.txt"
PRIMARY_STATUS_FILE="/tmp/${SERVICE_NAME}-${TIMESTAMP}-primary-status.txt"
SECONDARY_BODY_FILE="/tmp/${SERVICE_NAME}-${TIMESTAMP}-secondary-body.txt"
SECONDARY_STATUS_FILE="/tmp/${SERVICE_NAME}-${TIMESTAMP}-secondary-status.txt"
IMAGE_BODY_FILE="/tmp/${SERVICE_NAME}-${TIMESTAMP}-image-body.txt"
IMAGE_STATUS_FILE="/tmp/${SERVICE_NAME}-${TIMESTAMP}-image-status.txt"
IMAGE_HEADERS_FILE="/tmp/${SERVICE_NAME}-${TIMESTAMP}-image-headers.txt"

cleanup() {
  rm -f \
    "${PRIMARY_BODY_FILE}" \
    "${PRIMARY_STATUS_FILE}" \
    "${SECONDARY_BODY_FILE}" \
    "${SECONDARY_STATUS_FILE}" \
    "${IMAGE_BODY_FILE}" \
    "${IMAGE_STATUS_FILE}" \
    "${IMAGE_HEADERS_FILE}"
}
trap cleanup EXIT

log() {
  echo "$*" | tee -a "${EVIDENCE_FILE}"
}

fail() {
  local reason="$1"
  log ""
  log "Result: FAIL"
  log "Failure reason: ${reason}"
  log "Evidence file: ${EVIDENCE_FILE}"
  exit 1
}

http_get_with_single_retry() {
  local url="$1"
  local body_file="$2"
  local status_file="$3"
  local headers_file="${4:-}"
  local attempt=1

  while true; do
    if [[ -n "${headers_file}" ]]; then
      if curl -sS \
        --connect-timeout "${REQUEST_TIMEOUT_SECONDS}" \
        --max-time "${REQUEST_TIMEOUT_SECONDS}" \
        -D "${headers_file}" \
        -o "${body_file}" \
        -w "%{http_code}" \
        "${url}" > "${status_file}"; then
        return 0
      fi
    else
      if curl -sS \
        --connect-timeout "${REQUEST_TIMEOUT_SECONDS}" \
        --max-time "${REQUEST_TIMEOUT_SECONDS}" \
        -o "${body_file}" \
        -w "%{http_code}" \
        "${url}" > "${status_file}"; then
        return 0
      fi
    fi

    if (( attempt >= 2 )); then
      return 1
    fi

    attempt=$((attempt + 1))
    sleep 1
  done
}

write_header() {
  local registry_tags_url="n/a"
  local image_url_line="n/a"
  if [[ -n "${REGISTRY_URL}" && -n "${IMAGE_NAME}" ]]; then
    registry_tags_url="${REGISTRY_URL%/}/v2/${IMAGE_NAME}/tags/list"
  fi
  if [[ -n "${IMAGE_URL}" ]]; then
    image_url_line="${IMAGE_URL}"
  fi

  cat > "${EVIDENCE_FILE}" <<EOF
# Deploy Verification Evidence

- Service: ${SERVICE_NAME}
- Timestamp (UTC): ${TIMESTAMP}
- Target URL: ${TARGET_URL}
- Primary check URL: ${PRIMARY_URL}
- Secondary check URL: ${SECONDARY_URL}
- Optional image URL: ${image_url_line}
- Release identifier: ${RELEASE_ID}
- Registry tags URL: ${registry_tags_url}

## Checks
EOF
}

write_header

log "- Primary page availability: running (${PRIMARY_PATH})"
if ! http_get_with_single_retry "${PRIMARY_URL}" "${PRIMARY_BODY_FILE}" "${PRIMARY_STATUS_FILE}"; then
  fail "Cannot reach primary route ${PRIMARY_URL} after one retry"
fi
PRIMARY_STATUS="$(cat "${PRIMARY_STATUS_FILE}")"
if [[ "${PRIMARY_STATUS}" != "200" ]]; then
  fail "Primary route returned ${PRIMARY_STATUS} (expected 200)"
fi
PRIMARY_BODY="$(cat "${PRIMARY_BODY_FILE}")"
if [[ "${PRIMARY_BODY}" != *"${EXPECTED_PRIMARY_TEXT}"* ]]; then
  fail "Primary page is missing expected marker: ${EXPECTED_PRIMARY_TEXT}"
fi
log "- Primary page availability: pass (status=${PRIMARY_STATUS})"
log "- Primary page marker: pass (${EXPECTED_PRIMARY_TEXT})"

log "- Secondary page availability: running (${SECONDARY_PATH})"
if ! http_get_with_single_retry "${SECONDARY_URL}" "${SECONDARY_BODY_FILE}" "${SECONDARY_STATUS_FILE}"; then
  fail "Cannot reach secondary route ${SECONDARY_URL} after one retry"
fi
SECONDARY_STATUS="$(cat "${SECONDARY_STATUS_FILE}")"
if [[ "${SECONDARY_STATUS}" != "200" ]]; then
  fail "Secondary route returned ${SECONDARY_STATUS} (expected 200)"
fi
SECONDARY_BODY="$(cat "${SECONDARY_BODY_FILE}")"
if [[ "${SECONDARY_BODY}" != *"${EXPECTED_SECONDARY_TEXT}"* ]]; then
  fail "Secondary page is missing expected marker: ${EXPECTED_SECONDARY_TEXT}"
fi
log "- Secondary page availability: pass (status=${SECONDARY_STATUS})"
log "- Secondary page marker: pass (${EXPECTED_SECONDARY_TEXT})"

if [[ -n "${IMAGE_URL}" ]]; then
  log "- Optional image check: running (${OPTIONAL_IMAGE_PATH})"
  if ! http_get_with_single_retry "${IMAGE_URL}" "${IMAGE_BODY_FILE}" "${IMAGE_STATUS_FILE}" "${IMAGE_HEADERS_FILE}"; then
    fail "Cannot reach optional image URL ${IMAGE_URL} after one retry"
  fi
  IMAGE_STATUS="$(cat "${IMAGE_STATUS_FILE}")"
  if [[ "${IMAGE_STATUS}" != "200" ]]; then
    fail "Optional image check returned ${IMAGE_STATUS} (expected 200)"
  fi

  IMAGE_CONTENT_TYPE="$(
    tr -d '\r' < "${IMAGE_HEADERS_FILE}" \
      | awk -F': ' 'tolower($1)=="content-type"{print tolower($2); exit}'
  )"
  if [[ -z "${IMAGE_CONTENT_TYPE}" ]]; then
    fail "Optional image response is missing Content-Type header"
  fi

  EXPECTED_CONTENT_TYPE_LC="$(printf "%s" "${OPTIONAL_IMAGE_CONTENT_TYPE}" | tr '[:upper:]' '[:lower:]')"
  if [[ "${IMAGE_CONTENT_TYPE}" != *"${EXPECTED_CONTENT_TYPE_LC}"* ]]; then
    fail "Optional image content type mismatch: got ${IMAGE_CONTENT_TYPE}, expected ${OPTIONAL_IMAGE_CONTENT_TYPE}"
  fi
  log "- Optional image check: pass (status=${IMAGE_STATUS}, content-type=${IMAGE_CONTENT_TYPE})"
else
  log "- Optional image check: skipped (OPTIONAL_IMAGE_PATH not set)"
fi

if [[ -n "${REGISTRY_URL}" && -n "${IMAGE_NAME}" ]]; then
  REGISTRY_TAGS_URL="${REGISTRY_URL%/}/v2/${IMAGE_NAME}/tags/list"
  log "- Registry mutable tag: running (${EXPECTED_TAG})"
  REGISTRY_RESPONSE="$(
    curl -fsS \
      --connect-timeout "${REQUEST_TIMEOUT_SECONDS}" \
      --max-time "${REQUEST_TIMEOUT_SECONDS}" \
      "${REGISTRY_TAGS_URL}"
  )" || fail "Cannot query registry tags endpoint ${REGISTRY_TAGS_URL}"

  if [[ "${REGISTRY_RESPONSE}" != *"\"${EXPECTED_TAG}\""* ]]; then
    fail "Required mutable tag not found in registry response: ${EXPECTED_TAG}"
  fi
  log "- Registry mutable tag: pass (${EXPECTED_TAG})"

  if [[ -n "${EXPECTED_SHA_TAG}" ]]; then
    log "- Registry immutable tag: running (${EXPECTED_SHA_TAG})"
    if [[ "${REGISTRY_RESPONSE}" != *"\"${EXPECTED_SHA_TAG}\""* ]]; then
      fail "Required immutable tag not found in registry response: ${EXPECTED_SHA_TAG}"
    fi
    log "- Registry immutable tag: pass (${EXPECTED_SHA_TAG})"
  else
    log "- Registry immutable tag: skipped (EXPECTED_SHA_TAG not set)"
  fi
else
  log "- Registry mutable tag: skipped (REGISTRY_URL and IMAGE_NAME not both set)"
  log "- Registry immutable tag: skipped (REGISTRY_URL and IMAGE_NAME not both set)"
fi

log ""
log "Result: PASS"
log "Evidence file: ${EVIDENCE_FILE}"
