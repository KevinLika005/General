export type ProductCondition = 'new' | 'used' | 'refurbished';
export type ProductAvailability = 'available' | 'reserved' | 'incoming' | 'sold';
export type ProductPriceMode = 'visible' | 'starting-from' | 'price-on-request';

export interface EquipmentSubcategory {
  slug: string;
  title: string;
  description: string;
}

export interface EquipmentCategory {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  accent: string;
  seoIntro: string;
  subcategories: EquipmentSubcategory[];
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  title: string;
  categorySlug: string;
  subcategory: string;
  brand: string;
  model: string;
  year: number;
  condition: ProductCondition;
  availability: ProductAvailability;
  priceMode: ProductPriceMode;
  price?: number;
  priceCurrency: 'EUR';
  location: string;
  operatingHours?: number;
  mileageKm?: number;
  fuelType?: string;
  enginePower?: string;
  weight?: string;
  capacity?: string;
  transmission?: string;
  serialNumber?: string;
  images: ProductImage[];
  excerpt: string;
  description: string;
  keyFeatures: string[];
  specs: ProductSpec[];
  documents?: string[];
  inspectionNotes?: string[];
  tags: string[];
  featured?: boolean;
  deal?: boolean;
}

export interface Brand {
  slug: string;
  name: string;
  description: string;
  logoText: string;
  productCount: number;
}

export interface InquiryItem {
  productId: string;
  quantity: number;
  notes: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  categorySlug?: string;
}

export interface TrustFeature {
  title: string;
  description: string;
  icon: 'shield' | 'file' | 'truck' | 'search' | 'building' | 'wrench';
}

const image = (src: string, alt: string): ProductImage => ({ src, alt });

const earthmovingSubcategories: EquipmentSubcategory[] = [
  { slug: 'excavators', title: 'Excavators', description: 'Tracked and wheeled excavation machines for general earthworks.' },
  { slug: 'mini-excavators', title: 'Mini Excavators', description: 'Compact digging machines for urban and tight-access jobs.' },
  { slug: 'bulldozers', title: 'Bulldozers', description: 'Heavy-duty dozers for grading, pushing, and site prep.' },
  { slug: 'wheel-loaders', title: 'Wheel Loaders', description: 'High-capacity loaders for aggregate yards and loading cycles.' },
  { slug: 'backhoe-loaders', title: 'Backhoe Loaders', description: 'Multi-role loaders for utility, municipal, and contractor fleets.' },
  { slug: 'skid-steers', title: 'Skid Steers', description: 'Compact loaders for attachments, cleaning, and site support.' },
  { slug: 'motor-graders', title: 'Motor Graders', description: 'Precision grading units for roads, foundations, and access routes.' },
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
    description: 'Browse excavation and loading equipment selected for contractors, infrastructure operators, quarry support, and utility work. This category focuses on machines with clear operating history, inspection notes, and commercial readiness for company buyers.',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-amber-400/20 via-transparent to-transparent',
    seoIntro: 'Rafin Machinery supplies earthmoving equipment for excavation, grading, loading, and contractor fleet expansion. Listings include used, refurbished, and new machinery with inquiry-driven pricing and offline contract handling.',
    subcategories: earthmovingSubcategories,
  },
  {
    slug: 'road-asphalt-equipment',
    title: 'Road & Asphalt Equipment',
    shortDescription: 'Pavers, rollers, milling machines, and compaction equipment for roadwork.',
    description: 'Designed for road contractors and municipal buyers, this section groups surface preparation, paving, and compaction equipment that supports resurfacing, patching, and full corridor rehab projects.',
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
    description: 'This category is built for contractors, warehouses, precast yards, and mixed industrial operations that need lifting reach, material handling reliability, and clear availability status.',
    heroImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-stone-200/15 via-transparent to-transparent',
    seoIntro: 'View cranes, telehandlers, forklifts, and access machines for commercial handling and lifting work. Product pages emphasize inspection readiness, availability, and direct inquiry rather than instant purchase.',
    subcategories: liftingSubcategories,
  },
  {
    slug: 'power-site-support',
    title: 'Power & Site Support',
    shortDescription: 'Generators, compressors, pumps, lighting, and welders for site continuity.',
    description: 'Essential support equipment for active job sites, remote operations, emergency backup, and field maintenance. Listings prioritize straightforward specs, transportable setups, and support documentation.',
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
    description: 'Compact machinery and tools for contractors, finishing crews, utilities, and site setup teams. These listings are suited for fast-moving operational needs without turning the site into a consumer retail flow.',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-yellow-300/20 via-transparent to-transparent',
    seoIntro: 'Discover compact equipment and professional tools for site setup, concrete work, compaction, and surveying. Rafin processes these as inquiry-based B2B requests with direct follow-up.',
    subcategories: smallSubcategories,
  },
];

const brandDefinitions = [
  { slug: 'caterpillar', name: 'Caterpillar', description: 'Heavy equipment brand trusted for durable excavation, loading, and attachments.', logoText: 'CAT' },
  { slug: 'komatsu', name: 'Komatsu', description: 'Earthmoving and quarry machines with broad contractor demand.', logoText: 'KOM' },
  { slug: 'volvo', name: 'Volvo', description: 'Construction equipment known for loading performance and operator comfort.', logoText: 'VOL' },
  { slug: 'jcb', name: 'JCB', description: 'Backhoes, telehandlers, and multi-use machines for versatile fleets.', logoText: 'JCB' },
  { slug: 'bomag', name: 'Bomag', description: 'Compaction and roadwork machines for paving contractors and municipalities.', logoText: 'BMG' },
  { slug: 'liebherr', name: 'Liebherr', description: 'Lifting and heavy machine engineering for industrial operators.', logoText: 'LBR' },
  { slug: 'wirtgen', name: 'Wirtgen', description: 'Road milling and surface rehabilitation specialist.', logoText: 'WRT' },
  { slug: 'voegele', name: 'Voegele', description: 'Paving equipment for asphalt crews and road contractors.', logoText: 'VOE' },
  { slug: 'mercedes-benz', name: 'Mercedes-Benz', description: 'Commercial transport and construction truck platforms.', logoText: 'MB' },
  { slug: 'man', name: 'MAN', description: 'Heavy tractor and transport trucks for fleet duty.', logoText: 'MAN' },
  { slug: 'toyota', name: 'Toyota', description: 'Reliable forklifts for warehouse and yard handling.', logoText: 'TYT' },
  { slug: 'jlg', name: 'JLG', description: 'Access equipment for elevated maintenance and installation work.', logoText: 'JLG' },
  { slug: 'atlas-copco', name: 'Atlas Copco', description: 'Portable compressors and support equipment for demanding sites.', logoText: 'ATC' },
  { slug: 'perkins', name: 'Perkins', description: 'Power generation equipment for backup and remote operations.', logoText: 'PRK' },
];

