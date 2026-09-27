# SEO Plan: Work Waiting on Owner Decisions

How SEO works today: `src/seo/pageSeo.ts` resolves title, description, robots, canonical, Open Graph
and JSON-LD for every route. `npm run build` prerenders each route to static HTML
(`scripts/prerender.mjs`) and writes `sitemap.xml`, `robots.txt` and `404.html`. The browser then
takes over with the live app (`src/main.tsx`).

Each section below is blocked on the owner. Do not implement it early.

---

## 1. Product structured data (after catalog confirmation)

**Blocked on:** confirmation that each listing is a real unit. That means the serial, SKU, price,
stock state and photo. Photos must show the actual unit and be licensed. Today several do not:
for example, the "Bomag BW213D" photo shows a Caterpillar roller.

**Plan**
1. Owner signs off product by product. Add a `verified: true` flag to `Product` in `src/data/types.ts`
   and set it only on confirmed listings.
2. In `getPageSeo` (product branch), for verified products only, add a `Product` node next to the
   BreadcrumbList with these fields:
   - `name`, `sku`, `mpn` (the model), `brand: { '@type': 'Brand', name }`, `image` (absolute URLs), `description`
   - `itemCondition`: `NewCondition` / `UsedCondition` / `RefurbishedCondition`
3. Add `offers` only when `priceMode === 'visible'` and the owner confirms the price is a real,
   current asking price:
   - `@type: Offer`, `price`, `priceCurrency: 'EUR'`, `url`, `itemCondition`
   - `availability`: `available` → `InStock`, `incoming` → `PreOrder`, `reserved` or `sold` → omit the offer
   - `starting-from` and `price-on-request` listings get **no** Offer. Google treats a missing price as
     "no offer"; inventing one is a policy violation.
4. Never add `aggregateRating` or `review` unless real, verifiable reviews exist on the page.
5. Add tests: an unverified product emits no Product node, and a price-on-request product emits no Offer.
6. After deploy, run the Rich Results Test on 3 products and watch Search Console → Shopping/Product reports.

---

## 2. English URLs: built, switched off

**Today:** English and Albanian share one URL, and the language is a stored preference
(localStorage). Crawlers don't store preferences, so Google indexes only Albanian. This is fine for launch.

**Already built, behind `VITE_ENGLISH_URLS` (unset = off):**

| Piece | Where | What it does when on |
|---|---|---|
| URL ↔ language helpers | `src/i18n/urls.ts` | `/faq` = Albanian, `/en/faq` = English. `localizePath`, `stripLanguagePrefix`, `getLanguageFromPath` |
| Language from URL | `src/i18n/config.ts` | The URL wins over the stored preference |
| Routing | `src/main.tsx`, `src/App.tsx` | English pages run under React Router `basename="/en"`, so every existing `<Link to="/...">` becomes `/en/...` with no link changes |
| Language switcher | `src/hooks/useLanguage.ts` | Navigates to the same page in the other language, instead of re-rendering in place |
| Canonical and hreflang | `src/seo/pageSeo.ts` (`getHeadTags`, `getAlternates`) | Each language canonicalizes to itself, and every indexable page lists `sq`, `en` and `x-default` (Albanian) |
| Breadcrumb JSON-LD | `src/seo/pageSeo.ts` | Item URLs follow the page language |
| Sitemap | `src/seo/siteFiles.ts` | Both language URLs, each with `xhtml:link` alternates |
| Prerender | `scripts/prerender.mjs`, `src/entry-server.tsx` | Writes `dist/en.html` and `dist/en/**.html` in English with `<html lang="en">` |
| Server | `public/.htaccess` | No change needed: `/en/faq` → `en/faq.html`, and `/en/` → 301 `/en` |
| Tests | `tests/page-seo.test.ts` → "English URLs" | Run with the switch both off and on |

Verified end to end on a local build with the switch on: `/en/...` pages return 200 with English
content, self canonical and correct hreflang; `/en/nope` returns 404; the language button moves
between `/en/x` and `/x`.

**Rules that must hold (the code enforces them):**
- The URL alone decides the language. Never switch content on one URL based on localStorage,
  cookies, `Accept-Language` or IP, and never auto-redirect by browser language. Googlebot crawls
  without cookies, mostly from the US, so an auto-redirect would hide one language.
- Albanian URLs never change, so no redirects are needed and no ranking signal is lost.
- Slugs are identical in both languages, which keeps hreflang a 1:1 path mapping.

