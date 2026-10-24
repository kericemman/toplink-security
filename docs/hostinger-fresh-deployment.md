# TopLink Security — Fresh Hostinger VPS Deployment

This guide records the current application release and prepares a clean VPS
deployment. It does not provision or change the VPS. Deploy from the project
root at `/var/www/toplink-1` unless the Nginx root is changed to match the
actual installation path.

## What this release contains

- Replaced the public homepage with the supplied HTML reference design and
  content while retaining the existing TopLink logo and Insights preview.
- Updated shared navigation and footer, public page styling, and internal links
  across the retained site pages. The public resources/store route is hidden.
- Added direct branded checkout screens for the temporarily US$2 Executive Security Risk
  Governance Diagnostic and the US$295 Decision Room session. Each collects
  name, email, and country, then initializes Paystack directly.
- Kept payment confirmation server-side through Paystack verification and
  signed webhooks. Successful Diagnostic payment unlocks the private Diagnostic
  and Decision Guide; Decision Room payment unlocks the separate private intake.
- Added the Decision Review qualification and engagement journey. New Review
  engagements use the approved US$5,000 price. Existing records retain their
  saved prices.
- Added the private HTML instruments under `backend/src/documents/`. They must
  be deployed with the API source; they are not served from the public build.
- Added administrative views for Diagnostic submissions, Decision Room
  bookings and Review qualifications. Existing MongoDB content and records
  should be preserved; do not initialize a blank database over the current one.
- Routed notification email through a shared branded template. The sender and
  notification recipient are `engagements@toplinksecurity.co.ke`.
- Updated public canonical-domain settings, metadata, sitemap, robots rules,
  Nginx server names and setup references to `toplinksecurity.co.ke`.

## Before the first deployment

1. Preserve the current MongoDB database and take a database backup before
   changing the VPS. No database wipe or price migration is part of this
   release.
2. Transfer the complete project, including `backend/src/documents/`, both
   lockfiles, `ecosystem.config.cjs`, `deploy/`, and `frontend/public/assets/`.
   Keep local `.env` files and `node_modules` out of the upload.
3. Install Node.js `20.19+`, npm, PM2, Nginx and Certbot on the VPS. Ensure the
   deployment account owns the project directory and can reload Nginx.
4. Create `backend/.env` on the VPS with production values:

   ```dotenv
   NODE_ENV=production
   HOST=127.0.0.1
   PORT=5000
   MONGO_URI=<production MongoDB connection string>
   JWT_SECRET=<long unique random secret>
   DOWNLOAD_TOKEN_SECRET=<different long unique random secret>
   JWT_EXPIRES_IN=30d
   CLIENT_URL=https://toplinksecurity.co.ke,https://www.toplinksecurity.co.ke
   PUBLIC_SITE_URL=https://toplinksecurity.co.ke
   PAYSTACK_CALLBACK_URL=https://toplinksecurity.co.ke/payment/success
   PAYSTACK_PUBLIC_KEY=<Paystack live public key>
   PAYSTACK_SECRET_KEY=<Paystack live secret key>
   ADMIN_EMAIL=engagements@toplinksecurity.co.ke
   ADMIN_PASSWORD=<new strong admin password>
   CLOUDINARY_CLOUD_NAME=<Cloudinary cloud name>
   CLOUDINARY_API_KEY=<Cloudinary API key>
   CLOUDINARY_API_SECRET=<Cloudinary API secret>
   CLOUDINARY_DELIVERY_HOSTS=res.cloudinary.com
   RESEND_API_KEY=<Resend API key>
   FROM_EMAIL=engagements@toplinksecurity.co.ke
   FROM_NAME=TopLink Security
   ```

   `DOWNLOAD_TOKEN_SECRET` must differ from `JWT_SECRET`. Set file permissions
   with `chmod 600 backend/.env`. Do not copy development credentials or test
   Paystack keys into production.
5. Verify `toplinksecurity.co.ke` in Resend and authorize
   `engagements@toplinksecurity.co.ke` as a sender. Verify DNS records before
   relying on client confirmations and administrative alerts.
6. Confirm the domain DNS points to the VPS and that the Co-op Bank USD
   settlement account is approved in the Paystack dashboard before accepting
   live USD payments. Application configuration cannot verify bank settlement.
   Do not run `npm run seed:admin` against the existing database unless you
   intend to create or promote the configured admin account; it does not rename
   an existing account when `ADMIN_EMAIL` changes.
7. Install the supplied Nginx site configuration and obtain the TLS
   certificate. The site configuration serves both `www` and non-`www`, so
   `CLIENT_URL` above allows both browser origins:

   ```bash
   cd /var/www/toplink-1
   sudo cp deploy/nginx/toplinksecurity.conf /etc/nginx/sites-available/toplinksecurity
   sudo ln -s /etc/nginx/sites-available/toplinksecurity /etc/nginx/sites-enabled/toplinksecurity
   sudo nginx -t
   sudo systemctl reload nginx
   sudo certbot --nginx --redirect -d toplinksecurity.co.ke -d www.toplinksecurity.co.ke
   ```

8. Deploy from the project root:

   ```bash
   cd /var/www/toplink-1
   ./deploy/vps-release.sh
   ```

   `deploy/vps-release.sh` explicitly builds the frontend with
   `https://toplinksecurity.co.ke/api`, independent of the developer's ignored
   local `frontend/.env`. An operator can override that build value by setting
   `VITE_API_URL` when invoking the script.

The Nginx root is `/var/www/toplink-1/frontend/dist`. The API binds only to
`127.0.0.1:5000`, and Nginx proxies `/api/` to it; do not expose port 5000
publicly. After Certbot, confirm HTTPS redirects and certificate renewal.

## Post-deployment checks

- Check `pm2 status`, `curl -i https://toplinksecurity.co.ke/api/health`, and
  `curl -i https://toplinksecurity.co.ke/api/ready`.
- Open the homepage, About, Services, Contact, Insights, Decision Review,
  Diagnostic checkout and Decision Room checkout on desktop and mobile.
- Confirm `/diagnostic/checkout` and `/decision-room/checkout` build against
  `/api`, not localhost. Confirm Diagnostic shows US$2 (USD) and Decision Room shows USD 295.
- Confirm `/api/paystack/webhook` is configured in Paystack and server-side
  verification gates every paid instrument and intake route.
- Test email delivery and sender authorization with a controlled test before
  real client use.
- Confirm old MongoDB records, articles and admin account are present. Changing
  `ADMIN_EMAIL` in environment settings does not itself rename an existing
  MongoDB admin user; verify the intended admin login separately.
- Check logs with `pm2 logs toplink-api --lines 100` and the Nginx error log.

The local readiness checks are frontend lint/build and backend lint/tests. A
successful local build does not confirm VPS DNS, TLS, database connectivity,
Resend authorization or Paystack USD settlement.
