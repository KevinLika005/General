# Project Completion TODOs

Last verified: 2026-09-26, branch `fix/phase-0-lock-in`.

This file lists **open work only**. Closed items live in git history.

## Validation status

| Command | Status |
| --- | --- |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run audit:i18n` | Pass |
| `npm run check:images` | Pass (20 products, 10 categories, 20 attributions) |
| `npm run build` | Pass, no warnings (main chunk 487 kB, routes lazy-loaded) |

`dist/` is ignored, so `npm run build` no longer dirties the repo.

## Closed in Phase 0 (for reference)

- Image audit script repaired.
- `.gitignore` covers `dist/`, `.env*`, `.DS_Store`, `tmp_*.png`, `server/mail/config.local.php`.
- `dist/`, temp screenshots, and `config.local.php` untracked. The copy of `config.local.php` pushed in `fd3b36f` had **empty** SMTP username/password; only local host and mailbox addresses were exposed. Never put real credentials in that path.
- Theme system, dialog focus trapping/restoration (`useDialogSurface`), route lazy loading, and i18n fallbacks committed.
- Form transport errors are localized on the frontend via error codes; English `message` text from `send.php` is not shown to users.
- Homepage stats derived from catalog data.
- Company phone, secondary phone, address, location, and hours filled in.

---

## Phase 1: Hosting and mail (launch blockers)

Host: **Hostinger** (PHP shared hosting). Step-by-step deploy: `docs/deploy-hostinger.md`.

Done:
- `public/.htaccess` routes app paths to `index.html` (deep links no longer 404); `server/mail/.htaccess` blocks everything in `mail/` except `send.php`. Both verified on a local Apache 2.4.

### [P0] Production mail configuration
- On the server only (never commit): create `server/mail/config.local.php` from `config.example.php` with:
  - real company mailbox as `from_email`, real `recipient`
  - production SMTP host/port/credentials
  - `mail_env` set for production
  - `allowed_origins` = the live frontend origin
- Build with `VITE_MAIL_ENDPOINT` set to the production endpoint URL. Vite inlines it at build time; changing it requires a rebuild.

### [P0] Live mail smoke test
- `/contact` and `/request-quote`, in both `sq` and `en`.
- Email arrives at recipient; `From` is company mailbox; `Reply-To` is visitor.
- Quote email contains product table with quantities and notes.
- Honeypot (`company_website`) and fast-submit → `SPAM_REJECTED`.
- SMTP unavailable → localized failure message, form not reset, inquiry list not cleared.

## Phase 2: Content that must be true (owner input required)

Do not invent any of this data.

### [P0] Company email
- `src/data/site.ts` `email` is empty → no email shown on contact page, header, or footer.

### [P1] Sales contacts
- `src/data/contact.ts` `baseSalesContacts` is empty. Contact page shows a generic fallback panel.
- Either supply real contacts or accept the fallback for launch.

### [P1] Social links
- `socialLinks` is empty. Acceptable if none exist.


### [P1] Product document links
- 25 product `documents` entries in `src/data/products.ts` link to `/technical-library`, which is placeholder content.
- Options: remove the entries, relabel as "request via quote", or add real PDFs under `public/documents/`.

### [P1] Media licensing
- Confirm every asset in `src/data/imageAttributions.ts` and `public/images/` is cleared for commercial use.
- Source/data comments still reference illustrative or temporary content in ~17 places across `products.ts`, `categories.ts`, `imageAttributions.ts`, `TechnicalLibraryPage.tsx`.

### [P1] Legal copy
- `/privacy` and `/terms` need owner/legal review. Forms collect personal data.

## Phase 3: Final gate

- [ ] `npm run lint`, `npm run typecheck`, `npm run audit:i18n`, `npm run check:images`, `npm run build`
- [ ] Every route in light + dark, `sq` + `en`, mobile + desktop
- [ ] Header, mega menu, mobile menu
- [ ] Catalog filters + mobile filter drawer
- [ ] Inquiry list → request quote
- [ ] Keyboard pass on the three dialogs (focus trap + restore now implemented, not yet manually verified)
- [ ] No console errors, no broken links

## Post-launch (not blocking)

- Visual redesign done on `feature/visual-redesign` (spec: `docs/superpowers/specs/2026-09-26-visual-redesign-design.md`).
- Favicon references `/src/assets/general-logo-tab.png` from `index.html` (works in Vite; move to `public/` if preferred).
- Brand cards use initials instead of logos.
- Filter placeholder examples (`FilterSidebar.tsx`).
- `sortOptions` export in `src/data/catalog.ts` may be dead.
- Business-profile content duplicated between locale files and `src/data/site.ts`.
- Split large files (`Header.tsx`, `CatalogPage.tsx`, `CategoryPage.tsx`, `ProductDetailPage.tsx`, `RequestQuoteForm.tsx`) only if it simplifies work.
- `README.md` is empty.
- Inquiry list is localStorage-only; confirm that is acceptable.

## Phase 3: SEO launch inputs (owner decision)

Details and ready-made plans: `docs/seo-plan.md`. Deploy steps: `docs/deploy-hostinger.md`.
**Send the owner `docs/owner-catalog-checklist.md`**: it covers photos, licenses, serials, prices, contacts and the domain in one pass.

### [P0] Production domain
- Owner confirms the domain and www vs non-www. Set `VITE_SITE_URL=https://<domain>` in `.env.production.local`.
- `npm run build` refuses a missing or placeholder domain; `npm run build:local` is for local testing only.

### [P1] Catalog authenticity (blocks Product structured data)
- Confirm each listing's serial, SKU, price, stock state and photo. Example mismatch: the Bomag BW213D listing photo shows a Caterpillar roller.

### [P1] LocalBusiness
- Needs a real company email, confirmation that the address can be visited, phones, and hours. Then set `localBusiness.confirmed` in `src/data/site.ts`.

### [P1] Analytics provider
- Choose Plausible, Umami or GA4 (GA4 needs a consent banner). Events already fire via `src/utils/analytics.ts`.

### [P0] Image licenses
- 15 CC BY / BY-SA product photos require a visible credit, and the site shows none. Replace them, or add credit lines (see checklist 1.2).

### [P2] Technical library
- `noindex` until a real PDF is linked via `fileUrl` in `src/data/technicalLibrary.ts`; then indexable automatically.

### [P2] English URLs
- Built and switched off (`VITE_ENGLISH_URLS`). Activation steps: `docs/seo-plan.md` §2.