export const products: Product[] = [
  {
    id: 'prd-cat-320d',
    slug: 'caterpillar-320d-excavator',
    sku: 'RAF-EX-320D-001',
    title: 'Caterpillar 320D Excavator',
    categorySlug: 'earthmoving-machinery',
    subcategory: 'Excavators',
    brand: 'Caterpillar',
    model: '320D',
    year: 2019,
    condition: 'used',
    availability: 'available',
    priceMode: 'visible',
    price: 78500,
    priceCurrency: 'EUR',
    location: 'Tirane Yard',
    operatingHours: 6480,
    fuelType: 'Diesel',
    enginePower: '103 kW',
    weight: '21.8 t',
    capacity: '1.2 m3 bucket',
    serialNumber: 'CAT0320DTRF1901',
    images: [
      image('https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&w=1200&q=80', 'Caterpillar 320D excavator side view'),
      image('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80', 'Caterpillar 320D excavator on active site'),
      image('https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80', 'Excavator boom and bucket detail'),
    ],
    excerpt: 'Mid-size tracked excavator with contractor-ready bucket package and recent undercarriage review.',
    description: 'This 320D is suited to excavation, trenching, and general infrastructure work. It is positioned for B2B buyers who need a reliable earthmoving unit with clear inspection notes and direct contract handling.',
    keyFeatures: ['Quick coupler installed', 'Auxiliary hydraulic line', 'Recent bucket pin service', 'Cab AC operational'],
    specs: [
      { label: 'Bucket Capacity', value: '1.2 m3' },
      { label: 'Track Shoes', value: '600 mm' },
      { label: 'Undercarriage', value: 'Approx. 65% remaining' },
      { label: 'Emission Tier', value: 'Tier 3' },
    ],
    documents: ['Machine inspection sheet', 'Serial verification', 'Service summary'],
    inspectionNotes: ['Starts clean and idles evenly', 'No major structural weld concerns noted', 'Hydraulic seepage monitored on auxiliary line'],
    tags: ['earthworks', 'tracked', 'excavation', 'contractor-fleet'],
    featured: true,
    deal: true,
  },
  {
    id: 'prd-kom-pc210',
    slug: 'komatsu-pc210-lc-excavator',
    sku: 'RAF-EX-PC210-002',
    title: 'Komatsu PC210 LC Excavator',
    categorySlug: 'earthmoving-machinery',
    subcategory: 'Excavators',
    brand: 'Komatsu',
    model: 'PC210 LC',
    year: 2020,
    condition: 'used',
    availability: 'incoming',
    priceMode: 'starting-from',
    price: 89500,
    priceCurrency: 'EUR',
    location: 'Durres Transit Yard',
    operatingHours: 5120,
    fuelType: 'Diesel',
    enginePower: '123 kW',
    weight: '23.1 t',
    capacity: '1.3 m3 bucket',
    serialNumber: 'KMTPC210LC2020',
    images: [
      image('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80', 'Komatsu excavator on gravel'),
      image('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80', 'Excavator near road construction'),
    ],
    excerpt: 'Late-model excavator arriving into stock with hammer line and contractor-preferred reach setup.',
    description: 'A strong fit for fleets that need a versatile 20-ton class excavator with clear paperwork and early reservation capability before local arrival.',
    keyFeatures: ['Hammer line fitted', 'Rear-view camera', 'Hydraulic quick coupler', 'Tight swing bodywork'],
    specs: [
      { label: 'Boom', value: '5.7 m mono boom' },
      { label: 'Stick', value: '2.9 m arm' },
      { label: 'Travel Speed', value: '5.5 km/h' },
      { label: 'Cab', value: 'ROPS certified' },
    ],
    documents: ['Import documentation pending arrival', 'Pre-shipment video inspection'],
    inspectionNotes: ['Available for pre-contract reservation', 'Cab interior rated clean', 'Pending local arrival check-in'],
    tags: ['incoming-stock', 'excavation', 'hydraulic-hammer-ready'],
    featured: true,
  },
  {
    id: 'prd-vol-l120',
    slug: 'volvo-l120h-wheel-loader',
    sku: 'RAF-WL-L120H-003',
    title: 'Volvo L120H Wheel Loader',
    categorySlug: 'earthmoving-machinery',
    subcategory: 'Wheel Loaders',
    brand: 'Volvo',
    model: 'L120H',
    year: 2018,
    condition: 'used',
    availability: 'available',
    priceMode: 'price-on-request',
    priceCurrency: 'EUR',
    location: 'Elbasan',
    operatingHours: 7820,
    fuelType: 'Diesel',
    enginePower: '203 kW',
    weight: '20.0 t',
    capacity: '3.5 m3 bucket',
    transmission: 'Automatic powershift',
    serialNumber: 'VOLVL120H2018',
    images: [
      image('https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80', 'Wheel loader loading aggregate'),
      image('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80', 'Loader bucket detail'),
    ],
    excerpt: 'Production loader for aggregate yards, transfer stations, and high-cycle loading work.',
    description: 'This Volvo loader is positioned for serious material-handling operations where uptime, operator comfort, and verified condition matter more than instant retail pricing.',
    keyFeatures: ['Ride control', 'Reversing camera', 'Central lubrication', 'Heavy-duty bucket edge'],
    specs: [
      { label: 'Bucket', value: '3.5 m3 GP bucket' },
      { label: 'Tires', value: '26.5R25, approx. 55% remaining' },
      { label: 'Hydraulics', value: 'Load-sensing' },
      { label: 'Cab Controls', value: 'Joystick steering' },
    ],
    documents: ['Inspection checklist', 'Tyre condition report'],
    inspectionNotes: ['Dealer pricing confirmed only on inquiry', 'Loader arms visually straight', 'Ready for on-site inspection appointment'],
    tags: ['wheel-loader', 'quarry', 'yard-loading'],
    featured: true,
  },
  {
    id: 'prd-jcb-3cx',
    slug: 'jcb-3cx-backhoe-loader',
    sku: 'RAF-BH-3CX-004',
    title: 'JCB 3CX Backhoe Loader',
    categorySlug: 'earthmoving-machinery',
    subcategory: 'Backhoe Loaders',
    brand: 'JCB',
    model: '3CX',
    year: 2021,
    condition: 'refurbished',
    availability: 'available',
    priceMode: 'visible',
    price: 61200,
    priceCurrency: 'EUR',
    location: 'Tirane Yard',
    operatingHours: 3180,
    fuelType: 'Diesel',
    enginePower: '81 kW',
    weight: '8.1 t',
    capacity: '1.0 m3 front bucket',
    transmission: 'Powershift',
    serialNumber: 'JCB3CXRFIN2021',
    images: [
      image('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80', 'JCB backhoe loader parked on site'),
      image('https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80', 'Backhoe arm and stabilizer detail'),
    ],
    excerpt: 'Refurbished contractor favorite for utilities, municipal work, and mixed-site service fleets.',
    description: 'The 3CX remains a practical choice for buyers needing one machine to cover digging, lifting, loading, and service-yard tasks across multiple project types.',
    keyFeatures: ['Refreshed cab trim', '4x4 drive', 'Extending dipper', 'General purpose bucket included'],
    specs: [
      { label: 'Rear Dig Depth', value: '5.46 m' },
      { label: 'Loader Bucket', value: '6-in-1 option' },
      { label: 'Drive', value: '4-wheel drive' },
      { label: 'Road Registration', value: 'Available' },
    ],
    documents: ['Refurbishment summary', 'Inspection photos', 'Ownership paperwork'],
    inspectionNotes: ['Paint refreshed in 2025', 'Tight loader linkage noted', 'Suitable for direct company use or subcontract fleet'],
    tags: ['backhoe', 'utility-work', 'municipal'],
    deal: true,
  },
  {
    id: 'prd-bomag-bw226',
    slug: 'bomag-bw226-dh5-roller',
    sku: 'RAF-RD-BW226-005',
    title: 'Bomag BW226 DH-5 Roller',
    categorySlug: 'road-asphalt-equipment',
    subcategory: 'Rollers',
    brand: 'Bomag',
    model: 'BW226 DH-5',
    year: 2017,
    condition: 'used',
    availability: 'available',
    priceMode: 'visible',
    price: 54600,
    priceCurrency: 'EUR',
    location: 'Fier',
    operatingHours: 4120,
    fuelType: 'Diesel',
    enginePower: '160 kW',
    weight: '25.0 t',
    serialNumber: 'BMBW226DH52017',
    images: [
      image('https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80', 'Road roller on compaction pass'),
      image('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', 'Compaction equipment on roadway'),
    ],
    excerpt: 'Heavy compactor for earthworks, landfill cover, and roadbase applications.',
    description: 'A strong option for contractors who need high compaction force and straightforward off-line deal handling for fleet additions or project-specific demand.',
    keyFeatures: ['Padfoot shell included', 'Vibration control system', 'Climate-controlled cab', 'Rear camera installed'],
    specs: [
      { label: 'Drum Width', value: '2,130 mm' },
      { label: 'Static Linear Load', value: '57.5 kg/cm' },
      { label: 'Gradeability', value: '56%' },
      { label: 'Water Kit', value: 'Optional' },
    ],
    inspectionNotes: ['Vibration functions tested', 'Compaction logs available on request'],
    tags: ['roller', 'roadwork', 'compaction'],
    featured: true,
  },
  {
    id: 'prd-wirtgen-w100',
    slug: 'wirtgen-w100-milling-machine',
    sku: 'RAF-RD-W100-006',
    title: 'Wirtgen W100 Milling Machine',
    categorySlug: 'road-asphalt-equipment',
    subcategory: 'Milling Machines',
    brand: 'Wirtgen',
    model: 'W100',
    year: 2016,
    condition: 'used',
    availability: 'reserved',
    priceMode: 'price-on-request',
    priceCurrency: 'EUR',
    location: 'Durres',
    operatingHours: 6890,
    fuelType: 'Diesel',
    enginePower: '187 kW',
    weight: '19.2 t',
    serialNumber: 'WRGW1002016',
    images: [
      image('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80', 'Milling equipment working on roadway'),
      image('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80', 'Road rehab surface detail'),
    ],
    excerpt: 'Cold milling unit for rehabilitation crews handling road resurfacing and lane repairs.',
    description: 'This machine is currently under reservation discussion. Buyers can still submit interest to be notified if the current negotiation window does not close.',
    keyFeatures: ['Fine milling drum', 'Conveyor system', 'Operator canopy', 'Grade control ready'],
    specs: [
      { label: 'Milling Width', value: '1,000 mm' },
      { label: 'Max Milling Depth', value: '330 mm' },
      { label: 'Conveyor', value: 'Front loading conveyor' },
      { label: 'Condition Note', value: 'Reservation status active' },
    ],
    inspectionNotes: ['Reserved pending contract review', 'Further viewings by appointment only'],
    tags: ['milling', 'road-rehab', 'reserved'],
    deal: true,
  },
  {
    id: 'prd-voegele-1800',
    slug: 'voegele-super-1800-3i-asphalt-paver',
    sku: 'RAF-RD-1800-007',
    title: 'Voegele Super 1800-3i Asphalt Paver',
    categorySlug: 'road-asphalt-equipment',
    subcategory: 'Asphalt Pavers',
    brand: 'Voegele',
    model: 'Super 1800-3i',
    year: 2022,
    condition: 'used',
    availability: 'available',
    priceMode: 'starting-from',
    price: 198000,
    priceCurrency: 'EUR',
    location: 'Tirane Yard',
    operatingHours: 1890,
    fuelType: 'Diesel',
    enginePower: '127 kW',
    weight: '18.4 t',
    serialNumber: 'VOE18003I2022',
    images: [
      image('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80', 'Asphalt paver on paving pass'),
      image('https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80', 'Paving screed detail'),
    ],
    excerpt: 'Modern highway-class paver with low hours and contract-ready availability.',
    description: 'A suitable option for road contractors seeking late-model paving capacity without the uncertainty of retail-only listing quality. Final pricing depends on screed package and inspection scope.',
    keyFeatures: ['Tracked paver', 'Niveltronic control', 'Low-hour machine', 'Wide screed configuration'],
    specs: [
      { label: 'Paving Width', value: '2.55 m base, wider with extensions' },
      { label: 'Hopper Capacity', value: '13 t' },
      { label: 'Screed', value: 'AB 500 TV' },
      { label: 'Mat Thickness', value: 'Up to 300 mm' },
    ],
    documents: ['Machine walkaround video', 'Service notes'],
    inspectionNotes: ['Low hours relative to year', 'Contract pricing varies by included screed package'],
    tags: ['paver', 'asphalt', 'late-model'],
    featured: true,
  },
  {
    id: 'prd-mb-actros',
    slug: 'mercedes-benz-actros-4142-dump-truck',
    sku: 'RAF-TR-ACTROS-008',
    title: 'Mercedes-Benz Actros 4142 Dump Truck',
    categorySlug: 'trucks-transport',
    subcategory: 'Dump Trucks',
    brand: 'Mercedes-Benz',
    model: 'Actros 4142',
    year: 2019,
    condition: 'used',
    availability: 'available',
    priceMode: 'visible',
    price: 84200,
    priceCurrency: 'EUR',
    location: 'Tirane',
    mileageKm: 284000,
    fuelType: 'Diesel',
    enginePower: '310 kW',
    capacity: '16 m3 body',
    transmission: 'Automatic',
    serialNumber: 'MBACT41422019',
    images: [
      image('https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80', 'Dump truck side profile'),
      image('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80', 'Commercial truck front angle'),
    ],
    excerpt: 'Fleet-ready dump truck for aggregates, demolition haulage, and urban infrastructure support.',
    description: 'Built for company buyers who need road-legal hauling capacity with offline contract review, export discussion, and inspection scheduling rather than instant retail purchase mechanics.',
    keyFeatures: ['8x4 configuration', 'Heated steel tipper body', 'Automatic gearbox', 'Air suspension rear'],
    specs: [
      { label: 'Drive Layout', value: '8x4' },
      { label: 'Payload Class', value: 'Heavy haul construction' },
      { label: 'Emission Standard', value: 'Euro 6' },
      { label: 'Cab Type', value: 'Day cab' },
    ],
    inspectionNotes: ['Road registration active', 'Body floor visually straight', 'Mileage verified from fleet record'],
    tags: ['dump-truck', 'fleet', 'haulage'],
    deal: true,
  },
  {
    id: 'prd-man-tgs',
    slug: 'man-tgs-18-440-tractor-unit',
    sku: 'RAF-TR-TGS-009',
    title: 'MAN TGS 18.440 Tractor Unit',
    categorySlug: 'trucks-transport',
    subcategory: 'Tractor Units',
    brand: 'MAN',
    model: 'TGS 18.440',
    year: 2020,
    condition: 'used',
    availability: 'incoming',
    priceMode: 'starting-from',
    price: 68900,
    priceCurrency: 'EUR',
    location: 'Port Delivery Pipeline',
    mileageKm: 232000,
    fuelType: 'Diesel',
    enginePower: '324 kW',
    transmission: 'TipMatic',
    serialNumber: 'MANTGS184402020',
    images: [
      image('https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80', 'MAN tractor unit'),
      image('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80', 'Heavy truck detail'),
    ],
    excerpt: 'Tractor unit suitable for machinery transport, contract logistics, and lowbed combinations.',
    description: 'This tractor unit is a practical choice for companies moving plant, attachments, and oversize loads. It is listed as incoming to allow reservation and contract preparation before local stock release.',
    keyFeatures: ['Lowbed-ready fifth wheel', 'Fleet-maintained unit', 'Retarder', 'Navigation and telematics'],
    specs: [
      { label: 'Axle Layout', value: '4x2' },
      { label: 'Cab', value: 'Sleeper cab' },
      { label: 'Retarder', value: 'Hydrodynamic' },
      { label: 'Arrival', value: 'Expected this month' },
    ],
    inspectionNotes: ['Available for pre-arrival inquiry', 'Mileage to be re-confirmed at stock-in'],
    tags: ['tractor-unit', 'logistics', 'incoming-stock'],
  },
  {
    id: 'prd-goldhofer-lowbed',
    slug: 'goldhofer-3-axle-lowbed-trailer',
    sku: 'RAF-TR-LB3-010',
    title: 'Goldhofer 3-Axle Lowbed Trailer',
    categorySlug: 'trucks-transport',
    subcategory: 'Lowbed Trailers',
    brand: 'Goldhofer',
    model: '3-Axle Lowbed',
    year: 2018,
    condition: 'used',
    availability: 'available',
    priceMode: 'price-on-request',
    priceCurrency: 'EUR',
    location: 'Durres',
    capacity: '38 t payload',
    serialNumber: 'GLD3AXLE2018',
    images: [
      image('https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80', 'Lowbed trailer transport rig'),
      image('https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80', 'Lowbed deck detail'),
    ],
    excerpt: 'Machine transport trailer for excavators, rollers, and mixed site equipment moves.',
    description: 'Pricing is handled directly because deck configuration, ramp condition, and documentation needs vary by buyer and destination.',
    keyFeatures: ['Hydraulic ramps', 'Extendable deck section', 'Twist locks', 'Documented service history'],
    specs: [
      { label: 'Payload', value: 'Approx. 38 t' },
      { label: 'Deck Length', value: '8.7 m base' },
      { label: 'Axles', value: '3 axle air suspension' },
      { label: 'Brake System', value: 'EBS' },
    ],
    inspectionNotes: ['Inspection appointment recommended before contract request'],
    tags: ['lowbed', 'transport', 'machinery-move'],
  },
  {
    id: 'prd-liebherr-ltm1050',
    slug: 'liebherr-ltm-1050-3-1-mobile-crane',
    sku: 'RAF-LF-LTM1050-011',
    title: 'Liebherr LTM 1050-3.1 Mobile Crane',
    categorySlug: 'lifting-material-handling',
    subcategory: 'Cranes',
    brand: 'Liebherr',
    model: 'LTM 1050-3.1',
    year: 2017,
    condition: 'used',
    availability: 'available',
    priceMode: 'price-on-request',
    priceCurrency: 'EUR',
    location: 'Tirane Yard',
    operatingHours: 9240,
    mileageKm: 68100,
    fuelType: 'Diesel',
    enginePower: '270 kW',
    capacity: '50 t max lift',
    transmission: 'Automatic',
    serialNumber: 'LBRLTM10503117',
    images: [
      image('https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80', 'Mobile crane setup'),
      image('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80', 'Crane boom detail'),
    ],
    excerpt: 'Mobile crane for industrial lifting, site installation, and commercial handling contracts.',
    description: 'Available for qualified company buyers who need verified machine detail, documentation support, and direct negotiation on configuration, inspection, and delivery terms.',
    keyFeatures: ['50 t class', 'Telescopic boom', 'Counterweight package', 'Road travel capable'],
    specs: [
      { label: 'Main Boom', value: '38 m' },
      { label: 'Axles', value: '3' },
      { label: 'Hook Blocks', value: 'Included by agreement' },
      { label: 'Inspection', value: 'Third-party inspection possible' },
    ],
    documents: ['Load chart set', 'Service notes'],
    inspectionNotes: ['Final price depends on included lifting package', 'Inspection scheduling available with Rafin team'],
    tags: ['mobile-crane', 'lifting', 'industrial'],
    featured: true,
  },
  {
    id: 'prd-toyota-8fd30',
    slug: 'toyota-8fd30-forklift',
    sku: 'RAF-LF-8FD30-012',
    title: 'Toyota 8FD30 Forklift',
    categorySlug: 'lifting-material-handling',
    subcategory: 'Forklifts',
    brand: 'Toyota',
    model: '8FD30',
    year: 2021,
    condition: 'used',
    availability: 'available',
    priceMode: 'visible',
    price: 23900,
    priceCurrency: 'EUR',
    location: 'Tirane Warehouse',
    operatingHours: 2670,
    fuelType: 'Diesel',
    enginePower: '44 kW',
    capacity: '3.0 t',
    transmission: 'Automatic',
    serialNumber: 'TYT8FD302021',
    images: [
      image('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', 'Forklift in warehouse'),
      image('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', 'Warehouse equipment detail'),
    ],
    excerpt: 'Warehouse and yard forklift for pallets, site materials, and logistics support.',
    description: 'A straightforward B2B forklift listing with verified hours, visible pricing, and direct contact flow for inspection and documentation review.',
    keyFeatures: ['Side shift', 'Closed cab', 'Solid mast condition', 'Pallet forks included'],
    specs: [
      { label: 'Lift Height', value: '4.7 m' },
      { label: 'Fuel', value: 'Diesel' },
      { label: 'Tyres', value: 'Solid industrial tyres' },
      { label: 'Attachments', value: 'Forks included' },
    ],
    inspectionNotes: ['Immediate dispatch possible after contract completion'],
    tags: ['forklift', 'warehouse', 'yard'],
    deal: true,
  },
  {
    id: 'prd-jlg-460sj',
    slug: 'jlg-460sj-aerial-platform',
    sku: 'RAF-LF-460SJ-013',
    title: 'JLG 460SJ Aerial Platform',
    categorySlug: 'lifting-material-handling',
    subcategory: 'Aerial Platforms',
    brand: 'JLG',
    model: '460SJ',
    year: 2018,
    condition: 'used',
    availability: 'available',
    priceMode: 'starting-from',
    price: 34200,
    priceCurrency: 'EUR',
    location: 'Tirane Yard',
    operatingHours: 3510,
    fuelType: 'Diesel',
    capacity: '230 kg platform load',
    serialNumber: 'JLG460SJ2018',
    images: [
      image('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80', 'Boom lift elevated'),
      image('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80', 'Aerial platform basket detail'),
    ],
    excerpt: 'Self-propelled boom lift for facade works, industrial maintenance, and installation tasks.',
    description: 'Ideal for contractors who need safe access equipment without the friction of a consumer-style purchase flow.',
    keyFeatures: ['Oscillating axle', 'Proportional controls', 'Foam-filled tyres', 'Onboard diagnostics'],
    specs: [
      { label: 'Working Height', value: '16 m' },
      { label: 'Outreach', value: '12.5 m' },
      { label: 'Platform Rotation', value: '180 deg' },
      { label: 'Drive', value: '4x4' },
    ],
    inspectionNotes: ['Ground and basket controls checked', 'Available for client inspection'],
    tags: ['aerial-platform', 'access', 'maintenance'],
  },
  {
    id: 'prd-jcb-540140',
    slug: 'jcb-540-140-telehandler',
    sku: 'RAF-LF-540140-014',
    title: 'JCB 540-140 Telehandler',
    categorySlug: 'lifting-material-handling',
    subcategory: 'Telehandlers',
    brand: 'JCB',
    model: '540-140',
    year: 2020,
    condition: 'used',
    availability: 'incoming',
    priceMode: 'price-on-request',
    priceCurrency: 'EUR',
    location: 'Inbound Stock',
    operatingHours: 2860,
    fuelType: 'Diesel',
    enginePower: '81 kW',
    capacity: '4.0 t',
    serialNumber: 'JCB5401402020',
    images: [
      image('https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80', 'Telehandler lifting load'),
      image('https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80', 'Telehandler boom detail'),
    ],
    excerpt: 'Telehandler for palletized materials, steel work, precast handling, and site logistics.',
    description: 'Incoming machine positioned for buyers planning site mobilization or fleet expansion in the coming weeks.',
    keyFeatures: ['Fork carriage included', 'Stabilizers', 'Road lighting kit', 'Low-hour import'],
    specs: [
      { label: 'Lift Height', value: '13.8 m' },
      { label: 'Max Forward Reach', value: '9.8 m' },
      { label: 'Transmission', value: '4-speed powershift' },
      { label: 'Arrival', value: 'In transit' },
    ],
    inspectionNotes: ['Reserve by inquiry before arrival if required'],
    tags: ['telehandler', 'incoming-stock', 'materials-handling'],
    featured: true,
  },
  {
    id: 'prd-perkins-60kva',
    slug: 'perkins-60-kva-diesel-generator',
    sku: 'RAF-PS-60KVA-015',
    title: 'Perkins 60 kVA Diesel Generator',
    categorySlug: 'power-site-support',
    subcategory: 'Generators',
    brand: 'Perkins',
    model: '60 kVA Set',
    year: 2023,
    condition: 'new',
    availability: 'available',
    priceMode: 'visible',
    price: 18900,
    priceCurrency: 'EUR',
    location: 'Tirane Warehouse',
    operatingHours: 12,
    fuelType: 'Diesel',
    enginePower: '48 kW',
    weight: '1.35 t',
    serialNumber: 'PRK60KVA2023',
    images: [
      image('https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80', 'Diesel generator on platform'),
      image('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', 'Generator control panel detail'),
    ],
    excerpt: 'New enclosed generator for backup power, remote compounds, and site continuity.',
    description: 'Suitable for companies that need immediate power support with visible pricing and fast inquiry handling.',
    keyFeatures: ['Canopied set', 'Deep Sea controller', 'Low-hour new stock', 'Ready for dispatch'],
    specs: [
      { label: 'Prime Power', value: '60 kVA' },
      { label: 'Frequency', value: '50 Hz' },
      { label: 'Fuel Tank', value: '8+ hour duty cycle' },
      { label: 'Noise Level', value: 'Super silent enclosure' },
    ],
    inspectionNotes: ['New stock item', 'Pre-delivery test available'],
    tags: ['generator', 'site-power', 'new-stock'],
    deal: true,
  },
  {
    id: 'prd-atlascopco-xas88',
    slug: 'atlas-copco-xas-88-compressor',
    sku: 'RAF-PS-XAS88-016',
    title: 'Atlas Copco XAS 88 Compressor',
    categorySlug: 'power-site-support',
    subcategory: 'Compressors',
    brand: 'Atlas Copco',
    model: 'XAS 88',
    year: 2021,
    condition: 'used',
    availability: 'available',
    priceMode: 'visible',
    price: 14700,
    priceCurrency: 'EUR',
    location: 'Tirane Yard',
    operatingHours: 980,
    fuelType: 'Diesel',
    enginePower: '36 kW',
    weight: '750 kg',
    serialNumber: 'ATCXAS882021',
    images: [
      image('https://images.unsplash.com/photo-1581092580502-40aa08e78837?auto=format&fit=crop&w=1200&q=80', 'Portable compressor'),
      image('https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80', 'Compressor hose outlet detail'),
    ],
    excerpt: 'Portable compressor for breakers, blasting, and air tools on active jobsites.',
    description: 'Low-hour support unit aimed at contractors that value verified machine detail over vague marketplace listings.',
    keyFeatures: ['Road tow chassis', 'Low-hour use', 'Tool-ready outlet configuration', 'Compact footprint'],
    specs: [
      { label: 'Free Air Delivery', value: '5.0 m3/min' },
      { label: 'Working Pressure', value: '7 bar' },
      { label: 'Tow Package', value: 'Road legal drawbar' },
      { label: 'Hose Reels', value: 'Optional' },
    ],
    inspectionNotes: ['Starts and loads correctly', 'Tow lighting checked'],
    tags: ['compressor', 'portable', 'site-support'],
  },
  {
    id: 'prd-flygt-bs2200',
    slug: 'flygt-bs2200-water-pump-set',
    sku: 'RAF-PS-BS2200-017',
    title: 'Flygt BS2200 Water Pump Set',
    categorySlug: 'power-site-support',
    subcategory: 'Pumps',
    brand: 'Flygt',
    model: 'BS2200',
    year: 2022,
    condition: 'new',
    availability: 'available',
    priceMode: 'starting-from',
    price: 6200,
    priceCurrency: 'EUR',
    location: 'Warehouse Stock',
    capacity: '420 m3/h',
    serialNumber: 'FLYBS22002022',
    images: [
      image('https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80', 'Pump and hose setup'),
      image('https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80', 'Portable pump closeup'),
    ],
    excerpt: 'Dewatering pump package for trenches, foundations, and emergency site drainage.',
    description: 'Available as a standard package or configured bundle depending on hoses, controls, and site needs discussed after inquiry.',
    keyFeatures: ['Submersible unit', 'Control panel option', 'Fast-connect hoses available', 'Jobsite-ready package'],
    specs: [
      { label: 'Flow', value: 'Up to 420 m3/h' },
      { label: 'Head', value: '28 m' },
      { label: 'Voltage', value: '400V' },
      { label: 'Package', value: 'Pump plus starter set' },
    ],
    inspectionNotes: ['Final bundle defined at quote stage'],
    tags: ['pump', 'dewatering', 'site-drainage'],
    deal: true,
  },
  {
    id: 'prd-cat-h120s',
    slug: 'caterpillar-h120-s-hydraulic-breaker',
    sku: 'RAF-PT-H120S-018',
    title: 'Caterpillar H120 S Hydraulic Breaker',
    categorySlug: 'attachments-spare-parts',
    subcategory: 'Hydraulic Breakers',
    brand: 'Caterpillar',
    model: 'H120 S',
    year: 2021,
    condition: 'refurbished',
    availability: 'available',
    priceMode: 'visible',
    price: 9800,
    priceCurrency: 'EUR',
    location: 'Tirane Yard',
    weight: '1,850 kg',
    serialNumber: 'CATH120S2021',
    images: [
      image('https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80', 'Hydraulic breaker attachment'),
      image('https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&w=1200&q=80', 'Attachment on excavator arm'),
    ],
    excerpt: 'Refurbished breaker suited for 18-28 ton carriers with usable tool stock.',
    description: 'Ideal for demolition, rock breaking, and utility excavation support. This is listed as an attachment inquiry, not an instant online sale.',
    keyFeatures: ['Tool included', 'Refurbished seals', 'Carrier range documented', 'Hydraulic lines available separately'],
    specs: [
      { label: 'Carrier Class', value: '18-28 t' },
      { label: 'Operating Pressure', value: '160-180 bar' },
      { label: 'Tool Diameter', value: '120 mm' },
      { label: 'Mounting', value: 'Pins by machine model' },
    ],
    inspectionNotes: ['Bench test performed', 'Mounting pins confirmed during inquiry'],
    tags: ['breaker', 'attachment', 'demolition'],
    featured: true,
  },
  {
    id: 'prd-volvo-bucket',
    slug: 'volvo-general-purpose-excavator-bucket',
    sku: 'RAF-PT-BKT-019',
    title: 'Volvo General Purpose Excavator Bucket',
    categorySlug: 'attachments-spare-parts',
    subcategory: 'Buckets',
    brand: 'Volvo',
    model: 'GP 2.6m3',
    year: 2024,
    condition: 'new',
    availability: 'available',
    priceMode: 'visible',
    price: 3400,
    priceCurrency: 'EUR',
    location: 'Warehouse Stock',
    capacity: '2.6 m3',
    weight: '1,120 kg',
    serialNumber: 'VOLGPBKT2024',
    images: [
      image('https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80', 'Excavator bucket on ground'),
      image('https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80', 'Bucket teeth and side cutter detail'),
    ],
    excerpt: 'New general-purpose bucket for production digging and site loading duties.',
    description: 'A practical stock item for fleet support, replacement, or expansion into new work packages.',
    keyFeatures: ['Replaceable teeth', 'Reinforced side cutters', 'Ready stock', 'Painted and stored indoors'],
    specs: [
      { label: 'Capacity', value: '2.6 m3' },
      { label: 'Wear Package', value: 'Bolt-on teeth system' },
      { label: 'Application', value: 'General excavation' },
      { label: 'Pins', value: 'Available by request' },
    ],
    inspectionNotes: ['Stock item available for bundled inquiry with machines'],
    tags: ['bucket', 'new-stock', 'excavator-part'],
    deal: true,
  },
  {
    id: 'prd-michelin-loader-tire',
    slug: 'michelin-loader-tire-26-5r25',
    sku: 'RAF-PT-TIRE-020',
    title: 'Michelin Loader Tire 26.5R25',
    categorySlug: 'attachments-spare-parts',
    subcategory: 'Tires',
    brand: 'Michelin',
    model: '26.5R25',
    year: 2024,
    condition: 'new',
    availability: 'available',
    priceMode: 'starting-from',
    price: 1750,
    priceCurrency: 'EUR',
    location: 'Warehouse Stock',
    weight: 'Approx. 530 kg',
    serialNumber: 'MIC265R252024',
    images: [
      image('https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80', 'Industrial tire tread'),
      image('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80', 'Loader tire sidewall detail'),
    ],
    excerpt: 'OTR loader tire for quarry and loading operations with stock-based pricing.',
    description: 'Offered for single-unit or fleet replacement requests. Final quotation depends on quantity, fitment, and bundled service requirements.',
    keyFeatures: ['New tire stock', 'Suitable for loader duty', 'Bulk request supported', 'Warehouse stored'],
    specs: [
      { label: 'Size', value: '26.5R25' },
      { label: 'Construction', value: 'Radial' },
      { label: 'Application', value: 'Wheel loaders' },
      { label: 'Price Basis', value: 'Per tire, ex-warehouse' },
    ],
    inspectionNotes: ['Available individually or in set quantities'],
    tags: ['tires', 'wheel-loader', 'fleet-maintenance'],
  },
  {
    id: 'prd-parker-hose-kit',
    slug: 'parker-hydraulic-hose-kit',
    sku: 'RAF-PT-HOSE-021',
    title: 'Parker Hydraulic Hose Kit',
    categorySlug: 'attachments-spare-parts',
    subcategory: 'Hydraulic Parts',
    brand: 'Parker',
    model: 'Contractor Service Kit',
    year: 2024,
    condition: 'new',
    availability: 'available',
    priceMode: 'visible',
    price: 460,
    priceCurrency: 'EUR',
    location: 'Warehouse Stock',
    serialNumber: 'PRKHYD2024',
    images: [
      image('https://images.unsplash.com/photo-1581092580502-40aa08e78837?auto=format&fit=crop&w=1200&q=80', 'Hydraulic hose kit components'),
      image('https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80', 'Hydraulic fittings closeup'),
    ],
    excerpt: 'Field service hose kit for machine maintenance teams and workshop support.',
    description: 'A compact spare-parts listing for companies that need dependable service stock without any retail purchase flow.',
    keyFeatures: ['Multiple couplings included', 'Warehouse stock', 'Suitable for site service vehicles', 'Can be added to larger inquiry list'],
    specs: [
      { label: 'Kit Contents', value: 'Hoses, fittings, couplers' },
      { label: 'Use Case', value: 'Field repair and planned maintenance' },
      { label: 'Packaging', value: 'Boxed service kit' },
      { label: 'Lead Time', value: 'Immediate' },
    ],
    inspectionNotes: ['Can be bundled with breaker or machine inquiries'],
    tags: ['hydraulic-parts', 'spares', 'service-kit'],
    deal: true,
  },
  {
    id: 'prd-wacker-vp1550',
    slug: 'wacker-neuson-vp1550-plate-compactor',
    sku: 'RAF-SE-VP1550-022',
    title: 'Wacker Neuson VP1550 Plate Compactor',
    categorySlug: 'small-equipment-tools',
    subcategory: 'Plate Compactors',
    brand: 'Wacker Neuson',
    model: 'VP1550',
    year: 2024,
    condition: 'new',
    availability: 'available',
    priceMode: 'visible',
    price: 1850,
    priceCurrency: 'EUR',
    location: 'Warehouse Stock',
    fuelType: 'Petrol',
    weight: '92 kg',
    serialNumber: 'WNVP15502024',
    images: [
      image('https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80', 'Plate compactor on paving stones'),
      image('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80', 'Compact machine handle detail'),
    ],
    excerpt: 'Compact plate compactor for paving, patching, and site finishing teams.',
    description: 'Good for contractors needing quick-turn compact equipment procurement through a B2B inquiry flow.',
    keyFeatures: ['New stock', 'Water tank option', 'Compact transport size', 'Fast warehouse release'],
    specs: [
      { label: 'Centrifugal Force', value: '15 kN' },
      { label: 'Travel Speed', value: '25 m/min' },
      { label: 'Base Plate', value: '500 mm width' },
      { label: 'Fuel', value: 'Petrol' },
    ],
    inspectionNotes: ['Immediate stock availability'],
    tags: ['plate-compactor', 'compact-equipment', 'new-stock'],
    deal: true,
  },
  {
    id: 'prd-belle-bwe150',
    slug: 'belle-bwe-150-concrete-mixer',
    sku: 'RAF-SE-BWE150-023',
    title: 'Belle BWE 150 Concrete Mixer',
    categorySlug: 'small-equipment-tools',
    subcategory: 'Concrete Mixers',
    brand: 'Belle',
    model: 'BWE 150',
    year: 2023,
    condition: 'new',
    availability: 'available',
    priceMode: 'visible',
    price: 1290,
    priceCurrency: 'EUR',
    location: 'Warehouse Stock',
    fuelType: 'Electric',
    capacity: '130 l batch output',
    serialNumber: 'BELBWE1502023',
    images: [
      image('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80', 'Concrete mixer on site'),
      image('https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80', 'Small mixer drum detail'),
    ],
    excerpt: 'Compact mixer for repair crews, finishing contractors, and small site batches.',
    description: 'A low-friction catalog item for professional buyers that still routes through inquiry and offline commercial handling.',
    keyFeatures: ['Electric drive', 'Portable frame', 'Warehouse stock', 'Suitable for repair teams'],
    specs: [
      { label: 'Drum Capacity', value: '150 l' },
      { label: 'Output', value: '130 l' },
      { label: 'Power', value: '230V electric' },
      { label: 'Mobility', value: 'Portable frame' },
    ],
    inspectionNotes: ['Warehouse pickup or bundled delivery available'],
    tags: ['concrete-mixer', 'small-equipment', 'site-support'],
  },
  {
    id: 'prd-whiteman-j36',
    slug: 'whiteman-j36-power-trowel',
    sku: 'RAF-SE-J36-024',
    title: 'Whiteman J36 Power Trowel',
    categorySlug: 'small-equipment-tools',
    subcategory: 'Power Trowels',
    brand: 'Whiteman',
    model: 'J36',
    year: 2022,
    condition: 'used',
    availability: 'available',
    priceMode: 'visible',
    price: 2100,
    priceCurrency: 'EUR',
    location: 'Tirane Warehouse',
    fuelType: 'Petrol',
    weight: '82 kg',
    serialNumber: 'WHTJ362022',
    images: [
      image('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80', 'Power trowel on slab edge'),
      image('https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80', 'Finishing tool detail'),
    ],
    excerpt: '36-inch trowel for slab finishing crews and concrete subcontractors.',
    description: 'For finishing teams who want a clear spec sheet and simple inquiry path without retail-style ordering.',
    keyFeatures: ['36-inch guard ring', 'Honda petrol engine', 'Transportable frame', 'Blades included'],
    specs: [
      { label: 'Working Diameter', value: '36 in' },
      { label: 'Engine', value: 'Honda GX series' },
      { label: 'Use Case', value: 'Concrete finishing' },
      { label: 'Included', value: 'Blade set' },
    ],
    inspectionNotes: ['Operational check complete'],
    tags: ['power-trowel', 'concrete', 'finishing'],
  },
  {
    id: 'prd-leica-ts07',
    slug: 'leica-flexline-ts07-total-station',
    sku: 'RAF-SE-TS07-025',
    title: 'Leica FlexLine TS07 Total Station',
    categorySlug: 'small-equipment-tools',
    subcategory: 'Surveying Equipment',
    brand: 'Leica',
    model: 'FlexLine TS07',
    year: 2023,
    condition: 'refurbished',
    availability: 'available',
    priceMode: 'price-on-request',
    priceCurrency: 'EUR',
    location: 'Tirane Office',
    serialNumber: 'LEITS072023',
    images: [
      image('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', 'Surveying total station tripod setup'),
      image('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80', 'Instrument lens detail'),
    ],
    excerpt: 'Refurbished surveying package for layout control, quantity work, and field checks.',
    description: 'Sold through direct inquiry because bundle content, calibration scope, and accessories vary by buyer requirement.',
    keyFeatures: ['Case and charger included', 'Recent calibration', 'Refurbished condition', 'Ideal for site layout teams'],
    specs: [
      { label: 'Accuracy', value: '2 second' },
      { label: 'Range', value: 'Reflectorless capable' },
      { label: 'Accessories', value: 'Battery and charger included' },
      { label: 'Commercial Basis', value: 'Quote on request' },
    ],
    inspectionNotes: ['Calibration certificate available on request'],
    tags: ['surveying', 'total-station', 'refurbished'],
    featured: true,
  },
];

