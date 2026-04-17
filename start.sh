#!/bin/bash
PORT=8767
VIZ_DIR="/home/iggut/.openclaw/workspace/mempalace-viz"

# Kill anything holding the port (handles stale processes regardless of name/path)
fuser -k ${PORT}/tcp 2>/dev/null || true

# Wait for port to free up (max 5s)
for i in $(seq 1 10); do
  ! ss -tlnp | grep -q ":${PORT} " && break
  sleep 0.5
done

exec /usr/bin/node "${VIZ_DIR}/server.js"
