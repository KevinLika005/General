import type { LocalizedParagraphs } from './paragraphs';

/*
  BRAND INTRODUCTIONS: owner-written text shown on each brand card on /brands.

  What to write (per brand, Albanian first, English if you can):
  - 1 to 3 sentences (the card is small), in your own words.
  - What you supply from this brand: which machines, tools or parts, new or used.
  - Your real relationship with the brand. Only write "authorized dealer" or "official
    distributor" if you have that status in writing.
  - No copied manufacturer marketing text, and no logos or claims you cannot back up.

  How to fill in: put each sentence group in quotes. Example:
    caterpillar: {
      sq: ['Furnizojmë eskavatorë Caterpillar të përdorur ...'],
      en: ['We supply used Caterpillar excavators ...'],
    },

  If a language is left empty ([]), the card keeps its current short description.
*/
export const brandIntros: Record<string, LocalizedParagraphs> = {
  'atlas-copco': { sq: [], en: [] },
  bomag: { sq: [], en: [] },
  'bosch-professional': { sq: [], en: [] },
  caterpillar: { sq: [], en: [] },
  dewalt: { sq: [], en: [] },
  epiroc: { sq: [], en: [] },
  faymonville: { sq: [], en: [] },
  fischer: { sq: [], en: [] },
  fluke: { sq: [], en: [] },
  honda: { sq: [], en: [] },
  jcb: { sq: [], en: [] },
  knauf: { sq: [], en: [] },
  kubota: { sq: [], en: [] },
  'mercedes-benz': { sq: [], en: [] },
  perkins: { sq: [], en: [] },
  ridgid: { sq: [], en: [] },
  'schneider-electric': { sq: [], en: [] },
  volvo: { sq: [], en: [] },
};
