import type { EquipmentCategory, EquipmentSubcategory } from './types';

/*
  Category maintenance notes
  - Add new top-level categories to the categories array below.
  - Category slugs appear in URLs: /equipment/<category-slug>
  - Subcategory titles are what buyers see; keep them short and commercial.
  - If you rename a slug after publishing, old category URLs will change.
  - Category heroImage can stay remote for placeholders, or point to
    /images/categories/<your-file>.jpg when local assets are ready.
*/

const earthmovingSubcategories: EquipmentSubcategory[] = [
  { slug: 'excavators', title: 'Excavators', description: 'Tracked and wheeled excavation machines for general earthworks.' },
  { slug: 'mini-excavators', title: 'Mini Excavators', description: 'Compact digging machines for urban and tight-access jobs.' },
  { slug: 'bulldozers', title: 'Bulldozers', description: 'Heavy-duty dozers for grading, pushing, and site prep.' },
  { slug: 'wheel-loaders', title: 'Wheel Loaders', description: 'High-capacity loaders for aggregate yards and loading cycles.' },
  { slug: 'backhoe-loaders', title: 'Backhoe Loaders', description: 'Multi-role loaders for utility, municipal, and contractor fleets.' },
  { slug: 'skid-steers', title: 'Skid Steers', description: 'Compact loaders for attachments, cleaning, and site support.' },
];

const roadSubcategories: EquipmentSubcategory[] = [
  { slug: 'rollers', title: 'Rollers', description: 'Single drum and tandem rollers for compaction and asphalt work.' },
  { slug: 'asphalt-pavers', title: 'Asphalt Pavers', description: 'Tracked and wheeled pavers for road and yard surfacing.' },
  { slug: 'milling-machines', title: 'Milling Machines', description: 'Cold milling equipment for pavement removal and rehab.' },
  { slug: 'compactors', title: 'Compactors', description: 'Compactors for trenching, patches, and surface prep.' },
  { slug: 'road-reclaimers', title: 'Road Reclaimers', description: 'Machines for in-place road stabilization and reclamation.' },
  { slug: 'concrete-saws', title: 'Concrete Saws', description: 'Cutting equipment for concrete slabs, joints, and repairs.' },
];

const truckSubcategories: EquipmentSubcategory[] = [
  { slug: 'dump-trucks', title: 'Dump Trucks', description: 'Road-going and site-ready dump trucks for haulage.' },
  { slug: 'tractor-units', title: 'Tractor Units', description: 'Heavy tractor units for lowbed and freight work.' },
  { slug: 'lowbed-trailers', title: 'Lowbed Trailers', description: 'Low loaders for machine transport and oversize cargo.' },
  { slug: 'concrete-mixers', title: 'Concrete Mixers', description: 'Transit mixers for batching and delivery fleets.' },
  { slug: 'tankers', title: 'Tankers', description: 'Fuel, water, and service tankers for site operations.' },
  { slug: 'service-trucks', title: 'Service Trucks', description: 'Field support trucks with tools, cranes, and workshop bodies.' },
];

const liftingSubcategories: EquipmentSubcategory[] = [
  { slug: 'cranes', title: 'Cranes', description: 'Mobile and rough-terrain cranes for lifting operations.' },
  { slug: 'telehandlers', title: 'Telehandlers', description: 'Reach machines for construction materials and palletized loads.' },
  { slug: 'forklifts', title: 'Forklifts', description: 'Warehouse and yard forklifts for indoor and outdoor duty.' },
  { slug: 'aerial-platforms', title: 'Aerial Platforms', description: 'Boom lifts and scissor lifts for access and maintenance.' },
  { slug: 'hoists', title: 'Hoists', description: 'Compact hoisting equipment for materials and site handling.' },
];

const powerSubcategories: EquipmentSubcategory[] = [
  { slug: 'generators', title: 'Generators', description: 'Diesel generators for backup power and remote job sites.' },
  { slug: 'compressors', title: 'Compressors', description: 'Portable compressors for pneumatic tools and blasting work.' },
  { slug: 'pumps', title: 'Pumps', description: 'Drainage and transfer pumps for wet sites and dewatering.' },
  { slug: 'light-towers', title: 'Light Towers', description: 'Mobile lighting solutions for night shifts and remote work.' },
  { slug: 'welding-machines', title: 'Welding Machines', description: 'Field-ready welders for structural and repair work.' },
];

const partsSubcategories: EquipmentSubcategory[] = [
  { slug: 'buckets', title: 'Buckets', description: 'General purpose, rock, and trench buckets.' },
  { slug: 'hydraulic-breakers', title: 'Hydraulic Breakers', description: 'Breakers and hammers for demolition and quarry work.' },
  { slug: 'grapples', title: 'Grapples', description: 'Sorting, scrap, and material-handling grapples.' },
  { slug: 'blades', title: 'Blades', description: 'Wear blades and cutting edges for grading and dozing.' },
  { slug: 'filters', title: 'Filters', description: 'Service filters for engines, hydraulics, and air intake.' },
  { slug: 'tires', title: 'Tires', description: 'Industrial and loader tires for demanding duty cycles.' },
  { slug: 'hydraulic-parts', title: 'Hydraulic Parts', description: 'Hoses, seal kits, valves, and hydraulic service parts.' },
];

