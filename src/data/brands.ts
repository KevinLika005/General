import type { BrandDefinition } from './types';

/*
  Brand maintenance notes
  - Add new manufacturers here before using the brand on a product.
  - Brand slugs are used for brand landing pages and future backend exports.
  - Keep brand names exactly as they should appear in the catalog filters.
  - Brand images can later point to /images/brands/<brand>.svg or .jpg
*/

export const brandDefinitions: BrandDefinition[] = [
  { slug: 'atlas-copco', name: 'Atlas Copco', description: 'Portable compressors and support equipment for demanding sites.', logoText: 'ATC' },
  { slug: 'belle', name: 'Belle', description: 'Compact site equipment for repair crews, finishing teams, and utilities.', logoText: 'BEL' },
  { slug: 'bomag', name: 'Bomag', description: 'Compaction and roadwork machines for paving contractors and municipalities.', logoText: 'BMG' },
  { slug: 'caterpillar', name: 'Caterpillar', description: 'Heavy equipment brand trusted for durable excavation, loading, and fleet support.', logoText: 'CAT' },
  { slug: 'donaldson', name: 'Donaldson', description: 'Service filters and maintenance consumables for construction fleets.', logoText: 'DLD' },
  { slug: 'dynapac', name: 'Dynapac', description: 'Road rollers and paving equipment for asphalt and compaction work.', logoText: 'DYN' },
  { slug: 'epiroc', name: 'Epiroc', description: 'Hydraulic breakers and productivity attachments for demolition and quarry work.', logoText: 'EPI' },
  { slug: 'faymonville', name: 'Faymonville', description: 'Lowbed and heavy transport trailers for machinery logistics.', logoText: 'FAY' },
  { slug: 'generac', name: 'Generac', description: 'Mobile lighting and temporary power support equipment.', logoText: 'GEN' },
  { slug: 'godwin', name: 'Godwin', description: 'Dewatering pumps for construction, quarry, and emergency site use.', logoText: 'GDW' },
  { slug: 'hamm', name: 'Hamm', description: 'Asphalt and soil compaction equipment for road contractors.', logoText: 'HAM' },
  { slug: 'husqvarna', name: 'Husqvarna', description: 'Professional cutting tools for concrete, asphalt, and service teams.', logoText: 'HSQ' },
  { slug: 'jcb', name: 'JCB', description: 'Backhoes, telehandlers, and multi-use machines for versatile fleets.', logoText: 'JCB' },
  { slug: 'jlg', name: 'JLG', description: 'Access equipment for elevated maintenance and installation work.', logoText: 'JLG' },
  { slug: 'komatsu', name: 'Komatsu', description: 'Earthmoving and quarry machines with strong contractor demand.', logoText: 'KOM' },
  { slug: 'leica', name: 'Leica', description: 'Surveying equipment for layout control and construction measurement.', logoText: 'LEI' },
  { slug: 'liebherr', name: 'Liebherr', description: 'Lifting and heavy machine engineering for industrial operators.', logoText: 'LBR' },
  { slug: 'man', name: 'MAN', description: 'Heavy tractor and transport trucks for fleet duty.', logoText: 'MAN' },
  { slug: 'manitou', name: 'Manitou', description: 'Telehandlers and rough-terrain handling equipment for site logistics.', logoText: 'MNT' },
  { slug: 'mercedes-benz', name: 'Mercedes-Benz', description: 'Commercial transport and construction truck platforms.', logoText: 'MB' },
  { slug: 'michelin', name: 'Michelin', description: 'Industrial tire solutions for loaders and transport fleets.', logoText: 'MIC' },
  { slug: 'parker', name: 'Parker', description: 'Hydraulic service parts and hose kits for mobile equipment.', logoText: 'PRK' },
  { slug: 'perkins', name: 'Perkins', description: 'Power generation equipment for backup and remote operations.', logoText: 'PRK2' },
  { slug: 'toyota', name: 'Toyota', description: 'Reliable forklifts for warehouse and yard handling.', logoText: 'TYT' },
  { slug: 'voegele', name: 'Voegele', description: 'Paving equipment for asphalt crews and road contractors.', logoText: 'VOE' },
  { slug: 'volvo', name: 'Volvo', description: 'Construction equipment known for loading performance and operator comfort.', logoText: 'VOL' },
  { slug: 'wacker-neuson', name: 'Wacker Neuson', description: 'Compact equipment for compaction and job-site support.', logoText: 'WN' },
  { slug: 'whiteman', name: 'Whiteman', description: 'Concrete finishing equipment for slab contractors.', logoText: 'WHT' },
  { slug: 'wirtgen', name: 'Wirtgen', description: 'Road milling and surface rehabilitation specialist.', logoText: 'WRT' },
];
