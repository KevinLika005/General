import { getCurrentLanguage } from '../../i18n/config';

/** Owner-written copy, one paragraph per array entry. Leave a language empty to show nothing. */
export interface LocalizedParagraphs {
  sq: string[];
  en: string[];
}

/** Paragraphs for the current language only (never falls back to the other language). */
export function pickParagraphs(entry: LocalizedParagraphs | undefined): string[] {
  return (entry?.[getCurrentLanguage()] ?? []).map((paragraph) => paragraph.trim()).filter(Boolean);
}
