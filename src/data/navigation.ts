import { routes } from '../utils/routes';

export const primaryNavigation = [
  { label: 'Products', to: routes.equipment, kind: 'products' as const },
  { label: 'Solutions', to: routes.howItWorks, kind: 'solutions' as const },
  { label: 'Services & Support', to: routes.technicalLibrary, kind: 'support' as const },
  { label: 'Deals / Available Now', to: routes.deals },
  { label: 'Technical Library', to: routes.technicalLibrary },
  { label: 'Contact', to: routes.contact },
] as const;

export const solutionLinks = [
  {
    title: 'How It Works',
    description: 'Understand the inquiry-only product request process.',
    to: routes.howItWorks,
  },
  {
    title: 'Financing & Contracts',
    description: 'Review offline commercial handling and contract discussion paths.',
    to: routes.financingContracts,
  },
  {
    title: 'Delivery & Inspection',
    description: 'See how inspection scheduling and logistics support are handled.',
    to: routes.deliveryInspection,
  },
] as const;

export const supportLinks = [
  {
    title: 'Technical Library',
    description: 'Manuals, spec sheets, inspection references, and request-document paths.',
    to: routes.technicalLibrary,
  },
  {
    title: 'FAQ',
    description: 'Quick answers for pricing modes, inspection, documentation, and delivery.',
    to: routes.faq,
  },
  {
    title: 'Contact Sales',
    description: 'Speak directly with the sales and support team.',
    to: routes.contact,
  },
  {
    title: 'Brands',
    description: 'Jump into the catalog by manufacturer.',
    to: routes.brands,
  },
] as const;

export const footerCompanyLinks = [
  { label: 'About', to: routes.about },
  { label: 'Privacy', to: routes.privacy },
  { label: 'Terms', to: routes.terms },
] as const;
