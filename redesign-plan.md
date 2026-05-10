A. Executive summary

The repository is a Vite + React + TypeScript ecommerce/RFQ prototype with Tailwind, React Router, lucide icons, a static catalog data model, and a localStorage-backed inquiry list. The current frontend already has useful ecommerce primitives: catalog routes, product cards, filtering, product detail pages, inquiry list, request quote page, and reusable layout components. The main problem is visual and structural: the site currently feels like a dark industrial brochure with large feature panels, not a compact construction ecommerce storefront. The app stack is simple and suitable for the redesign: React 18, Vite, Tailwind 3, React Router, TypeScript, and lucide-react are already in place.

The redesign should move the UI toward a compact industrial ecommerce marketplace: lighter neutral product surfaces, Rafin navy/gold brand accents, strong search, dense category discovery, compact product cards, practical RFQ behavior, technical spec tables, sticky quote actions, and a more procurement-oriented catalog experience.

The most important changes are:

Replace the full-site dark gradient presentation style with a light ecommerce surface system using Rafin navy/gold as brand accents.
Reduce product cards from large promotional cards into compact browsing cards.
Make /equipment behave like a serious catalog, not a landing page plus cards.
Redesign product detail pages around gallery + key specs + sticky RFQ panel + technical table.
Rebuild navigation around ecommerce discovery: catalog, machinery, materials, equipment, spare parts, industrial products, services, request quote.
Keep the inquiry list concept, but frame it as a quote cart / RFQ list with clearer conversion behavior.
B. Repository/frontend audit
Framework and project setup

The project is a Vite React TypeScript application. It uses react, react-dom, react-router-dom, lucide-react, Tailwind CSS, PostCSS, ESLint, and TypeScript. The available scripts are dev, build, lint, preview, and typecheck.

Tailwind is configured in tailwind.config.js and scans index.html plus src/**/*.{js,ts,jsx,tsx}. The current theme extends custom Rafin colors through CSS variables, adds Manrope and Barlow Condensed, and defines a large panel shadow.

Routing

Routing is centralized in src/App.tsx. The app is wrapped in InquiryProvider, BrowserRouter, and Layout. Current routes are:

/ → HomePage
/equipment → CatalogPage
/equipment/:categorySlug → CategoryPage
/equipment/:categorySlug/:productSlug → ProductDetailPage
/brands → BrandsPage
/deals → DealsPage
/inquiry-list → InquiryListPage
/request-quote → RequestQuotePage
/how-it-works, /financing-contracts, /delivery-inspection, /about, /faq, /contact, /privacy, /terms
* → NotFoundPage

The route helper file src/utils/routes.ts mirrors these paths and provides helpers for category, product, brand filtering, and search query URLs.

Folder structure

The source is organized into:

src/pages — route-level pages.
src/components/common — reusable UI: product cards, badges, buttons, filters, search, inquiry summary.
src/components/layout — header, footer, layout, mega menu, mobile menu.
src/components/forms — contact, newsletter, request quote.
src/context — inquiry list context.
src/hooks — catalog filters and inquiry list hook.
src/data — static catalog/product/category/company data.
src/utils — price formatting, filters, route helpers.
Current design tokens and global styles

src/index.css is the main global styling file. It imports Google fonts, defines CSS variables, sets the whole body to a dark Rafin navy gradient, globally applies white text, and assigns Barlow Condensed to all headings with very tight line-height. It also defines .section-shell, .eyebrow, .field, .surface-panel, and .shadow-panel.

Current variables are:

--rafin-black: 17 29 74
--rafin-ink: 20 33 61
--rafin-panel: 14 25 56
--rafin-muted-light: 198 206 222
--rafin-gold: 209 162 31
--rafin-gold-soft: 227 198 99
--rafin-border: 84 99 131

These are brand-useful, but the way they are applied makes the whole website feel dark, heavy, and presentation-oriented.

Homepage

The homepage is controlled by src/pages/HomePage.tsx. It renders a large dark hero with oversized heading, search bar, browse/request buttons, a “commercial process” panel, stat cards, category cards, featured product cards, budget bands, how-it-works cards, trust features, brand cards, available-now products, and a final CTA. It uses ProductCard, CategoryCard, BrandCard, SearchBar, SectionHeader, and StatCard.

Catalog/listing

The main catalog page is src/pages/CatalogPage.tsx. It reads URL params for brand, q, and priceBand, then uses useCatalogFilters. It renders a large intro panel, search bar, desktop FilterSidebar, mobile filter overlay, product count toolbar, sort select, selected filter chips, empty state, and product grid. The current results grid is only xl:grid-cols-2, so product cards become large feature cards rather than compact ecommerce cards.

Category listing is controlled by src/pages/CategoryPage.tsx. It uses category data, subcategory chips, a large category hero, an overview section, product grid, and category FAQ. It also uses ProductCard, so it inherits the large-card behavior.

Deals listing is controlled by src/pages/DealsPage.tsx and follows the same sidebar/filter/product-card pattern.

Product cards

The product card is src/components/common/ProductCard.tsx. It uses a fixed h-52 image, dark panel background, shadow, badge overlay, brand/model line, large text-[1.65rem] title, right-aligned price, excerpt, four mini specs, up to three tags, and two CTAs.

This is the single biggest component causing the oversized catalog feel.

Product detail

The product detail page is src/pages/ProductDetailPage.tsx. It has breadcrumbs, a two-column gallery/detail layout, large 420–520px image, thumbnail grid, status badges, price, description, key spec boxes, multiple CTAs, tab buttons, overview/specs/inspection/documents/delivery content, previous/next buttons, and similar products. Specs are rendered as card tiles, not a dense technical table.