### Activate English URLs (when the owner approves)

1. **Check the English copy is complete and correct.** `npm run audit:i18n` must pass, and have a
   fluent English reader skim home, one category, one product, contact and FAQ. Half-translated
   pages look like duplicates to Google.
2. Also fill the English side of any owner intros (`src/data/content/*.ts`). Empty is fine; the
   page keeps its default text.
3. Add `VITE_ENGLISH_URLS=true` to `.env.production.local`, next to the real `VITE_SITE_URL`.
4. `npm run build`, then verify:
   - `ls dist/en.html dist/en/faq.html` exist; `grep '<html lang' dist/en/faq.html` → `en`
   - `grep hreflang dist/faq.html dist/en/faq.html` → the same 3 alternates in both files
   - `grep canonical dist/en/faq.html` → `https://<domain>/en/faq`
   - `grep -c '<url>' dist/sitemap.xml` → twice the number of indexable pages
5. Deploy. Smoke test: `curl -sI https://<domain>/en/equipment` → 200, `/en/` → 301 to `/en`,
   `/en/nope` → 404. Click the language button on a product page → same product, other language.
6. Search Console: resubmit the sitemap. Over the next weeks, watch Pages → "Alternate page with
   proper canonical tag" (expected, harmless) and "Duplicate without user-selected canonical" (should stay at 0).

**To switch off again:** remove the variable and rebuild. The `/en/...` URLs then return 404, so
avoid toggling after Google has indexed them. If that happens, add
`RewriteRule ^en(/(.*))?$ /$2 [R=301,L]` to `.htaccess` instead of leaving 404s.

**Known limits when on:**
- The quote and contact emails link products by their Albanian URL. Harmless.
- `404.html` is served in Albanian first, then the app switches to English on `/en/...` URLs.

## 3. LocalBusiness structured data

**Blocked on the owner confirming all four:**
- [ ] A real company email (`src/data/site.ts` → `email`)
- [ ] The address is a place customers can visit (it currently includes "Ap. 4")
- [ ] Both phone numbers are correct
- [ ] Opening hours (currently `Mon - Sat, 08:00 - 18:00`)

**To enable:** set `localBusiness.confirmed = true` in `src/data/site.ts` and fill in the email.
The home page JSON-LD then switches from `Organization` to `LocalBusiness` and adds
`openingHours`. Also create a Google Business Profile with the *same* name, address and
phone (NAP) as the site.

---

## 4. Owner content slots

- **Category intros:** `src/data/content/categoryIntros.ts`. 1–3 paragraphs per category per
  language. When filled, they replace the generic description above the category FAQ, and they are
  in the static HTML.
- **Brand intros:** `src/data/content/brandIntros.ts`. 1–3 sentences per brand per language, shown
  on the brand cards on `/brands`.
- An empty language shows the existing default text. Albanian text never appears on English
  pages, or the reverse.
- **Technical library:** add real PDFs to `public/docs/` and set `fileUrl` in
  `src/data/technicalLibrary.ts`. The page stays `noindex` until at least one file is linked, then
  becomes indexable automatically. `npm test` fails if a `fileUrl` points to a missing file.
- **Empty categories** (today: Safety & Workwear) are `noindex` until they have products.

## 5. Analytics (provider not chosen)

Lead events are already emitted by `src/utils/analytics.ts`: `inquiry_add`, `inquiry_remove`,
`contact_submit` and `quote_submit`. Nothing is sent until a provider script is added.

| Provider | Consent banner needed | Add to `index.html` `<head>` |
|---|---|---|
| Plausible (recommended) | No (cookieless) | `<script defer data-domain="<domain>" src="https://plausible.io/js/script.js"></script>` |
| Umami (self-host or cloud) | No (cookieless) | its `<script defer src=... data-website-id=...>` snippet |
| GA4 via gtag/GTM | Yes (cookies, EU-style law) | the GA snippet, plus a consent banner and Consent Mode |

SPA page views: Plausible and Umami track `pushState` automatically. For GA4, enable "page changes
based on browser history events" in Enhanced Measurement.

Never send names, emails, phones or message text as event properties.

---

## 6. Still true without a domain

- `VITE_SITE_URL` is the only thing blocking canonicals, the sitemap and JSON-LD in production.
- `npm run build` refuses a missing or placeholder domain. `npm run build:local` allows one for testing.
