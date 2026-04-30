#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

export HOST="${HOST:-0.0.0.0}"
export PORT="${PORT:-8767}"

# Kill anything holding the port (handles stale processes regardless of name/path)
if command -v fuser >/dev/null 2>&1; then
  fuser -k "${PORT}/tcp" >/dev/null 2>&1 || true
fi

# Wait for port to free up (max ~5s)
for _ in $(seq 1 10); do
  if command -v ss >/dev/null 2>&1; then
    ! ss -tlnp 2>/dev/null | grep -q ":${PORT} " && break
  else
    break
  fi
  sleep 0.5
done

exec node "$SCRIPT_DIR/server.js"
