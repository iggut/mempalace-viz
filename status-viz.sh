#!/usr/bin/env bash
set -euo pipefail

PORT="8767"
LOG_FILE="/tmp/mempalace-viz-server.log"
CMD_PATTERN='node .*server\.js'

server_pids="$(pgrep -f "$CMD_PATTERN" || true)"
port_pids="$(ss -ltnp 2>/dev/null | awk -v port=":${PORT}" '$4 ~ port { if (match($0, /pid=([0-9]+)/, m)) print m[1] }' | sort -u || true)"
pids="$(printf '%s\n%s\n' "$server_pids" "$port_pids" | awk 'NF' | sort -u | paste -sd' ' -)"

if [[ -z "$pids" ]]; then
  echo "mempalace-viz is not running"
  exit 0
fi

echo "mempalace-viz PID(s): $pids"
if ss -ltnp | grep -q ":$PORT\\b"; then
  echo "Port $PORT: listening"
  echo "URL: http://127.0.0.1:$PORT"
else
  echo "Port $PORT: not listening"
fi

echo "Recent log lines:"
tail -n 20 "$LOG_FILE" 2>/dev/null || echo "(no log file yet)"