Navigation/header

The header is src/components/layout/Header.tsx. It has a utility bar, logo, search bar, nav links, equipment mega menu, inquiry list button, and mobile menu trigger. Current nav links are Equipment, Brands, Deals, How It Works, Financing, and Contact. That is more corporate/procurement-process focused than ecommerce discovery focused.

The mega menu is src/components/layout/MegaMenu.tsx. It uses a very wide 72rem panel with large category cards, descriptions, and subcategory links.

The mobile menu is src/components/layout/MobileMenu.tsx. It is full-screen, includes search, main links, inquiry list panel, and expandable equipment category groups.

Footer

The footer is src/components/layout/Footer.tsx. It includes the Rafin logo, company description, contact information, social links, product categories, buyer support links, and newsletter form. It is useful but needs a stronger ecommerce footer structure and a visible quote CTA.

Filters/search

Filters are implemented through src/components/common/FilterSidebar.tsx and src/hooks/useCatalogFilters.ts.

FilterSidebar uses select inputs for category, subcategory, brand, condition, availability, price range, year, hours, location, tags, and sort.

useCatalogFilters manages filter state, option sets, filtering, sorting, selected filter chips, clearing filters, and mobile filter state. Current searchable fields include product title, brand, model, category slug, subcategory, SKU, and tags.

src/utils/filters.ts defines price bands and search matching. Current price bands are broad: under 5,000, under 25,000, under 100,000, and price on request.

Data structure

src/data/catalog.ts defines product, category, brand, inquiry, FAQ, and trust-feature types. Product data is machinery-heavy and includes title, SKU, category, brand, model, year, condition, availability, price mode, location, operating hours, mileage, specs, documents, inspection notes, tags, featured state, and deal state. Current categories are equipment-focused: earthmoving machinery, road/asphalt equipment, trucks/transport, lifting/material handling, power/site support, attachments/spare parts, and small equipment/tools.

This is a good starting point for machinery but will need expansion for construction materials, spare parts, industrial products, units, compatibility, stock quantities, MOQ, lead times, and technical documents.

Inquiry / quote flow

The inquiry system is localStorage-backed in src/context/InquiryContext.tsx. It supports add, remove, quantity update, notes update, clear, item count, and checking whether a product is already in the inquiry list.

InquiryButton.tsx switches between “Add to Inquiry” and “Added to Inquiry”.

InquirySummary.tsx is a right-side drawer showing inquiry items with clear/review/continue actions.

InquiryListPage.tsx lets users review selected products, edit quantity, add notes, remove products, and continue to request.

RequestQuotePage.tsx passes inquiry items into RequestQuoteForm. The form is currently frontend-only, captures company/contact/request information, shows selected products, and locally displays success after submit.

This is directionally correct, but it should be reframed as an ecommerce RFQ/cart workflow and made more visible throughout the experience.

C. Ecommerce UX audit
Why the current design feels rustic

The current UI feels rustic/heavy because the entire site is treated as a dark industrial poster. index.css applies a full-page navy gradient, global white text, radial gold effects, and condensed display typography to all headings. The combination of dark panels, gold accents, uppercase microcopy, hard corners, and large image overlays creates a “construction brochure / heavy machinery presentation” feel rather than a modern ecommerce storefront.

The ImageWithFallback component also adds a black gradient overlay to every image container. That makes product media feel darker and more atmospheric than a product catalog should feel. Product photography should be clear, neutral, and scannable; overlays should be reserved for hero/category marketing imagery only.

Why the cards feel too large

ProductCard.tsx uses:

Fixed h-52 image.
p-4 sm:p-5 content padding.
Large text-[1.65rem] product title.
Full excerpt.
Four spec rows.
Three tag chips.
Two full-width CTAs.
Shadowed dark panel styling.

The catalog then renders those cards in only two columns at xl, which makes each card behave like a feature tile instead of a dense shopping card.

Where spacing is excessive

The homepage uses repeated py-12 sections, a hero with py-12 sm:py-14 lg:py-16, large grids, large category cards, and multiple full-width promotional sections.

The catalog starts with a large intro block py-16 sm:py-20, which delays the product list. For ecommerce, the catalog should prioritize search, filters, product count, category chips, and results above the fold.

The product detail page uses very tall media: h-[420px] sm:h-[520px], plus a large summary card, large spec cards, tab area, previous/next area, and similar products. That is acceptable for machinery, but it needs a sticky RFQ panel and denser spec presentation to feel transactional.

Where typography hierarchy fails

The global use of Barlow Condensed for all headings, combined with very large display sizes, makes many elements compete visually. Product cards, category cards, section titles, and hero copy all feel similarly loud. The product card title at 1.65rem is too large for browsing.

Buttons also use heavy uppercase letter spacing through Button.tsx. That works for industrial branding in moderation, but across every CTA it becomes harsh and less ecommerce-friendly.

Where product browsing is weak

The catalog has the basic ingredients: search, filters, sort, product count, and applied chips. But the browsing experience is not yet strong enough because:

Product cards are too large and reduce scan density.
There is no grid/list toggle.
Filters are select-heavy rather than facet-heavy.
Category chips are not prominent on the main catalog page.
Search has no category selector, submit button, suggestions, or SKU/part-number emphasis.
Category pages place overview/FAQ content ahead of ecommerce browsing.
The card excerpt and tags add noise while key product facts compete for attention.
Where ecommerce conversion is weak

