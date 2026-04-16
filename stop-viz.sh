#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="/tmp/mempalace-viz-server.log"
PORT="8767"
CMD_PATTERN='node .*server\.js'

get_server_pids() {
  pgrep -f "$CMD_PATTERN" || true
}

get_port_pids() {
  ss -ltnp 2>/dev/null | awk -v port=":${PORT}" '$4 ~ port { if (match($0, /pid=([0-9]+)/, m)) print m[1] }' | sort -u || true
}

pids="$(printf '%s\n%s\n' "$(get_server_pids)" "$(get_port_pids)" | awk 'NF' | sort -u | paste -sd' ' -)"
if [[ -z "$pids" ]]; then
  echo "mempalace-viz is not running"
  exit 0
fi

echo "Stopping mempalace-viz PID(s): $pids"
kill $pids || true
sleep 1

remaining="$(printf '%s\n%s\n' "$(get_server_pids)" "$(get_port_pids)" | awk 'NF' | sort -u | paste -sd' ' -)"
if [[ -n "$remaining" ]]; then
  echo "Force killing stubborn PID(s): $remaining"
  kill -9 $remaining || true
  sleep 1
fi

still_running="$(printf '%s\n%s\n' "$(get_server_pids)" "$(get_port_pids)" | awk 'NF' | sort -u | paste -sd' ' -)"
if [[ -n "$still_running" ]]; then
  echo "ERROR: failed to stop all mempalace-viz processes: $still_running"
  exit 1
fi

echo "mempalace-viz stopped"
echo "Log remains at: $LOG_FILE"
