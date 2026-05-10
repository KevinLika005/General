import type { Product } from './types';

/*
  Product template notes
  - Copy this object into products.ts when adding a new item.
  - Required fields keep the catalog and filters stable.
  - Optional fields can be omitted if the information is not available yet.
  - Prefer local image paths such as /images/products/example-machine-1.jpg
*/

export const productTemplate: Product = {
  id: 'prd-example-001',
  slug: 'example-brand-model-machine',
  sku: 'RAF-EXAMPLE-001',
  title: 'Example Brand Model Machine',
  categorySlug: 'earthmoving-machinery',
  subcategory: 'Excavators',
  brand: 'Example Brand',
  model: 'Model 320',
  year: 2021,
  condition: 'used',
  availability: 'available',
  priceMode: 'visible',
  price: 125000,
  priceCurrency: 'EUR',
  location: 'Tirane Yard',
  operatingHours: 4120,
  mileageKm: 0, // Optional. Use for trucks or road-going vehicles.
  fuelType: 'Diesel', // Optional for non-powered parts or accessories.
  enginePower: '110 kW', // Optional.
  weight: '22.4 t', // Optional.
  capacity: '1.2 m3 bucket', // Optional.
  transmission: 'Automatic powershift', // Optional.
  serialNumber: 'EXM3202021001', // Optional but recommended.
  images: [
    { src: '/images/products/example-machine-1.jpg', alt: 'Example Brand Model Machine front view' },
    { src: '/images/products/example-machine-2.jpg', alt: 'Example Brand Model Machine side view' },
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
    { title: 'Inspection Report PDF', href: '/documents/example-machine-inspection.pdf', kind: 'inspection-report' },
    { title: 'Service Summary PDF', href: '/documents/example-machine-service.pdf', kind: 'service-record' },
  ], // Optional.
  inspectionNotes: [
    'Starts clean and idles evenly.',
    'Hydraulic functions tested under normal operating temperature.',
  ], // Optional but recommended.
  tags: ['excavator', 'tracked', 'contractor-fleet'],
  featured: false, // Optional. Controls homepage and featured sections.
  deal: false, // Optional. Controls deals page visibility.
  createdAt: '2026-05-10',
};