export const companyProfile = {
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
  heroSubheadline: 'Browse available machinery, attachments, spare parts and site equipment. Request information or start a contract inquiry directly with Rafin.',
  topUtilityNote: 'Contract-based B2B sales. No online payment.',
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
    description: 'Invoices, serial verification, and relevant machine documentation are handled through the offline sales process.',
    icon: 'file',
  },
  {
    title: 'No online payment risk',
    description: 'There is no checkout or card payment flow. Contracts and payment terms are handled directly with Rafin.',
    icon: 'wrench',
  },
];

export const homeStats = [
  { label: 'Heavy machinery', value: '24+' },
  { label: 'Attachments & parts', value: 'Stock-backed' },
  { label: 'Contract-based sales', value: 'B2B only' },
  { label: 'No online payment', value: 'Offline process' },
];

export const budgetBands = [
  { slug: 'under-5000', label: 'Under EUR 5,000' },
  { slug: 'under-25000', label: 'Under EUR 25,000' },
  { slug: 'under-100000', label: 'Under EUR 100,000' },
  { slug: 'price-on-request', label: 'Heavy machinery / Price on request' },
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Browse inventory',
    description: 'Search by machine type, brand, model, stock status, or budget band.',
  },
  {
    step: '02',
    title: 'Add products to inquiry list',
    description: 'Collect one or multiple products and keep internal notes for your procurement team.',
  },
  {
    step: '03',
    title: 'Request information or contract',
    description: 'Choose whether you need pricing, technical detail, delivery information, or contract discussion.',
  },
  {
    step: '04',
    title: 'Rafin contacts you directly',
    description: 'Inspection, negotiation, documentation, delivery, and in-person agreement are handled offline between companies.',
  },
];

