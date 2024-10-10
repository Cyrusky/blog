#!/usr/bin/env bash
cd /root/runner/assistant_backend/
docker compose up -d
if docker images | grep -q none; then
  docker images | grep none | awk '{print $3}' | xargs docker image rm -f
fi
