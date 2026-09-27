import type { LocalizedParagraphs } from './paragraphs';

/*
  CATEGORY INTRODUCTIONS: owner-written text for each category page.

  What to write (per category, Albanian first, English if you can):
  - 1 to 3 short paragraphs, in your own words. Write it for a buyer, not for Google.
  - What you actually supply in this category (types, typical sizes or capacities, new or used).
  - Who usually buys it from you (contractors, municipalities, fleets, workshops...).
  - What you can really offer around it: inspection, delivery area, spare parts, documents.
  - Only facts you stand behind. No prices, no stock counts (they change), no "best in Albania".

  How to fill in: put each paragraph in quotes, separated by commas. Example:
    'heavy-equipment': {
      sq: ['Paragrafi i parë.', 'Paragrafi i dytë.'],
      en: ['First paragraph.', 'Second paragraph.'],
    },

  If a language is left empty ([]), that language shows nothing extra: the page keeps its current
  short description. Text appears on the category page (under the products) and in the static HTML
  that Google reads.
*/
export const categoryIntros: Record<string, LocalizedParagraphs> = {
  'heavy-equipment': { sq: [], en: [] },
  'lifting-access': { sq: [], en: [] },
  'trucks-transport': { sq: [], en: [] },
  'site-power-support': { sq: [], en: [] },
  'tools-workshop': { sq: [], en: [] },
  'electrical-lighting': { sq: [], en: [] },
  'plumbing-hydraulic': { sq: [], en: [] },
  'building-materials-chemicals': { sq: [], en: [] },
  'attachments-spare-parts': { sq: [], en: [] },
  'safety-workwear': { sq: [], en: [] },
};