export const faqItems: FAQItem[] = [
  {
    question: 'Can I buy online?',
    answer: 'No. This website is for inquiry and contract requests only. Rafin handles sales directly with company buyers after contact.',
  },
  {
    question: 'Are prices final?',
    answer: 'Visible prices and starting-from prices are indicative commercial references. Final terms can depend on inspection scope, included accessories, transport, and contract conditions.',
  },
  {
    question: 'Can I inspect machinery before contract?',
    answer: 'Yes. Inspection appointments can be discussed for available machines, and additional video or documentation review can be arranged where possible.',
  },
  {
    question: 'Can I request multiple machines?',
    answer: 'Yes. The inquiry list is built for multi-product requests so procurement teams can submit one consolidated inquiry.',
  },
  {
    question: 'Do you deliver?',
    answer: 'Delivery, transport planning, and export handling can be discussed directly with Rafin once the required equipment is identified.',
  },
  {
    question: 'Are products new or used?',
    answer: 'Both. Listings can be new, used, or refurbished, and each product page clearly states the condition.',
  },
  {
    question: 'What documents are provided?',
    answer: 'Depending on the item, Rafin can provide inspection notes, serial verification, service summaries, invoices, and other relevant commercial documents.',
  },
  {
    question: 'How fast will Rafin respond?',
    answer: 'For active stock, Rafin should normally respond quickly during business hours. Complex contract or logistics requests may require a fuller internal review.',
  },
  {
    question: 'Can I request spare parts?',
    answer: 'Yes. Attachments, spare parts, and service kits can be added to the same inquiry flow as machines.',
  },
  {
    question: 'Can I reserve machinery?',
    answer: 'Selected products can move into reserved status while contract discussions are active. Reservation availability depends on the product and current demand.',
  },
  {
    categorySlug: 'earthmoving-machinery',
    question: 'Do you support bucket and hammer matching for excavators?',
    answer: 'Yes. Rafin can discuss attachment fitment, pin dimensions, and compatible auxiliary hydraulic requirements during the inquiry process.',
  },
  {
    categorySlug: 'road-asphalt-equipment',
    question: 'Can road machinery be inspected with operating video?',
    answer: 'For some units, operating footage or pre-shipment video can be provided before an on-site inspection is scheduled.',
  },
  {
    categorySlug: 'trucks-transport',
    question: 'Are transport documents and road registration details available?',
    answer: 'Yes. Relevant registration, fleet, or ownership documentation can be reviewed during the contract discussion depending on the vehicle.',
  },
  {
    categorySlug: 'lifting-material-handling',
    question: 'Can I request lifting charts or attachment information?',
    answer: 'Yes. Load charts, reach information, and included handling attachments can be clarified by the sales team during inquiry review.',
  },
  {
    categorySlug: 'power-site-support',
    question: 'Can support equipment be quoted as a package?',
    answer: 'Yes. Generators, compressors, pumps, and related support equipment can be quoted as bundled site packages if needed.',
  },
  {
    categorySlug: 'attachments-spare-parts',
    question: 'Can parts be requested together with a machine?',
    answer: 'Yes. The inquiry flow supports combined requests covering machines, attachments, and spare parts in one submission.',
  },
  {
    categorySlug: 'small-equipment-tools',
    question: 'Do you support fast-moving small equipment requests?',
    answer: 'Yes. Smaller items can still be handled through the same B2B inquiry route, especially when companies need multiple units or bundled delivery.',
  },
];

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price low to high' },
  { value: 'price-desc', label: 'Price high to low' },
  { value: 'year-desc', label: 'Year newest' },
  { value: 'hours-asc', label: 'Hours low to high' },
] as const;

