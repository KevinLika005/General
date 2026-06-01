import type { CompanyProfile, SiteMetadata, TrustFeature } from './types';
import { localizeCatalogValue } from '../i18n/catalogLocale';

export const siteMetadata: SiteMetadata = {
  siteName: 'GENERAL TRADING',
  title: 'GENERAL TRADING | Technical Equipment Catalog and B2B Inquiry Requests',
  description: 'Browse construction machinery, tools, materials, transport assets, and site-support products through a technical B2B catalog built for inquiry, quote, inspection, and contract follow-up.',
  ogType: 'website',
  themeColor: '#2B2824',
};

const baseCompanyProfile: CompanyProfile = {
  name: 'GENERAL TRADING',
  parentName: 'GENERAL',
  shortDescription: 'Technical equipment catalog for construction machinery, tools, materials, transport assets, and site support handled through direct B2B inquiry.',
  tagline: 'Construction equipment, tools, materials, and contract-driven supply for serious work.',
  phone: '',
  secondaryPhone: '',
  email: '',
  address: '',
  locationLabel: '',
  hours: '',
  heroHeadline: 'Construction Machinery, Equipment & Parts for Serious Work',
  heroSubheadline: 'Browse available machinery, attachments, spare parts, tools, materials, and site equipment. Request product details, pricing, inspection, or contract discussion directly with the sales team.',
  topUtilityNote: 'Inquiry-commerce only. Quote, inspection, and contract follow-up handled directly.',
  socialLinks: [],
};

const baseTrustFeatures: TrustFeature[] = [
  {
    title: 'Commercially useful listing detail',
    description: 'Listings prioritize specification highlights, condition notes, and availability context for technical buyers.',
    icon: 'shield',
  },
  {
    title: 'Company-to-company request handling',
    description: 'Requests are reviewed directly with the sales team for procurement teams, contractors, and fleet operators.',
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

const baseHomeStats = [
  { label: 'Inventory records', value: '33' },
  { label: 'Product groups', value: '7' },
  { label: 'Active brands', value: '29' },
  { label: 'Sales model', value: 'B2B only' },
];

const baseBudgetBands = [
  { slug: 'under-5000', label: 'Under EUR 5,000' },
  { slug: 'under-25000', label: 'Under EUR 25,000' },
  { slug: 'under-100000', label: 'Under EUR 100,000' },
  { slug: 'price-on-request', label: 'Price on request' },
] as const;

const baseHowItWorksSteps = [
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
    title: 'The sales team reviews your request',
    description: 'The sales team checks product availability, technical fit, documentation, and the right commercial follow-up path.',
  },
  {
    step: '05',
    title: 'Inspection and clarification follow',
    description: 'Machine review, clarifications, bundled parts, and documentation discussion continue directly with the sales team.',
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

export function getCompanyProfile(): CompanyProfile {
  return {
    ...baseCompanyProfile,
    shortDescription: localizeCatalogValue('site.shortDescription', baseCompanyProfile.shortDescription),
    tagline: localizeCatalogValue('site.tagline', baseCompanyProfile.tagline),
    locationLabel: localizeCatalogValue('site.locationLabel', baseCompanyProfile.locationLabel),
    hours: localizeCatalogValue('site.hours', baseCompanyProfile.hours),
    heroHeadline: localizeCatalogValue('site.heroHeadline', baseCompanyProfile.heroHeadline),
    heroSubheadline: localizeCatalogValue('site.heroSubheadline', baseCompanyProfile.heroSubheadline),
    topUtilityNote: localizeCatalogValue('site.topUtilityNote', baseCompanyProfile.topUtilityNote),
  };
}

export function getTrustFeatures(): TrustFeature[] {
  const keys = [
    'commerciallyUsefulListingDetail',
    'companyToCompanyRequestHandling',
    'inspectionSupport',
    'deliveryAndLogisticsSupport',
    'documentationSupport',
    'noOnlinePaymentFlow',
  ] as const;

  return baseTrustFeatures.map((feature, index) => ({
    ...feature,
    title: localizeCatalogValue(`site.trustFeatures.${keys[index]}.title`, feature.title),
    description: localizeCatalogValue(
      `site.trustFeatures.${keys[index]}.description`,
      feature.description,
    ),
  }));
}

export function getHomeStats() {
  const localeKeys = ['inventoryRecords', 'productGroups', 'activeBrands', 'salesModel'] as const;

  return baseHomeStats.map((stat, index) => ({
    ...stat,
    label: localizeCatalogValue(`site.homeStats.${localeKeys[index]}`, stat.label),
    value:
      stat.value === 'B2B only'
        ? localizeCatalogValue('site.homeStats.b2bOnly', stat.value)
        : stat.value,
  }));
}

export function getBudgetBands() {
  return [...baseBudgetBands];
}

export function getHowItWorksSteps() {
  const localeKeys = [
    'browseCatalog',
    'buildInquiryList',
    'sendCommercialRequest',
    'salesTeamReviewsRequest',
    'inspectionAndClarificationFollow',
    'contractTermsOffline',
    'deliveryAndLogisticsCoordinated',
  ] as const;

  return baseHowItWorksSteps.map((step, index) => ({
    ...step,
    title: localizeCatalogValue(`site.howItWorksSteps.${localeKeys[index]}.title`, step.title),
    description: localizeCatalogValue(
      `site.howItWorksSteps.${localeKeys[index]}.description`,
      step.description,
    ),
  }));
}
