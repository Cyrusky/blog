#!/usr/bin/env bash

cat <<EOF > ./build/deploy/docker-compose.backend.yml
services:
  backend:
    image: registry.cn-hangzhou.aliyuncs.com/borgor/assistant_backend:latest
    container_name: assistant_backend
    pull_policy: always
    restart: unless-stopped
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - DATABASE_URL=${DATABASE_URL}
    networks:
      - tools_network
    volumes:
      - ./logs:/app/logs
    ports:
      - "3000:3000"

networks:
  tools_network:
EOF