export type CatalogSort = (typeof sortOptions)[number]['value'];

export const brands: Brand[] = brandDefinitions
  .map((definition) => ({
    ...definition,
    productCount: products.filter((product) => product.brand === definition.name).length,
  }))
  .filter((brand) => brand.productCount > 0);

export const availableNowProducts = products.filter(
  (product) => product.availability === 'available' || product.availability === 'incoming',
);

export const featuredProducts = products.filter((product) => product.featured);
export const dealProducts = products.filter((product) => product.deal);

export function getCategoryBySlug(categorySlug: string) {
  return categories.find((category) => category.slug === categorySlug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductBySlugs(categorySlug: string, productSlug: string) {
  return products.find(
    (product) => product.categorySlug === categorySlug && product.slug === productSlug,
  );
}

export function getBrandBySlug(brandSlug: string) {
  return brands.find((brand) => brand.slug === brandSlug);
}

export function getFaqsByCategory(categorySlug: string) {
  return faqItems.filter((item) => item.categorySlug === categorySlug);
}

export function getProductsByIds(productIds: string[]) {
  return productIds
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product): product is Product => Boolean(product));
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        candidate.categorySlug === product.categorySlug,
    )
    .slice(0, limit);
}

export function getAdjacentProductsInCategory(categorySlug: string, productId: string) {
  const categoryProducts = getProductsByCategory(categorySlug);
  const index = categoryProducts.findIndex((product) => product.id === productId);

  return {
    previous: index > 0 ? categoryProducts[index - 1] : undefined,
    next: index >= 0 && index < categoryProducts.length - 1 ? categoryProducts[index + 1] : undefined,
  };
}
