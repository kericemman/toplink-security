#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

command -v node >/dev/null
command -v npm >/dev/null
command -v pm2 >/dev/null
command -v nginx >/dev/null

node_version="$(node -p 'process.versions.node')"
node -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major < 20 || (major === 20 && minor < 19)) process.exit(1)'
echo "Using Node.js ${node_version}"

cd "${PROJECT_ROOT}/frontend"
npm ci
npm run lint
npm run build -- --outDir dist-next

rm -rf dist-previous
if [[ -d dist ]]; then mv dist dist-previous; fi
mv dist-next dist

cd "${PROJECT_ROOT}/backend"
npm ci
npm run lint
npm test
npm prune --omit=dev

cd "${PROJECT_ROOT}"
pm2 startOrReload ecosystem.config.cjs --env production --update-env
pm2 save

sudo nginx -t
sudo systemctl reload nginx

for attempt in {1..15}; do
  if curl --fail --silent http://127.0.0.1:5000/api/ready >/dev/null; then
    echo "TopLink Security deployment is healthy."
    exit 0
  fi
  sleep 2
done

echo "API readiness check failed. Inspect: pm2 logs toplink-api --lines 100" >&2
exit 1
