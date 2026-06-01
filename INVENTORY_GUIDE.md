# Inventory Guide

This frontend keeps inventory in static TypeScript files inside `src/data`. The current setup is designed so the owner or a future developer can update products without rebuilding the website structure.

## Files you will edit most often

- `src/data/products.ts`
- `src/data/categories.ts`
- `src/data/brands.ts`
- `src/data/productTemplate.ts`
- `src/data/contact.ts`

## 1. How to add a new product

1. Open `src/data/productTemplate.ts`.
2. Copy the `productTemplate` object into `src/data/products.ts`.
3. Change the values to match the real machine, part, tool, or attachment.
4. Make sure `id`, `slug`, and `sku` are unique.
5. Save the file and run the validation commands listed at the end of this guide.

## 2. How to add a new category

1. Open `src/data/categories.ts`.
2. Add a new top-level object to the `categories` array.
3. Add any matching subcategories in the same file.
4. Use a short, stable `slug` because it becomes part of the URL.
5. Add products in `src/data/products.ts` that use the same `categorySlug`.

## 3. How to add a new brand

1. Open `src/data/brands.ts`.
2. Add a new entry to `brandDefinitions`.
3. Use the real brand display name in `name`.
4. Keep `slug` lowercase and hyphenated.
5. After you add products using that brand name, the brand page and filters will pick it up automatically.

## 4. How to set a visible price

In `src/data/products.ts`:

```ts
priceMode: 'visible',
price: 78500,
priceCurrency: 'EUR',
```

The catalog will show `EUR 78,500`.

## 5. How to set "price on request"

In `src/data/products.ts`:

```ts
priceMode: 'price-on-request',
priceCurrency: 'EUR',
```

You can omit `price` completely for this mode.

## 6. How to set "starting from"

In `src/data/products.ts`:

```ts
priceMode: 'starting-from',
price: 89500,
priceCurrency: 'EUR',
```

The catalog will show `Starting from EUR 89,500`.

## 7. How to mark a product as available, reserved, incoming, or sold

Use the `availability` field:

```ts
availability: 'available'
availability: 'reserved'
availability: 'incoming'
availability: 'sold'
```

Notes:

- `available` shows the item as ready for inquiry now.
- `reserved` keeps the listing visible while discussions are active.
- `incoming` is for units not yet checked into stock.
- `sold` keeps the listing as a reference item and disables adding it to the inquiry list.

## 8. How to make a product featured

Add:

```ts
featured: true
```

Featured items appear in homepage feature sections.

## 9. How to make a product appear on the deals page

Add:

```ts
deal: true
```

The deals page also shows current available and incoming stock. Sold products are excluded from deals visibility.

## 10. How to add product images

Recommended local path format:

```ts
images: [
  { src: '/images/products/cat-320d-1.jpg', alt: 'Caterpillar 320D left side view' },
  { src: '/images/products/cat-320d-2.jpg', alt: 'Caterpillar 320D bucket detail' },
]
```

Place the files in:

- `public/images/products/`

Naming guidance:

- Use lowercase file names.
- Use hyphens instead of spaces.
- Include the machine model if possible.
- Keep the first image as the main card/detail image.

## 11. How to add specs

Add them inside the `specs` array:

```ts
specs: [
  { label: 'Bucket Capacity', value: '1.2 m3' },
  { label: 'Undercarriage', value: '65% remaining' },
]
```

Use short labels and commercial, readable values.

## 12. How to add documents

Add them inside the `documents` array:

```ts
documents: [
  { title: 'Inspection Report PDF', href: '/documents/cat-320d-inspection.pdf', kind: 'inspection-report' },
  { title: 'Service Summary PDF', href: '/documents/cat-320d-service.pdf', kind: 'service-record' },
]
```

If you add local PDFs later, keep the path format consistent.

## 13. How to add inspection notes

Add them inside the `inspectionNotes` array:

```ts
inspectionNotes: [
  'Starts clean and idles evenly.',
  'Hydraulic functions tested under working temperature.',
]
```

These notes are shown on the product detail page and help buyers understand condition before inspection.

## 14. How to test that the product appears correctly

1. Start the app with `npm run dev`.
2. Open the catalog page.
3. Check that:
   - the product card appears
   - search finds the product by title, brand, SKU, and tags
   - the category page shows it
   - the product detail page opens
   - price mode is correct
   - availability badge is correct
   - sold products cannot be added to the inquiry list
   - reserved and incoming labels are visible
4. If the product is featured or deal-tagged, check the homepage and deals page too.

## 15. What commands to run after editing data

Run these from the project root:

```bash
npm run typecheck
npm run build
npm run lint
```

If `lint` finds style or typing issues, fix them before publishing the update.
