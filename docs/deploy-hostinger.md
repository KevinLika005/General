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

- [ ] On `main`: `npm test`, `npm run lint`, `npm run typecheck`, `npm run audit:i18n`, `npm run check:images`, `npm run build` all pass
- [ ] Create `.env.production.local` in the repo root (git-ignored):
      `VITE_MAIL_ENDPOINT=https://<domain>/mail/send.php`
- [ ] `npm run build`. Vite bakes the endpoint into the bundle, so rebuild whenever it changes
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

## Smoke tests (right after upload)

- [ ] `curl -sI https://<domain>/equipment/heavy-equipment` → `200` (deep link, no 404)
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
- [ ] Update `PROJECT_COMPLETION_TODOS.md` (hosting and mail items)