The quote flow exists, but it is not dominant enough. The header has an inquiry list button but no persistent primary “Request Quote” CTA in the main nav.

Product detail pages show several CTAs with similar visual weight: add to inquiry, request info, request contract, call sales. This creates decision friction. The design should use one primary action: Request quote / Add to quote, then secondary actions: call, WhatsApp, download specs, compare.

The request quote form is currently frontend-only and simply resets after submission. For production, it needs backend submission, required consent, error/success states, product payload, and sales-team routing.

Where mobile UX may be problematic

The mobile experience risks long scrolling because the same large cards and section spacing are used. The mobile menu is full-screen and includes search plus category accordions, which is good, but the global header/top bar, large hero sections, and large cards can create too much vertical friction.

Mobile catalog filters open as a full-screen overlay. That is acceptable, but for ecommerce a bottom-sheet pattern with sticky “Apply filters” and “Clear all” is usually faster.

Where the visual style does not support modern machinery/construction ecommerce

Modern industrial ecommerce should feel technical, clear, and procurement-efficient. The current site feels dramatic and branded, but not sufficiently product-led. The dark background, heavy category imagery, oversized title treatments, and large card layout make the product list feel less like a buying/RFQ interface and more like a marketing page.

D. Color-theme extraction from rafincompany.com

The official Rafin site positions the company around construction, machinery trade, technology, electromechanical equipment, and materials. I would use it only for brand color direction and company context, not for layout or homepage structure.

The current repository already reflects a Rafin-like navy/gold direction through CSS variables. Those values should be retained as brand anchors but used more selectively.

Practical ecommerce color system
Role	Proposed value	Usage
Primary brand navy	#111D4A	Header, footer, active nav, dark CTA, brand blocks
Secondary navy / ink	#14213D	Dark surfaces, footer panels, text on gold
Deep panel navy	#0E1938	Limited hero/CTA bands only
Brand gold	#D1A21F	Primary RFQ CTA, active states, small accents
Gold hover	#B8870E	CTA hover, active category underline
Gold soft	#E3C663	Small highlight, not large backgrounds
Dark text	#172033	Main body text on light surfaces
Muted text	#64748B	Meta, specs, helper text
Page background	#F5F7FA	Main ecommerce page background
Card background	#FFFFFF	Product cards, filters, forms
Neutral surface	#F1F4F8	Toolbars, filter groups, table headers
Border	#DDE3EA	Card borders, inputs, table rows
CTA text on gold	#111D4A	High contrast brand CTA
Available	#12805C / #ECFDF3	Availability badge
Incoming / warning	#B54708 / #FFF7E6	Incoming stock, lead time
Reserved	#6B7280 / #F3F4F6	Reserved or limited status
Sold / unavailable	#B42318 / #FEF3F2	Sold/unavailable
Info / new	#175CD3 / #EFF8FF	New, recommended, technical info
Token direction

Use semantic tokens instead of only brand-name tokens:

brand.navy
brand.ink
brand.gold
brand.goldHover
text.default
text.muted
surface.page
surface.card
surface.subtle
border.default
status.available
status.incoming
status.reserved
status.sold
status.info

The key change is not the palette itself. The key change is distribution: light neutral ecommerce surfaces should dominate; navy/gold should guide navigation, CTAs, badges, and trust blocks.

E. Recommended ecommerce design references and patterns

These references should inform UX patterns, not visual copying.

Hilti

Useful patterns:

Strong category-led discovery.
Search by product, reference, or product category.
Filters by application, base material, category, and technical attributes.
Compare behavior and availability checking.

Most relevant for Rafin:

Category-first browsing for tools, equipment, spare parts, and materials.
Technical attribute filters.
Compare for machinery and equipment.
Grainger

Useful patterns:

Search-first industrial catalog.
Search input supports keyword, item, model, or part number.
Bulk order behavior.
Broad industrial category taxonomy across MRO, safety, hydraulics, motors, tools, raw materials, and more.

Most relevant for Rafin:

Header search should support product name, SKU, model, brand, and part number.
Industrial categories should be broad and practical.
Bulk quote should be a first-class workflow.
MachineryTrader

Useful patterns:

Very dense listings.
Listing count and sorting are prominent.
Cards/listings show photos, price, financing/shipping quote actions, details, hours, horsepower, serial number, stock number, location, seller, and contact.

Most relevant for Rafin:

Machinery cards need compact key specs: year, hours, weight/power, location, serial/stock where relevant.
Product listing should support list view for heavy machinery.
“Get shipping quote / request quote / contact seller” behavior maps well to Rafin’s RFQ model.
Bobcat

Useful patterns:

Category pages show model filters for operating weight, horsepower, dig depth, size class, and power type.
Cards show suggested price, specs, “Build & Quote,” “Details,” and “Compare.”
Product pages emphasize starting price, offers, Build & Quote, inventory, demo/dealer actions, and concise product benefits.

Most relevant for Rafin:

Machinery category filters should be spec-based, not just brand/category.
Product cards should support compare.
Product detail pages need a sticky RFQ/build-quote panel.
United Rentals

Useful patterns:

Equipment pages show key specs, use cases, delivery/support messaging, and request quote actions.
Product descriptions explain operating weight, dig depth, horsepower, bucket, and intended use.

Most relevant for Rafin:

Product detail should communicate fit-for-purpose use cases.
Delivery, inspection, and support should appear near the RFQ panel.
MSC Industrial Supply

Useful patterns:

Industrial category taxonomy.
Product cards include stock, compare, technical info, price, quantity, and add-to-basket behavior.
MRO, safety, metalworking, raw materials, tools, and fluid power are treated as serious procurement categories.

