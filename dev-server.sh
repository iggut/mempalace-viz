#!/usr/bin/env bash
set -euo pipefail

cd /home/iggut/.openclaw/workspace/mempalace-viz

export HOST="${HOST:-0.0.0.0}"
export PORT="${PORT:-8767}"

if command -v fuser >/dev/null 2>&1; then
  fuser -k "${PORT}/tcp" >/dev/null 2>&1 || true
fi

exec node /home/iggut/.openclaw/workspace/mempalace-viz/server.js
