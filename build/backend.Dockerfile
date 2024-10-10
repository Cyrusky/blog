FROM node:20 AS builder

WORKDIR /build
COPY . .

RUN corepack enable
RUN corepack install --global pnpm@*
RUN corepack use pnpm
RUN pnpm install
RUN pnpm build:backend

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /build/build/scripts/backend.sh /app/entrypoint.sh
COPY --from=builder /build/packages/backend/dist/index.js /app/index.js
COPY --from=builder /build/packages/backend/prisma/ /app/prisma/
COPY --from=builder /build/build/deploy/package.backend.json /app/package.json


RUN npm config set registry http://mirrors.cloud.tencent.com/npm/
RUN npm install -g prisma
RUN npm install
RUN prisma generate

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

VOLUME /app/logs

CMD ["sh", "entrypoint.sh"]
