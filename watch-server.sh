#!/usr/bin/env bash
set -euo pipefail

cd /home/iggut/.openclaw/workspace/mempalace-viz

export HOST="${HOST:-0.0.0.0}"
export PORT="${PORT:-8767}"
PID_FILE="/tmp/mempalace-viz.pid"
LOG_FILE="/tmp/mempalace-viz.log"

kill_server() {
  if [[ -f "$PID_FILE" ]]; then
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
      sleep 0.5
      kill -9 "$pid" 2>/dev/null || true
    fi
    rm -f "$PID_FILE"
  fi
  if command -v fuser >/dev/null 2>&1; then
    fuser -k "${PORT}/tcp" >/dev/null 2>&1 || true
  fi
}

start_server() {
  kill_server
  nohup env HOST="$HOST" PORT="$PORT" AUTO_EXIT_MS=0 node /home/iggut/.openclaw/workspace/mempalace-viz/server.js >>"$LOG_FILE" 2>&1 </dev/null &
  echo $! > "$PID_FILE"
}

watch_loop() {
  start_server
  while true; do
    inotifywait -qq -e close_write,move,create,delete constellation.html dynamic.html server.js >/dev/null 2>&1 || true
    start_server
  done
}

case "${1:-watch}" in
  watch)
    watch_loop
    ;;
  start)
    start_server
    ;;
  stop)
    kill_server
    ;;
  restart)
    start_server
    ;;
  *)
    echo "Usage: $0 [watch|start|stop|restart]" >&2
    exit 2
    ;;
esac
