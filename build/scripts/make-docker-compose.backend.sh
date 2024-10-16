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
      - FEISHU_TOKEN=${FEISHU_TOKEN}
    networks:
      - tools_network
    volumes:
      - ./logs:/app/logs
    depends_on:
      - postgres
    ports:
      - "3000:3000"

  postgres:
    image: postgres:15-alpine
    container_name: assistant_db
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: Jinboagg1314!@#
      LANG: C.UTF-8
    networks:
      - tools_network
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

networks:
  tools_network:

volumes:
  postgres-data:
EOF