Most relevant for Rafin:

Materials/spare parts/industrial products need different card fields than machinery.
“Technical info” should be a visible product-level affordance.
Stock and unit-based purchasing/quoting should be supported.
Toolstation / Screwfix

Useful patterns:

Trade-focused department navigation.
Quick product-code search.
Availability and fulfillment messaging.
Practical categories for building tools, plumbing, electrical, fixings, safety, storage, ladders, and workwear.

Most relevant for Rafin:

Header category dropdowns should be practical and trade-oriented.
Spare parts, fasteners, tools, and materials should be browsable through compact category paths.
Availability/lead time should be visible early.
F. New design system
Visual direction

The new direction should be:

Compact industrial ecommerce with Rafin navy/gold brand authority.

It should feel:

Technical, not decorative.
Procurement-focused, not corporate-presentation focused.
Compact, not sparse.
Professional, not rustic.
Trustworthy, not flashy.
Product-first, not hero-first.
Layout grid

Use:

max-width: 1280–1440px shell for ecommerce pages.
12-column desktop logic.
Catalog layout: 280–300px filters + flexible product results.
Homepage cards: 4 columns desktop, 3 medium desktop, 2 tablet, 1 mobile.
Machinery catalog: 3 columns with sidebar, optional list view.
Parts/materials catalog: 4 columns desktop where product data is simpler.
Border radius

Recommended:

Product cards: 6px
Buttons: 4px
Inputs/selects: 4px
Badges: 999px for status pills or 4px for industrial labels
Large panels: 8px

Current hard square fields and cards feel too severe. Do not go overly rounded; this should still feel industrial.

Shadows

Use borders as the primary separation system. Shadows should be minimal:

Default card: no shadow, 1px border.
Hover: very subtle shadow, e.g. light ecommerce elevation.
Avoid the current large shadow-panel treatment across cards.
Spacing scale

Use a tighter scale:

Card padding: 12–16px
Filter group spacing: 16px
Section spacing desktop: 40–56px
Section spacing mobile: 28–36px
Product grid gap: 16–20px
Hero padding: 48–64px, not oversized.
Typography

Recommended:

Primary font: Manrope or similar clean sans.
Use Barlow Condensed very selectively, if at all.
Product card title: 14–15px, semibold, 2-line clamp.
Body: 14–16px.
Specs/meta: 12–13px.
H1: 40–48px desktop, 30–36px mobile.
H2: 28–36px.
Avoid global condensed headings for every title.
Icon style

Keep lucide icons, but use them smaller and more functionally:

Product specs: 14–16px.
Header/action icons: 18–20px.
Category icons: 22–28px.
Use consistent stroke width and avoid decorative icon overload.
Buttons

Button hierarchy:

Primary: Request quote / Add to quote — gold or navy depending surface.
Secondary: View details, Call sales, Continue browsing.
Tertiary/icon: save, compare, share.

Reduce uppercase letter spacing. Industrial ecommerce can still use strong labels, but the current tracking-[0.16em] makes every CTA feel like a poster label.

Cards

Card system should support variants:

ProductCardCompact
ProductCardList
CategoryTile
BrandTile
TrustStripItem
QuoteStepCard

Product cards should show fewer things, more consistently.

Filters

Filters should move from select-heavy controls to ecommerce facets:

Category
Subcategory
Brand
Availability
Condition
Price mode/range
Year
Operating hours
Power/weight/capacity where applicable
Location
Compatibility/OEM for spare parts
Unit/pack/stock for materials
Badges

Badge system:

Available
Incoming
Reserved
Sold
New
Used
Refurbished
Deal
Price on request
In stock
Bulk quote
Compatible part
CE / certified where applicable.
Forms

Forms should be lighter, cleaner, and more transactional:

White cards.
Required field indicators.
Inline validation.
Required consent.
Product summary sticky on desktop.
Success/error states.
Backend-ready submission payload.
Tables

Technical specs should be real tables on desktop:

Grouped sections.
Two-column label/value rows.
Optional unit column.
Download/spec-sheet link.
Mobile accordion or definition list.
Image ratios
Machinery/equipment: 4:3 or 3:2.
Spare parts/tools: 1:1.
Materials: 4:3 or 1:1 depending product.
Category tiles: 16:9 thumbnail or icon tile.
Remove the automatic dark overlay from normal product images.
G. Homepage redesign plan
1. Compact ecommerce hero

Purpose: Immediately communicate that this is a product sourcing/RFQ ecommerce site.

Layout: Two-column desktop. Left: headline, short value proposition, large search. Right: quote-process card or featured availability panel.

Content:

Headline: “Source construction equipment, materials, parts & industrial supplies.”
Subcopy: “Browse Rafin’s machinery, tools, materials, spare parts, and industrial products. Build a quote list and request pricing from the sales team.”
Search placeholder: “Search machinery, SKU, brand, model, material, or part number.”
Quick chips: Excavators, Generators, Spare Parts, Hydraulics, Tools, Materials.

CTA:

Primary: Browse Catalog.
Secondary: Request Quote.

Visual style: Light neutral background, navy headline, gold CTA, small dark navy trust strip. Avoid full-screen dark gradient.

Needed components:

Updated SearchBar
New CategoryQuickChips
New QuoteProcessMiniCard
Updated Button

Responsive behavior: On mobile, search appears first under headline; quick chips scroll horizontally.

2. Primary category navigation

Purpose: Let buyers quickly browse by procurement need.

Layout: 6–8 compact category tiles.

