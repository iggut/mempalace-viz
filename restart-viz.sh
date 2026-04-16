#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/tmp/mempalace-viz-server.log"
PORT="8767"
CMD_PATTERN='node .*server\.js'

get_server_pids() {
  pgrep -f "$CMD_PATTERN" || true
}

get_port_pids() {
  ss -ltnp 2>/dev/null | awk -v port=":${PORT}" '$4 ~ port { if (match($0, /pid=([0-9]+)/, m)) print m[1] }' | sort -u || true
}

wait_for_port_clear() {
  for _ in {1..20}; do
    if ! ss -ltnp 2>/dev/null | grep -q ":$PORT\\b"; then
      return 0
    fi
    sleep 0.5
  done
  return 1
}

cd "$PROJECT_DIR"

old_pids="$(printf '%s\n%s\n' "$(get_server_pids)" "$(get_port_pids)" | awk 'NF' | sort -u | paste -sd' ' -)"
if [[ -n "$old_pids" ]]; then
  echo "Stopping existing server PID(s): $old_pids"
  kill $old_pids || true
  sleep 1
fi

remaining_pids="$(printf '%s\n%s\n' "$(get_server_pids)" "$(get_port_pids)" | awk 'NF' | sort -u | paste -sd' ' -)"
if [[ -n "$remaining_pids" ]]; then
  echo "Force killing stubborn PID(s): $remaining_pids"
  kill -9 $remaining_pids || true
fi

if ! wait_for_port_clear; then
  echo "ERROR: port $PORT is still busy after stopping old process(es)"
  ss -ltnp | grep ":$PORT\\b" || true
  exit 1
fi

echo "Starting mempalace-viz server..."
setsid -f node server.js >>"$LOG_FILE" 2>&1 < /dev/null
sleep 1

new_pid="$(printf '%s\n%s\n' "$(get_server_pids)" "$(get_port_pids)" | awk 'NF' | sort -u | tail -n 1)"
if [[ -z "$new_pid" ]]; then
  echo "ERROR: server did not start"
  echo "Last 40 log lines:"
  tail -n 40 "$LOG_FILE" || true
  exit 1
fi

if ss -ltnp | grep -q ":$PORT\\b"; then
  echo "mempalace-viz running"
  echo "  PID: $new_pid"
  echo "  URL: http://127.0.0.1:$PORT"
  echo "  Log: $LOG_FILE"
else
  echo "WARNING: process started (PID $new_pid) but port $PORT is not listening yet"
  echo "Check log: $LOG_FILE"
fi
