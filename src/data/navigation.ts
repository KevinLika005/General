import { routes } from '../utils/routes';
import { localizeCatalogValue } from '../i18n/catalogLocale';

const basePrimaryNavigation = [
  { id: 'products', label: 'Products', to: routes.equipment, kind: 'products' as const, localeKey: 'products' },
  { id: 'solutions', label: 'Solutions', to: routes.howItWorks, kind: 'solutions' as const, localeKey: 'solutions' },
  {
    id: 'services-support',
    label: 'Services & Support',
    to: routes.technicalLibrary,
    kind: 'support' as const,
    localeKey: 'servicesSupport',
  },
  { id: 'deals', label: 'Deals / Available Now', to: routes.deals, localeKey: 'deals' },
  { id: 'technical-library', label: 'Technical Library', to: routes.technicalLibrary, localeKey: 'technicalLibrary' },
  { id: 'contact', label: 'Contact', to: routes.contact, localeKey: 'contact' },
] as const;

const baseSolutionLinks = [
  {
    id: 'how-it-works',
    title: 'How It Works',
    description: 'Understand the inquiry-only product request process.',
    to: routes.howItWorks,
    localeKey: 'howItWorks',
  },
  {
    id: 'financing-contracts',
    title: 'Financing & Contracts',
    description: 'Review offline commercial handling and contract discussion paths.',
    to: routes.financingContracts,
    localeKey: 'financingContracts',
  },
  {
    id: 'delivery-inspection',
    title: 'Delivery & Inspection',
    description: 'See how inspection scheduling and logistics support are handled.',
    to: routes.deliveryInspection,
    localeKey: 'deliveryInspection',
  },
] as const;

const baseSupportLinks = [
  {
    id: 'technical-library',
    title: 'Technical Library',
    description: 'Manuals, spec sheets, inspection references, and request-document paths.',
    to: routes.technicalLibrary,
    localeKey: 'technicalLibrary',
  },
  {
    id: 'institutions-cleaning',
    title: 'Institution Cleaning',
    description: 'Professional cleaning programs for offices, schools, and institutional facilities.',
    to: routes.institutionsCleaning,
    localeKey: 'institutionsCleaning',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Quick answers for pricing modes, inspection, documentation, and delivery.',
    to: routes.faq,
    localeKey: 'faq',
  },
  {
    id: 'contact-sales',
    title: 'Contact Sales',
    description: 'Speak directly with the sales and support team.',
    to: routes.contact,
    localeKey: 'contactSales',
  },
  {
    id: 'brands',
    title: 'Brands',
    description: 'Jump into the catalog by manufacturer.',
    to: routes.brands,
    localeKey: 'brands',
  },
] as const;

const baseFooterCompanyLinks = [
  { id: 'about', label: 'About', to: routes.about, localeKey: 'about' },
  { id: 'privacy', label: 'Privacy', to: routes.privacy, localeKey: 'privacy' },
  { id: 'terms', label: 'Terms', to: routes.terms, localeKey: 'terms' },
] as const;

export function getPrimaryNavigation() {
  return basePrimaryNavigation.map(({ localeKey, ...link }) => ({
    ...link,
    label: localizeCatalogValue(`navigation.primary.${localeKey}`, link.label),
  }));
}

export function getSolutionLinks() {
  return baseSolutionLinks.map(({ localeKey, ...link }) => ({
    ...link,
    title: localizeCatalogValue(`navigation.solutions.${localeKey}.title`, link.title),
    description: localizeCatalogValue(
      `navigation.solutions.${localeKey}.description`,
      link.description,
    ),
  }));
}

export function getSupportLinks() {
  return baseSupportLinks.map(({ localeKey, ...link }) => ({
    ...link,
    title: localizeCatalogValue(`navigation.support.${localeKey}.title`, link.title),
    description: localizeCatalogValue(
      `navigation.support.${localeKey}.description`,
      link.description,
    ),
  }));
}

export function getFooterCompanyLinks() {
  return baseFooterCompanyLinks.map(({ localeKey, ...link }) => ({
    ...link,
    label: localizeCatalogValue(`navigation.footerCompany.${localeKey}`, link.label),
  }));
}
