# Deploy Checklist: General Trading on Hostinger

Static site (`dist/`) plus the PHP mail endpoint (`server/mail/`), on Hostinger shared hosting (LiteSpeed/Apache, `public_html`).

Server layout:

```text
public_html/
├── .htaccess          ← from dist/ (SPA routing; hidden file, make sure it uploads)
├── index.html, assets/, images/   ← rest of dist/
└── mail/
    ├── .htaccess      ← from server/mail/ (only send.php is reachable)
    ├── send.php, Mailer.php, config.example.php, templates/
    └── config.local.php   ← created on the server only, never in git
```

Frontend and mail endpoint share one domain, so the form posts to `https://<domain>/mail/send.php`.

## Pre-deploy

- [ ] Owner has approved deployment
- [ ] **Confirm the canonical host: `https://<domain>` or `https://www.<domain>`.** Use only that host everywhere
      below. Redirect the other one to it (hPanel → Domains → Redirects, or the `.htaccess` rule under Deploy)
- [ ] On `main`: `npm test`, `npm run lint`, `npm run typecheck`, `npm run audit:i18n`, `npm run check:images` all pass
- [ ] Create `.env.production.local` in the repo root (git-ignored). It overrides `.env.local`:
      `VITE_MAIL_ENDPOINT=https://<domain>/mail/send.php`
      `VITE_SITE_URL=https://<domain>` (the real canonical host: https, no trailing slash, no path)
- [ ] **Production build: `npm run build`** (never `build:local`). It refuses to run if `VITE_SITE_URL` is
      missing or a placeholder (`.local`, `.test`, `localhost`, `example.com`, ...). Vite bakes both
      variables into the bundle, so rebuild whenever either changes.
      The build prerenders every route to static HTML and writes `404.html`, `sitemap.xml` and `robots.txt`.
- [ ] Verify the build output before uploading:
  - `grep -o '<link rel="canonical"[^>]*>' dist/about.html` → `https://<domain>/about`
  - `head -5 dist/sitemap.xml` → every `<loc>` starts with `https://<domain>/`
  - `cat dist/robots.txt` → contains `Disallow: /mail/` and `Sitemap: https://<domain>/sitemap.xml`
  - `grep -lE 'https?://[^"/]*(\.local|\.test|localhost)' dist/*.html dist/sitemap.xml dist/robots.txt` → no output (no placeholder host)
- [ ] hPanel → Advanced → PHP Configuration: PHP 8.0 or newer (`send.php` uses `str_starts_with`)
- [ ] hPanel → Emails: company mailbox exists (e.g. `info@<domain>`); note its password
- [ ] Rollback copy: hPanel → Files → Backups, or zip the current `public_html` in File Manager

## Deploy

- [ ] Upload the **contents** of `dist/` into `public_html/`, including `.htaccess`
- [ ] Upload the contents of `server/mail/` into `public_html/mail/`, including `.htaccess`
- [ ] In `public_html/mail/`, create `config.local.php` from `config.example.php`:
  - `mail_env` → `'production'`
  - `recipient`, `from_email` → the company mailbox
  - `use_smtp` → `true`, `smtp_host` → `'smtp.hostinger.com'`
  - `smtp_port` → `465` with `smtp_secure` `'ssl'` (or `587` with `'tls'`)
  - `smtp_username` / `smtp_password` → the mailbox login
  - `debug` → `false`, `allow_live_delivery_from_localhost` → `false`
  - `allowed_origins` → `['https://<domain>', 'https://www.<domain>']`
- [ ] hPanel → Security → SSL: certificate active, **Force HTTPS** on
- [ ] If redirecting www ↔ non-www in `.htaccess` instead of hPanel, add this directly after `RewriteBase /`
      (example: www → bare domain):
      `RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]`
      `RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]`

## Smoke tests (right after upload)

SEO and routing:
- [ ] `curl -sI https://<domain>/equipment/heavy-equipment` → `200` (deep link, no 404)
- [ ] `curl -s https://<domain>/equipment/heavy-equipment | grep -o '<h1[^>]*>[^<]*'` → the category name (content in static HTML)
- [ ] `curl -sI https://<domain>/equipment/` → `301` to `/equipment` (trailing-slash redirect)
- [ ] `curl -sI https://<domain>/about/` → `301` to `/about`
- [ ] `curl -sI https://<domain>/no-such-page` → `404`, and the browser shows the app's "page not found" view
- [ ] `curl -sI https://<domain>/equipment/heavy-equipment/no-such-product` → `404`
- [ ] `curl -s https://<domain>/about | grep canonical` → `https://<domain>/about` (real domain)
- [ ] `curl -s https://<domain>/search | grep robots` → `noindex, follow`
- [ ] `curl -sI http://<domain>/` and the other www/non-www host → `301` to `https://<domain>/`
- [ ] `https://<domain>/robots.txt` has `Disallow: /mail/`; `/sitemap.xml` loads and uses the real domain
- [ ] `curl -sI https://<domain>/mail/` → not `200` (no listing), and `/mail/` never appears in the sitemap

App:
- [ ] Reload a product page in the browser → page renders, images load
- [ ] `curl -sI https://<domain>/mail/config.local.php` → `403`
- [ ] `curl -sI https://<domain>/mail/Mailer.php` → `403`
- [ ] `/contact`: submit in SQ, then EN → success message; email arrives; `From` = company mailbox, `Reply-To` = visitor
- [ ] Add 2 products → `/request-quote` → submit → email lists both products with quantities
- [ ] Browser console has no errors on `/`, `/equipment`, one product page
- [ ] Light/dark toggle and SQ/EN switch work on the live domain

## Rollback triggers

Roll back to the backup if any of these hold after deploy:

- A route shows a blank page or 404 on reload
- Contact or quote form returns an error, or no email arrives within 5 minutes
- `config.local.php` or `Mailer.php` is reachable (anything other than `403`)

## Post-deploy

- [ ] `git push origin main`
- [ ] Google Search Console: add a **Domain property** (DNS TXT record), then Sitemaps → submit `https://<domain>/sitemap.xml`
- [ ] Search Console → URL Inspection on `/`, one category, one product → "URL is on Google" or "can be indexed"; view the rendered HTML
- [ ] Rich Results Test (search.google.com/test/rich-results) on `/` (Organization), `/faq` (FAQ), one category and one product (Breadcrumbs): no errors
- [ ] Share `/` and one product in WhatsApp or LinkedIn → preview shows the right title, description and image
- [ ] Update `PROJECT_COMPLETION_TODOS.md` (hosting and mail items)
