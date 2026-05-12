export const technicalLibraryGroups = [
  {
    key: 'manuals',
    title: 'Product manuals',
    description: 'Operating manuals, startup guidance, maintenance references, and user instructions.',
    items: [
      'Excavator operating manual',
      'Generator operation guide',
      'Hydraulic breaker user instruction sheet',
    ],
  },
  {
    key: 'spec-sheets',
    title: 'Specification sheets',
    description: 'Product data sheets, model summaries, compatibility references, and core technical overviews.',
    items: [
      'Machine data sheet',
      'Attachment compatibility reference',
      'Support equipment specification summary',
    ],
  },
  {
    key: 'inspection',
    title: 'Inspection documents',
    description: 'Condition summaries, inspection notes, checklists, and pre-delivery review records.',
    items: [
      'Inspection checklist',
      'Condition summary',
      'Visual review record',
    ],
  },
  {
    key: 'delivery-contract',
    title: 'Delivery and contract documents',
    description: 'Delivery scope references, handover preparation, and contract-support document requests.',
    items: [
      'Delivery scope summary',
      'Handover preparation checklist',
      'Commercial reference document request',
    ],
  },
  {
    key: 'safety',
    title: 'Safety and usage documents',
    description: 'Safety notes, handling guidance, site-usage precautions, and operator awareness material.',
    items: [
      'Safety instruction notice',
      'Usage precautions',
      'Site handling guidance',
    ],
  },
] as const;
