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

## Deployment

Build the frontend with `npm run build` and deploy `frontend/dist` to a static
host configured to fall back to `index.html` for client-side routes. Run the
backend with `NODE_ENV=production npm start` behind a TLS-terminating reverse
proxy. The API exposes `GET /api/health` for health checks and handles graceful
shutdown signals from the hosting platform.
