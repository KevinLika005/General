import { localizeCatalogValue } from '../i18n/catalogLocale';

const baseTechnicalLibraryGroups = [
  {
    key: 'manuals',
    title: 'Product manuals',
    description: 'Operating manuals, startup guidance, maintenance references, and user instructions tied to seeded product families.',
    items: [
      'Tracked excavator operating manual placeholder',
      'Portable air compressor operation guide placeholder',
      'Pipe threading machine user instruction placeholder',
    ],
  },
  {
    key: 'spec-sheets',
    title: 'Specification sheets',
    description: 'Product data sheets, model summaries, compatibility references, and core technical overviews mapped to current product families.',
    items: [
      'Telehandler model summary placeholder',
      'Hydraulic breaker compatibility reference placeholder',
      'Fire-resistant board technical overview placeholder',
    ],
  },
  {
    key: 'inspection',
    title: 'Inspection documents',
    description: 'Condition summaries, inspection notes, checklists, and pre-delivery review records for equipment and transport listings.',
    items: [
      'Tracked excavator inspection checklist placeholder',
      'Dump truck condition summary placeholder',
      'Wheel loader visual review record placeholder',
    ],
  },
  {
    key: 'delivery-contract',
    title: 'Delivery and contract documents',
    description: 'Delivery scope references, handover preparation, and contract-support document requests across equipment, tools, and materials.',
    items: [
      'Lowbed trailer delivery scope placeholder',
      'Generator handover checklist placeholder',
      'Material and consumable commercial request placeholder',
    ],
  },
  {
    key: 'safety',
    title: 'Safety and usage documents',
    description: 'Safety notes, handling guidance, site-usage precautions, and operator awareness material aligned with active product families.',
    items: [
      'Rotary hammer usage precautions placeholder',
      'Chemical anchor handling notice placeholder',
      'Surface water pump site-safety guidance placeholder',
    ],
  },
] as const;

export function getTechnicalLibraryGroups() {
  return baseTechnicalLibraryGroups.map((group) => ({
    ...group,
    title: localizeCatalogValue(`technicalLibraryGroups.${group.key}.title`, group.title),
    description: localizeCatalogValue(
      `technicalLibraryGroups.${group.key}.description`,
      group.description,
    ),
    items: localizeCatalogValue(`technicalLibraryGroups.${group.key}.items`, [...group.items]),
  }));
}
