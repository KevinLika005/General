# Visual Redesign — Design Spec

Date: 2026-09-26
Status: Approved in conversation (Sections 1 and 2), pending written-spec review.

## Goal

Make the General Trading site look credible and professional, and make it fast for a B2B buyer (contractor, fleet owner, procurement) to find a machine or part and add it to a quote request. Albanian first, English second.

Direction chosen by owner:
- **Palette:** keep the current warm charcoal + gold identity (matches the gold logo). Fix layout, hierarchy, and density.
- **Feel:** compact equipment catalog / marketplace, not a premium showcase.
- **Approach:** foundation first (tokens + shared components), then core pages, then remaining pages.

## Out of scope

- Catalog data, routes, filtering/search logic, inquiry list behavior, form submission, mail pipeline.
- New features or pages.
- Company contact data, sales contacts, newsletter integration (deferred to the end of the project).
- Copy changes beyond: removing uppercase eyebrow labels and shortening homepage hero/section copy. Any copy change is made in both `sq` and `en`.

## Section 1 — Foundation

### Color tokens

Hues are kept. Changes are to three tokens in `src/index.css` (light theme), with matching dark-theme review.

| Role | Token | Current | New |
| --- | --- | --- | --- |
| Charcoal (text, dark bands) | `--navy`, `--text-primary` | `39 37 33` (#272521) | unchanged |
| Gold (brand, primary buttons) | `--primary`, `--brand-gold` | `191 136 36` (#BF8824) | unchanged |
| Page background | `--surface-page` | `244 240 233` (#F4F0E9) | `242 241 238` (#F2F1EE) |
| Subtle surface | `--surface-subtle` | `237 231 219` (#EDE7DB) | `234 231 225` (#EAE7E1) |
| Border | `--border-default` | `211 201 186` (#D3C9BA) | `218 213 204` (#DAD5CC) |
| Muted text | `--text-muted` | `101 97 90` (#65615A) | unchanged |
| Card | `--surface-card` | white | unchanged |

Rules:
- Primary (gold) buttons use **charcoal text**, not white. White-on-gold is 3.1:1 and fails WCAG AA for normal text; charcoal-on-gold is 4.9:1 and passes (checked with the WCAG relative-luminance formula).
- Gold is never used for body text on light surfaces.
- Dark theme keeps its current mapping; verify primary-button text contrast in dark mode as well.

### Typography

- **IBM Plex Sans** — body and UI.
- **IBM Plex Sans Condensed, semibold** — headings and all spec values.
- Spec values use `font-variant-numeric: tabular-nums`.
- Scale (desktop / mobile): H1 44 / 30px, H2 32 / 24px, H3 20 / 18px, body 15px, meta 13px, micro 12px.
- Headlines target 1–2 lines at desktop width.
- **Sentence case everywhere.** Remove uppercase eyebrow/kicker labels above headings site-wide. Status pills are sentence case.
- Body line length ≤ ~75 characters (`--measure-readable` stays).

### Signature element: data plate

Key specs render as a compact grid of cells, each with a small muted label and a condensed tabular value — styled after the data plate on a machine. Used on product cards (1×3) and the product detail panel (2×3). This is the one distinctive visual device; everything around it stays quiet.

Card plate cells, in priority order, first 3 that exist:
1. `year`
2. `operatingHours` (formatted `6480 h`) → else `mileageKm` (`120 000 km`) → else `capacity` → else `enginePower`
3. `location`

Detail plate cells: `year`, `operatingHours`/`mileageKm`, `capacity`, `enginePower`, `weight`, `location` (omit missing ones).

### Shape, depth, motion

- Radius: buttons/inputs 4px, cards 6px, large panels 8px. Replace the current `xl/2xl/3xl → 2px` overrides in `tailwind.config.js`.
- Borders are the primary separator. Only product cards get `shadow-hover` on hover. Remove large panel shadows.
- Motion only on user action: dropdowns, mega menu, drawers, dialogs. No scroll/entrance animations. Respect `prefers-reduced-motion`.

## Section 2 — Layouts

### Header (`src/components/layout/Header.tsx`)

Desktop, two rows:
- **Row 1 (card surface):** logo · wide search with submit · theme toggle · language switch · inquiry list button with count · "Request quote" primary button.
- **Row 2 (charcoal):** existing primary nav items and dropdowns (Products, Solutions, Services & Support, Deals, Technical Library, Contact) · company phone right-aligned.

Removed: top utility bar, tagline next to logo, uppercase helper text next to nav.

Mobile: one slim row (logo, inquiry count, menu button) + search row below. Mobile menu content unchanged, restyled.

### Product card (`src/components/common/ProductCard.tsx`)

```
[photo 4:3] with one status pill (+ "Deal" pill only if deal)
brand + model (muted, 13px)
title (2-line clamp)
data plate (1×3)
price or "price on request"          [+ List] icon button
```
- Whole card links to product detail; remove the separate "View details" button.
- Remove tag chips and the condition badge from the card.
- Sold: add button replaced by a "Sold" label; existing sold-disables-inquiry behavior preserved.
- Grid: 4 columns ≥1536px (with sidebar) / ≥1280px (without), 3 columns laptop, 2 tablet.
- Mobile (<640px): horizontal layout — image left (~40%), content right.

### Catalog / Category / Deals (`CatalogPage.tsx`, `CategoryPage.tsx`, `DealsPage.tsx`, `FilterSidebar.tsx`, `MobileFilterDrawer.tsx`)

```
Breadcrumb
H1 + result count                         [catalog search]
category chips (horizontal scroll)
[Filters 264px] [toolbar: count · sort] [product grid]
```
- Remove the large intro panel, long paragraph, and separate notice box.
- Filters: collapsible groups with checkboxes/radios instead of stacked button-style options. Same filter state and URL behavior.
- Mobile: title + search → one row with "Filters (n)" button and sort → products immediately. Filters open in the existing drawer.
- Category page keeps its hero image, overview, and FAQ blocks, restyled and compacted. Hero becomes a short banner above the grid; overview and FAQ move below the grid so products come first.

### Product detail (`ProductDetailPage.tsx`, `ProductGallery.tsx`, `ProductSpecs.tsx`)

```
Breadcrumb
[Gallery 7/12]            [Sticky info panel 5/12]
                           brand + model
                           H1 title
                           status pill · SKU
                           price
                           data plate 2×3
                           [Add to list] primary
                           [Request quote] secondary
                           phone
Description · Specifications table · Inspection notes · Documents
Related products (4 cards)
```
- Mobile: gallery, then info; sticky bottom bar with price + "Add to list".

### Homepage (`GeneralHomepageLanding.tsx`, `GeneralHomepageHero.tsx` and siblings)

1. **Hero** (charcoal band, ~340px desktop): 1–2 line headline, one supporting line, large search, 4 quick-search chips; real stock photo on the right (desktop only).
2. **Categories:** 10 photo tiles with product counts (5×2 desktop, 2 columns mobile).
3. **In stock now:** 4 featured product cards (shared `ProductCard`) + "View all".
4. **How it works:** 3 numbered steps (browse → add to list → get offer). Numbering is justified: it is a sequence.
5. **Brands:** row of brand names linking to filtered catalog.
6. **Closing band:** "Can't find it? Tell us what you need" + Request quote + phone.

Removed: support-links card grid and the hero spotlight panel. `HomepageSupportLinkCard` and `HomepageHeroSpotlightPanel` are deleted if unused afterward; `HomepageStockPreviewCard` is replaced by `ProductCard`.

### Remaining pages

Inquiry list, request quote, contact, about, FAQ, how it works, financing & contracts, delivery & inspection, technical library, institutions cleaning, brands, search, privacy, terms, 404: keep structure, adopt foundation tokens, remove uppercase labels and heavy boxed panels.

## Build order

1. Foundation: tokens, Tailwind config, base CSS utilities, `Button`, section header component.
2. Header + mobile menu + mega menu, and footer.
3. Product card + data plate component.
4. Catalog / category / deals + filters.
5. Product detail.
6. Homepage.
7. Remaining pages.

Each phase ends with: `npm run lint`, `npm run typecheck`, `npm run audit:i18n`, `npm run check:images`, `npm run build`, plus screenshots at 375 / 768 / 1440px in light and dark.

## Acceptance criteria

- No uppercase eyebrow labels remain on any route.
- Primary buttons pass WCAG AA contrast in both themes.
- Desktop header is two rows; no helper text beside nav.
- Catalog on mobile shows the first product within the first viewport after the header.
- Product cards show at most two pills, a data plate, price, and one action; whole card is clickable.
- Existing behavior unchanged: filters and URL params, search, inquiry list add/remove/sold rules, language switch, theme switch, dialog focus handling.
- All five validation commands pass.
- Keyboard: nav dropdowns, mobile menu, filter drawer, inquiry summary operable and focus-visible.