Categories:

Machinery
Construction Materials
Equipment
Tools
Spare Parts
Industrial Products
Services / Support
Available Stock

CTA: Each tile links to filtered catalog/category page.

Visual style: White cards, small icon/photo, item count, 3 top subcategory links.

Needed components: Replace current oversized CategoryCard behavior with compact CategoryTile.

Responsive behavior: 4 columns desktop, 2 tablet, horizontal scroll or 1-column mobile.

3. Featured products / featured machinery

Purpose: Show inventory quickly without turning it into a marketing section.

Layout: Compact product grid.

Content: 8 products max.

CTA: “View all available stock.”

Visual style: Product-card compact style.

Needed components: Refactored ProductCard.

Responsive behavior: 4 columns desktop, 2 tablet, 1 mobile for machinery.

4. Popular categories

Purpose: Add ecommerce depth below primary categories.

Layout: Dense category/subcategory list or tiles.

Content examples:

Excavators
Wheel loaders
Generators
Hydraulic parts
Safety equipment
Electrical materials
Fasteners
Cutting tools
Attachments

CTA: Browse category.

Visual style: Small white cards or chip grid.

Responsive behavior: Horizontal scroll on mobile.

5. Quote/request process

Purpose: Explain RFQ behavior without overwhelming users.

Layout: 3-step strip.

Steps:

Browse products.
Add items to quote list.
Submit company request and receive sales follow-up.

CTA: Start a quote list.

Visual style: Neutral cards with small gold step indicators.

Needed components: QuoteSteps.

6. Trust and credibility

Purpose: Build confidence for B2B buyers.

Content:

Machinery inspection support
Delivery and pickup coordination
Bulk order handling
Technical product support
Company-to-company quote workflow
Materials and machinery trade expertise

Visual style: Compact trust strip, not large marketing panels.

7. New arrivals / available stock

Purpose: Encourage active browsing.

Layout: Compact product grid with “Available” and “Incoming” badges.

CTA: View arrivals.

8. Service/support section

Purpose: Support high-consideration construction purchases.

Content:

Delivery coordination
Inspection appointments
Spare parts sourcing
Bulk procurement
Technical documentation

CTA: Contact sales support.

9. Bulk orders / machinery inquiries CTA

Purpose: Capture buyers who know what they need but do not want to browse.

Layout: Navy CTA band, not full dark page.

CTA: Request bulk quote.

10. Newsletter/contact block

Purpose: Optional lead capture for stock alerts.

Layout: Small footer-prep block.

CTA: Get stock updates.

H. Catalog redesign plan
Current catalog issue

CatalogPage.tsx already has search, filters, sort, product count, selected filters, empty state, and mobile filter overlay. But it opens with a large marketing panel and displays large two-column cards.

New catalog structure
Compact catalog header:
Breadcrumb.
Title: “Catalog.”
Product count.
Short one-line description.
Search bar with category selector.
Category chips:
Machinery
Materials
Equipment
Tools
Spare Parts
Industrial Products
Available Now
Price on Request
Results toolbar:
Product count.
Selected filters summary.
Sort select.
Grid/list toggle.
“Request sourcing” CTA.
Desktop layout:
Sticky left filters, 280–300px.
Results grid on the right.
Optional list view for machinery.
Mobile layout:
Sticky search/filter/sort row.
Filter bottom sheet.
Horizontal category chips.
Product cards stacked.
Filter behavior by product type
Machinery

Filters:

Category/subcategory
Brand
Model
Year
Operating hours
Weight
Engine power
Condition
Availability
Location
Price mode
Attachments included
Inspection/documentation availability
Construction materials

Filters:

Material type
Unit
Pack size
Minimum order quantity
Stock / lead time
Brand
Certification/standard
Delivery area
Equipment

Filters:

Category
Power type
Capacity
Brand
Condition
Availability
Rental/sale/RFQ mode if relevant
Tools

Filters:

Tool type
Power source
Brand
Voltage
Stock
Unit/kit
Warranty
Spare parts

Filters:

OEM/compatible
Machine compatibility
Part category
SKU/part number
Brand
Stock status
New/refurbished
Industrial products

Filters:

MRO category
Size/spec
Standard/certification
Pack size
Brand
Stock/lead time
Empty state

The empty state should not simply say no products. It should offer:

Clear filters.
Broaden search.
Request sourcing.
Suggested adjacent categories.
Loading states

Add skeletons for:

Product card grid.
Filter sidebar.
Toolbar count.
Product detail image/specs.

Even with static data today, this prepares the site for backend/API product data.

I. Product card redesign plan
Current issue

ProductCard.tsx is built as a large promotional card. It includes too much text and too much vertical structure for catalog browsing.

New compact card structure

Each card should include:

Product image.
Top badges:
Availability.
Condition.
Optional deal/new badge.
Category/subcategory.
Product name.
2–3 short specs.
Price or “Request quote.”
Primary CTA.
Secondary action.
Optional save/compare icon.
Recommended desktop grid

Homepage:

Desktop: 4 columns.
Large desktop: 4 or 5 if cards are very compact.
Tablet: 2–3 columns.
Mobile: 1 column for machinery; 2 columns only for simple parts/tools if content is short.

Catalog with sidebar:

Desktop: 3 columns.
Large desktop: 3–4 columns.
List view optional for machinery.

Category pages:

Same as catalog.
Image ratio
Machinery: 4:3.
Spare parts/tools/materials: 1:1.
Avoid fixed h-52 across all product types.
Card sizing
Padding: 12–14px.
Title: 14–15px, semibold, 2-line clamp.
Category/meta: 11–12px.
Specs: 12px.
Price: 15–16px, bold.
CTA height: 36–40px.
Specs

