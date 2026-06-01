import type { FAQItem } from './types';
import { localizeCatalogValue } from '../i18n/catalogLocale';

const baseFaqItems: FAQItem[] = [
  {
    question: 'Can I send a request directly through the website?',
    answer: 'Yes. This website is for inquiry, quote, and contract requests only. Rafin handles the next step directly with company buyers after contact.',
  },
  {
    question: 'Are prices final?',
    answer: 'Visible prices and starting-from prices are indicative commercial references. Final terms can depend on inspection scope, included accessories, transport, and contract conditions.',
  },
  {
    question: 'Can I inspect machinery before contract?',
    answer: 'Yes. Inspection appointments can be discussed for available machines, and additional video or document review can be arranged where possible.',
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
    question: 'Can I request spare parts together with a machine?',
    answer: 'Yes. Attachments, spare parts, and service kits can be added to the same inquiry flow as machines.',
  },
  {
    question: 'Can I reserve machinery?',
    answer: 'Selected products can move into reserved status while commercial discussions are active. Reservation availability depends on the product and current demand.',
  },
  {
    categorySlug: 'heavy-equipment',
    question: 'Do you support bucket and hammer matching for excavators?',
    answer: 'Yes. Rafin can discuss attachment fitment, pin dimensions, and compatible auxiliary hydraulic requirements during the inquiry process.',
  },
  {
    categorySlug: 'trucks-transport',
    question: 'Are transport documents and road registration details available?',
    answer: 'Yes. Relevant registration, fleet, or ownership documents can be reviewed during the contract discussion depending on the vehicle.',
  },
  {
    categorySlug: 'lifting-access',
    question: 'Can I request lifting charts or attachment information?',
    answer: 'Yes. Load charts, reach information, and included handling attachments can be clarified by the sales team during inquiry review.',
  },
  {
    categorySlug: 'site-power-support',
    question: 'Can support equipment be quoted as a package?',
    answer: 'Yes. Generators, compressors, pumps, and related support equipment can be quoted as bundled site packages if needed.',
  },
  {
    categorySlug: 'attachments-spare-parts',
    question: 'Can parts be added to a machine quotation?',
    answer: 'Yes. The inquiry flow supports combined requests covering machines, attachments, and spare parts in one submission.',
  },
  {
    categorySlug: 'tools-workshop',
    question: 'Do you support fast-moving tool and workshop requests?',
    answer: 'Yes. Smaller professional tools can still be handled through the same B2B inquiry route, especially when companies need multiple units or bundled delivery.',
  },
  {
    categorySlug: 'electrical-lighting',
    question: 'Can electrical tools and protection devices be grouped into one request?',
    answer: 'Yes. Test gear, protection devices, and related trade products can be quoted together in one consolidated inquiry.',
  },
  {
    categorySlug: 'plumbing-hydraulic',
    question: 'Can pumps and pipework tools be bundled with site-support requests?',
    answer: 'Yes. Pumping equipment, pipework tools, and related contractor support products can be combined in one inquiry submission.',
  },
  {
    categorySlug: 'building-materials-chemicals',
    question: 'Do material listings support unit-based quantities and documentation requests?',
    answer: 'Yes. Materials and chemicals can include unit-based quoting, certification requests, and delivery discussion through the same frontend flow.',
  },
  {
    categorySlug: 'safety-workwear',
    question: 'What happens if a safety category has no listed products yet?',
    answer: 'The category remains live for sourcing and future expansion. Buyers can still request support or ask Rafin to source relevant items directly.',
  },
];

export function getFaqItems(): FAQItem[] {
  return baseFaqItems.map((item, index) => ({
    ...item,
    question: localizeCatalogValue(`faqItems.${index}.question`, item.question),
    answer: localizeCatalogValue(`faqItems.${index}.answer`, item.answer),
  }));
}
