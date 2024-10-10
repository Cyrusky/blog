#!/bin/sh

echo >> .env <<EOF
JWT_SECRET="$JWT_SECRET"
TOKEN_EXPIRE_IN="1d"
DATABASE_URL="$DATABASE_URL"
EOF

node index.js
