# TopLink Security

Production-oriented website and administration portal for TopLink Security. The
project includes a Vite/React frontend and an Express/MongoDB API for articles,
resources, enquiries, subscriptions, payments, and protected downloads.

## Local setup

Requirements: Node.js 20+, npm, and MongoDB.

```bash
cd backend
cp example.env .env
npm install
npm run dev
```

In a second terminal:

```bash
cd frontend
cp example.env .env
npm install
npm run dev
```

The default local addresses are `http://localhost:5173` for the website and
`http://localhost:5000/api` for the API.

## Release checks

```bash
cd frontend && npm run lint && npm run build && npm audit --omit=dev
cd backend && npm run lint && npm test && npm audit --omit=dev
```

## Production configuration

- Set every production value documented in `backend/example.env`.
- Use separate, randomly generated values for `JWT_SECRET` and
  `DOWNLOAD_TOKEN_SECRET`.
- Set `CLIENT_URL` to the deployed website origin. Multiple origins can be
  comma-separated when a staging site is required.
- Set `PUBLIC_SITE_URL` to the canonical public website origin used in email
  links and payment redirects.
- Set `VITE_API_URL` before building the frontend.
- Rotate any credential that has previously been committed or shared.
- Serve both applications over HTTPS and keep `.env` files outside version
  control.

The API validates required production settings during startup and exits with a
clear error when one is missing.

## Hostinger VPS deployment

This repository includes a PM2 process definition, an Nginx virtual-host
template, and a repeatable release script. It expects the project at
`/var/www/toplink-1`; update the `root` line in the Nginx template if the VPS
uses another path.

Initial VPS setup:

```bash
sudo chown -R "$USER":"$USER" /var/www/toplink-1
chmod 600 backend/.env
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo cp deploy/nginx/toplinksecurity.conf /etc/nginx/sites-available/toplinksecurity
sudo ln -s /etc/nginx/sites-available/toplinksecurity /etc/nginx/sites-enabled/toplinksecurity
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d toplinksecurity.com -d www.toplinksecurity.com
```

Keep port `5000` closed to the public internet. The API binds to
`127.0.0.1`, and only Nginx should communicate with it.

Set `CLIENT_URL=https://toplinksecurity.com` in `backend/.env`. If both the
`www` and non-`www` origins serve the app without a redirect, list both as a
comma-separated value. `PUBLIC_SITE_URL`, `PAYSTACK_CALLBACK_URL`, and
`DOWNLOAD_TOKEN_SECRET` are recommended but backward-compatible fallbacks are
provided so an existing VPS environment does not crash after an update.

Deploy subsequent releases from the project root:

```bash
./deploy/vps-release.sh
```

The release installs locked dependencies, runs checks, builds the frontend,
reloads the PM2 process, validates Nginx, and confirms database readiness.

### Diagnosing a 502

Nginx returns 502 when the API process is stopped or not listening on its
configured upstream. Run these on the VPS:

```bash
pm2 status
pm2 logs toplink-api --lines 100
curl -i http://127.0.0.1:5000/api/health
curl -i http://127.0.0.1:5000/api/ready
sudo nginx -t
sudo tail -n 100 /var/log/nginx/error.log
```

The API must be `online`, `/api/health` must return 200, and `/api/ready` must
return 200 before Nginx can proxy it successfully. The PM2 process definition
also persists the process list so it returns after a VPS reboot.
