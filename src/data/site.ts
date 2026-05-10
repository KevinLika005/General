import type { CompanyProfile, SiteMetadata, TrustFeature } from './types';

export const siteMetadata: SiteMetadata = {
  siteName: 'Rafin Machinery',
  title: 'Rafin Machinery | B2B Machinery Catalog and Quote Requests',
  description: 'Browse construction machinery, spare parts, attachments, transport equipment, and site support units. Request product details, inspection, pricing, and contract discussion directly with Rafin.',
  ogType: 'website',
  themeColor: '#111D4A',
};

export const companyProfile: CompanyProfile = {
  name: 'Rafin Machinery',
  parentName: 'Rafin Company',
  shortDescription: 'Industrial equipment catalog for construction machinery, transport assets, parts, and site support handled through direct B2B inquiry.',
  tagline: 'Construction machinery, equipment, parts, and contract-driven supply for serious work.',
  phone: '+355 68 204 4447',
  secondaryPhone: '+355 68 311 1222',
  email: 'info@rafincompany.com',
  address: 'Tirane, Rruga "Haxhi Kika", Njesia Administrative Nr. 5, Nr. Pasurie 6/538 H1, Ap. 4',
  locationLabel: 'Tirane, Albania',
  hours: 'Mon - Sat, 08:00 - 18:00',
  heroHeadline: 'Construction Machinery, Equipment & Parts for Serious Work',
  heroSubheadline: 'Browse available machinery, attachments, spare parts, and site equipment. Request product details, pricing, inspection, or contract discussion directly with Rafin.',
  topUtilityNote: 'B2B inquiry-commerce only. No instant online purchase.',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
};

export const trustFeatures: TrustFeature[] = [
  {
    title: 'Verified machinery details',
    description: 'Listings include specification highlights, condition notes, and clear commercial context for professional buyers.',
    icon: 'shield',
  },
  {
    title: 'Company-to-company process',
    description: 'Requests are handled directly with Rafin, suitable for procurement teams, contractors, and fleet operators.',
    icon: 'building',
  },
  {
    title: 'Inspection support',
    description: 'Machines can be reviewed in person or prepared for scheduled inspection before contract confirmation.',
    icon: 'search',
  },
  {
    title: 'Delivery and logistics support',
    description: 'Transport planning, export handling, and local delivery terms can be discussed after inquiry.',
    icon: 'truck',
  },
  {
    title: 'Documentation support',
    description: 'Invoices, serial verification, and relevant machine documents are handled through the offline sales process.',
    icon: 'file',
  },
  {
    title: 'Direct commercial handling',
    description: 'There is no instant purchase flow. Negotiation, contracts, and approvals are handled directly with Rafin.',
    icon: 'wrench',
  },
];

export const homeStats = [
  { label: 'Inventory records', value: '30+' },
  { label: 'Attachments & parts', value: 'Stock-backed' },
  { label: 'Commercial handling', value: 'B2B only' },
  { label: 'Process', value: 'Offline agreement' },
];

export const budgetBands = [
  { slug: 'under-5000', label: 'Under EUR 5,000' },
  { slug: 'under-25000', label: 'Under EUR 25,000' },
  { slug: 'under-100000', label: 'Under EUR 100,000' },
  { slug: 'price-on-request', label: 'Price on request' },
] as const;

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Browse inventory',
    description: 'Search by machine type, brand, model, SKU, stock status, or budget band.',
  },
  {
    step: '02',
    title: 'Add products to the inquiry list',
    description: 'Collect one or multiple products and keep internal notes for your procurement or technical team.',
  },
  {
    step: '03',
    title: 'Request product details, quote, or contract discussion',
    description: 'Choose whether you need pricing, technical clarification, inspection scheduling, delivery planning, or contract review.',
  },
  {
    step: '04',
    title: 'Rafin follows up directly',
    description: 'Inspection, negotiation, documentation, delivery, and company-to-company agreement are handled offline after contact.',
  },
];
