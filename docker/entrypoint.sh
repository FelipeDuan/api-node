#!/usr/bin/env bash
set -Eeuo pipefail

echo "Running migrations..."
pnpm exec drizzle-kit migrate

echo "Starting app..."
exec "$@"
