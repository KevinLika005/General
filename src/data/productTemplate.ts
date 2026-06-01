import type { Product } from './types';

/*
  Product template notes
  - Copy this object into products.ts when adding a new item.
  - Required fields keep the catalog, taxonomy filters, and product detail routes stable.
  - Subcategory and product-type values must match categories.ts exactly.
  - TODO: replace placeholder product images with owned or licensed assets before launch.
*/

export const productTemplate: Product = {
  id: 'prd-example-001',
  slug: 'example-tracked-excavator',
  sku: 'RAF-EXAMPLE-001',
  title: 'Example Tracked Excavator',
  categorySlug: 'heavy-equipment',
  subcategorySlug: 'excavation',
  productTypeSlug: 'tracked-excavators',
  brand: 'Example Brand',
  model: 'Model 320',
  year: 2024,
  condition: 'used',
  availability: 'available',
  priceMode: 'visible',
  price: 125000,
  priceCurrency: 'EUR',
  location: 'Tirane Yard',
  operatingHours: 4120, // Optional. Use for equipment and powered machines.
  mileageKm: 0, // Optional. Use for trucks or road-going vehicles.
  unitOfMeasure: 'unit', // Optional. Use for materials and consumables.
  fuelType: 'Diesel', // Optional for non-powered products.
  enginePower: '110 kW', // Optional.
  weight: '22.4 t', // Optional.
  capacity: '1.2 m3 bucket', // Optional.
  transmission: 'Automatic powershift', // Optional.
  serialNumber: 'EXM3202024001', // Optional but recommended.
  images: [
    { src: '/images/products/example-tracked-excavator-01.webp', alt: 'Example tracked excavator placeholder front view' },
  ],
  excerpt: 'One-line summary used on cards and listing pages.',
  description: 'Longer commercial description for the product detail page. Explain fit for contractors, condition context, and what is included in the inquiry scope.',
  keyFeatures: [
    'Feature or included option',
    'Recent service item',
    'Attachment or package detail',
  ],
  specs: [
    { label: 'Bucket Capacity', value: '1.2 m3' },
    { label: 'Undercarriage', value: '70% remaining' },
  ],
  documents: [
    { title: 'Technical Summary', href: '/technical-library', kind: 'brochure' },
    { title: 'Inspection Reference', href: '/technical-library', kind: 'inspection-report' },
  ], // Optional.
  inspectionNotes: [
    'Starts clean and idles evenly.',
    'Hydraulic functions tested under normal operating temperature.',
  ], // Optional but recommended.
  tags: ['tracked-excavator', 'contractor-fleet'],
  featured: false, // Optional. Controls homepage and featured sections.
  deal: false, // Optional. Controls deals page visibility.
  createdAt: '2026-05-14',
};
