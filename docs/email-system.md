# Email System

## What is tracked

Tracked repo files for the email system:

- `server/mail/send.php`
- `server/mail/Mailer.php`
- `server/mail/config.example.php`
- `server/mail/templates/render.php`
- `src/services/formSubmission.ts`
- `src/utils/quoteProducts.ts`
- `src/components/forms/ContactForm.tsx`
- `src/components/forms/RequestQuoteForm.tsx`
- `docs/email-system.md`

Local-only file:

- `server/mail/config.local.php`

`server/mail/config.local.php` is intentionally ignored by Git and must be created locally when you want to run the PHP mail endpoint with local or production-specific settings.

## Form coverage

### Contact form

File: `src/components/forms/ContactForm.tsx`

Submitted fields:

- `formType`
- `fullName`
- `companyName`
- `email`
- `phone`
- `location`
- `inquiryType`
- `contactMethod`
- `timeline`
- `message`
- `consent`
- `company_website`
- `form_started_at`
- `source_path`
- `source_url`

### Request quote form

File: `src/components/forms/RequestQuoteForm.tsx`

Submitted fields:

- `formType`
- `fullName`
- `companyName`
- `companyRole`
- `vatNumber`
- `email`
- `phone`
- `location`
- `inquiryType`
- `contactMethod`
- `timeline`
- `deliveryPreference`
- `message`
- `consent`
- `products_json`
- `company_website`
- `form_started_at`
- `source_path`
- `source_url`

### Quote product payload

`products_json` is built from the current inquiry list and includes the data already available in this repo:

- inquiry item ID
- product ID
- product slug
- category slug/title
- subcategory slug/title when present
- product type slug/title
- brand
- model
- title
- SKU
- quantity
- formatted price
- raw price mode
- raw price amount
- raw price currency
- availability
- condition
- location
- year
- operating hours
- mileage
- selected notes
- excerpt
- product path
- product URL

## Frontend configuration

Create `.env.local` in the repo root:

```env
VITE_MAIL_ENDPOINT=http://127.0.0.1:8001/send.php
```

The frontend now expects `VITE_MAIL_ENDPOINT` explicitly. It no longer silently falls back to a guessed local URL.

## Mail configuration

1. Copy the shape from `server/mail/config.example.php`.
2. Create `server/mail/config.local.php`.
3. Keep real SMTP credentials only in `config.local.php`.

Example local config:

```php
<?php

return [
    'mail_env' => 'local',
    'recipient' => 'info@company-domain.example',
    'from_email' => 'info@company-domain.example',
    'from_name' => 'Website Forms',
    'use_smtp' => true,
    'smtp_host' => '127.0.0.1',
    'smtp_port' => 1025,
    'smtp_secure' => '',
    'smtp_username' => '',
    'smtp_password' => '',
    'debug' => true,
    'allow_live_delivery_from_localhost' => false,
    'allowed_origins' => [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ],
    'timezone' => 'UTC',
    'request_id_prefix' => 'GEN',
];
```

Notes:

- `config.example.php` must keep placeholder values only.
- `config.local.php` must never be committed.
- Local development should keep `allow_live_delivery_from_localhost` as `false`.

## Local runbook

### 1. Install frontend dependencies

```powershell
npm install
```

Only run this if dependencies are missing.

### 2. Start the Vite frontend

```powershell
npm run dev
```

### 3. Start the PHP endpoint

From the repo root:

```powershell
php -S 127.0.0.1:8001 -t server/mail
```

The endpoint URL will be:

```text
http://127.0.0.1:8001/send.php
```

### 4. Start Mailpit or MailHog

Preferred:

```powershell
mailpit
```

Fallback:

```powershell
mailhog
```

The local SMTP catcher must be running if you want a successful local `MAIL_SENT` response. Without it, valid requests should fail safely as `MAIL_FAILED`.

## Local testing checklist

### Contact form success path

1. Start Mailpit or MailHog.
2. Start the PHP server.
3. Start Vite with `VITE_MAIL_ENDPOINT`.
4. Open `/contact`.
5. Fill all required fields.
6. Submit the form.
7. Confirm success appears only after the backend returns `MAIL_SENT`.
8. Confirm the form resets only after success.
9. Confirm the captured email includes:
   - form type
   - request ID
   - submission timestamp
   - form start timestamp
   - source path and source URL
   - all contact fields
   - consent status

### Request quote success path

1. Add one or more products to the inquiry list.
2. Set quantity and notes on `/inquiry-list`.
3. Open `/request-quote`.
4. Fill the buyer/request fields.
5. Submit the form.
6. Confirm success appears only after the backend returns `MAIL_SENT`.
7. Confirm the form resets only after success.
8. Confirm inquiry items are cleared only after success.
9. Confirm the captured email includes:
   - all buyer/request fields
   - selected products table
   - product path and full URL
   - quantities and notes
   - raw and formatted pricing fields

### Validation and spam rejection checks

Test these explicitly:

- missing required contact fields -> `VALIDATION_ERROR`
- invalid email -> `VALIDATION_ERROR`
- invalid `products_json` -> `VALIDATION_ERROR`
- quantity under `1` in `products_json` -> `VALIDATION_ERROR`
- filled `company_website` honeypot -> `SPAM_REJECTED`
- invalid or stale `form_started_at` -> `VALIDATION_ERROR`
- unrealistically fast submission under the local spam threshold -> `SPAM_REJECTED`
- valid payload without local SMTP catcher -> `MAIL_FAILED`

## Sender and SMTP rules

- SMTP `From` must be the configured company mailbox.
- visitor email must be used only as `Reply-To`
- recipient is configurable in mail config
- frontend never receives SMTP credentials
- real production SMTP credentials must never be committed

## Production later

When production SMTP is ready:

1. update `server/mail/config.local.php` with the real mailbox and SMTP credentials
2. keep `from_email` on the company domain mailbox
3. keep visitor addresses in `Reply-To` only
4. replace local `allowed_origins` with the deployed frontend origin
5. keep `mail_env` and localhost delivery rules aligned with the real environment

## Secrets never to commit

- SMTP username
- SMTP password
- production mailbox credentials
- private recipient overrides
- any real production-only origin secrets if treated as sensitive by operations
