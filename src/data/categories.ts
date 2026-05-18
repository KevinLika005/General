import type { CatalogCategory, LegacyTaxonomyAlias } from './types';
import { localizeCatalogValue } from '../i18n/catalogLocale';

/*
  Category maintenance notes
  - This file is the single taxonomy source of truth for the frontend catalog.
  - Public URLs keep the /equipment/<category-slug> pattern.
  - Subcategory and product-type filters are applied through query params.
  - TODO: replace placeholder-derived or third-party hero images with owned or licensed assets before launch.
*/

const baseCategories: CatalogCategory[] = [
  {
    slug: 'heavy-equipment',
    title: 'Heavy Equipment',
    shortDescription: 'Excavation, loading, and compaction machines for infrastructure and site works.',
    description: 'Browse excavation and loading equipment selected for contractors, civil works teams, infrastructure operators, and quarry support programs. Listings stay inquiry-commerce only, with technical review, inspection, and contract handling managed offline.',
    heroImage: '/images/categories/heavy-equipment-hero.webp',
    accent: 'from-amber-400/20 via-transparent to-transparent',
    seoIntro: 'Explore tracked excavators, mini excavators, backhoe loaders, wheel loaders, and rollers configured for practical B2B inquiry, inspection, and commercial follow-up.',
    subcategories: [
      {
        slug: 'excavation',
        title: 'Excavation',
        description: 'Digging and trenching machines for earthworks, utilities, and general construction.',
        productTypes: [
          {
            slug: 'tracked-excavators',
            title: 'Tracked Excavators',
            description: 'General-purpose crawler excavators for mass earthworks and civil construction.',
          },
          {
            slug: 'mini-excavators',
            title: 'Mini Excavators',
            description: 'Compact excavators for urban access, landscaping, and tight job sites.',
          },
        ],
      },
      {
        slug: 'loading-compaction',
        title: 'Loading & Compaction',
        description: 'Multi-role machines for loading cycles, utility work, and ground compaction.',
        productTypes: [
          {
            slug: 'backhoe-loaders',
            title: 'Backhoe Loaders',
            description: 'Versatile site machines for trenching, loading, and municipal support.',
          },
          {
            slug: 'wheel-loaders',
            title: 'Wheel Loaders',
            description: 'Loader platforms for aggregate yards, batching plants, and stockpile handling.',
          },
          {
            slug: 'rollers',
            title: 'Rollers',
            description: 'Single-drum and tandem rollers for compaction and surface preparation.',
          },
        ],
      },
    ],
  },
  {
    slug: 'lifting-access',
    title: 'Lifting & Access',
    shortDescription: 'Telehandlers and access equipment for material handling and elevated work.',
    description: 'This category serves contractors and industrial buyers who need reach, handling stability, and compact access equipment supported through a direct inquiry workflow.',
    heroImage: '/images/categories/lifting-access-hero.webp',
    accent: 'from-stone-200/15 via-transparent to-transparent',
    seoIntro: 'Review lifting and access products with clear reach, handling, and availability metadata before requesting quote or inspection support.',
    subcategories: [
      {
        slug: 'telescopic-handling',
        title: 'Telescopic Handling',
        description: 'Reach and lifting platforms for pallet handling, site logistics, and materials movement.',
        productTypes: [
          {
            slug: 'telehandlers',
            title: 'Telehandlers',
            description: 'Rough-terrain telescopic handlers for construction sites and mixed-use yards.',
          },
        ],
      },
    ],
  },
  {
    slug: 'trucks-transport',
    title: 'Trucks & Transport',
    shortDescription: 'Road-going construction transport for haulage, machine movement, and site logistics.',
    description: 'For fleet renewal and project logistics, this category covers road-going dump trucks and machine-transport trailers suited to contractor and industrial operations.',
    heroImage: '/images/categories/trucks-transport-hero.webp',
    accent: 'from-orange-400/15 via-transparent to-transparent',
    seoIntro: 'Browse construction transport assets configured for dump work and machinery logistics, with mileage, commercial status, and document references visible up front.',
    subcategories: [
      {
        slug: 'haulage-transport',
        title: 'Haulage & Transport',
        description: 'Transport assets for spoil haulage, road fleet work, and equipment relocation.',
        productTypes: [
          {
            slug: 'dump-trucks',
            title: 'Dump Trucks',
            description: 'Commercial dump trucks for road-going and mixed fleet haulage duty.',
          },
          {
            slug: 'lowbed-trailers',
            title: 'Lowbed Trailers',
            description: 'Low-loader trailers for transporting heavy equipment and oversize cargo.',
          },
        ],
      },
    ],
  },
  {
    slug: 'site-power-support',
    title: 'Site Power & Support',
    shortDescription: 'Temporary power and air support for active job sites and remote operations.',
    description: 'Essential site-support equipment for backup power, air supply, and project continuity, with inquiry-first commercial handling and specification-led product pages.',
    heroImage: '/images/categories/site-power-support-hero.webp',
    accent: 'from-slate-200/20 via-transparent to-transparent',
    seoIntro: 'Search generators and portable air support products for construction and industrial site continuity, with direct quote and delivery follow-up.',
    subcategories: [
      {
        slug: 'temporary-power-air',
        title: 'Temporary Power & Air',
        description: 'Portable support equipment for remote sites, shutdown work, and temporary installations.',
        productTypes: [
          {
            slug: 'diesel-generators',
            title: 'Diesel Generators',
            description: 'Diesel generator sets for backup power, temporary facilities, and site continuity.',
          },
          {
            slug: 'portable-air-compressors',
            title: 'Portable Air Compressors',
            description: 'Towable compressors for pneumatic tools, service crews, and field support.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tools-workshop',
    title: 'Tools & Workshop',
    shortDescription: 'Professional power tools for concrete work, installation, and maintenance teams.',
    description: 'Trade-grade tools and workshop equipment for installation contractors, service crews, and project support teams who need a B2B sourcing path rather than retail checkout.',
    heroImage: '/images/categories/tools-workshop-hero.webp',
    accent: 'from-yellow-300/20 via-transparent to-transparent',
    seoIntro: 'Discover workshop and power-tool inventory structured for B2B inquiry and consolidated quote requests.',
    subcategories: [
      {
        slug: 'power-tools',
        title: 'Power Tools',
        description: 'Portable electric tools for drilling, demolition, installation, and maintenance.',
        productTypes: [
          {
            slug: 'rotary-hammers',
            title: 'Rotary Hammers',
            description: 'Heavy-duty drilling and chiseling tools for concrete and masonry work.',
          },
          {
            slug: 'drill-drivers',
            title: 'Drill Drivers',
            description: 'Cordless drill drivers for installation teams, service crews, and workshop use.',
          },
        ],
      },
    ],
  },
  {
    slug: 'electrical-lighting',
    title: 'Electrical & Lighting',
    shortDescription: 'Electrical test and circuit-protection products for contractors and facility teams.',
    description: 'Electrical support products for installers, maintenance teams, and procurement buyers who need specification-led product data and RFQ handling rather than consumer retail flow.',
    heroImage: '/images/categories/electrical-lighting-hero.webp',
    accent: 'from-sky-200/25 via-transparent to-transparent',
    seoIntro: 'Review electrical test and protection products through a structured B2B catalog with shared quote workflow and local placeholder assets.',
    subcategories: [
      {
        slug: 'test-protection',
        title: 'Test & Protection',
        description: 'Electrical measurement and low-voltage protection products for technical teams.',
        productTypes: [
          {
            slug: 'digital-multimeters',
            title: 'Digital Multimeters',
            description: 'Portable digital test meters for troubleshooting, maintenance, and commissioning.',
          },
          {
            slug: 'miniature-circuit-breakers',
            title: 'Miniature Circuit Breakers',
            description: 'Low-voltage circuit breakers for panels, distribution boards, and packaged supply.',
          },
        ],
      },
    ],
  },
  {
    slug: 'plumbing-hydraulic',
    title: 'Plumbing & Hydraulic',
    shortDescription: 'Pumps and pipework tools for site services, dewatering, and installation crews.',
    description: 'Practical plumbing and hydraulic support products for dewatering, service work, and pipe installation, presented in the same inquiry-first catalog structure as heavier equipment.',
    heroImage: '/images/categories/plumbing-hydraulic-hero.webp',
    accent: 'from-cyan-200/20 via-transparent to-transparent',
    seoIntro: 'Search water-transfer and pipework support products with clear unit, compatibility, and document references before submitting an inquiry.',
    subcategories: [
      {
        slug: 'pumps-pipework',
        title: 'Pumps & Pipework',
        description: 'Water movement and pipe-preparation products for contractor and industrial use.',
        productTypes: [
          {
            slug: 'surface-water-pumps',
            title: 'Surface Water Pumps',
            description: 'Portable surface pumps for site drainage, transfer, and emergency response.',
          },
          {
            slug: 'pipe-threading-machines',
            title: 'Pipe Threading Machines',
            description: 'Pipe-threading machines for fabrication shops, installers, and plant maintenance.',
          },
        ],
      },
    ],
  },
  {
    slug: 'building-materials-chemicals',
    title: 'Building Materials & Chemicals',
    shortDescription: 'Anchoring systems and certified board materials for fit-out and fire-rated works.',
    description: 'Construction materials and chemical systems selected for trade buyers who need commercial pack information, unit handling, and B2B quote support without online ordering.',
    heroImage: '/images/categories/building-materials-chemicals-hero.webp',
    accent: 'from-rose-200/20 via-transparent to-transparent',
    seoIntro: 'Browse chemical anchors and fire-rated board materials with unit-based product data and placeholder technical references tied to product families.',
    subcategories: [
      {
        slug: 'fixings-boards',
        title: 'Fixings & Boards',
        description: 'Consumables and board materials for installation, fit-out, and technical finishing work.',
        productTypes: [
          {
            slug: 'chemical-anchors',
            title: 'Chemical Anchors',
            description: 'Injection anchor systems for structural fixings and industrial installation.',
          },
          {
            slug: 'fire-resistant-boards',
            title: 'Fire-Resistant Boards',
            description: 'Board materials for passive fire protection and certified interior assemblies.',
          },
        ],
      },
    ],
  },
  {
    slug: 'attachments-spare-parts',
    title: 'Attachments & Spare Parts',
    shortDescription: 'Machine attachments and fleet-support components for equipment productivity.',
    description: 'For contractors and fleet managers who need productivity upgrades or replacement components, this category covers attachments and machine-facing supply with direct inquiry handling.',
    heroImage: '/images/categories/attachments-spare-parts-hero.webp',
    accent: 'from-amber-300/25 via-transparent to-transparent',
    seoIntro: 'Search machine attachments and supporting fleet components through a quote-first, compatibility-aware frontend catalog.',
    subcategories: [
      {
        slug: 'machine-attachments',
        title: 'Machine Attachments',
        description: 'Attachment products for excavators and related heavy equipment platforms.',
        productTypes: [
          {
            slug: 'hydraulic-breakers',
            title: 'Hydraulic Breakers',
            description: 'Demolition breakers and hammers for excavators and carrier fleets.',
          },
          {
            slug: 'excavator-buckets',
            title: 'Excavator Buckets',
            description: 'Excavator buckets for general purpose digging and bulk-material handling.',
          },
        ],
      },
    ],
  },
  {
    slug: 'safety-workwear',
    title: 'Safety & Workwear',
    shortDescription: 'PPE and job-site workwear categories ready for future sourcing-driven expansion.',
    description: 'This category is included as a real taxonomy branch even though no seed products ship in this pass. It should support sourcing requests, future inventory, and route continuity from the first launch.',
    heroImage: '/images/categories/safety-workwear-hero.webp',
    accent: 'from-lime-200/20 via-transparent to-transparent',
    seoIntro: 'Safety and workwear will expand through a sourcing-led inquiry model, with placeholder category structure already available in the catalog.',
    subcategories: [
      {
        slug: 'site-safety',
        title: 'Site Safety',
        description: 'PPE and basic site-safety supply for field teams and contractor compliance.',
        productTypes: [
          {
            slug: 'hard-hats',
            title: 'Hard Hats',
            description: 'Protective headwear for active construction and industrial sites.',
          },
          {
            slug: 'high-visibility-workwear',
            title: 'High-Visibility Workwear',
            description: 'Hi-vis workwear for road crews, logistics teams, and exposed job-site roles.',
          },
        ],
      },
    ],
  },
] ;

export function getCategories(): CatalogCategory[] {
  return baseCategories.map((category) => ({
    ...category,
    title: localizeCatalogValue(`categories.${category.slug}.title`, category.title),
    shortDescription: localizeCatalogValue(
      `categories.${category.slug}.shortDescription`,
      category.shortDescription,
    ),
    description: localizeCatalogValue(`categories.${category.slug}.description`, category.description),
    seoIntro: localizeCatalogValue(`categories.${category.slug}.seoIntro`, category.seoIntro),
    subcategories: category.subcategories.map((subcategory) => ({
      ...subcategory,
      title: localizeCatalogValue(
        `categories.${category.slug}.subcategories.${subcategory.slug}.title`,
        subcategory.title,
      ),
      description: localizeCatalogValue(
        `categories.${category.slug}.subcategories.${subcategory.slug}.description`,
        subcategory.description,
      ),
      productTypes: subcategory.productTypes.map((productType) => ({
        ...productType,
        title: localizeCatalogValue(
          `categories.${category.slug}.subcategories.${subcategory.slug}.productTypes.${productType.slug}.title`,
          productType.title,
        ),
        description: localizeCatalogValue(
          `categories.${category.slug}.subcategories.${subcategory.slug}.productTypes.${productType.slug}.description`,
          productType.description,
        ),
      })),
    })),
  }));
}

export const legacyCategoryAliases: Record<string, string> = {
  'earthmoving-machinery': 'heavy-equipment',
  'road-asphalt-equipment': 'heavy-equipment',
  'lifting-material-handling': 'lifting-access',
  'power-site-support': 'site-power-support',
  'small-equipment-tools': 'tools-workshop',
  'attachments-spare-parts': 'attachments-spare-parts',
  'trucks-transport': 'trucks-transport',
};

export const legacyFilterAliases: Record<string, LegacyTaxonomyAlias> = {
  excavators: {
    categorySlug: 'heavy-equipment',
    subcategorySlug: 'excavation',
    productTypeSlug: 'tracked-excavators',
  },
  'tracked-excavators': {
    categorySlug: 'heavy-equipment',
    subcategorySlug: 'excavation',
    productTypeSlug: 'tracked-excavators',
  },
  'mini-excavators': {
    categorySlug: 'heavy-equipment',
    subcategorySlug: 'excavation',
    productTypeSlug: 'mini-excavators',
  },
  'backhoe-loaders': {
    categorySlug: 'heavy-equipment',
    subcategorySlug: 'loading-compaction',
    productTypeSlug: 'backhoe-loaders',
  },
  'wheel-loaders': {
    categorySlug: 'heavy-equipment',
    subcategorySlug: 'loading-compaction',
    productTypeSlug: 'wheel-loaders',
  },
  rollers: {
    categorySlug: 'heavy-equipment',
    subcategorySlug: 'loading-compaction',
    productTypeSlug: 'rollers',
  },
  telehandlers: {
    categorySlug: 'lifting-access',
    subcategorySlug: 'telescopic-handling',
    productTypeSlug: 'telehandlers',
  },
  'dump-trucks': {
    categorySlug: 'trucks-transport',
    subcategorySlug: 'haulage-transport',
    productTypeSlug: 'dump-trucks',
  },
  'lowbed-trailers': {
    categorySlug: 'trucks-transport',
    subcategorySlug: 'haulage-transport',
    productTypeSlug: 'lowbed-trailers',
  },
  generators: {
    categorySlug: 'site-power-support',
    subcategorySlug: 'temporary-power-air',
    productTypeSlug: 'diesel-generators',
  },
  compressors: {
    categorySlug: 'site-power-support',
    subcategorySlug: 'temporary-power-air',
    productTypeSlug: 'portable-air-compressors',
  },
  pumps: {
    categorySlug: 'plumbing-hydraulic',
    subcategorySlug: 'pumps-pipework',
    productTypeSlug: 'surface-water-pumps',
  },
  'hydraulic-breakers': {
    categorySlug: 'attachments-spare-parts',
    subcategorySlug: 'machine-attachments',
    productTypeSlug: 'hydraulic-breakers',
  },
  buckets: {
    categorySlug: 'attachments-spare-parts',
    subcategorySlug: 'machine-attachments',
    productTypeSlug: 'excavator-buckets',
  },
};