Show only 3 specs before hiding details.

Machinery card examples:

2019
6,480 h
Tirane Yard

Equipment card examples:

Diesel
103 kW
21.8 t

Spare part card examples:

SKU
Compatible with
In stock / lead time

Material card examples:

Unit
MOQ
Delivery
Hover state

Use:

Border color shift to navy/gold.
Slight image zoom.
Optional very light shadow.

Do not use heavy dark overlays or large shadow panels.

CTA behavior

Primary:

Add to quote
or Request quote for quote-only items.

Secondary:

Details

Optional:

Save icon.
Compare checkbox/icon.
J. Product detail redesign plan
Current issue

ProductDetailPage.tsx has the necessary content but is too card-heavy and does not prioritize a sticky RFQ decision panel. Specs are cards, not a proper technical table.

New desktop layout
Top area
Breadcrumb.
Product title.
Category/subcategory.
Availability and condition badges.
SKU/model/year meta.
Main layout

Left column:

Product gallery.
Thumbnails.
Optional video/document preview.

Center/content column:

Short description.
Key specs grid.
Use cases.
Inspection notes summary.
Technical specs table.
Documents.
Related products.

Right column:

Sticky RFQ panel.
RFQ panel

The RFQ panel should include:

Price or “Request quote.”
Availability status.
Quantity selector.
Add to quote / Request quote CTA.
Call sales.
WhatsApp/email option if available.
Delivery/pickup note.
Inspection appointment note.
“Added to quote list” state.

This panel should stay visible on desktop while scrolling.

Key specs

For machinery:

Year
Hours
Weight
Engine power
Location
Serial/stock number
Condition
Availability

For materials/parts:

SKU
Unit
MOQ
Compatibility
Stock
Lead time
Standard/certification
Technical specs

Replace spec cards with a real table:

Specification	Value
Engine Power	103 kW
Weight	21.8 t
Bucket Capacity	1.2 m³
Track Shoes	600 mm

Group by section where possible:

Engine
Dimensions
Hydraulics
Attachments
Documents
Delivery/inspection
Mobile layout

Mobile order:

Breadcrumb compact.
Title/status/price.
Gallery.
Sticky bottom RFQ bar.
Key specs.
Description.
Specs accordion.
Inspection/documents.
Related products.

The sticky bottom bar should include price/request quote and a primary CTA.

K. Navigation redesign plan
Current issue

Current nav links are Equipment, Brands, Deals, How It Works, Financing, and Contact. This is not ecommerce-first enough.

Recommended ecommerce navigation

Primary desktop nav:

Home
Shop / Catalog
Machinery
Materials
Equipment
Spare Parts
Industrial Products
Services
Brands
Contact

Persistent actions:

Header search.
Saved items icon.
Quote list icon.
Request Quote button.

Secondary/footer-level links:

About
How It Works
Financing & Contracts
Delivery & Inspection
FAQ
Privacy
Terms
Header structure
Top utility bar

Keep compact:

Phone.
Email.
Location.
Language switch.
Main row
Logo.
Category-aware search.
Saved items.
Quote list.
Request Quote CTA.
Category nav row

Use a compact category nav row below main row on desktop.

Mega menu

Replace the current large card-style mega menu with:

Dense columns.
Category headings.
Popular subcategories.
Top searches.
“Request sourcing” CTA.
No large descriptions per tile unless needed.

The current MegaMenu.tsx uses large category cards in a 72rem panel. That should become a compact ecommerce mega menu.

Mobile menu

Mobile should prioritize:

Search.
Request Quote / Quote List.
Category accordions.
Main support links.

Add a sticky mobile bottom action for quote list/request quote if the catalog grows.

L. Footer redesign plan

The current footer has a useful base: logo, description, contact, social links, category links, buyer support, and newsletter. It should become more ecommerce-oriented.

Recommended footer sections
Brand block:
Rafin logo.
Short ecommerce description.
Request Quote button.
Shop categories:
Machinery
Materials
Equipment
Tools
Spare Parts
Industrial Products
Buyer support:
Request Quote
Quote List
Delivery & Inspection
Financing & Contracts
FAQ
Contact Sales
Company:
About
Services
Projects if needed
Careers if needed
Contact:
Phone
Email
Address
Hours
Newsletter:
Stock alerts.
New arrivals.
Machinery availability updates.
Legal:
Privacy
Terms
Cookie policy if applicable.

Visual style: navy footer, white text, gold CTA accent, compact columns.

M. Mobile responsiveness plan
Header/mobile nav
Keep search accessible immediately.
Collapse category nav into accordion.
Keep quote list visible.
Avoid a tall utility bar on small screens.
Add sticky bottom RFQ CTA on product detail pages.
Homepage
Hero should not exceed the first mobile viewport.
Category tiles should be 2-column or horizontal-scroll chips.
Product cards should stack for machinery.
Featured product sections should show 4–6 items before “View all.”
Catalog
Sticky search/filter/sort bar.
Filter bottom sheet rather than full-screen overlay.
Selected filters should scroll horizontally.
Sort and view mode should be reachable without opening all filters.
Product count should remain visible.
Product cards
Machinery: one card per row.
Parts/tools: optional two-column compact mode only if title/specs remain readable.
CTA should fit without wrapping.
Product detail
Sticky bottom RFQ bar.
Specs as accordions.
Gallery swipe-friendly.
Product title and status visible before media.
Avoid huge thumbnail grids.
Forms
One-column mobile fields.
Large tap targets.
Sticky submit summary if form is long.
Required consent near submit.
N. Component/file-by-file implementation roadmap
src/index.css

