#!/usr/bin/env bash
set -euo pipefail

readonly SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly LABELS_FILE="${SCRIPT_DIR}/labels.tsv"
readonly RULESET_FILE="${SCRIPT_DIR}/rulesets/protect-main.json"

dry_run=false
repo=""

while (($# > 0)); do
  case "$1" in
    --dry-run)
      dry_run=true
      shift
      ;;
    -h | --help)
      cat <<'HELP'
Usage:
  scripts/github/bootstrap-repository.sh [--dry-run] OWNER/REPO

Configures GitHub repository settings that cannot live only in git:
  - Dependabot alerts
  - Dependabot security updates
  - Secret scanning and push protection
  - Merge defaults
  - Standard labels
  - Protect main ruleset
HELP
      exit 0
      ;;
    *)
      if [[ -n "$repo" ]]; then
        echo "Unexpected argument: $1" >&2
        exit 1
      fi
      repo="$1"
      shift
      ;;
  esac
done

if [[ -z "$repo" ]]; then
  echo "Repository is required. Example: itwillrain/bookmark-cli-extention" >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "gh command is required." >&2
  exit 1
fi

if [[ ! -f "$LABELS_FILE" ]]; then
  echo "Missing labels file: $LABELS_FILE" >&2
  exit 1
fi

if [[ ! -f "$RULESET_FILE" ]]; then
  echo "Missing ruleset file: $RULESET_FILE" >&2
  exit 1
fi

echo "Bootstrapping GitHub repository: $repo"

if [[ "$dry_run" == "true" ]]; then
  echo "[dry-run] Repository settings would be patched."
else
  gh repo view "$repo" --json nameWithOwner --jq '.nameWithOwner' >/dev/null

  gh api -X PUT "repos/${repo}/vulnerability-alerts" --silent

  gh api -X PATCH "repos/${repo}" \
    -f has_issues=true \
    -f has_wiki=false \
    -f delete_branch_on_merge=true \
    -f allow_auto_merge=true \
    -f allow_squash_merge=true \
    -f allow_merge_commit=true \
    -f allow_rebase_merge=true \
    -f 'security_and_analysis[dependabot_security_updates][status]=enabled' \
    -f 'security_and_analysis[secret_scanning][status]=enabled' \
    -f 'security_and_analysis[secret_scanning_push_protection][status]=enabled' \
    --silent
fi

existing_labels_file=""

if [[ "$dry_run" != "true" ]]; then
  existing_labels_file="$(mktemp)"
  trap '[[ -n "${existing_labels_file:-}" ]] && rm -f "$existing_labels_file"' EXIT
  gh label list --repo "$repo" --limit 1000 --json name --jq '.[].name' >"$existing_labels_file"
fi

while IFS=$'\t' read -r name color description; do
  if [[ -z "${name:-}" || "${name:0:1}" == "#" ]]; then
    continue
  fi

  if [[ "$dry_run" == "true" ]]; then
    echo "[dry-run] Label would be created or updated: ${name}"
    continue
  fi

  if grep -Fxq "$name" "$existing_labels_file"; then
    gh label edit "$name" --repo "$repo" --color "$color" --description "$description"
  else
    gh label create "$name" --repo "$repo" --color "$color" --description "$description"
    printf '%s\n' "$name" >>"$existing_labels_file"
  fi
done <"$LABELS_FILE"

readonly RULESET_NAME="$(sed -n 's/^[[:space:]]*"name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$RULESET_FILE" | head -n 1)"

if [[ -z "$RULESET_NAME" ]]; then
  echo "Ruleset name could not be read from $RULESET_FILE" >&2
  exit 1
fi

if [[ "$dry_run" == "true" ]]; then
  echo "[dry-run] Ruleset would be created or updated: ${RULESET_NAME}"
else
  ruleset_id="$(gh api "repos/${repo}/rulesets" --jq ".[] | select(.name == \"${RULESET_NAME}\" and .target == \"branch\") | .id" | head -n 1)"

  if [[ -n "$ruleset_id" ]]; then
    gh api -X PUT "repos/${repo}/rulesets/${ruleset_id}" --input "$RULESET_FILE" --silent
  else
    gh api -X POST "repos/${repo}/rulesets" --input "$RULESET_FILE" --silent
  fi

  echo "Repository settings:"
  gh api "repos/${repo}" --jq '{delete_branch_on_merge, allow_auto_merge, allow_squash_merge, allow_merge_commit, allow_rebase_merge, has_issues, has_wiki, security_and_analysis}'

  echo "Vulnerability alerts:"
  gh api -i "repos/${repo}/vulnerability-alerts" | sed -n '1p'

  echo "Rulesets:"
  gh api "repos/${repo}/rulesets" --jq '.[] | {id, name, target, enforcement}'
fi

echo "Bootstrap completed."
