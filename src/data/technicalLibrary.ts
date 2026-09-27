import { localizeCatalogValue } from '../i18n/catalogLocale';

/*
  TECHNICAL LIBRARY: where real, downloadable documents go.

  1. Put the PDF in public/docs/ (create the folder), using a lowercase-hyphen name, e.g.
       public/docs/caterpillar-320d-spec-sheet.pdf
  2. Add fileUrl to the matching item below. The path starts at /docs/, without "public":
       { title: 'Tracked excavator operating manual', fileUrl: '/docs/caterpillar-320d-spec-sheet.pdf' },
     Or add a new item with its own title. The Albanian title for each item lives in
     src/i18n/catalogLocale.ts (technicalLibraryGroups), in the same order.
  3. Run npm test: it fails if a fileUrl points to a missing file.

  Only publish files you are allowed to share publicly: your own inspection reports and
  checklists, or manufacturer documents whose terms allow redistribution. Keep each file
  under about 10 MB, and never include customer names, prices or serials you have not confirmed.

  Items without fileUrl show "available on request". While no item has a fileUrl,
  /technical-library stays hidden from Google (noindex). It becomes indexable automatically once
  at least one real file is linked (src/seo/pageSeo.ts).
*/
export interface TechnicalLibraryItem {
  title: string;
  /** Public path of a real PDF under public/docs/, e.g. '/docs/<file>.pdf'. */
  fileUrl?: string;
}

const baseTechnicalLibraryGroups: Array<{
  key: 'manuals' | 'spec-sheets' | 'inspection' | 'delivery-contract' | 'safety';
  title: string;
  description: string;
  items: TechnicalLibraryItem[];
}> = [
  {
    key: 'manuals',
    title: 'Product manuals',
    description: 'Operating manuals, startup guidance, maintenance references, and user instructions for the product families in the catalog.',
    items: [
      { title: 'Tracked excavator operating manual' },
      { title: 'Portable air compressor operation guide' },
      { title: 'Pipe threading machine user instruction guide' },
    ],
  },
  {
    key: 'spec-sheets',
    title: 'Specification sheets',
    description: 'Product data sheets, model summaries, compatibility references, and core technical overviews mapped to current product families.',
    items: [
      { title: 'Telehandler model summary' },
      { title: 'Hydraulic breaker compatibility reference' },
      { title: 'Fire-resistant board technical overview' },
    ],
  },
  {
    key: 'inspection',
    title: 'Inspection documents',
    description: 'Condition summaries, inspection notes, checklists, and pre-delivery review records for equipment and transport listings.',
    items: [
      { title: 'Tracked excavator inspection checklist' },
      { title: 'Dump truck condition summary' },
      { title: 'Wheel loader visual review record' },
    ],
  },
  {
    key: 'delivery-contract',
    title: 'Delivery and contract documents',
    description: 'Delivery scope references, handover preparation, and contract-support document requests across equipment, tools, and materials.',
    items: [
      { title: 'Lowbed trailer delivery scope reference' },
      { title: 'Generator handover checklist' },
      { title: 'Material and consumable commercial request outline' },
    ],
  },
  {
    key: 'safety',
    title: 'Safety and usage documents',
    description: 'Safety notes, handling guidance, site-usage precautions, and operator awareness material aligned with active product families.',
    items: [
      { title: 'Rotary hammer usage precautions' },
      { title: 'Chemical anchor handling notice' },
      { title: 'Surface water pump site-safety guidance' },
    ],
  },
];

export function getTechnicalLibraryGroups() {
  return baseTechnicalLibraryGroups.map((group) => ({
    ...group,
    title: localizeCatalogValue(`technicalLibraryGroups.${group.key}.title`, group.title),
    description: localizeCatalogValue(
      `technicalLibraryGroups.${group.key}.description`,
      group.description,
    ),
    items: group.items.map((item, index) => ({
      ...item,
      title: localizeCatalogValue(`technicalLibraryGroups.${group.key}.items.${index}`, item.title),
    })),
  }));
}

export function getTechnicalLibraryDownloads() {
  return baseTechnicalLibraryGroups.flatMap((group) => group.items).filter((item) => item.fileUrl);
}
