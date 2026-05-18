import { routes } from '../utils/routes';
import { localizeCatalogValue } from '../i18n/catalogLocale';

const basePrimaryNavigation = [
  { label: 'Products', to: routes.equipment, kind: 'products' as const, localeKey: 'products' },
  { label: 'Solutions', to: routes.howItWorks, kind: 'solutions' as const, localeKey: 'solutions' },
  {
    label: 'Services & Support',
    to: routes.technicalLibrary,
    kind: 'support' as const,
    localeKey: 'servicesSupport',
  },
  { label: 'Deals / Available Now', to: routes.deals, localeKey: 'deals' },
  { label: 'Technical Library', to: routes.technicalLibrary, localeKey: 'technicalLibrary' },
  { label: 'Contact', to: routes.contact, localeKey: 'contact' },
] as const;

const baseSolutionLinks = [
  {
    title: 'How It Works',
    description: 'Understand the inquiry-only product request process.',
    to: routes.howItWorks,
    localeKey: 'howItWorks',
  },
  {
    title: 'Financing & Contracts',
    description: 'Review offline commercial handling and contract discussion paths.',
    to: routes.financingContracts,
    localeKey: 'financingContracts',
  },
  {
    title: 'Delivery & Inspection',
    description: 'See how inspection scheduling and logistics support are handled.',
    to: routes.deliveryInspection,
    localeKey: 'deliveryInspection',
  },
] as const;

const baseSupportLinks = [
  {
    title: 'Technical Library',
    description: 'Manuals, spec sheets, inspection references, and request-document paths.',
    to: routes.technicalLibrary,
    localeKey: 'technicalLibrary',
  },
  {
    title: 'Institution Cleaning',
    description: 'Professional cleaning programs for offices, schools, and institutional facilities.',
    to: routes.institutionsCleaning,
    localeKey: 'institutionsCleaning',
  },
  {
    title: 'FAQ',
    description: 'Quick answers for pricing modes, inspection, documentation, and delivery.',
    to: routes.faq,
    localeKey: 'faq',
  },
  {
    title: 'Contact Sales',
    description: 'Speak directly with the sales and support team.',
    to: routes.contact,
    localeKey: 'contactSales',
  },
  {
    title: 'Brands',
    description: 'Jump into the catalog by manufacturer.',
    to: routes.brands,
    localeKey: 'brands',
  },
] as const;

const baseFooterCompanyLinks = [
  { label: 'About', to: routes.about, localeKey: 'about' },
  { label: 'Privacy', to: routes.privacy, localeKey: 'privacy' },
  { label: 'Terms', to: routes.terms, localeKey: 'terms' },
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
