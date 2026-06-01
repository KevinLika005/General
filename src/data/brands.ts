import type { BrandDefinition } from './types';
import { localizeCatalogValue } from '../i18n/catalogLocale';

/*
  Brand maintenance notes
  - Add new manufacturers here before using the brand on a product.
  - Brand slugs are used for brand landing pages and future backend exports.
  - Keep brand names exactly as they should appear in the catalog filters.
  - Brand images can later point to /images/brands/<brand>.svg or .jpg.
*/

const baseBrandDefinitions: BrandDefinition[] = [
  { slug: 'atlas-copco', name: 'Atlas Copco', description: 'Portable compressors and site-support equipment for demanding field operations.', logoText: 'ATC' },
  { slug: 'bomag', name: 'Bomag', description: 'Compaction and roadwork machines for contractors and infrastructure programs.', logoText: 'BMG' },
  { slug: 'bosch-professional', name: 'Bosch Professional', description: 'Trade-grade power tools for drilling, installation, and concrete work.', logoText: 'BOS' },
  { slug: 'caterpillar', name: 'Caterpillar', description: 'Heavy equipment and attachment platforms for excavation and general construction.', logoText: 'CAT' },
  { slug: 'dewalt', name: 'DeWalt', description: 'Cordless tool systems for installation crews and workshop support.', logoText: 'DWT' },
  { slug: 'epiroc', name: 'Epiroc', description: 'Hydraulic breakers and productivity attachments for demolition and quarry work.', logoText: 'EPI' },
  { slug: 'faymonville', name: 'Faymonville', description: 'Lowbed and heavy transport trailers for machinery logistics.', logoText: 'FAY' },
  { slug: 'fischer', name: 'Fischer', description: 'Anchoring and fixing systems for structural and industrial installation.', logoText: 'FIS' },
  { slug: 'fluke', name: 'Fluke', description: 'Electrical test instruments for maintenance, troubleshooting, and commissioning.', logoText: 'FLK' },
  { slug: 'honda', name: 'Honda', description: 'Portable engine-driven support equipment for site drainage and transfer duty.', logoText: 'HON' },
  { slug: 'jcb', name: 'JCB', description: 'Backhoes and telehandlers for versatile contractor and municipal fleets.', logoText: 'JCB' },
  { slug: 'knauf', name: 'Knauf', description: 'Board materials and drylining systems for technical interior and fire-rated assemblies.', logoText: 'KNA' },
  { slug: 'kubota', name: 'Kubota', description: 'Compact excavators for urban access, landscaping, and utility works.', logoText: 'KBT' },
  { slug: 'mercedes-benz', name: 'Mercedes-Benz', description: 'Commercial transport and construction truck platforms.', logoText: 'MB' },
  { slug: 'perkins', name: 'Perkins', description: 'Power generation equipment for backup and remote operations.', logoText: 'PRK' },
  { slug: 'ridgid', name: 'RIDGID', description: 'Pipeworking tools and workshop systems for installers and maintenance teams.', logoText: 'RDG' },
  { slug: 'schneider-electric', name: 'Schneider Electric', description: 'Low-voltage electrical protection products for technical buyers and panel builders.', logoText: 'SE' },
  { slug: 'volvo', name: 'Volvo', description: 'Construction equipment known for loading performance and operator comfort.', logoText: 'VOL' },
];

export const brandDefinitions: BrandDefinition[] = baseBrandDefinitions.map((brand) => ({
  ...brand,
  description: localizeCatalogValue(`brands.${brand.slug}.description`, brand.description),
}));