const smallSubcategories: EquipmentSubcategory[] = [
  { slug: 'plate-compactors', title: 'Plate Compactors', description: 'Compact soil and paving compaction equipment.' },
  { slug: 'concrete-mixers', title: 'Concrete Mixers', description: 'Small concrete mixers for repairs and light works.' },
  { slug: 'power-trowels', title: 'Power Trowels', description: 'Concrete finishing trowels for slab work.' },
  { slug: 'cutting-tools', title: 'Cutting Tools', description: 'Portable cutting tools for asphalt, concrete, and steel.' },
  { slug: 'surveying-equipment', title: 'Surveying Equipment', description: 'Stations and measurement tools for layout and control.' },
  { slug: 'safety-equipment', title: 'Safety Equipment', description: 'Site safety essentials and field protection equipment.' },
];

export const categories: EquipmentCategory[] = [
  {
    slug: 'earthmoving-machinery',
    title: 'Earthmoving Machinery',
    shortDescription: 'Excavators, loaders, and multi-role machines for earthworks and site prep.',
    description: 'Browse excavation and loading equipment selected for contractors, infrastructure operators, quarry support, and utility work. Listings are prepared for company buyers who need technical context, inspection notes, and a direct commercial workflow.',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-amber-400/20 via-transparent to-transparent',
    seoIntro: 'Rafin Machinery supplies earthmoving equipment for excavation, grading, loading, and fleet expansion. Listings include used, refurbished, and new machinery with inquiry-driven pricing and offline contract handling.',
    subcategories: earthmovingSubcategories,
  },
  {
    slug: 'road-asphalt-equipment',
    title: 'Road & Asphalt Equipment',
    shortDescription: 'Pavers, rollers, milling machines, and compaction equipment for roadwork.',
    description: 'Designed for road contractors and municipal buyers, this section groups surface preparation, paving, and compaction equipment for resurfacing, trench reinstatement, and corridor rehabilitation work.',
    heroImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-yellow-500/20 via-transparent to-transparent',
    seoIntro: 'Explore asphalt and compaction machines for road maintenance, paving, milling, and municipal infrastructure programs. Rafin handles requests offline through company-to-company inquiry and contract discussion.',
    subcategories: roadSubcategories,
  },
  {
    slug: 'trucks-transport',
    title: 'Trucks & Transport',
    shortDescription: 'Dump trucks, tractor units, lowbeds, and support vehicles for logistics and haulage.',
    description: 'For buyers managing fleet renewal, machine transport, and site haulage, this category covers commercial trucks and heavy transport assets suited to construction and industrial use.',
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-orange-400/15 via-transparent to-transparent',
    seoIntro: 'Rafin Machinery lists transport equipment for dump work, lowbed hauling, fleet expansion, and site logistics. Contracts, documentation, inspection, and delivery planning are handled directly after inquiry.',
    subcategories: truckSubcategories,
  },
  {
    slug: 'lifting-material-handling',
    title: 'Lifting & Material Handling',
    shortDescription: 'Cranes, telehandlers, forklifts, and access equipment for lifting operations.',
    description: 'This category is built for contractors, warehouses, precast yards, and mixed industrial operations that need lifting reach, handling reliability, and clear availability status.',
    heroImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-stone-200/15 via-transparent to-transparent',
    seoIntro: 'View cranes, telehandlers, forklifts, and access machines for commercial handling and lifting work. Product pages emphasize inspection readiness, availability, and direct inquiry rather than instant purchase.',
    subcategories: liftingSubcategories,
  },
  {
    slug: 'power-site-support',
    title: 'Power & Site Support',
    shortDescription: 'Generators, compressors, pumps, lighting, and welders for site continuity.',
    description: 'Essential support equipment for active job sites, remote operations, emergency backup, and field maintenance. Listings prioritize practical specifications, transportable setups, and documentation readiness.',
    heroImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-slate-200/20 via-transparent to-transparent',
    seoIntro: 'Rafin Machinery supplies generators, compressors, pumps, light towers, and welders for construction support and temporary site infrastructure. Submit inquiries for pricing, contract terms, or delivery discussion.',
    subcategories: powerSubcategories,
  },
  {
    slug: 'attachments-spare-parts',
    title: 'Attachments & Spare Parts',
    shortDescription: 'Buckets, breakers, tires, filters, and hydraulic service parts for fleet support.',
    description: 'For operators who need productivity upgrades or maintenance supply, this category covers attachments and frequently requested parts with stock status, application notes, and inquiry support.',
    heroImage: 'https://images.unsplash.com/photo-1581092580502-40aa08e78837?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-amber-300/25 via-transparent to-transparent',
    seoIntro: 'Search Rafin attachments and spare parts for excavators, loaders, and site machinery. Requests can cover one or multiple items, with availability and documentation confirmed directly by the sales team.',
    subcategories: partsSubcategories,
  },
  {
    slug: 'small-equipment-tools',
    title: 'Small Equipment & Tools',
    shortDescription: 'Compact job-site machines, cutting tools, mixers, and surveying equipment.',
    description: 'Compact machinery and tools for contractors, finishing crews, utilities, and site setup teams. These listings are suited to fast-moving operational needs without turning the site into a consumer retail flow.',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-yellow-300/20 via-transparent to-transparent',
    seoIntro: 'Discover compact equipment and professional tools for site setup, concrete work, compaction, and surveying. Rafin processes these as inquiry-based B2B requests with direct follow-up.',
    subcategories: smallSubcategories,
  },
];
