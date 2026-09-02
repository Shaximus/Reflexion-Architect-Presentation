#!/bin/sh
set -eu
cd /workspace
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
RX_OFFLINE=1 npm run dev >>/tmp/app-startup.log 2>&1 &
