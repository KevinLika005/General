import type { CompanyProfile, SiteMetadata, TrustFeature } from './types';

export const siteMetadata: SiteMetadata = {
  siteName: 'Rafin Machinery',
  title: 'Rafin Machinery | Technical Equipment Catalog and B2B Inquiry Requests',
  description: 'Browse construction machinery, support equipment, attachments, and parts through a technical B2B catalog built for inquiry, quote, inspection, and contract follow-up.',
  ogType: 'website',
  themeColor: '#0928A4',
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
  topUtilityNote: 'Inquiry-commerce only. Quote, inspection, and contract follow-up handled directly.',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
};

export const trustFeatures: TrustFeature[] = [
  {
    title: 'Commercially useful listing detail',
    description: 'Listings prioritize specification highlights, condition notes, and availability context for technical buyers.',
    icon: 'shield',
  },
  {
    title: 'Company-to-company request handling',
    description: 'Requests are reviewed directly with Rafin for procurement teams, contractors, and fleet operators.',
    icon: 'building',
  },
  {
    title: 'Inspection support',
    description: 'Machines can be reviewed in person or prepared for scheduled inspection before commercial confirmation.',
    icon: 'search',
  },
  {
    title: 'Delivery and logistics support',
    description: 'Transport planning, export handling, and local delivery terms are handled after inquiry review.',
    icon: 'truck',
  },
  {
    title: 'Documentation support',
    description: 'Inspection references, serial verification, and relevant machine documents are handled through the offline sales process.',
    icon: 'file',
  },
  {
    title: 'No online payment flow',
    description: 'Negotiation, contracts, approvals, and final agreement remain direct between companies and off the website.',
    icon: 'wrench',
  },
];

export const homeStats = [
  { label: 'Inventory records', value: '33' },
  { label: 'Product groups', value: '7' },
  { label: 'Active brands', value: '29' },
  { label: 'Sales model', value: 'B2B only' },
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
    title: 'Browse the catalog',
    description: 'Search by machine type, brand, model, SKU, stock status, or technical keyword.',
  },
  {
    step: '02',
    title: 'Build an Inquiry List',
    description: 'Collect one or multiple products and keep notes for procurement, technical review, or contract follow-up.',
  },
  {
    step: '03',
    title: 'Send one commercial request',
    description: 'Ask for pricing, technical clarification, inspection scheduling, delivery planning, or contract discussion.',
  },
  {
    step: '04',
    title: 'Rafin reviews your request',
    description: 'The sales team checks product availability, technical fit, documentation, and the right commercial follow-up path.',
  },
  {
    step: '05',
    title: 'Inspection and clarification follow',
    description: 'Machine review, clarifications, bundled parts, and documentation discussion continue directly with Rafin.',
  },
  {
    step: '06',
    title: 'Contract terms are handled offline',
    description: 'Invoices, approvals, contract wording, and payment terms are discussed company-to-company after the inquiry stage.',
  },
  {
    step: '07',
    title: 'Delivery and logistics are coordinated',
    description: 'Pickup, local delivery, export planning, and handover details are discussed once the commercial basis is agreed.',
  },
];