Refactor global theme:

Remove full-body dark gradient as default.
Set page background to light neutral.
Set default text to dark.
Keep navy/gold as brand accents.
Reduce global heading dependency on font-display.
Update .field to light input style with border radius.
Update .eyebrow to be less letter-spaced.
Replace .shadow-panel with lighter ecommerce elevation.
Add utility classes for section spacing, product grid, and card surfaces.
tailwind.config.js

Update tokens:

Add semantic colors: brand, surface, text, border, status.
Keep existing Rafin variables but rename or alias them semantically.
Add subtle shadows: card, hover, dropdown.
Add radius tokens if desired.
Avoid relying on one heavy panel shadow.
src/App.tsx

Keep current routes initially, but consider:

Add /catalog alias for /equipment.
Add route aliases for /machinery, /materials, /spare-parts, if the navigation should expose these directly.
Keep /request-quote and /inquiry-list.
src/utils/routes.ts

Add helper routes for:

Catalog alias.
Category group links.
Availability filters.
Quote list.
Saved items if added later.
Compare if added later.
src/data/catalog.ts

Extend the model for real ecommerce:

Add product type: machinery, material, tool, spare-part, industrial-product, service.
Add unit, moq, stockQuantity, leadTime, compatibility, certifications, specGroups, documents, brandLogo, imageRatio.
Add category groups beyond machinery.
Keep existing machinery data but normalize product fields for cards and details.
Add proper material/spare-part sample data before UI expansion.
src/components/layout/Header.tsx

Replace current nav with ecommerce nav:

Add Shop / Catalog.
Add machinery/materials/equipment/spare parts/services.
Add visible Request Quote button.
Make search more prominent.
Add quote list icon and saved item icon.
Move How It Works and Financing to secondary/footer or support menu.
src/components/layout/MegaMenu.tsx

Refactor from large promotional category cards into dense ecommerce navigation:

Category columns.
Subcategory links.
Popular searches.
“Request sourcing” CTA.
Smaller typography.
Less description text.
src/components/layout/MobileMenu.tsx

Update mobile structure:

Search first.
Quote list / request quote actions near top.
Category accordion.
Support/company links lower.
Reduce visual weight of each accordion item.
src/components/layout/Footer.tsx

Refactor into ecommerce footer:

Add quote CTA.
Add category groups.
Add buyer support.
Add company/legal.
Keep contact and newsletter.
Use compact navy footer.
src/components/common/Button.tsx

Update button system:

Reduce uppercase letter spacing.
Add quote, outline, link, and icon variants.
Add xs size for product cards.
Keep primary CTA accessible and high contrast.
src/components/common/Badge.tsx

Expand badge tones:

Available
Incoming
Reserved
Sold
New
Used
Refurbished
Deal
Quote only
In stock
Low stock

Reduce uppercase tracking and consider pill styling.

src/components/common/SearchBar.tsx

Upgrade search:

Optional category selector.
Optional submit button.
Optional compact suggestions area.
Placeholder supports SKU, brand, model, part number.
Keep role="search".
src/components/common/ImageWithFallback.tsx

Change behavior:

Add aspectRatio prop.
Remove automatic black gradient overlay for normal product cards.
Keep fallback but make it light/neutral.
Keep object-fit support.
Support product image vs hero image modes.
src/components/common/ProductCard.tsx

Either refactor or replace with:

ProductCardCompact
ProductCardList
ProductCardFeatured

Changes:

Smaller image.
2-line title clamp.
3 specs max.
Remove excerpt from grid cards.
Remove tag clutter from default view.
Primary CTA: Add to quote.
Secondary: Details.
Optional save/compare.
Use product-type-specific spec mapping.
New product-card subcomponents

Create:

ProductPrice
ProductStatusBadges
ProductMiniSpecs
ProductActions
SaveCompareAction

These make cards easier to maintain across machinery, materials, parts, and tools.

src/components/common/CategoryCard.tsx

Replace current full-image promotional style with compact ecommerce category tiles:

Icon or small thumbnail.
Category name.
Count.
3 subcategory links.
No large dark overlay.
Lower height.
src/components/common/BrandCard.tsx

Make brand cards more compact:

Logo/brand name.
Product count.
Browse link.
Optional active filter behavior.
src/components/common/FilterSidebar.tsx

Refactor filters:

Use checkbox facets for common options.
Use range controls for year/hours/price.
Group filters in accordions.
Sticky desktop behavior.
Mobile bottom-sheet mode.
Add “Apply filters” and “Clear all” sticky footer on mobile.
src/hooks/useCatalogFilters.ts

Improve filter logic:

Add product type.
Add spec filters by type.
Add stock/lead-time filters.
Add compatibility/OEM filters.
Add view mode state.
Sync filters to URL more fully, not only initial brand, q, and priceBand.
Keep current filtering as Phase 1 fallback.
src/utils/filters.ts

Improve search:

Tokenized search instead of simple substring only.
Include SKU, serial, part number, compatibility, spec labels/values.
Normalize accents/case.
Add product-type-aware price/quote logic.
src/pages/HomePage.tsx

Rebuild the homepage:

Compact ecommerce hero.
Category navigation.
Featured products.
Popular categories.
RFQ process.
Trust strip.
Available stock.
Service/support.
Bulk quote CTA.
Footer-prep newsletter/contact block.

Reduce repeated large sections and use compact product/category components.

