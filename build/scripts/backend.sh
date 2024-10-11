#!/bin/sh

cat <<EOF > .env
JWT_SECRET="$JWT_SECRET"
TOKEN_EXPIRE_IN="1d"
DATABASE_URL="$DATABASE_URL"
EOF

prisma db push --accept-data-loss
node index.js