src/pages/CatalogPage.tsx

Redesign into a true catalog shell:

Remove large hero panel.
Add compact search/category header.
Add category chips.
Add sticky filters.
Add grid/list toggle.
Change grid from xl:grid-cols-2 to compact 3-column-with-sidebar behavior.
Add loading and empty recommendation states.
Add quote-oriented CTA.
src/pages/CategoryPage.tsx

Make category pages listing-first:

Short category header.
Subcategory chips.
Shared catalog layout.
Product results immediately visible.
Move overview/FAQ below results.
Use same compact filters and cards.
src/pages/ProductDetailPage.tsx

Split into components:

ProductGallery
ProductSummary
QuotePanel
KeySpecs
SpecsTable
InspectionNotes
DocumentsList
RelatedProducts

Implement sticky desktop RFQ panel and mobile sticky bottom CTA. Replace spec cards with a table.

src/context/InquiryContext.tsx

Keep current localStorage foundation. Improve naming and future extensibility:

Rename UI language from “Inquiry List” to “Quote List” or “RFQ List.”
Add saved-items context later.
Add compare context later.
Add item metadata if needed for backend payload.
src/components/common/InquiryButton.tsx

Change label to ecommerce language:

“Add to quote”
“Added”
Compact icon-only option.
Product-card size option.
src/components/common/InquirySummary.tsx

Refactor as quote drawer:

Add thumbnails.
Add quantity edit.
Add remove.
Add “Request quote” primary action.
Add “Continue browsing.”
Add empty-state category suggestions.
src/pages/InquiryListPage.tsx

Make this a quote-cart page:

Compact line item layout.
Sticky quote summary.
Quantity and notes.
Delivery/inspection notes.
Continue to RFQ.
Mobile card rows.
src/components/forms/RequestQuoteForm.tsx

Improve form UX:

Required consent.
Backend-ready payload.
Product list summary.
Delivery/pickup preference.
Company type.
Preferred contact method.
Urgency/timeline.
File upload later if needed.
Better success/error handling.
src/pages/RequestQuotePage.tsx

Reduce large hero and make form/product summary appear sooner. Keep page focused on quote submission.

src/pages/ContactPage.tsx and src/components/forms/ContactForm.tsx

Align with the new form system. Add direct RFQ shortcuts for sales/support. The current contact form is frontend-only and should match the improved quote form patterns.

src/pages/BrandsPage.tsx

Convert brand browsing into a compact brand filter landing page with top brands and direct catalog filters.

src/pages/DealsPage.tsx

Rename conceptually to “Available Stock” or “Offers & Available Stock” if deals are not a major sales strategy. Use shared catalog shell and compact product cards.

O. Priority phases
Phase 1: Visual cleanup and ecommerce foundation

Scope:

Clean colors.
Reduce oversized cards.
Improve spacing.
Improve typography.
Modernize header/footer.
Align with Rafin color theme.

Files/components:

src/index.css
tailwind.config.js
Button.tsx
Badge.tsx
ImageWithFallback.tsx
ProductCard.tsx
CategoryCard.tsx
Header.tsx
Footer.tsx
HomePage.tsx

Expected result:

Site immediately feels more modern, compact, and ecommerce-focused.
Product browsing becomes lighter and faster.
Rafin navy/gold remains visible but no longer overwhelms the whole UI.
Phase 2: Catalog, filters, product detail, RFQ

Scope:

Redesign catalog.
Improve filters/search.
Redesign product detail page.
Improve RFQ/request quote flow.

Files/components:

CatalogPage.tsx
CategoryPage.tsx
FilterSidebar.tsx
useCatalogFilters.ts
filters.ts
SearchBar.tsx
ProductDetailPage.tsx
New product detail subcomponents.
InquiryButton.tsx
InquirySummary.tsx
InquiryListPage.tsx
RequestQuoteForm.tsx

Expected result:

Catalog behaves like a professional construction ecommerce listing.
Product details support technical decision-making.
Quote workflow becomes clearer and more conversion-focused.
Phase 3: Advanced polish and scale readiness

Scope:

Advanced polish.
Animations.
Comparison/saved items.
Better loading states.
SEO/performance improvements.

Files/components:

Add SavedItemsContext.
Add CompareContext.
Add ProductSkeleton.
Add CatalogSkeleton.
Add SEO/meta helpers.
Optimize image handling.
Add analytics hooks for search/filter/quote events.
Prepare backend/API integration.

Expected result:

More complete ecommerce behavior.
Better perceived performance.
More scalable architecture for larger inventory.
P. Risks, assumptions, and questions before coding
Risks
Current data is machinery-heavy. The future website is intended for construction materials, spare parts, tools, and industrial products too. The data model needs extension before those categories feel real.
Images are mostly external placeholder-style images. Product trust depends on accurate, consistent product media.
Forms are frontend-only. RequestQuoteForm and ContactForm currently show local success but do not submit to a backend.
Quote/cart terminology needs alignment. “Inquiry List” works, but “Quote List” or “RFQ List” is more ecommerce/procurement-native.
Search/filter performance will need backend support if inventory grows. Current in-memory filtering is fine for a small static catalog.
Brand palette needs final approval. The recommended palette is based on the current Rafin visual direction and existing repo tokens, not a formal brand guideline.
Assumptions
The site remains quote-first, not online checkout-first.
Some products may show prices, while others should show “Request quote.”
Machinery requires richer technical pages than small tools/materials.
Materials and spare parts need product-type-specific fields.
Mobile buyers need fast search, filters, and quote actions more than large brand storytelling.